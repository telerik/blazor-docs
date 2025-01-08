---
title: Display Only All-Day Appointments in the Scheduler
description: Learn how to customize your Scheduler for Blazor to exclusively display all-day events in a multiday timeline view, ensuring optimal scheduling clarity.
type: how-to
page_title: Display Only All-Day Appointments in the Scheduler
slug: scheduler-display-allday
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

This KB article answers the following questions:

* How to display only all-day events in the Scheduler?
* How to show only all-day appointments in a [Timeline View](slug://scheduler-views-timeline) of the Scheduler?
* How to create a multiday scheduler view that only displays the all-day events?

## Solution

To display only all-day events in the Scheduler, apply the following points in your configuration:

1. Use the Timeline View of the `Scheduler`.
2. Set the `SlotDuration` parameter of the `SchedulerTimelineView` to 1440 minutes (one day).
3. Set the `IsAllDay` property of the appointment model to `true`.

>caption Scheduler with a Timeline View displaying only all-day appointments

````RAZOR
<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Width="1000px">
    <SchedulerViews>
        <SchedulerTimelineView StartTime="@DayStart"
                               EndTime="@DayEnd"
                               NumberOfDays="10"
                               SlotDuration="1440" // the equivalent of one day (24 hours) in minutes
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
                IsAllDay = true, // set to 'true' to show as an all-day appointment 
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 05)
            },
            new SchedulerAppointment
            {
                Title = " Meeting with Client",
                IsAllDay = true, // set to 'true' to show as an all-day appointment 
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