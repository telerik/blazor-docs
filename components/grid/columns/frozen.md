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

The Grid lets you freeze (lock) one or more columns. This will allow the user to scroll horizontally through the Grid, but still be able to keep some important columns visible at all times (such as ID or command column).

To freeze a column:

1. Set its `Locked` parameter to `true`.
1. Set its `Width` parameter in pixels.

Frozen columns make sense when the Grid has a horizontal scrollbar. Horizontal scrolling requires all columns to have their `Width` set and the sum of all column widths exceeds the Grid `Width`. Read more at the [Grid Column Width Behavior](slug:grid-columns-width) article.

In some scenarios, the Grid `Width` must be set in absolute units like `px` or `vw`, otherwise [the Grid may expand horizontally](slug:grid-kb-flex-width-issue) and not render a horizontal scrollbar.

Column freezing includes the following cases:

* [Frozen first and last columns](#frozen-first-and-last-columns)
* [Frozen column in the middle of the Grid](#frozen-column-in-the-middle-of-the-grid)

## Frozen first and last columns

>caption Use static markup to Freeze the first and last columns in a Grid

<demo metaUrl="client/grid/columns-frozen-first-last/" height="600"></demo>

## Frozen column in the middle of the Grid

>caption Observe the behavior of a locked column that is neither first, nor last

<demo metaUrl="client/grid/columns-frozen-middle/" height="500"></demo>

## See also

* [Live demo: Frozen Columns](https://demos.telerik.com/blazor-ui/grid/frozen-columns)
* [Blazor Grid](slug:grid-overview)
