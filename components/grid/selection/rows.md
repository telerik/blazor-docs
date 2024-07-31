---
title: Rows Selection
page_title: Grid - Rows Selection
description: Row selection in the Grid for Blazor.
slug: components/grid/selection/rows
tags: telerik,blazor,grid,selection,rows
previous_url: /components/grid/selection/single,/components/grid/selection/multiple
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
* [Row Selection and Other Grid Features](#row-selection-and-other-grid-features)
    * [Selection with Editing Modes](#selection-with-editing-modes)
    * [Selection in Grid with virtualized rows](#selection-in-grid-with-virtualized-rows)
    * [Selection and Grid Paging](#selection-and-grid-paging)
    * [Selection in Template](#selection-in-template)
    * [Selection and Row Drag and Drop](#selection-and-row-drag-and-drop)

## Rows Selection Options

You can use [click-only selection](#click-only-selection) and [checkbox selection](#checkbox-selection) with both [selection modes]({%slug components/grid/selection/overview%}#selection-mode) - single and multiple.

### Click-Only Selection

By default, users can select rows by clicking anywhere in the row, except on the command buttons.

To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection:
* Press and hold `Ctrl` and click the desired rows to select or deselect them.
* Click on the starting row in a range of rows that you want to select, press and hold `Shift`, and click on the last row in the range. The first selected row is the starting point of the range and the last selected row is the end of the selection.

If you release the `Ctrl` or the `Shift` keys and click to start new multiple selection, the previously selected rows will be deselected.

>caption Click-only selection and single selection mode

````CSHTML
Click on one row to select it.

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

### Checkbox Selection

You can also use a checkbox column to select and deselect rows. This way the user can select the desired rows through the checkboxes. To use it, add a [`GridCheckboxColumn`]({%slug components/grid/columns/checkbox%}) in the `GridColumns` collection of the Grid. The `GridCheckboxColumn` provides [additional configuration settings related to selection]({%slug components/grid/columns/checkbox%}#parameters).

To deselect the row, click its checkbox again.

>caption Checkbox selection and multiple selection mode

````CSHTML
@if (CheckBoxOnlySelection)
{
    <div>You can <strong>click only the checkbox itself</strong> to select or deselect the row. You cannot click the entire row.</div>
}
else
{
    <div>You can <strong>click both the checkbox or the row</strong> to select or deselect the row.</div>
}
<br/>
<TelerikCheckBox @bind-Value="@CheckBoxOnlySelection"
                 Id="@CheckboxId"/>
<label for="@CheckboxId">Toggle checkbox only selection</label>
<br />
<br />
<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Multiple"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@ShouldSelectAll" CheckBoxOnlySelection="@CheckBoxOnlySelection"></GridCheckboxColumn>
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; }

    private bool ShouldSelectAll { get; set; } = true;
    private bool CheckBoxOnlySelection { get; set; }

    private string CheckboxId { get; set; } = "checkboxOnlySelection";

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

## Selected Rows

### Basics

* You can get or set the selected rows through the `SelectedItems` property. It is a collection of the [Grid's `Data`]({%slug grid-data-binding%}) model.
* You can use the `SelectedItems` collection in two-way binding. You can predefine the selected item for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the Grid when the selection changes.

### Selected Rows When Data Changes

When the Grid `Data` collection changes, the `SelectedItems` collection has the following behavior:

* When you update a selected item in the Grid, you have to make the same update in the `SelectedItems` collection through the Grid [editing events]({%slug components/grid/editing/overview%}).
* When you delete a selected item in the Grid, it will automatically delete from the `SelectedItems` collection. If you are using one-way binding for the `SelectedItems` collection and the [`SelectedItemsChanged` event](#selecteditemschanged), when you delete a selected item, the event fires. When you delete all selected items, the `SelectedItemsChanged` event fires with an empty collection.
* When you create an item in the Grid, and you want to select it at the same time, use the Grid [editing events]({%slug components/grid/editing/overview%}).

### Selected Rows Equals Comparison

The `SelectedItems` collection is compared against the Grid `Data` collection in order to determine which rows will be highlighted. The default behavior of the framework is to compare objects by their reference.

When the `SelectedItems` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no highlighted items. In such cases, you have to [override the `Equals` method of the underlying model class]({%slug grid-state%}#equals-comparison) so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well.

## SelectedItemsChanged

You can respond to the user action of selecting a new row through the `SelectedItemsChanged` event. The `SelectedItemsChanged` event receives a collection of the Grid data model. It may have no items in it. It may have only one member (the last selected item) when the `SelectionMode` is `Single`.

>caption Single selection with one-way binding for SelectedItems and using the SelectedItemsChanged event

````CSHTML
<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Single"
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
    private Employee SelectedEmployee { get; set; }
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
        SelectedEmployee = employees.FirstOrDefault();
        // update the collection so that the grid can highlight the correct item
        // when two-way binding is used this happens automatically,
        // but the framework does not allow two-way binding and the event at the same time
        SelectedEmployees = new List<Employee> { SelectedEmployee };
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

### SelectedItemsChanged and Asynchronous Operations

If you want to execute asynchronous operations, such as loading data on demand, when the user selects a row, this should be handled in the [`OnRowClick`]({%slug grid-events%}#onrowclick) or [`OnRowDoubleClick`]({%slug grid-events%}#onrowdoubleclick) events rather than in the [`SelectedItemsChanged`]({%slug grid-events%}#selecteditemschanged).

## Row Selection and Other Grid Features

### Selection with Editing Modes

#### InCell Edit Mode

In the [Incell EditMode]({%slug components/grid/editing/incell%}) row selection can be applied only via a [checkbox column](#checkbox-selection) (`<GridCheckboxColumn />`). This applies for both selection modes - single and multiple. This is required due to the overlapping action that triggers selection and InCell editing (clicking in the row). Otherwise, if the row click selection is enabled with InCell editing, each attempt to select a row would put a cell in edit mode; and each attempt to edit a cell would select a new row. Such user experience is confusing, and so the row selection can be applied only via checkbox column when there is InCell editing mode.

To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article.

#### Inline and Popup Edit Modes

In [Inline EditMode]({%slug components/grid/editing/inline%}) and [Popup EditMode]({%slug components/grid/editing/popup%}) the row selection can be done by clicking on the desired row or by using a `<GridCheckboxColumn />`.

### Selection in Grid with Virtual Scrolling

When the Grid has [virtual scrolling]({%slug components/grid/virtual-scrolling%}) and the `SelectionMode` is set to [`Multiple`](#selection-mode) the selectable rows will be the one in the current set of items (page). If you select a row and scroll down to some of the ones that are not rendered yet (virtualization kicks in) and you want to select that range with the `Shift` button, the selection will start from the position of the first item of the current set (page) to the last selected row.

### Selection and Grid Paging

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the collection.

### Selection in Template

#### Selection in Grid Column Template

If you are using a [Grid Column Template]({%slug grid-templates-column%}) and you have a clickable component as content of the Grid Column Template, you can check the knowledge base article on [how to stop the row selection from being triggered when the user clicks another component in the Grid Column Template]({%slug grid-kb-row-selection-in-column-template%}).

#### Selection in Row Template

If you are using the [Row Template]({%slug components/grid/features/templates%}#row-template) and you want to select a row via a [checkbox column](#checkbox-selection) (`<GridCheckboxColumn />`) the Grid cannot render selection checkboxes for you. You have to bind them yourself to a field in the model, and handle their selection changed event to populate the `SelectedItems` collection of the Grid. You can find an example to get started in the following thread: [Grid Row Template with Selection - Unsure how to Bind to Selected Item](https://feedback.telerik.com/blazor/1463819-grid-row-template-with-selection-unsure-how-to-bind-to-selected-item).

### Selection and Row Drag and Drop

If the user drags selected rows, the current selection will be cleared on row drop.

## See Also

  * [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
