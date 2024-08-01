---
title: Overview
page_title: Grid - Selection Overview
description: Selection basics in the Grid for Blazor.
slug: grid-selection-overview
tags: telerik,blazor,grid,selection,overview
published: True
position: 0
---

# Grid Selection

The Grid component supports row and cell selection. When you select a row or a cell, they will be highlighted in the Grid. This article provides an overview of the Grid selection behavior and configuration:

* [Enable row or cell selection](#enable-row-or-cell-selection)
* [Use single or multiple selection](#use-single-or-multiple-selection)
* [Define ways to select rows or cells](#define-ways-to-select-rows-or-cells)
* [Access selected rows and selected cells](#access-selected-rows-and-selected-cells)
* [Follow selection events](#follow-selection-events)
* [Combine selection and other Grid features](#combine-selection-and-other-grid-features)

## Enable Row or Cell Selection

You can configure the Grid either for row or cell selection:
* To enable row selection:
  * Set the [Grid `SelectionMode` parameter](#use-single-or-multiple-selection) or
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to `GridSelectionType.Row`
* To enable cell selection:
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to the `Cell` member of the `Telerik.Blazor.GridSelectionType` enum

## Use Single or Multiple Selection

You can configure the selection behavior by setting the Grid `SelectionMode` parameter to a member of the `Telerik.Blazor.GridSelectionMode` enum. The Grid supports the following selection modes:

* `None` (default)—Disables row and cell selection.
* `Single`—Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection will be retained.
* `Multiple`—Allows the user to select multiple rows or cells at a time.

## Define Ways to Select Rows or Cells

By default you can click on a row or on a cell to select it. You can also select a row through a [checkbox column]({%slug components/grid/columns/checkbox%}). To select multiple rows or cells, use the `Ctrl` or `Shift` key to extend the selection.

See [Rows Selection Options]({%slug grid-selection-row%}#rows-selection-options) and [Cells Selection Options]({%slug grid-selection-cell%}#cells-selection-options) for more details.

## Access Selected Rows and Selected Cells

You can get and set the selected rows or cells:
* To access the selected rows add the Grid `SelectedItems` parameter.
* To access the selected cells add the Grid `SelectedCells` parameter.

Both parameters are collections. You can use the parameters to manipulate the selected rows or cells. You can also use the parameters to pre-select a row or cell for your users.

See [Selected Rows]({%slug grid-selection-row%}#selected-rows) and [Selected Cells]({%slug grid-selection-cell%}#selected-cells) for more details.

## Follow Selection Events

You can respond to the user action of selecting a new item through the Grid events:
* Use the [`SelectedItemsChanged` event]({%slug grid-selection-row%}#selecteditemschanged) to respond to row selection.
* Use the [`SelectedCellsChanged` event]({%slug grid-selection-cell%}#selectedcellschanged) to respond to cell selection.

> Both two-way binding to the property and using its event cannot be used at the same time as Blazor allows only one. To use the `SelectedItemsChanged` event or the `SelectedCellsChanged` event, utilize one-way binding for the `SelectedItems` property and the `SelectedCells` property.

## Combine Selection and Other Grid Features

The selection feature behavior may differ when the Grid configuration includes row or cell selection and other Grid features. In these situations, certain limitations might arise, or additional adjustments may be required.

See [Rows Selection and Other Grid Features]({%slug grid-selection-row%}#row-selection-and-other-grid-features) and [Cells Selection and Other Grid Features]({%slug grid-selection-cell%}#cell-selection-and-other-grid-features) for more details.

## See Also

  * [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
  * [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
