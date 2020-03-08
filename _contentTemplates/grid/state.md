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
    public TelerikGridBase<SampleData> Grid { get; set; }

    async Task SetGridSort()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor { Member = "Id", SortDirection = ListSortDirection.Descending, , MemberType = typeof(int) }
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
    public TelerikGridBase<SampleData> Grid { get; set; }

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
    public TelerikGridBase<SampleData> Grid { get; set; }

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
    public TelerikGridBase<SampleData> Grid { get; set; }

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

