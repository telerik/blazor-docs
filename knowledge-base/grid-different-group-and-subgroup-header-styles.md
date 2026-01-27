---
title: Apply different styles to the Grid group and subgroup headers
description: How to style the Grid group and subgroup headers in different ways?
type: how-to
page_title: Apply different styles for the Grid group and subgroup headers
slug: grid-kb-different-group-and-subgroup-header-styles
position: 
tags: grid, group, subgroup, differentiate, style, different
ticketid:
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

By default, the group and subgroup headers are styled in the exact same way and it is hard to differentiate them. I would like to style my group headers slightly different than the subgroup headers. How to achieve this?

## Solution

You can customize the default rendering of the Grid group headers through [Group Header Template](slug:grid-templates-group-header). It allows you to place the desired content in the specific group header.

For styling customizations such as changing the background, use custom CSS as shown in the example below.

>caption Add a GridColumn from code

````RAZOR
@*Different styles for the group headers and subheaders*@

Group by "Team" and then "Active Projects"

<style>
    .custom-grid .k-grouping-row td {
        padding: 0px !important;
    }
    
    .custom-grid .k-grouping-row td .k-reset .k-icon {
        position: absolute;
        margin-left: 8px;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .custom-grid .custom-group-header {
        height: 100%;
        width: 100%;
        padding-left: 31px;
        padding-top: 8px;
        padding-bottom: 8px;
    }
</style>

<TelerikGrid Class="custom-grid" Data=@GridData Groupable="true" Pageable="true" Height="650px">
    <GridAggregates>
        <GridAggregate Field=@nameof(Employee.Team) Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) Title="Team">
            <GroupHeaderTemplate>
                <div class="custom-group-header" style="background:lightblue">
                    @context.Value @* the default text you would get without the template *@
                    &nbsp;<span>Team size: @context.Count</span>
                </div>
            </GroupHeaderTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Salary) Title="Salary" Groupable="false" />
        <GridColumn Field=@nameof(Employee.ActiveProjects) Title="Active Projects">
            <GroupHeaderTemplate>
                @{
                    <div class="custom-group-header" style="background:lightgreen">
                        Currently active projects: @context.Value &nbsp;
                    </div>
                }
            </GroupHeaderTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            Random rnd = new Random();
            GridData.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    Team = "Team " + i % 3,
                    Salary = rnd.Next(1000, 5000),
                    ActiveProjects = i % 4 == 0 ? 2 : 5
                });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public decimal Salary { get; set; }
        public int ActiveProjects { get; set; }
    }
}
````
