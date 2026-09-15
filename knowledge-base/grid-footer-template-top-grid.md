---
title: Footer Template at the Top of the Grid
description: Learn how to position the FooterTemplate of the Telerik Blazor Grid to appear at the top of the grid.
type: how-to
page_title: How to Relocate the FooterTemplate to the Top in Telerik Blazor Grid
slug: grid-footer-template-top-grid
tags: grid, blazor, footer, template, css, styling, top
res_type: kb
ticketid: 1668460, 1718855
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

* How to move the Footer Template to the top of the Grid?
* How can I display the aggregate results at the top of the Grid in Blazor?

## Solution

To reposition the `FooterTemplate` to appear at the top of the Grid, apply custom CSS for positioning. This involves using CSS to position the footer at the top of the grid and adding padding to the Grid header to accommodate the footer's new position.

````RAZOR
<style>
    .k-grid .k-grid-footer {
        position: absolute;
        border-bottom-width: 1px;
        border-bottom-color: var(--kendo-color-border);

        /* required by horizontal Grid scrolling scenarios */
        left: 0;
        right: 0;
    }

    .k-grid .k-grid-header {
        padding-top: 72px; /* depends on the footer height and top header padding */
    }
</style>

<TelerikGrid Data="@GridData" Pageable="true" Height="400px">
    <GridAggregates>
        <GridAggregate Field="@nameof(Employee.Name)" Aggregate="@GridAggregateType.Count" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Sum" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field="@nameof(Employee.Name)">
            <FooterTemplate>
                Count: @context.Count
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.Salary)">
            <FooterTemplate>
                Sum: @context.Sum?.ToString("C2")
                <br />
                Max: @context.Max?.ToString("C2")
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();

        for (int i = 1; i <= 15; i++)
        {
            Random rnd = new Random();
            GridData.Add(new Employee()
                {
                    Id = i,
                    Name = $"Employee {i}",
                    Salary = Random.Shared.Next(1000, 5000) * 1.23m,
                });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }
}
````

## See Also

* [Grid Overview](https://docs.telerik.com/blazor-ui/components/grid/overview)
* [Grid Footer Template](https://docs.telerik.com/blazor-ui/components/grid/templates/column-footer)
