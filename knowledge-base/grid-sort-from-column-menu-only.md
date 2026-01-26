---
title: Sort Grid from ColumnMenu only (no click in the Column Header).
description: How can I let user sort Grid from the ColumnMenu only without click in the Column Header?
type: how-to
page_title: Sort Grid from ColumnMenu only (no click in the Column Header).
slug: grid-kb-sort-from-column-menu-only
position: 
tags: grid, column, menu, sort, only
ticketid: 1552190
res_type: kb
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

I use the Grid [ColumnMenu](slug:grid-column-menu) which provides sorting functionality. By default, click in the column header also triggers the sorting (if enabled). I want to allow the user only sort from the ColumnMenu and prevent sorting the column on click in its header.

How to disable the built-in sorting on column header click?

## Solution

To prevent the user from sorting on a column header click, use custom CSS - disable the pointer events of the header element. Make sure you target just the span and not the ColumnMenu button - if you stop the pointer events of the whole cell, the user will not be able to open the menu.

The sample below demonstrates the described approach.

````RAZOR
@* No sort on column header click *@

<style>
    .my-grid .k-header .k-cell-inner .k-link{
        pointer-events:none;
    }
</style>

<TelerikGrid Data="@MyData"
             Pageable="true"
             PageSize="5"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             ShowColumnMenu="true"
             Class="my-grid">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
