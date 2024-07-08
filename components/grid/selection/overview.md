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


## Selection Type

You can configure to select rows or cells in the Grid. Set the setting `GridSelectionType` to a member of the `Telerik.Blazor.GridSelectionType` enum. The selection can be:

* [`Row`]({%slug components/grid/selection/rows%}) (the default value)
* `Cell`

## Selection Mode

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The selection can be:

* `None` (the default value) - To disable row or cell selection.
* `Single` - Only one row or cell can be selected at a time, so the last one will be the selected one.
* `Multiple` - You can select a single or multiple rows or cells.

## Selection Options

When you select a row or a cell, they will be highlighted to notify you that they are selected.

See [Rows Selection Options]({%slug components/grid/selection/rows%}#rows-selection-options) and Cells Selection Options for more details.

## Selected Items

You can get and set the selected rows or cells.

See [Selected Rows]({%slug components/grid/selection/rows%}#selected-rows) and Selected Cells for more details.

## Selection Events

To respond to the user action of selecting a new row use the [`SelectedItemsChanged` event]({%slug components/grid/selection/rows%}#selecteditemschanged).

To respond to the user action of selecting a new cell use the `SelectedCellsChanged` event.

## Selection and Other Grid Features

To check if this will apply for the cell selection. If not - it is better for this section to be in the rows selection article.

### Selection with Editing Modes

#### InCell Edit Mode

In the [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a [checkbox column]({%slug components/grid/columns/checkbox%}) (`<GridCheckboxColumn />`). This applies for both selection modes - single and multiple. This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row) - if row click selection was enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so selection will only work through the row selection checkbox.

Does this means that if you have InCell Edit mode there cannot be a cell selection?

To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article.

#### Inline and Popup Edit Modes

In [Inline EditMode]({%slug components/grid/editing/inline%}) and [Popup EditMode]({%slug components/grid/editing/popup%}) selection can be done by clicking on the desired row or by using a `<GridCheckboxColumn />`.

### Selection in Grid with virtualized rows

When the Grid has [virtualized rows]({%slug components/grid/virtual-scrolling%}) and the `SelectionMode` is set to [`Multiple`](#selection-mode) the selectable items will be the one in the current set of items (page). If you select an item and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected item.

### Selection in Template

If you are using a [Grid Column Template]({%slug grid-templates-column%}) you can check the knowledge base article on [how to select row in the Grid when using Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}).

### Selection and Row Drag and Drop

If the user drags selected rows, the current selection and the collection? will be cleared on row drop.

## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Row Selection]({%slug components/grid/selection/rows%})
  * [Cell Selection]
