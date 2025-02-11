---
title: Reorder
page_title: TileLayout - Reorder
description: Reorder tiles in the TileLayout for Blazor.
slug: tilelayout-reorder
tags: telerik,blazor,tile,layout,dashboard,reorder
published: True
position: 20
---

# TileLayout Reorder

You can rearrange the tiles in the tile layout by a simple drag-and-drop of their headers to adjust the dashboard positions to your liking.

To enable reordering, set the `Reorderable` parameter of the main `TelerikTileLayout` tag to `true`.

To be able to drag and reorder a tile, it must have some [content](slug:tilelayout-tile-content) in its header.

@[template](/_contentTemplates/tilelayout/basics.md#resizing-reordering-logic)

Reordering a tile fires the [OnReorder event](slug:tilelayout-events#onreorder).

> When the tile layout allows reordering, it captures mouse events in the tile headers. Thus, if you put components in the `HeaderTemplate` of the tiles, they may not function as expected. For example, you may not be able to focus inputs with the mouse. The header is designed for presentation purposes and to allow dragging. We recommend putting editors or complex content in the `Content` of the tiles.

>caption Reordering tiles in the TileLayout

````RAZOR
<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Panel 1">
            <Content>Regular sized first panel.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" RowSpan="2">
            <Content>This tile is two rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4" RowSpan="2" ColSpan="2">
            <Content>This tile is two rows tall and two columns wide</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>
````

![reorder tiles](images/tilelayout-reordering-overview.gif)


## Next Steps

* [Handle Tile Layout events](slug:tilelayout-events).
* [Manage the Tile Layout state](slug:tilelayout-state).


## See Also

* [Overview](slug:tilelayout-overview)
* [Live Demo: TileLayout Reordering](https://demos.telerik.com/blazor-ui/tilelayout/reordering)
