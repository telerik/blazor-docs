---
title: Frozen (Locked)
page_title: Grid - Frozen Columns
description: Learn how to freeze Telerik UI for Blazor Grid columns so important data remains visible while users scroll horizontally.
slug: grid-columns-frozen
tags: telerik,blazor,grid,column,freeze,frozen
published: true
position: 40
components: ["grid"]
---

# Frozen Columns

The Grid lets you freeze (lock) one or more columns. This allows users to scroll horizontally through the Grid while keeping important columns, such as an ID or command column, visible.

To freeze a column:

1. Set its `Locked` parameter to `true`.
1. Set its `Width` parameter in pixels.

Frozen columns make sense when the Grid has a horizontal scrollbar. Horizontal scrolling requires all columns to have their `Width` set and the sum of all column widths exceeds the Grid `Width`. Read more at the [Grid Column Width Behavior](slug:grid-columns-width) article.

In some scenarios, the Grid `Width` must be set in absolute units like `px` or `vw`, otherwise [the Grid may expand horizontally](slug:grid-kb-flex-width-issue) and not render a horizontal scrollbar.

Column freezing includes the following cases:

* [Freezing the First and Last Columns](#freezing-the-first-and-last-columns)
* [Freezing a Column in the Middle of the Grid](#freezing-a-column-in-the-middle-of-the-grid)

## Freezing the First and Last Columns

>caption Use static markup to freeze the first and last columns in a Grid

<demo metaUrl="client/grid/columns-frozen-first-last/" height="600"></demo>

## Freezing a Column in the Middle of the Grid

>caption Observe the behavior of a locked column that is neither first, nor last

<demo metaUrl="client/grid/columns-frozen-middle/" height="500"></demo>

## See Also

* [Live demo: Frozen Columns](https://demos.telerik.com/blazor-ui/grid/frozen-columns)
* [Blazor Grid](slug:grid-overview)
