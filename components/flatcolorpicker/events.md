---
title: Events
page_title: Events | FlatColorPicker for Blazor
description: Events in the FlatColorPicker for Blazor.
slug: flatcolorpicker-events
tags: telerik,blazor,flatcolorpicker,events
published: true
position: 20
---

# FlatColorPicker Events

This article describes the available events of the Telerik FlatColorPicker for Blazor.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [ViewChanged](#viewchanged)

## OnChange

The `OnChange` event fires when the user commits their selection with:

* Apply or Cancel button click
* Enter keypress

Note that the `OnChange` event may also fire when the actual selected color has not changed.

The event type is `EventCallback<object>`. The `OnChange` event does not prevent two-way binding for the `Value` attribute.

````CSHTML
@* Handle the FlatColorPicker OnChange event *@

<p>@EventLog</p>

<TelerikFlatColorPicker @bind-Value="@Color" OnChange="@FlatColorPickerOnChange" />

@code {
    string Color { get; set; }
    string EventLog { get; set; }

    async Task FlatColorPickerOnChange(object newColor)
    {
        EventLog = string.Format("The selected color is: {0}", (string)newColor);
    }
}
````

## ValueChanged

The `ValueChanged` event fires when the user selects a new color and the component value changes.

The event type is `EventCallback<string>`. Using `ValueChanged` requires one-way binding for the `Value` attribute and manual value update in the event handler.

````CSHTML
@* Handle the FlatColorPicker ValueChanged event *@

<TelerikFlatColorPicker Value="@Color" ValueChanged="@FlatColorPickerValueChanged" />

@code {
    string Color { get; set; }

    async Task FlatColorPickerValueChanged(string newColor)
    {
        Color = newColor;
    }
}
````

## ViewChanged

The `ViewChanged` event fires when the user toggles between the component views.

The event type is `EventCallback<ColorPickerView>`. Using `ViewChanged` requires one-way binding for the `View` attribute and manual value update in the event handler.

````CSHTML
@* Handle the FlatColorPicker ViewChanged event *@

<TelerikFlatColorPicker @bind-Value="@Color" View="@View" ViewChanged="@FlatColorPickerViewChanged" />

@code {
    string Color { get; set; }
    ColorPickerView View { get; set; }

    async Task FlatColorPickerViewChanged(ColorPickerView newView)
    {
        View = newView;
    }
}
````

## See Also

* [FlatColorPicker Overview]({%slug flatcolorpicker-overview%})
* [FlatColorPicker Views]({%slug flatcolorpicker-views%})
