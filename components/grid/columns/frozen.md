---
title: Frozen (Locked)
page_title: Grid - Frozen Columns
description: How to freeze grid columns so they are always visible in a scrollable grid.
slug: grid-columns-frozen
tags: telerik,blazor,grid,column,freeze,frozen
published: true
position: 40
components: ["grid"]
---

# Frozen Columns

The Grid lets you freeze one or more columns. This will allow the user to scroll horizontally through the Grid, but still be able to keep some important columns visible at all times (such as ID or command column).

To enable the column freezing, set the `Locked` parameter of the column to `true`.

If the column you want to freeze is not the first in the list, the grid must be scrollable. This requires that there are enough columns with their `Width` set so that the grid has a horizontal scrollbar (the sum of the Widths of the columns exceeds the Width of the grid). You can read more about the scrolling behavior of the grid in the [Grid Column Width Behavior](slug:grid-columns-width) article.

This article you can observe Freezing different columns. The examples are separated into types for clarity:
* [Frozen first and last columns](#frozen-first-and-last-columns)
* [Frozen column in the middle of the Grid](#frozen-column-in-the-middle-of-the-grid)

## Frozen first and last columns

>caption Use static markup to Freeze the first and last columns in a Grid

<demo metaUrl="client/grid/columns-frozen-first-last/"></demo>

## Frozen column in the middle of the Grid

>caption Observe the behavior of a locked column that is neither first, nor last

<demo metaUrl="client/grid/columns-frozen-middle/"></demo>

## Limitations

The frozen columns pose some requirements:

* The `Width` of the Grid **must** be set in `px` units.

* When a column is frozen (it has `Locked="true"`), its `Width` **must** be in `px` units.

## See also

* [Live demo: Frozen Columns](https://demos.telerik.com/blazor-ui/grid/frozen-columns)
* [Blazor Grid](slug:grid-overview)
