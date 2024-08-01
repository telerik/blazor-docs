---
title: Overview
page_title: TreeList - Selection Overview
description: Selection basics in the TreeList for Blazor.
slug: treelist-selection-overview
tags: telerik,blazor,treelist,selection,overview
published: True
position: 0
---

# TreeList Selection

The treelist component offers support for row selectionand cell selection.

In this article:

* [Selection Type](#selection-type)
* [Selection Mode](#selection-mode)
* [Selection Options](#selection-options)
* [Selected Items](#selected-items)
* [Selection Events](#selection-events)
* [Selection and Other TreeList Features](#selection-and-other-treelist-features)

## Selection Type

You can configure the TreeList either for row or cell selection:
* To allow row selection:
  * Set the [TreeList `SelectionMode` parameter](#selection-mode) or
  * Add a `<TreeListSelectionSettings>` tag to the `<TreeListSettings>` tag, and set the `SelectionType` parameter to the `Row` member of the `Telerik.Blazor.TreeListSelectionType` enum
* To allow cell selection:
  * Add a `<TreeListSelectionSettings>` tag to the `<TreeListSettings>` tag, and set the `SelectionType` parameter to the `Cell` member of the `Telerik.Blazor.TreeListSelectionType` enum

## Selection Mode

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.TreeListSelectionMode` enum. The TreeList supports the following selection modes:

* `None`(the default value)—To disable row or cell selection.
* `Single`—Allows the user to select only one cell or row at a time. If the user attempts to select multiple cells or rows sequentially, only the most recent selection will be retained.
* `Multiple`—Allows the user to select multiple rows or cells at a time.

## Selection Options

When you select a row or a cell, they will be highlighted to notify you that they are selected. By default you can click on a row or on a cell to select it. You can also select a row through a checkbox column. To select multiple rows or cells, use the `Ctrl` or `Shift` key to extend the selection.

See [Rows Selection Options]({%slug treelist-selection-rows%}#rows-selection-options) and [Cells Selection Options]({%slug treelist-selection-cells%}#cells-selection-options) for more details.

## Selected Items

You can get and set the selected rows or cells:
* To access the selected rows add the TreeList `SelectedItems` parameter.
* To access the selected cells add the TreeList `SelectedCells` parameter.

Both parameters are collections. You can use the parameters to manipulate the selected rows or cells. You can also use the parameters to pre-select a row or cell for your users.

See [Selected Rows]({%slug treelist-selection-rows%}#selected-rows) and [Selected Cells]({%slug treelist-selection-cells%}#selected-cells) for more details.

## Selection Events

You can respond to the user action of selecting a new item through the TreeList events:
* Use the [`SelectedItemsChanged` event]({%slug treelist-events%}#selecteditemschanged) to respond to row selection.
* Use the [`SelectedCellsChanged` event]({%slug treelist-events%}#selectedcellschanged) to respond to cell selection.

> Both binding to the property and using its event cannot be used at the same time as Blazor allows only one. To use the `SelectedItemsChanged` event, utilize one-way binding for the `SelectedItems` property. Otherwise, use two-way binding for the `SelectedItems` property without the `SelectedItemsChanged` event. The same applies to the `SelectedCells` and the `SelectedCellsChanged`.

## Selection and Other TreeList

The selection feature behavior may vary when the TreeList configuration combines row or cell selection and:
* The [TreeList editing feature]({%slug treelist-editing-overview%}).
* The [TreeList virtualization feature]({%slug treelist-virtual-scrolling%}).
* The [TreeList paging feature]({%slug treelist-paging%}).
* The [TreeList templates feature]({%slug treelist-templates-overview%}).
* The [TreeList drag and drop feature]({%slug treelist-drag-drop-overview%}).

There are some limitations or additional modifications that are needed in such cases.

See [Rows Selection and Other Grid Features]({%slug treelist-selection-rows%}#rows-selection-and-other-treelist-features) and [Cells Selection and Other Grid Features]({%slug treelist-selection-cells%}#cells-selection-and-other-grid-features) for more details.

## See Also

  * [Live Demo: TreeList Row Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
  * [Live Demo: TreeList Cell Selection](https://demos.telerik.com/blazor-ui/treelist/cell-selection)