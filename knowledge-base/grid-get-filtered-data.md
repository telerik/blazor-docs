---
title: Get Filtered Data from Grid
description: How to get the filtered and sorted data from the blazor grid
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

Use the `OnRead` event of the grid to get the `DataSourceRequest` object that contains a collection of filter and sort descriptors, as well as information for the current page and its size. 

You can then use that to fetch the desired page of data and you will have that information. This is the concept behind implementing your own data source operations so you can optimize them. You can read more about this [here]({%slug components/grid/manual-operations%}).

If you already have all the data in the view-model, the Telerik extension methods can help you apply those operations - see `.ToDataSourceResult()` - an example is available below and in the article linked above.

>caption Example of how to get the filtered and sorted data for the current page of the grid, including from the searchbox

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems
             FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true>
    <GridToolBar>
        <GridSearchBox />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@if (GridData != null && GridData.Any())
{
    <p>Search has items starting with item @GridData[0].ID and ending with item @GridData[GridData.Count - 1].ID</p>
}

@code {
    public List<Employee> SourceData { get; set; }
    public List<Employee> GridData { get; set; }
    public int Total { get; set; } = 0;

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
        Total = datasourceResult.Total;

        //the GridData variable now holds the currently filtered/sorted data from the grid

        StateHasChanged();
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

