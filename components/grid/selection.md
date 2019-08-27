---
title: Selection
page_title: Grid for Blazor | Selection
description: Enable and configure selection in Grid for Blazor
slug: components/grid/features/selection
tags: telerik,blazor,grid,selection
published: True
position: 22
---

# Grid Selection

The Grid component offers support for row selection.

You can configure the selection by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The row selection can be:

* `Single`
* `Multiple`

You can configure initial selected items by setting the `SelectedItems` property to a collection of items from the Grid's `Data`. You could either use two-way binding, or `SelectedItemsChanged` event to track user selection.

The Grid supports selection via a checkbox column to be used. To define it, add a `TelerikGridCheckboxColumn` in the `TelerikGridColumns` collection of the grid.

## Single Selection

In Single SelectionMode, selection is applied via a click on a row, or clicking a checkbox if `TelerikGridCheckboxColumn` is configured.

>caption Single Selection and SelectedItemsChanged usage

````CSHTML
@using Telerik.Blazor.Components.Grid
@if (SelectedEmployee != null)
{
    <span>Selected Employee: @SelectedEmployee.Name </span>
}
<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Single"
             SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))" Height="400px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
        <TelerikGridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </TelerikGridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }
    public Employee SelectedEmployee { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
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
        public bool IsOnLeave { get; set; }
    }
}

````

## Multiple Selection

In Multiple SelectionMode, selection could be made using the following approaches:

* Select the checkbox of each desired row, or
* Press and hold `Ctrl`, and click the desired rows

For range selection, you could use the `Shift` key and click the row you want to be the last in the range. As a result, all rows between the initially selected row and the last one are selected.

>caption Multiple Selection and SelectedItems two-way binding

````CSHTML
@using Telerik.Blazor.Components.Grid

<h3>
    Selected Employees:
</h3>
<ul>
    @foreach (Employee employee in Employees.ToList())
    {
        <li>
            @employee.Name
        </li>
    }
</ul>
<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@Employees" Height="400px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
        <TelerikGridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </TelerikGridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }
    public IEnumerable<Employee> Employees { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }

        Employees = GridData.Take(2);
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

## Checkbox Support

Configure `TelerikGridCheckboxColumn` to render a checkbox column to enhance the selection user experience.

The Grid allows selection and deselection of rows on a page via the `SelectAll` property. This property will render a checkbox in the grid header that could be used for selection of whole pages.

>caption Checkbox support

````CSHTML
@using Telerik.Blazor.Components.Grid
<TelerikGrid Data=@GridData
             SelectionMode="GridSelectionMode.Multiple"
             Height="265px"
             Pageable="true"
             PageSize="5">
    <TelerikGridColumns>
        <TelerikGridCheckboxColumn SelectAll="true"></TelerikGridCheckboxColumn>
        <TelerikGridColumn Field=@nameof(Employee.Name) />
        <TelerikGridColumn Field=@nameof(Employee.Team) Title="Team" />
        <TelerikGridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </TelerikGridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

>note Selection in `Incell` EditMode could be applied only via a checkbox column. This is required due to the overlapping action that triggers selection and incell editing.


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)

