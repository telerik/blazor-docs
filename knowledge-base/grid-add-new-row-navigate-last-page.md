---
title: Add a New Grid Row and Navigate to the Last Page
description: Learn how to add a new row to the Grid for Blazor using an external button and navigate to the last page where the new row is inserted.
type: how-to
page_title: Programmatically Add New Rows and Navigate to the Last Page in Telerik Blazor Grid
slug: grid-add-new-row-navigate-last-page
tags: grid, blazor, add, row, navigate, page, programmatically, last
res_type: kb
ticketid: 1667656
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

I want to programmatically add a new row to the Grid at the end of the data and navigate to the last page to view the added row.

## Solution

To add a new row at the end of the Grid and navigate to the last page:
1. Add an external button that triggers the addition of a new item to your data collection.
2. Calculate the page number required to display the newly added item (based on the total number of items and the page size).
3. Programmatically set the Grid's page to the calculated page number to navigate to the last page.

Below is an example demonstrating this approach:

````RAZOR
@* Add/remove employee to see how the Grid reacts to that change. *@

<TelerikButton OnClick="@AddEmployee">Add employee</TelerikButton>

<TelerikButton OnClick="@RemoveEmployee">Remove last employee</TelerikButton>

<TelerikGrid Data="@MyData"
             Height="400px"
             Pageable="true"
             Sortable="true"
             Page="@currentPage"
             PageSize="@pageSize">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private int currentPage = 1;
    private int pageSize = 10;

    private void AddEmployee()
    {
        var x = MyData.Count + 1;
        MyData.Add(new SampleData
            {
                Id = x,
                Name = "name " + x,
                Team = "team " + x % 5,
                HireDate = DateTime.Now.AddDays(-x).Date
            });
        MyData = new List<SampleData>(MyData);

        currentPage = (int)Math.Ceiling((double)MyData.Count / pageSize);
    }

    private void RemoveEmployee()
    {
        if (MyData.Count > 0)
        {
            MyData.RemoveAt(MyData.Count - 1);
            MyData = new List<SampleData>(MyData);
        }
    }

    private List<SampleData> MyData = Enumerable.Range(1, 5).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

- [Grid Overview](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [Grid Paging](https://docs.telerik.com/blazor-ui/components/grid/paging)
