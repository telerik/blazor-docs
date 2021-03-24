---
title: Static Group in Grid
description: How to have a static (constant) group in the grid.
type: how-to
page_title: Static Group in Grid
slug: grid-kb-static-group
position: 
tags: 
ticketid: 1471559
res_type: kb
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
Is it possible to forbid the user to remove the grouping configured by code?

How to hide the groupable column (set from code) but show its Group Header Template?

How to prevent the user from removing a certain group setting?

How to ensure a group is always set for the grid?

I would like to not show the buttons to remove the grouping options for this grid.

## Solution
To ensure certain grid state (like always having the grid grouped by a certain field), you can use the [grid state]({%slug grid-state%}) - through its `OnStateChanged` event, you can know what the user did and [prevent or override that action]({%slug grid-state%}#get-and-override-user-action-that-changes-the-grid).

You can hide the group header or [x] buttons on group indicators with CSS rules.

Examples of both follow below, see the code comments for details.

>caption Ensure the grid is always grouped by a static field set in the code

````CSHTML
@using Telerik.DataSource;

<TelerikGrid Data="@MyData" Height="400px" Pageable="true" FilterMode="@GridFilterMode.FilterMenu" Groupable="true"
             @ref="@GridRef"
             OnStateInit="@((GridStateEventArgs<SampleData> args) => OnStateInitHandler(args))"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => OnStateChangedHandler(args))">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@nameof(SampleData.IsOnLeave)" Title="On Vacation" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> GridRef { get; set; }

    // initial state
    async Task OnStateInitHandler(GridStateEventArgs<SampleData> args)
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            GroupDescriptors = new List<GroupDescriptor>()
            {
                new GroupDescriptor()
                {
                    Member = "Team",
                    MemberType = typeof(string)
                }
            }
        };

        args.GridState = desiredState;
    }

    // ensure a certain group is always there, and always first

    async void OnStateChangedHandler(GridStateEventArgs<SampleData> args)
    {
        if (args.PropertyName == "GroupDescriptors") // grouping changed
        {
            // ensure certain state based on some condition
            // in this example - ensure that the Team field is always in the grouping
            bool isGroupedByTeam = false;
            foreach (GroupDescriptor item in args.GridState.GroupDescriptors)
            {
                if (item.Member == "Team")
                {
                    isGroupedByTeam = true;
                }
            }
            if (!isGroupedByTeam)
            {
                //prepare the desired descriptor at the desired location (in this case, first)
                List<GroupDescriptor> desiredGroups = new List<GroupDescriptor>
                {
                    new GroupDescriptor
                    {
                        Member = "Team",
                        MemberType = typeof(string),
                    }
                };

                //add the ones the user had (you may want to re-arrange their to suit your needs even if the user chose another field to be the first one
                desiredGroups.AddRange(args.GridState.GroupDescriptors);

                //set the new state to the grid
                args.GridState.GroupDescriptors = desiredGroups;
                await GridRef.SetState(args.GridState);
            }
        }
    }


    // sample data follows

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        IsOnLeave = x % 2 == 0,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

>caption Sample column declaration so it is not visible in the grid

The key thing is to set `Visible=false`, the other settings are to ensure it cannot be shown, resized, edited, moved or otherwise interracted with. Hiding it from the column chooser will also prevent the user from showing it on their own, the other settings are to showcase you can disable them, and to limit the options in case your other state modifications require that you show it at some point. You can tweak this as necessary.

````CSHTML
    <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Width="0px" VisibleInColumnChooser="false" Visible="false"
                Reorderable="false" Resizable="false" Filterable="false" Sortable="false" Groupable="false" Editable="false" Lockable="false">
    </GridColumn>
````

>caption Sample CSS rules to hide the group header and/or the [x] buttons on group indicators

````CSHTML
<style>
    /* if you add the no-group-header Class to the grid, the following rule 
    will hide the group header so the user cannot change grouping on their own */
/*    .no-group-header .k-grouping-header {
        display: none;
    }*/


    /* if you add the hide-first-x-button Class to the grid, the following rule
    will hide the [x] button from the first group indicator, so if you always keep it as the first one
    the user won't be able to remove it on their own.
    If you remove the :first-of-type pseudoclass, you can remove the [x] buttons from all groups
    */
/*    .hide-first-x-button .k-grouping-header .k-indicator-container:first-of-type .k-button.k-button-icon.k-bare {
        display: none;
    }*/
</style>
````
