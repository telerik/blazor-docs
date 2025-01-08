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
    * [Drag and Drop between Grid, TreeList, TreeView and Scheduler](#drag-and-drop-between-grid-treelist-treeview-and-scheduler)
    * [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)
* [Limitations](#limitations)

## Basics

To enable the Drag and Drop functionality:

1. Set the `RowDraggable` parameter of the `<TelerikGrid>` to `true`

1. Use the `OnRowDrop` event to handle the drag and drop operations and modify the data source as per your business logic.

The row drag and drop functionality works with a dedicated column which is always rendered as the first column when the feature is enabled.  

If the user drags selected rows, the current row selection will be cleared on row drop.

## OnRowDrop Event

The `OnRowDrop` event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnRowDrop` event provides an object of type `GridRowDropEventArgs<T>` to its event handler which exposes the following fields:

| Parameter | Type | Description |
| --- | --- | --- |
| `Item` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DestinationItem` | `object` | Represents the row over which the `Item` is dropped. You can cast this object to your model class. |
| `Items` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DropPosition` | `enum` | Its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`. |
| `DestinationGrid` | `object` | The reference of the Grid in which the row is dropped. This is applicable when you drag and drop rows between different grids. |
| `DestinationIndex` | `string` | The index where the drop will happen in the second component. |
| `DestinationComponentId` | `string` | The `Id` of the second component in which the drop will happen. |

## GridRowDraggableSettings

The `GridRowDraggableSettings` is a child tag under the `<GridSettings>`, which is a child tag of the `<TelerikGrid>`. It exposes the following parameters:

* `DragClueField` - `string` - defines which field will be used to render the drag clue text. By default, this parameter will take the value of the first bound column of the first dragged row. 

You can find examples of its usage below.

## Examples

This section contains the following examples:

* [Drag and Drop a Row in the same Grid](#drag-and-drop-a-row-in-the-same-grid)
* [Drag and Drop a Row between Grids](#drag-and-drop-a-row-between-grids)
* [Drag and Drop between Grid, TreeList, TreeView and Scheduler](#drag-and-drop-between-grid-treelist-treeview-and-scheduler)
* [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

### Drag and Drop a Row in the same Grid

````RAZOR
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

When you drag and drop items from one Grid to another, the `OnRowDrop` event fires for both Grid instances, so you can update their data sources. All Grid instances must be bound to the same model type. It is also possible to [bind the Grids to different models, but they must be derived from the same interface](slug://grid-kb-drag-drop-different-models).

The target drop area in the Grid is the `<table>` element. Users cannot drop items in the empty space below the last table row and this includes the `NoDataTemplate` too. There are two ways to prevent possible confusion and enhance the UX:

* Do not set a Grid `Height`, so that there is no empty space below the last table row.
* Define a [`NoDataTemplate`](slug://grid-templates-no-data), which fills the Grid data area.

The following example demonstrates both these options:

>caption Drag and drop items between Grids

````RAZOR
<TelerikGrid @ref="@FirstGridRef"
             Data="@MyData"
             Pageable="true"
             PageSize="5"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
    </GridColumns>
</TelerikGrid>

<TelerikGrid Data="@MySecondGridData"
             Pageable="true"
             PageSize="5"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnSecondGridRowDropHandler(args))"
             Height="300px">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <NoDataTemplate>
        <div style="padding:85px 0">Drag and drop rows here...</div>
    </NoDataTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> FirstGridRef { get; set; }

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
        var destinationData = args.DestinationGrid == FirstGridRef ? MyData : MySecondGridData;

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

    private List<SampleData> MyData = Enumerable.Range(1, 12).Select(x => new SampleData
    {
        Id = 100 + x,
        Name = "Name " + (100 + x),
        Team = "Team " + (x % 5 + 1),
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    private List<SampleData> MySecondGridData = Enumerable.Range(1, 3).Select(x => new SampleData
    {
        Id = 200 + x,
        Name = "Name  " + (200 + x),
        Team = "Team " + (x % 3 + 1),
        HireDate = DateTime.Now.AddDays(-x * 2).Date
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

### Drag and Drop between Grid, TreeList, TreeView and Scheduler

The functionality allows dragging items between Grid, [TreeList](slug://treelist-drag-drop-overview), [TreeView](slug://treeview-drag-drop-overview), and [Scheduler](slug://scheduler-overview). To achieve it, set the `Draggable`/`RowDraggable` parameter, and implement it through an event -  `OnDrop`/`OnRowDrop`.

>important Drag and Drop from **Scheduler** to Grid, TreeList, TreeView is **not** yet supported. Only the reversed way.

#### Drag and Drop between Grid and TreeList

<div class="skip-repl"></div>
````RAZOR Index.razor
@using System.Collections.Generic;
@using System.Collections.ObjectModel;

@inject PersonService PersonService;
@inject TreeListService TreeService;

<TelerikGrid Data="@GridData"
             Id="Grid1"
             Pageable="true"
             Width="450px"
             PageSize="10"
             Sortable="true"
             RowDraggable="true"
             SelectionMode="@GridSelectionMode.Multiple"
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
<TelerikTreeList Data="@TreeData"
                 Id="TreeList1"
                 ItemsField="Items"
                 Pageable="true"
                 Width="550px"
                 RowDraggable="true"
                 @ref="@TreeListRef"
                 ParentIdField="ParentId"
                 OnRowDrop="@((TreeListRowDropEventArgs<FlatItem> args) => TreeListDrop(args))">
    <TreeListSettings>
        <TreeListRowDraggableSettings DragClueField="@nameof(FlatItem.StringProp)"></TreeListRowDraggableSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="Id"></TreeListColumn>
        <TreeListColumn Field="StringProp" Expandable="true"></TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    public List<Person> GridData { get; set; }
    public TelerikGrid<Person> GridRef { get; set; }
    public TelerikTreeList<FlatItem> TreeListRef { get; set; }
    public List<FlatItem> TreeData { get; set; }
    protected override async Task OnInitializedAsync()
    {
        await LoadData();
    }
    private async Task LoadData()
    {
        var people = await PersonService.GetPeopleAsync();
        GridData = people.Take(10).ToList();
        var treeListData = await TreeService.GetFlatItemsAsync();
        TreeData = treeListData.Take(10).ToList();
    }
    private void GridRowDrop(GridRowDropEventArgs<Person> args)
    {
        foreach (var item in args.Items)
        {
            GridData.Remove(item);
        }
        if (args.DestinationComponentId == "TreeList1")
        {
            var destinationItem = (FlatItem)TreeListRef.GetItemFromDropIndex(args.DestinationIndex);
            args.Items
                .Select(item => new FlatItem() { StringProp = item.Name, Id = Guid.NewGuid() }).ToList()
                .ForEach(item => UpdateTreeList(item, destinationItem, (TreeListRowDropPosition)(int)args.DropPosition));
        }
        else if (args.DestinationComponentId == "Grid1")
        {
            InsertItemsIntoGrid(args.Items, args.DestinationItem, args.DropPosition);
        }
    }
    private void TreeListDrop(TreeListRowDropEventArgs<FlatItem> args)
    {
        var item = args.Item as FlatItem;
        if (args.DestinationComponentId == "TreeList1")
        {
            var destinationItem = (FlatItem)TreeListRef.GetItemFromDropIndex(args.DestinationIndex);
            UpdateTreeList(item, destinationItem, (TreeListRowDropPosition)(int)args.DropPosition);
        }
        else if (args.DestinationComponentId == "Grid1")
        {
            var sourceItems = TreeData
            .Where(x => x.ParentId == item.Id)
            .Select(item => new Person() { Name = item.StringProp, EmployeeId = GridData.Max(x => x.EmployeeId) + 1 });
            TreeData.Remove(item);
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
        TreeListRef.Rebind();
    }
    private void UpdateTreeList(FlatItem item, FlatItem destinationItem, TreeListRowDropPosition dropPosition)
    {
        var destinationIndex = 0;
        if (destinationItem != null)
        {
            destinationIndex = TreeData.IndexOf(destinationItem);
            if (dropPosition == TreeListRowDropPosition.Over)
            {
                item.ParentId = destinationItem.Id;
            }
            else if (dropPosition == TreeListRowDropPosition.After)
            {
                destinationIndex += 1;
            }
            else if (dropPosition == TreeListRowDropPosition.Before)
            {
                destinationIndex += 1;
            }
            TreeData.Insert(destinationIndex, item);
        }
        TreeData = new List<FlatItem>(TreeData);
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
````C# TreeListService.cs
public class TreeListService
    {
        private List<FlatItem> _flatItems;

        public Task<List<FlatItem>> GetFlatItemsAsync(int maxLevel = 3, int itemsPerLevel = 7, bool useCachedData = false)
        {
            List<FlatItem> data;

            if (useCachedData)
            {
                if (_flatItems == null)
                {
                    _flatItems = GenerateFlatItems(null, 0, maxLevel, itemsPerLevel, "Item");
                }

                data = _flatItems;
            }
            else
            {
                data = GenerateFlatItems(null, 0, maxLevel, itemsPerLevel, "Item");
            }

            return Task.FromResult(data);
        }

        private List<FlatItem> GenerateFlatItems(Guid? parentId, int level, int maxLevel, int itemsPerLevel, string parentName)
        {
            var items = new List<FlatItem>();

            for (var i = 1; i <= itemsPerLevel; i++)
            {
                var id = Guid.NewGuid();
                var name = $"{parentName} : {i}";

                var product = new FlatItem()
                {
                    Id = id,
                    ParentId = parentId,
                    HasChildren = level < maxLevel,
                    StringProp = name,
                    ShortProp = 2,
                    IntProp = i,
                    LongProp = 4,
                    FloatProp = 5.1F,
                    DoubleProp = 6.2,
                    DecimalProp = 7.3M,
                    BoolProp = true,
                    DateTimeProp = new DateTime(2020, 6, 3).AddDays(i % 4),
                    EnumProp = (ProductSize)(i % 5),
                    ShortNullableProp = null,
                    IntNullableProp = null,
                    LongNullableProp = null,
                    FloatNullableProp = null,
                    DoubleNullableProp = null,
                    DecimalNullableProp = null,
                    BoolNullableProp = null,
                    DateTimeNullableProp = null,
                    EnumNullableProp = null
                };

                items.Add(product);

                if (level < maxLevel)
                {
                    items.AddRange(GenerateFlatItems(id, level + 1, maxLevel, itemsPerLevel, name));
                }
            }

            return items;
        }
    }
````
````C# FlatItem.cs
public class FlatItem
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public bool HasChildren { get; set; }

        public string StringProp { get; set; }

        public short ShortProp { get; set; }
        public int IntProp { get; set; }
        public long LongProp { get; set; }
        public float FloatProp { get; set; }
        public double DoubleProp { get; set; }
        public decimal DecimalProp { get; set; }
        public bool BoolProp { get; set; }
        public DateTime DateTimeProp { get; set; }
        public ProductSize EnumProp { get; set; }

        public short? ShortNullableProp { get; set; }
        public int? IntNullableProp { get; set; }
        public long? LongNullableProp { get; set; }
        public float? FloatNullableProp { get; set; }
        public double? DoubleNullableProp { get; set; }
        public decimal? DecimalNullableProp { get; set; }
        public bool? BoolNullableProp { get; set; }
        public DateTime? DateTimeNullableProp { get; set; }
        public ProductSize? EnumNullableProp { get; set; }
    }
````
````C# ProductSize.cs
using System.ComponentModel.DataAnnotations;

public enum ProductSize
    {
        [Display(Name = "Extra Small Size")]
        ExtraSmall,
        Small,
        Medium,
        Large,
        [Display(Name = "Extra Large Size")]
        ExtraLarge
    }
````

#### Drag and Drop between Grid and TreeView

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
    public List<Person> GridData { get; set; }
    public TelerikGrid<Person> GridRef { get; set; }

    public TelerikTreeView TreeRef { get; set; }
    public TreeViewObservableFlatDataService TreeService { get; set; }
    public ObservableCollection<BaseFlatItem> TreeData { get; set; }

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

#### Drag and Drop between Grid and Scheduler

<div class="skip-repl"></div>
````RAZOR Index.razor
@* Drag and drop in Grid and TreeView. *@

@using System.Collections.Generic;
@using System.Collections.ObjectModel;

@inject PersonService PersonService;
@inject AppointmentService appointmentService;
@inject ResourceService resourceService;

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

<TelerikScheduler @bind-Date="@SelectedDate"
                  Height="600px" Data="@Data"
                  @ref="@SchedulerRef"
                  Id="Scheduler1"
                  OnCreate="@AddAppointment"
                  OnUpdate="@UpdateAppointment"
                  OnDelete="@DeleteAppointment"
                  AllowDelete="true"
                  AllowUpdate="true"
                  AllowCreate="true"
                  Class="my-class"
                  OnCancel="@(() => Console.WriteLine("CANCEL"))">
    <SchedulerSettings>
        <SchedulerGroupSettings Resources="@GroupingResources" Orientation="@SchedulerGroupOrientation.Horizontal"></SchedulerGroupSettings>
    </SchedulerSettings>
    <SchedulerViews>
        <SchedulerDayView></SchedulerDayView>
        <SchedulerMultiDayView></SchedulerMultiDayView>
        <SchedulerWeekView></SchedulerWeekView>
        <SchedulerMonthView></SchedulerMonthView>
        <SchedulerTimelineView NumberOfDays="2"></SchedulerTimelineView>
    </SchedulerViews>
    <SchedulerResources>
        <SchedulerResource Field="Room" Title="Edit Room" Data="@SchedulerResources"></SchedulerResource>
        <SchedulerResource Field="Manager" Data="@SchedulerManagers"></SchedulerResource>
    </SchedulerResources>
</TelerikScheduler>

@code {
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);
    List<Appointment> Data = new List<Appointment>();
    List<Resource> SchedulerResources = new List<Resource>();
    List<Resource> SchedulerManagers = new List<Resource>();

    List<string> GroupingResources = new List<string> { "Room", "Manager" };

    public List<Person> GridData { get; set; }
    public TelerikGrid<Person> GridRef { get; set; }
    public TelerikScheduler<Appointment> SchedulerRef { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadData();
    }

    private async Task LoadData()
    {
        var people = await PersonService.GetPeopleAsync();
        GridData = people.Take(10).ToList();

        Data = appointmentService.GetAppointments();
        SchedulerResources = await resourceService.GetResourcesAsync();
        SchedulerManagers = await resourceService.GetManagersAsync();
    }

    private void GridRowDrop(GridRowDropEventArgs<Person> args)
    {
        foreach (var item in args.Items)
        {
            GridData.Remove(item);
        }

        if (args.DestinationComponentId == "Scheduler1")
        {
            foreach (var item in args.Items)
            {
                DropAppointment(args.DestinationIndex, item);
            }

            SchedulerRef.Rebind();
        }
        else if (args.DestinationComponentId == "Grid1")
        {
            InsertItemsIntoGrid(args.Items, args.DestinationItem, args.DropPosition);
        }
    }

    private void DropAppointment(string index, Person item)
    {
        var slot = SchedulerRef.GetTimeSlotFromDropIndex(index);

        var appointment = new Appointment()
            {
                Start = slot.Start,
                IsAllDay = slot.IsAllDay,
                End = slot.End,
                Title = item.Name
            };

        if (slot.Resources != null && slot.Resources.Count > 0)
        {
            foreach (var resource in slot.Resources)
            {
                if (resource.Key == "Room")
                {
                    appointment.Room = resource.Value.ToString();
                }
                if (resource.Key == "Manager")
                {
                    appointment.Manager = resource.Value.ToString();
                }
            }
        }

        Data.Add(appointment);
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

    void UpdateAppointment(SchedulerUpdateEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        var matchingItem = Data.FirstOrDefault(a => a.Id == item.Id);

        if (matchingItem != null)
        {
            matchingItem.Title = item.Title;
            matchingItem.Description = item.Description;
            matchingItem.Start = item.Start;
            matchingItem.End = item.End;
            matchingItem.IsAllDay = item.IsAllDay;
            matchingItem.Room = item.Room;
            matchingItem.Manager = item.Manager;
        }
    }

    void AddAppointment(SchedulerCreateEventArgs args)
    {
        Appointment item = args.Item as Appointment;

        Data.Add(item);
    }

    void DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        Data.Remove(item);
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
````C# AppointmentService.cs
public class AppointmentService
{
        public async Task<List<Appointment>> GetAppointmentsAsync()
        {
            await Task.Delay(100);

            return GetAppointments();
        }

        public async Task<List<Appointment>> GetAppointmentsAsync1000()
        {
            await Task.Delay(1000);

            return GetAppointments();
        }

        public async Task<List<Appointment>> GetAppointmentsAsync3000()
        {
            await Task.Delay(3000);

            return GetAppointments();
        }

        public List<Appointment> GetAppointments()
        {
            List<Appointment> data = new List<Appointment>();
            DateTime baselineTime = GetStartTime();

            data.Add(new Appointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = baselineTime.AddHours(2),
                End = baselineTime.AddHours(2).AddMinutes(30)
            });

            data.Add(new Appointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = baselineTime.AddDays(-10),
                End = baselineTime.AddDays(-2)
            });

            data.Add(new Appointment
            {
                Title = "Jane's birthday party",
                Description = "Make sure to get her fresh flowers in addition to the gift.",
                Start = baselineTime.AddDays(5).AddHours(10),
                End = baselineTime.AddDays(5).AddHours(18),
            });

            data.Add(new Appointment
            {
                Title = "One-on-one with the manager",
                Start = baselineTime.AddDays(2).AddHours(3).AddMinutes(30),
                End = baselineTime.AddDays(2).AddHours(3).AddMinutes(45),
            });

            data.Add(new Appointment
            {
                Title = "Brunch with HR",
                Description = "Performance evaluation of the new recruit.",
                Start = baselineTime.AddDays(3).AddHours(3),
                End = baselineTime.AddDays(3).AddHours(3).AddMinutes(45)
            });

            data.Add(new Appointment
            {
                Title = "Interview with new recruit",
                Description = "See if John will be a suitable match for our team.",
                Start = baselineTime.AddDays(3).AddHours(1).AddMinutes(30),
                End = baselineTime.AddDays(3).AddHours(2).AddMinutes(30)
            });

            data.Add(new Appointment
            {
                Title = "Conference",
                Description = "The big important work conference. Don't forget to practice your presentation.",
                Start = baselineTime.AddDays(6),
                End = baselineTime.AddDays(11),
                IsAllDay = true
            });

            data.Add(new Appointment
            {
                Title = "New Project Kickoff",
                Description = "Everyone assemble! We will also have clients on the call from a later time zone.",
                Start = baselineTime.AddDays(3).AddHours(8).AddMinutes(30),
                End = baselineTime.AddDays(3).AddHours(11).AddMinutes(30)
            });

            data.Add(new Appointment
            {
                Title = "Get photos",
                Description = "Get the printed photos from last week's holiday. It's on the way from the vet to work.",
                Start = baselineTime.AddHours(2).AddMinutes(15),
                End = baselineTime.AddHours(2).AddMinutes(30)
            });

            var rng = new Random();
            var startDate = new DateTime(2019, 11, 10);

            data.Add(new Appointment()
            {
                Title = "AllDay 1.0-1.0",
                Start = startDate.AddDays(5),
                End = startDate.AddDays(5),
                IsAllDay = true
            });
            data.Add(new Appointment()
            {
                Title = "AllDay 1.2-1.2",
                Start = startDate.AddDays(5).AddHours(2),
                End = startDate.AddDays(5).AddHours(2),
                IsAllDay = true
            });
            data.Add(new Appointment()
            {
                Title = "AllDay 1.0-2.0",
                Start = startDate.AddDays(5),
                End = startDate.AddDays(6),
                IsAllDay = true
            });

            data.Add(new Appointment()
            {
                Title = "S AllDay",
                Start = startDate,
                End = startDate.AddDays(1)
            });
            data.Add(new Appointment()
            {
                Title = "S AllDay 2",
                Start = startDate,
                End = startDate.AddDays(1)
            });
            data.Add(new Appointment()
            {
                Title = "S AllDay 3",
                Start = startDate.AddDays(-1),
                End = startDate.AddDays(1)
            });

            data.Add(new Appointment()
            {
                Title = "S AllDay 4",
                Start = startDate.AddDays(1),
                End = startDate.AddDays(2)
            });
            data.Add(new Appointment()
            {
                Title = "S AllDay span 3",
                Start = startDate.AddDays(1),
                End = startDate.AddDays(4)
            });



            data.Add(new Appointment()
            {
                Title = "At Start",
                Start = startDate,
                End = startDate.AddHours(1)
            });
            data.Add(new Appointment()
            {
                Title = "Middle",
                Start = startDate.AddHours(9),
                End = startDate.AddHours(10)
            });
            data.Add(new Appointment()
            {
                Title = "Before Start",
                Start = startDate.AddDays(1).AddHours(5),
                End = startDate.AddDays(1).AddHours(10)
            });
            data.Add(new Appointment()
            {
                Title = "After End",
                Start = startDate.AddHours(16),
                End = startDate.AddHours(19)
            });
            data.Add(new Appointment()
            {
                Title = "Two Day",
                Start = startDate.AddDays(1).AddHours(22),
                End = startDate.AddDays(2).AddHours(3)
            });
            data.Add(new Appointment()
            {
                Title = "Three Day",
                Start = startDate.AddDays(2).AddHours(4),
                End = startDate.AddDays(5).AddHours(23)
            });
            data.Add(new Appointment()
            {
                Title = "Not exact",
                Start = startDate.AddDays(5).AddHours(8).AddMinutes(11),
                End = startDate.AddDays(5).AddHours(9).AddMinutes(11)
            });
            data.Add(new Appointment()
            {
                Title = "Not exact end",
                Start = startDate.AddDays(5).AddHours(10),
                End = startDate.AddDays(5).AddHours(10).AddMinutes(11)
            });
            data.Add(new Appointment()
            {
                Title = "Not exact start",
                Start = startDate.AddDays(5).AddHours(12).AddMinutes(11),
                End = startDate.AddDays(5).AddHours(13)
            });
            data.Add(new Appointment()
            {
                Title = "At End",
                Start = startDate.AddDays(6).AddHours(23),
                End = startDate.AddDays(6).AddHours(24)
            });


            data.Add(new Appointment()
            {
                Title = "Same Slot 1",
                Start = startDate.AddDays(2).AddHours(9),
                End = startDate.AddDays(2).AddHours(12)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 2",
                Start = startDate.AddDays(2).AddHours(10),
                End = startDate.AddDays(2).AddHours(11)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 2",
                Start = startDate.AddDays(2).AddHours(11),
                End = startDate.AddDays(2).AddHours(12)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 2",
                Start = startDate.AddDays(2).AddHours(11),
                End = startDate.AddDays(2).AddHours(12)
            });


            data.Add(new Appointment()
            {
                Title = "Same Slot 11",
                Start = startDate.AddDays(3).AddHours(9),
                End = startDate.AddDays(3).AddHours(12)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 12",
                Start = startDate.AddDays(3).AddHours(9),
                End = startDate.AddDays(3).AddHours(10)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 13",
                Start = startDate.AddDays(3).AddHours(9),
                End = startDate.AddDays(3).AddHours(11)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 14",
                Start = startDate.AddDays(3).AddHours(11).AddMinutes(30),
                End = startDate.AddDays(3).AddHours(13)
            });
            data.Add(new Appointment()
            {
                Title = "Same Slot 15",
                Start = startDate.AddDays(3).AddHours(11),
                End = startDate.AddDays(3).AddHours(12)
            });


            return data;
        }

        public DateTime GetStartTime()
        {
            DateTime dt = new DateTime(2019, 12, 11);
            int daysSinceMonday = dt.DayOfWeek - DayOfWeek.Monday;
            //return 8 AM for better visualization of the demos
            return new DateTime(dt.Year, dt.Month, dt.Day - daysSinceMonday, 8, 0, 0);
        }
}
````
````C# Appointment.cs
public class Appointment
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public DateTime Start { get; set; }

    public DateTime End { get; set; }

    public bool IsAllDay { get; set; }

    public string Description { get; set; }

    public string Room { get; set; }

    public string Manager { get; set; }

    public Appointment()
    {
        var rand = new Random();
        Id = Guid.NewGuid();
        Room = rand.Next(1, 3).ToString();
        Manager = rand.Next(1, 4).ToString();
    }
}
````
````C# ResourceService.cs
public class ResourceService
{
        public async Task<List<Resource>> GetResourcesAsync()
        {
            await Task.Delay(100);

            return GetResources();
        }

        public async Task<List<Resource>> GetResourcesAsync1000()
        {
            await Task.Delay(1000);

            return GetResources();
        }

        public async Task<List<Resource>> GetResourcesAsync3000()
        {
            await Task.Delay(3000);

            return GetResources();
        }

        public List<Resource> GetResources()
        {
            List<Resource> result = new List<Resource>();

            result.Add(new Resource()
            {
                Text = "None",
                Value = "",
                Color = ""
            });
            result.Add(new Resource()
            {
                Text = "Small meeting room",
                Value = "1",
                Color = "#66ccff"
            });
            result.Add(new Resource()
            {
                Text = "Big meeting room",
                Value = "2",
                Color = "#0066ff"
            });

            return result;
        }


        public async Task<List<Resource>> GetManagersAsync()
        {
            await Task.Delay(500);

            return GetManagers();
        }

        public async Task<List<Resource>> GetManagersAsync1000()
        {
            await Task.Delay(1000);

            return GetManagers();
        }

        public async Task<List<Resource>> GetManagersAsync3000()
        {
            await Task.Delay(3000);

            return GetManagers();
        }

        public List<Resource> GetManagers()
        {
            List<Resource> result = new List<Resource>();

            result.Add(new Resource()
            {
                Text = "Alex",
                Value = "1",
                Color = "#99ffcc"
            });
            result.Add(new Resource()
            {
                Text = "Bob",
                Value = "2",
                Color = "#47d147"
            });
            result.Add(new Resource()
            {
                Text = "Charlie",
                Value = "3",
                Color = "#336600"
            });

            return result;
        }
}
````
````C# Resource.cs
public class Resource
{
    public string Text { get; set; }

    public string Value { get; set; }

    public string Color { get; set; }
}
````

### Drag and Drop multiple Rows

You can drag and drop multiple rows in one or between multiple instances of the Grid. To enable it, you should set the [`SelectionMode` parameter](slug://grid-selection-overview) of the TelerikGrid to `GridSelectionMode.Multiple`. Then, if you drag a selected row, you will effectively drag all the selected rows.

When you select multiple rows, the row drag clue will be `N items selected` where `N` is the number of selected rows.

````RAZOR
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

* [Grouping](slug://components/grid/features/grouping) is not supported.

## See Also

* [Live Demo: Grid Drag and Drop](https://demos.telerik.com/blazor-ui/grid/drag-drop)
* [Drag and Drop between Different Parent Components](slug://grid-kb-drag-drop-in-different-components)
* [Grid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid-1)
* [Blazor Grid](slug://grid-overview)

