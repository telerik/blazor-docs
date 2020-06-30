---
title: Events
page_title: Calendar | Events
description: Events in the Calendar for Blazor.
slug: components/calendar/events
tags: telerik,blazor,calendar,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik Calendar for Blazor:

* [ValueChanged](#valuechanged)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)
* [RangeStartChanged and RangeEndChanged](#rangestartchanged-and-rangeendchanged)

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

## RangeStartChanged and RangeEndChanged

The two RangeChanged events (`RangeStartChanged` and `RangeEndChanged`) fire when the user selects a new range.

When the user selects a range from the calendar, the first click always fires the start change with the selected date, and then clears the end of the range, so the end change event fires as well, with the default value for `DateTime` - this indicates that the end of the range is undefined. If the second click is on a date before the range start - it will become the new start.

>caption Example of `Range` Selection with `RangeStartChanged` and `RangeEndChanged` events

````CSHTML
@* Observe the behavior of the RangeStartChanged and RangeEndChanged events and adding the selected dates to a List *@

<TelerikCalendar Views="2"
                 Date="@Date"
                 SelectionMode="@CalendarSelectionMode.Range"
                 RangeStart="@RangeStart"
                 RangeEnd="@RangeEnd"
                 RangeStartChanged="@StartChangeHandler"
                 RangeEndChanged="@EndChangeHandler">
</TelerikCalendar>


@if (SelectedDates.Any())
{
    <div class="mt-3">
        <h5 class="text-info">Selected dates:</h5>
        @foreach (var day in SelectedDates)
        {
            <p class="text-muted">@day</p>
        }
    </div>
}

@code {
    DateTime Date { get; set; } = DateTime.Now.AddDays(-5);
    DateTime RangeStart { get; set; } = DateTime.Now;
    DateTime RangeEnd { get; set; } = DateTime.Now.AddDays(6);
    List<DateTime> SelectedDates { get; set; } = new List<DateTime>();

    void StartChangeHandler(DateTime startDate)
    {
        // you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        // not updating the model will effectively cancel the event
        RangeStart = startDate;

        Console.WriteLine($"The user started making a new selection from {startDate}");

        RenderDateRange();
    }

    void EndChangeHandler(DateTime endDate)
    {
        // you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        // not updating the model will effectively cancel the event
        RangeEnd = endDate;


        // sample check to execute logic only after the user has selected both ends of the range
        // if this does not pass, the user has only clicked once in the calendar popup
        if (endDate != default(DateTime))
        {
            Console.WriteLine($"The user finished making a new selection from {RangeStart} to {endDate}");
        }

        RenderDateRange();
    }

    void RenderDateRange()
    {
        var datesInBetween = Enumerable.Range(0, 1 + RangeEnd.Subtract(RangeStart).Days)
                                           .Select(offset => RangeStart.AddDays(offset))
                                           .ToList();

        SelectedDates = datesInBetween;
    }
}
````

## See Also

* [Selection]({%slug components/calendar/selection%})
* [Navigation]({%slug components/calendar/navigation%})
