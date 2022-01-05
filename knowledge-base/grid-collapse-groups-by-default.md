---
title: Collapse Grid Groups by Default 
description: Implement Collapsed Groups in the Grid on initiliaze and when paging.
type: how-to
page_title: How to Collapse Grid Groups by Default on Initialize and When Paging
slug: grid-kb-collapse-groups-by-default
position: 
tags: grid,grouping,collapse,paging
ticketid: 1545745
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

How to collapse all Grid groups by default when the Grid is loaded. The Grid should persist the expand/collapse state when paging.

## Solution

There are two ways to collapse all groups of the Grid both on initialization and after paging

* [Load groups on demand]({%slug grid-group-lod%})
* Collapse groups programmatically

The required steps to collapse groups programmatically are:

1. Use the Grid [`OnStateInit event`]({%slug grid-state%}#set-default-initial-state).
2. Set [group descriptors](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.GroupDescriptor) in the [GridState](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.GridState-1) to group the Grid by default.
3. Set `CollapsedGroups` in the `GridState`. 
4. Set a boolean flag in the Grid [`OnStateChanged event`]({%slug grid-state%}#events) when the user is paging.
5. Check the boolean flag value in `OnAfterRenderAsync` to know when to persist the groups collapsed state.


````CSHTML
@using Telerik.DataSource;

<TelerikGrid Data="@MyData" 
             Height="400px" 
             Pageable="true" 
             FilterMode="@GridFilterMode.FilterMenu" 
             Groupable="true"
             @ref="@GridRef"
             OnStateInit="@((GridStateEventArgs<SampleData> args) => OnStateInitHandler(args))"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => OnStateChangedHandler(args))">

    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {

    public TelerikGrid<SampleData> GridRef { get; set; }

    bool GridGroupFlag { get; set; } = false;

    void OnStateInitHandler(GridStateEventArgs<SampleData> args)
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
                },
                CollapsedGroups = Enumerable.Range(0, MyData.ToList().Count).ToList()
            };
        args.GridState = desiredState;
    }

    void OnStateChangedHandler(GridStateEventArgs<SampleData> args)
    {
        if (args.PropertyName == "Page")
        {
            GridGroupFlag = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (GridGroupFlag)
        {
            var gridState = GridRef.GetState();
            gridState.CollapsedGroups = Enumerable.Range(0, MyData.ToList().Count).ToList();
            GridGroupFlag = false;
        await GridRef.SetState(gridState);
    }
        await base.OnAfterRenderAsync(firstRender);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````