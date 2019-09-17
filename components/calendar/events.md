---
title: Events
page_title: Calendar for Blazor | Events
description: Events in the Calendar for Blazor
slug: components/calendar/events
tags: telerik,blazor,calendar,events
published: true
position: 20
---

# Events

This article explsins the events available in the Telerik Calendar for Blazor:

* [ValueChanged](#valuechanged)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)

## ValueChanged

The `ValueChanged` event fires when the user selects a date. To see how to handle it and to obtain the user selection, review the [Selection]({%slug components/calendar/selection%}) article.

## DateChanged

The `DateChanged` event fires when the currently shown date changes. For example, when the user [navigates]({%slug components/calendar/navigation%}) from one month to the next through the arrows.

When handling the `DateChanged` event, you cannot use two-way binding for the `Date` parameter. You should update it yourself in the model. If you do not, the currently shown range may revert to the original value set in the markup or to the default value.

````CSHTML
@result
<br />
<TelerikCalendar Min="@min" Max="@max" Date="@initialDate" DateChanged="@DateChangedHandler">
</TelerikCalendar>

@code {
    DateTime initialDate { get; set; } = DateTime.Now;
    DateTime min = new DateTime(2015, 1, 1);
    DateTime max = new DateTime(2025, 12, 31);
    string result { get; set; }

    void DateChangedHandler(DateTime firstDateOfNewRange)
    {
        result = $"the user now sees a range that includes {firstDateOfNewRange}";
        initialDate = firstDateOfNewRange; // if you don't do this, navigating adjacent ranges will be effectively disabled
    }
}
````

>tip You are not required to provide an initial value to the `Date` parameter. It will default to `DateTime.Now`.

## ViewChanged

The `ViewChanged` event fires when the user changes the view they are seeing (for example, goes up from the days in the month to the months in the year).

When handling the `ViewChanged` event, you cannot use two-way binding for the `View` parameter. You should update it yourself in the model. If you do not, the currently shown view may revert to the original value set in the markup or to the default value.

````CSHTML
@result
<br />
<TelerikCalendar Min="@min" Max="@max" View="@initialView" ViewChanged="@ViewChangedHandler">
</TelerikCalendar>

@code {
    CalendarView initialView { get; set; } = CalendarView.Year;
    DateTime min = new DateTime(2015, 1, 1);
    DateTime max = new DateTime(2025, 12, 31);
    string result { get; set; }

    void ViewChangedHandler(CalendarView currView)
    {
        result = $"the user now sees the {currView} view";
        initialView = currView; // if you don't do this, navigating views will be effectively disabled
    }
}
````

>tip You are not required to provide an initial value to the `View` parameter. It will default to `CalendarView.Month`.

## See Also

* [Selection]({%slug components/calendar/selection%})
* [Navigation]({%slug components/calendar/navigation%})
