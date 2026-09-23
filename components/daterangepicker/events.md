---
title: Events
page_title: DateRangePicker - Events
description: Events in the DateRangePicker for Blazor.
slug: daterangepicker-events
tags: telerik,blazor,DateRangePicker,events
published: true
position: 20
components: ["daterangepicker"]
---

# Events

This article explains the events available in the Telerik DateRangePicker for Blazor:


* [StartValueChanged and EndValueChanged](#startvaluechanged-and-endvaluechanged)
* [OnChange](#onchange)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [ViewChanged](#viewchanged)
* [OnCalendarCellRender](#oncalendarcellrender)


## StartValueChanged and EndValueChanged

The two `ValueChanged` events (`StartValueChanged` and `EndValueChanged`) fire when the user selects a new range.

When the user types in the inputs, they fire independently - only the event for the corresponding input fires.

When the user selects a range from the calendar popup, the first click always fires the start change with the selected date, and then clears the end of the range, so the end change event fires as well, with the `default` value for the model field.

>note The user can only type in the inputs and that will fire the corresponding event. Selecting from the calendar popup also fires the event. There is no way to know what the user intent is when they start modifying the values - whether they will modify one or both, so there is no definitive way to know when the user has finished using the component. Such logic is heuristic and is up to the application.

> If [`AdaptiveRendering`](slug:adaptive-rendering) is enabled, on small and medium devices `StartValueChanged` and `EndValueChanged` will fire only when the user clicks the confirmation button in the action sheet.

>caption Handle StartValueChanged and EndValueChanged

<demo metaUrl="client/daterangepicker/events/valuechanged-6/" height="520"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus. The focus will also be lost when the user starts clicking in the calendar popup.

>caption Handle OnChange

<demo metaUrl="client/daterangepicker/events/onchange-5/" height="520"></demo>

## OnOpen

The `OnOpen` event fires before the DateRangePicker popup renders. 

The event handler receives as an argument an `DateRangePickerOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/daterangepicker/events/onchange-4/" height="520"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

## OnClose

The `OnClose` event fires before the DateRangePicker popup closes.

The event handler receives as an argument an `DateRangePickerCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/daterangepicker/events/onchange-3/" height="520"></demo>

## ViewChanged

The `ViewChanged` event fires when the user changes the view they are seeing in the calendar popup (for example, goes up from the days in the month to the months in the year).

>caption Handle the ViewChanged event

<demo metaUrl="client/daterangepicker/events/viewchanged-2/" height="520"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnCalendarCellRender

The `OnCalendarCellRender` event fires when each calendar cell in each view is about to render. The event allows you to find out the current view and cell date. You can also set a custom CSS class for the `<td>` element.

The event handler receives as an argument an `DateRangePickerCalendarCellRenderEventArgs` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the calendar cell DOM element. |
| `Date` | `DateTime` | The date of the calendar cell. |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

>caption Handle the OnCalendarCellRender event.

<demo metaUrl="client/daterangepicker/events/calendarcellrender-1/" height="520"></demo>

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
