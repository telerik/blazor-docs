---
title: Events
page_title: Events | ColorPicker for Blazor
description: Events in the ColorPicker for Blazor.
slug: colorpicker-events
tags: telerik,blazor,colorpicker,events
published: true
position: 20
---

# ColorPicker Events

This article describes the available events of the Telerik ColorPicker for Blazor.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [ViewChanged](#viewchanged)

## OnChange

The `OnChange` event fires when the user commits their selection with:

* Apply or Cancel button click
* Enter keypress
* Blur action (popup close)

Note that the `OnChange` event may also fire when the actual selected color has not changed.

The event type is `EventCallback<object>`. The `OnChange` event does not prevent two-way binding for the `Value` attribute.

````CSHTML
@* Handle the ColorPicker OnChange event *@

<p>@EventLog</p>

<TelerikColorPicker @bind-Value="@Color" OnChange="@ColorPickerOnChange" />

@code {
    string Color { get; set; }
    string EventLog { get; set; }

    async Task ColorPickerOnChange(object newColor)
    {
        EventLog = string.Format("The selected color is: {0}", (string)newColor);
    }
}
````

## ValueChanged

The `ValueChanged` event fires when the user selects a new color and the component value changes.

The event type is `EventCallback<string>`. Using `ValueChanged` requires one-way binding for the `Value` attribute and manual value update in the event handler.

````CSHTML
@* Handle the ColorPicker ValueChanged event *@

<TelerikColorPicker Value="@Color" ValueChanged="@ColorPickerValueChanged" />

@code {
    string Color { get; set; }

    async Task ColorPickerValueChanged(string newColor)
    {
        Color = newColor;
    }
}
````

## ViewChanged

The `ViewChanged` event fires when the user toggles between the popup views.

The event type is `EventCallback<ColorPickerView>`. Using `ViewChanged` requires one-way binding for the `View` attribute and manual value update in the event handler.

````CSHTML
@* Handle the ColorPicker ViewChanged event *@

<TelerikColorPicker @bind-Value="@Color" View="@View" ViewChanged="@ColorPickerViewChanged" />

@code {
    string Color { get; set; }
    ColorPickerView View { get; set; }

    async Task ColorPickerViewChanged(ColorPickerView newView)
    {
        View = newView;
    }
}
````

## See Also

* [ColorPicker Overview]({%slug colorpicker-overview%})
* [ColorPicker Views]({%slug colorpicker-views%})
