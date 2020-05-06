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

This article explains the events available in the Telerik Calendar for Blazor:

* [ValueChanged](#valuechanged)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)
* [RangeStartChanged](#rangestartchanged)
* [RangeEndChanged](#rangeendchanged)

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

## RangeStartChanged

The `RangeStartChanged` fires every time the user selects a new starting date for the range of dates when the Calendar is in `Range` selection mode. The first click on a date in the Calendar will always be the starting date and the range can be consisted of dates only onwards.

## RangeEndChanged

The `RangeEndChanged` fires after the `RangeStartChanged` with the `default` value of the model field, and every time when the selection of dates is finished.

>caption Example of `Range` Selection with `RangeStartChanged` and `RangeEndChanged` events

````CSHTML
@* Observe the behavior of the RangeStartChanged and RangeEndChanged events and adding the selected dates to a List *@

<div class="example-wrapper">
    <h4>Range Selection Initial Selection</h4>

    <TelerikCalendar Views="3"
                     Date="@Date"
                     RangeStart="@RangeStart"
                     RangeEnd="@RangeEnd"
                     SelectionMode="@CalendarSelectionMode.Range"
                     RangeStartChanged="@StartChangeHandler"
                     RangeEndChanged="@EndChangeHandler">
    </TelerikCalendar>
</div>

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
    public DateTime Date { get; set; } = new DateTime(2020, 3, 1);
    public DateTime RangeStart { get; set; } = new DateTime(2020, 3, 14);
    public DateTime RangeEnd { get; set; } = new DateTime(2020, 3, 18);
    public List<DateTime> SelectedDates { get; set; } = new List<DateTime>();

    public void StartChangeHandler(DateTime startDate)
    {
        // you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        // not updating the model will effectively cancel the event
        RangeStart = startDate;
        GetDates();
    }

    public void EndChangeHandler(DateTime endDate)
    {
        // you have to update the model manually because handling the <Parameter>Changed event does not let you use @bind-<Parameter>
        // not updating the model will effectively cancel the event
        RangeEnd = endDate;
        GetDates();
    }

    public void GetDates()
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
