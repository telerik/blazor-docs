---
title: Labels
page_title: Labels
description: Radial Gauge for Blazor - Labels.
slug: radial-gauge-labels
tags: telerik,blazor,radial,gauge,labels
published: True
position: 20
components: ["radialgauge"]
---

# Radial Gauge Labels

You can customize the appearance of the labels rendered on the [scale](slug:radial-gauge-scale) of the Radial Gauge by using the `<RadialGaugeScaleLabels>`, child tag of the `<RadialGaugeScale>`, and the parameters it exposes:

* [Format](#format)

* [Color](#color)

* [Visible](#visible)

* [Additional Customization](#additional-customization)

## Format

The `Format` (`string`) parameter allows you to customize the rendering of the labels by using the <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings" target="_blank">standard numeric format strings</a>. You can set the values of the labels to showcase, for example, currency, percentage, and so on.

>caption Use the Format parameter to showcase currency.

<demo metaUrl="client/radialgauge/labels/format-parameter-showcase-cu-4/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the labels. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the labels.

<demo metaUrl="client/radialgauge/labels/color-labels-result-code-3/" height="420"></demo>

## Visible

The `Visible` (`bool`) parameter controls whether the labels will be rendered.

>caption Hide the labels by using the Visible parameter.

<demo metaUrl="client/radialgauge/labels/hide-labels-visible-paramete-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#radial-gauge-additional-customization)

>caption Customize the background and the margin of the Labels.

<demo metaUrl="client/radialgauge/labels/background-margin-labels-res-1/" height="420"></demo>

## See Also

* [Live Demo: Radial Gauge](https://demos.telerik.com/blazor-ui/radialgauge/overview)
* [Radial Gauge: Overview](slug:radial-gauge-overview)
* [Radial Gauge: Scale](slug:radial-gauge-scale)
* [Radial Gauge: Pointers](slug:radial-gauge-pointers)
* [Radial Gauge: Ranges](slug:radial-gauge-ranges)