---
title: Labels
page_title: Labels
description: Circular Gauge for Blazor - Labels.
slug: circular-gauge-labels
tags: telerik,blazor,circular,gauge,labels
published: True
position: 15
components: ["circulargauge"]
---

# Circular Gauge Labels

You can customize the appearance of the labels rendered on the [scale](slug:circular-gauge-scale) of the Circular Gauge by using the `<CircularGaugeScaleLabels>`, child tag of the `<CircularGaugeScale>`, and the parameters it exposes:

* [Format](#format)
* [Center Template](#center-template)
* [Position](#position)
* [Color](#color)
* [Visible](#visible)
* [Additional Customization](#additional-customization)

## Format

The `Format` (`string`) parameter allows you to customize the rendering of the labels by using the <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings" target="_blank">standard numeric format strings</a>. You can set the values of the labels to showcase, for example, currency, percentage, and so on.

<demo metaUrl="client/circulargauge/labels/label-format-6/" height="420"></demo>

## Center Template

The center template allows you to take control of the rendering of the central section of the Circular Gauge. To use it, add the `<CircularGaugeCenterLabel>` a child of the `<TelerikCircularGauge>` It provides a `context` object (`GaugeCenterLabelTemplateContext`) which exposes a list with the pointers in the component and their values.

>caption Use the Center Template to display the Value of the pointer.

<demo metaUrl="client/circulargauge/labels/center-template-5/" height="420"></demo>

## Position

The `Position` parameter is of enum type `CircularGaugeScaleLabelsPosition` and determines whether the Gauge labels are on the inside (default) or outside of the Gauge graphic. Labels on the inside allow for a visually larger component on the same available space.

>caption Setting Circular Gauge label position

<demo metaUrl="client/circulargauge/labels/position-4/" height="420"></demo>

## Color

The `Color` (`string`) parameter controls the color of the labels. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the labels.

<demo metaUrl="client/circulargauge/labels/label-color-3/" height="420"></demo>

## Visible

The `Visible` (`bool`) parameter controls whether the labels will be rendered. Its default value is `false`. If you want to display the labels include the `<CircularGaugeScaleLabels>` tag in the `<CircularGaugeScale>` and set its `Visible` parameter to `true`.

>caption Show the labels by using the Visible parameter.

<demo metaUrl="client/circulargauge/labels/label-visibility-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#circular-gauge-additional-customization)

>caption Customize the background and the margin of the Labels.

<demo metaUrl="client/circulargauge/labels/label-style-1/" height="420"></demo>

## See Also

* [Live Demo: Circular Gauge](https://demos.telerik.com/blazor-ui/circulargauge/overview)
* [Live Demo: Circular Gauge - Center Template](https://demos.telerik.com/blazor-ui/circulargauge/center-template)
* [Circular Gauge: Overview](slug:circular-gauge-overview)
* [Circular Gauge: Scale](slug:circular-gauge-scale)
* [Circular Gauge: Pointers](slug:circular-gauge-pointers)