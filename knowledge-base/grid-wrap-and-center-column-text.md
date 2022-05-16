---
title: Wrap and center the Grid Column Header text
description: How to wrap and center the Grid Column Header text
type: how-to
page_title: How to wrap and center the Grid Column Header text
slug: grid-kb-wrap-and-center-column-header-text
position: 
tags: telerik, blazor, grid, column, header, wrap, center
ticketid: 1507250
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
Could you please tell me how I can have the GridColumn title text wrap around and be centered?

## Solution

You can use some custom CSS that aligns text in the center and enables text wrapping as per the example below:

````CSHTML
@* You can also use the Class parameter of the grid to cascade these rules through a selector so it only affects certain grid instances and not all grids on your app *@

<style>
    .k-grid th.k-header {
        justify-content: center;
    }

    .k-grid .k-link .k-column-title {
        white-space: normal;
        text-align: center;
    }
</style>

<TelerikGrid Data="@MyData"
             Groupable="true" ShowColumnMenu="true" Resizable="true" Reorderable="true"
             PageSize="5"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Width="120px" Title="Employee Name" Groupable="false" />
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

## Notes

* If you only need to center the header text content, you can try the approach demonstrated in this knowledge base article - [Center Grid Column Header content]({%slug grid-kb-center-column-header-content%}). This will keep the preset `display: flex` style of the cells.

* If you want full control over the header text contents and rendering, you can use the [column header template]({%slug grid-templates-column-header%}).
