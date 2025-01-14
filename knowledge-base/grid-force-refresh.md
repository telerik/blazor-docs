---
title: Force a Grid to Refresh
description: how to force a grid to refresh its data.
type: how-to
page_title: Refresh Grid Data
slug: grid-force-refresh
position: 
tags: 
ticketid: 1448335
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

Is there anyway say I can have a button click event cause a Grid to redraw? 

I'm using manual data operations, how do I use an observable collection to refresh the grid?

## Solution

There are two different cases:

* [Automatic operations](#automatic-operations)
* [Manual operations](#manual-operations)

### Automatic operations

For general cases, to refresh the rendered data in the Grid, [use an `ObservableCollection`](https://demos.telerik.com/blazor-ui/grid/observable-data). To change the entire data collection, `.Clear()` the collection first to notify the grid that this old data is gone, then create a new one with the new data.

If you don't use an `ObservableCollection`, then [create a `new` instance of the collection and set it to the `Data` parameter](slug://grid-refresh-data#new-collection-reference). A `new` instance provides a new reference, which fires the `OnParametersSet` event from the framework. This lets the Grid redraw. If you only add/remove items from the same collection, the reference to the entire data collection stays the same and the Grid is not notified of the change.

>caption Refresh grid data with automatic data source operations


````RAZOR
@* change grid data on external action. 
    Try grouping or filtering the grid, for example, then change its data through the button above it *@

<button @onclick="@ChangeGridData">change grid data</button>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    async Task ChangeGridData()
    {
        Random rnd = new Random();
        var newData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + rnd.Next(1, 100),
            Team = "team " + rnd.Next(1, 100),
            HireDate = DateTime.Now.AddDays(-rnd.Next(1, 100)).Date
        });

        // create a new collection to get a new reference
        MyData = new List<SampleData>(newData);
    }
    

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### Manual operations

When using manual operations through the [OnRead event](slug://common-features-data-binding-onread), call the component's [`Rebind()` method](slug://grid-refresh-data#rebind-method). This will force the component to fire its `OnRead` event.
