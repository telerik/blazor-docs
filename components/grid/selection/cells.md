---
title: Cells Selection
page_title: Grid - Cells Selection
description: Cell selection in the Grid for Blazor.
slug: components/grid/selection/cells
tags: telerik,blazor,grid,selection,cells
position: 5
---

# Cells Selection

The Grid component offers support for multiple cells selection.

In this article:

* [Cells Selection Options](#cells-selection-options)
* [Selected Cells](#selected-cells)
	* [Basics](#basics)
	* [Selected Cells When Data Changes](#selected-cells-when-data-changes)
	* [Selected Cells Equals Comparison](#selected-cells-equals-comparison)
* [SelectedCellsChanged](#selectedcellschanged)
	* [SelectedCellsChanged and Asynchronous Operations](#selectedcellschanged-and-asynchronous-operations)
* [Cell Selection and Other Grid Features](#cells-selection-and-other-grid-features)

## Cells Selection Options

To select a cell click anywhere in the cell. You can use cell selection with [multiple selection mode]({%slug components/grid/selection/overview%}#selection-mode).

To select multiple cells, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired cells to select or deselect them.
* Click on the starting cell in a range of cells that you want to select, press and hold `Shift`, and click on the last cell in the range. The first selected cell is the start point of the range and the last selected cell is the end of the selection.

If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected cells will be deselected.

>caption Cell selection and Multiple SelectionMode

````CSHTML
<TelerikGrid Data=@GridData
             @bind-SelectedCells="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Pageable=true>
    <GridSettings>
        <GridSelectionSettings SelectionType="@GridSelectionType.Cell"></GridSelectionSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Customer.ContactName) Title="Contact Name" />
        <GridColumn Field=@nameof(Customer.CompanyName) Title="Company Name" />
    </GridColumns>
</TelerikGrid>

<h2>Selected Cells:</h2>
<ul>
    @foreach (SelectedCellDescriptor customer in SelectedItems)
    {
        <li>
           @{
                var model = customer.DataItem as Customer;
                @model.ContactName
            }
        </li>
    }
</ul>

@code {
    private List<Customer> GridData { get; set; }
    private IEnumerable<SelectedCellDescriptor> SelectedItems { get; set; } = new List<SelectedCellDescriptor>();

    protected override void OnInitialized()
    {
        GridData = new List<Customer>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Customer()
                {
                    CustomerId = i,
                    CompanyName = "Company Name " + i.ToString(),
                    ContactName = "Contact Name " + i % 3
                });
        }
    }

    public class Customer
    {
        public int CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
    }
}
````

## Selected Cells

### Basics

* You can get or set the selected cells through the `SelectedCells` property. The `SelectedCells` is а collection of a type `IEnumerable<SelectedCellDescriptor>`.
* The `SelectedCellDescriptor` exposes:
    * `SelectedCellDescriptor.ColumnField` - the [field of the associated column]({%slug components/grid/columns/bound%}#data-binding) (if provided).
    * `SelectedCellDescriptor.ColumnId` - the [id of the associated column]({%slug components/grid/columns/bound%}#identification) (if provided).
    * `SelectedCellDescriptor.DataItem` - the actual data item of the selected cell. It has to be casted to the Grid data model.
* You can use the `SelectedCells` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedCells` property. The collection will be updated by the Grid when the selection changes.

### Selected Cells When Data Changes

When the Grid `Data` collection changes, the `SelectedCells` collection has the following behavior:

* If you update or delete an item in the Grid, you must make the same update in the `SelectedCells` collection through the Grid [editing events]({%slug components/grid/editing/overview%}). The other CRUD operations (Create), you should use the Grid [editing events]({%slug components/grid/editing/overview%}) to handle the situation according to your business logic and preferred behavior.

* If you are using one-way binding for the `SelectedCells` property, when the data changes and the selected items are cleared, the [`SelectedCellsChanged` event](#selectedcellschanged) will fire with the empty collection. If you are using two-way binding, the collection will be cleared.

* If the Grid does *not* use an `ObservableCollection` for its `Data` - the `SelectedCells` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

* When using an `ObservableCollection` for the Grid `Data`- if an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedCells` collection too (the removed Data items will be removed from the `SelectedCells` collection).

### Selected Cells Equals Comparison

The `SelectedCells` collection is compared against the Grid `Data` collection in order to determine which cells will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedCells` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

## SelectedCellsChanged

You can respond to the user action of selecting a new cell through the `SelectedCellsChanged` event. The `SelectedCellsChanged` event receives a collection `IEnumerable<SelectedCellDescriptor>`. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

>caption One-way binding for SelectedCells and using the SelectedCellsChanged event

````CSHTML
<TelerikGrid Data=@GridData
             SelectedCells="@SelectedItems"
             SelectedCellsChanged="@((IEnumerable<SelectedCellDescriptor> cellsList) => OnSelect(cellsList))"
             SelectionMode="@GridSelectionMode.Multiple"
             Pageable=true>
    <GridSettings>
        <GridSelectionSettings SelectionType="@GridSelectionType.Cell"></GridSelectionSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(Customer.ContactName) Title="Contact Name" />
        <GridColumn Field=@nameof(Customer.CompanyName) Title="Company Name" />
    </GridColumns>
</TelerikGrid>

<h2>Selected Cells:</h2>
<ul>
    @foreach (SelectedCellDescriptor customer in SelectedItems)
    {
        <li>
           @{
                var model = customer.DataItem as Customer;
                @model.ContactName
            }
        </li>
    }
</ul>

@code {
    private List<Customer> GridData { get; set; }
    private IEnumerable<SelectedCellDescriptor> SelectedItems { get; set; } = new List<SelectedCellDescriptor>();

    protected void OnSelect(IEnumerable<SelectedCellDescriptor> selectedCells)
    {
        // update the collection so that the grid can highlight the correct item
        // when two-way binding is used this happens automatically, but the framework
        // does not allow two-way binding and the event at the same time
        SelectedItems = selectedCells;
    }

    protected override void OnInitialized()
    {
        GridData = new List<Customer>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Customer()
                {
                    CustomerId = i,
                    CompanyName = "Company Name " + i.ToString(),
                    ContactName = "Contact Name " + i % 3
                });
        }
    }

    public class Customer
    {
        public int CustomerId { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
    }
}
````

## Cell Selection and Other Grid Features

### Cell Selection with Editing Modes

#### InCell Edit Mode

When there is a cell selection and an [Incell EditMode]({%slug components/grid/editing/incell%}) there is an overlapping action that triggers cell selection and InCell editing (clicking in the cell). Each attempt to select a cell puts a cell in edit mode.

#### Inline Edit Mode

When there is a cell selection and an [Inline EditMode]({%slug components/grid/editing/inline%}) a cell cannot be selected.

#### Popup Edit Mode

In [Popup EditMode]({%slug components/grid/editing/popup%}) selection can be done by clicking on the desired cell. You need to [handle the edit in the Grid item and in the `SelectedCells` collection](#selected-cells-when-data-changes).

### Selection in Grid with Virtual Scrolling

When the Grid has [virtual scrolling]({%slug components/grid/virtual-scrolling%}) the selectable cells will be the one in the current set of items (page). If you select a cell and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected cell.

### Selection in Template

If you are using a [Grid Column Template]({%slug grid-templates-column%}) and you have a clickable component as content of the Grid Column Template, you should add the `@onclick:stopPropagation` directive to the element of the clickable component. You can check the knowledge base article on [how to stop the selection from being triggered when the user clicks another component in the Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}). It applies for both - row and cell selection in the Grid.

If you are using the [Row Template]({%slug components/grid/features/templates%}#row-template), the cell selection won't work. The Row Template changes the content and the built-in cells instances.

### Cell Selection and GridCheckboxColumn

If you add a [`GridCheckboxColumn`]({%slug components/grid/columns/checkbox%}), the cell selection won't work. The `GridCheckboxColumn` provides an additional way for users to select Grid rows and not cells.

### Selection and Grid Paging

The `SelectedCells` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the collection.

## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
