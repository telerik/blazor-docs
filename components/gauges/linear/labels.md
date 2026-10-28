---
title: Labels
page_title: Labels
description: Linear Gauge for Blazor - Labels.
slug: linear-gauge-labels
tags: telerik,blazor,linear,gauge,labels
published: True
position: 20
components: ["lineargauge"]
---

## Linear Gauge Labels

You can customize the appearance of the labels rendered on the [scale](slug:linear-gauge-scale) of the Linear Gauge by using the `<LinearGaugeScaleLabels>`, child tag of the `<LinearGaugeScale>`, and the parameters it exposes:

* [Format](#format)

* [Color](#color)

* [Visible](#visible)

* [Additional Customization](#additional-customization)

The LinearGauge scale width decreases when the `Min` and `Max` label length increases. See how to [define the same LinearGauge scale widths with different `Min` and `Max` values in multiple Gauge instances](slug:lineargauge-kb-align-gauge-widths-with-different-min-max).

## Format

The `Format` (`string`) parameter allows you to customize the rendering of the labels by using the <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings" target="_blank">standard numeric format strings</a>. You can set the values of the labels to showcase, for example, currency, percentage, and so on.

>caption Use the Format parameter to showcase currency.

<demo metaUrl="client/lineargauge/labels/format-parameter-showcase-cu-4/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the labels. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the labels.

<demo metaUrl="client/lineargauge/labels/color-labels-result-code-3/" height="420"></demo>

## Visible

The `Visible` (`bool`) parameter controls whether the labels will be rendered.

>caption Hide the labels by using the Visible parameter.

<demo metaUrl="client/lineargauge/labels/hide-labels-visible-paramete-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#linear-gauge-additional-customization)

>caption Customize the borders of the Labels.

<demo metaUrl="client/lineargauge/labels/borders-labels-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Linear Gauge](https://demos.telerik.com/blazor-ui/lineargauge/overview)
* [Linear Gauge: Overview](slug:linear-gauge-overview)
* [Linear Gauge: Scale](slug:linear-gauge-scale)
* [Linear Gauge: Ranges](slug:linear-gauge-ranges)
* [Linear Gauge: Pointers](slug:linear-gauge-pointers)
