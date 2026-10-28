---
title: Events
page_title: TimePicker - Events
description: Events in the TimePicker for Blazor.
slug: components/timepicker/events
tags: telerik,blazor,TimePicker,events
published: true
position: 20
components: ["timepicker"]
---

# Events

This article explains the events available in the Telerik TimePicker for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input, and upon clicking the `Set` or `Now` buttons in the dropdown.

The event handler receives the new value as an argument and you must update the component `Value` programmatically for the user changes to take effect.

>caption Handle the TimePicker ValueChanged event

<demo metaUrl="client/timepicker/events/example-5/" height="420"></demo>

## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user:

* Presses `Enter` while the textbox is focused.
* Clicks **Set** in the time selection popup.
* Blurs the component.

The event handler receives an `object` argument that you need to cast to the actual `Value` type. The argument can hold a value or be `null`, depending on the user input and the `Value` type.

The TimePicker is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle DateTimePicker OnChange and use two-way Value binding

<demo metaUrl="client/timepicker/events/example-4/" height="420"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

## OnOpen

The `OnOpen` event fires before the TimePicker popup renders. 

The event handler receives as an argument an `TimePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/timepicker/events/example-3/" height="420"></demo>

## OnClose

The `OnClose` event fires before the TimePicker popup closes.

The event handler receives as an argument an `TimePickerCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/timepicker/events/example-2/" height="420"></demo>

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/timepicker/events/example-1/" height="420"></demo>


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
