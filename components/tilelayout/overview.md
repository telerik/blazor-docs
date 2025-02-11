---
title: Overview
page_title: TileLayout Overview
description: Overview of the TileLayout for Blazor.
slug: tilelayout-overview
tags: telerik,blazor,tile,layout,dashboard,overview
published: True
position: 0
---

# Blazor TileLayout Overview

The <a href = "https://www.telerik.com/blazor-ui/tilelayout" target="_blank">Blazor TileLayout component</a> is based on the two-dimensional <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">CSS grid</a> and displays its content in tiles. Users can [drag to rearrange](slug:tilelayout-reorder) and [drag to resize](slug:tilelayout-resize) tiles. The tiles can span across multiple rows and columns. This allows you to build customizable dashboards for your users, save and restore the [layout state](slug:tilelayout-state).

## Creating Blazor TileLayout

1. Use the `TelerikTileLayout` tag.
1. Set the desired number of `Columns` for the layout.
1. (optional) Configure the `Width`, `Height`, `ColumnWidth` or `RowHeight` to [define the desired dimensions of the layout](slug:tilelayout-layout) and the base size of the individual tiles.
1. (optional) set the [`Resizable`](slug:tilelayout-resize) and [`Reorderable`](slug:tilelayout-reorder) parameters to `true` to allow the user to alter the layout.
1. Add `<TileLayoutItem>` instances inside a `<TileLayoutItems>` tag. Set the `HeaderText` parameter of each tile, and add a nested `<Content>` tag for the [tile content](slug:tilelayout-tile-content).
1. (optional) Set the `RowSpan` and `ColSpan` parameters of the tiles to values larger than `1` to increase their size in the grid.

>caption Basic Tile Layout

````RAZOR
<TelerikTileLayout Columns="3"
                   RowHeight="150px"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Tile 1">
            <Content>Regular-sized first tile.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 3" RowSpan="3">
            <Content>This tile is three rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 4" RowSpan="2" ColSpan="2">
            <Content>This tile is two rows tall and two columns wide</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>
````

## Layout and Appearance

The TileLayout is based on the *CSS Grid* concept. Basically, [the component layout depends on columns and rows with predefined or automatic dimensions](slug:tilelayout-layout). You can set the spacing between rows and columns. Finally, tiles can also span over multiple rows and columns.


## Tile Content

Each tile (`<TileLayoutItem>`) in the TileLayout provides a few configuration options to [control its header and content](slug:tilelayout-tile-content).


## Resizing

Users can [resize individual tiles](slug:tilelayout-resize) for better user experience and content visibility.


## Reordering

Users can also [rearrange tiles](slug:tilelayout-reorder), according to their preferences.


## State

The [Tile Layout allows getting and setting its state](slug:tilelayout-state). The TileLayout state contains information about the tiles' order, column span and row span.


## Events

The Tile Layout fires [events when the user resizes or rearranges tiles](slug:tilelayout-events). This allows custom logic execution, refreshing of nested components and saving the [TileLayout state](slug:tilelayout-state) for later restore.


## TileLayout Parameters

The following table lists the Tile Layout parameters. Also check the [TileLayout API Reference](slug:Telerik.Blazor.Components.TelerikTileLayout) for a full list of all properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class of the `<div class="k-tilelayout">` element. Use it to [override theme styles](slug:themes-override). |
| `ColumnSpacing` | `string` <br /> (`"16px"`) | The empty space between columns. |
| `Columns` | `int` | The number of columns in the Tile Layout. |
| `ColumnWidth` | `string` | The width of one tile. If not set, the tile widths will distribute evenly. |
| `Height` | `string` | The Tile Layout height. If not set, the component will expand automatically to fit all rows. |
| `RowHeight` | `string` | The height of one tile. If not set, the base tile height will be set by the component, based on the highest tile. |
| `RowSpacing` | `string` <br /> (`"16px"`) | The empty space between rows. |
| `Reorderable` | `bool` | Enables tile reordering. |
| `Resizable` | `bool` | Enables tile resizing. If set, values for both `RowHeight` and `ColumnWidth` must also be provided. |
| `Width` | `string` | The Tile Layout width. If not set, the component will expand horizontally to fill its parent. |

### TileLayoutItem Parameters

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class of the `<div class="k-tilelayout-item">` element. Use it to [override theme styles](slug:themes-override). |
| `ColSpan` | `int` <br /> (`1`) | How many columns a tile will span over. |
| `HeaderText` | `string` | The tile header as plain text. For rich text, use a nested `<HeaderTemplate>` tag. |
| `Id` | `string` | Tile IDs are not rendered in the HTML markup. The component provides them in the [`OnReorder` and `OnResize` event arguments](slug:tilelayout-events). |
| `RowSpan` | `int` <br /> (`1`) | How many rows a tile will span over. |
| `Visible` | `bool` <br /> (`true`) | Defines the tile visibility. |


## TileLayout Reference

Use the component reference to execute methods and [get or set the TileLayout state](slug:tilelayout-state).

| Method | Description |
| --- | --- |
| `GetState` | Returns the current state of the Tile Layout as a [`TileLayoutState` object](slug:Telerik.Blazor.Components.TileLayoutState). |
| `SetState` | Applies the provided `TileLayoutState` argument as a new state of the Tile Layout. |

<div class="skip-repl"></div>

````RAZOR
<TelerikTileLayout @ref="@TileLayoutRef" />

<TelerikButton OnClick="@GetTileLayoutState">Get TileLayout State</TelerikButton>

@code{
    TelerikTileLayout TileLayoutRef { get; set; }

    async Task GetTileLayoutState()
    {
        var tileState = TileLayoutRef.GetState();
    }
}
````


## Next Steps

* [Explore Tile Layout appearance settings](slug:tilelayout-layout).
* [Find how to set tile content](slug:tilelayout-tile-content).
* Enable tile [resizing](slug:tilelayout-resize) and [reordering](slug:tilelayout-reorder).
* [Handle Tile Layout events](slug:tilelayout-events).
* [Manage the Tile Layout state](slug:tilelayout-state).


## See Also

* [Live Demo: TileLayout](https://demos.telerik.com/blazor-ui/tilelayout/overview)
* [TileLayout API Reference](slug:Telerik.Blazor.Components.TelerikTileLayout)
