---
title: Label Template
page_title: Slider - Label Template
description: Label Template in the Slider for Blazor.
slug: slider-label-template
tags: telerik,blazor,slider,label,template
published: true
position: 10
---

# Label Template

You can customize what the slider labels render through the `LabelTemplate`.

The labels are shown on each major tick (`LargeStep`) and by default they render its value. The template receives that value as its `context`. 

>caption This article provides the following examples:


* [Basic Template](#basic-template)

* [Labels for Min and Max Only](#labels-for-min-and-max-only)

* [Show and Select Items](#show-and-select-items)

## Basic Template

This example shows how to use the current label value and to add styling and a currency symbol.

![basic template with currency symbol and styling](images/slider-basic-template-currency.png)

````CSHTML
@TheValue
<br /><br />

<TelerikSlider @bind-Value="@TheValue"
               Min="50.0m"
               Max="170.0m"
               SmallStep="5m"
               LargeStep="20m"
               Width="500px">
    <LabelTemplate>
        <span style="font-weight:bold; font-style: italic;">
            @context.ToString("C2")
        </span>
    </LabelTemplate>
</TelerikSlider>

@code{
    decimal TheValue { get; set; } = 70m;
}
````

## Labels for Min and Max Only

This example shows how you can render text only for the min and max values of the slider.

![labels for the min and max only](images/slider-labels-for-min-and-max-only.png)

````CSHTML
@TheValue
<br /><br />

<TelerikSlider @bind-Value="@TheValue"
               Min="@Min"
               Max="@Max"
               SmallStep="5m"
               LargeStep="20m"
               Width="500px">
    <LabelTemplate>
        @if (context == Min || context == Max)
        {
            @context
        }
    </LabelTemplate>
</TelerikSlider>

@code{
    decimal TheValue { get; set; } = 70m;
    decimal Min { get; set; } = 50.0m;
    decimal Max { get; set; } = 170m;
}
````

## Show and Select Items

While the slider is a numeric input, you can use its values to match against indexes of a collection - with this you can extract a full model and also display complex content for the items. You can set the `SmallStep` and `LargeStep` to `1` so there are only major ticks that act as items for the user and so that they are integer indexes.

![model items in the slider](images/slider-items.png)

````CSHTML
actual slider value: @TheIndex
<br />slider item text: @SliderItems[TheIndex].Text
<br />selected item value: @SliderItems[TheIndex].Value
<br />more data from the selected item: @SliderItems[TheIndex].Text
<br /><br />

<TelerikSlider @bind-Value="@TheIndex"
               Min="@Min"
               Max="@Max"
               SmallStep="@Step"
               LargeStep="@Step"
               Width="500px">
    <LabelTemplate>
        <span class="rotatedText">@SliderItems[context].Text</span>
    </LabelTemplate>
</TelerikSlider>

@code{
    int TheIndex { get; set; }
    int Min { get; set; } = 0;
    int Step { get; set; } = 1;
    int Max { get; set; }

    List<MySliderItem> SliderItems { get; set; }

    protected override async Task OnInitializedAsync()
    {
        SliderItems = Enumerable.Range(1, 5).Select(x => new MySliderItem
        {
            Value = 123 * x,
            Text = $"item {x}",
            MoreData = $"{x} lorem ipsum"
        }).ToList();

        Max = SliderItems.Count - 1;

        TheIndex = 2;
    }

    public class MySliderItem
    {
        public int Value { get; set; }
        public string Text { get; set; }
        public string MoreData { get; set; }
    }
}

<style>
    .rotatedText {
        transform: rotate(90deg);
        display: inline-block;
        padding-left: 2em;
    }
</style>
````

## See Also

* [Slider Overview]({%slug slider-overview%})
* [Live Demo: Slider Label Template](https://demos.telerik.com/blazor-ui/slider/label-template)