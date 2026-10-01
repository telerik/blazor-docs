---
title: Ranges
page_title: Ranges
description: Radial Gauge for Blazor - Ranges.
slug: radial-gauge-ranges
tags: telerik,blazor,radial,gauge,ranges
published: True
position: 15
components: ["radialgauge"]
---

# Radial Gauge Ranges

You can highlight specific value ranges by providing one or more instances of the `<RadialGaugeScaleRange>` to the `<RadialGaugeScaleRanges>` collection, child tag of the `<RadialGaugeScale>`. You can customize them by using the parameters exposed on the `<RadialGaugeScaleRange>`:

* [From and To](#from-and-to)

* [Range Size](#range-size)

* [Range Distance](#range-distance)

* [Range Placeholder Color](#range-placeholder-color)

* [Color](#color)

* [Opacity](#opacity)

## From and To

* The `From` (`double`) parameter controls the start position of the range in scale units.

* The `To` (`double`) parameter controls the end position of the range in scale units.

>caption Use the From and To parameters to provide a range.

<demo metaUrl="client/radialgauge/ranges/parameters-provide-range-res-6/" height="420"></demo>

## Range Size

The `RangeSize` (`double`) parameter controls the width of the range indicators.

>caption Use the RangeSize parameter to provide size for the range indicators.

<demo metaUrl="client/radialgauge/ranges/rangesize-parameter-provide-5/" height="420"></demo>

## Range Distance 

The `RangeDistance` (`double`) parameter controls the distance from the range indicators to the ticks.

>caption Use the RangeDistance parameter to provide the desired distance from the range indicators to the ticks.

<demo metaUrl="client/radialgauge/ranges/rangedistance-parameter-prov-4/" height="420"></demo>

## Range Placeholder Color

The `RangePlaceholderColor` (`string`) parameter controls the default color for the ranges. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Set the default color for the ranges in the radial gauge.

<demo metaUrl="client/radialgauge/ranges/default-color-ranges-radial-3/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the range. It accepts **CSS**, **HEX** and **RGB** colors. If you do not define the `Color` parameter the range will not be visually rendered.

>caption Set the desired colors for the ranges in the radial gauge.

<demo metaUrl="client/radialgauge/ranges/desired-colors-ranges-radial-2/" height="420"></demo>

## Opacity

The `Opacity` (`double`) parameter controls the opacity of the range. The value passed to it should be between **0** and **1**. Defaults to 1.

>caption Change the opacity of a range.

<demo metaUrl="client/radialgauge/ranges/opacity-range-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Radial Gauge](https://demos.telerik.com/blazor-ui/radialgauge/overview)
* [Radial Gauge: Overview](slug:radial-gauge-overview)
* [Radial Gauge: Scale](slug:radial-gauge-scale)
* [Radial Gauge: Labels](slug:radial-gauge-labels)
* [Radial Gauge: Pointers](slug:radial-gauge-pointers)

