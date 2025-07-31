---
title: How to Access GridSearchBox Value
description: Learn how to retrieve the GridSearchBox value in a GridToolBarTemplate in Telerik UI for Blazor.
type: how-to
page_title: Capturing GridSearchBox Input
meta_title: Capturing GridSearchBox Input
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

The `GridSearchBox` does not expose a direct `Value` property or provide two-way binding. It is integrated with the Grid's filtering system, automatically converting the search text into filters passed to the Grid. To capture the search text, extract it from the `DataSourceRequest.Filters` during the [`OnRead` event](slug:components/grid/manual-operations) processing. Follow these steps:

1. Use the `OnRead` event of the Grid to access the current filters.
2. Extract the search text from `DataSourceRequest.Filters`.

Here is an example:

````Razor
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

@( new MarkupString(output) )

<br />
<TelerikButton OnClick="@GetFilters">Get Filters</TelerikButton>

<TelerikGrid TItem="@Employee" OnRead="@ReadItems"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true" Pageable="true">
    <GridToolBar>
        <GridSearchBox Placeholder="Search by Name" />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> SourceData { get; set; }
    private string output { get; set; }
    private DataSourceRequest CurrentRequest { get; set; }

    private void GetFilters()
    {
        output = string.Empty;

        foreach (var item in CurrentRequest.Filters)
        {
            if (item is FilterDescriptor) // filter row
            {
                FilterDescriptor currFilter = item as FilterDescriptor;
                output += $"field: {currFilter.Member}, operator {currFilter.Operator}, value: {currFilter.Value}<br />";
            }

            if (item is CompositeFilterDescriptor) // filter menu
            {
                CompositeFilterDescriptor currFilter = item as CompositeFilterDescriptor;
                output += $"START nested filter: logical operator: {currFilter.LogicalOperator}, details:<br />";
                
                foreach (FilterDescriptor nestedFilter in currFilter.FilterDescriptors)
                {

                    output += $"field: {nestedFilter.Member}, operator {nestedFilter.Operator}, value: {nestedFilter.Value}<br />";
                }
                output += "END nested filter<br />";
            }
        }
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        CurrentRequest = args.Request; //store the current request for later use

        await Task.Delay(1000); //simulate network delay from a real async call

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
* [Grid OnRead](slug:components/grid/manual-operations)
