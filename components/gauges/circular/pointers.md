---
title: Pointers
page_title: Circular Gauge - Pointers
description: Circular Gauge for Blazor - Pointers.
slug: circular-gauge-pointers
tags: telerik,blazor,circular,gauge,pointers
published: True
position: 10
---

# Circular Gauge Pointers

The pointers are the values that will be marked on the scale. You can customize them through the parameters they expose:

* [LineCap](#linecap)

* [PlaceholderColor](#placeholdercolor)

* [Color](#color)

* [Size](#size)

## LineCap

The `LineCap` parameter controls the shape of the scale ending and takes a member of the `CircularGaugePointerLineCap` enum:

* `Round` - by default the shape of the scale ending would be round

* `Butt` - flat scale ending shape

>caption Change the shape of the scale. The result from the code snippet below.

![Round shape](images/linecap-parameter.png)

````CSHTML
@* Use a flat shape for the end of the scale *@

<TelerikCircularGauge>
    <CircularGaugePointers>

        <CircularGaugePointer LineCap="@CircularGaugePointerLineCap.Butt" Value="40">
        </CircularGaugePointer>

    </CircularGaugePointers>

    <CircularGaugeScales>

        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true" />
        </CircularGaugeScale>

    </CircularGaugeScales>
</TelerikCircularGauge>
````

## PlaceholderColor

The `PlaceholderColor` (`string`) parameter controls the background color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the background color of the pointer. The result from the code snippet below:

![placeholder color](images/placeholdercolor-parameter-circular.png)

````CSHTML
@* Set the PlaceholderColor to light blue *@

<TelerikCircularGauge>
    <CircularGaugePointers>

        <CircularGaugePointer PlaceholderColor="lightblue" Value="40">
        </CircularGaugePointer>

    </CircularGaugePointers>

    <CircularGaugeScales>

        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true" />
        </CircularGaugeScale>

    </CircularGaugeScales>
</TelerikCircularGauge>
````

## Color

The `Color` (`string`) parameter controls the color of the pointer. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the pointer. The result from the code snippet below

![color parameter example](images/color-parameter-circular-pointer.png)

````CSHTML
@* Change the color of the pointer to purple *@

<TelerikCircularGauge>
    <CircularGaugePointers>

        <CircularGaugePointer Color="purple" Value="60">
        </CircularGaugePointer>

    </CircularGaugePointers>

    <CircularGaugeScales>

        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true" />
        </CircularGaugeScale>

    </CircularGaugeScales>
</TelerikCircularGauge>
````

## Size

The `Size` (`double`) parameter controls the size of the pointer.

![larger pointer size](images/pointer-size-circular.png)

````CSHTML
* Change the size of the pointer *@

<TelerikCircularGauge>
    <CircularGaugePointers>

        <CircularGaugePointer Size="20" Value="40">
        </CircularGaugePointer>

    </CircularGaugePointers>

    <CircularGaugeScales>

        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true" />
        </CircularGaugeScale>

    </CircularGaugeScales>
</TelerikCircularGauge>
````

## See Also

* [Live Demo: Circular Gauge](https://demos.telerik.com/blazor-ui/circulargauge/overview)
* [Circular Gauge: Overview]({%slug circular-gauge-overview%})
* [Circular Gauge: Scale]({%slug circular-gauge-scale%})
* [Circular Gauge: Labels]({%slug circular-gauge-labels%})
