---
title: Scale
page_title: Scale
description: Linear Gauge for Blazor - Scale.
slug: linear-gauge-scale
tags: telerik,blazor,linear,gauge,scale
published: True
position: 5
components: ["lineargauge"]
---

## Linear Gauge Scale

The scale of the linear gauge renders the values, pointers and labels. You can customize it by adding an instance of the `<LinearGaugeScale>` to the `<LinearGaugeScales>` collection, child tag of the `<TelerikLinearGauge>`. The `<LinearGaugeScale>` exposes the following parameters:

* [Min and Max](#min-and-max)

* [MinorUnit and MajorUnit](#minorunit-and-majorunit)

* [Mirror](#mirror)

* [Reverse](#reverse)

* [Vertical](#vertical)

* [Additional Customization](#additional-customization)

    * [Example: Remove the MinorUnit ticks](#example-remove-the-minorunit-ticks)


## Min and Max

* The `Max` (`double`) parameter controls the maximum value that the component can reach.

* The `Min` (`double`) parameter controls the lowest value of the component.

>caption Change the lowest and the highest values for the scale.

<demo metaUrl="client/lineargauge/scale/lowest-highest-values-scale-6/" height="420"></demo>

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the component. The values provided to the `LinearGaugePointer` will render as a `MajorUnit` tick. The [labels](slug:linear-gauge-labels) will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the component.

>caption Change the rendering frequency of the minor and major unit divisions.

<demo metaUrl="client/lineargauge/scale/rendering-frequency-minor-ma-5/" height="420"></demo>

## Mirror

If you set the `Mirror` (`bool`) parameter to `true` the scale will render the labels and the unit divisions to the right of the scale. By default the labels and unit divisions are rendered to the left side of the scale for a vertical gauge and to the bottom if the gauge is [horizontal](#reverse).

>caption Render the labels and the ticks of the scale to the right.

<demo metaUrl="client/lineargauge/scale/render-labels-ticks-scale-4/" height="420"></demo>

## Reverse

If you set the `Reverse` (`bool`) parameter to `true` the values of the scale will increase from top to bottom. By default they will raise from the bottom to the top.

>caption Reverse the scale of the component.

<demo metaUrl="client/lineargauge/scale/reverse-scale-component-resu-3/" height="420"></demo>

## Vertical

The `Vertical` (`bool`) parameter controls the orientation of the linear gauge. By default its value is `true`, but you can set to `false` so that the component renders horizontally.

>caption Change the orientation of the Linear Gauge.

<demo metaUrl="client/lineargauge/scale/orientation-linear-gauge-res-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#linear-gauge-additional-customization)

### Example: Remove the MinorUnit ticks

You can remove the MinorUnit ticks from the rendering of the scale by using the `<LinearGaugeScaleMinorTicks>` nested tag and its `Visible` parameter.

>caption Remove the MinorUnit ticks.

<demo metaUrl="client/lineargauge/scale/remove-minorunit-ticks-resul-1/" height="420"></demo>

## See Also

* [Live Demo: Linear Gauge](https://demos.telerik.com/blazor-ui/lineargauge/overview)
* [Live Demo: Linear Gauge - Scale Options](https://demos.telerik.com/blazor-ui/lineargauge/scale-options)
* [Linear Gauge: Overview](slug:linear-gauge-overview)
* [Linear Gauge: Pointers](slug:linear-gauge-pointers)
