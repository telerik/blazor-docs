---
title: Get Filtered Data from Grid
description: How to get the filtered and sorted data from the Blazor Grid
type: how-to
page_title: Get Filtered Data from Grid
slug: grid-kb-get-filtered-data
position: 
tags: 
ticketid: 1489807
res_type: kb
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

I want to obtain the filtered and sorted rows / items in the grid. This applies to filtering, sorting and the searchbox.

## Solution

Use the [Grid `OnRead` event]({%slug components/grid/manual-operations%}) to get the `DataSourceRequest` object that contains a collection of filter and sort descriptors, as well as information for the current page and its size.

You can then fetch the desired page of filtered and sorted data. This is the same concept as when implementing your own data source operations. You can read more about this in the linked [Manual Data Operations article]({%slug components/grid/manual-operations%}).

If you already have all the data in the view-model, the Telerik extension methods can help you get the data in a specific sorted and filtered state at any time - see [`.ToDataSourceResult()`]({%slug components/grid/manual-operations%}#telerik-todatasourceresultrequest).

>caption Example of how to get the filtered and sorted data of the Grid, including from the SearchBox

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@Employee"
             OnRead=@ReadItems
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true" Pageable="true">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@if (GridData != null && GridData.Any())
{
    <p>Search has @GridData.Count.ToString() items starting with item @GridData[0].ID
            and ending with item @GridData[GridData.Count - 1].ID</p>
}

@code {
    public List<Employee> SourceData { get; set; }
    public List<Employee> GridData { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;

        // get the filtered/sorted data on the current page only
        //GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();

        // get the filtered/sorted data on all pages
        // use a new DataSourceRequest OR reset args.Request.Page and args.Request.PageSize
        var allPagesRequest = new DataSourceRequest();
        allPagesRequest.Sorts = args.Request.Sorts;
        allPagesRequest.Filters = args.Request.Filters;
        // OR
        //args.Request.Page = 1;
        //args.Request.PageSize = SourceData.Count;

        var datasourceResultAllPages = SourceData.ToDataSourceResult(allPagesRequest);
        // OR
        //var datasourceResultAllPages = SourceData.ToDataSourceResult(args.Request);

        GridData = (datasourceResultAllPages.Data as IEnumerable<Employee>).ToList();
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 1; i <= 100; i++)
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

