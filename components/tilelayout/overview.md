---
title: Overview
page_title: TileLayout Overview
description: Overview of the TileLayout for Blazor.
slug: tilelayout-overview
tags: telerik,blazor,tile,layout,dashboard,overview
published: True
position: 0
---

# TileLayout Overview

The Blazor TileLayout is based on the two-dimensional <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">CSS grid</a> and is able to display content in tiles. They can be dragged around and [rearranged]({%slug tilelayout-reorder%}) as desired by the user. The tiles can be [resized]({%slug tilelayout-resize%}) to change the way they span across the rows and columns too. This allows you to build customizable dashboards for your end users whose [state]({%slug tilelayout-state%}) they can save.

To create a basic dashboard with the TileLayout component:

1. Add the `TelerikTileLayout` tag.

1. Configure the `Width`, `Height`, `ColumnWidth` and `RowHeight` to define the desired dimensions for the layout and the base size for the individual tiles. Read more in the [Appearance Settings](#appearance-settings) section below.

1. Under its `TileLayoutItems` tag, add `TileLayoutItem` instances whose `Content` tag you can populate with the desired [content](#tile-contents).

    * Optionally, set the `RowSpan` and `ColSpan` parameters of the tiles to values larger than `1` to increase their size in the grid.

1. Optionally, set the `Resizable` and `Reorderable` parameters to `true` to allow the user to alter the layout. Read more about storing it in the [State]({%slug tilelayout-state%}) article.

>caption Basic Tile Layout with its core features

````CSHTML
<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Resizable="true"
                   Reorderable="true">
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

>caption The result from the code snippet above

![TileLayout first look](images/tilelayout-overview.png)

## Component Reference

You can use the component reference to get or set its [state]({%slug tilelayout-state%}).

````CSHTML
<TelerikTileLayout @ref="@TileLayoutRef"
                   ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Resizable="true"
                   Reorderable="true">
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

@code{
    TelerikTileLayout TileLayoutRef { get; set; }
}
````

## Appearance Settings

We recommend that you get familiar with the concept of a [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/) first - the TileLayout component is based on it as underlying implementation and core properties.

The main feature that the component exposes are divided into two levels:

* [Main Element](#main-element)
* [Individual Tiles](#individual-tiles)

### Main Element

The main element defines the number of `Columns`, the `Width` and `Height` of the layout, as well as the `ColumnWidth` and `RowHeight`. Generally, you should settings that allow the desired number of columns and rows (depending on their settings) to fit in the set width and height.

If the width and height dimensions are insufficient to accommodate that, the CSS rules will reduce the individual row height and/or column width so that the appointed number of columns fit in the available width. 

The available height will be distributed between the total number of rows if it is lower than their sum.

There are two other settings you should take into account as well - the `ColumnSpacing` and `RowSpacing` - they are CSS units that define the gaps between the individual tiles and count towards the total dimensions of the component.

### Individual Tiles

Each tile provides settings that define how many columns and rows its takes up - the `ColSpan` and `RowSpan` parameters. 

Resizing and reoredering tiles makes them snap to the dimensions of the rows and columns of the main element, and their size determines how they render - they are rendered in the first available slot that accommodates their current size, and then the next tile is rendered in the next available slot. This means that large tiles can leave small gaps that will not be filled in by tiles that come later even if they are sufficiently small to fit in them.

## Tile Contents

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

>caption The result from the code snippet above

![tile content settings](images/tilelayout-tile-content.png)

## See Also

  * [Live Demo: TileLayout](https://demos.telerik.com/blazor-ui/tilelayout/overview)
  * [Events]({%slug tilelayout-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikTileLayout)
   
