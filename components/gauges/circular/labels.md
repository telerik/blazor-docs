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

>caption Use the Format parameter to showcase currency. The result from the code snippet below.

![Format parameter example](images/format-parameter-labels.png)

````RAZOR
@* Use the {0:C0} format string to format the values of the labels as currency. *@


<TelerikCircularGauge>
    <CircularGaugeScales>

        <CircularGaugeScale>           
            <CircularGaugeScaleLabels Format="{0:C0}" Visible="true"></CircularGaugeScaleLabels>
        </CircularGaugeScale>

    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="50">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Center Template

The center template allows you to take control of the rendering of the central section of the Circular Gauge. To use it, add the `<CircularGaugeCenterLabel>` a child of the `<TelerikCircularGauge>` It provides a `context` object (`GaugeCenterLabelTemplateContext`) which exposes a list with the pointers in the component and their values.

>caption Use the Center Template to display the Value of the pointer. The result from the code snippet below.

![center template](images/center-template-circular.png)

````RAZOR
@* Print the value of the pointer in the center of the component *@

<TelerikCircularGauge>
    <CircularGaugeCenterLabel>
        <Template>
            @{
                var pointer = context.Pointers.FirstOrDefault();

                <div style="font-weight: bold">@pointer.Value</div>
            }
        </Template>
    </CircularGaugeCenterLabel>

    <CircularGaugePointers>

        <CircularGaugePointer Value="30" Color="blue">
        </CircularGaugePointer>

    </CircularGaugePointers>

    <CircularGaugeScales>

        <CircularGaugeScale Min="0" Max="100">
            <CircularGaugeScaleLabels Visible="true" />
        </CircularGaugeScale>

    </CircularGaugeScales>
</TelerikCircularGauge>
````

## Position

The `Position` parameter is of enum type `CircularGaugeScaleLabelsPosition` and determines whether the Gauge labels are on the inside (default) or outside of the Gauge graphic. Labels on the inside allow for a visually larger component on the same available space.

>caption Setting Circular Gauge label position

````RAZOR
<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true"
                                      Position="@CircularGaugeScaleLabelsPosition.Inside" />
        </CircularGaugeScale>
    </CircularGaugeScales>

    <CircularGaugePointers>
        <CircularGaugePointer Value="66">
        </CircularGaugePointer>
    </CircularGaugePointers>
</TelerikCircularGauge>

<TelerikCircularGauge>
    <CircularGaugeScales>
        <CircularGaugeScale>
            <CircularGaugeScaleLabels Visible="true"
                                      Position="@CircularGaugeScaleLabelsPosition.Outside" />
        </CircularGaugeScale>
    </CircularGaugeScales>

    <CircularGaugePointers>
        <CircularGaugePointer Value="66">
        </CircularGaugePointer>
    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Color

The `Color` (`string`) parameter controls the color of the labels. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the labels. The result from the code snippet below.

![Color parameter screenshot](images/color-parameter-labels.png)

````RAZOR
@* Change the color of the labels to blue *@

<TelerikCircularGauge>
    <CircularGaugeScales>

        <CircularGaugeScale>           
            <CircularGaugeScaleLabels Color="blue" Visible="true"></CircularGaugeScaleLabels>
        </CircularGaugeScale>

    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="60">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Visible

The `Visible` (`bool`) parameter controls whether the labels will be rendered. Its default value is `false`. If you want to display the labels include the `<CircularGaugeScaleLabels>` tag in the `<CircularGaugeScale>` and set its `Visible` parameter to `true`.

>caption Show the labels by using the Visible parameter. The result from the code snippet below

![Hide the labels](images/visible-parameter-labels.png)

````RAZOR
@* Set the Visible parameter to true to show the labels *@

<TelerikCircularGauge>
    <CircularGaugeScales>

        <CircularGaugeScale>           
            <CircularGaugeScaleLabels Visible="true"></CircularGaugeScaleLabels>
        </CircularGaugeScale>

    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="40">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## Additional Customization

@[template](/_contentTemplates/gauges/additional-customization.md#circular-gauge-additional-customization)

>caption Customize the background and the margin of the Labels. The result from the code snippet below.

![Custom Labels](images/labels-customize.png)

````RAZOR
@* Customize the position, border and padding of the labels. *@

<TelerikCircularGauge>
    <CircularGaugeScales>

        <CircularGaugeScale>
            <CircularGaugeScaleLabels Position="CircularGaugeScaleLabelsPosition.Outside" Visible="true">
                <CircularGaugeScaleLabelsBorder Width="1" Color="rgb(255,99,88)" DashType="DashType.Solid"></CircularGaugeScaleLabelsBorder>
                <CircularGaugeScaleLabelsPadding Top="3" Bottom="3" Left="3" Right="3"></CircularGaugeScaleLabelsPadding>
            </CircularGaugeScaleLabels>
        </CircularGaugeScale>

    </CircularGaugeScales>

    <CircularGaugePointers>

        <CircularGaugePointer Value="40">
        </CircularGaugePointer>

    </CircularGaugePointers>
</TelerikCircularGauge>
````

## See Also

* [Live Demo: Circular Gauge](https://demos.telerik.com/blazor-ui/circulargauge/overview)
* [Live Demo: Circular Gauge - Center Template](https://demos.telerik.com/blazor-ui/circulargauge/center-template)
* [Circular Gauge: Overview](slug:circular-gauge-overview)
* [Circular Gauge: Scale](slug:circular-gauge-scale)
* [Circular Gauge: Pointers](slug:circular-gauge-pointers)