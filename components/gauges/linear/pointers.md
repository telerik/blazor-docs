---
title: Pointers
page_title: Linear Gauge - Pointers
description: Linear Gauge for Blazor - Pointers.
slug: linear-gauge-pointers
tags: telerik,blazor,linear,gauge,overview
published: True
position: 10
components: ["lineargauge"]
---

# Linear Gauge Pointers

The pointers are the values that will be marked on the scale. You can customize them through the parameters they expose:

* [Shape](#shape)

* [Color](#color)

* [Opacity](#opacity)

* [Size](#size)

* [Margin](#margin)

* [Additional Customization](#additional-customization)

>note The examples in this article are using the [Arrow shape](#shape) of the Pointers, but you can use BarIndicator too.

## Shape

The `Shape` parameter controls the shape of the pointer and takes a member of the `LinearGaugePointerShape` enum:

* `BarIndicator` - by default a bar indication will be rendered as the pointer shape

* `Arrow`

>caption Change the shape of the pointer.

<demo metaUrl="client/lineargauge/pointers/shape-pointer-result-code-6/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the pointers. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the arrow pointers.

<demo metaUrl="client/lineargauge/pointers/color-arrow-pointers-result-5/" height="420"></demo>

## Opacity

The `Opacity` (`double`) parameter controls the opacity of the pointers. The value passed to it should be between **0** and **1**.

<demo metaUrl="client/lineargauge/pointers/color-arrow-pointers-result-4/" height="420"></demo>

## Size

The `Size` (`double`) parameter controls the size of the pointers. 

<demo metaUrl="client/lineargauge/pointers/color-arrow-pointers-result-3/" height="420"></demo>

## Margin

The `Margin` (`double`) parameter controls the margin between the [Scale](slug:linear-gauge-scale) and the pointers.

<demo metaUrl="client/lineargauge/pointers/color-arrow-pointers-result-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#linear-gauge-additional-customization)

>caption Customize the Pointer Track.

<demo metaUrl="client/lineargauge/pointers/pointer-track-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Linear Gauge](https://demos.telerik.com/blazor-ui/lineargauge/overview)
* [Live Demo: Linear Gauge - Multiple Pointers](https://demos.telerik.com/blazor-ui/lineargauge/multiple-pointers)
* [Linear Gauge: Overview](slug:linear-gauge-overview)
* [Linear Gauge: Scale](slug:linear-gauge-scale)
