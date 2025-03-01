#overview-required

> Make sure to read the [TreeList CRUD Operations](slug:treelist-editing-overview) article first.

#end

#without-commands

Without using the above command buttons, the application can:

* [Manage add or edit mode programmatically](slug:grid-kb-add-edit-state) through the [TreeList state](slug:treelist-state).
* Modify data items directly in the TreeList data source. [Rebind the TreeList](slug:common-features-data-binding-overview#refresh-data) afterwards.

#end

#basic-example-description
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the TreeList data source.
* Query the data service and reload the TreeList `Data` when the create, delete, or update operation is complete.
* Use `DataAnnotations` validation for some model class properties.
* Define the `Id` column as non-editable.
* Customize the `Notes` column editor without using an `EditorTemplate`.
* Confirm **Delete** commands with the built-in TreeList Dialog. You can also [intercept item deletion with a separate Dialog or a custom popup](slug:grid-kb-customize-delete-confirmation-dialog).
* Override the `Equals()` method of the TreeList model class to prevent collapsing of updated items.
* Toggle the `HasChildren` property value of parent items when they lose all their children or gain their first child item.
* Delete all children of a deleted parent item.
#end

#basic-example-parameters-columns
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
#end

#basic-example-code
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
#end

#flat-crud-service-and-model
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
#end

#hierarchical-crud-service-and-model
    public class Employee
    {
        public int Id { get; set; }
        public bool HasChildren { get; set; }
        public List<Employee>? Items { get; set; }
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
    }

    #region Data Service

    public class EmployeeService
    {
        private List<Employee> Items { get; set; } = new();

        private readonly int TreeLevelCount;
        private readonly int RootItemCount;
        private readonly int ChildItemCount;

        private int LastId { get; set; }
        private readonly Random Rnd = Random.Shared;

        public async Task<int> Create(Employee employee, Employee? parentEmployee)
        {
            await SimulateAsyncOperation();

            employee.Id = ++LastId;

            if (parentEmployee != null)
            {
                parentEmployee.HasChildren = true;
                parentEmployee.Items = parentEmployee.Items ?? new List<Employee>();
                parentEmployee.Items.Insert(0, employee);
            }
            else
            {
                Items.Insert(0, employee);
            }

            return LastId;
        }

        public async Task<bool> Delete(Employee employee)
        {
            await SimulateAsyncOperation();

            FindItem(Items, employee);

            if (FoundChildItem != null)
            {
                if (FoundParentItem != null)
                {
                    FoundParentItem?.Items?.Remove(FoundChildItem);
                    if (FoundParentItem?.Items?.Count == 0)
                    {
                        FoundParentItem.Items = null;
                        FoundParentItem.HasChildren = false;
                    }
                }
                else
                {
                    Items.Remove(FoundChildItem);
                }

                ResetFoundItems();

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

            FindItem(Items, employee);

            if (FoundChildItem != null)
            {
                if (FoundParentItem != null)
                {
                    FoundParentItem.Items![FoundChildItemIndex] = employee;
                }
                else
                {
                    Items[FoundChildItemIndex] = employee;
                }

                ResetFoundItems();

                return true;
            }

            return false;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        private Employee? FoundParentItem { get; set; }
        private int FoundChildItemIndex { get; set; }
        private Employee? FoundChildItem { get; set; }

        private void ResetFoundItems()
        {
            FoundParentItem = null;
            FoundChildItemIndex = default;
            FoundChildItem = null;
        }

        private void FindItem(List<Employee> items, Employee item)
        {
            Employee? parentCandidate;

            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id == item.Id)
                {
                    FoundChildItemIndex = i;
                    FoundChildItem = item;
                    return;
                }

                if (items[i].Items?.Count > 0)
                {
                    parentCandidate = items[i];
                    FindItem(items[i].Items!, item);

                    if (FoundChildItem != null)
                    {
                        if (parentCandidate.Items!.Contains(FoundChildItem))
                        {
                            FoundParentItem = parentCandidate;
                        }

                        return;
                    }
                }
            }
        }

        private void PopulateItems(List<Employee> items, int level)
        {
            for (int i = 1; i <= (level == 1 ? RootItemCount : ChildItemCount); i++)
            {
                var itemId = ++LastId;

                var newItem = new Employee()
                {
                    Id = itemId,
                    HasChildren = level < TreeLevelCount,
                    Name = $"Employee Name {itemId}", // {level}-{i}
                    Notes = $"Multi-line\nnotes {itemId}",
                    Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                    HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                    IsDriver = itemId % 2 == 0
                };

                items.Add(newItem);
            }

            if (level < TreeLevelCount)
            {
                PopulateChildren(items, level + 1);
            }
        }

        private void PopulateChildren(List<Employee> items, int level)
        {
            foreach (var item in items)
            {
                item.Items = new List<Employee>();

                PopulateItems(item.Items, level);
            }
        }

        public EmployeeService(int treeLevelCount = 3, int rootItemCount = 3, int childItemCount = 2)
        {
            TreeLevelCount = treeLevelCount;
            RootItemCount = rootItemCount;
            ChildItemCount = childItemCount;

            List<Employee> items = new();
            PopulateItems(items, 1);

            Items = items;
        }
    }

    #endregion Data Service
#end