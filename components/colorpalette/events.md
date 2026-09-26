---
title: Events
page_title: Color Palette - Events
description: Events in the Color Palette for Blazor.
slug: colorpalette-events
tags: telerik,blazor,Color,Palette,events
published: true
position: 50
components: ["colorpalette"]
---

# Events

This article explains the events available in the Telerik Color Palette for Blazor:


* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user clicks, taps or presses `Enter` to select a color, or when the component loses focus. It does not prevent you from using two-way binding for the `Value`.

>caption Handle OnChange and use two-way binding for the Value

<demo metaUrl="client/colorpalette/events/on-change/" height="420"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires upon every change (selection of color) in the component. Its main purpose is to provide two-way biding of the `Value`.

>caption Handle ValueChanged

<demo metaUrl="client/colorpalette/events/value-changed/" height="420"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/colorpalette/events/on-blur/" height="420"></demo>

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
