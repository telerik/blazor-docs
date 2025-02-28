---
title: Inline Editing
page_title: TreeList - Inline Editing
description: Inline (row) editing of data in treelist for Blazor.
slug: treelist-editing-inline
tags: telerik,blazor,treelist,inline,editing
published: True
position: 1
---

# TreeList Inline Editing

Inline editing lets the user click an [Edit command button](slug:treelist-columns-command) on the row, and all its editable columns open up for changes. They can then click a `Save` command button to submit the changes to the data access layer. This fires the `OnUpdate` event of the treelist where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service). 


In a similar fashion, the `Cancel` and `Delete` command buttons fire events on the treelist to let you handle the data source operations.

When validation is not satisfied, clicking the Save, Delete or Add buttons will not have effect, but you can still navigate between all fields in the row to complete editing.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Inline editing in the treelist, set its `EditMode` property to `Telerik.Blazor.TreeListEditMode.Inline`, then handle the CRUD events as shown in the example below.


>caption The Command buttons and the treelist events let you handle data operations in Inline edit mode

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 EditMode="@TreeListEditMode.Inline"
                 OnCreate="@OnTreeListCreate"
                 OnDelete="@OnTreeListDelete"
                 OnUpdate="@OnTreeListUpdate"
                 Height="400px">
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Id)" Editable="false" Width="60px" />
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Notes)" EditorType="@TreeListEditorType.TextArea" Width="120px">
            <Template>
                @{ var dataItem = (Employee)context; }
                <div style="white-space:pre">@dataItem.Notes</div>
            </Template>
        </TreeListColumn>
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="80px" />
        <TreeListCommandColumn Width="200px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
            <TreeListCommandButton Command="Delete">Delete</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private IEnumerable<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private async Task OnTreeListCreate(TreeListCommandEventArgs args)
    {
        var createdItem = (Employee)args.Item;
        var parentItem = (Employee?)args.ParentItem;

        await TreeListEmployeeService.Create(createdItem, parentItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    private async Task OnTreeListDelete(TreeListCommandEventArgs args)
    {
        var deletedItem = (Employee)args.Item;

        await TreeListEmployeeService.Delete(deletedItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    private async Task OnTreeListUpdate(TreeListCommandEventArgs args)
    {
        var updatedItem = (Employee)args.Item;

        await TreeListEmployeeService.Update(updatedItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
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

        public async Task<int> Create(Employee employee, Employee? parentEmployee)
        {
            await SimulateAsyncOperation();

            employee.Id = ++LastId;
            employee.ParentId = parentEmployee?.Id;

            Items.Insert(0, employee);

            if (parentEmployee != null)
            {
                parentEmployee.HasChildren = true;
            }

            return LastId;
        }

        public async Task<bool> Delete(Employee employee)
        {
            await SimulateAsyncOperation();

            if (Items.Contains(employee))
            {
                DeleteChildren(employee.Id);
                Items.Remove(employee);

                if (employee.ParentId.HasValue)
                {
                    Employee parentItem = Items.First(x => x.Id == employee.ParentId.Value);

                    if (!Items.Any(x => x.ParentId == parentItem.Id))
                    {
                        parentItem.HasChildren = false;
                    }
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

        public async Task<bool> Update(Employee employee)
        {
            await SimulateAsyncOperation();

            int originalItemIndex = Items.FindIndex(x => x.Id == employee.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = employee;
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
            var itemCount = level == 1 ? RootItemCount : ChildItemCount;

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

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## See Also

  * [Live Demo: TreeList Inline Editing](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
   
