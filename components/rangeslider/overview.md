---
title: Overview
page_title: RangeSlider Component Overview
description: Overview of the RangeSlider for Blazor.
slug: rangeslider-overview
tags: telerik,blazor,range,slider,overview
published: True
position: 0
---

# RangeSlider Overview

The <a href="https://www.telerik.com/blazor-ui/rangeslider" target="_blank">Blazor Range Slider component</a> allows the user to select a value range by dragging its handles along the track. It provides templates, various configuration options, validation and keyboard navigation.

#### In This Article

* [To use a Telerik RangeSlider for Blazor](#to-use-a-telerik-rangeslider-for-blazor)
* [Features](#features)
* [Examples](#examples)

## To use a Telerik RangeSlider for Blazor

1. Add the `TelerikRangeSlider` tag.
1. Provide the `StartValue` and `EndValue` (one-way data binding) or `bind-StartValue` `bind-EndValue` (two-way data binding).
1. Choose the `Min`, `Max`, `SmallStep` and `LargeStep` settings to define the appearance and behavior of the slider.


>caption Basic setup of the Telerik Range Slider using two-way data binding

````CSHTML
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

>caption The result from the code snippet above

![range slider first look](images/range-slider-first-look.png)


>caption Component namespace and reference

The RangeSlider is a generic component that takes the type of the `StartValue` which can be a numerical type and is the same as the type of the `EndValue`.

````CSHTML
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


## Features

The Range Slider provides the following features:

@[template](/_contentTemplates/slider/common.md#base-slider-features)


* `StartValue` and `EndValue`; and `bind-StartValue` and `bind-EndValue`- the lower and higher values of the slider that mark the range. Can be a numerical type (such as `int`, `decimal`, `double` and so on). 
    
    * When the user moves the drag handle of the slider, it changes with the `SmallStep`, but you can set a value programmatically that will land the handle between the ticks and between those steps.

* Events - see the [Slider events]({%slug rangeslider-events%}) article for more information and examples.

## Examples

This section provides the following examples to showcase some of the slider features and their behavior:

* [Matching Ticks Steps, Min, Max](#matching-ticks-steps-min-max)
* [Not Matching Ticks Steps, Min, Max](#not-matching-ticks-steps-min-max)
* [Vertical Slider](#vertical-slider)
* [Decimals and Rounding Errors](#decimals-and-rounding-errors)

### Matching Ticks Steps, Min, Max

You can use a multiplier over the small step to set the large step, and to ensure that this can divide the difference between the min and max. This will provide the best possible appearance where ticks will be distributed evenly and you will be able to use the full range of the slider.

![matching ticks](images/rangeslider-matching-ticks.png)

````CSHTML
from @TheStartValue to @TheEndValue
<br />
<TelerikRangeSlider @bind-StartValue="@TheStartValue" @bind-EndValue="@TheEndValue"
                    SmallStep="5m" LargeStep="15m" Min="5m" Max="50m">
</TelerikRangeSlider>

@code{
    decimal TheStartValue { get; set; } = 20m;
    decimal TheEndValue { get; set; } = 45m;
}
````

### Not Matching Ticks Steps, Min, Max

In this example, the max value does not match the large step, small step and the min, so the max value is not rendered and the user can only go up to `90` instead of `100`. The small and large steps match in this example, however, the only "issue" is the `Max` value.

![non-matching values](images/rangeslider-non-matching-ticks.png)

````CSHTML
from @TheStartValue to @TheEndValue
<br />
<TelerikRangeSlider @bind-StartValue="@TheStartValue" @bind-EndValue="@TheEndValue"
                    SmallStep="15m" LargeStep="30m" Min="0m" Max="100m">
</TelerikRangeSlider>

@code{
    decimal TheStartValue { get; set; } = 20m;
    decimal TheEndValue { get; set; } = 45m;
}
````

### Vertical Slider

This example shows how to make the slider vertical.

````CSHTML
from @TheStartValue to @TheEndValue
<br /><br />
<TelerikRangeSlider Orientation="@SliderOrientation.Vertical"
                    @bind-StartValue="@TheStartValue" @bind-EndValue="@TheEndValue"
                    SmallStep="10" LargeStep="20" Min="0" Max="100">
</TelerikRangeSlider>

@code{
    int TheStartValue { get; set; } = 20;
    int TheEndValue { get; set; } = 45;
}
````


![vertical slider](images/vertical-range-slider.png)


### Decimals and Rounding Errors

The first slider in this example has a sufficient precision (`Decimals`) to properly handle the values that it will have to render in its labels and set in its `Value`. The second slider does not have sufficient precision - the `Decimals` value is too low and thus the rounding in the labels texts and of the `StartValue` and `EndValue` will be off a little.

To see the difference in how rounding can have issues with insufficient precision, try changing the values from each slider - you will see that the second slider does not respond "correctly" and as expected.

![precision issues with wrong Decimals setting](images/slider-precision-issue.gif)

````CSHTML
@TheStartValue to @TheEndValue
<br /><br />

@* Sufficient precision for the selected values and steps *@

<TelerikRangeSlider @bind-StartValue="@TheStartValue" @bind-EndValue="@TheEndValue" Decimals="3"
                    SmallStep="0.005m" LargeStep="0.02m" Min="0m" Max="0.1m" Width="500px">
</TelerikRangeSlider>

<br /><br />

@* Insufficient precision for the current values and steps
    the labels texts will be off and the value will not change every time you move the handle
    only when it reaches the threshold of the decimals which default to 2 for invariant and most cultures*@

<TelerikRangeSlider @bind-StartValue="@TheStartValue" @bind-EndValue="@TheEndValue" Decimals="2"
                    SmallStep="0.005m" LargeStep="0.02m" Min="0m" Max="0.1m" Width="500px">
</TelerikRangeSlider>

@code{
    decimal TheStartValue { get; set; } = 0.015m;
    decimal TheEndValue { get; set; } = 0.02m;
}
````



## See Also

* [Live Demo: RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/overview)
* [Live Demo: RangeSlider Settings](https://demos.telerik.com/blazor-ui/rangeslider/customization)
* [RangeSlider Events]({%slug rangeslider-events%})

