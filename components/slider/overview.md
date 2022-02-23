---
title: Overview
page_title: Slider Component Overview
description: Discover the Blazor Slider and explore the examples.
slug: slider-overview
tags: telerik,blazor,slider,overview
published: True
position: 0
---

# Blazor Slider Overview

The <a href="https://www.telerik.com/blazor-ui/slider" target="_blank">Blazor Slider component</a> allows the user to select a value by dragging its handle along the track, or by clicking the side arrow buttons. It provides templates, various configuration options, validation and keyboard navigation.

## Creating Slider

1. Use the `TelerikSlider` tag to add the component to your razor page.

1. Provide the `Value` (one-way data binding) or `bind-Value` (two-way data binding) property.

1. Choose the `Min`, `Max`, `SmallStep` and `LargeStep` settings to define the appearance and behavior of the Slider.


>caption Creating Slider with two-way value binding and main features

````CSHTML
@* The user can choose integers with a step of 1 and every 20 there will be a major tick *@

@Volume
<br />
<TelerikSlider @bind-Value="@Volume"
               Min="0"
               Max="100"
               SmallStep="1"
               LargeStep="20"
               Width="400px">
</TelerikSlider>

@code{
    int Volume { get; set; } = 33;
}
````

## Component Reference

The Slider is a generic component that takes the type of the `Value` which can be e numerical type.

````CSHTML
@TheValue
<br />
<TelerikSlider @bind-Value="@TheValue" SmallStep="0.5m" LargeStep="5m" Min="0m" Max="20m" @ref="@TheSlider">
</TelerikSlider>

@code{
    Telerik.Blazor.Components.TelerikSlider<decimal> TheSlider { get; set; }

    decimal TheValue { get; set; } = 12.3m;
}
````

## Steps

The Slider works with small and large steps and they are both required. Read more for their configuration and explore examples in the [Steps article]({%slug slider-steps%}).

## Ticks Position

The Slider lets you choose where its ticks will render. You can control that through the `TickPosition` parameter. It takes a member of the `Telerik.Blazor.SliderTickPosition` enum. Can be `Before`, `After`, `Both` (the default), `None`. For example, with the default horizontal slider, these values will render ticks above, below, both above and below, and no ticks.

## Orientation

You can customize the default horizontal orientation of the Slider through its `Orientation` parameter. Takes a member of the `Telerik.Blazor.SliderOrientation` enum which contains `Horizontal`(the default) and `Vertical` options.

## Decimals

This setting helps avoid [round-off errors](https://en.wikipedia.org/wiki/Round-off_error) when calculating steps (see more about this type of errors [here](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems)). Explore the [Decimals article]({%slug rangeslider-decimals%}) for details on how to configure this option.

## Validation

You can validate Slider value using the built-in validation. See the [Input Validation]({%slug common-features/input-validation%}) article for more details.

## Parameters

The Slider provides various parameters that allow you to configure the component:

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Decimals` | `int` | Specifies the number precision for the steps.
| `Enabled` | `bool` | whether the component is enabled.
| `LabelTemplate` | `RenderFragment<TValue>` | lets you render your own custom labels for the major ticks.
| `LargeStep` | `TValue` | defines where the larger (longer) ticks lie - they are rendered on every n-th occurrence of the `LargeStep`. Required. read more in ...
| `Max` | `TValue` | the maximum value on the slider. Required.
| `Min` | `TValue` | the minimum value on the slider. Required. Must be lower than the `Max`.
| `SmallStep` | `TValue` | defines the step through which the slider `Value` is changed when the user drags the handle. Also defines where small ticks appear on the track to indicate a value that can be selected. Required.
| `Orientation` | `SliderOrientation` <br/> (`Horizontal`) | whether the slider will be horizontal (the default) or vertical.
| `TickPosition` | `SliderTickPosition` <br/> (`Both`) | controls the position of the ticks.
| `ShowButtons` | `bool` | whether there will be increase and decrease buttons at the ends of the slider. Defaults to `true`.
|`Value` and `bind-Value`| `TValue` | the value of the slider. Can be a numerical type (such as `int`, `decimal`, `double` and so on). When the user moves the drag handle of the slider, it changes with the `SmallStep`, but you can set a value programmatically that will land the handle between the ticks and between those steps.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Slider:

@[template](/_contentTemplates/slider/common.md#styling-features)


## Next Steps

* [Slider Steps]({%slug slider-steps%})

## See Also

* [Live Demo: Slider](https://demos.telerik.com/blazor-ui/slider/overview)
* [Live Demo: Slider Settings](https://demos.telerik.com/blazor-ui/slider/customization)
* [Slider Events]({%slug slider-events%})

