#initial-state
>tip If you want to set an initial state to the grid, use a similar snippet, but in the [`OnStateInit event`]({%slug grid-state%}#set-default-initial-state)
#end


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


#filter-menu-default-filters
>note When the Grid `FilterMode` is `FilterMenu`, the component will create default `FilterDecriptor`s in its state for **all columns**. This allows filter templates to work seamlessly and with little code. If you want to alter filters for a column, you must either modify the existing descriptor, or replace it. Simply adding an additional `FilterDescriptor` will not show up in the UI, because the Grid uses the first descriptor for the given field for the filtering UI. Another implication is that the Grid state always contains filter descriptors, no matter if the user has filtered or not. Inactive filter descriptors are distinguished by their `null` `Value`.

>caption Handling filter changes - unexpected addition that does not update the UI, replacement of one filter, replacecment of all filters

````Component
@using Telerik.DataSource

To see the full effects of this behavior, filter a column such as the ID being less than or equal to 4.
<br /> Then, click a button to see the different behavior each will have:
<ul>
    <li>
        the first button will not show the new filter in the Team column header
        <TelerikButton OnClick="@WrongFilterAdd">Add filter without replace - you will not see the change in the filter UI but the data will change</TelerikButton>
    </li>
    <li>
        the second button will keep the ID column filter and add the Team filter
        <TelerikButton OnClick="@SetFilterWithReplaceInCollection">Replace only Team filter</TelerikButton>
    </li>
    <li>
        the third button will remove all filters and set only the custom Team filter
        <TelerikButton OnClick="@SetFilterNewCollection">Replace all filters to filter by Team</TelerikButton>
    </li>
</ul>

This flexibility lets you choose what behavior you want from the grid.



<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" Sortable="true"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>



@code{
    // adds a filter without affecting the UI
    async Task WrongFilterAdd()
    {
        // get state
        var state = Grid.GetState();

        // simply add a filter to the existing state and existing (default) filters
        // PROBLEM - YOU WILL NOT SEE IT HIHGLIGHT THE UI BECAUSE THERE IS A DEFAULT FILTER ALREADY

        state.FilterDescriptors.Add(new CompositeFilterDescriptor()
        {
            FilterDescriptors = new FilterDescriptorCollection()
            {
                new FilterDescriptor
                {
                    Member = "Team",
                    Operator = FilterOperator.IsEqualTo,
                    Value = "team 1",
                    MemberType = typeof(string)
                },
                new FilterDescriptor()
                {
                    Member = "Team",
                    Operator = FilterOperator.IsEqualTo,
                    Value = null,
                    MemberType = typeof(string)
                }
            },
            LogicalOperator = FilterCompositionLogicalOperator.Or
        });

        // set state
        await Grid.SetState(state);
    }

    // adds a filter
    async Task SetFilterWithReplaceInCollection()
    {
        // get the current state
        var state = Grid.GetState();

        // remove the current filters for the Team field
        // if you don't do this, the default or exiting fitlers will command the UI
        // and you may not see the change from the new filter you will add
        // see the extension methods related to GetFiltersForMember in the adjacent code tab
        // create a new collection so we can iterate over it without it getting lost with the removal from the parent collection
        List<IFilterDescriptor> teamFilters = new List<IFilterDescriptor>(state.FilterDescriptors.GetFiltersForMember("Team"));
        
        // remove the existing filters for the Team field from the current collection
        for (int i = 0; i < teamFilters.Count(); i++)
        {
            state.FilterDescriptors.Remove(teamFilters.ElementAt(i) as FilterDescriptorBase);
        }

        // create the desired new filter for the Team field
        CompositeFilterDescriptor theFilterDescriptor = new CompositeFilterDescriptor()
        {
            FilterDescriptors = new FilterDescriptorCollection()
            {
                new FilterDescriptor
                {
                    Member = "Team",
                    Operator = FilterOperator.IsEqualTo,
                    Value = "team 2",
                    MemberType = typeof(string)
                },
                new FilterDescriptor()
                {
                    Member = "Team",
                    Operator = FilterOperator.IsEqualTo,
                    Value = null,
                    MemberType = typeof(string)
                }
            },
            LogicalOperator = FilterCompositionLogicalOperator.Or
        };

        // add the new filter so that it replaces the original filter(s)
        state.FilterDescriptors.Add(theFilterDescriptor);

        // set the updated state
        await Grid.SetState(state);
    }

    // replaces all filters
    async Task SetFilterNewCollection()
    {
        // get the current state
        var state = Grid.GetState();

        //replace the entire filters collection so it only has the new desired filter
        state.FilterDescriptors = new List<FilterDescriptorBase>()
        {
            new CompositeFilterDescriptor()
            {
                FilterDescriptors = new FilterDescriptorCollection()
                {
                    new FilterDescriptor()
                    {
                        Member = "Team",
                        Operator = FilterOperator.Contains,
                        Value = "3",
                        MemberType = typeof(string)
                    },
                    new FilterDescriptor()
                    {
                        Member = "Team",
                        Operator = FilterOperator.IsEqualTo,
                        Value = null,
                        MemberType = typeof(string)
                    }
                },
                LogicalOperator = FilterCompositionLogicalOperator.Or
            }
        };

        // set the new state
        await Grid.SetState(state);
    }
}

@code {
    TelerikGrid<SampleData> Grid { get; set; }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "Team " + x % 5,
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
````
````Extensions
using Telerik.DataSource;

//make sure the namespace matches your page, or add an appropriate using

public static class FilterExtensions
{
    public static IEnumerable<CompositeFilterDescriptor> GetCompositeFiltersForMember(this IEnumerable<IFilterDescriptor> filtersCollection, string member)
    {
        var compositeFilters = filtersCollection.OfType<CompositeFilterDescriptor>();
        return compositeFilters.GetFiltersForMember(member).Cast<CompositeFilterDescriptor>();
    }

    public static IEnumerable<IFilterDescriptor> GetAllFiltersForMember(this IEnumerable<IFilterDescriptor> filtersCollection, string member)
    {
        return filtersCollection.SelectMemberDescriptors().GetFiltersForMember(member);
    }

    public static IEnumerable<IFilterDescriptor> GetFiltersForMember(this IEnumerable<IFilterDescriptor> filtersCollection, string member)
    {
        return filtersCollection.Where(filter => filter.GetFilterMember() == member) ??
               Enumerable.Empty<IFilterDescriptor>();
    }

    public static string GetFilterMember(this IFilterDescriptor filter)
    {
        var filterDescriptor = filter;
        var isFilterDescriptor = filterDescriptor is FilterDescriptor;

        while (!isFilterDescriptor)
        {
            var compositeDescriptor = filterDescriptor as CompositeFilterDescriptor;

            if (compositeDescriptor == null)
            {
                break;
            }

            filterDescriptor = compositeDescriptor.FilterDescriptors?.ElementAtOrDefault(0);
            isFilterDescriptor = filterDescriptor is FilterDescriptor;
        }

        return ((FilterDescriptor)filterDescriptor)?.Member;
    }
}
````
#end




#group-from-code
@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridGroup">set grouping from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid" Groupable="true"
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


#statechanged-possible-prop-values
The possible values for the `PropertyName` are `SortDescriptors`, `FilterDescriptors`, `GroupDescriptors`, `Page`, `Skip`, `CollapsedGroups`, `ColumnStates`, `ExpandedRows`, `InsertedItem`, `OriginalEditItem`, `EditItem`.
#end
