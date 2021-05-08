---
title: Row Drag and Drop
page_title: Grid Row Drag and Drop
description: Overview of the Row Drag and Drop functionality for Grid for Blazor.
slug: grid-drag-drop-overview
tags: telerik,blazor,grid,drap,drop,dragdrop,row,rows,overview
published: True
position: 41
---

# Row Drag and Drop

The Drag and Drop functionality for the Grid rows allows you to move a row or a multitude of rows between different parents in the same Grid or between different Telerik Grid instances.

This article contains the following sections:

* [Basics](#basics)
* [OnRowDrop Event](#onrowdrop-event)
* [GridRowDraggableSettings](#gridrowdraggablesettings)
* [Examples](#examples)
    * [Drag and Drop a Row in the same Grid](#drag-and-drop-a-row-in-the-same-grid)
    * [Drag and Drop a Row between Grids](#drag-and-drop-a-row-between-grids)
    * [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)
* [Limitations](#limitations)

## Basics

To enable the Drag and Drop functionality:

1. Set the `RowDraggable` parameter of the `<TelerikGrid>` to `true`

1. Use the `OnRowDrop` event to handle the drag and drop operations and modify the data source as per your business logic.

The row drag and drop functionality works with a dedicated column which is always rendered as the first column when the feature is enabled.  


## OnRowDrop Event

The `OnRowDrop` event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnRowDrop` event provides an object of type `GridRowDropEventArgs<T>` to its event handler which exposes the following fields:

* `Item` - an `object` that represents the dragged row. You can cast this object to your model class.

* `DestinationItem` - an `object` that represents the row over which the `Item` is dropped. You can cast this object to your model class.

* `Items` - `IEnumerable<T>` that represents a collection of all dragged items. 

* `DropPosition` - an `enum` - its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`:
    * `After`
    * `Below`
    * `Over`
    
* `DestinationGrid` - the reference of the Grid in which the row is dropped. This is applicable when you drag and drop rows between different grids. 

## GridRowDraggableSettings

The `GridRowDraggableSettings` is a child tag under the `<GridSettings>`, which is a child tag of the `<TelerikGrid>`. It exposes the following parameters:

* `DragClueField` - `string` - defines which field will be used to render the drag clue text. By default, this parameter will take the value of the first bound column of the first dragged row. 

You can find examples of its usage below.

## Examples

This section contains the following examples:

* [Drag and Drop a Row in the same Grid](#drag-and-drop-a-row-in-the-same-grid)
* [Drag and Drop a Row between Grids](#drag-and-drop-a-row-between-grids)
* [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

### Drag and Drop a Row in the same Grid

````CSHTML
@* Drag a row and drop it in the Grid. *@

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true"
             Resizable="true" 
             Reorderable="true"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private void OnRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        MyData.Remove(args.Item);

        var destinationItemIndex = MyData.IndexOf(args.DestinationItem);

        if (args.DropPosition == GridRowDropPosition.After)
        {
            destinationItemIndex++;
        }

        MyData.Insert(destinationItemIndex, args.Item);
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


### Drag and Drop a Row between Grids

When you drap and drop items from one instance of the Grid to another, the `OnRowDrop` event fires for both instances of the Grid so you can update both their data sources. All instances must be bound to the same model.  

````CSHTML
@* Drag a row from one Grid and Drop it in the other *@ 

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true"
             @ref="@FirstGrid"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<TelerikGrid Data="@MySecondGridData" Height="400px"
             Pageable="true"
             Resizable="true" 
             Reorderable="true"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnSecondGridRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<SampleData> FirstGrid { get; set; }

    private void OnRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        MyData.Remove(args.Item);
        InsertItem(args);
    }

    private void OnSecondGridRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        MySecondGridData.Remove(args.Item);
        InsertItem(args);
    }

    private void InsertItem(GridRowDropEventArgs<SampleData> args)
    {
        var destinationData = args.DestinationGrid == FirstGrid ? MyData : MySecondGridData;

        var destinationIndex = 0;

        if (args.DestinationItem != null)
        {
            destinationIndex = destinationData.IndexOf(args.DestinationItem);
            if (args.DropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        destinationData.InsertRange(destinationIndex, args.Items);
    }

    public List<SampleData> MySecondGridData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x + 2,
        Name = "name  " + x + 2,
        Team = "team " + x % 3,
        HireDate = DateTime.Now.AddDays(-x * 2).Date
    }).ToList();

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


### Drag and Drop multiple Rows

You can drag and drop multiple rows in one or between multiple instances of the Grid. To enable it, you should set the [`SelectionMode` parameter]({%slug components/grid/selection/overview%}) of the TelerikGrid to `GridSelectionMode.Multiple`. Then, if you drag a selected row, you will effectively drag all the selected rows.

When you select multiple rows, the row drag clue will be `N items selected` where `N` is the number of selected rows.

````CSHTML
@* Select multiple rows and reorder them in the Grid. *@

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true"
             Resizable="true" 
             Reorderable="true"
             SelectionMode="@GridSelectionMode.Multiple"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private void OnRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        if (args.Items.Contains(args.DestinationItem))
        {
            return;
        }

        foreach (var item in args.Items)
        {
            MyData.Remove(item);
        }

        var destinationItemIndex = MyData.IndexOf(args.DestinationItem);

        if (args.DropPosition == GridRowDropPosition.After)
        {
            destinationItemIndex++;
        }

        MyData.InsertRange(destinationItemIndex, args.Items);
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## Limitations

List on known limitations for the Grid Drag and Drop features:

* [Grouping]({%slug components/grid/features/grouping%}) is not supported.

## See Also

  * [Grid Overview]({%slug components/grid/overview%})
  * [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1)

