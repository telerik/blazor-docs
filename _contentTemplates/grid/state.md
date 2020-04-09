#set-sort-from-code
@* This snippet shows how to set sorting state to the grid from your code *@

@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridSort">set sort from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> Grid { get; set; }

    async Task SetGridSort()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor { Member = "Id", SortDirection = ListSortDirection.Descending }
            }
        };

        await Grid.SetState(desiredState);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
#end



#filter-row-from-code
@* This snippet shows how to set filtering state to the grid from your code
  Applies to the FilterRow mode *@

@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridFilter">set filtering from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> Grid { get; set; }

    async Task SetGridFilter()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            FilterDescriptors = new List<FilterDescriptorBase>()
            {
                new FilterDescriptor() { Member = "Id", Operator = FilterOperator.IsGreaterThan, Value = 10, MemberType = typeof(int) },
                new FilterDescriptor() { Member = "Team", Operator = FilterOperator.Contains, Value = "3", MemberType = typeof(string) },
            }
        };

        await Grid.SetState(desiredState);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
#end

#filter-menu-from-code
@* This snippet shows how to set filtering state to the grid from your code
  Applies to the FilterMenu mode *@
  
@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridFilter">set filtering from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> Grid { get; set; }

    async Task SetGridFilter()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            FilterDescriptors = new List<FilterDescriptorBase>()
            {
                new CompositeFilterDescriptor()
                {
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                         new FilterDescriptor() { Member = "Id", Operator = FilterOperator.IsGreaterThan, Value = 5, MemberType = typeof(int) },
                         new FilterDescriptor() { Member = "Id", Operator = FilterOperator.IsLessThan, Value = 20, MemberType = typeof(int) },
                    },
                    LogicalOperator = FilterCompositionLogicalOperator.And
                },
                new CompositeFilterDescriptor()
                {
                    FilterDescriptors = new FilterDescriptorCollection()
                    {
                        new FilterDescriptor() { Member = "Team", Operator = FilterOperator.Contains, Value = "3", MemberType = typeof(string) },
                    }
                }
            }
        };

        await Grid.SetState(desiredState);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
#end



#group-from-code
@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridGroup">set grouping from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@nameof(SampleData.IsOnLeave)" Title="On Vacation" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> Grid { get; set; }

    async Task SetGridGroup()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            GroupDescriptors = new List<GroupDescriptor>()
            {
                new GroupDescriptor()
                {
                    Member = "Team",
                    MemberType = typeof(string)
                },
                new GroupDescriptor()
                {
                    Member = "IsOnLeave",
                    MemberType = typeof(bool),
                    SortDirection = ListSortDirection.Descending // not required, but a feature not yet available through the UI
                }
            },
            // choose indexes of groups to be collapsed (they are all expanded by default)
            CollapsedGroups = new List<int>() { 0 },
        };

        await Grid.SetState(desiredState);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        IsOnLeave = x % 2 == 0,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
        public DateTime HireDate { get; set; }
    }
}
#end


#expand-hierarchy-from-code
@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@ExpandHierarchy">Expand hierarchy from code</TelerikButton>

<TelerikGrid Data="salesTeamMembers" @ref="Grid">
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<MainModel> Grid { get; set; }

    async Task ExpandHierarchy()
    {
        GridState<MainModel> desiredState = new GridState<MainModel>()
        {
            ExpandedRows = new List<int> { 0, 1 }//expand the first two rows
        };

        await Grid.SetState(desiredState);
    }

    List<MainModel> salesTeamMembers { get; set; }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x ^ i }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DetailsModel> Orders { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}
#end

