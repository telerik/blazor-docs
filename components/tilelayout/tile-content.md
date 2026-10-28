---
title: Tile Content
page_title: TileLayout - Tile Content
description: How to set tile content when using the TileLayout for Blazor.
slug: tilelayout-tile-content
tags: telerik,blazor,tile,layout
published: True
position: 10
components: ["tilelayout"]
---

# Tile Layout Content

This article describes how to set the content of each TileLayout tile.

## Header and Content

To set the tile contents, you have the following options:

* The `HeaderText` is a parameter on the individual tile that renders a simple string in its header portion.

* The `HeaderTemplate` tag lets you define custom content, including components, in the header portion of the tile.

* The `Content` is a `RenderFragment` where you put the content of the tiles - it can range from simple text, to complex components.

>caption Set header and content of tiles

<demo metaUrl="client/tilelayout/tile-content/example-2/" height="550"></demo>


## Content Scrollbars

The Tile Layout component targets modern web development and thus - responsive dimensions for the content. Therefore, we expect that most content will have `width: 100%; height: 100%;` so that it can stretch according to the size of the tile that the end user chooses.

If you want to change that (for example, because you have certain content that requires dimensions set in `px`), you can use the `Class` of the individual tile and choose the required setting for the `overflow` CSS rule of the `div.k-tilelayout-item-body` element in that particular tile.

>caption Content scrollbars and overflow behavior in the Tile Layout

<demo metaUrl="client/tilelayout/tile-content/example-1/" height="420"></demo>

## Next Steps

* Enable tile [resizing](slug:tilelayout-resize) and [reordering](slug:tilelayout-reorder).
* [Handle Tile Layout events](slug:tilelayout-events).
* [Manage the Tile Layout state](slug:tilelayout-state).
