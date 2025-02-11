---
title: Filter Menu
page_title: Grid - Filter Menu
description: Enable and configure Filter Menu in Grid for Blazor.
slug: grid-filter-menu
tags: telerik,blazor,grid,filtering,filter,menu
published: True
position: 10
---

# Grid Filter Menu

The `FilterMenu` filter mode renders a button in the column header. When you click the button, a popup with filtering options appears. The popup allows you to apply two filter criteria, choose a suitable filter operator and buttons to apply, or clear the filter.

## Enabling Filter Menu

Set the `FilterMode` parameter of the Telerik Grid to `GridFilterMode.FilterMenu`.

>caption Filter Menu in Telerik Grid

````RAZOR
@* Filter menu in the column header *@

<TelerikGrid Data=@GridData FilterMode="@GridFilterMode.FilterMenu"
			 Pageable="true" Height="400px">
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

You can customize the default behavior of the Filter Menu in a couple ways:

### Configuring the Filter Menu

You can override the default Filter Menu behavior for each column through the following property the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-menu-customization-properties)

>caption Configure the Filter Menu

````RAZOR
@*Customize the Filter Menu*@

@using Telerik.DataSource

<TelerikGrid Data="@MyData"
             Height="400px"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn DefaultFilterOperator="FilterOperator.IsEqualTo"
                    Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn DefaultFilterOperator="FilterOperator.StartsWith"
                    Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn DefaultFilterOperator="FilterOperator.Contains"
                    Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn DefaultFilterOperator="FilterOperator.IsGreaterThanOrEqualTo"
                    Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
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


### FilterMenuType

You can switch between [CheckBoxList](slug:grid-checklist-filter) and a `Menu` filtering layout for a particular `<GridColumn>` by setting the `FilterMenuType` to `FilterMenuType.Menu` or `FilterMenuType.CheckBoxList`.

### CheckBoxList

You can render a list of checkboxes instead of the default menu layout. Read the [CheckBoxList Filtering article](slug:grid-checklist-filter) for more information... 

### Filter Menu Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Menu Template](slug:grid-templates-filter#filter-menu-template) article.


## See Also

  * [Grid Filtering Overview](slug:components/grid/filtering)
  * [Live Demo: Grid Filter Menu](https://demos.telerik.com/blazor-ui/grid/filter-menu)
  * [Blazor Grid](slug:grid-overview)
