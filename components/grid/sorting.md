---
title: Sorting
page_title: Grid - Sorting
description: Enable and configure sorting in Grid for Blazor.
slug: components/grid/features/sorting
tags: telerik,blazor,grid,sorting
published: True
position: 21
---

# Grid Sorting

The Grid component offers support for sorting.

In this article:

* [Basics](#basics)
* [Sort From Code](#sort-from-code)


## Basics

To enable sorting, set the grid's `Sortable` property to `true`.

When the user clicks the column header, the grid will sort the data according to the column's data type, and an arrow indicator of the sorting direction will be shown next to the column title.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

>caption Enable Sorting in Telerik Grid

````CSHTML
Click a column header to sort by its data

<TelerikGrid Data="@MyData" Sortable="true" Height="500px">
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
	</GridColumns>
</TelerikGrid>

@code {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
````

>caption The result from the code snippet above, after the user clicked on the "Employee Name" header to sort

![](images/basic-sorting.png)

You can sort this grid on the different columns to see the results. The `Name` column is a string, and sorting is done according to the rules for strings, while the `ID` column sorts acording to rules for integers.

## Sort From Code

You can sort the grid from your own code through its [state]({%slug grid-state%}).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set sorting programmatically

````CSHTML
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````

## See Also

  * [Live Demo: Grid Sorting](https://demos.telerik.com/blazor-ui/grid/sorting)
   
