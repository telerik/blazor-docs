---
title: Center Grid Column Header content
description: How to center the content of the Grid Column Header?
type: how-to
page_title: Center Grid Column Header content
slug: grid-kb-center-column-header-content
position: 
tags: telerik, blazor, grid, column, header, center
ticketid: 
res_type: kb
---

# Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to center the content of the Grid column header. How to achieve it?


## Solution

In order to center the content of the Grid column headers you can use some custom CSS as per the example below.

>caption Grid with centered column header content. The result from the snippet

![Grid with centered column header content](images/grid-centered-column-header-content.png)

````CSHTML
@* Grid with centered column header content *@

<style>
    .centered-header-grid .k-cell-inner > .k-link {
        justify-content: center;
    }
</style>

<TelerikGrid Class="centered-header-grid"
             Data="@MyData" Height="400px"
             Pageable="true" Sortable="true"
             FilterMode="GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px"/>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name"/>
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

* If you need to wrap the column header content as well, you can try the approach from this knowledge base article - [Wrap and center the Grid Column Header text]({%slug grid-kb-wrap-and-center-column-header-text%}). It shows how to change the default display property of the header cells to `block` and then easily operate with their content to wrap and center it.

* If you want full control over the header text contents and rendering, you can use the [column header template]({%slug grid-templates-column-header%}).
