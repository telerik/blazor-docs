---
title: Events
page_title: Calendar - Events
description: Events in the Calendar for Blazor.
slug: components/calendar/events
tags: telerik,blazor,calendar,events
published: true
position: 21
components: ["calendar"]
---

# Events

This article explains the events available in the Telerik Calendar for Blazor:

* [ValueChanged](#valuechanged)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)
* [RangeStartChanged and RangeEndChanged](#rangestartchanged-and-rangeendchanged)
* [OnCellRender](#oncellrender)

## ValueChanged

The `ValueChanged` event fires when the user selects a date. To see how to handle it and to obtain the user selection, review the [Selection](slug:components/calendar/selection) article.

## DateChanged

The `DateChanged` event fires when the currently shown date changes. For example, when the user [navigates](slug:components/calendar/navigation) from one month to the next through the arrows.

When handling the `DateChanged` event, you cannot use two-way binding for the `Date` parameter. You should update it yourself in the model. If you do not, the currently shown range may revert to the original value set in the markup or to the default value.

<demo metaUrl="client/calendar/events/date-changed/" height="500"></demo>

>tip You are not required to provide an initial value to the `Date` parameter. It will default to `DateTime.Now`.

## ViewChanged

The `ViewChanged` event fires when the user changes the view they are seeing (for example, goes up from the days in the month to the months in the year).

When handling the `ViewChanged` event, you cannot use two-way binding for the `View` parameter. You should update it yourself in the model. If you do not, the currently shown view may revert to the original value set in the markup or to the default value.

<demo metaUrl="client/calendar/events/view-changed/" height="500"></demo>

>tip You are not required to provide an initial value to the `View` parameter. It will default to `CalendarView.Month`.

## RangeStartChanged and RangeEndChanged

The two RangeChanged events (`RangeStartChanged` and `RangeEndChanged`) fire when the user selects a new range.

When the user selects a range from the calendar, the first click always fires the start change with the selected date, and then clears the end of the range, so the end change event fires as well, with the default value for `DateTime` - this indicates that the end of the range is undefined. If the second click is on a date before the range start - it will become the new start.

>caption Example of `Range` Selection with `RangeStartChanged` and `RangeEndChanged` events

<demo metaUrl="client/calendar/events/range-changed/" height="650"></demo>

## OnCellRender

The `CellRender` event fires when each cell in each view is about to render. The event allows you to find out the current view and cell date. You can also set a custom CSS class for the `<td>` element.

The event arguments are of type `CalendarCellRenderEventArgs` and provide the following fields:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the cell DOM element. |
| `Date` | `DateTime` | The date of the cell |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

You can also customize the cells through their [templates](slug:calendar-templates-overview). You can use the event together with the templates.

>caption Use the CellRender event to style cells based on conditions

<demo metaUrl="client/calendar/events/cell-render/" height="500"></demo>

## See Also

* [Selection](slug:components/calendar/selection)
* [Navigation](slug:components/calendar/navigation)
