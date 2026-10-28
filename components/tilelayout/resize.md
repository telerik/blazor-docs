---
title: Resize
page_title: TileLayout - Resize
description: Resize items in the TileLayout for Blazor.
slug: tilelayout-resize
tags: telerik,blazor,tile,layout,dashboard,resize
published: True
position: 15
components: ["tilelayout"]
---

# TileLayout Resize

Resize tiles by dragging their bottom and right borders to change the dashboard to your liking.

To enable resizing:

1. Set the `Resizable` parameter of the main `TelerikTileLayout` tag to `true`.

2. Set the  `RowHeight` and `ColumnWidth` parameters of the `TelerikTileLayout`. The provided values must be in absolute units—this allows for the layout to correctly calculate the position of each tile during resizing.

@[template](/_contentTemplates/tilelayout/basics.md#resizing-reordering-logic)

Resizing a tile fires the [OnResize event](slug:tilelayout-events#onresize).

>caption Resizing tiles in the TileLayout

<demo metaUrl="client/tilelayout/resize/example-1/" height="720"></demo>

## Next Steps

* Enable [tile reordering](slug:tilelayout-reorder).
* [Handle Tile Layout events](slug:tilelayout-events).
* [Manage the Tile Layout state](slug:tilelayout-state).


## See Also

* [Overview](slug:tilelayout-overview)
* [Live Demo: TileLayout Resizing](https://demos.telerik.com/blazor-ui/tilelayout/resizing)
