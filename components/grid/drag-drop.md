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

````CSHTML
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

### Drag and Drop a Row between Grids

When you drap and drop items from one instance of the Grid to another, the `OnRowDrop` event fires for both instances of the Grid. All instances must be bound to the same model.  

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

### Drag and Drop multiple Rows

When you drap and drop items from one instance of the TreeView to another, the `OnDrop` event fires for the TreeView where the item originally was.

````Component
@using System.Collections.ObjectModel

<TelerikTreeView @ref="@FirstTree"
                 Data="@FirstFlatData"
                 Draggable="true"
                 OnDrop="@OnDropFirst">
    <TreeViewBindings>
        <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
    </TreeViewBindings>
</TelerikTreeView>

<TelerikTreeView @ref="@SecondTree"
                 Data="@SecondFlatData"
                 OnDrop="@OnDropSecond"
                 Draggable="true">
    <TreeViewBindings>
        <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    public TelerikTreeView FirstTree { get; set; }
    public TelerikTreeView SecondTree { get; set; }

    public TreeViewObservableFlatDataService FirstTreeService { get; set; }
    public TreeViewObservableFlatDataService SecondTreeService { get; set; }

    public ObservableCollection<BaseFlatItem> FirstFlatData { get; set; }
    public ObservableCollection<BaseFlatItem> SecondFlatData { get; set; }

    protected override Task OnInitializedAsync()
    {
        FirstTreeService = new TreeViewObservableFlatDataService("Item");
        SecondTreeService = new TreeViewObservableFlatDataService("row");

        FirstFlatData = FirstTreeService.GetFlatItems();
        SecondFlatData = SecondTreeService.GetFlatItems();

        return base.OnInitializedAsync();
    }

    private void OnDropFirst(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        if (args.DestinationTreeView != FirstTree)
        {
            FirstTreeService.Remove(item);

            UpdateSecondTree(item, destinationItem, args.DropPosition);
        }
        else
        {
            UpdateFirstTree(item, destinationItem, args.DropPosition);
        }
    }

    private void OnDropSecond(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        if (args.DestinationTreeView != SecondTree)
        {
            SecondTreeService.Remove(item);

            UpdateFirstTree(item, destinationItem, args.DropPosition);
        }
        else
        {
            UpdateSecondTree(item, destinationItem, args.DropPosition);
        }
    }

    private void UpdateFirstTree(BaseFlatItem item, BaseFlatItem destinationItem, TreeViewDropPosition dropPosition)
    {
        if (dropPosition == TreeViewDropPosition.Over)
        {
            SecondTreeService.AddChild(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.After)
        {
            FirstTreeService.AddNextSibling(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.Before)
        {
            FirstTreeService.AddPrevSibling(item, destinationItem);
        }
    }

    private void UpdateSecondTree(BaseFlatItem item, BaseFlatItem destinationItem, TreeViewDropPosition dropPosition)
    {
        if (dropPosition == TreeViewDropPosition.Over)
        {
            SecondTreeService.AddChild(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.After)
        {
            SecondTreeService.AddNextSibling(item, destinationItem);
        }
        else if (dropPosition == TreeViewDropPosition.Before)
        {
            SecondTreeService.AddPrevSibling(item, destinationItem);
        }
    }
}
````
````Service
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

    public class TreeViewObservableFlatDataService
    {
        private string ItemText { get; set; }

        private ObservableCollection<BaseFlatItem> _observableFlatItems;

        public TreeViewObservableFlatDataService()
        {
            ItemText = "Item";
        }

        public TreeViewObservableFlatDataService(string text)
        {
            ItemText = text;
        }

        private ObservableCollection<BaseFlatItem> ObservableFlatItems
        {
            get
            {
                if (_observableFlatItems == null)
                {
                    _observableFlatItems = GenerateFlatItems(null, 0, ItemText);
                }

                return _observableFlatItems;
            }
        }

        public ObservableCollection<BaseFlatItem> GetFlatItems()
        {
            return ObservableFlatItems;
        }

        public async Task<ObservableCollection<BaseFlatItem>> GetFlatItemsAsync()
        {
            await Task.Delay(50);

            return GetFlatItems();
        }

        private ObservableCollection<BaseFlatItem> GenerateFlatItems(Guid? parentId, int level, string parentName)
        {
            var items = new ObservableCollection<BaseFlatItem>();

            for (var i = 1; i <= 4; i++)
            {
                var id = Guid.NewGuid();
                var name = $"{parentName}{i}";

                var item = new BaseFlatItem()
                {
                    Id = id,
                    ParentId = parentId,
                    HasChildren = level < 3,
                    Text = name
                };

                items.Add(item);

                if (level < 3)
                {
                    foreach (var childItem in GenerateFlatItems(id, level + 1, name + "."))
                    {
                        items.Add(childItem);
                    }
                }
            }

            return items;
        }

        public void AddChild(BaseFlatItem flatItem, BaseFlatItem parentFlatItem)
        {
            // remove from the collection to assure last place in the collection
            Remove(flatItem);

            flatItem.ParentId = parentFlatItem?.Id;

            // locate previous parent to toggle haschildren property
            if (parentFlatItem != null)
            {
                parentFlatItem.HasChildren = true;
            }

            ObservableFlatItems.Add(flatItem);
        }

        public void AddPrevSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove row
            Remove(flatItem);

            // add the row at the position of the sibling row
            AddSibling(flatItem, siblingFlatItem, 0);
        }

        public void AddNextSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove row
            Remove(flatItem);

            // add the row at the next position of the sibling row
            AddSibling(flatItem, siblingFlatItem, 1);
        }

        private void AddSibling(
            BaseFlatItem flatItem,
            BaseFlatItem siblingFlatItem,
            int direction)
        {
            // get parent of the sibling row
            var parentItem = ObservableFlatItems.FirstOrDefault(f => f.Id == siblingFlatItem.ParentId);

            // handle movement from another parent
            flatItem.ParentId = siblingFlatItem.ParentId;

            // insert the row at the place of the sibling item
            ObservableFlatItems.Insert(ObservableFlatItems.IndexOf(siblingFlatItem) + direction, flatItem);
        }

        public void Remove(BaseFlatItem flatItem)
        {
            // update the hasChildren state of the parent item of the source flat item that is dragged

            var parentFlatItem = ObservableFlatItems.FirstOrDefault(f => f.Id == flatItem.ParentId);

            if (parentFlatItem != null)
            {
                var childItemsCount = ObservableFlatItems.Count(child => child.ParentId == parentFlatItem.Id);

                parentFlatItem.HasChildren = childItemsCount > 1;
            }

            ObservableFlatItems.Remove(flatItem);
        }
    }
````
````Model
    public class BaseFlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
        public bool Expanded { get; set; }
    }
````


## See Also

  * [Data Binding a TreeView]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/drag-drop)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTreeView)

