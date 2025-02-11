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

````RAZOR
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

````RAZOR
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

The Slider works with small and large steps and they are both required. Read more for their configuration and explore examples in the [Steps article](slug:slider-steps).

## Ticks Position

The Slider lets you choose where its ticks will render. You can control that through the `TickPosition` parameter. It takes a member of the `Telerik.Blazor.SliderTickPosition` enum. Can be `Before`, `After`, `Both` (the default), `None`. For example, with the default horizontal slider, these values will render ticks above, below, both above and below, and no ticks.

## Orientation

You can customize the default horizontal orientation of the Slider through its `Orientation` parameter. Takes a member of the `Telerik.Blazor.SliderOrientation` enum which contains `Horizontal`(the default) and `Vertical` options.

## Decimals

This setting helps avoid [round-off errors](https://en.wikipedia.org/wiki/Round-off_error) when calculating steps (see more about this type of errors [here](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems)). Explore the [Decimals article](slug:rangeslider-decimals) for details on how to configure this option.

## Validation

You can validate Slider value using the built-in validation. See the [Input Validation](slug:common-features/input-validation) article for more details.

## Parameters

The Slider provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `Decimals` | `int` | The number precision for the steps.
| `Enabled` | `bool` | Sets if the component accepts user interaction.
| `LabelTemplate` | `RenderFragment<TValue>` | A container for custom labels for the major ticks.
| `LargeStep` | `TValue` | The numeric interval between the large ticks. Read more in [Slider Steps](slug:slider-steps).
| `Max` | `TValue` | The maximum value of the Slider. Required.
| `Min` | `TValue` | The minimum value on the Slider. Required and must be less than `Max`.
| `SmallStep` | `TValue` | The numeric interval between all selectable Slider values. The parameter also defines where small ticks appear on the track. The Slider `Value` may be between two small ticks, but such a value can only be set programmatically. Read more in [Slider Steps](slug:slider-steps).
| `Orientation` | `SliderOrientation` <br/> (`Horizontal`) | Defines whether the Slider is horizontal or vertical.
| `TickPosition` | `SliderTickPosition` <br/> (`Both`) | Sets which side of the Slider shows ticks.
| `ShowButtons` | `bool` <br /> (`true`) | Sets if the Slider renders buttons to increase and decrease the `Value`.
| `Value` | `TValue` | The Slider value. Can be a numerical type (such as `int`, `decimal`, `double` and so on).

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Slider:

@[template](/_contentTemplates/slider/common.md#styling-features)


## Next Steps

* [Slider Steps](slug:slider-steps)

## See Also

* [Live Demo: Slider](https://demos.telerik.com/blazor-ui/slider/overview)
* [Live Demo: Slider Settings](https://demos.telerik.com/blazor-ui/slider/customization)
* [Slider Events](slug:slider-events)

