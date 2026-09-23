---
title: Events
page_title: DateTimePicker - Events
description: Events in the DateTimePicker for Blazor.
slug: components/datetimepicker/events
tags: telerik,blazor,DateTimePicker,events
published: true
position: 20
components: ["datetimepicker"]
---

# Events

This article explains the events available in the Telerik DateTimePicker for Blazor:

* [FocusedDateChanged](#focuseddatechanged)
* [OnBlur](#onblur)
* [OnCalendarCellRender](#oncalendarcellrender)
* [OnChange](#onchange)
* [OnClose](#onclose)
* [OnOpen](#onopen)
* [ValueChanged](#valuechanged)


## FocusedDateChanged

The `FocusedDateChanged` event fires when the user:

* Navigates to another month in the DatePicker popup Calendar.
* Selects a date that doesn't match the current `FocusedDate` value.
* Closes the Calendar popup without selecting a value, if the Calendar is not showing the current month.

See [Focused Date](slug:components/datetimepicker/overview#focused-date) for additional information.

>caption Using the DatePicker FocusedDateChanged event

<demo metaUrl="client/datetimepicker/events/focuseddatechanged-7/" height="670"></demo>


## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/datetimepicker/events/blur-6/" height="620"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to:
* Identify the current view.
* Find out the cell date.
* Set a custom CSS class for the `<td>` element.

As an argument, the event handler receives a [`DateTimePickerCalendarCellRenderEventArgs` object](slug:telerik.blazor.components.datetimepickercalendarcellrendereventargs), which contains the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

<demo metaUrl="client/datetimepicker/events/calendarcellrender-5/" height="620"></demo>

## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user:

* Presses `Enter` while the textbox is focused.
* Clicks **Set** in the date and time selection popup.
* Blurs the component.

The event handler receives an `object` argument that you need to cast to the actual `Value` type. The argument can hold a value or be `null`, depending on the user input and the `Value` type.

The DateTimePicker is a generic component, so you must either provide a `Value`, or a type to the `T` parameter of the component.

>caption Handle DateTimePicker OnChange and use two-way Value binding

<demo metaUrl="client/datetimepicker/events/onchange-4/" height="620"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## OnClose

The `OnClose` event fires before the DateTimePicker popup closes.

As an argument, the event handler receives a [`DateTimePickerCloseEventArgs` object](slug:telerik.blazor.components.datetimepickercloseeventargs), which contains the following properties:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/datetimepicker/events/onchange-3/" height="620"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnOpen

The `OnOpen` event fires before the DateTimePicker popup renders. 

As an argument, the event handler receives a [`DateTimePickerOpenEventArgs` object](slug:telerik.blazor.components.datetimepickeropeneventargs), which contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/datetimepicker/events/onchange-2/" height="620"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires:

 * On Calendar or TimeView selection and during typing when the resulting input value is valid.
 * On input blur if the input value is not valid and the `Value` type is nullable.

>caption Handle ValueChanged and provide initial value

<demo metaUrl="client/datetimepicker/events/valuechanged-1/" height="620"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
