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

This article describes the available events of the Telerik Carousel for Blazor.

* [OnChange](#onchange)

* `OnBlur` - `EventCallback` - fires when the colorpicker is blured.
* `OnChange` - `EventCallback<object>` - fires when the change is committed by the user - on Apply click, Enter, or Blur action.
* `ValueChanged` - `EventCallback<string>` - fires when the value of the ColorPicker is changed.
* `ViewChanged` - `EventCallback<ColorPickerView` - eventcallback that assures the two-way binding of the View parameter. Fires when the view is changed.


## OnChange

The `OnChanged` event fires when ...

````CSHTML
@* Handle the ColorPicker OnChange event *@

@code {

    public async Task OnChangeHandler()
    {
        
    }
}
````

## See Also

* [ColorPicker Overview]({%slug colorpicker-overview%})
