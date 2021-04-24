---
title: Drag and Drop
page_title: Grid Drag and Drop
description: Overview of the Drag and Drop functionality for Grid for Blazor.
slug: grid-drag-drop-overview
tags: telerik,blazor,grid,drap,drop,dragdrop,row,rows,overview
published: True
position: 11
---

# Drag and Drop

The Drag and Drop functionality for the Grid allows you to move a row or a multitude of rows between different parents in the same Grid or between different Telerik Grid instances.

This article will be separated in the following sections:

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


## OnRowDrop Event

The `OnRowDrop` event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnRowDrop` event provides an object of type `GridRowDropEventArgs<T>` to its event handler which exposes the following fields:

* `Item` - an `object` that represents the dragged row. You can cast this object to your model class.

* `DestinationItem` - an `object` that represents the row over which the `Item` is dropped to. You can cast this object to your model class.

* `DestinationItems` - `IEnumerable<T>` that represents a collection of all dragged items. 

* `DropPosition` - an `enum` - its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`:
    * `After`
    * `Below`
    * `Over`
    
* `DestinationGrid` - the reference of the Grid in which the row is dropped. This is applicable when you drag and drop rows between different instances of the component. 

## GridRowDraggableSettings

The `GridRowDraggableSettings` is a child tag under the `<GridSettings>`. It exposes the following parameters:

* `DragClueField` - `string` - defines which field will be used to render the drag clue text. By default, this parameter will take the value of the first bound column. 

## Examples

* [Drag and Drop a Row in the same Grid](#drag-and-drop-a-row-in-the-same-grid)
* [Drag and Drop a Row between Grids](#drag-and-drop-a-row-between-grids)
* [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

### Drag and Drop a Row in the same Grid

````Component
@* Drag a row and drop it in the Grid. *@

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true"
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
        MyData.Remove(args.Item);

        var destinationItemIndex = MyData.IndexOf(args.DestinationItem);

        if(args.DropPosition == GridRowDropPosition.After)
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
````Extensions
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TelerikBlazorAppServer.Shared
{
    public static class EmployeeExtensions
    {
        public static Employee FindRecursive(this List<Employee> storageItems, Func<Employee, bool> condition)
        {
            for (int i = 0; i < storageItems?.Count; i++)
            {
                var storageItem = storageItems[i];
                var matchedItem = storageItem.FindRecursive(condition);

                Employee item = new Employee();

                if (matchedItem != null)
                {
                    return matchedItem;
                }
            }

            return default;
        }

        public static Employee FindRecursive(this Employee storageItem, Func<Employee, bool> selector)
        {
            if (selector(storageItem) == true)
            {
                return storageItem;
            }

            for (int i = 0; i < storageItem.DirectReports?.Count; i++)
            {
                var item = storageItem.DirectReports[i];

                if (selector(item))
                {
                    return item;
                }
                else
                {
                    var childItem = item.DirectReports.FindRecursive(selector);

                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return default;
        }
    }
}
````
````Model
public class Employee
{
    // hierarchical data collections
    public List<Employee> DirectReports { get; set; }

    // data fields for display
    public int Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public DateTime HireDate { get; set; }
}
````

### Drag and Drop a Row between Grids

When you drap and drop items from one instance of the Grid to another, the `OnRowDrop` event fires for both instances of the Grid. All instances must be bound to the same model.  

````Component
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
             Pageable="true" Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true"
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
        MyData.Remove(args.Item);
        InsertItem(args);
    }

    private void OnSecondGridRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
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
        HireDate = DateTime.Now.AddDays(-x*2).Date
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
````Extensions
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TelerikBlazorAppServer.Shared
{
    public static class EmployeeExtensions
    {
        public static Employee FindRecursive(this List<Employee> storageItems, Func<Employee, bool> condition)
        {
            for (int i = 0; i < storageItems?.Count; i++)
            {
                var storageItem = storageItems[i];
                var matchedItem = storageItem.FindRecursive(condition);

                Employee item = new Employee();

                if (matchedItem != null)
                {
                    return matchedItem;
                }
            }

            return default;
        }

        public static Employee FindRecursive(this Employee storageItem, Func<Employee, bool> selector)
        {
            if (selector(storageItem) == true)
            {
                return storageItem;
            }

            for (int i = 0; i < storageItem.DirectReports?.Count; i++)
            {
                var item = storageItem.DirectReports[i];

                if (selector(item))
                {
                    return item;
                }
                else
                {
                    var childItem = item.DirectReports.FindRecursive(selector);

                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return default;
        }
    }
}
````
````Model
public class Employee
{
    // hierarchical data collections
    public List<Employee> DirectReports { get; set; }

    // data fields for display
    public int Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public DateTime HireDate { get; set; }
}
````

### Drag and Drop multiple Rows

You can drag and drop multiple rows in one or between multiple instances of the Grid. To enable it, you should set the `SelectionMode` parameter of the TelerikGrid to `GridSelectionMode.Multiple`.

When you select multiple rows the row drag clue will be `N items selected` where `N` is the number of selected rows.

````Component
@* Select multiple rows and reorder them in the Grid. *@

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true"
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
        if (args.Items.Contains(args.DestinationItem))
        {
            return;
        }

        foreach(var item in args.Items)
        {
            MyData.Remove(item);
        }

        var destinationItemIndex = MyData.IndexOf(args.DestinationItem);

        if(args.DropPosition == GridRowDropPosition.After)
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
````Extensions
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TelerikBlazorAppServer.Shared
{
    public static class EmployeeExtensions
    {
        public static Employee FindRecursive(this List<Employee> storageItems, Func<Employee, bool> condition)
        {
            for (int i = 0; i < storageItems?.Count; i++)
            {
                var storageItem = storageItems[i];
                var matchedItem = storageItem.FindRecursive(condition);

                Employee item = new Employee();

                if (matchedItem != null)
                {
                    return matchedItem;
                }
            }

            return default;
        }

        public static Employee FindRecursive(this Employee storageItem, Func<Employee, bool> selector)
        {
            if (selector(storageItem) == true)
            {
                return storageItem;
            }

            for (int i = 0; i < storageItem.DirectReports?.Count; i++)
            {
                var item = storageItem.DirectReports[i];

                if (selector(item))
                {
                    return item;
                }
                else
                {
                    var childItem = item.DirectReports.FindRecursive(selector);

                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return default;
        }
    }
}
````
````Model
public class Employee
{
    // hierarchical data collections
    public List<Employee> DirectReports { get; set; }

    // data fields for display
    public int Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public DateTime HireDate { get; set; }
}
````

## Limitations

* [Grouping]({%slug components/grid/features/grouping%}) is not supported.

## See Also

  * [Grid Overview]({%slug components/grid/overview%})
  * [Live Demos: Grid](https://demos.telerik.com/blazor-ui/grid/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1)

