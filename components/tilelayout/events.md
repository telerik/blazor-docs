---
title: Events
page_title: TileLayout - Events
description: Events of the TileLayout for Blazor.
slug: tilelayout-events
tags: telerik, blazor, tilelayout, events
published: True
position: 30
---

# TileLayout Events

This article explains the available events in the Telerik TileLayout for Blazor:

* [OnResize](#onresize)
* [OnReorder](#onreorder)

## OnResize

The TileLayout `OnResize` event fires when the user changes the dimensions of a tile. You can use the event to update the saved [TileLayout state](slug:tilelayout-state), or repaint a child component that needs it, such as the Telerik Chart.

The `OnResize` event provides an argument of type `TileLayoutResizeEventArgs`. It exposes an `Id` `string` property that holds the ID of the resized tile item.

>caption Handle the TileLayout OnResize event

````RAZOR
<TelerikTileLayout Columns="4"
                   Resizable="true"
                   OnResize="@OnTileLayoutResize">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Resize Me" Id="chart-tile" RowSpan="2" ColSpan="2">
            <Content>
                <TelerikChart @ref="@ChartRef" Height="100%">
                    <ChartSeriesItems>
                        <ChartSeries Type="@ChartSeriesType.Line" Data="@ChartData" />
                    </ChartSeriesItems>

                    <ChartCategoryAxes>
                        <ChartCategoryAxis Categories="@ChartCategories"></ChartCategoryAxis>
                    </ChartCategoryAxes>

                    <ChartTitle Text="Quarterly Revenue"></ChartTitle>
                </TelerikChart>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Resize Me Too" Id="text-tile" RowSpan="2">
            <Content>
                <div style="width: 100%; height: 100%; background: #fed; overflow: auto;">
                    Tile children with percentage heights may not require
                    explicit code to handle TileLayout resizing.
                </div>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" Id="tile3" ColSpan="2">
            <Content>Tile 3.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4" Id="tile4">
            <Content>Tile 4.</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@if (!string.IsNullOrEmpty(LastResizedTileId))
{
    <p>Last resized tile: <code>@LastResizedTileId</code> at <strong>@DateTime.Now.ToLongTimeString()</strong></p>
}

@code {
    private TelerikChart? ChartRef { get; set; }
    private List<object> ChartData = new List<object>() { 10, 2, 5, 6 };
    private string[] ChartCategories = new string[] { "Q1", "Q2", "Q3", "Q4" };

    private string LastResizedTileId { get; set; } = string.Empty;

    private void OnTileLayoutResize(TileLayoutResizeEventArgs args)
    {
        LastResizedTileId = args.Id;

        if (args.Id == "chart-tile")
        {
            ChartRef?.Refresh();
        }
    }
}
````


## OnReorder

The TileLayout `OnReorder` event fires when the user drags a tile to another position, so that the tile order changes. You can use the event to update the saved [TileLayout state](slug:tilelayout-state).

The `OnReorder` event provides an argument of type `TileLayoutReorderEventArgs`. It exposes an `Id` `string` property that holds the ID of the reordered tile item.

>caption Handle the TileLayout OnReorder event

````RAZOR
<TelerikTileLayout Columns="3"
                   Reorderable="true"
                   OnReorder="@OnTileLayoutReorder">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Tile 1" Id="tile1">
            <Content>Tile 1 content.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 2" Id="tile2">
            <Content>Tile 2 content.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 3" Id="tile3" RowSpan="3">
            <Content>This tile is three rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 4" Id="tile4" RowSpan="2" ColSpan="2">
            <Content>This tile is two rows tall and two columns wide.</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@if (!string.IsNullOrEmpty(LastReorderedTileId))
{
    <p>Last reordered tile: <code>@LastReorderedTileId</code> at <strong>@DateTime.Now.ToLongTimeString()</strong></p>
}

@code{
    private string LastReorderedTileId { get; set; } = string.Empty;

    private void OnTileLayoutReorder(TileLayoutReorderEventArgs args)
    {
        LastReorderedTileId = args.Id;
    }
}
````

## Next Steps

* [Manage the TileLayout State](slug:tilelayout-state).


## See Also

* [TileLayout Overview](slug:tilelayout-overview)
* [Set TabIndex Dynamically in TileLayout OnReorder](slug:tilelayout-kb-tabindex)
