---
title: Row Selection
page_title: TreeList - Rows Selection
description: Learn how to select row in Blazor TreeList component. Explore the selected rows. Discover row selection bevahior when combined with other TreeList features. Try the practical sample code for row selection.
slug: treelist-selection-row
tags: telerik,blazor,treelist,selection,rows
previous_url: /treelist-selection-multiple,/treelist-selection-single
position: 3
components: ["treelist"]
---
# Row Selection

The TreeList component supports [single or multiple row selection](slug:treelist-selection-overview#use-single-or-multiple-selection). You can select a row with mouse click and through a checkbox column. You can access the collection of selected rows, use this collection and modify it. You can subscribe to selection events.

## Basics

By default, users can select rows by clicking anywhere in the row, except on command buttons.

To select a range of rows, hold the **Shift** key, while clicking on the first and last row of the range. To select or deselect multiple rows that don't belong to a range, hold the **Ctrl** key.

Check the [TreeList Keyboard navigation demo](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation) for detailed information about selecting rows with the keyboard.

To enable row selection:

1. Define the selection mode through one of the following options:
    * Set the [TreeList `SelectionMode` parameter](slug:treelist-selection-overview#use-single-or-multiple-selection), or
    * Add a `<TreeListSelectionSettings>` tag to the `<TreeListSettings>` tag, and set the `SelectionType` parameter to `TreeListSelectionType.Row`.
1. Set the TreeList `SelectedItems` parameter to a collection of type `IEnumerable<TItem>` where `TItem` is the TreeList model class. The collection must be initialized in advance.
1. Optionally, add a [checkbox column](slug:treelist-columns-checkbox) to the `TreeListColumns` collection of the TreeList. The `TreeListCheckboxColumn` provides [additional configuration settings related to selection](slug:treelist-columns-checkbox#parameters).

>caption TreeList multiple row selection

````RAZOR
<TelerikTreeList Data="@TreeListData"
                  IdField="@nameof(Employee.Id)"
                  ParentIdField="@nameof(Employee.ParentId)"
                  SelectionMode="@TreeListSelectionMode.Multiple"
                  @bind-SelectedItems="@SelectedEmployees"
                  Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.FirstName)" Title="First Name" Width="350px" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" />
        <TreeListColumn Field="@nameof(Employee.Position)" Title="Position" Width="200px" />
    </TreeListColumns>
</TelerikTreeList>

<h3>Selected Employees:</h3>

<ul>
    @foreach (Employee employee in SelectedEmployees)
    {
        <li>@employee.FirstName</li>
    }
</ul>

@code {
    private List<Employee> TreeListData { get; set; } = new();
    private IEnumerable<Employee> SelectedEmployees { get; set; } = Enumerable.Empty<Employee>();

    protected override void OnInitialized()
    {
        TreeListData = new List<Employee>();

        for (int i = 1; i <= 9; i++)
        {
            TreeListData.Add(new Employee()
                {
                    Id = i,
                    ParentId = i <= 3 ? null : i % 3 + 1,
                    FirstName = "First " + i,
                    LastName = "Last " + i,
                    Position = i <= 3 ? "Team Lead" : "Software Engineer"
                });
        }

        SelectedEmployees = new List<Employee>() { TreeListData.ElementAt(2) };
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
````

## SelectedItemsChanged Event

You can respond to user selection actions through the `SelectedItemsChanged` event. The event handler receives a collection of the TreeList data model. The collection may have multiple, single, or no items in it, depending on the `SelectionMode` and the last user selection.

> The `SelectedItemsChanged` event handler cannot be awaited. To execute asynchronous operations when the user selects rows, use the [`OnRowClick`](slug:treelist-events#onrowclick) or [`OnRowDoubleClick`](slug:treelist-events#onrowdoubleclick) event instead.

>caption Using the TreeList SelectedItemsChanged event

````RAZOR
@* Select rows and handle the SelectedItemsChanged event *@

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 SelectionMode="@TreeListSelectionMode.Multiple"
                 SelectedItems="@SelectedEmployees"
                 SelectedItemsChanged="@( (IEnumerable<Employee> newSelected) => OnRowSelect(newSelected) )"
                 Pageable="true">
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.FirstName)" Title="First Name" Width="350px" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.LastName)" Title="Last Name" />
        <TreeListColumn Field="@nameof(Employee.Position)" Title="Position" Width="200px" />
    </TreeListColumns>
</TelerikTreeList>

<p><code>SelectedItemsChanged</code> fired at: @SelectedItemsChangedLog</p>

<h3>Selected Employees:</h3>

<ul>
    @foreach (Employee employee in SelectedEmployees)
    {
        <li>@employee.FirstName</li>
    }
</ul>

@code {
    private List<Employee> TreeListData { get; set; } = new();

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
        for (int i = 1; i <= 9; i++)
        {
            TreeListData.Add(new Employee()
                {
                    Id = i,
                    ParentId = i <= 3 ? null : i % 3 + 1,
                    FirstName = "First " + i,
                    LastName = "Last " + i,
                    Position = i <= 3 ? "Team Lead" : "Software Engineer"
                });
        }

        SelectedEmployees = new List<Employee>() { TreeListData.ElementAt(2) };
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
    }
}
````

## Selection When Data Changes

When the TreeList `Data` collection changes, the `SelectedItems` collection has the following behavior:

* When the user updates a selected item and the item instance is replaced, you have to also replace the selected item object in the `SelectedItems` collection. Do that in the [TreeList `OnUpdate` event](slug:treelist-editing-overview#events).
* When the user deletes a selected item, the TreeList automatically deletes it from the `SelectedItems` collection and the [`SelectedItemsChanged` event](#selecteditemschanged-event) fires.
* To select a new item in the TreeList you can use the [`OnCreate` event](slug:treelist-editing-overview#events) to update the `SelectedItems` collection.

## Equals Comparison

The items in `SelectedItems` are compared against the items in the TreeList data in order to determine which rows will be highlighted. The default framework behavior is to compare objects by reference. The data item references may not match when:

* The `SelectedItems` are obtained from a different data source than the all TreeList items, for example, from a separate service.

In such cases, the selected rows may not appear as expected. You have to [override the `Equals` method of the TreeList model class](slug:treelist-state#equals-comparison) so that the items are compared by a unique identifier rather than by reference. When you override `Equals`, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method.

## Row Selection and Other TreeList Features

The selection behavior may vary when other TreeList features are enabled, such as editing, virtualization, paging, column and row templates, row drag and drop. In such cases you need to consider certain limitations or adjust the application code.

### Selection and Editing Modes

When users edit rows, the row selection has the following behavior:

* In [`Incell` edit mode](slug:treelist-editing-incell) the row selection can work only through a [checkbox column](slug:treelist-columns-checkbox). This is required due to the overlapping pointer events that trigger selection and editing. To see how to select the row that is being edited in `InCell` edit mode without using a `<TreeListCheckboxColumn/>` check out the [Row Selection in Edit with InCell EditMode](slug:grid-kb-row-select-incell-edit) KB article. It is for the Grid component, but the concept is the same.
* [`Inline` edit mode](slug:treelist-editing-inline) and [`Popup` edit mode](slug:treelist-editing-popup) integrate with row selection without limitations.

### Selection and Virtual Scrolling

When the TreeList has [virtual scrolling](slug:treelist-virtual-scrolling), the component is able to select a range of rows with **Shift** only if all rows in that range are currently rendered. Consider the following scenario:

1. Select a row.
1. Scroll down, so that virtualization kicks in and the rendered rows are no longer the same.
1. Select another row with **Shift**.

In this case, the range selection will start from the first row that is currently rendered. Compare with [Selection and paging](#selection-and-paging) below.

### Selection and Paging

The `SelectedItems` collection persists across paging.

### Selection and Templates

When using [TreeList templates](slug:treelist-templates-overview) with row selection:

* If you are using a [TreeList column template](slug:treelist-templates-column) and you have a clickable element in the template, you can check the knowledge base article on [how to prevent row selection when the user clicks another component in the Grid column template](slug:grid-kb-row-selection-in-column-template). It is for the Grid component, but the concept is identical.
* If you are using a [row template](slug:treelist-templates-row) the TreeList cannot render a built-in [checkbox column](slug:treelist-columns-checkbox). You have to render checkboxes manually and handle their changed event to populate the `SelectedItems` collection of the TreeList. You can find an example to get started in the following thread: [Grid Row Template with Selection - Unsure how to Bind to Selected Item](https://feedback.telerik.com/blazor/1463819-grid-row-template-with-selection-unsure-how-to-bind-to-selected-item). It is for the Grid component, but the concept is identical.

### Selection and Row Drag and Drop

The TreeList clears the `SelectedItems` collection when the user drags and drops selected rows.

## See Also

* [Live Demo: TreeList Row Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
