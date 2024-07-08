---
title: Rows Selection
page_title: Grid - Rows Selection
description: Row selection in the Grid for Blazor.
slug: components/grid/selection/rows
tags: telerik,blazor,grid,selection,rows
position: 3
---

# Rows Selection

The Grid component offers support for single or multiple rows selection.

In this article:

* [Rows Selection Options](#rows-selection-options)
	* [Click-Only Selection](#click-only-selection)
	* [Checkbox Selection](#checkbox-selection)
* [Selected Rows](#selected-rows)
	* [Basics](#basics)
	* [Selected Rows When Data Changes](#selected-rows-when-data-changes)
	* [Selected Rows Equals Comparison](#selected-rows-equals-comparison)
* [SelectedItemsChanged](#selecteditemschanged)
	* [SelectedItemsChanged and Asynchronous Operations](#selecteditemschanged-and-asynchronous-operations)


## Rows Selection Options

You can use [click-only selection](#click-only-selection) and [checkbox selection](#checkbox-selection) with both [selection modes]({%slug components/grid/selection/overview%}#selection-mode) - single and multiple.

### Click-Only Selection

By default, user can select rows by clicking anywhere in the row, except on command buttons.

To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired rows to select or deselect them.
* Click on the starting row in a range of rows that you want to select, press and hold `Shift`, and click on the last row in the range. The first selected row is the start point of the range and the last selected row is the end of the selection.

If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected rows will be deselected.

### Checkbox Selection

You can also use a checkbox column to select and deselect rows. This way the user can select the desired rows through the checkboxes. To use it, add a [`GridCheckboxColumn`]({%slug components/grid/columns/checkbox%}) in the `GridColumns` collection of the Grid. The `GridCheckboxColumn` provides [additional configuration settings related to selection]({%slug components/grid/columns/checkbox%}#parameters).

To deselect the row, click its checkbox again.

## Selected Rows

## Basics

* You can get or set the selected rows through the `SelectedItems` property. It is a collection of rows from the [Grid's `Data`]({%slug grid-data-binding%}).
* You can use the `SelectedItems` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the Grid when the selection changes.
* The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

### Selected Rows When Data Changes

When the Grid `Data` collection changes, the `SelectedItems` collection has the following behavior:

* If the Grid does *not* use an `ObservableCollection` for its `Data` - the `SelectedItems` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

* If you update or delete an item, you must make the same update in the selected items through the Grid [editing events]({%slug components/grid/editing/overview%}).

* When using an `ObservableCollection` for the Grid `Data`- if an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedItems` collection too (the removed Data items will be removed from the `SelectedItems` collection).

* The other CRUD operations (Create and Update), you should use the Grid [editing events]({%slug components/grid/editing/overview%}) to handle the situation according to your business logic and preferred behavior.

* If you are using one-way binding for the `SelectedItems` property, when the data changes and the selected items are cleared, the [`SelectedItemsChanged` event](#selecteditemschanged) will fire with the empty collection. If you are using two-way binding, the collection will be cleared.

### Selected Rows Equals Comparison

The `SelectedItems` collection is compared against the Grid `Data` collection in order to determine which rows will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedItems` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

## SelectedItemsChanged

You can respond to the user action of selecting a new row through the `SelectedItemsChanged` event. The `SelectedItemsChanged` event receives a collection of the Grid data model. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one. This means that if you want to use the `SelectedItemsChanged` event, you need to use one-way binding for the `SelectedItems` property. Otherwise, you can use two-way binding for the `SelectedItems` property without the `SelectedItemsChanged` event.

### SelectedItemsChanged and Asynchronous Operations

Asynchronous operations such as loading data on demand should be handled in the [`OnRowClick`]({%slug grid-events%}#onrowclick) or [`OnRowDoubleClick`]({%slug grid-events%}#onrowdoubleclick) events rather than in the [`SelectedItemsChanged`]({%slug grid-events%}#selecteditemschanged). So if you want to load that data on demand, you should use the `OnRowClick` event.


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
