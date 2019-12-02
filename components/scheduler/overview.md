---
title: Overview
page_title: Scheduler for Blazor Overview
description: Overview of the Scheduler for Blazor
slug: scheduler-overview
tags: telerik,blazor,scheduler,overview
published: True
position: 0
---

# Scheduler Overview

The Scheduler component lets the user see, edit and add appointments so they can plan their agenda. It offers different views, control over the workday start and end, appointment editing and various other features and settings.

To use a Telerik Scheduler for Blazor

1. Add the `TelerikScheduler` tag.
1. Populate its `Data` property with the collection of appointments/events the user needs to see. See the [Appointments Overview]({%slug scheduler-appointments-overview%}) article for details on the needed fields.
1. Set the `TitleField`, `StartField`, `EndField`, `DescriptionField` and `IsAllDayField` properties to point to the corresponding names of the model.
1. Define the Views the user can toggle between in the `SchedulerViews` collection. Optionally, set their settings such as days start and end.

>caption Scheduler first look and main features

````CSHTML
@* Fewer settings are required to get the component running, but you will usually have to set these for better UX *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  TitleField="@(nameof(SchedulerAppointment.Title))"
                  DescriptionField="@(nameof(SchedulerAppointment.Description))"
                  IsAllDayField="@(nameof(SchedulerAppointment.IsAllDay))">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerMultiDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    //the time portions are important
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    public DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    public DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    public DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 26, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                StartTime = new DateTime(2019, 11, 25, 9, 30, 0),
                EndTime = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 07)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

>caption The result from the code snippet above

![](images/scheduler-basic-screenshot.png)

>caption Component namespace and reference

The Scheduler is a generic component and its type is determined by the type of the appointments model you pass to it.

````CSHTML
@* This is a bare bones example to show the relationship between the reference and the model *@

<TelerikScheduler Data="@Appointments" @ref="@SchedulerRef">
    <SchedulerViews>
        <SchedulerWeekView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    Telerik.Blazor.Components.TelerikScheduler<SchedulerAppointment> SchedulerRef { get; set; }

    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>();

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

>caption The Scheduler provides the following key features:

* [Extensive Navigation]({%slug scheduler-navigation%}) - both programmatic, and for the end user - includes the ability to change the currently shown time range, several views to choose from, and toggling business hours only display.
* [Appointment Editing]({%slug scheduler-appointments-edit%}) - the user can edit, delete and create new appointments in their calendar, and the scheduler provides you with that information so you can store it.


## See Also

  * [Appointment Options]({%slug scheduler-appointments-overview%})
  * [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)

