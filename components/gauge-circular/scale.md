---
title: Scale
page_title: Scale
description: Circular Gauge for Blazor - Scale.
slug: circular-gauge-scale
tags: telerik,blazor,circular,gauge,scale
published: True
position: 5
---

## Circular Gauge Scale

The scale of the circular gauge renders the values, pointers and labels. You can customize it by adding an instance of the `<CircularGaugeScale>` to the `<CircularGaugeScales>` collection, child tag of the `<TelerikCircularGauge>`. The `<CircularGaugeScale>` exposes the following parameters:

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

>caption Change the lowest and the highest values for the scale. The result from the code snippet below.

![Min and max parameters example](images/min-and-max-circular-gauge.png)

````CSHTML
@* Use the Min and Max parameters to change the lowest and highest values for the scale *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale Min="10" Max="100" ></CircularGaugeScale>
    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="10">
        </CircularGaugePointer>

        <CircularGaugePointer Value="20">
        </CircularGaugePointer>

        <CircularGaugePointer Value="80">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the component. The values provided to the `CircularGaugePointer` will render as a `MajorUnit` tick. The [labels]({%slug circular-gauge-labels%}) will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the component.

>caption Change the rendering frequency of the minor and major unit divisions. The result from the code snippet below.

![Minor and major units parameters](images/minor-and-major-units-circular-gauge.png)

````CSHTML
@* Update the rendering of the major and minor ticks *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale MajorUnit="10" MinorUnit="5"></CircularGaugeScale>
    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="80">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Mirror

If you set the `Mirror` (`bool`) parameter to `true` the scale will render the labels and the unit divisions to the right of the scale. By default the labels and unit divisions are rendered to the left side of the scale for a verical gauge and to the botton if the gauge is [horizontal](#reverse).

>caption Render the labels and the ticks of the scale to the right. The result from the code snippet below

![Mirror the circular gauge](images/mirror-circular-gauge.png)

````CSHTML
@* Set the Mirror parameter to true *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale Mirror="true"></CircularGaugeScale>
    </CircularGaugeScales>
    <CircularGaugePointers>

        <CircularGaugePointer Value="30">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Reverse

If you set the `Reverse` (`bool`) parameter to `true` the values of the scale will increase from top to bottom. By default they will raise from the bottom to the top.

>caption Reverse the scale of the component. The result from the code snippet below.

![reverse parameter example](images/reverse-circular-gauge.png)

````CSHTML
@* Set the Reverse parameter to true *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale Reverse="true"></CircularGaugeScale>
    </CircularGaugeScales>
    <CircularGaugePointers>

        <CircularGaugePointer Value="30">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Vertical

The `Vertical` (`bool`) parameter controls the orientation of the circular gauge. By default its value is `true`, but you can set to `false` so that the component renders horizontally.

>caption Change the orientation of the Circular Gauge. The result from the code snippet below.

![horizontal component](images/horizontal-circular-gauge.png)

````CSHTML
@* Use the Vertical parameter to change the orientation of the scale *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale Vertical="false"></CircularGaugeScale>
    </CircularGaugeScales>
    <CircularGaugePointers>

        <CircularGaugePointer Value="30">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#circular-gauge-additional-customization)

### Example: Remove the MinorUnit ticks

You can remove the MinorUnit ticks from the rendering of the scale by using the `<CircularGaugeScaleMinorTicks>` nested tag and its `Visible` parameter.

>caption Remove the MinorUnit ticks. The result from the code snippet below.

![Remove the MinorUnit ticks](images/remove-minorunit-ticks-circular-gauge.png)

````CSHMTL
@* Remove the MinorUnit ticks. *@

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale>
            <CircularGaugeScaleMinorTicks Visible="false"></CircularGaugeScaleMinorTicks>
        </CircularGaugeScale>
    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="30">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## See Also

* [Circular Gauge: Overview]({%slug circular-gauge-overview%})
* [Circular Gauge: Pointers]({%slug circular-gauge-pointers%})
