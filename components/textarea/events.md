---
title: Events
page_title: TextArea - Events
description: Events in the TextArea for Blazor.
slug: textarea-events
tags: telerik,blazor,textarea,events
published: true
position: 10
components: ["textarea"]
---

# Events

The events exposed for the Telerik TextArea for Blazor let you react to user actions and input. This article explains the events available in the Telerik TextArea.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the input loses focus.

The `OnChange` event does not prevent you from using two-way data binding.

>caption Handle OnChange event

<demo metaUrl="client/textarea/events/on-change/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input. When using the `ValueChanged` event you can not use two-way data binding, because the @bind-Value internally fires this event.

>caption Handle ValueChanged event

<demo metaUrl="client/textarea/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)



## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/textarea/events/on-blur/" height="250"></demo>


## See Also

* [TextArea Overview](slug:textarea-overview)
* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
