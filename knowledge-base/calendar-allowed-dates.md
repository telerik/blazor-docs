---
title: Allowed dates for Calendar
description: How to set small list of allowed dates in Calendar.
type: how-to
page_title: Allowed dates for Calendar
slug: calendar-kb-allowed-dates
position: 
tags: telerik, blazor, calendar
res_type: kb
---


## Description

How to disable all dates that are not included in the `AllowedDates` collection (when the allowed dates are just a small list and all other dates should be disabled)? 

## Solution

1. Define a collection of dates that will contain the allowed dates.
1. Define a method that populates a collection of disabled dates based on the currently displayed dates by the View and the `AllowedDates` collection.
1. Define a `ViewChanged` Handler that will refresh the `DisabledDates` when the current View is changed.

````CSHTML
<TelerikCalendar Min="@min"
                 Max="@max"
                 Views="@NumOfViews"
                 Date="@InitialDate"
                 DateChanged="@DateChangedHandler"
                 DisabledDates="@DisabledDates"
                 SelectionMode="CalendarSelectionMode.Multiple" />

@code{
    private DateTime InitialDate { get; set; } = DateTime.Now;
    private DateTime min { get; set; }
    private DateTime max { get; set; }
    private int NumOfViews { get; set; } = 3;

    // set dates the user can't select
    private List<DateTime> DisabledDates = new List<DateTime>() { };

    private List<DateTime> AllowedDates = new List<DateTime>() { };

    protected override void OnInitialized()
    {
        min = new DateTime(InitialDate.AddYears(-5).Year, 1, 1);
        max = new DateTime(InitialDate.AddYears(5).Year, 12, 31);

        //Populate a list of allowed dates
        for (DateTime i = new DateTime(InitialDate.Year, 01, 01); i < new DateTime(InitialDate.AddYears(1).Year, 01, 01); i = i.AddDays(1))
        {
            if (i.Date.Day % 2 is 0)
                AllowedDates.Add(i);
        }

        //Call to fill initial dispaly page with disabled/allowed
        DisableDates(InitialDate);
    }

    private void DateChangedHandler(DateTime firstDateOfNewRange)
    {
        DisableDates(firstDateOfNewRange);

        // if you don't do this, navigating adjacent ranges will be effectively disabled
        InitialDate = firstDateOfNewRange;
    }

    private void DisableDates(DateTime currentDate)
    {
        //Add the disabled dates we calculated into the DisabledDates parameter
        var disabledDates = GetDisabledDates(currentDate);
        DisabledDates = new List<DateTime>(disabledDates);
    }

    private IEnumerable<DateTime> GetDisabledDates(DateTime rangeStart)
    {
        //Start date of currently displayed month(s)
        var start = new DateTime(rangeStart.Year, rangeStart.Month, 1);
        //Compensate for the number of months displayed by the views number
        var end = start.AddMonths(NumOfViews).AddDays(-1);

        //Enumerate the number of days from the visible start-date till the end-date of the visible views
        //Except the dates available in AllowedDates
        var dateRange = Enumerable
            .Range(0, (int)(end - start).TotalDays + 1)
            .Select(i => start.AddDays(i))
            .Except(AllowedDates);

        return dateRange;
    }
}
````