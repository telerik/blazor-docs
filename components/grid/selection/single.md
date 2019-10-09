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

>tip The [Examples](#examples) section showcases how you can use the grid features together.

## Checkbox Selection

In Single SelectionMode, selection is applied with a click on a row, or by clicking a checkbox if the `GridCheckboxColumn` is present in the `GridColumns` collection of the grid.

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
Single selection can be done by clicking a row or through a checkbox

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="false" Title="Select" Width="70px" />
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

The example below shows how to handle the `SelectedItemsChanged` event to extract information about the selected item and use it to populate a second grid with details about the selected record.

>caption Single Selection and handling the SelectedItemsChanged event

````CSHTML
Use the selection change event to show detail data

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
             Pageable="true"
             Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@if (TeamMatesList != null)
{
    <h6>@SelectedEmployee.Team</h6>
    <TelerikGrid Data="@TeamMatesList">
        <GridColumns>
            <GridColumn Field=@nameof(Employee.Name) />
        </GridColumns>
    </TelerikGrid>
}

@code {
    public List<Employee> GridData { get; set; }
    public List<Employee> TeamMatesList { get; set; }
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

    protected async Task OnSelect(IEnumerable<Employee> employees)
    {
        SelectedEmployee = employees.FirstOrDefault();
        //with single row selection, there is only one item in the collection

        //fetch actual data for the child grid here. This example filters the original data for brevity
        if(TeamMatesList == null)
        {
            TeamMatesList = new List<Employee>();
        }
        TeamMatesList.Clear();
        TeamMatesList = GridData.Where(empl => empl.Team == SelectedEmployee.Team).ToList();
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
Selected item: @SelectedItems.FirstOrDefault().Name

<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             @bind-SelectedItems="SelectedItems"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
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
  * [Multiple Selection]({%slug components/grid/selection/multiple%})
