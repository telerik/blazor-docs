---
title: Layout
page_title: StackLayout Layout
description: Layout settings of the StackLayout for Blazor.
slug: stacklayout-layout
tags: telerik,blazor,stacklayout,layout
published: True
position: 5
components: ["stacklayout"]
---

# Layout

The StackLayout component provides the following parameters that control its appearance:

* [Orientation](#orientation)

* [Spacing](#spacing)

* [HorizontalAlign](#horizontalalign)

* [VerticalAlign](#verticalalign)


## Orientation

The `Orientation` parameter controls whether the items nested inside the `TelereikStackLayout` will be aligned horizontally or vertically. It takes a member of the `StackLayoutOrientation` enum:

* `Horizontal` - by default the items will be aligned horizontally.

* `Vertical`

>caption Change the orientation of the StackLayout from the DropDownList

<demo metaUrl="client/stacklayout/layout/example-4/" height="420"></demo>

## Spacing

The `Spacing` parameter controls the spacing of the elements nested inside the `TelerikStackLayout`. That parameter is mapped to the <a href="https://css-tricks.com/almanac/properties/g/gap/">gap</a> CSS rule and accepts each value you can pass to the `gap` CSS rule.

>caption Use the NumericTextBox to alter the Spacing parameter

<demo metaUrl="client/stacklayout/layout/example-3/" height="420"></demo>

## HorizontalAlign

The `HorizontalAlign` parameter controls the alignment of the items in the `TelerikStackLayout` based on the X axis. Takes a member of the `StackLayoutHorizontalAlign` enum:

* `Left`

* `Right`

* `Center`

* `Stretch` - by default the items will be stretched, which means that they will take all the available space. 

>caption Change the alignment of the StackLayout from the DropDownList

<demo metaUrl="client/stacklayout/layout/example-2/" height="420"></demo>

## VerticalAlign

The `VerticalAlign` parameter controls the alignment of the items in the `TelerikStackLayout` based on the Y axis. Takes a member of the `StackLayoutVerticalAlign` enum:

* `Top`

* `Bottom`

* `Center`

* `Stretch` - by default the items will be stretched, which means that they will take all the available space. 

>caption Change the alignment of the StackLayout from the DropDownList

<demo metaUrl="client/stacklayout/layout/example-1/" height="420"></demo>

## See Also

* [Overview](slug:stacklayout-overview)