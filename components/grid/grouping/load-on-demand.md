---
title: Load On Demand
page_title: Grid - Load Group Data On Demand
description: How to load groups and their data on demand.
slug: grid-group-lod
tags: telerik,blazor,grid,group,load,on,demand
published: True
position: 10
---

# Load On Demand Group Data

The grid component lets you load the data for each individual [group]({%slug components/grid/features/grouping%}) on demand, instead of having it always present.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand)
	* [Virtual Scrolling, Group Load On Demand and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-data-operations)

## Basics

To enable load-on-demand for the groups, set the `GroupsLoadOnDemand` parameter of the grid to `true`. In this mode, the grid behaves as usual while there is no grouping, and you can use this together with [Virtual Scrolling for the rows]({%slug components/grid/virtual-scrolling%}).

Once grouping is applied (either manually by the user, or through the grid [state]({%slug grid-state%}#set-grid-options-through-state)), the groups will now show up collapsed by default. When a group is expanded by the user its data is requested from the data source - the [OnRead event]({%slug components/grid/manual-operations%}) will fire if you are using it, and the `GroupPaging` parameter of its `DataSourceRequest` will be set to `true`. If you are not using that event, but are providing all the data to the grid, the grid will automatically handle the operation for you. Each group header and each group footer will also count as rows in the grid for the purposes of paging.


## Examples

This section contains the following examples:

* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand) - a basic example how to enable the feature
* [Virtual Scrolling, Group Load On Demand and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-data-operations) - mimics an actual data service to implement load on demand for the data when the user expands a group or when they scroll to need a new set of available groups. Also showcases how to set the initial grid state to include grouping.

### Regular Paging and Group Load On Demand

This example shows the basics of enabling the group load on demand - setting `GroupsLoadOnDemand="true"`. Group the grid by the Team and/or Vacation columns to see the effect.

````CSHTML
Drag the column header of the "Team" and/or "On Vacation" column to the group panel at the top to see the effect

<TelerikGrid Data=@GridData
             GroupsLoadOnDemand="true"
             Groupable="true"

             Navigable="true" Pageable="true" PageSize="15" Sortable="true" FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.Name)" Groupable="false" />
        <GridColumn Field="@nameof(Employee.Team)" Title="Team">
            <GroupHeaderTemplate>
                Employees in this group: @context.Count
            </GroupHeaderTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.IsOnLeave)" Title="On Vacation" />
        <GridColumn Field="@nameof(Employee.Salary)" Groupable="false">
            <GroupFooterTemplate>
                Lowest salary in this group: @context.Min
            </GroupFooterTemplate>
            <FooterTemplate>
                Total salary expenses @context.Sum
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
    <GridAggregates>
        <GridAggregate Field="@nameof(Employee.Name)" Aggregate="@GridAggregateType.Count" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Sum" />
    </GridAggregates>
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
        public decimal Salary { get; set; }
    }
}
````


### Virtual Scrolling, Group Load On Demand and Server-side Data Operations

This example shows how you can combine the virtual row scrolling feature with loading group data on demand through a remote service (mocked by a static class in this example so you can run it easily), and how to set the initial state of the grid to have grouping by default.

````CSHTML
````


## See Also

  * [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
   
  
