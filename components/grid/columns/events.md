---
title: Column Events
page_title: Grid - Column Events
description: Handle Telerik UI for Blazor Grid column events and use OnCellRender to customize cell appearance based on data.
slug: grid-column-events
tags: telerik,blazor,grid,column,columns,events
published: True
position: 100
components: ["grid"]
---

# Grid Column Events

This article explains the events available for the columns of the Telerik Grid for Blazor.

* [Handling Cell Rendering](#handling-cell-rendering)

## Handling Cell Rendering

This event fires when the Grid renders its columns. It receives an argument of type `GridCellRenderEventArgs`, which exposes the following fields:

* `Item`&mdash;an object that you can cast to your model class to obtain the current data item.
* `Value`&mdash;an object that contains the value rendered in the Grid cell. You can cast it to its data type, for example, a `string`, `DateTime`, or number.
* `Class`&mdash;the CSS class applied to the cells. The CSS rules set for that class are rendered on the Grid cells.

>caption Use the OnCellRender event to apply custom formatting to Grid cells based on certain values

<demo metaUrl="client/grid/columns-cell-render/" height="500"></demo>

>tip You can also pass lambda expressions to the `OnCellRender` parameter. This lets you provide additional metadata, such as a column title, to the `OnCellRender` handler in addition to the `GridCellRenderEventArgs` argument it receives by default.

>caption Use the OnCellRender event to apply custom formatting to Grid cells based on a cell value and column name

<demo metaUrl="client/grid/columns-cell-render-lambda/" height="500"></demo>

## See Also

* [Grid Events](slug:grid-events)
* [Manual Data Source Operations](slug:components/grid/manual-operations)
* [Blazor Grid](slug:grid-overview)
