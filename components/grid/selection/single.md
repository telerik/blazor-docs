---
title: Single Row
page_title: Grid for Blazor | Single Selection
description: Single row selection in the Grid for Blazor
slug: components/grid/selection/single
tags: telerik,blazor,grid,selection,single
published: True
position: 1
---

# Single Row Selection

The Grid component can allow the user to select only a single row at a time, or to select [multiple]({%slug components/grid/selection/multiple %}).

To use **single** row selection, set the `SelectionMode` property to `Telerik.Blazor.GridSelectionMode.Single`.

Once a selection is made in Single selection mode, it cannot be removed.

The [Examples](#examples) section showcases how you can use the grid features together.

## Checkbox Selection

In Single SelectionMode, selection is applied with a click on a row, or by clicking a checkbox if the `TelerikGridCheckboxColumn` is present in the `TelerikGridColumns` collection of the grid.

Only one row can be selected at a time, even with checkboxes enabled, so the last one that is clicked will be selected.

If you add a checkbox column, you should set its `SelectAll` parameter to `false` to disable the header checkbox that will select all rows.

## Selected Items

The `SelectedItemsChanged` event receives a collection of the grid data model that has one member only.

You can use the `SelectedItems` collection in two-way binding. You can use this to pre-select a row for your users.

The `SelectedItems` collection persists across paging operations. Changing the page will keep it populated.

## Examples

### Single Row Selection and Checkbox

You can add a checkbox column for single selection. It is required if the `InCell` edit mode is used. Otherwise, it is optional.

>caption Single Selection and a checkbox column.

````CSHTML
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             Pageable="true">
    <TelerikGridColumns>
        <TelerikGridCheckboxColumn SelectAll="false" Title="Select" Width="70px" />
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
    </TelerikGridColumns>
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

>caption Single Selection and handling the SelectedItemsChanged event

````CSHTML
@using Telerik.Blazor.Components.Grid

@if (SelectedEmployee != null)
{
    <span>Selected Employee: @SelectedEmployee.Name </span>
}

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
             Pageable="true"
             Height="400px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
    </TelerikGridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }
    public Employee SelectedEmployee { get; set; }

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

You can predefine the selected item for your users through the two-way binding of the `SelectedItems` property. The collection will be updated by the grid when the selection changes. Note that both binding to the property and using its event cannot be used at the same time, as Blazor only allows one.

>caption Single Selection and two-way binding of the `SelectedItems` property

````CSHTML
@using Telerik.Blazor.Components.Grid

Selected item: @SelectedItems.FirstOrDefault().Name

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             @bind-SelectedItems="SelectedItems"
             Pageable="true"
             Height="400px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
    </TelerikGridColumns>
</TelerikGrid>

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

        // select Employee with ID 4
        SelectedItems = GridData.Where(item => item.EmployeeId == 4).ToList();
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
  * [Multiple Selection]({%slug components/grid/selection/multiple%}})
