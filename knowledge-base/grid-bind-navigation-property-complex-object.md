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

I bind the Grid to Data with complex objects in its model, not only primitive types.

How to use complex objects in my model and show nested (navigation) properties information in the Grid?

I prefer *not* to use a Column `Template` or a Grid `DetailTemplate`.


## Solution

Consider the following data structure:

<div class="skip-repl"></div>

````CS
private List<GridModel> GridData { get; set; }

public class GridModel
{
    public int Id { get; set; }
    public ChildModel NavigationProperty { get; set; }
}

public class ChildModel
{
    public string Text { get; set; }
}
````

If a Grid should display the `Id` values, the column `Field` definition will look like this:

<div class="skip-repl"></div>

````HTML
<GridColumn Field="@nameof(GridModel.Id)" />
<!-- which is equivalent to -->
<GridColumn Field="Id" />
````

If the Grid should bind to `GridModel` items and display the `Text` values, the following will *not* work:

<div class="skip-repl"></div>

````HTML
<!-- incorrect -->
<GridColumn Field="@nameof(GridModel.NavigationProperty.Text)" />
<!-- which is equivalent to -->
<GridColumn Field="Text" />
````

This is because `nameof(GridModel.NavigationProperty.Text)` will return `Text` and the Grid will treat `Text` as a property of `GridModel`.

The correct approach is to use a concatenated string that includes the property name from the Grid model class and the property name of the nested class:

<div class="skip-repl"></div>

````HTML
<!-- correct -->
<GridColumn Field="@( $"{nameof(GridModel.NavigationProperty)}.{nameof(ChildModel.Text)}" )" />
<!-- which is equivalent to -->
<GridColumn Field="NavigationProperty.Text" />
````

>caption Using complex models with navigation properties in the Grid without flattening the model

````CSHTML
<TelerikGrid Data="@myData" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow" Groupable="true">
    <GridColumns>
        <GridColumn Field="@nameof(SampleComplexObject.ID)" />
        <GridColumn Field="@nameof(SampleComplexObject.Name)" />
        <GridColumn Field="SomeNavigationProperty.Field1" />
        <GridColumn Field="@( $"{nameof(SampleComplexObject.SomeNavigationProperty)}.{nameof(NestedObject.OtherField)}" )" />
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

When Grid editing is enabled, the nested models must be instantiated by the application code. Otherwise, for newly inserted items (or maybe even for some existing items, depending on the data), they will be `null` and so the grid editors will not have an instance to bind to, and so the values you write in them will be reset.

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
            <GridCommandButton Command="Save" Icon="@FontIcon.Save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@FontIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@FontIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@FontIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
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
