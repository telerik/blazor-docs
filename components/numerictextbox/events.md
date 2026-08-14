---
title: Events
page_title: NumericTextbox - Events
description: Events in the NumericTextbox for Blazor.
slug: components/numerictextbox/events
tags: telerik,blazor,numeric,textbox,events
published: true
position: 20
components: ["numerictextbox"]
---

# Events

This article explains the events available in the Telerik NumericTextbox for Blazor:

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)


## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/numerictextbox/events/on-blur/" height="220"></demo>


## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user presses `Enter` in the input or when the input loses focus.

The event handler receives an `object` argument that you need to cast to the actual `Value` type. The argument can hold a value or be `null`, depending on the user input and the `Value` type.

The NumericTextBox is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle OnChange and use two-way binding

<demo metaUrl="client/numerictextbox/events/on-change/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires during typing.

The event handler argument can hold a value or be `null`, depending on the user input and the `Value` type.

Using this event requires one-way binding for the `Value` parameter and manual updating of the value in the handler. If the value is not updated, this will effectively cancel the event.

>caption Handle ValueChanged

<demo metaUrl="client/numerictextbox/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
