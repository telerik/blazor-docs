---
title: Change Filtered Columns Color in Grid for Blazor
description: Learn how to change the background color of filtered columns in the Telerik Grid for Blazor for better visibility using CSS.
type: how-to
page_title: How to Style Filtered Columns in Telerik Grid for Blazor
slug: grid-kb-style-filtered-columns
tags: grid, blazor, styling, filtering, css, oncellrender, onstatechanged
res_type: kb
ticketid: 1672604
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
- How to apply custom styles to filtered columns in a Blazor Grid?
- How to enhance the visibility of filtered columns in Blazor Grid using CSS?

## Solution

To style filtered columns in a Telerik Grid for Blazor: 
1. Utilize the [`OnCellRender`]({%slug grid-column-events%}#oncellrender) and [`OnStateChanged`]({%slug grid-state%}#onstatechanged) events 
2. Apply a custom CSS class to the filtered column when a filter is active

>caption Grid with styled filtered column.

`````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<style>
    .highlighted-column {
        background-color: rgba(255, 0, 0, 0.2); /* Change to your desired RGBA */
        color: #191970;
    }
</style>

<TelerikGrid TItem="@Employee" 
             OnRead="@ReadItems"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true" 
             Pageable="true" 
             OnStateChanged="@OnGridStateChanged">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.ID)" Filterable="false" Title="ID" />
        <GridColumn Field="@nameof(Employee.Name)" OnCellRender="@OnNameColumnCellRender" Title="Name" />
        <GridColumn Field="@nameof(Employee.HireDate)" OnCellRender="@OnHireDateColumnCellRender" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> SourceData { get; set; }
    private string FilteredColumn { get; set; }

    private void OnNameColumnCellRender(GridCellRenderEventArgs args)
    {
        if (FilteredColumn == nameof(Employee.Name))
        {
            args.Class = "highlighted-column"; // Apply the custom CSS class
        }
    }

    private void OnHireDateColumnCellRender(GridCellRenderEventArgs args)
    {
        if (FilteredColumn == nameof(Employee.HireDate))
        {
            args.Class = "highlighted-column"; // Apply the custom CSS class
        }
    }

    private async Task OnGridStateChanged(GridStateEventArgs<Employee> args)
    {
        if (args.PropertyName == "FilterDescriptors")
        {
            if (args.GridState.FilterDescriptors.Any())
            {
                var filterDescriptors = new List<IFilterDescriptor>(args.GridState.FilterDescriptors);
                var filterDescriptor = filterDescriptors[0] as CompositeFilterDescriptor;
                var filteredColumn = filterDescriptor.FilterDescriptors[0] as FilterDescriptor;

                // Capture the filtered column's field name
                FilteredColumn = filteredColumn.Member;
            }
            else
            {
                FilteredColumn = null; // Reset when no filters are applied
            }

            StateHasChanged(); // Re-render the grid
        }
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        // Simulate network delay
        await Task.Delay(100);

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
            {
                ID = i,
                Name = "Name " + i,
                HireDate = DateTime.Today.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
`````
## See Also

- [Grid Columns](https://docs.telerik.com/blazor-ui/components/grid/columns/bound)
- [OnCellRender Event](https://docs.telerik.com/blazor-ui/components/grid/columns/events)
- [OnStateChanged Event](https://docs.telerik.com/blazor-ui/components/grid/state#onstatechanged)
- [Override the Theme or Apply Custom CSS Styles]({%slug themes-override%})
