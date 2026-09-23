---
title: Pointers
page_title: Arc Gauge - Pointers
description: Arc Gauge for Blazor - Pointers.
slug: arc-gauge-pointers
tags: telerik,blazor,gauge,arc,overview
published: True
position: 10
components: ["arcgauge"]
---

# Arc Gauge Pointers

The pointers are the values that will be marked on the scale. You can customize them through the parameters they expose:

* [LineCap](#linecap)

* [PlaceholderColor](#placeholdercolor)

* [Color](#color)

* [Size](#size)

## LineCap

The `LineCap` parameter controls the shape of the scale ending and takes a member of the `ArcGaugePointerLineCap` enum:

* `Round` - by default the shape of the scale ending would be round

* `Butt` - setting the ArcGaugePointerLineCap to Butt would make the shape of the scale ending flat. 

>caption Change the shape of the scale.

<demo metaUrl="client/arcgauge/pointers/shape-scale-result-code-4/" height="420"></demo>

## PlaceholderColor

The `PlaceholderColor` (`string`) parameter controls the background color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the background color of the pointer.

<demo metaUrl="client/arcgauge/pointers/background-color-pointer-res-3/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the pointer.

<demo metaUrl="client/arcgauge/pointers/color-pointer-result-code-2/" height="420"></demo>

## Size

The `Size` (`double`) parameter controls the size of the pointer. 

<demo metaUrl="client/arcgauge/pointers/color-pointer-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Arc Gauge](https://demos.telerik.com/blazor-ui/arcgauge/overview)
* [Arc Gauge: Overview](slug:arc-gauge-overview)
* [Arc Gauge: Scale](slug:arc-gauge-scale)
