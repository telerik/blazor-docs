---
title: Overview
page_title: Slider Component Overview
description: Overview of the Slider for Blazor.
slug: slider-overview
tags: telerik,blazor,slider,overview
published: True
position: 0
---

# Slider Overview

The <a href="https://www.telerik.com/blazor-ui/slider" target="_blank">Blazor Slider component</a> allows the user to select a value by dragging its handle along the track, or by clicking the side arrow buttons. It provides templates, various configuration options, validation and keyboard navigation.

#### To use a Telerik Slider for Blazor

1. Add the `TelerikSlider` tag.
1. Provide the `Value` (one-way data binding) or `bind-Value` (two-way data binding) property.
1. Choose the `Min`, `Max`, `SmallStep` and `LargeStep` settings to define the appearance and behavior of the slider.


>caption Basic setup of the Telerik Slider using two-way data binding

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

>caption The result from the code snippet above

![slider first look](images/slider-overview.png)


>caption Component namespace and reference

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


## Features

The Slider provides the following features:

* `Class` - the CSS class that will be rendered on the main wrapping element of the slider.

* `Decimals` - a setting that helps avoid <a href="https://en.wikipedia.org/wiki/Round-off_error" target="_blank">round-off errors</a> (see more <a href="https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems" target="_blank">here</a>).

* `Enabled` - whether the component is enabled.

* `Id` - renders as the `id` attribute on the main wrapping element.

* `LabelTemplate` - lets you render your own custom labels for the major ticks.

* `LargeStep` - defines where the larger (longer) ticks lie - they are rendere on every n-th occurence of the `LargeStep`. Required. 

    * At least one large tick will be rendered in the beginning of the track, even if `LargeStep` is larger than the difference between the `Min` and `Max`. 
    
    * This is purely a presentational setting and we recommend setting it to a value that matches the range of the slider and the `SmallStep` for best appearance.
    
    * To disable the rendering of the large ticks, set the parameter to `0`.

* `Max` - the maximum value on the slider. Required.

* `Min` - the minimum value on the slider. Required. Must be lower than the `Max`.

* `Orientation` - whether the slider will be horizontal (the default) or vertical. Takes a member of the `Telerik.Blazor.SliderOrientation` enum.

* `ShowButtons` - whether there will be increase and decrase buttons at the ends of the slider. Defaults to `true`.

* `SmallStep` - defines the step through which the slider `Value` is changed when the user drags the handle. Also defines where small ticks appear on the track to indicate a value that can be selected. Required.

    * We recommend matching `SmallStep` with the `LargeStep` for imroved visual appearance (e.g., multiply the `SmallStep` by the desired whole number and set that to the `LargeStep`). 

    * The slider starts rendering ticks from the `Min` value and so if the `Max` does not match a tick, it will not be rendered. For example, if `Min=0` and `Max=100` but `SmallStep=15` the final value that will render will be `90` (four times the small step) and not `100`.

* `TickPosition` - lets you choose where the ticks render. Takes a member of the `Telerik.Blazor.SliderTickPosition` enum. Defaults to `Both`. Can be `Before`, `After`, `Both`, `None`. For example, with the default horizontal slider, these values will render ticks above, below, both above and below, and no ticks.

* `Value` and `bind-Value`- the value of the slider. Can be a numerical type (such as `int`, `decimal`, `double` and so on). 
    
    * When the user moves the drag handle of the slider, it changes with the `SmallStep`, but you can set a value programmatically that will land the handle between the ticks and between those steps.

* `Width` - the width of the main element. In case you would like it to fit to a container you could set it to `100%` or other percent value depending on the application needs. You can read more in the [Dimensions]({%slug common-features/dimensions%}) article.

* Events - see the [Slider events]({%slug slider-events%}) article for more information and examples.

* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article for more details.




## See Also

* [Live Demo: Slider](https://demos.telerik.com/blazor-ui/slider/overview)
* [Slider Events]({%slug slider-events%})

