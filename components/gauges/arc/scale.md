---
title: Scale
page_title: Scale
description: Arc Gauge for Blazor - Scale.
slug: arc-gauge-scale
tags: telerik,blazor,arc,gauge,scale
published: True
position: 5
components: ["arcgauge"]
---

## Arc Gauge Scale

The scale of the arc gauge renders the values, pointers and labels. You can customize it by adding an instance of the `<ArcGaugeScale>` to the `<ArcGaugeScales>` collection, child tag of the `<TelerikArcGauge>`. The `<ArcGaugeScale>` exposes the following parameters:

* [Min and Max](#min-and-max)

* [MinorUnit and MajorUnit](#minorunit-and-majorunit)

* [StartAngle and EndAngle](#startangle-and-endangle)

* [Reverse](#reverse)

* [Additional Customization](#additional-customization)

    * [Example: Enable the MinorUnit ticks](#example-enable-the-minorunit-ticks)


## Min and Max

* The `Max` (`double`) parameter controls the maximum value that the component can reach.

* The `Min` (`double`) parameter controls the lowest value of the component.

>caption Change the lowest and the highest values for the scale.

<demo metaUrl="client/arcgauge/scale/lowest-highest-values-scale-5/" height="420"></demo>

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the component. The values provided to the `ArcGaugePointer` will render as a `MajorUnit` tick. The [labels](slug:arc-gauge-labels) will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the component. In order to use the `MinorUnit` ticks you must [enable them](#example-enable-the-minorunit-ticks) explicitly.

>caption Change the rendering frequency of the major unit divisions.

<demo metaUrl="client/arcgauge/scale/rendering-frequency-major-un-4/" height="420"></demo>

## StartAngle and EndAngle

* The `StartAngle` (`double`) parameter controls the starting angle of the scale.

* The `EndAngle` (`double`) parameter controls the ending angle of the component.

By default the `StartAngle` is set to `0` and the `EndAngle` to `180`. These values represent the angles on the coordinate system. 

>caption Change the StartAngle and the EndAngle of the scale.

<demo metaUrl="client/arcgauge/scale/startangle-endangle-scale-re-3/" height="420"></demo>

## Reverse

If you set the `Reverse` (`bool`) parameter to `true` the values of the scale will increase from the right side to the left side of the scale. By default they will raise from the left to right.

>caption Reverse the scale of the component.

<demo metaUrl="client/arcgauge/scale/reverse-scale-component-resu-2/" height="420"></demo>

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#arc-gauge-additional-customization)

### Example: Enable the MinorUnit ticks

You can enable the MinorUnit ticks on the scale by using the `<ArcGaugeScaleMinorTicks>` nested tag and its `Visible` parameter.

>caption Add the MinorUnit ticks to the scale.

<demo metaUrl="client/arcgauge/scale/add-minorunit-ticks-scale-1/" height="420"></demo>

## See Also

* [Live Demo: Arc Gauge](https://demos.telerik.com/blazor-ui/arcgauge/overview)
* [Live Demo: Arc Gauge - Scale Options](https://demos.telerik.com/blazor-ui/arcgauge/scale-options)
* [Arc Gauge: Overview](slug:arc-gauge-overview)
* [Arc Gauge: Pointers](slug:arc-gauge-pointers)
