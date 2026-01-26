---
title: Overview
page_title: RangeSlider Component Overview
description: Discover the Blazor RangeSlider and explore the examples.
slug: rangeslider-overview
tags: telerik,blazor,range,slider,overview
published: True
position: 0
components: ["rangeslider"]
---
# Blazor RangeSlider Overview

The <a href="https://www.telerik.com/blazor-ui/rangeslider" target="_blank">Blazor Range Slider component</a> allows the user to select a value range by dragging its handles along the track. It provides templates, various configuration options, validation and keyboard navigation.

## Creating RangeSlider

1. Use the `TelerikRangeSlider` tag to add the component to your razor page.

1. Provide the `StartValue` and `EndValue` (one-way data binding) or `bind-StartValue` `bind-EndValue` (two-way data binding).

1. Choose the `Min`, `Max`, `SmallStep` and `LargeStep` settings to define the appearance and behavior of the slider.


>caption Basic setup of the Telerik RangeSlider using two-way data binding

````RAZOR
@* The user can choose decimal values range with a step of 5 and every 20 there will be a major tick. The label template is also used to add a currency symbol *@

The user wants products between @MinPrice.ToString("C2") and @MaxPrice.ToString("C2")
<br /><br />

<TelerikRangeSlider @bind-StartValue="@MinPrice"
                    @bind-EndValue="@MaxPrice"
                    Min="@LowestPrice"
                    Max="@HighestPrice"
                    SmallStep="5m"
                    LargeStep="20m"
                    Width="550px">
    <LabelTemplate>
        @context.ToString("C2")
    </LabelTemplate>
</TelerikRangeSlider>

@code {
    decimal MinPrice { get; set; } = 20m;
    decimal MaxPrice { get; set; } = 75m;
    decimal LowestPrice { get; set; } = 10m;
    decimal HighestPrice { get; set; } = 150m;
}
````


## Component Reference

The RangeSlider is a generic component that takes the type of the `StartValue` which can be a numerical type and is the same as the type of the `EndValue`.

````RAZOR
@code {
    TelerikRangeSlider<decimal> TheRangeSlider { get; set; }

    decimal MinPrice { get; set; } = 20m;
    decimal MaxPrice { get; set; } = 75m;
    decimal LowestPrice { get; set; } = 10m;
    decimal HighestPrice { get; set; } = 150m;
}

<TelerikRangeSlider @bind-StartValue="@MinPrice"
                    @bind-EndValue="@MaxPrice"
                    @ref="@TheRangeSlider"
                    Min="@LowestPrice"
                    Max="@HighestPrice"
                    SmallStep="5m"
                    LargeStep="20m">
</TelerikRangeSlider>
````

## Steps

The RangeSlider works with small and large steps and they are both required. Read more for their configuration and explore examples in the [Steps article](slug:rangeslider-steps).

## Ticks Position

The RangeSlider lets you choose where its ticks will render. You can control that through the `TickPosition` parameter. It takes a member of the `Telerik.Blazor.SliderTickPosition` enum. Can be `Before`, `After`, `Both`(the default), `None`. For example, with the default horizontal slider, these values will render ticks above, below, both above and below, and no ticks.

## Orientation

You can customize the default horizontal orientation of the RangeSlider through its `Orientation` parameter. Takes a member of the `Telerik.Blazor.SliderOrientation` enum which contains `Horizontal`(the default) and `Vertical` options.

## Decimals

This setting helps avoid [round-off errors](https://en.wikipedia.org/wiki/Round-off_error) when calculating steps (see more about this type of errors [here](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems)). Explore the [Decimals article](slug:rangeslider-decimals) for details on how to configure this option.

## Validation

You can validate RangeSlider value using the built-in validation. See the [Input Validation](slug:common-features/input-validation) article for more details.

## Parameters

The RangeSlider provides various parameters that allow you to configure the component:

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Decimals` | `int` | Specifies the number precision for the steps.
| `Enabled` | `bool` | whether the component is enabled.
| `LabelTemplate` | `RenderFragment<TValue>` | lets you render your own custom labels for the major ticks.
| `LargeStep` | `TValue` | defines where the larger (longer) ticks lie - they are rendered on every n-th occurrence of the `LargeStep`. Required.
| `Max` | `TValue` | the maximum value on the slider. Required.
| `Min` | `TValue` | the minimum value on the slider. Required. Must be lower than the `Max`.
| `SmallStep` | `TValue` | defines the step through which the slider `Value` is changed when the user drags the handle. Also defines where small ticks appear on the track to indicate a value that can be selected. Required.
| `Orientation` | `SliderOrientation` <br/> (`Horizontal`) | whether the slider will be horizontal (the default) or vertical.
| `TickPosition` | `SliderTickPosition` <br/> (`Both`) | controls the position of the ticks.
| `StartValue` and `EndValue`; and `bind-StartValue` and `bind-EndValue` | `TValue` |the lower and higher values of the slider that mark the range. Can be a numerical type (such as `int`, `decimal`, `double` and so on). When the user moves the drag handle of the slider, it changes with the `SmallStep`, but you can set a value programmatically that will land the handle between the ticks and between those steps.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Slider:

@[template](/_contentTemplates/slider/common.md#styling-features)

## Next Steps

* [RangeSlider Steps](slug:rangeslider-steps)

## See Also

* [Live Demo: RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/overview)
* [Live Demo: RangeSlider Settings](https://demos.telerik.com/blazor-ui/rangeslider/customization)
* [RangeSlider Events](slug:rangeslider-events)

