---
title: Row Selection
page_title: Grid - Rows Selection
description: Learn how to select row in Blazor Grid component. Explore the selected rows. Discover row selection bevahior when combined with other Grid features. Try the practical sample code for row selection.
slug: grid-selection-row
tags: telerik,blazor,grid,selection,rows
previous_url: /components/grid/selection/single,/components/grid/selection/multiple
position: 3
---

# Row Selection

The Grid component supports [single or multiple row selection](slug://grid-selection-overview#use-single-or-multiple-selection). You can select a row with mouse click and through a checkbox column. You can access the collection of selected rows, use this collection and modify it. You can subscribe to selection events.

## Basics

By default, users can select rows by clicking anywhere in the row, except on command buttons.

To select a range of rows, hold the **Shift** key, while clicking on the first and last row of the range. To select or deselect multiple rows that don't belong to a range, hold the **Ctrl** key.

Check the [Grid Keyboard navigation demo](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) for detailed information about selecting rows with the keyboard.

To enable row selection:

1. Define the selection mode through one of the following options:
    * Set the [Grid `SelectionMode` parameter](slug://grid-selection-overview#use-single-or-multiple-selection), or
    * Add a `<GridSelectionSettings>` tag inside the Grid `<GridSettings>` tag, and set the `SelectionType` parameter to `GridSelectionType.Row`.
1. Set the Grid `SelectedItems` parameter to a collection of type `IEnumerable<TItem>` where `TItem` is the Grid model class. The collection must be initialized in advance.
1. Optionally, add a [checkbox column](slug://components/grid/columns/checkbox) to the `GridColumns` collection of the Grid. The `GridCheckboxColumn` provides [additional configuration settings related to selection](slug://components/grid/columns/checkbox#parameters).

>caption Grid multiple row selection

````RAZOR
<TelerikGrid Data="@GridData"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedEmployees"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" CheckBoxOnlySelection="false" />
        <GridColumn Field="@nameof(Employee.Name)" />
        <GridColumn Field="@nameof(Employee.Team)" />
    </GridColumns>
</TelerikGrid>

<h3>Selected Employees:</h3>

<ul>
    @foreach (Employee employee in SelectedEmployees)
    {
        <li>@employee.Name</li>
    }
</ul>

@code {
    private List<Employee> GridData { get; set; } = new();

    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = $"Employee {i}",
                Team = $"Team {i % 3 + 1}"
            });
        }

        SelectedEmployees = new List<Employee>() { GridData.ElementAt(2) };
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
    }
}
````

## SelectedItemsChanged Event

You can respond to user selection actions through the `SelectedItemsChanged` event. The event handler receives a collection of the Grid data model. The collection may have multiple, single, or no items in it, depending on the `SelectionMode` and the last user selection.

> The `SelectedItemsChanged` event handler cannot be awaited. To execute asynchronous operations when the user selects rows, use the [`OnRowClick`](slug://grid-events#onrowclick) or [`OnRowDoubleClick`](slug://grid-events#onrowdoubleclick) event instead.

>caption Using the Grid SelectedItemsChanged event

````RAZOR
@* Select rows and handle the SelectedItemsChanged event *@

<TelerikGrid Data="@GridData"
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItems="@SelectedEmployees"
             SelectedItemsChanged="@( (IEnumerable<Employee> newSelected) => OnRowSelect(newSelected) )"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" CheckBoxOnlySelection="false" />
        <GridColumn Field="@nameof(Employee.Name)" />
        <GridColumn Field="@nameof(Employee.Team)" />
    </GridColumns>
</TelerikGrid>

<p><code>SelectedItemsChanged</code> fired at: @SelectedItemsChangedLog</p>

<h3>Selected Employees:</h3>

<ul>
    @foreach (Employee employee in SelectedEmployees)
    {
        <li>@employee.Name</li>
    }
</ul>

@code {
    private List<Employee> GridData { get; set; } = new();

    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

    private string SelectedItemsChangedLog { get; set; } = string.Empty;

    protected void OnRowSelect(IEnumerable<Employee> employees)
    {
        // Update the SelectedItems collection manually.
        // When using two-way binding, this happens automatically.
        SelectedEmployees = employees;

        SelectedItemsChangedLog = DateTime.Now.ToLongTimeString();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = $"Employee {i}",
                Team = $"Team {i % 3 + 1}"
            });
        }

        SelectedEmployees = new List<Employee>() { GridData.ElementAt(2) };
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
    }
}
````

