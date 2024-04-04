---
title: Display Only the All-Day Appointments in the Scheduler
description: How to display all-day appointments
type: how-to
page_title: How to Display Only the All-Day Appointments in the Scheduler, using Timeline View.
slug: scheduler-display-allday
position:
tags: scheduler, timeline, all-day
ticketid: 1576096
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Scheduler for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

* How to display only all-day events in the Scheduler?
* How to show only all-day appointments in a [Timeline View]({%slug scheduler-views-timeline%}) of the Scheduler?
* How to create a multiday scheduler view that only displays the all-day events?

## Solution

To achieve the desired outcome, ensure that your configuration applies the points from below:

* Use Timeline View of the `Scheduler`
* `SlotDuration` parameter of the `SchedulerTimelineView` is set to 1440 minutes (one day)
* Your appointment model has `IsAllDay` property set to `true`

>caption Timeline View Scheduler displaying only all-day appointments

````CSHTML
<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Width="1000px">
    <SchedulerViews>
        <SchedulerTimelineView StartTime="@DayStart"
                               EndTime="@DayEnd"
                               NumberOfDays="10"
                               SlotDuration="1440"
                               WorkDayStart="@WorkDayStart"
                               WorkDayEnd="@WorkDayEnd" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    //the time portions are important
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    public DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    public DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    public DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 05)
            },
            new SchedulerAppointment
            {
                Title = " Meeting with Client",
                IsAllDay = true,
                Start = new DateTime(2019, 12, 07),
                End = new DateTime(2019, 12, 08)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````