---
title: Filter Row
page_title: Grid - Filter Row
description: Enable and configure Filter Row in Grid for Blazor.
slug: grid-filter-row
tags: telerik,blazor,grid,filtering,filter,row
published: True
position: 5
components: ["grid"]
---
# Grid Filter Row

The FilterRow filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria.

The Grid applies the filters as the user types in the filtering input. 

## Enabling Filter Row

Set the `FilterMode` parameter of the Telerik Grid to `GridFilterMode.FilterRow`.

> The default filter operator is `Contains` for `string` columns and `IsEqualTo` for numbers and dates. Boolean columns display a filtering drop down that effectively combines the filter operator and value.

>caption Filter Row in Telerik Grid

````RAZOR
@* Filter row mode *@

<TelerikGrid Data=@GridData FilterMode="@GridFilterMode.FilterRow" Pageable="true" Height="400px">
	<GridColumns>
		<GridColumn Field=@nameof(Employee.Name) />
		<GridColumn Field=@nameof(Employee.AgeInYears) Title="Age" />
		<GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
		<GridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
	</GridColumns>
</TelerikGrid>

@code {
	public List<Employee> GridData { get; set; }

	protected override void OnInitialized()
	{
		GridData = new List<Employee>();
		var rand = new Random();
		for (int i = 0; i < 100; i++)
		{
			GridData.Add(new Employee()
			{
				EmployeeId = i,
				Name = "Employee " + i.ToString(),
				AgeInYears = rand.Next(10, 80),
				HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20)),
				IsOnLeave = i % 3 == 0
			});
		}
	}

	public class Employee
	{
		public int? EmployeeId { get; set; }
		public string Name { get; set; }
		public int? AgeInYears { get; set; }
		public DateTime HireDate { get; set; }
		public bool IsOnLeave { get; set; }
	}
}
````


## Filter From Code

To learn how to programmatically filter the Grid, refer to the [Grid State](slug:grid-state) documentation article.

@[template](/_contentTemplates/grid/state.md#initial-state)

## Customization

You can customize the default behavior of the `FilterRow` in a couple ways:

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

>caption Configure the Filter Row

````RAZOR
@*Customize the Filter Row*@

@using Telerik.DataSource

<TelerikGrid Data="@MyData"
             Height="400px"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             FilterRowDebounceDelay="200">
    <GridColumns>
        <GridColumn DefaultFilterOperator="FilterOperator.IsEqualTo"
                    ShowFilterCellButtons="false"
                    Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn DefaultFilterOperator="FilterOperator.StartsWith"
                    ShowFilterCellButtons="false"
                    Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn DefaultFilterOperator="FilterOperator.Contains"
                    ShowFilterCellButtons="false" Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn DefaultFilterOperator="FilterOperator.IsGreaterThanOrEqualTo"
                    ShowFilterCellButtons="false" Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
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
````

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Row Template](slug:grid-templates-filter#filter-row-template) article.

## See Also

  * [Grid Filtering Overview](slug:components/grid/filtering)
  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
  * [Blazor Grid](slug:grid-overview)
