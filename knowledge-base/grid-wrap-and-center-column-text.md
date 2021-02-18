---
title: How to wrap and center the Grid column header text
description: How to wrap and center the Grid column header text
type: how-to
page_title: How to wrap and center the Grid column header text
slug: grid-kb-wrap-and-center-column-header-text
position: 
tags: 
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
    .k-grid .k-grid-header th .k-cell-inner,
    .k-grid .k-grid-header th .k-cell-inner > .k-link {
        display: block; /*defaults to flex which makes aligning text harder in it*/
        text-align: center;
        white-space: normal;
    }

    .k-column-title {
        white-space: normal;
    }
</style>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
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

## Notes

* If you want full control over the header text contents and rendering, you can use the [column header template]({%slug grid-templates-column-header%}).

