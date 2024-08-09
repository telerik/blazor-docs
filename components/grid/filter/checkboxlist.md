---
title: CheckBoxList
page_title: Grid - Filtering CheckBoxList
description: Enable and configure filtering CheckBoxList in Grid for Blazor.
slug: grid-checklist-filter
tags: telerik,blazor,grid,filtering,filter,CheckBoxList
published: True
position: 15
---

# Grid CheckBoxList Filtering

You can change the [filter menu]({%slug grid-filter-menu%}) to show a list of checkboxes with the distinct values from the data source. This lets your users filter records by a commonly found value quickly, and select multiple values with ease. The behavior is similar to Excel filtering.

## Basic Setup

To enable the checkbox list filtering in the grid:

1. Set the `FilterMode` parameter of the grid to `Telerik.Blazor.GridFilterMode.FilterMenu`
1. Set the `FilterMenuType` parameter of the grid to `Telerik.Blazor.FilterMenuType.CheckBoxList`. It defaults to `Menu` for the default behavior.

You can also change the filter menu behavior for a particular column - its own `FilterMenuType` parameter can be either `Menu` or `CheckBoxList` regardless of the main grid parameter. This lets you mix both modes as necessary for your application - you can either have all grid columns use the same mode with a single setting, or override it for a few columns that need the less common mode.

>caption CheckList filter in the grid

````CSHTML
@* Checkbox List Filter for the Name, Team and Vacation columns, the ID column overrides it to Menu *@

<TelerikGrid Data=@GridData Pageable="true" Height="400px"
             FilterMode="@GridFilterMode.FilterMenu" FilterMenuType="@FilterMenuType.CheckBoxList">
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.EmployeeId))" FilterMenuType="@FilterMenuType.Menu" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

>caption The result from the snippet above

![checbox list filter in action](images/checklist-filter-overview.gif)


## Custom Data

By default, the grid takes the `Distinct` values from its `Data` to populate the checkbox list filter for each field.

When using the [`OnRead` event]({%slug components/grid/manual-operations%}) to customize the data operations and/or perform them on the server/service, the grid will only have the current page of data. This will limit the options the user will see so you may want to provide the full list.

To customize the checkbox list behavior, you should use the [filter menu template]({%slug grid-templates-filter%}#filter-menu-template). To help you with that, we have exposed the `TelerikCheckBoxListFilter` component that you can place inside the `FilterMenuTemplate` to get the default grid UI. It provides the following settings:

* `FilterDescriptor` - the filter descriptor where filters will be populated when checkboxes are selected. The component creates the necessary descriptors for you and reads existing ones. This makes it easy to plug into the grid without any additional code through two-way binding (`@bind-FilterDescriptor="@context.FilterDescriptor"`)..

* `Data` - the data that will be rendered in the checkbox list. This is where you can supply the desired options to change what the grid displays.

* `Field` - the field from the data that will be used to take the `Distinct` options. It must match the name and type of the column field for which this filter is defined. This lets you use the same models that the grid uses, or to define smaller models to reduce the data you fetch for the filter lists.

>caption Provide all filtering options when using OnRead

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

Filter by selecting a few names. Then filter by the Teams field (the fields that use application-provided data).<br />
You will see you have all the options for the teams and all the options for the names.<br />
Now try to filter by the On Vacation column - it will use only the current grid data and you may have only a single option,
depending on how you filter the data so you may never be able to get back all values.


<TelerikGrid TItem="@Employee"
             OnRead="@OnReadHandler"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             FilterMenuType="@FilterMenuType.CheckBoxList"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.EmployeeId))" Filterable="false" />
        <GridColumn Field="@nameof(Employee.Name)">
            <FilterMenuTemplate Context="context">
                <TelerikCheckBoxListFilter Data="@NameOptions"
                                           Field="@(nameof(NameFilterOption.Name))"
                                           @bind-FilterDescriptor="@context.FilterDescriptor">
                </TelerikCheckBoxListFilter>
            </FilterMenuTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.Team)" Title="Team">
            <FilterMenuTemplate Context="context">
                <TelerikCheckBoxListFilter Data="@TeamsList"
                                           Field="@(nameof(TeamNameFilterOption.Team))"
                                           @bind-FilterDescriptor="@context.FilterDescriptor">
                </TelerikCheckBoxListFilter>
            </FilterMenuTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.IsOnLeave)" Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    List<Employee> AllGridData { get; set; }

    #region custom-filter-data
    List<TeamNameFilterOption> TeamsList { get; set; }
    List<NameFilterOption> NameOptions { get; set; }

    //obtain filter lists data from the data source to show all options
    async Task GetTeamOptions()
    {
        if (TeamsList == null) // sample of caching since we always want all distinct options,
                               //but we don't want to make unnecessary requests
        {
            TeamsList = await GetNamesFromService();
        }
    }

    async Task<List<TeamNameFilterOption>> GetNamesFromService()
    {
        await Task.Delay(500);// simulate a real service delay

        // this is just one example of getting distinct values from the full data source
        // in a real case you'd probably call your data service here instead
        // or apply further logic (such as tie the returned data to the data the grid will have according to your business logic)
        List<TeamNameFilterOption> data = AllGridData.OrderBy(z => z.Team).Select(z => z.Team).
            Distinct().Select(t => new TeamNameFilterOption { Team = t }).ToList();

        return await Task.FromResult(data);
    }

    async Task GetNameOptions()
    {
        if (NameOptions == null)
        {
            NameOptions = await GetNameOptionsFromService();
        }
    }

    async Task<List<NameFilterOption>> GetNameOptionsFromService()
    {
        await Task.Delay(500);// simulate a real service delay

        List<NameFilterOption> data = AllGridData.OrderBy(z => z.Name).Select(z => z.Name).
            Distinct().Select(n => new NameFilterOption { Name = n }).ToList();

        return await Task.FromResult(data);
    }
    #endregion custom-filter-data

    async Task OnReadHandler(GridReadEventArgs args)
    {
        //typical data retrieval for the grid
        var filteredData = await AllGridData.ToDataSourceResultAsync(args.Request);
        args.Data = filteredData.Data as IEnumerable<Employee>;
        args.Total = filteredData.Total;
    }

    protected override async Task OnInitializedAsync()
    {
        // generate data that simulates the database for this example
        // the actual grid data is retrieve in its OnRead handler
        AllGridData = new List<Employee>();
        var rand = new Random();
        for (int i = 1; i <= 15; i++)
        {
            AllGridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }

        // Get custom filters data.
        await GetTeamOptions();
        await GetNameOptions();
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }

    // in this sample we use simplified models to fetch less data from the service
    // instead of using the full Employee model that has many fields we do not need for the filters

    public class TeamNameFilterOption
    {
        public string Team { get; set; }
    }

    public class NameFilterOption
    {
        public string Name { get; set; }
    }
}
````


## See Also

* [Grid Filtering Overview]({%slug components/grid/filtering%})
* [Live Demo: Grid CheckBox List Filter](https://demos.telerik.com/blazor-ui/grid/filter-checkboxlist)
