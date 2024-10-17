---
title: Agenda
page_title: Scheduler - Agenda View
description: Agenda View in the Scheduler for Blazor.
slug: scheduler-views-agenda
tags: telerik,blazor,scheduler,view,agenda
published: True
position: 6
---

# Agenda View

The Agenda view of the Scheduler for Blazor shows a weekly summary (or a custom period set by the user) in a table format. You can also configure the Agenda view to display events [grouped by resource]({%slug scheduler-resource-grouping%}).


In this article:

* [View Parameters](#view-parameters)
* [Example](#example)

## View Parameters

The following parameters allow you to configure the Agenda view:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `NumberOfDays` | `int` <br /> (`7 (a week)`) | Represents the number of days shown in the view. |
| `HideEmptyAgendaDays` | `bool` <br /> (`true`) | Defines whether dates with no appointments are rendered. |

## Example

>tip You can declare other views as well, this example adds only the Agenda view for brevity.

>caption Declare the Agenda view in the markup

````CSHTML
@* Define the Agenda view. *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Width="800px">
    <SchedulerViews>
        <SchedulerAgendaView HideEmptyAgendaDays="@HideEmptyDays" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime StartDate { get; set; } = new DateTime(2024, 10, 22);

    private bool HideEmptyDays { get; set; }

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
{
    new SchedulerAppointment
    {
        Title = "Team Meeting",
        Description = "Discuss the project progress.",
        Start = new DateTime(2024, 10, 14, 10, 00, 0),
        End = new DateTime(2024, 10, 14, 11, 00, 0)
    },
    new SchedulerAppointment
    {
        Title = "Doctor Appointment",
        Description = "Routine check-up.",
        Start = new DateTime(2024, 10, 16, 9, 30, 0),
        End = new DateTime(2024, 10, 16, 10, 00, 0)
    },
    new SchedulerAppointment
    {
        Title = "Client Call",
        Description = "Quarterly review with the client.",
        Start = new DateTime(2024, 10, 22, 14, 00, 0),
        End = new DateTime(2024, 10, 22, 15, 00, 0)
    },
    new SchedulerAppointment
    {
        Title = "Team Outing",
        Description = "Lunch with the team.",
        Start = new DateTime(2024, 10, 23, 12, 30, 0),
        End = new DateTime(2024, 10, 23, 14, 00, 0)
    },
    new SchedulerAppointment
    {
        Title = "Webinar",
        Description = "Industry trends and insights.",
        Start = new DateTime(2024, 10, 24, 16, 00, 0),
        End = new DateTime(2024, 10, 24, 17, 30, 0)
    },
    new SchedulerAppointment
    {
        Title = "Project Deadline",
        Description = "Final submission of deliverables.",
        Start = new DateTime(2024, 10, 29, 9, 00, 0),
        End = new DateTime(2024, 10, 29, 12, 00, 0)
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

* [Views]({%slug scheduler-views-overview%})
* [Navigation]({%slug scheduler-navigation%})
* [Live Demo: Scheduler Agenda View](https://demos.telerik.com/blazor-ui/scheduler/agenda-view)
* [Resource Grouping Example]({%slug scheduler-resource-grouping%}#resource-grouping-by-one-resource)

