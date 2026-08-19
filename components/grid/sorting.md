---
title: Sorting
page_title: Grid - Sorting
description: Enable and configure sorting in Grid for Blazor.
slug: components/grid/features/sorting
tags: telerik,blazor,grid,sorting
published: True
position: 21
components: ["grid"]
---

# Grid Sorting

The Telerik Blazor Grid component supports single and multiple column sorting.

In this article:

* [Basics](#basics)
* [Sort From Code](#sort-from-code)
* [More Examples](#more-examples)


## Basics

To enable sorting, set the Grid `Sortable` property to `true`.

When the user clicks a column header, the Grid sorts the data according to the column's data type, and an arrow indicates the sorting direction next to the column title.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

>caption Enable Sorting in the Telerik Blazor Grid

<demo metaUrl="client/grid/sorting/"/></demo>

### Multi Column Sorting

To allow sorting on more than one column at a time, set the Grid `SortMode` parameter to `Telerik.Blazor.SortMode.Multiple`. After the user sorts by several columns, the Grid shows numbers in the column headers that indicate the sorting priority.

>caption Enable multi column Grid sorting

<demo metaUrl="client/grid/sorting-multiple/"/></demo>

## Sort From Code

You can sort the grid from your own code through its [state](slug:grid-state).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set sorting programmatically

````RAZOR
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````

## More Examples

The following articles and sample projects can be helpful when implementing sorting:

* [Capture Sorted event](slug:grid-state#onstatechanged) - the grid state lets you know when it changes so you can capture different aspects of the change

* [Server Sorting](slug:components/grid/manual-operations) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

## See Also

* [Live Demo: Grid Sorting](https://demos.telerik.com/blazor-ui/grid/sorting)
* [Blazor Grid](slug:grid-overview)
