---
title: Multiple Rows
page_title: Grid for Blazor | Multiple Selection
description: Single row selection in the Grid for Blazor
slug: components/grid/selection/multiple
tags: telerik,blazor,grid,selection,multiple
published: True
position: 2
---

# Multiple Row Selection

The Grid component can allow the user to select many rows at a time, or to select [only one]({%slug components/grid/selection/single %}).

In this article:

* [Basics](#basics)
* [Checkbox Selection](#checkbox-selection)
* [Selected Items](#selected-items)
* [Examples](#examples)
	* [Multiple Row Selection and Checkbox](#multiple-row-selection-and-checkbox)
	* [SelectedItemsChanged Event](#selecteditemschanged-event)
	* [Two-way Binding of SelectedItems](#two-way-binding-of-selecteditems)


## Basics

To use **multiple** row selection, set the `SelectionMode` property to `Telerik.Blazor.GridSelectionMode.Multiple`.

In Multiple SelectionMode, selection could be made using the following approaches:

* Click on a row to select only that row (and deselect any others)
* Press and hold `Ctrl` and click the desired rows to select or deselect them.
* Click on the starting row of a range of rows you want selected, press and hold `Shift`, and click on the last row of the range. The last selected item is the start point of the range and the current target row is the end of the selection.
* Select the checkbox of each desired row.

>tip The [Examples](#examples) section showcases how you can use the grid features together.

## Checkbox Selection

To add checkboxes in each row that the user can use for selection, add a `GridCheckboxColumn` in the `GridColumns` collection of the grid.

The Grid allows selection and deselection of all rows on the current page via the `SelectAll` property. Setting this property to `true` (its default value) will render a checkbox in the grid header that the you can click to select whole pages.

## Selected Items

The `SelectedItemsChanged` event receives a collection of the grid data model. It may have no items in it.

You can use the `SelectedItems` collection in two-way binding. You can use this to pre-select rows for your users.

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated and you can add more items to the selection.

## Examples

### Multiple Row Selection and Checkbox

You can add a checkbox column for selection. It is required if the `InCell` edit mode is used. Otherwise, it is optional.

>caption Multiple Selection and a checkbox column.

````CSHTML
You can select items by clicking a checkbox, or by clicking the rows. The Ctrl and Shift keys let you select more than one row when clicking it.

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Multiple"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn />
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

### SelectedItemsChanged Event

You can respond to the user action of selecting a new item through the `SelectedItemsChanged` event.

>caption Multiple Selection and handling the SelectedItemsChanged event

````CSHTML
Show details for selected items via the selection changed event

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Multiple"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
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
    public List<Employee> GridData { get; set; }
    public IEnumerable<Employee> SelectedEmployees { get; set; }

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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

### Two-way Binding of SelectedItems

You can predefine the selected items for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the grid when the selection changes. Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one.

>caption Multiple Selection and two-way binding of the `SelectedItems` property

````CSHTML
Use the selected items collection

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="SelectedItems"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridCheckboxColumn />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@if (SelectedItems != null)
{
    <ul>
        @foreach (Employee employee in SelectedItems)
        {
            <li>
                @employee.Name
            </li>
        }
    </ul>
}

@code {
    public List<Employee> GridData { get; set; }
    public IEnumerable<Employee> SelectedItems { get; set; }

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

        // select Employee with 3 through 5
        SelectedItems = GridData.Skip(2).Take(3).ToList();
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Live Demo: Grid Checkbox Selection](https://demos.telerik.com/blazor-ui/grid/checkbox-selection)
  * [Single Selection]({%slug components/grid/selection/single%})
