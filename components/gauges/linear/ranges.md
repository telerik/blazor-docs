---
title: Ranges
page_title: Ranges
description: Linear Gauge for Blazor - Ranges.
slug: linear-gauge-ranges
tags: telerik,blazor,linear,gauge,ranges
published: True
position: 10
components: ["lineargauge"]
---

## Linear Gauge Ranges

You can highlight specific value ranges by providing one or more instances of the `<LinearGaugeScaleRange>` to the `<LinearGaugeScaleRanges>` collection, child tag of the `<LinearGaugeScale>`. You can customize them by using the parameters exposed on the `<LinearGaugeScaleRange>`:

* [From and To](#from-and-to)

* [Color](#color)

* [Opacity](#opacity)

## From and To

* The `From` (`double?`) parameter controls the lowest point in the range.

* The `To` (`double?`) parameter controls the highest point in the range.

>caption Use the From and To parameters to provide a range.

<demo metaUrl="client/lineargauge/ranges/parameters-provide-range-res-3/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the range. It accepts **CSS**, **HEX** and **RGB** colors.

If you do not define the `Color` parameter the range will not be visually rendered.

>caption Use an RGB colors for the ranges in the linear gauge.

<demo metaUrl="client/lineargauge/ranges/rgb-colors-ranges-linear-2/" height="420"></demo>

## Opacity

The `Opacity` (`double`) parameter controls the of the range. The value passed to it should be between **0** and **1**.

>caption Change the opacity of a range.

<demo metaUrl="client/lineargauge/ranges/opacity-range-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Linear Gauge](https://demos.telerik.com/blazor-ui/lineargauge/overview)
* [Live Demo: Linear Gauge - Scale Ranges](https://demos.telerik.com/blazor-ui/lineargauge/scale-ranges)
* [Linear Gauge: Overview](slug:linear-gauge-overview)
* [Linear Gauge: Overview](slug:linear-gauge-scale)
* [Linear Gauge: Pointers](slug:linear-gauge-pointers)
