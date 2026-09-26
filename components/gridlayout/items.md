---
title: Items
page_title: GridLayout Items
description: Usage of the layout items in the GridLayout for Blazor.
slug: gridlayout-items
tags: telerik,blazor,gridlayout,items
published: True
position: 5
components: ["gridlayout"]
---

# Items

You can control the items in the GridLayout with the parameters they expose:

* [Row](#row)

* [Column](#column)

* [ColumnSpan](#columnspan)

* [RowSpan](#rowspan)

* [Example: Complex Grid Layout](#example-complex-grid-layout)


## Row

The `Row` parameter controls in which row the `GridLayoutItem` will reside. The row indexes in the component are `1-based`. If no rows are defined, the items will be displayed in `r = i / c` rows, where:

* `r` is the number of rows;

* `i` is the number of items;

* `c` is the number of columns;

>caption Distribute the GridLayout items across the rows.

<demo metaUrl="client/gridlayout/items/example-5/" height="420"></demo>

## Column

The `Column` parameter controls in which column the `GridLayoutItem` will reside. The column indexes in the component are `1-based`. If no columns are defined, the GridLayout items will be displayed in one column.

>caption Distribute the GridLayout items across the columns.

<demo metaUrl="client/gridlayout/items/example-4/" height="420"></demo>

## ColumnSpan

The `ColumnSpan` parameter defines the how many columns the item will occupy.

When you set the desired `ColumnSpan`, you should also set the `Column` parameter to specify the start position for the spanned item.

>caption Change the column span of the first item with the numeric text box

<demo metaUrl="client/gridlayout/items/example-3/" height="420"></demo>

## RowSpan

The `RowSpan` parameter defines how many rows the item will occupy.

When you set the desired `RowSpan`, you should also set the `Row` parameter to specify the start position for the spanned item.

>caption Change the row span of the first item with the numeric text box


<demo metaUrl="client/gridlayout/items/example-2/" height="420"></demo>

## Example: Complex Grid Layout

You can use the exposed parameters of the GridLayout items to create more complex layouts.

>caption Create a page layout with the GridLayout component

<demo metaUrl="client/gridlayout/items/example-1/" height="620"></demo>

## See Also

* [Overview](slug:gridlayout-overview)
