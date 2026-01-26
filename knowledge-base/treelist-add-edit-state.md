---
title: Enter and Exit TreeList Edit Mode Programmatically
description: How to add and edit TreeList rows programmatically or with custom buttons.
type: how-to
page_title: Enter and Exit TreeList Edit Mode from Code
slug: treelist-kb-add-edit-state
position: 
tags: treelist, state, editing
ticketid:
res_type: kb
components: ["treelist"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article answers the following questions:

* How to enter edit mode from code?
* How to initiate insert and edit operations programmatically, instead of using [command buttons](slug:treelist-columns-command)?
* How to add new TreeList rows with a custom button, which is outside the component?
* How to insert TreeList rows with an external button?
* How to cancel TreeList edit mode programmatically?
* How to implement TreeList command buttons outside the TreeList?


## Solution

This scenario requires knowledge about the [TreeList State](slug:treelist-state). Get familiar with the following sections first:

* [Information in the TreeList State](slug:treelist-state#information-in-the-treelist-state)
* [TreeList State Methods](slug:treelist-state#methods)

To enter and exit edit mode, set the following properties of the `TreeListState` object:

* `InsertedItem` must be a new data item instance that will potentially be added to the TreeList. Applicable only for `Inline` and `Popup` edit mode. You can set some default values, if needed.
* `ParentItem` must be the parent item of the `InsertedItem` data item instance that will potentially be added to the TreeList. Applicable only for `Inline` and `Popup` edit mode.
* `OriginalEditItem` must be a reference to an existing data item.
* `EditItem` must be a clone (copy) of the `OriginalEditItem`. Later it will either update the original item, or be discarded.
* `EditField` is used for incell editing only. It determines which cell will render an editor.

Each property that is not relevant to a desired TreeList state, should be set to `null`.


## Example

The sample below shows how to add, edit, cancel and save items in [`Inline`](slug:treelist-editing-inline) and [`Popup`](slug:treelist-editing-popup) `EditMode`.

All these operations can also be used for [`Incell`](slug:treelist-editing-incell). However, blurring the edited cell triggers [`OnUpdate`](slug:treelist-editing-overview#events), so external UI to manage the TreeList doesn't make sense. Some special [`EditorTemplate`](slug:treelist-templates-editor) may benefit from programmatic incell cancel or update. The required logic is the same as with inline editing, with the addition of `EditField`.

>caption Enter and exit TreeList edit mode programmatically

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<h1>TreeList Edit Operations via the State</h1>

<h2>Inline and Popup EditMode</h2>

<TelerikTreeList @ref="@TreeListInlineRef"
                 Data="@TreeListInlineData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 EditMode="@TreeListEditMode.Inline"
                 OnCreate="@OnTreeListInlineCreate"
                 OnUpdate="@OnTreeListInlineUpdate"
                 Height="400px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
        <span class="k-separator"></span>
        <label style="display: inline-block; line-height: var(--kendo-line-height)">
            Select Parent for New Item:
            <TelerikDropDownList Data="@TreeListInlineData"
                                 @bind-Value="@InlineDropDownListValue"
                                 TextField="@nameof(Employee.Name)"
                                 ValueField="@nameof(Employee.Id)"
                                 DefaultText="Root"
                                 Width="180px" />
        </label>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineAdd">Programmatic Add</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineEdit">Programmatic Edit</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineCancel">Programmatic Cancel</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineUpdate">Programmatic Update</TelerikButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="80px" />
        <TreeListCommandColumn Width="160px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

<h2>Incell EditMode</h2>

<TelerikTreeList @ref="@TreeListIncellRef"
                 Data="@TreeListIncellData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 EditMode="@TreeListEditMode.Incell"
                 OnCreate="@OnTreeListIncellCreate"
                 OnUpdate="@OnTreeListIncellUpdate"
                 Height="400px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
        <span class="k-separator"></span>
        <label style="display: inline-block; line-height: var(--kendo-line-height)">
            Select Parent for New Item:
            <TelerikDropDownList Data="@TreeListIncellData"
                                 @bind-Value="@IncellDropDownListValue"
                                 TextField="@nameof(Employee.Name)"
                                 ValueField="@nameof(Employee.Id)"
                                 DefaultText="Root"
                                 Width="180px" />
        </label>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@IncellAdd">Programmatic Add</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@IncellEdit">Programmatic Edit</TelerikButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="80px" />
        <TreeListCommandColumn Width="60px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee>? TreeListInlineRef { get; set; }
    private TelerikTreeList<Employee>? TreeListIncellRef { get; set; }

    private List<Employee>? TreeListInlineData { get; set; }
    private List<Employee>? TreeListIncellData { get; set; }

    private EmployeeService TreeListEmployeeInlineService { get; set; } = new();
    private EmployeeService TreeListEmployeeIncellService { get; set; } = new();

    private int? InlineDropDownListValue { get; set; }
    private int? IncellDropDownListValue { get; set; }

    #region Programmatic Inline Editing

    private async Task InlineAdd()
    {
        var treeListState = TreeListInlineRef!.GetState();

        treeListState.InsertedItem = new Employee();
        treeListState.InsertedItem.Name = "New value";
        treeListState.OriginalEditItem = null!;
        treeListState.EditItem = null!;

        Employee? parentItem = TreeListInlineData!.FirstOrDefault(x => x.Id == InlineDropDownListValue);
        if (parentItem != null)
        {
            treeListState.ParentItem = parentItem;
            treeListState.ExpandedItems.Add(parentItem);
        }

        await TreeListInlineRef!.SetStateAsync(treeListState);
    }

    private async Task InlineEdit()
    {
        if (TreeListInlineData!.Any())
        {
            var treeListState = TreeListInlineRef!.GetState();

            treeListState.InsertedItem = null!;
            treeListState.OriginalEditItem = TreeListInlineData!.First();
            treeListState.EditItem = TreeListInlineData!.First().Clone();
            treeListState.EditItem.Name = "Updated inline value";

            await TreeListInlineRef!.SetStateAsync(treeListState);
        }
    }

    private async Task InlineCancel()
    {
        var treeListState = TreeListInlineRef!.GetState();

        treeListState.InsertedItem = null!;
        treeListState.OriginalEditItem = null!;
        treeListState.EditItem = null!;
        treeListState.ParentItem = null!;

        await TreeListInlineRef!.SetStateAsync(treeListState);
    }

    private async Task InlineUpdate()
    {
        var treeListState = TreeListInlineRef!.GetState();

        if (treeListState.EditItem != null)
        {
            await OnTreeListInlineUpdate(new TreeListCommandEventArgs()
            {
                Item = treeListState.EditItem
            });
        }
        else if (treeListState.InsertedItem != null)
        {
            await OnTreeListInlineCreate(new TreeListCommandEventArgs()
            {
                Item = treeListState.InsertedItem,
                ParentItem = TreeListInlineData!.FirstOrDefault(x => x.Id == InlineDropDownListValue)
            });
        }

        treeListState.InsertedItem = null!;
        treeListState.OriginalEditItem = null!;
        treeListState.EditItem = null!;
        treeListState.ParentItem = null!;

        await TreeListInlineRef!.SetStateAsync(treeListState);
    }

    #endregion Programmatic Inline Editing

    #region Programmatic Incell Editing

    private async Task IncellAdd()
    {
        var treeListState = TreeListIncellRef!.GetState();

        var insertedProduct = new Employee()
        {
            HireDate = DateTime.Today,
            Name = "Default New Name",
            Salary = 1111
        };

        Employee? parentItem = TreeListIncellData!.FirstOrDefault(x => x.Id == IncellDropDownListValue);
        if (parentItem != null)
        {
            treeListState.ExpandedItems.Add(parentItem);
        }

        await OnTreeListIncellCreate(new TreeListCommandEventArgs()
        {
            Item = insertedProduct,
            ParentItem = parentItem
        });

        treeListState.OriginalEditItem = insertedProduct;
        treeListState.EditItem = insertedProduct.Clone();
        treeListState.EditField = nameof(Employee.Name);

        await TreeListIncellRef!.SetStateAsync(treeListState);
    }

    private async Task IncellEdit()
    {
        if (TreeListIncellData!.Any())
        {
            var treeListState = TreeListIncellRef!.GetState();

            treeListState.OriginalEditItem = TreeListIncellData!.First();
            treeListState.EditItem = TreeListIncellData!.First().Clone();
            treeListState.EditField = nameof(Employee.Name);
            treeListState.EditItem.Name = "Updated incell value";

            await TreeListIncellRef!.SetStateAsync(treeListState);
        }
    }

    #endregion Programmatic Incell Editing

    #region TreeList Inline Editing Handlers

    private async Task OnTreeListInlineCreate(TreeListCommandEventArgs args)
    {
        var createdItem = (Employee)args.Item;
        var parentItem = (Employee?)args.ParentItem;

        await TreeListEmployeeInlineService.Create(createdItem, parentItem);

        TreeListInlineData = await TreeListEmployeeInlineService.Read();
    }

    private async Task OnTreeListInlineUpdate(TreeListCommandEventArgs args)
    {
        var updatedItem = (Employee)args.Item;

        await TreeListEmployeeInlineService.Update(updatedItem);

        TreeListInlineData = await TreeListEmployeeInlineService.Read();
    }

    #endregion TreeList Inline Editing Handlers

    #region TreeList Incell Editing Handlers

    private async Task OnTreeListIncellCreate(TreeListCommandEventArgs args)
    {
        var createdItem = (Employee)args.Item;
        var parentItem = (Employee?)args.ParentItem;

        await TreeListEmployeeIncellService.Create(createdItem, parentItem);

        TreeListIncellData = await TreeListEmployeeIncellService.Read();
    }

    private async Task OnTreeListIncellUpdate(TreeListCommandEventArgs args)
    {
        var updatedItem = (Employee)args.Item;

        await TreeListEmployeeIncellService.Update(updatedItem);

        TreeListIncellData = await TreeListEmployeeIncellService.Read();
    }

    #endregion TreeList Incell Editing Handlers

    protected override async Task OnInitializedAsync()
    {
        TreeListInlineData = await TreeListEmployeeInlineService.Read();
        TreeListIncellData = await TreeListEmployeeIncellService.Read();
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        [Required]
        public decimal? Salary { get; set; }
        [Required]
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is Employee && ((Employee)obj).Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        public Employee Clone()
        {
            return new Employee()
            {
                HasChildren = HasChildren,
                HireDate = HireDate,
                Id = Id,
                IsDriver = IsDriver,
                Name = Name,
                Notes = Notes,
                ParentId = ParentId,
                Salary = Salary
            };
        }
    }

    #region Data Service

    public class EmployeeService
    {
        private List<Employee> Items { get; set; } = new();

        private readonly int TreeLevelCount;
        private readonly int RootItemCount;
        private readonly int ChildItemCount;

        private int LastId { get; set; }
        private Random Rnd { get; set; } = Random.Shared;

        public async Task<int> Create(Employee createdEmployee, Employee? parentEmployee)
        {
            await SimulateAsyncOperation();

            createdEmployee.Id = ++LastId;
            createdEmployee.ParentId = parentEmployee?.Id;

            Items.Insert(0, createdEmployee);

            if (parentEmployee != null)
            {
                parentEmployee.HasChildren = true;
            }

            return LastId;
        }

        public async Task<bool> Delete(Employee deletedEmployee)
        {
            await SimulateAsyncOperation();

            if (Items.Contains(deletedEmployee))
            {
                DeleteChildren(deletedEmployee.Id);
                Items.Remove(deletedEmployee);

                if (deletedEmployee.ParentId.HasValue && !Items.Any(x => x.ParentId == deletedEmployee.ParentId.Value))
                {
                    Items.First(x => x.Id == deletedEmployee.ParentId.Value).HasChildren = false;
                }

                return true;
            }

            return false;
        }

        public async Task<List<Employee>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        public async Task<DataSourceResult> Read(DataSourceRequest request)
        {
            return await Items.ToDataSourceResultAsync(request);
        }

        public async Task<bool> Update(Employee updatedEmployee)
        {
            await SimulateAsyncOperation();

            int originalItemIndex = Items.FindIndex(x => x.Id == updatedEmployee.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = updatedEmployee;
                return true;
            }

            return false;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        private void DeleteChildren(int parentId)
        {
            List<Employee> children = Items.Where(x => x.ParentId == parentId).ToList();

            foreach (Employee child in children)
            {
                DeleteChildren(child.Id);
            }

            Items.RemoveAll(x => x.ParentId == parentId);
        }

        private void PopulateChildren(List<Employee> items, int? parentId, int level)
        {
            int itemCount = level == 1 ? RootItemCount : ChildItemCount;

            for (int i = 1; i <= itemCount; i++)
            {
                int itemId = ++LastId;

                items.Add(new Employee()
                {
                    Id = itemId,
                    ParentId = parentId,
                    HasChildren = level < TreeLevelCount,
                    Name = $"Employee Name {itemId}", // {level}-{i}
                    Notes = $"Multi-line\nnotes {itemId}",
                    Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                    HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                    IsDriver = itemId % 2 == 0
                });

                if (level < TreeLevelCount)
                {
                    PopulateChildren(items, itemId, level + 1);
                }
            }
        }

        public EmployeeService(int treeLevelCount = 3, int rootItemCount = 3, int childItemCount = 2)
        {
            TreeLevelCount = treeLevelCount;
            RootItemCount = rootItemCount;
            ChildItemCount = childItemCount;

            List<Employee> items = new();
            PopulateChildren(items, null, 1);

            Items = items;
        }
    }

    #endregion Data Service
}
````

## See Also

* [TreeList State documentation](slug:treelist-state)
* [TreeListState API reference](slug:Telerik.Blazor.Components.TreeListState-1)
