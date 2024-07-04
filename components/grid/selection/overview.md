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

* [Selection Basics](#selection-basics)
	* [Example - Enable Row Selection](#example---enable-row-selection)
	* [Example - Select rows with checkboxes only](#example---select-rows-with-checkboxes-only)
* [Notes](#notes)
	* [Editing Modes](#editing-modes)
	* [Selection in Template](#selection-in-template)
	* [Asynchronous Operations](#asynchronous-operations)
	* [SelectedItems Equals Comparison](#selecteditems-equals-comparison)
	* [Handle Data Changes](#handle-data-changes)
    * [Selection in Grid with virtualized rows](#selection-in-grid-with-virtualized-rows)
    * [Row Drag and Drop](#row-drag-and-drop)


## Selection Type

You can configure to select rows or cells in the Grid. Set the setting `GridSelectionType` to a member of the `Telerik.Blazor.GridSelectionType` enum. The selection can be:

* [Row]({%slug components/grid/selection/row%}) - (the default value) 
* [Cell]({%slug components/grid/selection/cell%})

## Selection Modes

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The row selection can be:

* `None` - (the default value) to disable row or cell selection
* `Single`
* `Multiple`

## Selection Options

When you select a row or a cell, they will be highlighted to notify you that they are selected.

### Click-Only Selection

By default, user can select a single row or a single cell by clicking anywhere, except on command buttons.

To select multiple rows or multiple cells, hold down the `Ctrl` or `Shift` key to extend the selection.

To deselect the row or the cell, the user has to click on the already selected item.

### Checkbox Selection

You can also use a checkbox column to select and deselect rows. This way the user can select the desired rows through the checkboxes. To use it, add a [`GridCheckboxColumn`]({%slug components/grid/columns/checkbox%}) in the `GridColumns` collection of the Grid. You can use it with both selection modes - single or multiple. The [`GridCheckboxColumn`] provides [additional configuration settings related to selection]({%slug components/grid/columns/checkbox%}#parameters).

## Selected Items

### Selected rows

You can get or set the selected rows through the `SelectedItems` property. It is a collection of rows from the Grid's `Data`.

The `SelectedItemsChanged` event receives a collection of the grid data model. It may have no items in it.

You can use the `SelectedItems` collection in two-way binding. You can use this to pre-select rows for your users.

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

### Selected cells

You can get or set the selected cells through the `SelectedCells` property. It is a collection of cells from the Grid's `Data`.

**to check if this will be working**
The `SelectedCellsChanged` event receives a collection of the grid data model. It may have no items in it.

You can use the `SelectedCells` collection in two-way binding. You can use this to pre-select cells for your users.

The `SelectedCells` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

### Selected Items Equals Comparison

The `SelectedItems` collection is compared against the Grid `Data` collection in order to determine which rows will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedItems` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

### Selected Items When Data Changes

When the grid `Data` collection changes, the `SelectedItems` collection has the following behavior:

* If the Grid does *not* use an `ObservableCollection` for its `Data` - The `SelectedItems` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

* If you update or delete an item, you must make the same update in the selected items through the grid [editing events]({%slug components/grid/editing/overview%}).

* When using an `ObservableCollection` for the grid `Data`- If an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedItems` collection too (the removed Data items will be removed from the Selected Items collection).

* The other CRUD operations (Create and Update), you should use the grid [editing events]({%slug components/grid/editing/overview%}) to handle the situation according to your business logic and preferred behavior.

* When the data changes and the selected items are cleared, the `SelectedItemsChanged` event will fire with the empty collection. If you are using two-way binding, the collection will be cleared.

### Example - Enable Row Selection

````CSHTML
See how the row selection modes work

<select @bind=@selectionMode>
    <option value=@GridSelectionMode.Single>Single</option>
    <option value=@GridSelectionMode.Multiple>Multiple</option>
</select>

<TelerikGrid Data=@GridData
             SelectionMode="@selectionMode"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@( selectionMode == GridSelectionMode.Single ? false : true )" Title="Select" Width="70px" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    GridSelectionMode selectionMode = GridSelectionMode.Single;

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

### Example - Select rows with checkboxes only

````CSHTML
@* Require clicks on the checkboxes for row selection*@

<TelerikGrid Data=@GridData Navigable="true"
             SelectionMode="GridSelectionMode.Multiple"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridCheckboxColumn CheckBoxOnlySelection="true" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

## Selection with Editing Modes

#### InCell Edit Mode

In the [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a [checkbox column]({%slug components/grid/columns/checkbox%}) (`<GridCheckboxColumn />`). This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row) - if row click selection was enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so selection will only work through the row selection checkbox.

To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article.

#### Inline and Popup Edit Modes

In [Inline EditMode]({%slug components/grid/editing/inline%}) and [Popup EditMode]({%slug components/grid/editing/popup%}) selection can be done by clicking on the desired row or by using a `<GridCheckboxColumn />`.

## Selection in Grid with virtualized rows

When the Grid has [virtualized rows]({%slug components/grid/virtual-scrolling%}) and the `SelectionMode` is set to [`Multiple`]({%slug components/grid/selection/multiple%}) the selectable items will be the one in the current set of items (page). If you select an item and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected item.

## Selection in Template

If you are using a [Grid Column Template]({%slug grid-templates-column%}) you can check the knowledge base article on [how to select row in the Grid when using Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}).

## Asynchronous Operations

Asynchronous operations such as loading data on demand should be handled in the [`OnRowClick`]({%slug grid-events%}#onrowclick) or [`OnRowDoubleClick`]({%slug grid-events%}#onrowdoubleclick) events rather than in the [`SelectedItemsChanged`]({%slug grid-events%}#selecteditemschanged).

## Row Drag and Drop

If the user drags selected rows, the current row selection will be cleared on row drop.


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Single Selection]({%slug components/grid/selection/single%})
  * [Multiple Selection]({%slug components/grid/selection/multiple%})
