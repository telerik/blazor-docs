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
1. Populate its `Data` property with the collection of appointments/events the user needs to see. See the [Data Binding]({%slug scheduler-appointments-databinding%}) article for details on the fields.
1. Define the Views the user can toggle between in the `SchedulerViews` collection. Optionally, set their settings (such as days start and end) and choose a default View.

>caption Scheduler first look and main features

````CSHTML
@* Fewer settings are required to get the component running, but you will usually have to set some for better UX *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px" Width="800px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 11, 26, 11, 30, 0),
                End = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 11, 25, 9, 30, 0),
                End = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 07)
            }
    };

    public class SchedulerAppointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
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
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

>caption The Scheduler provides the following key features:

* [Extensive Navigation]({%slug scheduler-navigation%}) - both programmatic, and for the end user - includes the ability to change the currently shown time range, several views to choose from, and toggling business hours only display.
* [Appointment Editing]({%slug scheduler-appointments-edit%}) - the user can edit, delete and create new appointments in their calendar, and the scheduler provides you with that information so you can store it.


## See Also

  * [Data Binding]({%slug scheduler-appointments-databinding%})
  * [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)

