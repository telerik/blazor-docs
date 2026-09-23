---
title: Pointers
page_title: Circular Gauge - Pointers
description: Circular Gauge for Blazor - Pointers.
slug: circular-gauge-pointers
tags: telerik,blazor,circular,gauge,pointers
published: True
position: 10
components: ["circulargauge"]
---

# Circular Gauge Pointers

The pointers are the values that will be marked on the scale. You can customize them through the parameters they expose:

* [LineCap](#linecap)

* [PlaceholderColor](#placeholdercolor)

* [Color](#color)

* [Size](#size)

## LineCap

The `LineCap` parameter controls the shape of the scale ending and takes a member of the `CircularGaugePointerLineCap` enum:

* `Round` - by default the shape of the scale ending would be round

* `Butt` - flat scale ending shape

>caption Change the shape of the scale.

<demo metaUrl="client/circulargauge/pointers/pointer-shape-4/" height="420"></demo>

## PlaceholderColor

The `PlaceholderColor` (`string`) parameter controls the background color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the background color of the pointer.

<demo metaUrl="client/circulargauge/pointers/pointer-background-3/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the pointer.

<demo metaUrl="client/circulargauge/pointers/pointer-color-2/" height="420"></demo>

## Size

The `Size` (`double`) parameter controls the size of the pointer.

![larger pointer size](images/pointer-size-circular.png)

<demo metaUrl="client/circulargauge/pointers/pointer-color-1/" height="420"></demo>

## See Also

* [Live Demo: Circular Gauge](https://demos.telerik.com/blazor-ui/circulargauge/overview)
* [Circular Gauge: Overview](slug:circular-gauge-overview)
* [Circular Gauge: Scale](slug:circular-gauge-scale)
* [Circular Gauge: Labels](slug:circular-gauge-labels)
