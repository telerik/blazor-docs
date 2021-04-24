---
title: Drag and Drop
page_title: TreeList Drag and Drop
description: Overview of the Drag and Drop functionality for TreeList for Blazor.
slug: treelist-drag-drop-overview
tags: telerik,blazor,treelist,drap,drop,dragdrop,row,rows,overview
published: True
position: 11
---

# Drag and Drop

The Drag and Drop functionality for the TreeList allows you to move a row or a multitude of rows between different parents in the same TreeList or between different Telerik TreeList instances.

This article will be separated in the following sections:

* [Basics](#basics)
* [OnRowDrop Event](#onrowdrop-event)
* [TreeListRowDraggableSettings](#treelistdrowdraggablesettings)
* [Examples](#examples)
    * [Drag and Drop a Row in the same TreeList](#drag-and-drop-a-row-in-the-same-treelist)
    * [Drag and Drop a Row between TreeLists](#drag-and-drop-a-row-between-treelists)
    * [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

## Basics

To enable the Drag and Drop functionality:

1. Set the `RowDraggable` parameter of the `<TelerikTreeList>` to `true`

1. Use the `OnRowDrop` event to handle the drag and drop operations and modify the data source as per your business logic.


## OnRowDrop Event

The `OnRowDrop` event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element. 

### Event Arguments

The `OnRowDrop` event provides an object of type `TreeListRowDropEventArgs<T>` to its event handler which exposes the following fields:

* `Item` - an `object` that represents the dragged row. You can cast this object to your model class.

* `DestinationItem` - an `object` that represents the row over which the `Item` is dropped to. You can cast this object to your model class.

* `DestinationItems` - `IEnumerable<T>` that represents a collection of all dragged items. 

* `DropPosition` - an `enum` - its members allow you to determine the exact position of the dropped item relative to the position of the `DestinationItem`:
    * `After`
    * `Below`
    * `Over`
    
* `DestinationTreeList` - the reference of the TreeList in which the row is dropped. This is applicable when you drag and drop rows between different instances of the component. 

## TreeListRowDraggableSettings

The `TreeListRowDraggableSettings` is a child tag under the `<TreeListSettings>`. It exposes the following parameters:

* `DragClueField` - `string` - defines which field will be used to render the drag clue text. By default, this parameter will take the value of the first bound column. 

## Examples

* [Drag and Drop a Row in the same TreeList](#drag-and-drop-a-row-in-the-same-treelist)
* [Drag and Drop a Row between TreeLists](#drag-and-drop-a-row-between-treelists)
* [Drag and Drop multiple Rows](#drag-and-drop-multiple-rows)

### Drag and Drop a Row in the same TreeList

````Component
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

### Drag and Drop a Row between TreeLists

When you drap and drop items from one instance of the TreeList to another, the `OnRowDrop` event fires for both instances of the component. All instances must be bound to the same model.  

````Component
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
        OnRowDrop(Data, args);
    }

    private void OnSecondRowDropHandler(TreeListRowDropEventArgs<Employee> args)
    {
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

You can drag and drop multiple rows in one or between multiple instances of the TreeList. To enable it, you should set the `SelectionMode` parameter of the TelerikTreeList to `TreeListSelectionMode.Multiple`.

When you select multiple rows the row drag clue will be `N items selected` where `N` is the number of selected rows.

````Component
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

## See Also

  * [TreeList Overview]({%slug components/treelist/overview%})
  * [Live Demos: TreeList](https://demos.telerik.com/blazor-ui/treelist/index)

