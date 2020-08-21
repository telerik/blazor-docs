---
title: Reorder
page_title: TileLayout - Reorder
description: Reorder tiles in the TileLayout for Blazor.
slug: tilelayout-reorder
tags: telerik,blazor,tile,layout,dashboard,reorder
published: True
position: 10
---

# TileLayout Reorder

You can rearrange the tiles in the tile layout by a simple drag-and-drop of their headers to adjust the dashboard positions to your liking.

To enable reordering, set the `Reorderable` parameter of the main `TelerikTileLayout` tag to `true`.

To be able to drag and reorder a tile, it must have some [content]({%slug tilelayout-overview%}#tile-contents) in its header.

@[template](/_contentTemplates/tilelayout/basics.md#resizing-reordering-logic)

>caption Reordering tiles in the TileLayout

![reorder tiles](images/tilelayout-reordering-overview.gif)

````CSHTML
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

## See Also

  * [TileLayout Overview]({%slug tilelayout-overview%})
