---
title: Tooltip in Grid
description: Learn how to add Tooltips in Grid columns and explore an example that additionally shows how to load content on demand.
page_title: Tooltip in Grid
slug: tooltip-kb-in-grid
position: 
tags: telerik, blazor, grid, tooltip
res_type: kb
---


## Description

This KB article answers the following question:
 - How to add Tooltips for elements in a Grid column? 
 - How to load Tooltip content on demand?


## Solution

1. Use a [Grid column (cell) template]({%slug grid-templates-column%}) to wrap the cell content in a `<span>` or `<div>` with some CSS class.
1. Use the `TargetSelector` of the [`TelerikToolTip`]({%slug tooltip-overview%}) to attach it to the `<span>`.
1. Use the [Tooltip's Template]({%slug tooltip-template%}) and its context to load Data on demand.

````CSHTML
<p>This example shows how to load content on demand for a tooltip that targets elements inside a grid. Hover over an employee name</p>

<TelerikGrid Data="@GridData"
             Height="400px"
             Pageable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Id))" Width="120px" />
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name">
            <Template>
                @{
                    Employee employee = context as Employee;
                    <span data-employeeId="@employee.Id" class="tooltip-target">@employee.Name</span>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(Employee.Team))" Title="Team" />
    </GridColumns>
</TelerikGrid>

<TelerikTooltip TargetSelector=".tooltip-target"
                Width="250px" Height="250px" Position="@TooltipPosition.Right">
    <Template Context="ttipContext">
        <h6>Employee Details</h6>
        <hr />
        @{
            // in a real app, add defensive checks here or extract into a separate component
            // the key names is the data attribute, lowercase
            int EmployeeId = int.Parse(ttipContext.DataAttributes?["employeeid"]);

            var EmployeeDetailsData = GetEmplyeeDetails(EmployeeId);

            <div style="float:left; margin-left: 20px;">
                <p><strong>Name</strong>: @EmployeeDetailsData.Name</p>
                <p><strong>Team</strong>: @EmployeeDetailsData.Team</p>
                <p><strong>Salary</strong>: $@EmployeeDetailsData.Salary</p>
                <p><strong>Hire date</strong>: @EmployeeDetailsData.HireDate.ToShortDateString()</p>
                <p><strong>Working on</strong>: @EmployeeDetailsData.ActiveProjects projects</p>
                <p><strong>Data loaded at</strong>: @DateTime.Now.ToString("HH:mm:ss")</p>
            </div>
        }
    </Template>
</TelerikTooltip>

@code {
    private List<Employee> GridData { get; set; }

    // This shows that the Tooltip will work even if the Grid is bound after the Tooltip is initialized.
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        GridData = await GetEmployees();
        StateHasChanged();
    }

    private async Task<List<Employee>> GetEmployees()
    {
        if (GridData == null)
        {
            GridData = Enumerable.Range(1, 90).Select(x => new Employee
                {
                    Id = x,
                    Name = "name " + x,
                    Team = "team " + x % 5,
                }).ToList();
        }

        return await Task.FromResult(GridData);
    }

    private Employee GetEmplyeeDetails(int employeeId)
    {
        Random rnd = new Random();
        Employee employee = GridData.Where(empl => empl.Id == employeeId).FirstOrDefault();
        employee.Salary = rnd.Next(1000, 5000);
        employee.ActiveProjects = rnd.Next(2, 10);
        employee.HireDate = DateTime.Now.AddYears(-rnd.Next(1, 10)).AddMonths(-rnd.Next(0, 10)).AddDays(-rnd.Next(0, 10));

        return employee;
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
        public int ActiveProjects { get; set; }
        public decimal Salary { get; set; }
    }
}
````