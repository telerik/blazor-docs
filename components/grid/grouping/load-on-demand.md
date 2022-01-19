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
    * [Server Operations](#server-operations)
* [Examples](#examples)
	* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand)
	* [Virtual Scrolling, Group Load On Demand and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-side-data-operations)
* [Limitations](#limitations)

## Basics

To enable load-on-demand for the groups, set `LoadGroupsOnDemand="true"` for the Grid. In this mode, the Grid behaves as usual when there is no grouping, and you can use this together with [Virtual Scrolling for the rows]({%slug components/grid/virtual-scrolling%}).

Once grouping is applied (either manually by the user, or through the Grid [state]({%slug grid-state%}#set-grid-options-through-state)), the groups will now show up collapsed by default. When the user expands a group, all its rows will be requested from the data source. If you provide all the `Data` to the Grid, the component will perform the operations for you. For details about server operations, see below.

Each group header, each group footer and the Grid footer will count as rows for the purposes of paging. Until you expand a group, its child items are not counted and shown in the `Total` count for the purposes of paging.


### Server Operations

When loading data on demand through the [OnRead event]({%slug components/grid/manual-operations%}), there can be three different kinds of requests, depending on the needed data:

* If there is no grouping, the request is as usual - no additional parameters or settings are added by the Grid.

* If there is grouping and the grid needs a list of groups, the `GroupPaging` parameter of its `DataSourceRequest` will be set to `true`.

    * If the currently expanded group row has subgroups, a request is sent with the `GroupPaging` parameter set to `true`, prompting that the response must include the total of items in the sub group and return a collection of groups once again, instead of a collection of models.

    * If the Grid starts with grouping set, it will make one request for the list of all groups, and will keep them in memory for paging.

* If the currently expanded group row does not have subgroups, the `Filter` parameter of the `DataSourceRequest` will contain the group value (and the values of any subgroups) for which the items are requested. The `PageSize` of that request is set to `0` so the Grid gets all items for that group. The `OnRead` event will fire every time you expand a group to get all items for that group.

While grouping is active, paging and virtual scrolling operations do not trigger `OnRead`, because the Grid already has all the group headers and all the items from the currently expanded groups.

## Examples

This section contains the following examples:

* [Regular Paging and Group Load On Demand](#regular-paging-and-group-load-on-demand) - a basic example how to enable the feature
* [Virtual Scrolling, Group Load On Demand and Server Data Operations](#virtual-scrolling-group-load-on-demand-and-server-side-data-operations) - mimics an actual data service to implement load on demand when the user expands a group. No requests are made during scrolling. The `PageSize` determines the number of rendered rows, but not the number of expected rows in data requests. The example also shows how to set the initial Grid state to include grouping.

### Regular Paging and Group Load On Demand

This example shows the basics of enabling the group load on demand - setting `LoadGroupsOnDemand="true"`. Group the grid by the Team and/or Vacation columns to see the effect.

````CSHTML
Drag the column header of the "Team" and/or "On Vacation" column to the group panel at the top

<TelerikGrid Data="@GridData"
             LoadGroupsOnDemand="true"
             Groupable="true"
             Navigable="true" Pageable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow">
    <GridAggregates>
        <GridAggregate Field="@nameof(Employee.Team)" Aggregate="@GridAggregateType.Count" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Min" />
        <GridAggregate Field="@nameof(Employee.Salary)" Aggregate="@GridAggregateType.Sum" />
        <GridAggregate Field="@nameof(Employee.IsOnLeave)" Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field="@nameof(Employee.Name)" Groupable="false" />
        <GridColumn Field="@nameof(Employee.Team)" Title="Team">
            <GroupHeaderTemplate>
                Employees in this group: @context.Count
            </GroupHeaderTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.Salary)" Groupable="false">
            <GroupFooterTemplate>
                Lowest salary in this group: @context.Min
            </GroupFooterTemplate>
            <FooterTemplate>
                Total salary expenses @context.Sum
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.IsOnLeave)" Title="On Vacation">
            <GroupHeaderTemplate>
                Employees with "OnLeave" @context.Value : @context.Count
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
        for (int i = 0; i < 25; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0,
                Salary = rand.Next(1000, 5000)
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
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

Scroll through the groups or expand them to load their data on demand

<TelerikGrid TItem="@object"
             LoadGroupsOnDemand="true"
             Groupable="true"
             OnStateInit="@((GridStateEventArgs<object> args) => OnStateInitHandler(args))"
             OnRead="@ReadItems"
             ScrollMode="@GridScrollMode.Virtual" PageSize="20" RowHeight="60"
             Navigable="true" Sortable="true" FilterMode="@GridFilterMode.FilterRow" Height="600px">
    <GridColumns>
        <GridColumn Field="@nameof(Employee.Name)" FieldType="@typeof(string)" Groupable="false" />
        <GridColumn Field="@nameof(Employee.Team)" FieldType="@typeof(string)" Title="Team" />
        <GridColumn Field="@nameof(Employee.Salary)" FieldType="@typeof(decimal)" Groupable="false" />
        <GridColumn Field="@nameof(Employee.IsOnLeave)" FieldType="@typeof(bool)" Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    List<object> GridData { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        // sample data retrieval, see comments in the service mimic class below
        DataEnvelope<Employee> result = await MyService.GetData(args.Request);

        if (args.Request.Groups.Count > 0)
        {
            args.Data = result.GroupedData.Cast<object>().ToList();
        }
        else
        {
            args.Data = result.CurrentPageData.Cast<object>().ToList();
        }

        args.Total = result.TotalItemCount;
    }

    void OnStateInitHandler(GridStateEventArgs<object> args)
    {
        // set initial grouping
        GridState<object> desiredState = new GridState<object>()
        {
            GroupDescriptors = new List<GroupDescriptor>()
            {
                new GroupDescriptor()
                {
                    Member = "Team",
                    MemberType = typeof(string)
                },
                new GroupDescriptor()
                {
                    Member = "IsOnLeave",
                    MemberType = typeof(bool)
                }
            }
        };

        args.GridState = desiredState;
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
        public decimal Salary { get; set; }
    }

    public class DataEnvelope<T>
    {
        public List<AggregateFunctionsGroup> GroupedData { get; set; }
        public List<T> CurrentPageData { get; set; }
        public int TotalItemCount { get; set; }
    }

    public static class MyService
    {
        private static List<Employee> SourceData { get; set; }
        public static async Task<DataEnvelope<Employee>> GetData(DataSourceRequest request)
        {
            if (SourceData == null)
            {
                SourceData = new List<Employee>();
                var rand = new Random();
                for (int i = 1; i <= 2500; i++)
                {
                    SourceData.Add(new Employee()
                    {
                        EmployeeId = i,
                        Name = "Employee " + i.ToString(),
                        Team = "Team " + i % 100,
                        IsOnLeave = i % 3 == 0,
                        Salary = rand.Next(1000, 5000)
                    });
                }
            }

            await Task.Delay(500);// deliberate delay to showcase async operations, remove in a real app

            // retrieve data as needed, you can find more examples and runnable projects here
            // https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server
            var datasourceResult = SourceData.ToDataSourceResult(request);

            DataEnvelope<Employee> dataToReturn;

            if (request.Groups.Count > 0)
            {
                dataToReturn = new DataEnvelope<Employee>
                {
                    GroupedData = datasourceResult.Data.Cast<AggregateFunctionsGroup>().ToList(),
                    TotalItemCount = datasourceResult.Total
                };
            }
            else
            {
                dataToReturn = new DataEnvelope<Employee>
                {
                    CurrentPageData = datasourceResult.Data.Cast<Employee>().ToList(),
                    TotalItemCount = datasourceResult.Total
                };
            }

            return await Task.FromResult(dataToReturn);
        }
    }
}
````


## Limitations

* The expanded state of the groups is preserved during paging only, but not if sorting or filtering is applied.

* Since group headers and footers are treated like rows in the grid, the group headers may remain on a previous page from the data when you page the grid.

* If the group load on demand is used in combination with [virtual scrolling]({%slug components/grid/virtual-scrolling%}):

    * All requirements and limitations of virtual scrolling apply.
    
    * [Aggregates]({%slug grid-aggregates%}) are not supported.

* When exporting only the current Grid page (`AllPages="false"`), the exported file will not contain child data for collapsed groups.

## See Also

  * [Live Demo: Grid Group Load On Demand](https://demos.telerik.com/blazor-ui/grid/group-loadondemand)
   
  
