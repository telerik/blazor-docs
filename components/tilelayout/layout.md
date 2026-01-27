---
title: Layout
page_title: TileLayout - Layout and Appearance Setings
description: Layout and apperance settings of the TileLayout for Blazor.
slug: tilelayout-layout
tags: telerik,blazor,tile,layout
published: True
position: 5
components: ["tilelayout"]
---
# TileLayout Appearance

This article describes how the TileLayout constructs its layout, and what are the parameters that affect its appearance. To understand the component behavior in more depth, get familiar with the concept of [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/) first. The TileLayout component is based on it as underlying implementation and core properties.

The TileLayout component exposes parameters that control its layout at two levels:

* [Main Element](#main-element)
* [Individual Tiles](#individual-tiles)


## Main Element

The main element defines the number of `Columns`, the `Width` and `Height` of the layout, as well as the `ColumnWidth` and `RowHeight`. 

The `ColumnWidth` and `RowHeight` define the maximum dimensions for each column and row of the main layout. As the overall component dimensions change (e.g., because of different viewports), the column and row heights might decrease to provide even distribution. A single tile can span more than one column or row.

Generally, you should use settings that allow the desired number of columns and rows (depending on their width and height) to fit in the set width and height of the entire component.

You do not, however, have to set `Width` and `Height` - the main measure is the `Columns` and it will suffice to create a layout.

Since the Tile Layout is a block element, its width defaults to `auto` in the browser, and the actual width is distributed evenly between the number of `Columns`. Setting `Height="100%"` can let the component take up its parent dimensions in terms of height as well.

If the width and height dimensions are insufficient to accommodate the defined row height and column width that the current tiles create, the actual row height and/or column width will decrease so that the appointed number of columns fit in the available width and the existing number of rows fit in the available height.

`Columns`, `Width` and `Height`  have no default values.

`ColumnWidth` and `RowHeight` default to `1fr`. Thus, you may want to omit setting a `ColumnWidth` in order to get a more responsive (fluid) layout - all columns will then have the same width - a fraction of the total width.

There are two other settings you should take into account if you set explicit dimensions to the main element - the `ColumnSpacing` and `RowSpacing` - they are CSS units that define the gaps between the individual columns and rows and count towards the total dimensions of the component. They default to `16px`.

Lastly, you can also set the `Class` parameter that renders at the main wrapping element of the tile layout so you can cascade custom CSS rules through it.


## Individual Tiles

Each tile provides settings that define how many columns and rows its takes up - the `ColSpan` and `RowSpan` parameters. It also provides a `Class` parameter so you can cascade CSS rules through it.

`ColSpan` can affect the actual number of `Columns` of the entire layout. For example, if you have a tile with `ColSpan="2"` and `Columns="1"`, the TileLayout will still have two columns.

@[template](/_contentTemplates/tilelayout/basics.md#resizing-reordering-logic)


## Next Steps

* [Find how to set tile content](slug:tilelayout-tile-content).
* Enable tile [resizing](slug:tilelayout-resize) and [reordering](slug:tilelayout-reorder).
* [Handle Tile Layout events](slug:tilelayout-events).
* [Manage the Tile Layout state](slug:tilelayout-state).


## See Also

* [TileLayout Overview](slug:tilelayout-overview)
