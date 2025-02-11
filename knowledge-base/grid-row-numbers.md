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
Add a property to the row model that will display the row index. Populate the index in the [Grid `OnRead` event](slug:components/grid/manual-operations) by iterating the items collection.

You can then use a Grid column to show them. This column should have the various data operations disabled (such as filtering, sorting, grouping, editing) because it does not carry actual information about the data.

In the general case, that logic would be done by the backend, this sample keeps all the operations in one place for brevity.

>caption Add row numbers to the grid that start from 1 and are always present

````RAZOR
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@Employee" OnRead="@ReadItems"
             FilterMode=@GridFilterMode.FilterRow Sortable="true" Pageable="true"
             Reorderable="true" Resizable="true" SelectionMode="@GridSelectionMode.Multiple">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.RowIndex)" Title="#" Width="50px"
                    Sortable="false" Filterable="false" Groupable="false" Editable="false" />
        <GridColumn Field=@nameof(Employee.ID) Editable="false" Filterable="false" />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> SourceData { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        // start row index setup
        List<Employee> iteratableData = datasourceResult.Data.Cast<Employee>().ToList();
        for (int i = 0; i < iteratableData.Count; i++)
        {
            // OR Take paging into account...
            iteratableData[i].RowIndex = i + 1 + (args.Request.Page - 1) * args.Request.PageSize;

            // ...OR start numbering on each page from 1.
            //iteratableData[i].RowIndex = i + 1; // we add one for human readabale 1-based index
        }
        datasourceResult.Data = iteratableData;
        // end row index setup

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
        for (int i = 1; i <= 100; i++)
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
        //this property will contain the row index for display purposes
        public int RowIndex { get; set; }
    }
}
````
