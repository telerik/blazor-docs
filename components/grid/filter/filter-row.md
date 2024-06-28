---
title: Filter Row
page_title: Grid - Filter Row
description: Enable and configure Filter Row in Grid for Blazor.
slug: grid-filter-row
tags: telerik,blazor,grid,filtering,filter,row
published: True
position: 5
---

# Grid Filter Row

One of the [filter modes of the grid]({%slug components/grid/filtering%}) is a row of filter elements below the column headers.

In this article:

* [Basics](#basics)
* [Filter From Code](#filter-from-code)
* [Customization](#customization)


## Basics

To enable the filter row set the `FilterMode` property of the grid to `Telerik.Blazor.GridFilterMode.FilterRow`.

The grid will render a row below the column headers with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type or click a button to choose a different filter operator (like `Contains`, `GreaterThan`, and so on). Filters are applied as the user types in the inputs. Once you enter the filter criteria, the clear button will be enabled to allow you to reset the filter state.

The default filter operator is `Contains` for `string` columns and `IsEqualTo` for numbers and dates. Boolean columns display a filtering drop down that effectively combines the filter operator and value.

>caption Filter Row in Telerik Grid

````CSHTML
@* Filter row mode *@

<TelerikGrid Data=@GridData FilterMode="Telerik.Blazor.GridFilterMode.FilterRow" Pageable="true" Height="400px">
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

You can set the grid filters from your code through the grid [state]({%slug grid-state%}).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set filtering programmatically

````CSHTML
@[template](/_contentTemplates/grid/state.md#filter-row-from-code)
````

## Customization

The Grid allows you to customize the default behavior of the Filter Row in a couple ways:

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

>caption Configure the Filter Row

````CSHTML
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

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Row Template]({%slug grid-templates-filter%}#filter-row-template) article.


## See Also

  * [Grid Filtering Overview]({%slug components/grid/filtering%})
  * [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
