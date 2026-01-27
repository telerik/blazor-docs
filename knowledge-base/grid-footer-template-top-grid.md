---
title: Footer Template at the Top of the Grid
description: Learn how to position the FooterTemplate of the Telerik Blazor Grid to appear at the top of the grid.
type: how-to
page_title: How to Relocate the FooterTemplate to the Top in Telerik Blazor Grid
slug: grid-footer-template-top-grid
tags: grid, blazor, footer, template, css, styling, top
res_type: kb
ticketid: 1668460
components: ["grid"]
---
## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Grid for Blazor</td>
	    </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

- How to move the Footer Template to the top of the Grid?
- How can I display the aggregate results at the top of the Grid in Blazor?

## Solution

To reposition the `FooterTemplate` to appear at the top of the Grid, apply custom CSS for positioning. This involves using CSS to position the footer at the top of the grid and adding padding to the grid header to accommodate the footer's new position.

````RAZOR
<style>
    .k-grid .k-grid-footer {
        position: absolute;
        border-bottom-width: 1px;
        border-bottom-color: rgba(0, 0, 0, 0.08);
    }

    .k-grid .k-grid-header {
        padding-top: 60px;
    }
</style>

<TelerikGrid Data=@GridData Pageable="true" Height="300px">
    <GridAggregates>
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Sum" />
        <GridAggregate Field=@nameof(Employee.EmployeeId) Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Salary) Title="Salary">
            <FooterTemplate>
                Total salaries: @context.Sum?.ToString("C0")
                <br />
                Highest salary: @context.Max?.ToString("C0")
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Name)>
            <FooterTemplate>
                @{
                    int? headCount = (int?)context?.AggregateResults
                    .FirstOrDefault(r => r.AggregateMethodName == "Count" && r.Member == nameof(Employee.EmployeeId))?.Value;
                }
                Total employees: @headCount
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; }

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
                    Salary = rnd.Next(1000, 5000),
                });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }
}
````

## See Also

- [Grid Overview](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [Grid Footer Template](https://docs.telerik.com/blazor-ui/components/grid/templates/column-footer)
