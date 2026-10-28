---
title: Cell Selection
page_title: TreeList - Cells Selection
description: Learn how to select cell in Blazor TreeList component. Explore the selected cells. Discover cell selection bevahior when combined with other TreeList features. Try the practical sample code for cell selection.
slug: treelist-selection-cell
tags: telerik,blazor,treelist,selection,cells
position: 5
components: ["treelist"]
---

# Cell Selection

The TreeList component supports [single or multiple cell selection](slug:treelist-selection-overview#use-single-or-multiple-selection). You can select a cell with mouse click anywhere in the cell. You can access the collection of selected cells, use this collection and manipulate it. You can subscribe to selection events.

## Basics

To select a cell, click anywhere in it.

To select a range of cells in one or more columns, hold the **Shift** key, while clicking on the first and last cell of the range. To select or deselect multiple cells that don't belong to a range, hold the **Ctrl** key.

You can also select a cell range by holding and dragging the mouse cursor. The dragging motion defines the diagonal of a rectangle and the TreeList will select the cells under this rectangle. To allow this kind of cell selection, set the `DragToSelect` parameter in [`TreeListSelectionSettings`](slug:treelist-selection-overview#enable-row-or-cell-selection). The **Shift** and **Ctrl** modifiers are not supported in drag-to-select mode.

To enable cell selection:

1. Set the TreeList `SelectedCells` parameter to a collection of type `IEnumerable<TreeListSelectedCellDescriptor>`. The collection must be initialized in advance. See [`TreeListSelectedCellDescriptor`](#treelistselectedcelldescriptor) for infomation about the object properties.
1. Add a `<TreeListSelectionSettings>` tag to the `<TreeListSettings>` tag, and set the `SelectionType` parameter to the `TreeListSelectionType.Cell`.

>caption TreeList multiple cell selection

<demo metaUrl="client/treelist/selection/cells/example-1/" height="720"></demo>

## SelectedCellsChanged Event

You can respond to user selection actions through the `SelectedCellsChanged` event. The event handler receives a collection of type `IEnumerable<TreeListSelectedCellDescriptor>`. The collection may have multiple, single, or no objects in it, depending on the `SelectionMode` and the last user selection.

> The `SelectedCellsChanged` event handler cannot be awaited. To execute asynchronous operations when the user selects rows, use the [`OnRowClick`](slug:treelist-events#onrowclick) or [`OnRowDoubleClick`](slug:treelist-events#onrowdoubleclick) event instead.

>caption Using the TreeList SelectedCellsChanged event

<demo metaUrl="client/treelist/selection/cells/example-2/" height="720"></demo>

## TreeListSelectedCellDescriptor

The `TreeListSelectedCellDescriptor` type exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `ColumnField` | `string` | The value of the TreeList column [`Field` parameter](slug:telerik.blazor.components.common.boundcolumnbase#Telerik_Blazor_Components_Common_BoundColumnBase_Field), if set. |
| `ColumnId` | `string` | The value of the TreeList column [`Id` parameter](slug:Telerik.Blazor.Components.Common.ColumnBase#Telerik_Blazor_Components_Common_ColumnBase_Id), if set. |
| `DataItem` | `object` | The TreeList data item instance. Cast it to the actual TreeList model type before use. |

## Selection When Data Changes

When the TreeList `Data` collection changes, the `SelectedCells` collection has the following behavior:

* When the user updates a selected cell and the item instance is replaced, you have to also replace the `DataItem` object in the `SelectedCells` collection. Do that in the [TreeList `OnUpdate` event](slug:treelist-editing-overview#events).
* When the user deletes a row with selected cells, update the `SelectedCells` collection in the the TreeList `OnDelete` event handler.
* To select cells from a new item in the TreeList you can use the [`OnCreate` event](slug:treelist-editing-overview#events) to update the `SelectedCells` collection.

### Equals Comparison

The items in `SelectedCells` are compared against the items in the TreeList data in order to determine which cells will be highlighted. The default framework behavior is to compare objects by reference. The data item references may not match when:

* The `SelectedCells` are obtained from a different data source than the all TreeList items, for example, from a separate service.

In such cases, the selected cells may not appear as expected. You have to [override the `Equals` method of the TreeList model class](slug:treelist-state#equals-comparison) so that the items are compared by a unique identifier rather than by reference. When you override `Equals`, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method.

## Cell Selection and Other TreeList Features

The selection feature behavior may vary when the TreeList configuration combines cell selection and other TreeList features, such as editing, virtualization, paging, templates. In such cases you need to consider certain limitation or include some modications.

### Selection and Editing Modes

When you want to edit a TreeList item, the cell selection has the following behavior:

* Cell selection is not supported with [`Incell` edit mode](slug:treelist-editing-incell) due to the overlapping pointer events that trigger selection and editing. If both features are enabled, only the editing will work.
* [`Inline` edit mode](slug:treelist-editing-inline) and [`Popup` edit mode](slug:treelist-editing-popup) integrate with cell selection without limitations.

### Selection and Virtual Scrolling

When the TreeList has [virtual scrolling](slug:treelist-virtual-scrolling), the component is able to select a range of cells with **Shift** only if all rows in that range are currently rendered. Consider the following scenario:

1. Select a cell.
1. Scroll down, so that virtualization kicks in and the rendered rows are no longer the same.
1. Select another cell with **Shift**.

In this case, the range selection will start from the first row that is currently rendered. Compare with [Selection and paging](#selection-and-paging) below.

### Selection and Paging

The `SelectedCells` collection persists across paging.

### Selection and Templates

When using [TreeList templates](slug:treelist-templates-overview) with cell selection:

* If you are using a [TreeList column template](slug:treelist-templates-column) and you have a clickable element in the template, wrap this element in a container with a `@onclick:stopPropagation` directive. You can check the knowledge base article on [how to prevent row selection when the user clicks another component in the Grid column template](slug:grid-kb-row-selection-in-column-template). It is for the Grid component, but the concept is identical and it applies for both row and cell selection.
* If you are using a [row template](slug:treelist-templates-row) the TreeList does not support cell selection. The row template removes the built-in cell instances and the HTML markup may not even include the expected number of cells.

## See Also

* [Live Demo: TreeList Cell Selection](https://demos.telerik.com/blazor-ui/treelist/cell-selection)
