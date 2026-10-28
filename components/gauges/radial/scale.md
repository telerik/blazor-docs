---
title: Scale
page_title: Scale
description: Radial Gauge for Blazor - Scale.
slug: radial-gauge-scale
tags: telerik,blazor,radial,gauge,scale
published: True
position: 5
components: ["radialgauge"]
---

## Radial Gauge Scale

The Scale of the Radial Gauge renders the values, pointers and labels. You can customize it by adding an instance of the `<RadialGaugeScale>` to the `<RadialGaugeScales>` collection, child tag of the `<TelerikRadialGauge>`. The `<RadialGaugeScale>` exposes the following parameters:

* [Min and Max](#min-and-max)

* [MinorUnit and MajorUnit](#minorunit-and-majorunit)

* [StartAngle and EndAngle](#startangle-and-endangle)

* [Reverse](#reverse)

* [Additional Customization](#additional-customization)

    * [Example: Remove the MinorUnit ticks](#example-remove-the-minorunit-ticks)


## Min and Max

* The `Max` (`double`) parameter controls the maximum value that the component can reach.

* The `Min` (`double`) parameter controls the minimum value of the component.

>caption Change the minimum and the maximum values for the scale.

<demo metaUrl="client/radialgauge/scale/minimum-maximum-values-scale-5/" height="420"></demo>

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the component. The [labels](slug:radial-gauge-labels) will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the component.

>caption Change the rendering frequency of the minor and major unit divisions.

<demo metaUrl="client/radialgauge/scale/rendering-frequency-minor-ma-4/" height="420"></demo>

## StartAngle and EndAngle

The gauge is rendered clockwise (0 degrees are the 180 degrees in the polar coordinate system).

* `StartAngle` defines the start angle of the gauge, its default value is 0.

* `EndAngle` - defines the end angle of the gauge, its default value is 180. 

>caption Change the StartAngle and EndAngle of the radial gauge.

<demo metaUrl="client/radialgauge/scale/startangle-endangle-radial-g-3/" height="420"></demo>

## Reverse

If you set the `Reverse` (`bool`) parameter to `true` the gauge will be rendered in a reversed view - the min value will be on the right side and the max value will be on the left.

>caption Reverse the component. The result from the code snippet below.

<demo metaUrl="client/radialgauge/scale/reverse-component-result-cod-2/" height="420"></demo>



## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#radial-gauge-additional-customization)

### Example: Remove the MinorUnit ticks

You can remove the MinorUnit ticks from the rendering of the scale by using the `<RadialGaugeScaleMinorTicks>` nested tag and its `Visible` parameter.

>caption Remove the MinorUnit ticks. The result from the code snippet below.

<demo metaUrl="client/radialgauge/scale/remove-minorunit-ticks-resul-1/" height="420"></demo>

## See Also

* [Live Demo: Radial Gauge](https://demos.telerik.com/blazor-ui/radialgauge/overview)
* [Live Demo: Radial Gauge - Scale Ranges](https://demos.telerik.com/blazor-ui/radialgauge/scale-ranges)
* [Live Demo: Radial Gauge - Scale Options](https://demos.telerik.com/blazor-ui/radialgauge/scale-options)
* [Radial Gauge: Overview](slug:radial-gauge-overview)
* [Radial Gauge: Pointers](slug:radial-gauge-pointers)
* [Radial Gauge: Labels](slug:radial-gauge-labels)
* [Radial Gauge: Ranges](slug:radial-gauge-ranges)

