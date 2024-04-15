---
title: Timeline
page_title: Scheduler - Timeline View
description: Timeline View in the Scheduler for Blazor.
slug: scheduler-views-timeline
tags: telerik,blazor,scheduler,view,timeline
published: True
position: 1
---

# Timeline View

The Timeline view displays appointments in a continuous horizontal direction.

In this article:

* [View Parameters](#view-parameters)
	* [Slots](#slots)
* [Example](#example)
* [Resource Grouping](#resource-grouping-in-the-timeline-view)

@[template](/_contentTemplates/scheduler/views.md#day-views-common-properties)
| `ColumnWidth` | `decimal` | The width of each time column in pixels.
| `NumberOfDays` | `int` <br/> `1` | How many days to show side by side in the view.

@[template](/_contentTemplates/scheduler/views.md#visible-times-tip)

@[template](/_contentTemplates/scheduler/views.md#day-slots-explanation)

## Example

>caption Declare the Timeline View in the markup

>tip You can declare other views as well, this example adds only the timeline view for brevity.

````CSHTML
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

## Resource Grouping in the Timeline View

You can configure the Timeline view to display events that are [grouped by a resource]({%slug scheduler-resource-grouping%}).

>caption Resource Grouping in a Timeline view.

@[template](/_contentTemplates/scheduler/views.md#resource-grouping-vertical-code-snippet-for-examples)

## See Also

* [Views]({%slug scheduler-views-overview%})
* [Navigation]({%slug scheduler-navigation%})
* [Live Demo: Scheduler Timeline View](https://demos.telerik.com/blazor-ui/scheduler/timeline-view)
