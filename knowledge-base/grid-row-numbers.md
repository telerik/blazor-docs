---
title: Row Numbers
description: How to add sequential row numbers in the grid rows
type: how-to
page_title: Row numbers in the grid
slug: grid-kb-row-numbers
position: 
tags: 
ticketid: 1515643
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
Is there a way to add row numbers to the grid? 

I want them to update every time the grid changes, so whenever I filter it or sort it. So basically if it's sorted by date ascending, the rows start at 1 and increase as you travel down the grid.  If you then sort descending, the row numbers will again start at 1 and increase as you travel down the grid.

## Solution
Add a field to the row model that will display the row index, and populate the index in the `OnRead` event by iterating the collection.

You can then use a regular grid column to show them in the beginning of the grid. This column should have the various data operations disabled (such as filtering, sorting, grouping, editing) because it does not carry actual information about the data.

In the general case, that logic would be done by the backend, this sample keeps all the operations in one place for brevity.

>caption Add row numbers to the grid that start from 1 and are always present

````CSHTML
@using Telerik.DataSource.Extensions

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems
             FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true 
             Reorderable="true" Resizable="true" SelectionMode="@GridSelectionMode.Multiple">
    <GridColumns>
    
        <GridColumn Field="@nameof(Employee.RowIndex)" Title="#" Width="40px" Sortable="false" Filterable="false" Groupable="false" Editable="false" />
        
        <GridColumn Field=@nameof(Employee.ID) Editable="false" Filterable="false"/>
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> SourceData { get; set; } // in a real case that's a remote data source, it is here for brevity
    public List<Employee> GridData { get; set; }
    public int Total { get; set; } = 0;

    protected async Task ReadItems(GridReadEventArgs args)
    {
        // in a real case, the remote data source will hande the data shaping, this is here for brevity
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        // start row index setup
        List<Employee> iteratableData = datasourceResult.Data.Cast<Employee>().ToList();
        for (int i = 0; i < iteratableData.Count; i++)
        {
            iteratableData[i].RowIndex = i + 1; // we add one for human readabale 1-based index
        }
        datasourceResult.Data = iteratableData;

        // end row index setup

        // in a real case you receive the data here and use it as-is
        GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
        Total = datasourceResult.Total;

        StateHasChanged();
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
                ID = Guid.NewGuid(),
                Name = "Name " + i,
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        //this field will contain the row index for display purposes
        public int RowIndex { get; set; }
    }
}
````

