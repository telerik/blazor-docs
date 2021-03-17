---
title: Events
page_title: Color Palette - Events
description: Events in the Color Palette for Blazor.
slug: colorpalette-events
tags: telerik,blazor,Color,Palette,events
published: true
position: 50
---

# Events

This article explains the events available in the Telerik Color Palette for Blazor:


* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user clicks, taps or presses `Enter` to select a color, or when the component loses focus. It does not prevent you from using two-way binding for the `Value`.

>caption Handle OnChange and use two-way binding for the Value

````CSHTML
@MyColor
<br />

<TelerikColorPalette @bind-Value="@MyColor" OnChange="@OnChangeHandler">
</TelerikColorPalette>

@code {
    string MyColor { get; set; }
    
    async Task OnChangeHandler(object color)
    {
        string selectedColor = (string)color;
        Console.WriteLine($"two-way binding: {MyColor}, event argument: {selectedColor}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires upon every change (selection of color) in the component. Its main purpose is to provide two-way biding of the `Value`.

>caption Handle ValueChanged

````CSHTML
@MyColor
<br />

<TelerikColorPalette Value="@MyColor" ValueChanged="@ValueChangedHandler">
</TelerikColorPalette>

@code {
    string MyColor { get; set; }
    
    async Task ValueChangedHandler(string color)
    {
        // make sure to update the view-model. If you don't, you will effectively cancel the event
        MyColor = color;

        Console.WriteLine($"The user selected the color {MyColor}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

@MyColor
<br />

<TelerikColorPalette @bind-Value="@MyColor" OnBlur="@OnBlurHandler">
</TelerikColorPalette>

@code {
    string MyColor { get; set; }
    
    async Task OnBlurHandler()
    {
        Console.WriteLine($"Lost focus. The color is {MyColor}");
    }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
