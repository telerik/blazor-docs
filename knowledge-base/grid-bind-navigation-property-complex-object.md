---
title: Bind to nested (navigation) properties in complex objects
description: Bind grid columns to nested (navigation) properties in complex objects.
type: how-to
page_title: Bind to nested (navigation) properties in complex objects
slug: grid-use-navigation-properties
position: 
tags: 
ticketid: 
res_type: kb
---

## Description

Data that you bind to the grid may have complex objects in its model, not only primitive types.

How do I use complex objects in my model and show nested (navigation) properties information in the grid?

## Solution

Set the `Field` parameter of the column to the name of the primitive type field (not a collection or entire class) that you want to use - include the name of the main model that holds the nested model, and the name of the field in the nested model.

Do *not* include the name of the main model the grid is bound to.

Do *not* use the `nameof` operator - it returns only the field name, without its parent class name.

>caption Use complex models with navigation properties in the grid without flattening the model

````CSHTML
@* As of 2.11.0, the grid can show complex (nested, navigation) properties out-of-the-box. 
    You can still consider using a Template or a DetailTemplate for showing complex details about a row/cell
    *@

<TelerikGrid Data="@myData" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow" Groupable="true">
    <GridColumns>
        <GridColumn Field="@nameof(SampleComplexObject.ID)" Title="ID"></GridColumn>
        <GridColumn Field="@nameof(SampleComplexObject.Name)" Title="The Name"></GridColumn>
        <GridColumn Title="First Nested Property" Field="SomeNavigationProperty.Field1" />
        <GridColumn Field="SomeNavigationProperty.OtherField" />
    </GridColumns>
</TelerikGrid>


@code {
    public class SampleComplexObject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public NestedObject SomeNavigationProperty { get; set; } // use this field name for data binding
        
        // the parameterless constructor must instantiate the nested fields when editing, see the notes below
        public SampleComplexObject()
        {
            SomeNavigationProperty = new NestedObject();
        }
    }

    public class NestedObject
    {
        public string Field1 { get; set; }
        public string OtherField { get; set; }
    }

    public IEnumerable<SampleComplexObject> myData = Enumerable.Range(1, 50).Select(x =>
            new SampleComplexObject
            {
                ID = x,
                Name = "Name " + x,
                SomeNavigationProperty = new NestedObject
                {
                    Field1 = "first " + x % 4,
                    OtherField = "second " + x % 6
                }
            }
        );
}
````


## Notes

When editing is enabled in the grid, the nested models must be instantiated by the application code. Otherwise, for newly inserted items (or maybe even for some existing items, depending on the data), they will be `null` and so the grid editors will not have an instance to bind to, and so the values you write in them will be reset.

There are two ways to solve this:

* The parameterless constructor of the main view-model can instantiate the nested objects so they are not `null`.

* You can use an EditorTemplate for the grid column and ensure an instnace of the nested object is created there.

The code snippet below demonstrates both approaches (the second option is commented out - replace the two nested field columns with the comment to see it in action, and remove the constructor).

>caption Measures for editing and inserting complex nested (navigation) objects

````CSHTML
@* Two ways to ensure nested objects can be edited and inserted. An issue can become obvious if you Add an item without those solutions, and try writing in the nested fields editors *@

<TelerikGrid Data="@MyData" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow" Groupable="true"
             EditMode="@GridEditMode.Inline" OnUpdate="@UpdateHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler">
    <GridColumns>
        <GridColumn Field="@nameof(SampleComplexObject.ID)" Title="ID" Editable="false"></GridColumn>
        <GridColumn Field="@nameof(SampleComplexObject.Name)" Title="The Name"></GridColumn>
        <GridColumn Title="First Nested Property" Field="SomeNavigationProperty.Field1"></GridColumn>
        <GridColumn Field="SomeNavigationProperty.OtherField"></GridColumn>
        @*<GridColumn Title="First Nested Property" Field="SomeNavigationProperty.Field1">
            <EditorTemplate>
                @{
                    // Solution 2: ensure the nested object is instantiated in the first (or every) editor template
                    CurrentlyEditedItem = context as SampleComplexObject;
                    if (CurrentlyEditedItem.SomeNavigationProperty == null)
                    {
                        CurrentlyEditedItem.SomeNavigationProperty = new NestedObject();
                    }
                    <TelerikTextBox @bind-Value="@CurrentlyEditedItem.SomeNavigationProperty.Field1" Width="100%" />
                }
            </EditorTemplate>
        </GridColumn>
        <GridColumn Field="SomeNavigationProperty.OtherField">
            <EditorTemplate>
                @{
                    CurrentlyEditedItem = context as SampleComplexObject;
                    <TelerikTextBox @bind-Value="@CurrentlyEditedItem.SomeNavigationProperty.OtherField" Width="100%" />
                }
            </EditorTemplate>
        </GridColumn>*@
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
</TelerikGrid>


@code {
    SampleComplexObject CurrentlyEditedItem { get; set; }

    public class SampleComplexObject
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public NestedObject SomeNavigationProperty { get; set; } // use this field name for data binding

        // Solution 1:
        // the parameterless constructor of the main model the grid uses instantiates the nested objects
        public SampleComplexObject()
        {
            SomeNavigationProperty = new NestedObject();
        }
    }

    public class NestedObject
    {
        public string Field1 { get; set; }
        public string OtherField { get; set; }
    }

    public List<SampleComplexObject> MyData { get; set; } = Enumerable.Range(1, 50).Select(x =>
        new SampleComplexObject
        {
            ID = x,
            Name = "Name " + x,
            SomeNavigationProperty = new NestedObject
            {
                Field1 = "first " + x % 4,
                OtherField = "second " + x % 6
            }
        }).ToList();


    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleComplexObject item = (SampleComplexObject)args.Item;

        // perform actual data source operations here through your service

        // if the grid Data is not tied to the service, you may need to update the local view data too
        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
        }
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleComplexObject item = (SampleComplexObject)args.Item;

        // perform actual data source operation here through your service

        // if the grid Data is not tied to the service, you may need to update the local view data too
        MyData.Remove(item);
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleComplexObject item = (SampleComplexObject)args.Item;

        // perform actual data source operation here through your service

        // if the grid Data is not tied to the service, you may need to update the local view data too
        item.ID = MyData.Count + 1;
        MyData.Insert(0, item);
    }
}
````

