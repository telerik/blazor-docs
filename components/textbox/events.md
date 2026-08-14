---
title: Events
page_title: Textbox - Events
description: Events in the Textbox for Blazor.
slug: components/textbox/events
tags: telerik,blazor,textbox,events
published: true
position: 20
components: ["textbox"]
---

# Events

This article explains the events available in the <a href = "https://www.telerik.com/blazor-ui/textbox" target="_blank">Telerik Textbox for Blazor</a>:

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the TextBox OnBlur event

<demo metaUrl="client/textbox/events/on-blur/" height="250"></demo>

## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user presses `Enter` or `Tab` in the input, or when the input loses focus. If you need to monitor the component `Value` while the user is typing, then use the [`ValueChanged` event](#valuechanged) instead.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the TextBox OnChange event and use two-way Value binding

<demo metaUrl="client/textbox/events/on-change/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle the TextBox ValueChanged event

<demo metaUrl="client/textbox/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
