---
title: Overview
page_title: Grid - Selection Overview
description: Selection basics in the Grid for Blazor.
slug: components/grid/selection/overview
tags: telerik,blazor,grid,selection,overview
published: True
position: 0
---

# Grid Selection

The Grid component supports row and cell selection. This article provides an overview of the Grid selection behavior and configuration:

* [Selection Type](#selection-type)
* [Selection Mode](#selection-mode)
* [Selection Options](#selection-options)
* [Selected Items](#selected-items)
* [Selection Events](#selection-events)
* [Selection and Other Grid Features](#selection-and-other-grid-features)

## Selection Type

You can configure the Grid either for row or cell selection:
* To allow row selection:
  * Set the [Grid `SelectionMode` parameter](#selection-mode) or
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to the `Row` member of the `Telerik.Blazor.GridSelectionType` enum
* To allow cell selection:
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to the `Cell` member of the `Telerik.Blazor.GridSelectionType` enum

## Selection Mode

You can configure the selection behavior by setting the Grid `SelectionMode` parameter to a member of the `Telerik.Blazor.GridSelectionMode` enum. The Grid supports the following selection modes:

* `None` (the default value)—To disable row or cell selection.
* `Single`—Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection will be retained.
* `Multiple`—Allows the user to select multiple rows or cells at a time.

## Selection Options

When you select a row or a cell, they will be highlighted to notify you that they are selected. By default you can click on a row or on a cell to select it. You can also select a row through a checkbox column. To select multiple rows or cells, use the `Ctrl` or `Shift` key to extend the selection.

See [Rows Selection Options]({%slug components/grid/selection/rows%}#rows-selection-options) and [Cells Selection Options]({%slug components/grid/selection/cells%}#cells-selection-options) for more details.

## Selected Items

You can get and set the selected rows or cells:
* To access the selected rows add the Grid `SelectedItems` parameter.
* To access the selected cells add the Grid `SelectedCells` parameter.

Both parameters are collections. You can use the parameters to manipulate the selected rows or cells. You can also use the parameters to pre-select a row or cell for your users.

See [Selected Rows]({%slug components/grid/selection/rows%}#selected-rows) and [Selected Cells]({%slug components/grid/selection/cells%}#selected-cells) for more details.

## Selection Events

You can respond to the user action of selecting a new item through the Grid events:
* Use the [`SelectedItemsChanged` event]({%slug components/grid/selection/rows%}#selecteditemschanged) to respond to row selection.
* Use the [`SelectedCellsChanged` event]({%slug components/grid/selection/cells%}#selectedcellschanged) to respond to cell selection.

> Both binding to the property and using its event cannot be used at the same time as Blazor allows only one. To use the `SelectedItemsChanged` event, utilize one-way binding for the `SelectedItems` property. Otherwise, use two-way binding for the `SelectedItems` property without the `SelectedItemsChanged` event. The same applies to the `SelectedCells` and the `SelectedCellsChanged`.

## Selection and Other Grid Features

The selection feature behavior may vary when the Grid configuration combines row or cell selection and:
* The [Grid editing feature]({%slug components/grid/editing/overview%}).
* The [Grid virtualization feature]({%slug components/grid/virtual-scrolling%}).
* The [Grid paging feature]({%slug components/grid/features/paging%}).
* The [Grid templates feature]({%slug components/grid/features/templates%}).
* The [Grid drag and drop feature]({%slug grid-drag-drop-overview%}).

There are some limitations or additional modifications that are needed in such cases.

See [Rows Selection and Other Grid Features]({%slug components/grid/selection/rows%}#rows-selection-and-other-grid-features) and [Cells Selection and Other Grid Features]({%slug components/grid/selection/cells%}#cells-selection-and-other-grid-features) for more details.

## See Also

  * [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
  * [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
