#initial-state
>tip If you want to set an initial state to the Grid, use a similar snippet, but in the [`OnStateInit event`]({%slug grid-state%}#onstateinit)
#end


#set-sort-from-code
@* This snippet shows how to set sorting state to the grid from your code *@

@using Telerik.DataSource;

<TelerikButton ThemeColor="primary" OnClick="@SetGridSort">set sort from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@GridRef"
             Pageable="true" Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> GridRef { get; set; }

    private async Task SetGridSort()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor { Member = "Id", SortDirection = ListSortDirection.Descending }
            }
        };

        await GridRef.SetStateAsync(desiredState);
    }

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
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

<TelerikButton ThemeColor="primary" OnClick="@SetGridFilter">Filter From Code</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Height="400px"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="150px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> GridRef { get; set; }

    private async Task SetGridFilter()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
            {
                FilterDescriptors = new List<IFilterDescriptor>()
                {
                    new CompositeFilterDescriptor(){
                        FilterDescriptors = new FilterDescriptorCollection()
                        {
                            new FilterDescriptor() { Member = "Id", Operator = FilterOperator.IsGreaterThan, Value = 10, MemberType = typeof(int)}
                        }
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

        await GridRef.SetStateAsync(desiredState);
    }

    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 30).Select(x => new SampleData
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

<TelerikButton ThemeColor="primary" OnClick="@SetGridFilter">set filtering from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@GridRef"
             Pageable="true" FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> GridRef { get; set; }

    private async Task SetGridFilter()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            FilterDescriptors = new List<IFilterDescriptor>()
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

        await GridRef.SetStateAsync(desiredState);
    }

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
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

#filter-menu-default-filters

>note If you want to alter the filters for a specific column, do not use more than one `FilterDescriptor` in `FilterRow` mode, and more than two `FilterDescriptors` in `FilterMenu` mode. Otherwise additional descriptors will not show up in the UI. This means that you may need to replace or modify an existing descriptor, rather than add a new one.
>
> Inactive filter descriptors in `FilterMenu` mode are distinguished by their `null` `Value`.

#end

#group-from-code
@using Telerik.DataSource;

<TelerikButton ThemeColor="primary" OnClick="@SetGridGroup">set grouping from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@GridRef" Groupable="true"
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
    private TelerikGrid<SampleData> GridRef { get; set; }

    private async Task SetGridGroup()
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

        await GridRef.SetStateAsync(desiredState);
    }

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
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

<TelerikButton ThemeColor="primary" OnClick="@ExpandHierarchy">Expand hierarchy from code</TelerikButton>

<TelerikGrid Data="salesTeamMembers" @ref="@GridRef">
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
    private TelerikGrid<MainModel> GridRef { get; set; }

    private async Task ExpandHierarchy()
    {
        var gridState = GridRef.GetState();

        //expand the first two rows
        gridState.ExpandedItems = new List<MainModel> {
            salesTeamMembers[0],
            salesTeamMembers[1]
        };

        await GridRef.SetStateAsync(gridState);
    }

    private List<MainModel> salesTeamMembers { get; set; }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 1; i <= 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 3).Select(x => new DetailsModel {
                OrderId = i * 100 + x, DealSize = (x ^ i) + 1 }
            ).ToList();
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


#column-state-from-code
<TelerikButton OnClick="@OnButtonClick">Reoder Name and Price Columns</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Reorderable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Active)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product> GridRef { get; set; }

    private List<Product> GridData { get; set; }

    private async Task OnButtonClick()
    {
        var gridState = GridRef.GetState();

        var nameColState = gridState.ColumnStates.ElementAt(0);
        var nameColIndex = nameColState.Index;
        var priceColState = gridState.ColumnStates.ElementAt(1);
        var priceColIndex = priceColState.Index;

        nameColState.Index = priceColIndex;
        priceColState.Index = nameColIndex;

        await GridRef.SetStateAsync(gridState);
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = (decimal)rnd.Next(1, 100),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                Active = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Active { get; set; }
    }
}
#end

#statechanged-possible-prop-values
The possible values for the `PropertyName` are `SortDescriptors`, `FilterDescriptors`, `SearchFilter`, `GroupDescriptors`, `Page`, `Skip`, `CollapsedGroups`, `ColumnStates`, `ExpandedItems`, `InsertedItem`, `OriginalEditItem`, `EditItem`.
#end
