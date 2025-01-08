#initial-state
>tip If you want to set an initial state to the TreeList, use a similar snippet, but in the [`OnStateInit event`](slug://treelist-state#set-default-initial-state)
#end


#set-sort-from-code
@* This snippet shows how to set sorting state to the TreeList from your code *@

@using Telerik.DataSource;

<TelerikButton OnClick="@SetTreeListSort">Set sorted state</TelerikButton>

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 Pageable="true" 
                 Width="850px" 
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    async Task SetTreeListSort()
    {
        var sortedState = new TreeListState<Employee>()
        {
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor(){ Member = nameof(Employee.Id), SortDirection = ListSortDirection.Descending }
            }
        };

        await TreeListRef.SetStateAsync(sortedState);
    }

    public List<Employee> Data { get; set; }

    // sample model

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
}
#end



#filter-row-from-code
@* This snippet shows how to set filtering state to the TreeList from your code
  Applies to the FilterRow mode *@

@using Telerik.DataSource;

<TelerikButton OnClick="@SetTreeListFilter">Filter From Code</TelerikButton>

<TelerikTreeList Data="@TreeListData"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="150px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    private async Task SetTreeListFilter()
    {
        var filteredState = new TreeListState<Employee>()
            {
                FilterDescriptors = new List<IFilterDescriptor>()
            {
                new CompositeFilterDescriptor(){
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        new FilterDescriptor()
                        {
                            Member = nameof(Employee.Id),
                            MemberType = typeof(int),
                            Operator = FilterOperator.IsGreaterThan,
                            Value = 5
                        }
                    }
                },
                new CompositeFilterDescriptor(){
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        new FilterDescriptor()
                        {
                            Member = nameof(Employee.Name),
                            MemberType = typeof(string),
                            Operator = FilterOperator.Contains,
                            Value = "second level"
                        }
                    }
                }
            }
            };

        await TreeListRef.SetStateAsync(filteredState);
    }

    private List<Employee> TreeListData { get; set; }

    // sample model

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

    // data generation

    // used in this example for data generation and retrieval for CUD operations on the current view-model data
    public int LastId { get; set; } = 1;

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await GetTreeListData();
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
}
#end

#filter-menu-from-code
@* This snippet shows how to set filtering state to the TreeList from your code
  Applies to the FilterMenu mode *@
  
@using Telerik.DataSource;

<TelerikButton OnClick="@SetTreeListFilter">Set filtered state</TelerikButton>

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterMenu"
                 Pageable="true" 
                 Width="850px" 
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    async Task SetTreeListFilter()
    {
        var filteredState = new TreeListState<Employee>()
        {
            FilterDescriptors = new List<IFilterDescriptor>()
            {
                new CompositeFilterDescriptor(){
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        new FilterDescriptor()
                        {
                            Member = nameof(Employee.Id),
                            MemberType = typeof(int),
                            Operator = FilterOperator.IsGreaterThan,
                            Value = 5
                        }
                    }
                },
                new CompositeFilterDescriptor(){
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        new FilterDescriptor()
                        {
                            Member = nameof(Employee.Name),
                            MemberType = typeof(string),
                            Operator = FilterOperator.Contains,
                            Value = "second level"
                        }
                    }
                },

            }
        };

        await TreeListRef.SetStateAsync(filteredState);
    }

    public List<Employee> Data { get; set; }

    // sample model

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
}
#end


#expand-items-from-code
@*Expand a root level item on a button click*@

@using Telerik.DataSource;

<div>
    <span>
        <label for="telerikNumerikTextbox">Select the index a root level item</label>
        <TelerikNumericTextBox Min="0" 
                               Max="@Data.Count" 
                               @bind-Value="@ExpandedItemIndex" 
                               Id="telerikNumerikTextbox"/>
    </span>
    <span>
        <TelerikButton OnClick="@SetTreeListExpandedItems">Expand the selected root level item</TelerikButton>
    </span>
</div>

<br />

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 OnStateInit="((TreeListStateEventArgs<Employee> args) => OnStateInitHandler(args))"
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();
    public int ExpandedItemIndex { get; set; }

    async Task OnStateInitHandler(TreeListStateEventArgs<Employee> args)
    {
        var collapsedItemsState = new TreeListState<Employee>()
        {
            //collapse all items in the TreeList upon initialization of the state
            ExpandedItems = new List<Employee>()
        };

        args.TreeListState = collapsedItemsState;
    }

    async Task SetTreeListExpandedItems()
    {
        var expandedState = new TreeListState<Employee>()
        {
            ExpandedItems = new List<Employee>()
            {
                Data[ExpandedItemIndex]
            }
        };

        await TreeListRef.SetStateAsync(expandedState);
    }

    public List<Employee> Data { get; set; }

    // sample model

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
}
#end

#get-column-state-from-code

@* Click the button, reorder some columns, maybe lock one of them, hide another, and click the button again to see how the state changes but the order of the columns in the state collection remains the same. *@

<TelerikButton OnClick="@GetColumnsFromState">Get the state of the Columns</TelerikButton>

@( new MarkupString(Logger) )

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true"
                 Width="850px"
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee>? TreeListRef { get; set; }

    private string Logger { get; set; } = String.Empty;

    private List<Employee> Data { get; set; } = new();

    private void GetColumnsFromState()
    {
        var columnsState = TreeListRef!.GetState().ColumnStates;

        int index = 0;

        foreach (var item in columnsState)
        {
            bool isVisible = item.Visible != false;

            string log = $"<p>Column: <strong>{item.Field}</strong> | Index in TreeList: {item.Index} | Index in state: {index} | Visible: {isVisible} | Locked: {item.Locked}</p>";
            Logger += log;
            index++;
        }
    }

    protected override void OnInitialized()
    {
        Data = GetTreeListData();
    }

    public int LastId { get; set; } = 1;

    private List<Employee> GetTreeListData()
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

        return data;
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public List<Employee>? DirectReports { get; set; }
    }
}
#end

#column-state-from-code
<TelerikButton OnClick="@ReorderTreeListColumns">Reoder Email and HireDate Columns</TelerikButton>

<TelerikTreeList Data="@Data"
                 ItemsField="@(nameof(Employee.DirectReports))"
                 Reorderable="true"
                 Resizable="true"
                 Sortable="true"
                 Pageable="true"
                 Width="850px"
                 @ref="TreeListRef">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeListRef { get; set; } = new TelerikTreeList<Employee>();

    private async Task ReorderTreeListColumns()
    {
        var treeListState = TreeListRef.GetState();

        var emailColState = treeListState.ColumnStates.ElementAt(2);
        var emailColIndex = emailColState.Index;
        var dateColState = treeListState.ColumnStates.ElementAt(3);
        var dateColIndex = dateColState.Index;

        emailColState.Index = dateColIndex;
        dateColState.Index = emailColIndex;

        await TreeListRef.SetStateAsync(treeListState);
    }

    public List<Employee> Data { get; set; }

    // sample model

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
}
#end