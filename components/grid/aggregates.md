---
title: Aggregates
page_title: Grid for Blazor | Aggregates
description: Enable and configure field aggregates in Grid for Blazor
slug: grid-aggregates
tags: telerik,blazor,grid,aggreagates,aggregate
published: True
position: 23
---

# Grid Aggregates

The Grid component provides built-in aggregates for column values based on [grouping]({%slug components/grid/features/grouping%}).

There are several available aggregate functions under the `Telerik.Blazor.GridAggregateType` enum:

* `Average`
* `Count`
* `Max`
* `Min`
* `Sum`

To enable aggregates:

1. Set the grid's `Groupable` property to `true`.
1. Under the `GridAggregates` tag, define the `GridAggregate` entries to enable the aggregations per field you want to use.
1. Use the aggregate result in the templates that support it by casting their `context` to a `GridGroupAggregateResult`:

    * `GroupFooterTemplate` - a footer in the respective column that renders when the grid is grouped.

You should define only aggregates that you will use to avoid unnecessary calculations that may be noticeable on large data sets.


>caption Use Aggregates in the Telerik Blazor Grid

````CSHTML
@* Enable and use aggregates. To see the effect, group by a column, e.g., Team or "On Vacation" *@

<TelerikGrid Data=@GridData Groupable="true" Pageable="true" Height="400px">
    <GridAggregates>
        <GridAggregate Field=@nameof(Employee.Team) Aggregate="@GridAggregateType.Count" />
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Sum" />
        <GridAggregate Field=@nameof(Employee.HireDate) Aggregate="@GridAggregateType.Min" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) Title="Team">
            <GroupFooter>
                <strong>@((context as GridGroupAggregateResult).Sum)</strong>
            </GroupFooter>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Salary) Title="Salary" Groupable="false" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" Groupable="false" />
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
            Random rnd = new Random();
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                Salary = rnd.Next(1000, 5000),
                IsOnLeave = i % 2 == 0
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public decimal Salary { get; set; }
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````


## See Also

  * [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
   
  
