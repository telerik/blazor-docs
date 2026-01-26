---
title: Overview
page_title: Linear Gauge Overview
description: Overview of the Linear Gauge for Blazor.
slug: linear-gauge-overview
tags: telerik,blazor,linear,gauge,overview
published: True
position: 0
components: ["lineargauge"]
---
# Blazor Linear Gauge Overview

The <a href = "https://www.telerik.com/blazor-ui/linear-gauge" target="_blank">Telerik Linear Gauge for Blazor</a> represents [numerical values](slug:linear-gauge-pointers) on a [scale](slug:linear-gauge-scale) of ranges in a linear format.

## Creating Blazor Linear Gauge

1. Add the `<TelerikLinearGauge>` tag.
1. Add an instance of the `<LinearGaugePointer>` to the `<LinearGaugePointers>` collection.
1. Provide a `Value` for the `<LinearGaugePointer>`.

````RAZOR

@* Setup a basic linear gauge *@

<TelerikLinearGauge>
    <LinearGaugePointers>
        <LinearGaugePointer Value="@GaugeValue" />
    </LinearGaugePointers>
</TelerikLinearGauge>

@code {
    private double GaugeValue { get; set; } = 40;
}
````

## Scale

The scale of the Linear Gauge renders the values of the [pointers](slug:linear-gauge-pointers) and [labels](slug:linear-gauge-labels). [See the Scale article for more information on how to customize the scale of the component...](slug:linear-gauge-scale)

## Pointers

The pointers indicate the values on the scale of the component. [See the Pointers article for more information on how to customize the pointers of the component...](slug:linear-gauge-pointers)

## Labels

The labels are rendered on the scale of the component to give information to the users. [See the Labels article for more information on how to customize the labels on the scale of the component...](slug:linear-gauge-labels)

## Ranges

The ranges are used to visually distinguish particular values on the scale. [Read the Ranges article for more information...](slug:linear-gauge-ranges)

## Linear Gauge Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)
| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-lineargauge">` element. |
| `Width` | `string` | The width of the Linear Gauge. The [scale](slug:linear-gauge-scale) width is smaller and [depends on the length of its `Min` and `Max` values](slug:lineargauge-kb-align-gauge-widths-with-different-min-max). |
| `Height` | `string` | The height of the Linear Gauge. |
| `Transitions` | `bool?` | Controls if the Linear Gauge uses animations for its value changes. |
| `RenderAs` | `RenderingMode?` <br /> (`SVG`) | Controls if the gauge renders as `SVG` or `Canvas`. |


## Linear Gauge Reference and Methods
 
| Method | Description |
| --- | --- |
| `Refresh` | Programatically re-render the Linear Gauge. |

>caption Get a reference to the Linear Gauge and use the Refresh method

````RAZOR
@* Change the Height of the component *@

<TelerikButton OnClick="@ChangeTheHeight">Change the Height of the component</TelerikButton>

<TelerikLinearGauge @ref="@LinearGaugeRef" Height="@Height">
    <LinearGaugePointers>
    
        <LinearGaugePointer Value="30" />
        
    </LinearGaugePointers>
</TelerikLinearGauge>

@code {
    Telerik.Blazor.Components.TelerikLinearGauge LinearGaugeRef { get; set; }

    public string Height { get; set; } = "300px";

    private async Task ChangeTheHeight()
    {
        Height = "450px";
        // Refresh() may execute before OnParameterSet(). The delay avoids this.
        await Task.Delay(1);
        LinearGaugeRef.Refresh();
    }
}
````

## Next Steps

* [Explore the Linear Gauge Scale](slug:linear-gauge-scale)
* [Learn more about the Linear Gauge Pointers](slug:linear-gauge-pointers)

## See Also

* [Live Demo: Linear Gauge](https://demos.telerik.com/blazor-ui/lineargauge/overview)
