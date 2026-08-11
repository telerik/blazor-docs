---
title: Aggregates
page_title: Grid - Aggregates
description: Enable and configure field aggregates in Grid for Blazor.
slug: grid-aggregates
tags: telerik,blazor,grid,aggreagates,aggregate
published: True
previous_url: /components/grid/aggregates
position: 5
components: ["grid"]
---

# Grid Aggregates

The Grid component provides built-in aggregates for column values based on [grouping](slug:components/grid/features/grouping) and also a grand total row.

#### In this article:

* [Available Aggregate Functions](#available-aggregate-functions)
* [Where You Can Use Aggregates](#where-you-can-use-aggregates)
* [How to Enable Aggregates](#how-to-enable-aggregates)
* [Example](#example)
<demo metaUrl="client/grid/grouping-aggregates/" height="600"></demo>
                <span>Total employees: @context.AggregateResults[nameof(Employee.Name)]?.Count</span>
                <br />
                <span>Average salary: @context.AggregateResults[nameof(Employee.Salary)]?.Average?.ToString("C0")</span>
            </GroupFooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; } = new();

    private void OnGridStateInit(GridStateEventArgs<Employee> args)
    {
        args.GridState.GroupDescriptors.Add(new GroupDescriptor()
            {
                Member = nameof(Employee.Team)
            });
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = $"Employee {i}",
                    Team = $"Team {i % 2 + 1}",
                    Salary = Random.Shared.Next(1000, 5000),
                    ActiveProjects = i % 4 == 0 ? 2 : 5
                });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public decimal Salary { get; set; }
        public int ActiveProjects { get; set; }
    }
}
````

>caption The result of the code snippet above after the grid has been grouped by the `Team` and `Active Projects` columns

![Blazor Grid Aggregates Overview](images/grid-aggregates-overview.png)


## Notes

* You should define only aggregates that you will use to avoid unnecessary calculations that may be noticeable on large data sets.

* If you try to use an aggregate that is not defined, you will get a `null` value.
* If you try to use an aggregate that is not compatible with `Field` type, a runtime error will occur.

* If you update a field of a model the `Data` collection in the view-model, aggregates will not be updated automatically - the grid needs to re-evaluate that data first, and since this is an expensive operation a UI render does not trigger it. You can [update the data collection](slug:grid-refresh-data) yourself, or fetching it anew from the service (example [here](slug:grid-editing-overview), see how the Create/Update/Delete events fetch data anew).

* If you [bind the Grid via `OnRead` event](slug:components/grid/manual-operations), make sure to set `AggregateResults` in the `GridReadEventArgs` event argument object. Otherwise the Grid will calculate aggregates from the data on the current page only.

<div class="skip-repl"></div>

````CS
private async Task OnGridRead(GridReadEventArgs args)
{
    DataSourceResult result = AllGridData.ToDataSourceResult(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults;
}
````


## See Also

* [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
* [Blazor Grid](slug:grid-overview)
