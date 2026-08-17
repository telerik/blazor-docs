---
title: Selection
page_title: Calendar - Selection
description: Selection in the Calendar for Blazor.
slug: components/calendar/selection
tags: telerik,blazor,calendar,selection,select date,multiple selection
published: True
position: 2
components: ["calendar"]
---

# Date Selection

The user can select one or mode dates depending on the Calendar configuration set by the developer. They may also be forbidden selection of certain disabled dates.

This article contains the following sections:

* [Selection Mode](#selection-mode)
* [Receive User Selection](#receive-user-selection)
	* [Single Selection Mode](#single-selection-mode)
	* [Multiple Selection Mode](#multiple-selection-mode)
	* [Range Selection Mode](#range-selection-mode)
* [Disabled Dates](#disabled-dates)

## Selection Mode

To control how many dates the user can select, use the `SelectionMode` property. It takes a member of the `Telerik.Blazor.CalendarSelectionMode` enum and can be:
* `Single`
* `Multiple`
* `Range`

You can pre-select a date in `Single` selection mode by setting the `Value` property of the calendar to the desired date.

To pre-select dates in the `Multiple` selection mode, use the `SelectedDates` property which is of type `List<DateTime>`.

In `Range` selection mode you can get the start and end dates of the range the user selected through the `RangeStart` and `RangeEnd` parameters of type `DateTime`. You also get events `RangeStartChanged` and `RangeEndChanged`. You can read more about them and see an example in the [Events](slug:components/calendar/events) article.

## Receive User Selection

The way you can get the user selection depends on the selection mode you use:

* [Single Selection Mode](#single-selection-mode)
* [Multiple Selection Mode](#multiple-selection-mode)
* [Range Selection Mode](#range-selection-mode)

### Single Selection Mode

When using single selection mode, you can get the selected date through:

* two-way binding of the `Value` parameter
* the `ValueChanged` event - the event handler receives a `DateTime` object as parameter which represents the new selected date.

You can find examples of both below.

>caption Two-way binding for the selected date

<demo metaUrl="client/calendar/selection/single-binding/" height="500"></demo>

>caption Handle Single selection in the Calendar through an event

<demo metaUrl="client/calendar/selection/single-event/" height="500"></demo>


### Multiple Selection Mode

With multiple selection mode, to get the user selection, use the `SelectedDates` property of the component reference in the `ValueChanged` handler.

>caption Handle Multiple selection in the Calendar

<demo metaUrl="client/calendar/selection/multiple/" height="500"></demo>

### Range Selection Mode

With range selection mode, the range selection is alternating, meaning every odd click sets the value of the [`RangeStart` parameter](slug:components/calendar/overview#calendar-parameters), while every even click sets the value of the [`RangeEnd` parameter](slug:components/calendar/overview#calendar-parameters).

Setting either value may reset the other value if the range is not valid. The range is not valid if the `RangeStart` value is after the `RangeEnd` value. To set such range as valid you can use the [`AllowReverse` parameter](slug:components/calendar/overview#calendar-parameters).

With range selection mode, you have two options to get the user choice:

* Configure two-way binding for the `RangeStart` and the `RangeEnd` parameters, OR
* Use one-way binding for `RangeStart` and the `RangeEnd` parameters and handle the [RangeStartChanged and RangeEndChanged events](slug:components/calendar/events#rangestartchanged-and-rangeendchanged).


>caption Range selection with two-way binding and AllowReverse

<demo metaUrl="client/calendar/selection/range/" height="650"></demo>


## Disabled Dates

To prevent the user from selecting certain dates (for example, holidays), add those dates to the `DisabledDates` collection.

With `Single` and `Multiple` selection, the user can't select these dates. With `Range` selection, these dates cannot be the start or end of a range, but can be included in the range.

>caption Add Disabled dates to a Calendar with Multiple selection

<demo metaUrl="client/calendar/selection/disabled-dates/" height="500"></demo>

## See Also

* [Live Demo: Calendar Selection](https://demos.telerik.com/blazor-ui/calendar/selection)
