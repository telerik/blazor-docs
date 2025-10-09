---
title: How to Access GridSearchBox Value
description: Learn how to retrieve the GridSearchBox value in a GridToolBarTemplate in Telerik UI for Blazor.
type: how-to
page_title: Capturing GridSearchBox Input
meta_title: Capture GridSearchBox Input
slug: grid-kb-access-gridsearchbox-value
tags: toolbar, searchbox, datasource, filters, grid
res_type: kb
ticketid: 1693363
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

I need to capture the text entered in the [`GridSearchBox`](slug:grid-searchbox) within the `GridToolBarTemplate`.

## Solution

The `GridSearchBox` does not expose a direct `Value` property or provide two-way binding. It is integrated with the Grid's filtering system, automatically converting the search text into filters passed to the Grid. To capture the search text, extract it from the Grid [state](slug:grid-state). Follow these steps:

1. Use the [`OnStateChanged` event](slug:grid-state#onstatechanged) of the Grid to access the current filters.
2. Extract the search text from the component state.

Here is an example:

````Razor
@using Telerik.DataSource

<TelerikButton OnClick="@GetSearchValue">Get Search Value</TelerikButton>

<TelerikGrid @ref="GridRef"
             Data="@Employees"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             Pageable="true"
             OnStateChanged="@((GridStateEventArgs<Employee> args) => GridStateChanged(args))">
    <GridToolBar>
        <GridSearchBox Placeholder="Search by Name" />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<p>Current Search: @CurrentSearchValue</p>

@code {
    private TelerikGrid<Employee> GridRef { get; set; }
    private string CurrentSearchValue { get; set; } = string.Empty;

    private List<Employee> Employees { get; set; } = new();

    protected override void OnInitialized()
    {
        Employees = GenerateData();
    }

    private void GridStateChanged(GridStateEventArgs<Employee> args)
    {
        // Capture search value whenever the grid state changes
        CurrentSearchValue = ExtractSearchValue(args.GridState);
    }

    private void GetSearchValue()
    {
        // Or retrieve the current search value on demand
        var gridState = GridRef.GetState();
        CurrentSearchValue = ExtractSearchValue(gridState);
    }

    private string ExtractSearchValue(GridState<Employee> gridState)
    {
        return (gridState.SearchFilter as CompositeFilterDescriptor)?
            .FilterDescriptors.OfType<FilterDescriptor>()
            .FirstOrDefault()?.Value?.ToString() ?? string.Empty;
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
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
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
````

## See Also

* [Grid SearchBox](slug:grid-searchbox)
* [Grid State](slug:grid-state)
