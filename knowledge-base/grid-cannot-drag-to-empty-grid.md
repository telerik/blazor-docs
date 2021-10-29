---
title: Cannot Drag Rows to Empty Grid
description: How to drag Grid items to an empty Grid and improve the user experience.
type: troubleshooting
page_title: Drag and Drop Items to Empty Grid Doesn't Work
slug: grid-cannot-drag-to-empty-grid
position: 
tags: grid, drag, drop, empty
ticketid: 1538763
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

I am not able to drag and drop rows to an empty Grid.  When I try to drag an item to an empty Grid, I just get the "not allowed" tooltip and cannot drop.

## Cause\Possible Cause(s)

Row drag and drop relies on a `DestinationItem` in the destination Grid. The Grid expects the user to drop over/above/below a specific table row, and always within the table boundaries. When the destination Grid has no data, there is only one row - the "no data" row or the `NoDataTemplate`. In this case, the user can only drop over this row.

## Solution

There are 3 ways to improve the user experience and make dropping easier:

* Remove the destination Grid `Height`, so that there is no empty area below the "no data" row.
* Apply a height CSS style to the default `NoDataTemplate` to expand it.
* Use a custom `NoDataTemplate` that is high enough to fill the empty Grid data area.

The example below demonstrates the first two options:

````CSHTML
<div class="box">
    <p>Source Grid</p>

    <TelerikGrid Data="@MyGridData"
                    @ref="@SourceGrid"
                    RowDraggable="true"
                    OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnGrid1RowDropHandler(args))">
        <GridSettings>
            <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
        </GridSettings>
        <GridColumns>
            <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
            <GridColumn Field="@(nameof(SampleData.Name))" Title="Name" Groupable="false" />
        </GridColumns>
    </TelerikGrid>
</div>

<div class="box">
    <p>Empty destination Grid with no Height</p>

    <TelerikGrid Data="@MyEmptyData">
        <GridColumns>
            <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
            <GridColumn Field="@(nameof(SampleData.Name))" Title="Name" Groupable="false" />
        </GridColumns>
    </TelerikGrid>
</div>

<div class="box">
    <p>Empty destination Grid with large Height and small NoDataTemplate</p>

    <TelerikGrid Data="@MyEmptyData" Height="200px" Class="empty-grid">
        <GridColumns>
            <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
            <GridColumn Field="@(nameof(SampleData.Name))" Title="Name" Groupable="false" />
        </GridColumns>
    </TelerikGrid>
</div>

<div class="box">
    <p>Empty destination Grid with larger NoDataTemplate</p>

    <style>
        /* how to expand the default NoDataTemplate */
        .my-grid-class .k-grid-norecords {
            height: 160px; /* Grid Height - 40px */
        }
    </style>

    <TelerikGrid Data="@MyEmptyData" Height="200px" Class="my-grid-class">
        <GridColumns>
            <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
            <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        </GridColumns>
    </TelerikGrid>
</div>

<style>
    /* all these styles are not relevant to the 2 alternative solutions */
    .box {
        display: inline-block;
        width: 45vw;
        margin: 1em;
    }
    .empty-grid .k-grid-content {
        background: #fdd;
    }
    .empty-grid .k-grid-norecords {
        background: #cfc;
    }
</style>

@code {
    TelerikGrid<SampleData> SourceGrid { get; set; }

    private void OnGrid1RowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        MyGridData.Remove(args.Item);
        InsertItem(args);
    }

    private void InsertItem(GridRowDropEventArgs<SampleData> args)
    {
        var destinationData = MyEmptyData;

        var destinationIndex = 0;

        if (args.DestinationItem != null)
        {
            destinationIndex = destinationData.IndexOf(args.DestinationItem);
            if (args.DropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        destinationData.InsertRange(destinationIndex, args.Items);
    }

    public List<SampleData> MyGridData = Enumerable.Range(1, 3).Select(x => new SampleData
    {
        Id = x,
        Name = "Name  " + x
    }).ToList();

    public List<SampleData> MyEmptyData = new();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````