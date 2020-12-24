---
title: Events
page_title: RangeSlider - Events
description: Events in the RangeSlider for Blazor.
slug: rangeslider-events
tags: telerik,blazor,range,slider,events
published: true
position: 20
---

# Events

This article showcases the available events in the Telerik RangeSlider component:

* [ValueChanged](#valuechanged)

## ValueChanged

The `ValueChanged` event fires every time the `Value` parameter changes. This happens when the user clicks or taps the increase/decrease buttons; and after the user stops dragging the handle. The event does not fire continuously while the user is dragging the handle because that would re-render the component and cause both poor performance, and the user to stop dragging because the element they are dragging will disappear.

>caption Handle ValueChanged

````CSHTML
@*This example showcases one-way data binding by using Value and ValueChanged*@

@TheValue
<br /><br />
<TelerikSlider Value="@TheValue" ValueChanged="@( (int v) => ValueChangedHandler(v))"
               SmallStep="10" LargeStep="20" Min="0" Max="100" Width="500px">
</TelerikSlider>

@code{
    int TheValue { get; set; } = 30;

    async Task ValueChangedHandler(int v)
    {
        // update the view-model to let the change render
        // if you avoid that, you wil effectively cancel the event
        TheValue = v;

        Console.WriteLine($"The user has now chosen {v}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [Slider Overview]({%slug slider-overview%})