---
title: Filter the Grid by selected items
description: How to filter the Grid by selected items?
type: how-to
page_title: Filter the Grid by selected items
slug: grid-kb-filter-by-selected-items
position: 
tags: grid,filter,selected,only
ticketid: 1558031
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor,<br />
                TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to filter the Grid by the selected items?

When the user selects items on different pages, I want to force the Grid to only show the selected items. How to achieve that?

How to sort only the selected items?

## Solution

To achieve the desired result, you can simulate filtering by the selected items:

* Get the [`SelectedItems`]({%slug components/grid/selection/multiple%}#selected-items) data and assign that as Grid data - thus, the Grid will show only the selected items. This will allow the user to perform the desired data operations to the selected items only.

* To clear this "filter" and show all items (not only the selected ones), assign the actual data source to the Grid.

* Consider and choose the desired UI for triggering that custom filtering - for example, filter button or menu. Use the needed template to declare the custom filter UI in the Grid. Useful options can be the [Toolbar]({%slug components/grid/features/toolbar%}) or the [Checkbox Column Header]({%slug components/grid/columns/checkbox%}#header-template)(in case you are using [CheckBox selection]({%slug components/grid/selection/multiple%}#checkbox-selection)). 

**Key points:** 
* [Refresh the Grid]({%slug grid-refresh-data%}) each time you are changing its data, so the changes are visible in the viewport
* [Override the Equals method]({%slug components/grid/selection/overview%}#selecteditems-equals-comparison), so that the selection is preserved during filtering

>caption Show only selected items in Grid
````CSHTML
@*Select several items on different pages and then click the filter button in the Checkbox Column Header*@

<TelerikGrid Data=@GridData
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedEmployees"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn Width="90px">
            <HeaderTemplate>
                <TelerikButton OnClick="@FilterSelected" Icon="FontIcon.Filter" ThemeColor="@(selectedOnly? "primary" : "base")"></TelerikButton>
                <TelerikButton OnClick="@ClearFilter" Icon="FontIcon.FilterClear" Enabled="@selectedOnly"></TelerikButton>
            </HeaderTemplate>
        </GridCheckboxColumn>
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
    private bool selectedOnly;

    private List<Employee> GridData { get; set; }

    private IEnumerable<Employee> SelectedEmployees { get; set; } = new List<Employee>();

    private void FilterSelected()
    {
        GridData = new List<Employee>(SelectedEmployees);

        selectedOnly = true;
    }

    private void ClearFilter()
    {
        GridData = GetData();

        selectedOnly = false;
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = GetData();
    }

    private List<Employee> GetData()
    {
        var data = new List<Employee>();

        for (int i = 0; i < 30; i++)
        {
            data.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    Team = "Team " + i % 3
                });
        };

        return data;
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.EmployeeId == (obj as Employee).EmployeeId;
            }
            return false;
        }
    }
}
````
