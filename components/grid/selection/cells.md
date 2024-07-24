---
title: Cells Selection
page_title: Grid - Cells Selection
description: Cell selection in the Grid for Blazor.
slug: components/grid/selection/cells
tags: telerik,blazor,grid,selection,cells
position: 5
---

# Cells Selection

The Grid component offers support for single or multiple cells selection.

In this article:

* [Cells Selection Options](#cells-selection-options)
	* [Click-Only Selection](#click-only-selection)
	* [Checkbox Selection](#checkbox-selection)
* [Selected Cells](#selected-cells)
	* [Basics](#basics)
	* [Selected Cells When Data Changes](#selected-cells-when-data-changes)
	* [Selected Cells Equals Comparison](#selected-cells-equals-comparison)
* [SelectedCellsChanged](#selectedcellschanged)
	* [SelectedCellsChanged and Asynchronous Operations](#selectedcellschanged-and-asynchronous-operations)
* [Cell Selection and Other Grid Features](#cells-selection-and-other-grid-features)


## Cells Selection Options

To select a cell click anywhere in the cell. You can use cell selection with both [selection modes]({%slug components/grid/selection/overview%}#selection-mode) - single and multiple.

To select multiple cells, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired cells to select or deselect them.
* Click on the starting cell in a range of cells that you want to select, press and hold `Shift`, and click on the last cell in the range. The first selected cell is the start point of the range and the last selected cell is the end of the selection.

If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected cells will be deselected.

>caption Click-only selection and Single SelectionMode

````CSHTML
Click on one row to select it

<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Single"
             Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; }

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

## Selected Cells

### Basics

* You can get or set the selected cells through the `SelectedCells` property. It is a collection of cells from the [Grid's `Data`]({%slug grid-data-binding%}).
* You can use the `SelectedCells` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedCells` property. The collection will be updated by the Grid when the selection changes.
* The `SelectedCells` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

### Selected Cells When Data Changes

When the Grid `Data` collection changes, the `SelectedCells` collection has the following behavior:

* If the Grid does *not* use an `ObservableCollection` for its `Data` - the `SelectedCells` collection will be preserved. You need to clear or manipulate it when the data is changed according to your needs and business logic.

* If you update or delete an item, you must make the same update in the selected items through the Grid [editing events]({%slug components/grid/editing/overview%}).

* When using an `ObservableCollection` for the Grid `Data`- if an item is removed or the entire data is cleared using the collection's `.Clear()` method, it will automatically update the `SelectedCells` collection too (the removed Data items will be removed from the `SelectedCells` collection).

* The other CRUD operations (Create and Update), you should use the Grid [editing events]({%slug components/grid/editing/overview%}) to handle the situation according to your business logic and preferred behavior.

* If you are using one-way binding for the `SelectedCells` property, when the data changes and the selected items are cleared, the [`SelectedCellsChanged` event](#selectedcellschanged) will fire with the empty collection. If you are using two-way binding, the collection will be cleared.

### Selected Rows Equals Comparison

The `SelectedCells` collection is compared against the Grid `Data` collection in order to determine which cells will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedCells` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

## SelectedCellsChanged

You can respond to the user action of selecting a new cell through the `SelectedCellsChanged` event. The `SelectedCellsChanged` event receives a collection of the Grid data model. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

>caption One-way binding for SelectedCells and using the SelectedCellsChanged event

````CSHTML
<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
             SelectedItems="@SelectedEmployees"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridCheckboxColumn />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@if (SelectedEmployees != null)
{
    <ul>
        @foreach (Employee employee in SelectedEmployees)
        {
            <li>
                @employee.Name
            </li>
        }
    </ul>
}

@code {
    private List<Employee> GridData { get; set; }
    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

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

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedEmployees = employees;
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

### SelectedCellsChanged and Asynchronous Operations

Asynchronous operations such as loading data on demand should be handled in the [`OnRowClick`]({%slug grid-events%}#onrowclick) or [`OnRowDoubleClick`]({%slug grid-events%}#onrowdoubleclick) events rather than in the [`SelectedItemsChanged`]({%slug grid-events%}#selecteditemschanged). So if you want to load that data on demand, you should use the `OnRowClick` event.

## Cell Selection and Other Grid Features

### Cell Selection with Editing Modes

#### InCell Edit Mode

In the [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a [checkbox column]({%slug components/grid/columns/checkbox%}) (`<GridCheckboxColumn />`). This applies for both selection modes - single and multiple. This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row) - if row click selection was enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so selection will only work through the row selection checkbox.

To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article.

#### Inline and Popup Edit Modes

In [Inline EditMode]({%slug components/grid/editing/inline%}) and [Popup EditMode]({%slug components/grid/editing/popup%}) selection can be done by clicking on the desired row or by using a `<GridCheckboxColumn />`.

### Selection in Grid with virtualized rows

When the Grid has [virtualized rows]({%slug components/grid/virtual-scrolling%}) and the `SelectionMode` is set to [`Multiple`](#selection-mode) the selectable items will be the one in the current set of items (page). If you select an item and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected item.

### Selection in Template

If you are using a [Grid Column Template]({%slug grid-templates-column%}) and you have a clickable component as content of the Grid Column Template, you can check the knowledge base article on [how to stop the selection from being triggered when the user clicks another component in the Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}).

If you are using the [Row Template]({%slug components/grid/features/templates%}#row-template), the Grid cannot render selection checkboxes for you, so you have to bind them yourself to a field in the model, and handle their selection changed event to populate the `SelectedItems` collection of the Grid. You can find an example to get started in the following thread: [Grid Row Template with Selection - Unsure how to Bind to Selected Item](https://feedback.telerik.com/blazor/1463819-grid-row-template-with-selection-unsure-how-to-bind-to-selected-item)

### Selection and Row Drag and Drop

If the user drags selected rows, the current selection will be cleared on row drop.

## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
