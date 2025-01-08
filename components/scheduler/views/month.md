---
title: Month
page_title: Scheduler - Month View
description: Monthy View in the Scheduler for Blazor.
slug: scheduler-views-month
tags: telerik,blazor,scheduler,view,month
published: True
position: 4
---

# Month View

The Month view of the Scheduler for Blazor shows an entire month to the user.

The `Date` parameter of the Scheduler controls which month is displayed. It's the one containing the date.


In this article:

* [View Parameters](#view-parameters)
* [Example](#example)

## View Parameters

The following parameters allow you to configure the month view:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `ItemsPerSlot` | `int` <br /> (`2`) | Indicates the number of appointments that are displayed per day. |


If there are more appointments for a day than per the `ItemsPerSlot` parameter, an ellipsis button provides access to the DayView for the specific day. You must [define a day view](slug://scheduler-views-day) so the user can see it. The Scheduler sorts and displays the number of appointments per the `ItemsPerSlot` parameter, by start time (ascending) and then by end time (descending).

If the `ItemsPerSlot` parameter is a zero or a negative value, an `ArgumentOutOfRangeException` is thrown.

## Example

>tip You can declare other views as well, this example adds only the Month and Day views for brevity.

>caption Declare the Month and Day views in the markup

````RAZOR
@* Define the Month view. *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@SelectedView" Height="600px">
    <SchedulerViews>
        <SchedulerMonthView ItemsPerSlot="@ItemsPerSlot"/>
        <SchedulerDayView StartTime="@StartTime" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);

    private DateTime StartTime { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);

    private SchedulerView SelectedView { get; set; } = SchedulerView.Month;

    private int ItemsPerSlot = 5;

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                Start = new DateTime(2019, 12, 5, 10, 00, 0),
                End = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Interview with new recruit",
                Description = "See if John will be a suitable match for our team.",
                Start = new DateTime(2019, 12, 5, 13, 00, 0),
                End = new DateTime(2019, 12, 5, 13, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Zoom call",
                Description = "Everyone assemble! We will also have clients on the call from a later time zone.",
                Start = new DateTime(2019, 12, 5, 14, 00, 0),
                End = new DateTime(2019, 12, 5, 14, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Performance review",
                Description = "Performance evaluation of the new recruit.",
                Start = new DateTime(2019, 12, 5, 14, 30, 0),
                End = new DateTime(2019, 12, 5, 15, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Dentist Appointment",
                Description = "Get that cavity fixed.",
                Start = new DateTime(2019, 12, 5, 16, 00, 0),
                End = new DateTime(2019, 12, 5, 17, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 12, 2, 11, 30, 0),
                End = new DateTime(2019, 12, 2, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 12, 6, 9, 30, 0),
                End = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 4)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

## See Also

* [Views](slug://scheduler-views-overview)
* [Navigation](slug://scheduler-navigation)
* [Live Demo: Scheduler Month View](https://demos.telerik.com/blazor-ui/scheduler/month-view)
* [Resource Grouping](slug://scheduler-resource-grouping)
