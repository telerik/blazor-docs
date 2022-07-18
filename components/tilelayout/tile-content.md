---
title: Tile Content
page_title: TileLayout - Tile Content
description: How to set tile content when using the TileLayout for Blazor.
slug: tilelayout-tile-content
tags: telerik,blazor,tile,layout
published: True
position: 10
---

# Tile Content

This article describes how to set the content of each TileLayout tile.

## Header and Content

To set the tile contents, you have the following options:

* The `HeaderText` is a parameter on the individual tile that renders a simple string in its header portion.

* The `HeaderTemplate` tag lets you define custom content, including components, in the header portion of the tile.

* The `Content` is a `RenderFragment` where you put the content of the tiles - it can range from simple text, to comlex components.

>caption Examples of setting content in tiles

````CSHTML
<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Simple Header Text, no content">
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Simple Header Text, some content" ColSpan="2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem ColSpan="2">
            <HeaderTemplate>
                <strong>Bold</strong> header from a template
            </HeaderTemplate>
            <Content><p>As with other render fragments, you can put <strong>any</strong> content here</p></Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>
````


## Content Scrollbars

The Tile Layout component targets modern web development and thus - responsive dimensions for the content. Therefore, we expect that most content will have `width: 100%; height: 100%;` so that it can stretch according to the size of the tile that the end user chooses.

If you want to change that (for example, because you have certain content that requires dimensions set in `px`), you can use the `Class` of the individual tile and choose the required setting for the `overflow` CSS rule of the `.k-card-body` element in that particular tile.

>caption Content scrollbars and overflow behavior in the Tile Layout

````CSHTML
<TelerikTileLayout ColumnWidth="300px"
                   RowHeight="150px"
                   Columns="3"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Responsive Content">
            <Content>
                <div style="width: 100%; height: 100%; background: cyan;">Resize this tile - my size fits it</div>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Static Content">
            <Content>
                <div style="width: 300px; height: 300px; background: yellow;">I will be cut off by default</div>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Custom Scrollbars" Class="tile-with-overflow">
            <Content>
                <div style="width: 300px; height: 300px; background: yellow;">I am contained in the tile and produce scrollbars</div>
            </Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

<style>
    .tile-with-overflow .k-card-body {
        overflow: scroll !important; /* choose a value that fits your needs */
    }
</style>
````

## Next Steps

* Enable tile [resizing]({%slug tilelayout-resize%}) and [reordering]({%slug tilelayout-reorder%}).
* [Handle Tile Layout events]({%slug tilelayout-events%}).
* [Manage the Tile Layout state]({%slug tilelayout-state%}).
