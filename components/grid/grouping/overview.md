---
title: Overview
page_title: Grid - Grouping
description: Enable and configure grouping in Grid for Blazor.
slug: components/grid/features/grouping
tags: telerik,blazor,grid,grouping
published: True
previous_url: /components/grid/grouping
position: 0
---

# Grid Grouping

The Grid component offers support for grouping.

* [Basics](#basics)
* [Aggregates](#aggregates)
* [Load On Demand](#load-on-demand)
* [Group From Code](#group-from-code)
* [More Examples](#more-examples)

## Basics

To enable grouping, set the grid's `Groupable` property to `true`.

Drag a column header to the group panel and the grid will create groups in the data rows based on the available values for that field. An indicator will be shown for the column that is used for grouping. The group header shows the value for the field by which it is grouping.

You can also group by multiple fields and groups for subsequent fields will be nested within their parent groups. When adding a group, you can drag it in the desired position in the list of current groups.

To remove a group setting, click the `[x]` button on its indicator in the group panel.

To prevent grouping by a field, set `Groupable="false"` on its column. This can be useful for fields with unique values like IDs or names.

You can also use [aggregates]({%slug grid-aggregates%}) for the grouped data.

>caption Enable grouping in Telerik Grid

````CSHTML
Drag the column header of the "Team" and/or "On Vacation" column to the group panel at the top

<TelerikGrid Data=@GridData Groupable="true" Pageable="true" Height="400px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
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

>caption How grouping works in the Telerik grid

![](images/grouping-overview.gif)

## Aggregates

The grid lets you define and use aggregates that it can calculate for you. You can read more about using them in the [Aggregates]({%slug grid-aggregates%}) article.

## Load On Demand

The grid can load the grouped data on demand only. This can be useful if you have many groups and you want the user to first scroll through them without having to load all their data at once. Instead, the child items for a group can be loaded only when the user expands the group. This mode can also be used with Virtual Scrolling. You can read more about this feature in the [Grid - Load Group Data On Demand]({%slug grid-group-lod%}) article.


## Group From Code

You can set the grid grouping from your code through the grid [state]({%slug grid-state%}). You can define the list of fields by which the grid is grouped and indexes of groups that will be collapsed (all groups are expanded by default).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set grouping programmatically

````CSHTML
@[template](/_contentTemplates/grid/state.md#group-from-code)
````

## More Examples

The following articles and sample projects can be helpful when implementing grouping:

* [Capture Group event]({%slug grid-state%}#get-and-override-user-action-that-changes-the-grid) - the grid state lets you know when it changes so you can capture different aspects of the change

* [Server Grouping]({%slug components/grid/manual-operations%}) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

* [Static group that is always present]({%slug grid-kb-static-group%})

## See Also

  * [Live Demo: Grid Grouping](https://demos.telerik.com/blazor-ui/grid/grouping)
  * [Grid Aggregates]({%slug grid-aggregates%})
   
  
