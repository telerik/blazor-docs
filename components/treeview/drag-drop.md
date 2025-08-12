---
title: Drag and Drop
page_title: Treeview Drag and Drop - Overview
description: Overview of the Drag and Drop functionality for Treeview for Blazor.
slug: treeview-drag-drop-overview
tags: telerik,blazor,treeview,drap,drop,dragdrop,overview
published: True
position: 11
---

# Drag and Drop

The Drag and Drop functionality for the TreeView allows you to move a node or multitude of nodes between different parents in the same treeview or between different Telerik TreeView instances.

This article is divided in the following sections:

* [Basics](#basics)
* [`OnDragStart` Event](#ondragstart-event)
* [`OnDrag` Event](#ondrag-event)
* [`OnDrop` Event](#ondrop-event)
* [`OnDragEnd` Event](#ondragend-event)
* [Examples](#examples)
    * [TreeView Drag and Drop Events Example](#treeview-drag-and-drop-events)
    * [Drag and Drop between TreeView, Grid, TreeList and Scheduler](#drag-and-drop-between-treeview-grid-treelist-and-scheduler)
    * [Flat Data](#flat-data)
    * [Hierarchical Data](#hierarchical-data)
    * [Between Different TreeViews](#between-different-treeviews)

## Basics

To enable the Drag and Drop functionality:

1. Set the `Draggable` parameter of the `<TelerikTreeView>` to `true`

1. Use the Drag events to handle the drag and drop operations and modify the data source as per your business logic.

## OnDragStart Event

The `OnDragStart` event fires when the user starts dragging a node. It provides details for the dragged item and allows you to cancel the event.

### Event Arguments

The `OnDragStart` event handler receives as an argument an object of type `TreeViewDragStartEventArgs` that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Item` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `IsCancelled`| `bool` | Whether the event is to be prevented. |

## OnDrag Event

The `OnDrag` event fires continuously while the user is dragging a node.

### Event Arguments

The `OnDrag` event handler receives as an argument an object of type `TreeViewDragEventArgs` that contains:

| Parameter | Type | Description |
| --- | --- | --- |
| `Item` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DestinationItem` | `object` | Represents the row over which the `Item` is. You can cast this object to your model class. |
| `DestinationTreeView` | `object` | The reference of the TreeView in which the `Item` is dropped. |
| `DestinationIndex` | `string` | The index in the target component where the drop will happen. |
| `DestinationComponentId` | `string` | The `Id` of the target component in which the drop will happen. |
| `DropPosition` | `enum` | Its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`. |
| `PageX` | `double` | Represents the X coordinate of the mouse. |
| `PageY` | `double` | Represents the Y coordinate of the mouse. |

## OnDrop Event

The `OnDrop` event fires when the user drops a node to a new location. It is triggered only if the new location is a Telerik component. The event allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnDrop` event provides an object of type `TreeViewDropEventArgs` to its event handler which exposes the following fields:

| Parameter | Type | Description |
| --- | --- | --- |
| `Item` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DestinationItem` | `object` | Represents the row over which the `Item` is dropped. You can cast this object to your model class. |
| `Items` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DropPosition` | `enum` | Its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`. |
| `DestinationGrid` | `object` | The reference of the Grid in which the row is dropped. This is applicable when you drag and drop rows between different grids. |
| `DestinationIndex` | `string` | The index where the drop will happen in the second component. |
| `DestinationComponentId` | `string` | The `Id` of the second component in which the drop will happen. |

## OnDragEnd Event

The `OnDragEnd` event fires when a drag operation ends. The event is triggered after `OnDrop` and unlike it, `OnDragEnd` will fire even if the drop location is not a Telerik component. In this case, the non-applicable event arguments will be `null`.

### Event Arguments

The `OnDragEnd` event handler receives as an argument an object of type `TreeViewDragEndEventArgs` that contains:

| Parameter | Type | Description |
| --- | --- | --- |
| `DestinationItem` | `object` | Represents the row over which the `Item` is. You can cast this object to your model class. |
| `DestinationTreeView` | `object` | The reference of the TreeView in which the `Item` is dropped. |
| `DestinationIndex` | `string` | The index in the target component where the drop will happen. |
| `DestinationComponentId` | `string` | The `Id` of the target component in which the drop will happen. |
| `DropPosition` | `enum` | Its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`. |

## Examples

* [TreeView Drag and Drop Events Example](#treeview-drag-and-drop-events)
* [Drag and Drop between TreeView, Grid, TreeList and Scheduler](#drag-and-drop-between-treeview-grid-treelist-and-scheduler)
* [Flat Data](#flat-data)
* [Hierarchical Data](#hierarchical-data)
* [Between Different TreeViews](#between-different-treeviews)

### TreeView Drag and Drop Events

>caption Handle Blazor TreeView Drag Events

````RAZOR
<div>
    Current Item: @CurrentItem
    <br />
    Current Location: @Location @DestinationItem
    <br />
    @Hint
</div>

<TelerikTreeView Data="@Data"
                 Id="TreeView"
                 @bind-ExpandedItems="@ExpandedItems"
                 Draggable="true"
                 OnDrop="@OnItemDrop"
                 OnDragStart="@OnDragStart"
                 DragThrottleInterval="150"
                 OnDrag="@OnDrag"
                 OnDragEnd="@OnDragEnd">
    <TreeViewBindings>
        <TreeViewBinding ParentIdField="Parent"></TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    private string CurrentItem { get; set; }
    private string DestinationItem { get; set; }
    private string Location { get; set; }
    private string Hint { get; set; } = "Documents and its children cannot be moved";
    private List<TreeItem> Data { get; set; }
    private IEnumerable<object> ExpandedItems { get; set; }

    public class TreeItem
    {
        public int Id { get; set; }
        public int? Parent { get; set; }
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool HasChildren { get; set; }

        public TreeItem(int id, int? parent, string text, ISvgIcon icon, bool hasChildren)
        {
            Id = id;
            Parent = parent;
            Text = text;
            Icon = icon;
            HasChildren = hasChildren;
        }
    }

    private void OnDragStart(TreeViewDragStartEventArgs args)
    {
        var item = args.Item as TreeItem;
        if (item.Parent == 1 || item.Id == 1)
        {
            args.IsCancelled = true;
        }
        else
        {
            CurrentItem = item.Text;
        }
    }

    private void OnDrag(TreeViewDragEventArgs args)
    {
        if (args.DestinationItem != null)
        {
            var destination = args.DestinationItem as TreeItem;
            DestinationItem = destination.Text;
        }
        if (args.DropPosition != null)
        {
            Location = args.DropPosition.Value.ToString().ToLower();
        }
        else
        {
            Location = "over";
        }
    }

    private void OnDragEnd(TreeViewDragEndEventArgs args)
    {
        var destination = args.DestinationItem as TreeItem;
        if (args.DestinationComponentId == "TreeView" && args.DropPosition!=null)
        {
            Hint = "Item was placed successfully";
        }
        else
        {
            Hint = "Invalid location";
        }
        CurrentItem = "";
        Location = "";
        DestinationItem = "";
    }

    protected override void OnInitialized()
    {
        LoadData();

        base.OnInitialized();
    }

    private void OnItemDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as TreeItem;
        var destinationItem = args.DestinationItem as TreeItem;

        if (destinationItem != null && IsChild(item, destinationItem))
        {
            return;
        }

        Data.Remove(item);

        if (item.Parent != null && !Data.Any(x => item.Parent == x.Parent))
        {
            Data.FirstOrDefault(x => x.Id == item.Parent).HasChildren = false;
        }

        if (args.DropPosition == TreeViewDropPosition.Over)
        {
            item.Parent = destinationItem.Id;
            destinationItem.HasChildren = true;

            Data.Add(item);
        }
        else
        {
            var index = Data.IndexOf(destinationItem);

            item.Parent = destinationItem.Parent;

            if (args.DropPosition == TreeViewDropPosition.After)
            {
                index++;
            }

            Data.Insert(index, item);
        }

        // Refresh data
        Data = new List<TreeItem>(Data);
    }

    private bool IsChild(TreeItem item, TreeItem destinationItem)
    {
        if (destinationItem?.Parent == null || item == null)
        {
            return false;
        }
        else if (destinationItem.Parent?.Equals(item.Id) == true)
        {
            return true;
        }

        var parentDestinationItem = Data.FirstOrDefault(e => e.Id.Equals(destinationItem.Parent));

        return IsChild(item, parentDestinationItem);
    }

    private void LoadData()
    {
        Data = new List<TreeItem>()
        {
            new TreeItem(1, null, "Documents", SvgIcon.Folder, true),
                new TreeItem(2, 1, "report.xlsx", SvgIcon.FileExcel, false),
                new TreeItem(3, 1, "status.docx", SvgIcon.FileWord, false),
                new TreeItem(4, 1, "conferences.xlsx", SvgIcon.FileExcel, false),
                new TreeItem(5, 1, "performance.pdf", SvgIcon.FilePdf, false),
            new TreeItem(6, null, "Pictures", SvgIcon.Folder, true),
                new TreeItem(7, 6, "Camera Roll", SvgIcon.Folder, true),
                    new TreeItem(8, 7, "team.png", SvgIcon.FileImage, false),
                    new TreeItem(9, 7, "team-building.png", SvgIcon.FileImage, false),
                    new TreeItem(10, 7, "friends.png", SvgIcon.FileImage, false),
        };
        ExpandedItems = Data.ToList();
    }

}
````

### Drag and Drop between TreeView, Grid, TreeList and Scheduler

The functionality allows dragging items between TreeView, [Grid](slug:grid-drag-drop-overview), [TreeList](slug:treelist-drag-drop-overview) and [Scheduler](slug:scheduler-overview). To achieve it, set the `Draggable`/`RowDraggable` parameter, and implement it through an event -  `OnDrop`/`OnRowDrop`.

>important Drag and Drop from **Scheduler** to Grid, TreeList, TreeView is **not** yet supported. Only the reversed way.

#### Drag and Drop between TreeView and Grid

<div class="skip-repl"></div>
````RAZOR Index.razor
@* Drag and drop in Grid and TreeView. *@

@using System.Collections.Generic;
@using System.Collections.ObjectModel;

@inject PersonService PersonService;

<TelerikGrid Data="@GridData"
             Id="Grid1"
             Width="450px"
             RowDraggable="true"
             @ref="@GridRef"
             OnRowDrop="@((GridRowDropEventArgs<Person> args) => GridRowDrop(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(Person.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" />
        <GridColumn Field=@nameof(Person.Name) />
    </GridColumns>
</TelerikGrid>

<TelerikTreeView @ref="@TreeRef"
                 Id="TreeView1"
                 Data="@TreeData"
                 OnDrop="@TreeViewDrop"
                 Draggable="true">
    <TreeViewBindings>
        <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
    </TreeViewBindings>
</TelerikTreeView>

@code {
    private List<Person> GridData { get; set; }
    private TelerikGrid<Person> GridRef { get; set; }

    private TelerikTreeView TreeRef { get; set; }
    private TreeViewObservableFlatDataService TreeService { get; set; }
    private ObservableCollection<BaseFlatItem> TreeData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadData();
    }

    private async Task LoadData()
    {
        var people = await PersonService.GetPeopleAsync();
        GridData = people.Take(10).ToList();

        TreeService = new TreeViewObservableFlatDataService("Item");
        TreeData = TreeService.GetFlatItems();
    }

    private void GridRowDrop(GridRowDropEventArgs<Person> args)
    {
        foreach (var item in args.Items)
        {
            GridData.Remove(item);
        }

        if (args.DestinationComponentId == "TreeView1")
        {
            var destinationItem = (BaseFlatItem)TreeRef.GetItemFromDropIndex(args.DestinationIndex);

            args.Items
                .Select(item => new BaseFlatItem() { Text = item.Name, Id = Guid.NewGuid() })
                .ToList()
                .ForEach(item => UpdateTreeView(item, destinationItem, args.DropPosition));
        }
        else if (args.DestinationComponentId == "Grid1")
        {
            InsertItemsIntoGrid(args.Items, args.DestinationItem, args.DropPosition);
        }
    }

    private void TreeViewDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;

        if (args.DestinationComponentId == "TreeView1")
        {
            UpdateTreeView(item, args.DestinationItem as BaseFlatItem, (GridRowDropPosition)(int)args.DropPosition);
        }
        else if (args.DestinationComponentId == "Grid1")
        {
            var sourceItems = TreeService.GetChildItems(item)
                .Append(item)
                .Select(item => new Person() { Name = item.Text, EmployeeId = GridData.Max(x => x.EmployeeId) + 1 });

            TreeService.Remove(item, true);

            var destinationItem = GridRef.GetItemFromDropIndex(args.DestinationIndex);

            InsertItemsIntoGrid(sourceItems, destinationItem, (GridRowDropPosition)(int)args.DropPosition);

            GridRef.Rebind();
        }
    }

    private void InsertItemsIntoGrid(IEnumerable<Person> items, Person destinationItem, GridRowDropPosition dropPosition)
    {
        var destinationIndex = 0;
        if (destinationItem != null)
        {
            destinationIndex = GridData.IndexOf(destinationItem);
            if (dropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        GridData.InsertRange(destinationIndex, items);
    }

    private void UpdateTreeView(BaseFlatItem item, BaseFlatItem destinationItem, GridRowDropPosition dropPosition)
    {
        if (dropPosition == GridRowDropPosition.Over)
        {
            TreeService.AddChild(item, destinationItem);
        }
        else if (dropPosition == GridRowDropPosition.After)
        {
            TreeService.AddNextSibling(item, destinationItem);
        }
        else if (dropPosition == GridRowDropPosition.Before)
        {
            TreeService.AddPrevSibling(item, destinationItem);
        }
    }
}
````
````C# PersonService.cs
public class PersonService
{
    private List<Person> _people;

    public List<Person> People
    {
        get
        {
            if (_people == null)
            {
                _people = GeneratePeople(30);
            }

            return _people;
        }
    }

    public async Task<List<Person>> GetPeopleAsync()
    {
        await Task.Delay(50);

        return People;
    }

    private List<Person> GeneratePeople(int count, int startIndex = 0)
    {
        List<Person> result = new List<Person>();

        for (int i = startIndex; i < startIndex + count; i++)
        {
            result.Add(new Person()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                AgeInYears = i,
                GraduateGrade = (i % 6) + 1,
                HireDate = new DateTime(2020, 6, 1).Date.AddDays(count - (i % 7)),
                MeetingDate = new DateTime(2020, 6, 1).Date.AddDays((i % 4)),
                IsOutOfOffice = i % 3 == 0 ? true : false
            });
        }

        return result;
    }
}
````
````C# Person.cs
using System.ComponentModel.DataAnnotations;

public class Person
{
    [Editable(false)]
    public int? EmployeeId { get; set; }

    [Required(ErrorMessage = "Enter a name")]
    public string Name { get; set; }

    [Display(Name = "Age in Years")]
    [Required(ErrorMessage = "Enter an int age")]
    [Range(0, 200, ErrorMessage = "Nobody is that old")]
    public int? AgeInYears { get; set; }

    [Display(Name = "Graduate Grade")]
    [Required(ErrorMessage = "Enter a graduate grade.")]
    [Range(1, 6, ErrorMessage = "Grades vary between 1 and 6.")]
    public decimal? GraduateGrade { get; set; }

    [Required(ErrorMessage = "Enter a hire date")]
    [Range(typeof(DateTime), "10/10/2016", "10/10/2020", ErrorMessage = "Hire Date must be between 10/10/2016 and 10/10/2020")]
    public DateTime HireDate { get; set; }

    [Display(AutoGenerateField = false, Name = "Meeting Date")]
    public DateTime MeetingDate { get; set; }

    public bool IsOutOfOffice { get; set; }

    public Person()
    {
        GraduateGrade = 1;
    }
}
````
````C# TreeViewObservableFlatDataService.cs
using System.Collections.ObjectModel;
using Telerik.DataSource.Extensions;

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
                    HasChildren = level < 2,
                    Text = name
                };

                items.Add(item);

                if (level < 2)
                {
                    foreach (var childItem in GenerateFlatItems(id, level + 1, name + "."))
                    {
                        items.Add(childItem);
                    }
                }
            }

            return items;
        }


        #region Reorder

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

        public void AddChildren(List<BaseFlatItem> children)
        {
            ObservableFlatItems.AddRange(children);
        }

        public void AddPrevSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove node
            Remove(flatItem);

            // add the node at the position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 0);
        }

        public void AddNextSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove node
            Remove(flatItem);

            // add the node at the next position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 1);
        }

        private void AddSibling(
            BaseFlatItem flatItem,
            BaseFlatItem siblingFlatItem,
            int direction)
        {
            // get parent of the sibling node
            var parentItem = ObservableFlatItems.FirstOrDefault(f => f.Id == siblingFlatItem.ParentId);

            // handle movement from another parent
            flatItem.ParentId = siblingFlatItem.ParentId;

            // insert the node at the place of the sibling item
            ObservableFlatItems.Insert(ObservableFlatItems.IndexOf(siblingFlatItem) + direction, flatItem);
        }

        public void Remove(BaseFlatItem flatItem, bool removeChildren = false)
        {
            // update the hasChildren state of the parent item of the source flat item that is dragged
            var parentFlatItem = ObservableFlatItems.FirstOrDefault(f => f.Id == flatItem.ParentId);

            if (parentFlatItem != null)
            {
                var childItemsCount = ObservableFlatItems.Count(child => child.ParentId == parentFlatItem.Id);

                parentFlatItem.HasChildren = childItemsCount > 1;
            }

            if (removeChildren)
            {
                var children = GetChildItems(flatItem);

                foreach (var item in children)
                {
                    ObservableFlatItems.Remove(flatItem);
                }
            }

        ObservableFlatItems.Remove(flatItem);
    }

    public List<BaseFlatItem> GetChildItems(BaseFlatItem item)
    {
        var allRelatedItems = new List<BaseFlatItem>();

        GetChildItems(item, allRelatedItems);

        return allRelatedItems;
    }

    private void GetChildItems(BaseFlatItem parentItem, List<BaseFlatItem> result)
    {
        foreach (var item in ObservableFlatItems.Where(it => it.ParentId == parentItem.Id))
        {
            result.Add(item);

            GetChildItems(item, result);
        }
    }

    #endregion
}
````
````C# BaseFlatItem.cs
public class BaseFlatItem
{
    public Guid Id { get; set; }
    public Guid? ParentId { get; set; }
    public string Text { get; set; }
    public bool HasChildren { get; set; }
}
````

See more applicable examples in the [Grid Drag and Drop article](slug:grid-drag-drop-overview).

### Flat Data

<div class="skip-repl"></div>
````RAZOR Component
@inject TreeViewFlatDataService TreeViewFlatDataService

    <TelerikTreeView Data="@FlatData"
                     Draggable="@Draggable"
                     OnDrop="@OnDrop">
        <TreeViewBindings>
            <TreeViewBinding TextField="Text" ParentIdField="ParentId" />
        </TreeViewBindings>
    </TelerikTreeView>

@code {
    public bool Draggable { get; set; } = true;
    public List<BaseFlatItem> FlatData { get; set; }

    protected override void OnInitialized()
    {
        FlatData = TreeViewFlatDataService.GetFlatItems();
    }

    private void OnDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseFlatItem;
        var destinationItem = args.DestinationItem as BaseFlatItem;

        FlatData = TreeViewFlatDataService.ReorderItems(args.DropPosition, item, destinationItem);
    }
}
````
````C# Service
using System;
using System.Collections.Generic;
using System.Linq;
using Telerik.Blazor;
using TelerikBlazorAppSource.Models;

    public class TreeViewFlatDataService
    {
        private string ItemText { get; set; }

        private List<BaseFlatItem> _flatItems;

        private List<BaseFlatItem> FlatItems
        {
            get
            {
                if (_flatItems == null)
                {
                    _flatItems = GenerateFlatItems(null, 0, ItemText);
                }

                return _flatItems;
            }
        }

        public TreeViewFlatDataService()
        {
            ItemText = "Item";
        }

        public TreeViewFlatDataService(string text)
        {
            ItemText = text;
        }

        public List<BaseFlatItem> GetFlatItems()
        {
            return FlatItems;
        }

        private List<BaseFlatItem> GenerateFlatItems(Guid? parentId, int level, string parentName)
        {
            var items = new List<BaseFlatItem>();

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
                    items.AddRange(GenerateFlatItems(id, level + 1, name + "."));
                }
            }

            return items;
        }

        public List<BaseFlatItem> ReorderItems(TreeViewDropPosition position, BaseFlatItem sourceItem, BaseFlatItem destinationItem)
        {
            // remove the source item from the current position
            Remove(sourceItem);

            // insert in the right place according to the dropposition
            ReorderCollection(position, sourceItem, destinationItem);

            return new List<BaseFlatItem>(FlatItems);
        }

        private void Remove(BaseFlatItem sourceItem)
        {
            // update the hasChildren state of the parent item of the source flat item that is dragged

            var parentFlatItem = FlatItems.FirstOrDefault(f => f.Id == sourceItem.ParentId);

            if (parentFlatItem != null)
            {
                var childItemsCount = FlatItems.Count(child => child.ParentId == parentFlatItem.Id);

                parentFlatItem.HasChildren = childItemsCount > 1;
            }

            FlatItems.Remove(sourceItem);
        }

        private void ReorderCollection(TreeViewDropPosition position, BaseFlatItem sourceItem, BaseFlatItem destinationItem)
        {
            if (position == TreeViewDropPosition.Over)
            {
                // simply change the parent id and add it in the collection, so that the item will be placed on last position
                sourceItem.ParentId = destinationItem.Id;

                FlatItems.Add(sourceItem);
            }
            else if (position == TreeViewDropPosition.Before)
            {
                // handle movement in other parent
                sourceItem.ParentId = destinationItem.ParentId;

                FlatItems.Insert(FlatItems.IndexOf(destinationItem), sourceItem);
            }
            else if (position == TreeViewDropPosition.After)
            {
                // handle movement in other parent
                sourceItem.ParentId = destinationItem.ParentId;

                FlatItems.Insert(FlatItems.IndexOf(destinationItem), sourceItem);
            }
        }
    }
````
````C# Model
    public class BaseFlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
    }
````

### Hierarchical Data

<div class="skip-repl"></div>
````RAZOR Component
@inject TreeViewHierarchicalDataService TreeViewHierarchicalDataService

<TelerikTreeView Data="@HierarchicalData"
                 Draggable="@Draggable"
                 OnDrop="@OnDrop">
    <TreeViewBindings>
        <TreeViewBinding ItemsField="Items" HasChildrenField="HasItems"></TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>


@code {
    public bool Draggable { get; set; } = true;
    public List<BaseHierarchicalItem> HierarchicalData { get; set; }

    protected override void OnInitialized()
    {
        HierarchicalData = TreeViewHierarchicalDataService.GetHierarchicalItems();
    }

    private void OnDrop(TreeViewDropEventArgs args)
    {
        var item = args.Item as BaseHierarchicalItem;
        var destinationItem = args.DestinationItem as BaseHierarchicalItem;

        HierarchicalData = TreeViewHierarchicalDataService.ReorderHierarchicalItems(args.DropPosition, item, destinationItem);
    }
}
````
````C# Service
using System.Collections.Generic;
using Telerik.Blazor;

    public class TreeViewHierarchicalDataService
    {
        private string ItemText { get; set; }

        private List<BaseHierarchicalItem> _hierarchicalItems;

        private List<BaseHierarchicalItem> HierarchicalItems
        {
            get
            {
                if (_hierarchicalItems == null)
                {
                    _hierarchicalItems = GenerateHierarchicalItems(ItemText);
                }

                return _hierarchicalItems;
            }
        }

        public TreeViewHierarchicalDataService()
        {
            ItemText = "Item";
        }

        public TreeViewHierarchicalDataService(string text)
        {
            ItemText = text;
        }

        public List<BaseHierarchicalItem> GetHierarchicalItems()
        {
            return HierarchicalItems;
        }

        private List<BaseHierarchicalItem> GenerateHierarchicalItems(string parentName, int level = 0)
        {
            var items = new List<BaseHierarchicalItem>();

            for (var i = 1; i <= 4; i++)
            {
                var name = $"{parentName}{i}";

                var item = new BaseHierarchicalItem()
                {
                    HasChildren = level < 2,
                    Text = name
                };

                if (level < 2)
                {
                    item.Items = GenerateHierarchicalItems(name + ".", level + 1);
                }

                items.Add(item);
            }

            return items;
        }

        public List<BaseHierarchicalItem> ReorderHierarchicalItems(TreeViewDropPosition position, BaseHierarchicalItem sourceItem, BaseHierarchicalItem destinationItem)
        {
            // remove the item from its current place in the collection
            RemoveItem(sourceItem);

            // insert in the right place according to the dropposition
            ReorderCollection(position, sourceItem, destinationItem);

            return new List<BaseHierarchicalItem>(HierarchicalItems);
        }

        private void RemoveItem(BaseHierarchicalItem item)
        {
            // locate the parent of the source item
            var sourceParentItem = HierarchicalItems.FindRecursive(it => it.Items?.Contains(item) ?? false);
            var sourceCollection = sourceParentItem?.Items ?? HierarchicalItems;

            sourceCollection.Remove(item);
        }

        private void ReorderCollection(TreeViewDropPosition position, BaseHierarchicalItem sourceItem, BaseHierarchicalItem destinationItem)
        {
            var destinationParentItem = HierarchicalItems.FindRecursive(item => item.Items?.Contains(destinationItem) ?? false);

            if (destinationParentItem != null)
            {
                destinationParentItem.Items = destinationParentItem.Items ?? new List<BaseHierarchicalItem>();
            }

            var itemsCollection = destinationParentItem?.Items ?? HierarchicalItems;
            var destinationItemIndex = itemsCollection.IndexOf(destinationItem);

            if (position == TreeViewDropPosition.Over)
            {
                destinationItem.Items = destinationItem.Items ?? new List<BaseHierarchicalItem>();

                destinationItem.Items.Add(sourceItem);
            }
            else if (position == TreeViewDropPosition.Before)
            {
                itemsCollection.Insert(destinationItemIndex, sourceItem);
            }
            else if (position == TreeViewDropPosition.After)
            {
                itemsCollection.Insert(destinationItemIndex + 1, sourceItem);
            }
        }
    }
````
````C# Extensions
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

    public static class BaseHierarchicalItemExtensions
    {
        public static BaseHierarchicalItem FindRecursive(this List<BaseHierarchicalItem> storageItems, Func<BaseHierarchicalItem, bool> condition)
        {
            for (int i = 0; i < storageItems?.Count; i++)
            {
                var storageItem = storageItems[i];
                var matchedItem = storageItem.FindRecursive(condition);

                if (matchedItem != null)
                {
                    return matchedItem;
                }
            }

            return default;
        }

        public static BaseHierarchicalItem FindRecursive(this BaseHierarchicalItem storageItem, Func<BaseHierarchicalItem, bool> selector)
        {
            if (selector(storageItem) == true)
            {
                return storageItem;
            }

            for (int i = 0; i < storageItem.Items?.Count; i++)
            {
                var item = storageItem.Items[i];

                if (selector(item))
                {
                    return item;
                }
                else
                {
                    var childItem = item.Items.FindRecursive(selector);

                    if (childItem != null)
                    {
                        return childItem;
                    }
                }
            }

            return default;
        }
    }
````
````C# Model
    public class BaseHierarchicalItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<BaseHierarchicalItem> Items { get; set; }
        public bool HasChildren { get; set; }
        public bool HasItems => Items?.Count > 0;
    }
````

### Between Different TreeViews

When you drag and drop items from one instance of the TreeView to another, the `OnDrop` event fires for the TreeView where the item originally was.

<div class="skip-repl"></div>
````RAZOR Component
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
        SecondTreeService = new TreeViewObservableFlatDataService("Node");

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
````C# Service
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
            // remove node
            Remove(flatItem);

            // add the node at the position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 0);
        }

        public void AddNextSibling(BaseFlatItem flatItem, BaseFlatItem siblingFlatItem)
        {
            // remove node
            Remove(flatItem);

            // add the node at the next position of the sibling node
            AddSibling(flatItem, siblingFlatItem, 1);
        }

        private void AddSibling(
            BaseFlatItem flatItem,
            BaseFlatItem siblingFlatItem,
            int direction)
        {
            // get parent of the sibling node
            var parentItem = ObservableFlatItems.FirstOrDefault(f => f.Id == siblingFlatItem.ParentId);

            // handle movement from another parent
            flatItem.ParentId = siblingFlatItem.ParentId;

            // insert the node at the place of the sibling item
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
````C# Model
    public class BaseFlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Text { get; set; }
        public bool HasChildren { get; set; }
    }
````


## See Also

* [Live Demo: TreeView Drag and Drop](https://demos.telerik.com/blazor-ui/treeview/drag-drop)
* [Data Binding a TreeView](slug:components/treeview/data-binding/overview)
* [TreeView API Reference](slug:Telerik.Blazor.Components.TelerikTreeView)
* [Drag TreeView Items to a Custom Target](slug:treeview-kb-drag-to-custom-target)
