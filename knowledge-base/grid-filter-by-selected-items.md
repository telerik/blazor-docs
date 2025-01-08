---
title: Filter the Grid by selected items
description: How to filter the Grid by Selected Items?
type: how-to
page_title: Filter the Grid by selected items
slug: grid-kb-filter-by-selected-items
position: 
tags: grid,filter,selected
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

How can I achieve the following with the Blazor Grid:

* How to filter the Grid, so that it shows only the selected items on different pages.
* If specific items are selected, I want to sort only the selected items.

## Solution

To simulate filtering by the selected items:

1. Get the `SelectedItems` data and assign it as Grid data. Thus, the Grid will show only the selected items. This will allow the user to perform the desired data operations only to the selected items.

1. To clear this "filter" and show all items (not only the selected ones), assign the actual data source to the Grid.

1. Consider and choose the desired UI for triggering that custom filtering, for example, a filter button or menu. Use the needed template to declare the custom filter UI in the Grid. Useful options can be the [Toolbar](slug://components/grid/features/toolbar) or the [Checkbox Column Header](slug://components/grid/columns/checkbox#header-template)(in case you are using [CheckBox selection](slug://grid-selection-row#basics)).

> [Override the `Equals` method](slug://grid-selection-row#equals-comparison) so that the selection is preserved during filtering.

The data assignment will vary depending on the [data binding type you are using for the Grid](slug://grid-data-binding#basics). See examples below:
* [Data binding through the Data parameter](#data-binding-through-the-data-parameter)
* [Data binding through the OnRead event](#data-binding-through-the-onread-event)

### Data binding through the Data parameter

Assign the `SelectedItems` to the [`Data` parameter](slug://common-features-data-binding-overview) of the Grid. [Refresh the Grid](slug://grid-refresh-data) each time you change its data so the changes are visible in the viewport.

>caption Show only selected items in Grid using the Data parameter

````RAZOR
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
                <TelerikButton OnClick="@FilterSelected" Icon="SvgIcon.Filter" ThemeColor="@(selectedOnly? "primary" : "base")"></TelerikButton>
                <TelerikButton OnClick="@ClearFilter" Icon="SvgIcon.FilterClear" Enabled="@selectedOnly"></TelerikButton>
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
    private List<Employee> GridData { get; set; }

    private IEnumerable<Employee> SelectedEmployees { get; set; } = new List<Employee>();

    private bool selectedOnly { get; set; }

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

### Data binding through the OnRead event

Bind the Grid [through the `OnRead` event](slug://common-features-data-binding-onread).

Toggle a flag when the user initiates the filtering. Then call the `Rebind` method - this will force the Grid to fire its `OnRead` event. 

Depending on the flag value, you can make the request based on the corresponding data source - the `SelectedItems` collection or the actual data source. 

>caption Show only selected items in Grid using the OnRead event

````RAZOR
@*Select several items on different pages and then click the filter button in the Checkbox Column Header*@

@using Telerik.DataSource.Extensions

<TelerikGrid @ref="@GridRef"
             TItem="@Employee"
             OnRead="@ReadItems"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedEmployees"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn Width="90px">
            <HeaderTemplate>
                <TelerikButton OnClick="@FilterSelected" Icon="SvgIcon.Filter" ThemeColor="@(selectedOnly? "primary" : "base")"></TelerikButton>
                <TelerikButton OnClick="@ClearFilter" Icon="SvgIcon.FilterClear" Enabled="@selectedOnly"></TelerikButton>
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
    private TelerikGrid<Employee> GridRef { get; set; }

    private IEnumerable<Employee> SelectedEmployees { get; set; } = new List<Employee>();

    public List<Employee> SourceData { get; set; }

    private bool selectedOnly { get; set; }

    private void FilterSelected()
    {
        selectedOnly = true;

        GridRef?.Rebind();
    }

    private void ClearFilter()
    {
        selectedOnly = false;

        GridRef?.Rebind();
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        await Task.Delay(1000); //simulate network delay from a real async call

        var datasourceResult = new Telerik.DataSource.DataSourceResult();

        if (selectedOnly)
        {
            datasourceResult = SelectedEmployees.ToDataSourceResult(args.Request);
        }
        else
        {
            datasourceResult = SourceData.ToDataSourceResult(args.Request);
        }

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
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

## See Also

* [Data Binding to through the `Data` parameter](slug://common-features-data-binding-overview)
* [Data Binding to through the `OnRead` event](slug://common-features-data-binding-onread)
