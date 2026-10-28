---
title: Overview
page_title: Grid - Selection Overview
description: Learn how to select Grid rows and cells in the Telerik UI for Blazor Grid and combine selection with other features.
slug: grid-selection-overview
tags: telerik,blazor,grid,selection,overview
published: True
position: 0
components: ["grid"]
---

# Grid Selection Overview

The Telerik UI for Blazor Grid supports row and cell selection. Selected rows and cells are highlighted in the Grid. This article provides an overview of the selection behavior and configuration:

* [Enable row or cell selection](#enable-row-or-cell-selection)
* [Use single or multiple selection](#use-single-or-multiple-selection)
* [Access selected rows or cells](#access-selected-rows-or-cells)
* [Handle selection events](#handling-selection-events)
* [Combine selection with other Grid features](#integration-with-other-grid-features)

## Enable Row or Cell Selection

You can configure the Grid either for row or cell selection. See [Row Selection Basics](slug:grid-selection-row#row-selection-basics) and [Cell Selection Basics](slug:grid-selection-cell#cell-selection-basics) for more details and examples.

## Use Single or Multiple Selection

You can configure the selection behavior by setting the Grid `SelectionMode` parameter to a member of the `Telerik.Blazor.GridSelectionMode` enum. The Grid supports the following selection modes:

* `None` (default)&mdash;Disables row and cell selection.
* `Single`&mdash;Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection takes effect.
* `Multiple`&mdash;Allows the user to select multiple rows or cells at a time.

## Access Selected Rows or Cells

The Grid exposes two parameters to get or set its selected rows and cells.

* Use the `SelectedItems` parameter (`IEnumerable<T>`) to access the selected rows.
* Use the `SelectedCells` parameter (`IEnumerable<GridSelectedCellDescriptor>`) to access the selected cells.

Both parameters support two-way binding. You can also use the parameters to pre-select rows or cells for your users:

See [Row Selection Basics](slug:grid-selection-row#row-selection-basics) and [Cell Selection Basics](slug:grid-selection-cell#cell-selection-basics) for more details.

## Handling Selection Events

You can respond to the user action of selecting a new item through the Grid events:

* Use the [`SelectedItemsChanged` event](slug:grid-selection-row#handling-row-selection-changes) to respond to row selection.
* Use the [`SelectedCellsChanged` event](slug:grid-selection-cell#selectedcellschanged-event) to respond to cell selection.

## Integration with Other Grid Features

The selection feature behavior may differ when the Grid configuration includes row or cell selection and other Grid features. In these situations, certain limitations might arise, or additional adjustments may be required.

See [Rows Selection and Other Grid Features](slug:grid-selection-row#row-selection-and-other-grid-features) and [Cells Selection and Other Grid Features](slug:grid-selection-cell#cell-selection-and-other-grid-features) for more details.

## See Also

* [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
* [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
* [Blazor Grid](slug:grid-overview)