## Selection When Data Changes

When the Grid `Data` collection changes, the `SelectedItems` collection has the following behavior:

* When the user updates a selected item and the item instance is replaced, you have to also replace the selected item object in the `SelectedItems` collection. Do that in the [Grid `OnUpdate` event](slug://components/grid/editing/overview#events).
* When the user deletes a selected item, the Grid automatically deletes it from the `SelectedItems` collection and the [`SelectedItemsChanged` event](#selecteditemschanged-event) fires.
* To select a new item in the Grid you can use the [`OnCreate` event](slug://components/grid/editing/overview#events) to update the `SelectedItems` collection.

## Equals Comparison

The items in `SelectedItems` are compared against the items in the Grid data in order to determine which rows will be highlighted. The default framework behavior is to compare objects by reference. The data item references may not match when:

* The Grid is databound through its `OnRead` event and each data request returns different data item instances.
* The `SelectedItems` are obtained from a different data source than the all Grid items, for example, from a separate service.

In such cases, the selected rows may not appear as expected. You have to [override the `Equals` method of the Grid model class](slug://grid-state#equals-comparison) so that the items are compared by a unique identifier rather than by reference. When you override `Equals`, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method.

## Row Selection and Other Grid Features

The selection behavior may vary when other Grid features are enabled, such as editing, virtualization, paging, column and row templates, row drag and drop. In such cases you need to consider certain limitations or adjust the application code.

### Selection and Editing Modes

When users edit rows, the row selection has the following behavior:

* In [`Incell` edit mode](slug://components/grid/editing/incell) the row selection can work only through a [checkbox column](slug://components/grid/columns/checkbox). This is required due to the overlapping pointer events that trigger selection and editing. To see how to select the row that is being edited in `InCell` edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode](slug://grid-kb-row-select-incell-edit) KB article.
* [`Inline` edit mode](slug://components/grid/editing/inline) and [`Popup` edit mode](slug://components/grid/editing/popup) integrate with row selection without limitations.

### Selection and Virtual Scrolling

When the Grid has [virtual scrolling](slug://components/grid/virtual-scrolling), the component is able to select a range of rows with **Shift** only if all rows in that range are currently rendered. Consider the following scenario:

1. Select a row.
1. Scroll down, so that virtualization kicks in and the rendered rows are no longer the same.
1. Select another row with **Shift**.

In this case, the range selection will start from the first row that is currently rendered.

### Selection and Paging

The `SelectedItems` collection persists across paging.

The [**Select All** checkbox in the Grid checkbox column](slug://components/grid/columns/checkbox#parameters) cannot select items on other pages when using the Grid `OnRead` event.

### Selection and Templates

When using [Grid templates](slug://components/grid/features/templates) with row selection:

* If you are using a [Grid column template](slug://grid-templates-column) and you have a clickable element in the template, you can check the knowledge base article on [how to prevent row selection when the user clicks another component in the Grid column template](slug://grid-kb-row-selection-in-column-template).
* If you are using a [row template](slug://grid-templates-row) the Grid cannot render a built-in [checkbox column](slug://components/grid/columns/checkbox). You have to render checkboxes manually and handle their changed event to populate the `SelectedItems` collection of the Grid. You can find an example to get started in the following knowledge base article: [Implement Built-in Functions when Using Grid Row Template](slug://grid-kb-row-template-simulate-built-in-functions).

### Selection and Row Drag and Drop

The Grid clears the `SelectedItems` collection when the user drags and drops selected rows.

## See Also

* [Live Demo: Grid Row Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
* [Blazor Grid](slug://grid-overview)
