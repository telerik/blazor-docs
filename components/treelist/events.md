---
title: Events
page_title: TreeList - Events
description: Events of the treelist for Blazor.
slug: treelist-events
tags: telerik,blazor,treelist,events
published: True
position: 100
components: ["treelist"]
---

# TreeList Events

This article explains the events available in the Telerik TreeList for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Other Events](#other-events) - other events the treelist provides

## CUD Events

The `OnAdd`, `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when they want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Editing Overview](slug:treelist-editing-overview) article.

## Other Events

* [OnExpand and OnCollapse](#onexpand-and-oncollapse)
* [Command Button Click](#command-button-click)
* [SelectedItemsChanged](#selecteditemschanged)
* [SelectedCellsChanged](#selectedcellschanged)
* [OnModelInit](#onmodelinit)
* [OnRowClick](#onrowclick)
* [OnRowDoubleClick](#onrowdoubleclick)
* [OnRowContextMenu](#onrowcontextmenu)
* [OnRowRender](#onrowrender)
* [OnRowDrop](#onrowdrop)
* [PageChanged](#pagechanged)
* [PageSizeChanged](#pagechanged)

## OnExpand and OnCollapse

The `OnExpand` event fires when the user clicks the expand arrow on a row that has children but they are collapsed. It receives arguments of type `TreeListExpandEventArgs<T>` where `T` is the model you bind the treelist to, and the `Item` field in the event arguments is the current model.


You can use `OnExpand` to know the user action and/or to [load data on demand](slug:treelist-data-binding-load-on-demand).

The `OnCollapse` event fires when the user collapses an expanded row through the collapse arrow. It receives arguments of type `TreeListCollapseEventArgs<T>` where `T` is the model you bind the treelist to, and the `Item` field in the event arguments is the current model.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handle OnExpand and OnCollapse

<demo metaUrl="client/treelist/events/example-1/" height="720"></demo>


## Command Button Click

The command buttons of a treelist provide an `OnClick` event before firing their built-in command (such as opening a row for editing, or adding a new row). You can do this to implement some additional logic and to also handle custom commands - both from a [Command Column](slug:treelist-columns-command), and from a [Toolbar Button](slug:treelist-toolbar).

## SelectedItemsChanged

Fires when [row selection is enabled](slug:treelist-selection-overview#enable-row-or-cell-selection) and the user selects or deselects one or multiple rows, depending on the [selection mode](slug:treelist-selection-overview#use-single-or-multiple-selection).

Visit the [TreeList Row Selection article to see an example](slug:treelist-selection-row#selecteditemschanged-event).

## SelectedCellsChanged

Fires when [cell selection is enabled](slug:treelist-selection-overview#enable-row-or-cell-selection) and the user selects or deselects one cell or multiple cells, depending on the [selection mode](slug:treelist-selection-overview#use-single-or-multiple-selection).

Visit the [TreeList Cell Selection article to see an example](slug:treelist-selection-cell#selectedcellschanged-event).

## OnModelInit

@[template](/_contentTemplates/common/onmodelinit.md#onmodelinit-info)

>caption The different use-cases of the OnModelInit event

<div class="skip-repl"></div>
````RAZOR NoParameterlessConstructor
@* Bind the TreeList to a class without a parameterless constructor *@

@using System.ComponentModel.DataAnnotations

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Popup"
                 OnModelInit="@OnModelInitHandler"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 OnCancel="@OnCancelHandler"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>


@code {
    public List<Employee> Data { get; set; }

    private Employee OnModelInitHandler()
    {
        return new Employee(1, "Test", "email@email.com", DateTime.Today, null, false);
    }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    // OnCancel handler

    async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Items.First() as Employee;
        // if necessary, perform actual data source operation here through your service
    }


    // sample model

    public class Employee
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The employee must have a name")]
        public string Name { get; set; }
        [EmailAddress]
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<Employee> DirectReports { get; set; }
        public bool HasChildren { get; set; }

        public Employee(int id, string name, string email, DateTime date, List<Employee> reports, bool hasChildren)
        {
            Id = id;
            Name = name;
            EmailAddress = email;
            HireDate = date;
            DirectReports = reports;
            HasChildren = hasChildren;
        }

        // Used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }
    }

    // data generation

    async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee(LastId, $"root: {i}", $"{i}@example.com", DateTime.Now.AddYears(-i), new List<Employee>(), true);

                    _data.Add(root);

                    LastId++;

                    for (int j = 1; j < 4; j++)
                    {
                        int currId = LastId;

                        Employee firstLevelChild = new Employee(currId, $"first level child {j} of {i}", $"{currId}@example.com", DateTime.Now.AddDays(-currId), new List<Employee>(), true);

                        root.DirectReports.Add(firstLevelChild);
                        LastId++;

                        for (int k = 1; k < 3; k++)
                        {
                            int nestedId = LastId;

                            firstLevelChild.DirectReports.Add(new Employee(LastId, $"second level child {k} of {j} and {i}", $"{nestedId}@example.com", DateTime.Now.AddMinutes(-nestedId), null, false));
                        }
                    }
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<Employee> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<Employee> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<Employee> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<Employee>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }
}
````
````RAZOR Interface
@* Bind the TreeList to an interface *@

@using System.ComponentModel.DataAnnotations

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Popup"
                 OnModelInit="@OnModelInitHandler"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 OnCancel="@OnCancelHandler"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>


@code {
    public List<IEmployee> Data { get; set; }

    private Employee OnModelInitHandler()
    {
        return new Employee(1, "Test", "email@email.com", DateTime.Today, null, false);
    }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    // OnCancel handler

    async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Items.First() as Employee;
        // if necessary, perform actual data source operation here through your service
    }


    // sample model
    public interface IEmployee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<IEmployee> DirectReports { get; set; }
        public bool HasChildren { get; set; }
    }

    public class Employee : IEmployee
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The employee must have a name")]
        public string Name { get; set; }
        [EmailAddress]
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<IEmployee> DirectReports { get; set; }
        public bool HasChildren { get; set; }

        public Employee(int id, string name, string email, DateTime date, List<IEmployee> reports, bool hasChildren)
        {
            Id = id;
            Name = name;
            EmailAddress = email;
            HireDate = date;
            DirectReports = reports;
            HasChildren = hasChildren;
        }

        // Used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }
    }

    // data generation

    async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<IEmployee> _data { get; set; } = new List<IEmployee>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<IEmployee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee(LastId, $"root: {i}", $"{i}@example.com", DateTime.Now.AddYears(-i), new List<IEmployee>(), true);

                    _data.Add(root);

                    LastId++;

                    for (int j = 1; j < 4; j++)
                    {
                        int currId = LastId;

                        Employee firstLevelChild = new Employee(currId, $"first level child {j} of {i}", $"{currId}@example.com", DateTime.Now.AddDays(-currId), new List<IEmployee>(), true);

                        root.DirectReports.Add(firstLevelChild);
                        LastId++;

                        for (int k = 1; k < 3; k++)
                        {
                            int nestedId = LastId;

                            firstLevelChild.DirectReports.Add(new Employee(LastId, $"second level child {k} of {j} and {i}", $"{nestedId}@example.com", DateTime.Now.AddMinutes(-nestedId), null, false));
                        }
                    }
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<IEmployee> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<IEmployee> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<IEmployee> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<IEmployee>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }
}
````
````RAZOR AbstractClass
@* Bind the TreeList to an abstract class *@

@using System.ComponentModel.DataAnnotations

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Popup"
                 OnModelInit="@OnModelInitHandler"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 OnCancel="@OnCancelHandler"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>


@code {
    public List<EmployeeBase> Data { get; set; }

    private Employee OnModelInitHandler()
    {
        return new Employee(1, "Test", "email@email.com", DateTime.Today, null, false);
    }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Items.First() as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    // OnCancel handler

    async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Items.First() as Employee;
        // if necessary, perform actual data source operation here through your service
    }


    // sample model
    public abstract class EmployeeBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<EmployeeBase> DirectReports { get; set; }
        public bool HasChildren { get; set; }
    }

    public class Employee : EmployeeBase
    {
        public Employee(int id, string name, string email, DateTime date, List<EmployeeBase> reports, bool hasChildren)
        {
            Id = id;
            Name = name;
            EmailAddress = email;
            HireDate = date;
            DirectReports = reports;
            HasChildren = hasChildren;
        }

        // Used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }
    }

    // data generation

    async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<EmployeeBase> _data { get; set; } = new List<EmployeeBase>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<EmployeeBase>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee(LastId, $"root: {i}", $"{i}@example.com", DateTime.Now.AddYears(-i), new List<EmployeeBase>(), true);

                    _data.Add(root);

                    LastId++;

                    for (int j = 1; j < 4; j++)
                    {
                        int currId = LastId;

                        Employee firstLevelChild = new Employee(currId, $"first level child {j} of {i}", $"{currId}@example.com", DateTime.Now.AddDays(-currId), new List<EmployeeBase>(), true);

                        root.DirectReports.Add(firstLevelChild);
                        LastId++;

                        for (int k = 1; k < 3; k++)
                        {
                            int nestedId = LastId;

                            firstLevelChild.DirectReports.Add(new Employee(LastId, $"second level child {k} of {j} and {i}", $"{nestedId}@example.com", DateTime.Now.AddMinutes(-nestedId), null, false));
                        }
                    }
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<EmployeeBase> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<EmployeeBase> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<EmployeeBase> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<EmployeeBase>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }
}
````

## OnRowClick

@[template](/_contentTemplates/common/click-events.md#rowclick)

The `OnRowClick` event handler receives a `TreeListRowClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

>caption Using the TreeList OnRowClick event

<demo metaUrl="client/treelist/events/example-2/" height="720"></demo>

## OnRowDoubleClick

@[template](/_contentTemplates/common/click-events.md#rowdoubleclick)

The `OnRowDoubleClick` event handler receives a `TreeListRowClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

>caption Using the TreeList OnRowDoubleClick event

<demo metaUrl="client/treelist/events/example-3/" height="720"></demo>

## OnRowContextMenu

@[template](/_contentTemplates/common/click-events.md#rowcontextmenu)

The `OnRowContextMenu` event handler receives a `TreeListRowClickEventArgs` argument, which has the following properties.

@[template](/_contentTemplates/common/click-events.md#clickeventargs)

>caption Using the TreeList OnRowContextMenu event

<demo metaUrl="client/treelist/events/example-4/" height="720"></demo>

## OnRowRender

This event fires upon the rendering of the TreeList rows. It receives an argument of type `TreeListRowRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.
* `Class` - the CSS class that will be applied to the rows of the TreeList. The CSS rules that are set for that class will be visibly rendered on the TreeList rows.

>caption Use the OnRowRender event to apply custom format to TreeList rows based on certain condition

<demo metaUrl="client/treelist/events/example-5/" height="720"></demo>

## OnRowDrop

The `OnRowDrop` event fires when the user drags and drops rows in the TreeList or between TreeLists. You can read more on setting it up and using the TreeList row dragging feature in the [Row Drag and Drop](slug:treelist-drag-drop-overview) article.

## PageChanged

The event fires when the user pages the treelist.

<demo metaUrl="client/treelist/events/example-6/" height="720"></demo>

## PageSizeChanged

The `PageSizeChanged` event fires when the user changes the page size via the pager DropDownList. The existence of this event also ensures that the TreeList `PageSize` attribute supports two-way binding.

If the user selects the "All" option from the page size DropDownList, the `PageSizeChanged` event will receive the total item count as an argument.

Make sure to update the current page size when using the event.

>caption Handle PageSizeChanged

<demo metaUrl="client/treelist/events/example-7/" height="720"></demo>

## See Also

* [TreeList Overview](slug:treelist-overview)
* [TreeList Column Events](slug:treelist-column-events)
* [TreeList Editing Overview](slug:treelist-editing-overview)
