---
title: Drag and Drop Items between Grids in Different Components
description: Learn how to drag and drop data items between Telerik Blazor Grids, TreeLists, or TreeViews which are nested inside different parent components.
type: how-to
page_title: How to Drag and Drop Items between Grids in Different Parent Components
slug: grid-kb-drag-drop-in-different-components
tags: telerik, blazor, grid, treelist, treeview, drag and drop
ticketid: 
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor, <br />
                TreeView for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB shows how to implement drag and drop between two Telerik components, which are inside different parent Razor components.

## Solution

You can approach drag and drop across different parent components in at least two ways:

* Use parameters and `EventCallback`s to pass information between the two parent Razor components, which hold the Telerik components. This is a suitable approach if the two parent components are siblings in their parent.
* Use a state management service in your app, which will execute methods and fire events to the Razor components that hold the Telerik components. This is a suitable approach in all cases, but especially if the two parent components are further away in the app component hierarchy.

The described algorithm and the example below are applicable for the [Grid](slug:grid-drag-drop-overview), [TreeList](slug:treelist-drag-drop-overview), and [TreeView](slug:treeview-drag-drop-overview).

## Example

The following example includes three files:

* `GridContainer.razor` is a Razor component that contains a Grid with enabled row drag and drop.
* `Home.razor` is a component (page) that holds two `GridContainer` instances.
* `GridModel.cs` is the Grid model class.

Adjust the `YourAppName` namespace in `Home.razor` and `GridModel.cs` to run the code successfully in your app.

<div class="skip-repl"></div>

````RAZOR Home.razor
@page "/"

@using YourAppName.Data

<h2>Grid 1</h2>
<GridContainer OnItemsDropped="@OnGridItemsDropped"
               @bind-GridData="@Grid1Data"
               @bind-GridRef="@Grid1Ref" />

<h2>Grid 2</h2>
<GridContainer OnItemsDropped="@OnGridItemsDropped"
               @bind-GridData="@Grid2Data"
               @bind-GridRef="@Grid2Ref" />

@code {
    private TelerikGrid<GridModel>? Grid1Ref { get; set; }

    private TelerikGrid<GridModel>? Grid2Ref { get; set; }

    private List<GridModel> Grid1Data { get; set; } = Enumerable.Range(1, 5).Select(x => new GridModel
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    private List<GridModel> Grid2Data { get; set; } = Enumerable.Range(6, 5).Select(x => new GridModel
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    private void OnGridItemsDropped(GridRowDropEventArgs<GridModel> args)
    {
        var destinationData = args.DestinationGrid == Grid1Ref ? Grid1Data : Grid2Data;
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
}
````
````RAZOR GridContainer.razor
@using YourAppName.Data

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@GridModel"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<GridModel> args) => OnGridRowDrop(args))"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@GridSelectedItems"
             Height="300px">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(GridModel.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" />
        <GridColumn Field="@(nameof(GridModel.Id))" Width="120px" />
        <GridColumn Field="@(nameof(GridModel.Name))" Groupable="false" />
    </GridColumns>
</TelerikGrid>

@code {
    [Parameter]
    public EventCallback<GridRowDropEventArgs<GridModel>> OnItemsDropped { get; set; }

    [Parameter]
    public List<GridModel> GridData { get; set; } = new();

    [Parameter]
    public EventCallback<List<GridModel>> GridDataChanged { get; set; }

    [Parameter]
    public TelerikGrid<GridModel>? GridRef { get; set; }

    [Parameter]
    public EventCallback<TelerikGrid<GridModel>> GridRefChanged { get; set; }

    private IEnumerable<GridModel> GridSelectedItems { get; set; } = new List<GridModel>();

    private async Task OnGridRowDrop(GridRowDropEventArgs<GridModel> args)
    {
        // Remove items from the source Grid
        GridData.RemoveAll(x => args.Items.Contains(x));
        await GridDataChanged.InvokeAsync(GridData);

        if (OnItemsDropped.HasDelegate)
        {
            // Add items to the destination Grid
            await OnItemsDropped.InvokeAsync(args);
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && GridRefChanged.HasDelegate)
        {
            // Pass the Grid component references to the parent component
            await GridRefChanged.InvokeAsync(GridRef);
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````
````C# GridModel.cs
namespace YourAppName.Data
{
    public class GridModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}
````

## See Also

* [Grid Drag and Drop Documentation](slug:grid-drag-drop-overview)
* [TreeList Drag and Drop Documentation](slug:treelist-drag-drop-overview)
* [TreeView Drag and Drop Documentation](slug:treeview-drag-drop-overview)
