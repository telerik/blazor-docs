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
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I bind the Grid to Data with complex objects in its model, not only strings, primitive and value types.

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

````RAZOR
<TelerikGrid Data="@GridData"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Groupable="true">
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

    private IEnumerable<SampleComplexObject> GridData = Enumerable.Range(1, 5).Select(x =>
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

Grid editing requires nested models to be instantiated by the application code. Otherwise, the nested objects will be `null` for newly inserted items, or even for some existing items, depending on the data. As a result, the following may occur:
* The Grid editors will not have an instance to bind to, and the typed values will be reset.
* The Grid will throw an exception `System.ArgumentException: The provided expression must evaluate to a non-null value.`

There are three alternative ways to solve this:

1. Initialize the nested object in its property declaration in the main Grid model class.
2. Initialize the nested object in the parent object constructor.
3. Initialize the nested object in the [Grid `OnModelInit` event](slug:grid-events#onmodelinit).

The example below demonstrates all three options. Pick one, according to your preferences.

>caption Editing and inserting complex nested (navigation) objects

````RAZOR
@* Three alternative ways to ensure nested objects can be edited and inserted.
    1. Initialize the nested object in its property declaration in the main Grid model class.
    2. Initialize the nested object in the parent object constructor.
    3. Initialize the nested object in the Grid OnModelInit event.
    You need just one of these options.
    Otherwise an exception will occur if you try to add an item. *@

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Popup"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate"
             OnModelInit="@OnGridModelInit">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleComplexObject.Id)" Editable="false"></GridColumn>
        <GridColumn Field="@nameof(SampleComplexObject.Name)"></GridColumn>
        <GridColumn Title="Nested 1" Field="SomeNavigationProperty.Field1"></GridColumn>
        <GridColumn Title="Nested 2" Field="SomeNavigationProperty.OtherField"></GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleComplexObject> GridData { get; set; } = new List<SampleComplexObject>();

    private int LastId { get; set; }

    private SampleComplexObject OnGridModelInit()
    {
        return new SampleComplexObject()
        {
            // Solution 3
            SomeNavigationProperty = new NestedObject()
        };
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (SampleComplexObject)args.Item;
        var originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (SampleComplexObject)args.Item;

        createdItem.Id = ++LastId;
        GridData.Insert(0, createdItem);
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new SampleComplexObject()
            {
                Id = ++LastId,
                Name = $"Name {LastId}",
                SomeNavigationProperty = new NestedObject
                {
                    Field1 = $"first {LastId % 4 + 1}",
                    OtherField = $"second {LastId % 6 + 1}"
                }
            });
        }

        base.OnInitialized();
    }

    public class SampleComplexObject
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        // Solution 1
        public NestedObject SomeNavigationProperty { get; set; } = new NestedObject();

        public SampleComplexObject()
        {
            // Solution 2
            SomeNavigationProperty = new NestedObject();
        }
    }

    public class NestedObject
    {
        public string Field1 { get; set; } = string.Empty;
        public string OtherField { get; set; } = string.Empty;
    }
}
````
