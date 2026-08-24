---
title: Events
page_title: MaskedTextbox - Events
description: Events in the Masked Textbox for Blazor.
slug: maskedtextbox-events
tags: telerik,blazor,masked,textbox,events
published: true
position: 50
components: ["maskedtextbox"]
---

# Events

This article explains the events available in the Telerik MaskedTextbox for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus. It does not prevent you from using two-way binding for the `Value`.

>caption Handle OnChange and use two-way binding for the Value

<demo metaUrl="client/maskedtextbox/events/on-change/" height="220"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle ValueChanged

<demo metaUrl="client/maskedtextbox/events/value-changed/" height="220"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/maskedtextbox/events/on-blur/" height="220"></demo>

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
