---
title: Cell Selection
page_title: Grid - Cells Selection
description: Learn how to select cell  in Blazor Grid component. Explore the selected cells. Discover cell selection bevahior when combined with other Grid features. Try the practical sample code for cell selection.
slug: components/grid/selection/cells
tags: telerik,blazor,grid,selection,cells
position: 5
---

# Cell Selection

The Grid component offers support for single or multiple cells selection. You can select a cell with mouse click anywhere in the cell. You can access the collection of selected cells, use this collection and manipulate it. You can follow and respond to the event of selection.

In this article:

* [Cells Selection Options](#cells-selection-options)
* [Selected Cells](#selected-cells)
	* [Basics](#basics)
	* [Selected Cells When Data Changes](#selected-cells-when-data-changes)
	* [Selected Cells Equals Comparison](#selected-cells-equals-comparison)
* [SelectedCellsChanged](#selectedcellschanged)
* [Cell Selection and Other Grid Features](#cell-selection-and-other-grid-features)
    * [Selection with Editing Modes](#selection-with-editing-modes)
    * [Selection in Grid with virtualized rows](#selection-in-grid-with-virtualized-rows)
    * [Selection and Grid Paging](#selection-and-grid-paging)
    * [Selection in Template](#selection-in-template)

## Cells Selection Options

To select a cell, click anywhere in the cell. You can use cell selection with both [selection modes]({%slug components/grid/selection/overview%}#selection-mode)—single and multiple.

To select multiple cells, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired cells to select or deselect them.
* Click on the starting cell in a range of cells that you want to select, press and hold `Shift`, and click on the last cell in the range. The first selected cell is the starting point of the range and the last selected cell is the end of the selection.
If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected cells will be deselected.

You can also select multiple cells dictated by the square formed between the mouse click, drag, and mouse click release. To allow this kind of cell selection, set the `DragToSelect` parameter of the [`GridSelectionSettings`]({%slug components/grid/selection/overview%}#selection-type).

>caption Cell selection and multiple selection mode

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
    @foreach (GridSelectedCellDescriptor customer in SelectedItems)
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
    private IEnumerable<GridSelectedCellDescriptor> SelectedItems { get; set; } = new List<GridSelectedCellDescriptor>();

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

* You can get or set the selected cells through the `SelectedCells` property. The `SelectedCells` is a collection of a type `IEnumerable<GridSelectedCellDescriptor>`.
* The `GridSelectedCellDescriptor` exposes:
    * `SelectedCellDescriptor.ColumnField`—the [field of the associated column]({%slug components/grid/columns/bound%}#data-binding) (if provided).
    * `SelectedCellDescriptor.ColumnId`—the [id of the associated column]({%slug components/grid/columns/bound%}#identification) (if provided).
    * `SelectedCellDescriptor.DataItem`—the actual data item of the selected cell. It has to be casted to the Grid data model.
* You can use the `SelectedCells` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedCells` property. The collection will be updated by the Grid when the selection changes.

### Selected Cells When Data Changes

When the Grid `Data` collection changes, the `SelectedCells` collection has the following behavior:

* When you update or delete a selected item in the Grid, you have to make the same in the `SelectedCells` collection through the Grid [editing events]({%slug components/grid/editing/overview%}).
* When you create an item in the Grid, and you want to select a cell from it with its creation, you should use the Grid [editing events]({%slug components/grid/editing/overview%}).

### Selected Cells Equals Comparison

The `SelectedCells` collection is compared against the Grid `Data` collection in order to determine which cells will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedCells` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

## SelectedCellsChanged

You can respond to the user action of selecting a new cell through the `SelectedCellsChanged` event. The `SelectedCellsChanged` event receives a collection `IEnumerable<GridSelectedCellDescriptor>`. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

>caption One-way binding for SelectedCells and using the SelectedCellsChanged event

````CSHTML
<TelerikGrid Data=@GridData
             SelectedCells="@SelectedItems"
             SelectedCellsChanged="@((IEnumerable<GridSelectedCellDescriptor> cellsList) => OnSelect(cellsList))"
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
    @foreach (GridSelectedCellDescriptor customer in SelectedItems)
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
    private IEnumerable<GridSelectedCellDescriptor> SelectedItems { get; set; } = new List<GridSelectedCellDescriptor>();

    protected void OnSelect(IEnumerable<GridSelectedCellDescriptor> selectedCells)
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

The selection feature behavior may vary when the Grid configuration combines cell selection and other Grid features, such as editing, virtualization, paging, templates. In such cases you need to consider certain limitation or include some modications.

### Selection with Editing Modes

When you want to edit a Grid item, the cell selection has the following behavior:

* In the [Incell EditMode]({%slug components/grid/editing/incell%}) there is an overlapping action that triggers cell selection and InCell editing (clicking in the cell). Each attempt to select a cell puts a cell in edit mode. In such case only the editing feature is working.
* In [Inline EditMode]({%slug components/grid/editing/inline%}) and [Popup EditMode]({%slug components/grid/editing/popup%}) the cell selection can be done by clicking on the desired cell.

### Selection in Grid with Virtual Scrolling

When the Grid has [virtual scrolling]({%slug components/grid/virtual-scrolling%}) the selectable cells will be the one in the current set of items (page). If you select a cell and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected cell.

### Selection and Grid Paging

The `SelectedCells` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the collection.

### Selection in Template

When your Grid configuration contains [Grid templates]({%slug components/grid/features/templates%}) and cell selection:

* If you are using a [Grid Column Template]({%slug grid-templates-column%}) and you have a clickable component as content of the Grid Column Template, you should add the `@onclick:stopPropagation` directive to the element of the clickable component. You can check the knowledge base article on [how to stop the selection from being triggered when the user clicks another component in the Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}). It applies for both—row and cell selection in the Grid.
* If you are using the [Row Template]({%slug components/grid/features/templates%}#row-template), the cell selection won't work. The Row Template changes the content and the built-in cells instances.

## See Also

  * [Live Demo: Grid Cell Selection](https://demos.telerik.com/blazor-ui/grid/cell-selection)
