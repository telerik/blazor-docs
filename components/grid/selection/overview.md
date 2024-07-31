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

The Grid component offers support for row and cell selection.

In this article:

* [Selection Type](#selection-type)
* [Selection Mode](#selection-mode)
* [Selection Options](#selection-options)
* [Selected Items](#selected-items)
* [Selection Events](#selection-events)
* [Selection and Other Grid Features](#selection-and-other-grid-features)

## Selection Type

You can configure to select rows or cells in the Grid. If you only set the [Grid `SelectionMode` parameter](#selection-mode), you will be able to select rows in the Grid. If you want to have a cell selection, you need to add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag and set the `SelectionType` parameter to the `Cell` member of the `Telerik.Blazor.GridSelectionType` enum.

## Selection Mode

You can configure the selection behavior by setting the Grid `SelectionMode` parameter to a member of the `Telerik.Blazor.GridSelectionMode` enum. The Grid supports the following selection modes:

* `None` (the default value) - To disable row or cell selection.
* `Single` - Only one row or cell can be selected at a time, so the last one will be the selected one.
* `Multiple` - You can select a single or multiple rows or cells.

## Selection Options

When you select a row or a cell, they will be highlighted to notify you that they are selected.

See [Rows Selection Options]({%slug components/grid/selection/rows%}#rows-selection-options) and [Cells Selection Options]({%slug components/grid/selection/cells%}#cells-selection-options) for more details.

## Selected Items

You can get and set the selected rows or cells.

See [Selected Rows]({%slug components/grid/selection/rows%}#selected-rows) and [Selected Cells]({%slug components/grid/selection/cells%}#selected-cells) for more details.

## Selection Events

To respond to the user action of selecting a new row use the [`SelectedItemsChanged` event]({%slug components/grid/selection/rows%}#selecteditemschanged).

To respond to the user action of selecting a new cell use the [`SelectedCellsChanged` event]({%slug components/grid/selection/cells%}#selectedcellschanged).

Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one. This means that if you want to use the `SelectedItemsChanged` event, you need to use one-way binding for the `SelectedItems` property. Otherwise, you can use two-way binding for the `SelectedItems` property without the `SelectedItemsChanged` event. The same applies for the `SelectedCells` and the `SelectedCellsChanged`.

## Selection and Other Grid Features

Check the selection behavior:
* In different [editing modes]({%slug components/grid/editing/overview%}).
* With [virtualization]({%slug components/grid/virtual-scrolling%}).
* When [paging]({%slug components/grid/features/paging%}).
* In [templates]({%slug components/grid/features/templates%}).
* During [drag and drop]({%slug grid-drag-drop-overview%}).

See [Rows Selection and Other Grid Features]({%slug components/grid/selection/rows%}#rows-selection-and-other-grid-features) and [Cells Selection and Other Grid Features]({%slug components/grid/selection/cells%}#cells-selection-and-other-grid-features) for more details.

## See Also

  * [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
  * [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
