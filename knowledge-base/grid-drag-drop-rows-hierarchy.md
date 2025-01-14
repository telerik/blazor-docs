---
title: Drag and Drop Grid Rows in Hierarchy
description: Learn how to implement and setup drag-and-drop in hierarchical Blazor Grid scenarios. Enable or disable dragging and dropping in specific Grid instances in the hierarchy.
type: how-to
page_title: How to Drag and Drop Grid Rows in Hierarchy
slug: grid-kb-drag-drop-rows-hierarchy
tags: blazor, grid, hierarchy, drag and drop
ticketid: 1675157
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to configure drag-and-drop in a hierarchy of Telerik Grids for Blazor?
* How to drag detail rows from a child Grid and drop them on the master (parent) Grid?
* How to prevent users from dragging and dropping master Grid rows to detail (child) Grids?

## Solution

1. Configure the [Grid hierarchy](slug://components/grid/features/hierarchy) with a `<DetailTemplate>`.
1. [Set `RowDraggable="true"` and handle the `OnRowDrop` event](slug://grid-drag-drop-overview) for the master or detail Grids.
1. [Set unique `@ref` attributes to all detail Grid instances](slug://common-kb-dynamic-refs).
1. [Set unique `@key` attributes to all detail Grid instances](slug://grid-kb-using-components-in-templates).
1. (optional) Disable dragging from certain Grids. Use custom CSS to hide specific drag columns. The example below shows how to do this separately for each Grid instance in the hierarchy.
1. (optional) Disable dropping to certain Grid instances. Use logic in the `OnRowDrop` event handlers. The example below prevents dragging and dropping of master rows to the detail Grids.

>caption Drag and drop rows in Grid hierarchy

````RAZOR
<TelerikGrid @ref="@MasterGridRef"
             Data="@MasterGridData"
             TItem="@GridModel"
             Class="@( MasterGridDrag ? string.Empty : "no-drag-column" )"
             RowDraggable="true"
             OnRowDrop="@OnMasterGridDrop"
             OnStateInit="@OnMasterGridInit">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(GridModel.Text)" />
    </GridSettings>
    <GridToolBarTemplate>
        <label class="grid-label"><TelerikCheckBox @bind-Value="@MasterGridDrag" /> Allow Dragging</label>
        <span class="k-separator"></span>
        <label class="grid-label"><TelerikCheckBox @bind-Value="@MasterGridDrop" /> Allow Dropping</label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(GridModel.Id))" Width="120px" />
        <GridColumn Field="@(nameof(GridModel.ParentId))" Width="120px" />
        <GridColumn Field="@(nameof(GridModel.Text))" />
    </GridColumns>
    <DetailTemplate>
        @{
            var masterItem = (GridModel)context;
            if (!DetailGridConfig.ContainsKey(masterItem.Id))
            {
                DetailGridConfig.Add(masterItem.Id, new() { GridRef = new TelerikGrid<GridModel>() });
            }
        }
        <TelerikGrid @key="@( $"grid-detail-key-{masterItem.Id}" )"
                     @ref="@DetailGridConfig[masterItem.Id].GridRef"
                     Data="@DetailGridData.Where(x => x.ParentId == masterItem.Id)"
                     TItem="@GridModel"
                     Class="@( DetailGridConfig[masterItem.Id].AllowDrag ? string.Empty : "no-drag-column" )"
                     RowDraggable="true"
                     OnRowDrop="@OnDetailGridDrop">
            <GridSettings>
                <GridRowDraggableSettings DragClueField="@nameof(GridModel.Text)"></GridRowDraggableSettings>
            </GridSettings>
            <GridToolBarTemplate>
                <label class="grid-label">
                    <TelerikCheckBox Value="@DetailGridConfig[masterItem.Id].AllowDrag"
                                     ValueChanged="@( (bool newValue) => DetailGridDragChanged(newValue, masterItem.Id) )" />
                    Allow Dragging
                </label>
                <span class="k-separator"></span>
                <label class="grid-label">
                    <TelerikCheckBox Value="@DetailGridConfig[masterItem.Id].AllowDrop"
                                     ValueChanged="@( (bool newValue) => DetailGridDropChanged(newValue, masterItem.Id) )" />
                    Allow Dropping
                </label>
            </GridToolBarTemplate>
            <GridColumns>
                <GridColumn Field="@(nameof(GridModel.Id))" Width="120px" />
                <GridColumn Field="@(nameof(GridModel.ParentId))" Width="120px" />
                <GridColumn Field="@(nameof(GridModel.Text))" />
            </GridColumns>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

<style>
    .grid-label {
        display: inline-flex;
        gap: .3em;
    }

    /* master header area */
    .no-drag-column > div > .k-grid-header .k-drag-col {
        width: 0;
    }

    .no-drag-column > div > .k-grid-header .k-drag-cell + th {
        border-left-width: 0;
    }

    .no-drag-column > div > .k-grid-header .k-drag-cell * {
        display: none;
    }

    /* detail data area */
    .no-drag-column > div > .k-grid-container > .k-grid-content > div > div > table > colgroup > .k-drag-col {
        width: 0;
    }

    .no-drag-column > div > .k-grid-container > .k-grid-content > div > div > table > tbody > tr > .k-drag-cell + td,
    .no-drag-column > div > .k-grid-container > .k-grid-content > div > div > table > tbody > tr > .k-hierarchy-cell {
        border-left-width: 0;
    }

    .no-drag-column > div > .k-grid-container > .k-grid-content > div > div > table > tbody > tr > .k-drag-cell * {
        display: none;
    }
</style>

@code {
    private TelerikGrid<GridModel>? MasterGridRef { get; set; }
    private Dictionary<int, GridDragDropDescriptor> DetailGridConfig { get; set; } = new();

    private bool MasterGridDrag { get; set; } = true;
    private bool MasterGridDrop { get; set; } = true;

    private void OnMasterGridDrop(GridRowDropEventArgs<GridModel> args)
    {
        if (!MasterGridDrop || args.DestinationGrid != MasterGridRef)
        {
            return;
        }

        MasterGridData.Remove(args.Item);
        InsertGridItem(args);
    }

    private void OnDetailGridDrop(GridRowDropEventArgs<GridModel> args)
    {
        if (args.DestinationGrid != MasterGridRef)
        {
            int masterId = DetailGridConfig.First(x => x.Value.GridRef == args.DestinationGrid).Key;

            if (!DetailGridConfig[masterId].AllowDrop)
            {
                return;
            }
        }
        else if (!MasterGridDrop)
        {
            return;
        }

        DetailGridData.Remove(args.Item);
        InsertGridItem(args);
    }

    private void InsertGridItem(GridRowDropEventArgs<GridModel> args)
    {
        List<GridModel> destinationGridData = new();
        int? newParentId = null;

        if (args.DestinationGrid == MasterGridRef)
        {
            destinationGridData = MasterGridData;
        }
        else
        {
            destinationGridData = DetailGridData;
            newParentId = DetailGridConfig.First(x => x.Value.GridRef == args.DestinationGrid).Key;
        }

        var destinationIndex = 0;

        if (args.DestinationItem != null)
        {
            destinationIndex = destinationGridData.IndexOf(args.DestinationItem);
            if (args.DropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        foreach (GridModel item in args.Items)
        {
            item.ParentId = newParentId;
        }

        destinationGridData.InsertRange(destinationIndex, args.Items);
    }

    private void DetailGridDragChanged(bool newValue, int masterId)
    {
        DetailGridConfig[masterId].AllowDrag = newValue;
    }

    private void DetailGridDropChanged(bool newValue, int masterId)
    {
        DetailGridConfig[masterId].AllowDrop = newValue;
    }

    private void OnMasterGridInit(GridStateEventArgs<GridModel> args)
    {
        args.GridState.ExpandedItems = MasterGridData;
    }

    private List<GridModel> MasterGridData { get; set; } = Enumerable.Range(1, 3).Select(x => new GridModel
    {
        Id = x,
        ParentId = null,
        Text = "Text " + (x)
    }).ToList();

    private List<GridModel> DetailGridData { get; set; } = Enumerable.Range(1, 9).Select(x => new GridModel
    {
        Id = 100 + x,
        ParentId = x % 3 + 1,
        Text = "Text  " + (100 + x)
    }).ToList();

    public class GridModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; } = string.Empty;
    }

    public class GridDragDropDescriptor
    {
        public TelerikGrid<GridModel>? GridRef { get; set; }
        public bool AllowDrag { get; set; } = true;
        public bool AllowDrop { get; set; } = true;
    }
}
````

## See Also

* [Grid Hierarchy](slug://components/grid/features/hierarchy)
* [Grid Drag and Drop](slug://grid-drag-drop-overview)
* [Set `@ref` to Detail Grids](slug://common-kb-dynamic-refs)
* [Use `@key` in Grid Templates](slug://grid-kb-using-components-in-templates)
