---
title: Overview
page_title: TreeList - Selection Overview
description: Selection basics in the TreeList for Blazor.
slug: treelist-selection-overview
tags: telerik,blazor,treelist,selection,overview 
published: True
position: 0
components: ["treelist"]
---
# TreeList Selection

The TreeList component supports row and cell selection. When you select a row or a cell, they will be highlighted in the TreeList. This article provides an overview of the TreeList selection behavior and configuration:

* [Enable row or cell selection](#enable-row-or-cell-selection)
* [Use single or multiple selection](#use-single-or-multiple-selection)
* [Access selected rows or cells](#access-selected-rows-or-cells)
* [Handle selection events](#events)
* [Combine selection with other TreeList features](#integration-with-other-treelist-features)

## Enable Row or Cell Selection

You can configure the TreeList either for row or cell selection. See [Row Selection Basics](slug:treelist-selection-row#basics) and [Cell Selection Basics](slug:treelist-selection-cell#basics) for more details and examples.

## Use Single or Multiple Selection

You can configure the selection behavior by setting the TreeList `SelectionMode` parameter to a member of the `Telerik.Blazor.TreeListSelectionMode` enum. The TreeList supports the following selection modes:

* `None` (default)—Disables row and cell selection.
* `Single`—Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection will take effect.
* `Multiple`—Allows the user to select multiple rows or cells at a time.

## Access Selected Rows or Cells

The TreeList exposes two parameters to get or set its selected rows and cells.

* Use the `SelectedItems` parameter (`IEnumerable<T>`) to access the selected rows.
* Use the `SelectedCells` parameter (`IEnumerable<TreeListSelectedCellDescriptor>`) to access the selected cells.

Both parameters support two-way binding. You can also use the parameters to pre-select rows or cells for your users.

See [Row Selection Basics](slug:treelist-selection-row#basics) and [Cell Selection Basics](slug:treelist-selection-cell#basics) for more details.

## Events

You can respond to the user action of selecting a new item through the TreeList events:

* Use the [`SelectedItemsChanged` event](slug:treelist-selection-row#selecteditemschanged-event) to respond to row selection.
* Use the [`SelectedCellsChanged` event](slug:treelist-selection-cell#selectedcellschanged-event) to respond to cell selection.

## Integration with Other TreeList Features

The selection feature behavior may differ when the TreeList configuration includes row or cell selection and other TreeList features. In these situations, certain limitations might arise, or additional adjustments may be required.

See [Rows Selection and Other TreeList Features](slug:treelist-selection-row#row-selection-and-other-treelist-features) and [Cells Selection and Other TreeList Features](slug:treelist-selection-cell#cell-selection-and-other-treelist-features) for more details.

## See Also

* [Live Demo: TreeList Row Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
* [Live Demo: TreeList Cell Selection](https://demos.telerik.com/blazor-ui/treelist/cell-selection)