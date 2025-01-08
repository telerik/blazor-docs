---
title: Resize
page_title: TileLayout - Resize
description: Resize items in the TileLayout for Blazor.
slug: tilelayout-resize
tags: telerik,blazor,tile,layout,dashboard,resize
published: True
position: 15
---

# TileLayout Resize

Resize tiles by dragging their bottom and right borders to change the dashboard to your liking.

To enable resizing:

1. Set the `Resizable` parameter of the main `TelerikTileLayout` tag to `true`.

2. Set the  `RowHeight` and `ColumnWidth` parameters of the `TelerikTileLayout`. The provided values must be in absolute units—this allows for the layout to correctly calculate the position of each tile during resizing.

@[template](/_contentTemplates/tilelayout/basics.md#resizing-reordering-logic)

Resizing a tile fires the [OnResize event](slug://tilelayout-events#onresize).

>caption Resizing tiles in the TileLayout

````RAZOR
<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Resizable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Panel 1">
            <Content>Regular sized first panel.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" RowSpan="3">
            <Content>This tile is three rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4" RowSpan="2" ColSpan="2">
            <Content>This tile is two rows tall and two columns wide</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>
````

![resize tiles](images/tilelayout-resizing-overview.gif)


## Next Steps

* Enable [tile reordering](slug://tilelayout-reorder).
* [Handle Tile Layout events](slug://tilelayout-events).
* [Manage the Tile Layout state](slug://tilelayout-state).


## See Also

* [Overview](slug://tilelayout-overview)
* [Live Demo: TileLayout Resizing](https://demos.telerik.com/blazor-ui/tilelayout/resizing)
