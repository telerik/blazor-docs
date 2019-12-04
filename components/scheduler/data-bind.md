---
title: Data Binding
page_title: Scheduler for Blazor | Data Binding Appointments
description: Data Binding appointments in the Scheduler for Blazor
slug: scheduler-appointments-databinding
tags: telerik,blazor,scheduler,data,bind,databind,databinding,appointments
published: True
position: 1
---

# Scheduler Appointments Data Binding

The Scheduler component is designed to work with a collection of appointments. This article will explain their basic features.

In this article:

* [Appointment Features](#appointment-features)
* [Built-in Validation](#built-in-validation)
* [Examples](#examples)



## Appointment Features

The scheduler appointments provide the following features that you control through the corresponding fields in their data binding. The appointment model needs to provide all fields from the list below.

* `Title` - (`string`) - this is what is shown in the main scheduler view so the user can identify the event.
* `Start` - (`DateTime`) - the date and time at which the appointment starts.
* `End` - (`DateTime`) - the date and time at which the appointment ends.
* `Description` - (`string`) - detailed description of the event. Shown in the edit form.
* `IsAllDay` - (`bool`) - whether the event is shown in the all-day slot in the applicable views. Such events are not rendered in a specific time interval (slot), but are always shown when their day is visible.

The list above shows the default field names for data binding. If your model uses the same field names, you don't have to set the field names explicitly. Otherwise, the `<Property>Field` parameters of the scheduler must be set to point to the field names of the model.

>caption Sample model with default field names

````CSHTML
public class SchedulerAppointment
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public bool IsAllDay { get; set; }
}
````

>tip You are not limited to using these fields only. Your model can carry additional information that will be used by your custom logic (for example, an ID for the [CUD operations]({%slug scheduler-appointments-edit%})).


##  Built-in Validation

By default, the scheduler requires that an appointment has:

* title - this is what is rendered for the user to see
* start time - so the scheduler can know where to render it
* end time - so the scheduler can know where it ends

The built-in edit form also enforces that the end time is after the start time.

The scheduler edit form works with an instance that that the scheduler creates from the provided model from its data source. This means that custom validation rules (attributes) in the model will not be used by the scheduler. To implement custom validation logic, implement a custom edit form. Make sure that the same three fields, at minimum, are required and available in the appointments you store, otherwise errors may be thrown.


## Examples

>caption Data Binding to a model that uses the default field names

````CSHTML
@* This model uses the default fields names, so you only need to define the scheduler appearance properties and views *@

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
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 11, 26, 11, 30, 0),
                End = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 11, 25, 9, 30, 0),
                End = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 07)
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

>caption Data Binding to a model with custom field names

````CSHTML
@* This model uses custom fields that do not match the default settings. The example shows how to tell the scheduler in which fields to look for the information. You are not required to use the nameof operator, you can "hardcode" the string names as well. *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px" Width="800px"
                  TitleField="@(nameof(SchedulerAppointment.AppointmentTitle))"
                  DescriptionField="@(nameof(SchedulerAppointment.ApptDescription))"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  IsAllDayField="@(nameof(SchedulerAppointment.AllDayAppt))"
                  >
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
                AppointmentTitle = "Vet visit",
                ApptDescription = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 26, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Planning meeting",
                ApptDescription = "Kick off the new project.",
                StartTime = new DateTime(2019, 11, 25, 9, 30, 0),
                EndTime = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Trip to Hawaii",
                ApptDescription = "An unforgettable holiday!",
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 07),
                AllDayAppt = true
            }
    };

    public class SchedulerAppointment
    {
        public string AppointmentTitle { get; set; }
        public string ApptDescription { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool AllDayAppt { get; set; }
    }
}
````



## See Also

  * [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
  * [Editing Appointments]({%slug scheduler-appointments-edit%})


