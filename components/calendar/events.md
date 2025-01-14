---
title: Events
page_title: Calendar - Events
description: Events in the Calendar for Blazor.
slug: components/calendar/events
tags: telerik,blazor,calendar,events
published: true
position: 21
---

# Events

This article explains the events available in the Telerik Calendar for Blazor:

* [ValueChanged](#valuechanged)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)
* [RangeStartChanged and RangeEndChanged](#rangestartchanged-and-rangeendchanged)
* [OnCellRender](#oncellrender)

## ValueChanged

The `ValueChanged` event fires when the user selects a date. To see how to handle it and to obtain the user selection, review the [Selection](slug://components/calendar/selection) article.

## DateChanged

The `DateChanged` event fires when the currently shown date changes. For example, when the user [navigates](slug://components/calendar/navigation) from one month to the next through the arrows.

When handling the `DateChanged` event, you cannot use two-way binding for the `Date` parameter. You should update it yourself in the model. If you do not, the currently shown range may revert to the original value set in the markup or to the default value.

````RAZOR
@EventLog  <br />

<TelerikCalendar Min="@CalendarMin"
                 Max="@CalendarMax"
                 Date="@CalendarDate"
                 DateChanged="@OnCalendarDateChanged">
</TelerikCalendar>

@code {
    private DateTime CalendarDate { get; set; } = DateTime.Now;

    private DateTime CalendarMin { get; set; } = DateTime.Now.AddYears(-5);

    private DateTime CalendarMax { get; set; } = DateTime.Now.AddYears(5);

    private string EventLog { get; set; }

    private void OnCalendarDateChanged(DateTime newDate)
    {
        CalendarDate = newDate;

        EventLog = $"The user sees a range that includes {newDate}";
    }
}
````

>tip You are not required to provide an initial value to the `Date` parameter. It will default to `DateTime.Now`.

## ViewChanged

The `ViewChanged` event fires when the user changes the view they are seeing (for example, goes up from the days in the month to the months in the year).

When handling the `ViewChanged` event, you cannot use two-way binding for the `View` parameter. You should update it yourself in the model. If you do not, the currently shown view may revert to the original value set in the markup or to the default value.

````RAZOR
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

````RAZOR
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

## OnCellRender

The `CellRender` event fires when each cell in each view is about to render. The event allows you to find out the current view and cell date. You can also set a custom CSS class for the `<td>` element.

The event arguments are of type `CalendarCellRenderEventArgs` and provide the following fields:

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the cell DOM element. |
| `Date` | `DateTime` | The date of the cell |
| `View` | `CalendarView` enum <br /> (`Month`) | The currently visible view. You can use it to determine if the calendar is rendering the MonthView, YearView, and so on. |

You can also customize the cells through their [templates](slug://calendar-templates-overview). You can use the event together with the templates.

>caption Use the CellRender event to style cells based on conditions

````RAZOR
@*
Special cells in the month view will be red and bold.
Special cells in the decade view will be purple and yellow on hover.
*@

<TelerikCalendar OnCellRender="@OnCellRender">
</TelerikCalendar>

@code {
    private void OnCellRender(CalendarCellRenderEventArgs args)
    {
        if (args.View == CalendarView.Month)
        {
            args.Class = args.Date.Day % 3 == 0 ? "special" : "";
        }
        else if (args.View == CalendarView.Decade)
        {
            args.Class = args.Date.Year == 2020 ? "special" : "";
        }
    }
}

<style>
    .special {
        color: red;
        font-weight: bold;
    }

    .k-calendar td.special:hover .k-link {
        background-color: purple;
        color: yellow;
    }
</style>
````

## See Also

* [Selection](slug://components/calendar/selection)
* [Navigation](slug://components/calendar/navigation)
