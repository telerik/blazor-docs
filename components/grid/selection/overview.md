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
* [Access selected rows or cells](#access-selected-rows-or-cells)
* [Handle selection events](#events)
* [Combine selection with other Grid features](#integration-with-other-grid-features)

## Enable Row or Cell Selection

You can configure the Grid either for row or cell selection:

* To enable row selection:
  * Set the [Grid `SelectionMode` parameter](#use-single-or-multiple-selection) or
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to `GridSelectionType.Row`.
  * Optionally, you can also select rows through the [checkbox column]({%slug components/grid/columns/checkbox%}).
* To enable cell selection:
  * Add a `<GridSelectionSettings>` tag to the `<GridSettings>` tag, and set the `SelectionType` parameter to the `Cell` member of the `Telerik.Blazor.GridSelectionType` enum.

See [Rows Selection Options]({%slug grid-selection-row%}#basics) and [Cells Selection Options]({%slug grid-selection-cell%}#basics) for more details.

## Use Single or Multiple Selection

You can configure the selection behavior by setting the Grid `SelectionMode` parameter to a member of the `Telerik.Blazor.GridSelectionMode` enum. The Grid supports the following selection modes:

* `None` (default)—Disables row and cell selection.
* `Single`—Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection will take effect.
* `Multiple`—Allows the user to select multiple rows or cells at a time.

## Access Selected Rows or Cells

The Grid exposes two parameters to get or set its selected rows and cells.

* Use the `SelectedItems` parameter (`IEnumerable<T>`) to access the selected rows.
* Use the `SelectedCells` parameter (`IEnumerable<GridSelectedCellDescriptor>`) to access the selected cells.

Both parameters support two-way binding. You can also use the parameters to pre-select rows or cells for your users.

See [Selected Rows]({%slug grid-selection-row%}#selected-rows) and [Selected Cells]({%slug grid-selection-cell%}#selected-cells) for more details.

## Events

You can respond to the user action of selecting a new item through the Grid events:

* Use the [`SelectedItemsChanged` event]({%slug grid-selection-row%}#selecteditemschanged) to respond to row selection.
* Use the [`SelectedCellsChanged` event]({%slug grid-selection-cell%}#selectedcellschanged) to respond to cell selection.

## Integration with Other Grid Features

The selection feature behavior may differ when the Grid configuration includes row or cell selection and other Grid features. In these situations, certain limitations might arise, or additional adjustments may be required.

See [Rows Selection and Other Grid Features]({%slug grid-selection-row%}#row-selection-and-other-grid-features) and [Cells Selection and Other Grid Features]({%slug grid-selection-cell%}#cell-selection-and-other-grid-features) for more details.

## See Also

* [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
* [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
