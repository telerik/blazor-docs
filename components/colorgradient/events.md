---
title: Events
page_title: Events | ColorGradient for Blazor
description: Events in the ColorGradient for Blazor.
slug: colorgradient-events
tags: telerik,blazor,colorgradient,events
published: true
position: 10
---

# ColorGradient Events

This article describes the available events of the Telerik ColorGradient for Blazor.

* [FormatChanged](#formatchanged)
* [ValueChanged](#valuechanged)


## FormatChanged

The `FormatChanged` event fires when the user clicks on the toggle button, which changes the input format. The event can help you persist the selected `Format` at a later stage.

When using this event, make sure to update the component `Format` programmatically in the event handler.

>caption Handle the ColorGradient FormatChanged event

````CSHTML
@* Handle the ColorGradient FormatChanged event *@

<TelerikColorGradient
    @bind-Value="@Value"
    Format="@Format"
    FormatChanged="@FormatChangedHandler" />

@code {
    string Value { get; set; }
    ColorFormat Format { get; set; }

    async Task FormatChangedHandler(ColorFormat newFormat)
    {
        Format = newFormat;
    }
}
````

## ValueChanged

The `ValueChanged` event fires continuously while the user is dragging the component handles, or changing the textbox values.

When using this event, make sure to update the component `Value` programmatically in the event handler.

>caption Handle the ColorGradient ValueChanged event

````CSHTML
@* Handle the ColorGradient ValueChanged event *@

<TelerikColorGradient
    Value="@Value"
    ValueChanged="@ValueChangedHandler" />

@code {
    string Value { get; set; }

    async Task ValueChangedHandler(string newValue)
    {
        Value = newValue;
    }
}

````


## See Also

* [ColorGradient Overview]({%slug colorgradient-overview%})
* [ColorGradient Live Demo](https://demos.telerik.com/blazor-ui/colorgradient/overview)
