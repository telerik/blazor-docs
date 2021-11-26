---
title: Disable Weekends in Calendar
description: How to disable Weekends in Calendar, so the user cannot select them?
type: how-to
page_title: Disable Weekends in Calendar
slug: calendar-kb-disable-weekends
position: 
tags: disable, weekends, calendar, datepicker, daterangepicker
ticketid: 1543661
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Calendar for Blazor, DatePicker for Blazor, DateRangePicker for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I want to disable the weekends in the Calendar Month view, so the user is not able to select them.


## Solution

You can create a collection of weekend days and pass it to the [Disabled Dates]({%slug components/calendar/selection%}#disabled-dates) parameter of the Calendar.

To achieve that:

* Set Min and Max parameters of the Calendar.
* Loop through all the dates between Min and Max.
* Get only the dates that are Saturday or Sunday.
* Save them in a collection and pass it to the [Disabled Dates]({%slug components/calendar/selection%}#disabled-dates) parameter of the Calendar.

The example below demonstrates this approach.
 
> At the time of writing, [k-state-disabled class is not applied to all disabled cells
](https://feedback.telerik.com/blazor/1539828-k-state-disabled-class-is-not-applied-to-all-disabled-cells). So, so in case you need to target all the disabled cells and customize them (for example, add some custom CSS to the disabled cells), use `[aria-disabled="true"]` selector.

>caption Pass the weekends to the Disabled Dates collection and disable all weekends between the Min and Max Value of the Calendar.

````CSHTML
<style>
    /*Ensure that all disabled cells have the same styles.
      Not neccessary when this is fixed https://feedback.telerik.com/blazor/1539828-k-state-disabled-class-is-not-applied-to-all-disabled-cells */

    [aria-disabled="true"] {
        outline: none;
        opacity: 0.6;
        filter: grayscale(0.1);
        pointer-events: none;
        box-shadow: none;
    }
</style>

<TelerikCalendar Min="@min"
                 Max="@max"
                 View="@View"
                 DisabledDates="@DisabledDates"
                 @bind-Date="@theDate">
</TelerikCalendar>

@code {

    IEnumerable<DateTime> GetDaysBetween(DateTime start, DateTime end)
    {
        for (DateTime i = start; i < end; i = i.AddDays(1))
        {
            yield return i;
        }
    }

    protected override async Task OnInitializedAsync()
    {
        IEnumerable<DateTime> GetDaysBetween(DateTime start, DateTime end)
        {
            for (DateTime i = start; i < end; i = i.AddDays(1))
            {
                yield return i;
            }
        }

        var weekends = GetDaysBetween(min, max)
            .Where(d => d.DayOfWeek == DayOfWeek.Saturday || d.DayOfWeek == DayOfWeek.Sunday);

        DisabledDates = new List<DateTime>(weekends);
    }

    private List<DateTime> DisabledDates = new List<DateTime>();

    public CalendarView View { get; set; } = CalendarView.Month;

    private DateTime min = new DateTime(2020, 1, 1);

    private DateTime max = new DateTime(2025, 12, 31);

    private DateTime theDate { get; set; } = DateTime.Now;

}
````
