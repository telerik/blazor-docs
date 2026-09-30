---
title: Events
page_title: TileLayout - Events
description: Events of the TileLayout for Blazor.
slug: tilelayout-events
tags: telerik, blazor, tilelayout, events
published: True
position: 30
components: ["tilelayout"]
---

# TileLayout Events

This article explains the available events in the Telerik TileLayout for Blazor:

* [OnResize](#onresize)
* [OnReorder](#onreorder)

## OnResize

The TileLayout `OnResize` event fires when the user changes the dimensions of a tile. You can use the event to update the saved [TileLayout state](slug:tilelayout-state), or repaint a child component that needs it, such as the Telerik Chart.

The `OnResize` event provides an argument of type `TileLayoutResizeEventArgs`. It exposes an `Id` `string` property that holds the ID of the resized tile item.

>caption Handle the TileLayout OnResize event

<demo metaUrl="client/tilelayout/events/example-2/" height="620"></demo>


## OnReorder

The TileLayout `OnReorder` event fires when the user drags a tile to another position, so that the tile order changes. You can use the event to update the saved [TileLayout state](slug:tilelayout-state).

The `OnReorder` event provides an argument of type `TileLayoutReorderEventArgs`. It exposes an `Id` `string` property that holds the ID of the reordered tile item.

>caption Handle the TileLayout OnReorder event

<demo metaUrl="client/tilelayout/events/example-1/" height="620"></demo>

## Next Steps

* [Manage the TileLayout State](slug:tilelayout-state).


## See Also

* [TileLayout Overview](slug:tilelayout-overview)
* [Set TabIndex Dynamically in TileLayout OnReorder](slug:tilelayout-kb-tabindex)
