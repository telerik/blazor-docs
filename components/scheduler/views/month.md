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

Each day slot shows up to two appointments. If there are more appointments for a day, an ellipsis button will provide access to the DayView for the specific day. This avoids cluttering. You can also access the day view from the day number. Of course, you must also [define a day view]({%slug scheduler-views-day%}) so the user can see it.

Here is how the Scheduler determines which two appointments to display in a month view slot:

1. The Scheduler sorts all appointments in the current month by start date (ascending) and then by end date (descending).
1. It takes the first two appointments for each day from the sorted collection.
1. The component sorts the two appointments for each day by start time (ascending) and then by end time (descending).

In this article:

* [Example](#example)
* [Resource Grouping](#resource-grouping-in-the-month-view)


## Example

>caption Declare the Month and Day Views in the markup

>tip You can declare other views as well, this example adds only the month and day views for brevity.

````CSHTML
@* Define the month view. The screenshot above is the result from this code snippet
    This example also shows how to add a day view so the user can see details for busy days with more than 2 events*@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@selectedView" Height="600px">
    <SchedulerViews>
        <SchedulerMonthView />
        <SchedulerDayView StartTime="@( new DateTime(2000, 1, 1, 8, 0, 0) )" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    SchedulerView selectedView { get; set; } = SchedulerView.Month;

    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
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
                Title = "Dentist Appointment",
                Description = "Get that cavity fixed.",
                Start = new DateTime(2019, 12, 5, 13, 00, 0),
                End = new DateTime(2019, 12, 5, 13, 30, 0)
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
                End = new DateTime(2019, 12, 05)
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
## Resource Grouping in the Month View

You can configure the Month view to display appointments that are [grouped by a resource]({%slug scheduler-resource-grouping%}).

>caption Resource Grouping in a Month view.

@[template](/_contentTemplates/scheduler/views.md#resource-grouping-code-snippet-for-examples)

## See Also

* [Views]({%slug scheduler-views-overview%})
* [Navigation]({%slug scheduler-navigation%})
* [Live Demo: Scheduler Month View](https://demos.telerik.com/blazor-ui/scheduler/month-view)
