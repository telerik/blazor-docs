---
title: Row Drag and Drop
page_title: TreeList Row Drag and Drop
description: Overview of the Row Drag and Drop functionality for TreeList for Blazor.
slug: treelist-drag-drop-overview
tags: telerik,blazor,treelist,drap,drop,dragdrop,row,rows,overview
published: True
position: 40
components: ["treelist"]
---
# Drag and Drop

The Drag and Drop functionality for the TreeList rows allows you to move a row or a multitude of rows between different parents in the same TreeList or between different Telerik TreeList instances.

This article contains the following sections:

* [Basics](#basics)
* [OnRowDrop Event](#onrowdrop-event)
* [TreeListRowDraggableSettings](#treelistrowdraggablesettings)
* [Examples](#examples)
    * [Drag and Drop a Row in the same TreeList](#drag-and-drop-a-row-in-the-same-treelist)
    * [Drag and Drop a Row between TreeLists](#drag-and-drop-a-row-between-treelists)
    * [Drag and Drop between TreeList, Grid, TreeView and Scheduler](#drag-and-drop-between-treelist-grid-treeview-and-scheduler)
    * [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

## Basics

To enable the Drag and Drop functionality:

1. Set the `RowDraggable` parameter of the `<TelerikTreeList>` to `true`

1. Use the `OnRowDrop` event to handle the drag and drop operations and modify the data source as per your business logic.

The row drag and drop functionality works with a dedicated column which is always rendered as the first column when the feature is enabled.  

## OnRowDrop Event

The `OnRowDrop` event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnRowDrop` event provides an object of type `TreeListRowDropEventArgs<T>` to its event handler which exposes the following fields:

| Parameter | Type | Description |
| --- | --- | --- |
| `Item` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DestinationItem` | `object` | Represents the row over which the `Item` is dropped. You can cast this object to your model class. |
| `Items` | `object` | Represents the dragged row. You can cast this object to your model class. |
| `DropPosition` | `enum` | Its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`. |
| `DestinationGrid` | `object` | The reference of the Grid in which the row is dropped. This is applicable when you drag and drop rows between different grids. |
| `DestinationIndex` | `string` | The index where the drop will happen in the second component. |
| `DestinationComponentId` | `string` | The `Id` of the second component in which the drop will happen. |

## TreeListRowDraggableSettings

The `TreeListRowDraggableSettings` is a child tag under the `<TreeListSettings>`, which is a child tag of the `<TelerikTreeList>`. It exposes the following parameters:

* `DragClueField` - `string` - defines which field will be used to render the drag clue text. By default, this parameter will take the value of the first bound column of the first dragged row. 

You can find examples of its usage below.

## Examples

This section contains the following examples:

* [Drag and Drop a Row in the same TreeList](#drag-and-drop-a-row-in-the-same-treelist)
* [Drag and Drop a Row between TreeLists](#drag-and-drop-a-row-between-treelists)
* [Drag and Drop between TreeList, Grid, TreeView and Scheduler](#drag-and-drop-between-treelist-grid-treeview-and-scheduler)
* [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

### Drag and Drop a Row in the same TreeList

<div class="skip-repl"></div>
````RAZOR Component
@* Drag a row and drop it in the TreeList. *@

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px"
                 RowDraggable="true"
                 OnRowDrop="@((TreeListRowDropEventArgs<Employee> args) => OnRowDropHandler(args))">
    <TreeListSettings>
        <TreeListRowDraggableSettings DragClueField="@(nameof(Employee.Name))"></TreeListRowDraggableSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private void OnRowDropHandler(TreeListRowDropEventArgs<Employee> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.
        
        RemoveChildRecursive(Data, args.Item);

        var destinationParentItem = Data.FindRecursive(x => x.DirectReports?.Contains(args.DestinationItem) == true);

        var itemsCollection = destinationParentItem?.DirectReports ?? Data;

        int destinationItemIndex = itemsCollection.IndexOf(args.DestinationItem);

        if (args.DropPosition == TreeListRowDropPosition.Over)
        {
            if (args.DestinationItem.DirectReports == null)
            {
                args.DestinationItem.DirectReports = new List<Employee>();
            }

            args.DestinationItem.DirectReports.Add(args.Item);
        }
        else if (args.DropPosition == TreeListRowDropPosition.Before)
        {
            itemsCollection.Insert(destinationItemIndex, args.Item);
        }
        else
        {
            itemsCollection.Insert(destinationItemIndex + 1, args.Item);
        }
    }

    private void RemoveChildRecursive(List<Employee> collection, Employee item)
    {
        for (int i = 0; i < collection.Count(); i++)
        {
            if (item.Equals(collection[i]))
            {
                collection.Remove(item);

                return;
            }
            else if (collection[i].DirectReports?.Count > 0)
            {
                RemoveChildRecursive(collection[i].DirectReports, item);
            }
        }
    }

    #region Data
    public List<Employee> Data { get; set; }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }

    #endregion
}
````
````C# Extensions
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
````C# Model
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

### Drag and Drop a Row between TreeLists

When you drag and drop items from one instance of the TreeList to another, the `OnRowDrop` event fires for both instances of the component so you can update both their data sources. All instances must be bound to the same model.

<div class="skip-repl"></div>
````RAZOR Component
<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px"
                 @ref="@FirstTreeList"
                 RowDraggable="true"
                 OnRowDrop="@((TreeListRowDropEventArgs<Employee> args) => OnFirstRowDropHandler(args))">
    <TreeListSettings>
        <TreeListRowDraggableSettings DragClueField="@(nameof(Employee.Name))"></TreeListRowDraggableSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>


<TelerikTreeList Data="@SecondData"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px"
                 RowDraggable="true"
                 OnRowDrop="@((TreeListRowDropEventArgs<Employee> args) => OnSecondRowDropHandler(args))">
    <TreeListSettings>
        <TreeListRowDraggableSettings DragClueField="@(nameof(Employee.Name))"></TreeListRowDraggableSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> FirstTreeList { get; set; }

    private void OnRowDrop(List<Employee> items, TreeListRowDropEventArgs<Employee> args)
    {
        foreach (var item in args.Items)
        {
            RemoveChildRecursive(items, item);
        }

        var destinationData = args.DestinationTreeList == FirstTreeList ? Data : SecondData;

        var destinationParentItem = destinationData.FindRecursive(x => x.DirectReports?.Contains(args.DestinationItem) == true);

        var itemsCollection = destinationParentItem?.DirectReports ?? Data;

        int destinationItemIndex = itemsCollection.IndexOf(args.DestinationItem);

        if (args.DropPosition == TreeListRowDropPosition.Over)
        {
            if (args.DestinationItem == null)
            {
                destinationData.AddRange(args.Items);
            }
            else
            {
                if(args.DestinationItem.DirectReports == null)
                {
                    args.DestinationItem.DirectReports = new List<Employee>();
                }

                args.DestinationItem.DirectReports.AddRange(args.Items);
            }
        }
        else if (args.DropPosition == TreeListRowDropPosition.Before)
        {
            itemsCollection.InsertRange(destinationItemIndex, args.Items);
        }
        else if(args.DropPosition == TreeListRowDropPosition.After)
        {
            itemsCollection.InsertRange(destinationItemIndex + 1, args.Items);
        }
    }

    private void OnFirstRowDropHandler(TreeListRowDropEventArgs<Employee> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.
        
        OnRowDrop(Data, args);
    }

    private void OnSecondRowDropHandler(TreeListRowDropEventArgs<Employee> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.
        
        OnRowDrop(SecondData, args);
    }

    private void RemoveChildRecursive(List<Employee> collection, Employee item)
    {
        for (int i = 0; i < collection.Count(); i++)
        {
            if (item.Equals(collection[i]))
            {
                collection.Remove(item);

                return;
            }
            else if (collection[i].DirectReports?.Count > 0)
            {
                RemoveChildRecursive(collection[i].DirectReports, item);
            }
        }
    }

    #region Data
    public List<Employee> Data { get; set; }
    public List<Employee> SecondData { get; set; }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
        SecondData = await GetSecondTreeListData();
    }

    async Task<List<Employee>> GetSecondTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i * 10),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }

    #endregion
}
````
````C# Extensions
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
````C# Model
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

### Drag and Drop between TreeList, Grid, TreeView and Scheduler

The functionality allows dragging items between TreeList, [Grid](slug:grid-drag-drop-overview), [TreeView](slug:treeview-drag-drop-overview), and [Scheduler](slug:scheduler-overview). To achieve it, set the `Draggable`/`RowDraggable` parameter, and implement it through an event -  `OnDrop`/`OnRowDrop`.

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

See more applicable examples in the [Grid Drag and Drop article](slug:grid-drag-drop-overview).

### Drag and Drop multiple Rows

You can drag and drop multiple rows in one or between multiple instances of the TreeList. To enable it, you should set the [`SelectionMode`](slug:treelist-selection-overview) parameter of the TelerikTreeList to `TreeListSelectionMode.Multiple`. Then, if you drag a selected row, you will effectively drag all the selected rows.

When you select multiple rows, the row drag clue will be `N items selected` where `N` is the number of selected rows.

<div class="skip-repl"></div>
````RAZOR Component
@* Select multiple rows and reorder them in the TreeList. *@

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Pageable="true" Width="850px"
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 RowDraggable="true"
                 OnRowDrop="@((TreeListRowDropEventArgs<Employee> args) => OnRowDropHandler(args))">
    <TreeListSettings>
        <TreeListRowDraggableSettings DragClueField="@(nameof(Employee.Name))"></TreeListRowDraggableSettings>
    </TreeListSettings>
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private void OnRowDropHandler(TreeListRowDropEventArgs<Employee> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.
        
        foreach (var item in args.Items)
        {
            RemoveChildRecursive(Data, item);
        }

        var destinationParentItem = Data.FindRecursive(x => x.DirectReports?.Contains(args.DestinationItem) == true);

        var itemsCollection = destinationParentItem?.DirectReports ?? Data;

        int destinationItemIndex = itemsCollection.IndexOf(args.DestinationItem);

        if (args.DropPosition == TreeListRowDropPosition.Over)
        {
            if (args.DestinationItem.DirectReports == null)
            {
                args.DestinationItem.DirectReports = new List<Employee>();
            }

            args.DestinationItem.DirectReports.AddRange(args.Items);
        }
        else if (args.DropPosition == TreeListRowDropPosition.Before)
        {
            itemsCollection.InsertRange(destinationItemIndex, args.Items);
        }
        else
        {
            itemsCollection.InsertRange(destinationItemIndex + 1, args.Items);
        }
    }

    private void RemoveChildRecursive(List<Employee> collection, Employee item)
    {
        for (int i = 0; i < collection.Count(); i++)
        {
            if (item.Equals(collection[i]))
            {
                collection.Remove(item);

                return;
            }
            else if (collection[i].DirectReports?.Count > 0)
            {
                RemoveChildRecursive(collection[i].DirectReports, item);
            }
        }
    }

    #region Data
    public List<Employee> Data { get; set; }

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            Employee root = new Employee
            {
                Id = LastId,
                Name = $"root: {i}",
                EmailAddress = $"{i}@example.com",
                HireDate = DateTime.Now.AddYears(-i),
                DirectReports = new List<Employee>(), // prepare a collection for the child items, will be populated later in the code
            };
            data.Add(root);
            LastId++;

            for (int j = 1; j < 4; j++)
            {
                int currId = LastId;
                Employee firstLevelChild = new Employee
                {
                    Id = currId,
                    Name = $"first level child {j} of {i}",
                    EmailAddress = $"{currId}@example.com",
                    HireDate = DateTime.Now.AddDays(-currId),
                    DirectReports = new List<Employee>(), // collection for child nodes
                };
                root.DirectReports.Add(firstLevelChild); // populate the parent's collection
                LastId++;

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = LastId;
                    // populate the parent's collection
                    firstLevelChild.DirectReports.Add(new Employee
                    {
                        Id = LastId,
                        Name = $"second level child {k} of {j} and {i}",
                        EmailAddress = $"{nestedId}@example.com",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                    LastId++;
                }
            }
        }

        return await Task.FromResult(data);
    }

    #endregion
}
````
````C# Extensions
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
````C# Model
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

## See Also

* [Live Demo: TreeList Drag and Drop](https://demos.telerik.com/blazor-ui/treelist/drag-drop)
* [Drag and Drop between Different Parent Components](slug:grid-kb-drag-drop-in-different-components)
* [TreeList API Reference](slug:Telerik.Blazor.Components.TelerikTreeList-1)
