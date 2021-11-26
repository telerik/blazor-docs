---
title: Sort Grouped Column
description: How can I sort the grouped column?
type: how-to
page_title: Sort Grouped Column
slug: grid-kb-sort-grouped-column
position: 
tags: grid, sort, group
ticketid: 1544054
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
I want to be able to sort the grouped column. How can I achieve this?


## Solution

At the time of writing (Telerik UI for Blazor version 2.29.0) the ability to sort the grouped column is not supported out of the box. There is a public feature request for it at [Allow sorting the Grouped Column](https://feedback.telerik.com/blazor/1544196-allow-sorting-the-grouped-column).

For the time being, you can use the [Grid State]({%slug grid-state%}) to programmatically sort the grouped column. Based on whether the Grid is grouped or not (you can also get that information from the State), you can render a button in the [Grid Toolbar]({%slug components/grid/features/toolbar%}) allowing the user to sort the groups. The UI for sorting will be a bit different than the built-in feature.

Here is an example of the described approach.

````CSHTML
@* Programmatically sort the grouped column. CRUD operations are not handled for brevity *@

@using Telerik.DataSource;

<TelerikGrid Data="@MyData" Height="500px" @ref="@Grid" Groupable="true" Sortable="true"
             Pageable="true" FilterMode="@GridFilterMode.FilterMenu"
             OnStateChanged="@((GridStateEventArgs<SampleData> args) => OnStateChangedHandler(args))">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add</GridCommandButton>

        @if (Grouped)
        {
            <TelerikButton OnClick="@SortGroup" Icon="@SortIndicator">Sort Group: @GroupName</TelerikButton>
        }
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@nameof(SampleData.IsOnLeave)" Title="On Vacation" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
        <GridCommandColumn>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {

    public TelerikGrid<SampleData> Grid { get; set; }

    public string SortIndicator { get; set; } = "sort-asc-small";

    public string GroupName { get; set; }

    public bool Grouped { get; set; }

    async void OnStateChangedHandler(GridStateEventArgs<SampleData> args)
    {
        GridState<SampleData> currState = Grid.GetState();

        if (currState.GroupDescriptors.Any())
        {
            Grouped = true;
            GroupName = currState.GroupDescriptors.FirstOrDefault().Member;
        }
        else
        {
            Grouped = false;
        }
    }

    async Task SortGroup()
    {
        GridState<SampleData> currState = Grid.GetState();

        var SortDirection = currState.GroupDescriptors.FirstOrDefault().SortDirection;

        if (Grouped)
        {
            if (SortDirection == ListSortDirection.Ascending)
            {
                SortDirection = ListSortDirection.Descending;
                SortIndicator = "sort-desc-small";
            }
            else
            {
                SortDirection = ListSortDirection.Ascending;
                SortIndicator = "sort-asc-small";
            }

            currState.GroupDescriptors.FirstOrDefault().SortDirection = SortDirection;
        }

        await Grid.SetState(currState);
    }

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