---
title: Overview
page_title: Circular Gauge Overview
description: Overview of the Circular Gauge for Blazor.
slug: circular-gauge-overview
tags: telerik,blazor,circular,gauge,overview
published: True
position: 0
components: ["circulargauge"]
---
# Blazor Circular Gauge Overview

The <a href = "https://www.telerik.com/blazor-ui/circular-gauge" target="_blank">Telerik Circular Gauge for Blazor</a> represents [numerical values](slug:circular-gauge-pointers) on a circular [scale](slug:circular-gauge-scale).

## Creating Blazor Circular Gauge

1. Add the `<TelerikCircularGauge>` tag.
1. Add an instance of the `<CircularGaugePointer>` to the `<CircularGaugePointers>` collection.
1. Provide a `Value` for each `<CircularGaugePointer>`.
1. (optional) You can use the [Center Label Template](slug:circular-gauge-labels#center-template) to display the value of the pointer in the center of the component.

>caption Basic Telerik Circular Gauge for Blazor.

````RAZOR
@* Setup a basic circular gauge with center label template *@

<TelerikCircularGauge Width="100px" Height="100px">

    <CircularGaugePointers>
        <CircularGaugePointer Value="30" Size="10" />
    </CircularGaugePointers>

    <CircularGaugeCenterLabel>
        <Template>
            @{
                var pointer = context.Pointers.FirstOrDefault();

                <div style="font-weight: bold; font-size:30px">@pointer.Value</div>
            }
        </Template>
    </CircularGaugeCenterLabel>

</TelerikCircularGauge>
````

## Scale

The scale of the circular gauge renders the values of the [pointers](slug:circular-gauge-pointers) and [labels](slug:circular-gauge-labels). See the [Scale](slug:circular-gauge-scale) article for more information on how to customize the scale of the component.

## Pointers

The pointers indicate the values on the scale of the component. See the [Pointers](slug:circular-gauge-pointers) article for more information on how to customize the pointers of the component.

## Labels

The labels are rendered on the scale of the component to give information to the users. See the [Labels](slug:circular-gauge-labels) article for more information on how to customize the labels on the scale of the component.

## Circular Gauge Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-circulargauge">` element. |
| `Width` | `string` | Controls the width of the Circular Gauge. You can read more information in the [Dimensions](slug:common-features/dimensions) article.|
| `Height` | `string` | Controls the height of the Circular Gauge. You can read more information in the [Dimensions](slug:common-features/dimensions) article. |
| `Transitions` | `bool?` | Controls if the Circular Gauge uses animations for its value changes. |
| `RenderAs` | `RenderingMode?` <br /> (`SVG`) | Controls if the gauge renders as `SVG` or `Canvas`. |

## Circular Gauge Reference and Methods

| Method | Description |
| --- | --- |
| `Refresh` | Programatically re-render the Circular Gauge. |

````RAZOR
@* Change the Height of the component *@

<TelerikButton OnClick="@ChangeTheHeight">Change the Height of the component</TelerikButton>

<TelerikCircularGauge @ref="@CircularGaugeRef" Height="@Height">
    <CircularGaugePointers>

        <CircularGaugePointer Value="30" />

    </CircularGaugePointers>
</TelerikCircularGauge>

@code {
    Telerik.Blazor.Components.TelerikCircularGauge CircularGaugeRef { get; set; }

    public string Height { get; set; } = "300px";

    async Task ChangeTheHeight()
    {
        Height = "450px";

        //give time to the framework and browser to resize the actual DOM so the gauge can use the expected size
        await Task.Delay(30);

        CircularGaugeRef.Refresh();
    }
}
````

## Next Steps

* [Explore the Circular Gauge Scale](slug:circular-gauge-scale)
* [Learn more about the Circular Gauge Pointers](slug:circular-gauge-pointers)

## See Also

* [Live Demo: Circular Gauge](https://demos.telerik.com/blazor-ui/circulargauge/overview)