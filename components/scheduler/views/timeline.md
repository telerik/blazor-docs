---
title: Timeline
page_title: Scheduler - Timeline View
description: Timeline View in the Scheduler for Blazor.
slug: scheduler-views-timeline
tags: telerik,blazor,scheduler,view,timeline
published: True
position: 5
---

# Timeline View

The Timeline view displays appointments in a continuous horizontal direction.

In this article:

* [View Parameters](#view-parameters)
	* [Slots](#slots)
* [Example](#example)

## View Parameters

Generally, the views are designed around the timeframe that they show and the day-based views share some common properties that you will likely have to set to provide a good user experience for the user:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `ColumnWidth` | `decimal` | The width of each time column in pixels.
| `EndTime` | `DateTime` | The counterpart to `StartTime` &mdash; defines when the full day ends. Defaults to midnight. If you have the day end earlier you can reduce the amount of elements that render, but the user may not see some late appointments.
| `NumberOfDays` | `int` <br/> `1` | How many days to show side by side in the view.
| `SlotDivisions` |`int` | The number of partitions in each major time slot.
| `SlotDuration` | `int` | The time span of each major time slot in minutes.
| `StartTime` | `DateTime` | The first hour displayed in the view. Defaults to midnight. If not set to a value close to the start of the working day, the view may show blank spaces before scrolling down.
|`WorkDayEnd` | `DateTime` | The counterpart to `WorkDayStart` &mdash; defines when the working day ends.
| `WorkDayStart` | `DateTime` | The start time of the working day; differentiates work hours with a distinct background for easy identification. Influences the **Show Business Hours** toggle.

@[template](/_contentTemplates/scheduler/views.md#visible-times-tip)

@[template](/_contentTemplates/scheduler/views.md#day-slots-explanation)

## Example

>tip You can declare other views as well, this example adds only the Тimeline view for brevity.

>caption Declare the Timeline view in the markup

````RAZOR
@* Define the Timeline view. *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Width="1000px">
    <SchedulerViews>
        <SchedulerTimelineView StartTime="@DayStart" EndTime="@DayEnd"
                               WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" 
                               ColumnWidth="50"/>
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    //the time portions are important
    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    private DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    private DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    private DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
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

## See Also

* [Views](slug:scheduler-views-overview)
* [Navigation](slug:scheduler-navigation)
* [Live Demo: Scheduler Timeline View](https://demos.telerik.com/blazor-ui/scheduler/timeline-view)
* [Resource Grouping](slug:scheduler-resource-grouping)

