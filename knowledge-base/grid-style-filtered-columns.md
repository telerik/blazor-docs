---
title: Change Filtered Columns Color in Grid for Blazor
description: Learn how to change the background color of filtered columns in the Telerik Grid for Blazor for better visibility using CSS.
type: how-to
page_title: How to Style Filtered Columns in Telerik Grid for Blazor
slug: grid-kb-style-filtered-columns
tags: grid, blazor, styling, filtering, css, oncellrender, onstatechanged
res_type: kb
ticketid: 1672604
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

I want to style filtered columns in the Grid for Blazor using RGBA for better visibility. Specifically, when a filter is applied, I want the background color of column cells to change.

This knowledge base article answers the following questions:

* How to apply custom styles to filtered columns in a Blazor Grid?
* How to enhance the visibility of filtered columns in Blazor Grid using CSS?

## Solution

To style filtered columns in a Telerik Grid for Blazor: 

1. Use the [`OnCellRender`](slug:grid-column-events#oncellrender) and [`OnStateChanged`](slug:grid-state#onstatechanged) events.
2. Apply a custom CSS class to the filtered columns when a filter is active. The CSS class will be rendered on each cell from these columns.

>caption Grid with styled filtered column.

`````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@Employee"
             FilterMode="@GridFilterMode.FilterRow"
             OnStateChanged="@OnGridStateChanged"
             Pageable="true"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.ID)"
                    OnCellRender="@( (GridCellRenderEventArgs args) => OnGridCellRender(args, nameof(Employee.ID)) )"/>
        <GridColumn Field="@nameof(Employee.Name)"
                    OnCellRender="@( (GridCellRenderEventArgs args) => OnGridCellRender(args, nameof(Employee.Name)) )" />
        <GridColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C0}"
                    OnCellRender="@( (GridCellRenderEventArgs args) => OnGridCellRender(args, nameof(Employee.Salary)) )" />
    </GridColumns>
</TelerikGrid>

<style>
    .highlighted-column {
        background-color: rgba(0,0,0, 0.04);
        color: var(--kendo-color-primary);
    }
</style>

@code {
    private List<Employee> GridData { get; set; } = new();
    private List<string> FilteredColumns { get; set; } = new();

    private void OnGridCellRender(GridCellRenderEventArgs args, string field)
    {
        if (FilteredColumns.Contains(field))
        {
            args.Class = "highlighted-column";
        }
    }

    private void OnGridStateChanged(GridStateEventArgs<Employee> args)
    {
        if (args.PropertyName == "FilterDescriptors")
        {
            FilteredColumns = new();

            foreach (CompositeFilterDescriptor cfd in args.GridState.FilterDescriptors)
            {
                FilterDescriptor fd = (FilterDescriptor)cfd.FilterDescriptors.First();

                FilteredColumns.Add(fd.Member);
            }
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new Employee()
            {
                ID = i,
                Name = $"Employee Name {i}",
                Salary = Random.Shared.Next(1000, 10000)
            });
        }
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }
}
`````
## See Also

* [Grid Columns](https://docs.telerik.com/blazor-ui/components/grid/columns/bound)
* [OnCellRender Event](https://docs.telerik.com/blazor-ui/components/grid/columns/events)
* [OnStateChanged Event](https://docs.telerik.com/blazor-ui/components/grid/state#onstatechanged)
* [Override the Theme or Apply Custom CSS Styles](slug:themes-override)
