---
title: Labels
page_title: Labels
description: Arc Gauge for Blazor - Labels.
slug: arc-gauge-labels
tags: telerik,blazor,arc,gauge,labels
published: True
position: 20
components: ["arcgauge"]
---

## Arc Gauge Labels

You can customize the appearance of the labels rendered on the [scale](slug:arc-gauge-scale) of the Arc Gauge by using the `<ArcGaugeScaleLabels>`, child tag of the `<ArcGaugeScale>`, and the parameters it exposes:

* [Format](#format)
* [Center Template](#center-template)
* [Position](#position)
* [Color](#color)
* [Visible](#visible)
* [Additional Customization](#additional-customization)

## Format

The `Format` (`string`) parameter allows you to customize the rendering of the labels by using the <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings" target="_blank">standard numeric format strings</a>. You can set the values of the labels to showcase, for example, currency, percentage, and so on.

>caption Use the Format parameter to showcase percentage.

<demo metaUrl="client/arcgauge/labels/format-parameter-showcase-pe-6/" height="420"></demo>

## Center Template

The center template allows you to take control of the rendering of the central section of the Arc Gauge. To use it, add the `<ArcGaugeCenterLabel>` a child of the `<TelerikArcGauge>` It provides a `context` object (`GaugeCenterLabelTemplateContext`) which exposes a list with the pointer in the component.

>caption Use the Center Template to display the Value of the pointer.

<demo metaUrl="client/arcgauge/labels/center-template-display-valu-5/" height="420"></demo>

## Position

The `Position` parameter is of enum type `ArcGaugeScaleLabelsPosition` and determines whether the Gauge labels are on the inside (default) or outside of the Gauge graphic. Labels on the inside allow for a visually larger component within the same available space.

>caption Setting Arc Gauge label position

<demo metaUrl="client/arcgauge/labels/arc-gauge-label-position-4/" height="520"></demo>

## Color

The `Color` (`string`) parameter controls the color of the labels. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the labels.

<demo metaUrl="client/arcgauge/labels/color-labels-result-code-3/" height="420"></demo>

## Visible

The `Visible` (`bool`) parameter controls whether the labels will be rendered. By default the labels would not be rendered.

>caption Show the labels by using the Visible parameter.

<demo metaUrl="client/arcgauge/labels/labels-visible-parameter-res-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#arc-gauge-additional-customization)

>caption Customize the borders of the Labels.

<demo metaUrl="client/arcgauge/labels/borders-labels-result-code-1/" height="420"></demo>

## See Also

* [Live Demo: Arc Gauge](https://demos.telerik.com/blazor-ui/arcgauge/overview)
* [Live Demo: Arc Gauge - Center Template](https://demos.telerik.com/blazor-ui/arcgauge/center-template)
* [Arc Gauge: Overview](slug:arc-gauge-overview)
* [Arc Gauge: Scale](slug:arc-gauge-scale)
* [Arc Gauge: Pointers](slug:arc-gauge-pointers)
