---
title: Data Binding
page_title: Scheduler - Data Binding Appointments
description: Data Binding appointments in the Scheduler for Blazor.
slug: scheduler-appointments-databinding
tags: telerik,blazor,scheduler,data,bind,databind,databinding,appointments
published: True
position: 1
---

# Scheduler Appointments Data Binding

The Scheduler component is designed to work with a collection of appointments. This article will explain their features and how to define the appointment model, so that the Scheduler recognizes it.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

In this article:

* [Appointment features and how to implement the Scheduler model](#appointment-features)
* [Built-in validation](#built-in-validation)
* [Example with default property names of the appointment model](#example-with-default-field-names)
* [Example with custom property names](#example-with-custom-field-names)


## Appointment Features

Some of the Scheduler features and behaviors depend directly on values in the appointment items. There are two ways to implement property names in the appointment model:

* Define a model with *default (expected) property names*. In this case, the Scheduler will recognize and use the properties automatically. See [an example with default field names](#example-with-default-field-names).
* Define *custom property names*. In this case, define the property names as parameters of the `<TelerikScheduler>` tag. The parameter names derive from the default property names, for example `IdField`, `TitleField`, `StartField`, etc. See [an example with custom field names](#example-with-custom-field-names).

>tip The Scheduler model can carry additional information in other existing properties, that will be used by your application logic, or in [Scheduler item templates](slug:scheduler-templates-appointment).

The following table lists the default property names and explains how the Scheduler uses these properties. The appointment model needs to provide all properties from the list below, no matter if they have the same names or not.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `Id` | `object` | A unique identifier for the appointment. Useful for finding appointments in a collection, and required for recurring appointments. The Scheduler uses it to establish a relationship between a recurring appointment and its exceptions. Must be something that can be uniquely compared, like a `Guid`. |
| `Title` | `string` | The Scheduler displays appointment titles, so users can identify the event. |
| `Description` | `string` | Detailed description of the event. Shown in the edit form. |
| `Start` | `DateTime` | The date and time at which the appointment starts. |
| `End` | `DateTime` | The date and time at which the appointment ends. |
| `IsAllDay` | `bool` | Defines whether the appointment shows in the all-day slot of the applicable view. Such events are not rendered in a specific time interval (slot), but are always shown when their day is visible. |
| `RecurrenceRule` | `string` | The recurrence rule for a recurring appointment according to the [RFC5545 standard](https://tools.ietf.org/html/rfc5545#section-3.3.10). Present only for a recurring appointment, but not for an exception from it. In the data source, there is only one item that determines a recurring event, and the Scheduler expands it to render the necessary number of appointments in the UI. |
| `RecurrenceExceptions` | `List<DateTime>` | A list of exceptions for a recurring appointment. It tells the Scheduler when to skip rendering a recurring appointment because its instance is explicitly changed or removed (deleted), and so it is an exception to the recurrence rule. **Also see the note below.** |
| `RecurrenceId` | `object` | The unique identifier of the recurring appointment to which the current appointment is an exception. Must be of the same type as the `Id` field (e.g., a `Guid`). Present only for an exception from a recurrence, but not for the recurring appointment itself. |

> Exception dates are relative to the start time of the recurring appointment, and changing the start time of a  recurring appointment (either through the edit form, or by dragging any recurring event) will update the exception dates to match the new start time. This does not affect exception instances that are already created, because they are separate appointments. For example, let's say we have an event that recurs every day - from Monday to Sunday, including. If we create an exception for Tuesday, and change the start time of the entire recurring event to begin on the Wednesday after that, we will have the exception appointment on Tuesday and a gap on Thursday, because the exception date that was initially Tuesday actually matches the second occurrence of the appointment, which is now on Thursday.


##  Built-in Validation

By default, the Scheduler requires that an appointment has:

* title - this is what is rendered for the user to see
* start time - so the scheduler can know where to render it
* end time - so the scheduler can know where it ends

The built-in edit form also enforces that the end time is after the start time.

The Scheduler edit form works with an instance that that the scheduler creates from the provided model from its data source. This means that custom validation rules (attributes) in the model will not be used by the scheduler. To implement custom validation logic, implement a custom edit form. Make sure that the same three fields, at minimum, are required and available in the appointments you store, otherwise errors may be thrown.


## Example with Default Field Names

>caption Data Binding to a model that uses the default field names

````RAZOR
@* This model uses the default fields names, so you only need to define the scheduler appearance properties and views *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

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
            },

            new SchedulerAppointment
            {
                Title = "Morning run",
                Description = "Some time to clear the head and exercise.",
                Start = new DateTime(2019, 11, 27, 9, 0, 0),
                End = new DateTime(2019, 11, 27, 9, 30, 0),
                RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
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
        public string RecurrenceRule { get; set; }
        public List<DateTime> RecurrenceExceptions { get; set; }
        public Guid? RecurrenceId { get; set; }

        public SchedulerAppointment()
        {
            Id = Guid.NewGuid();
        }
    }
}
````

## Example with Custom Field Names

>caption Data Binding to a model with custom field names

````RAZOR
@* This model uses custom fields that do not match the default settings. The example shows how to tell the Scheduler in which fields to look for the information. You are not required to use the nameof operator, you can "hardcode" the string names as well. *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView"
                  TitleField="@(nameof(SchedulerAppointment.AppointmentTitle))"
                  DescriptionField="@(nameof(SchedulerAppointment.ApptDescription))"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  IsAllDayField="@(nameof(SchedulerAppointment.AllDayAppt))"
                  IdField="@(nameof(SchedulerAppointment.ID))"
                  RecurrenceRuleField="@(nameof(SchedulerAppointment.RecurrenceString))"
                  RecurrenceExceptionsField="@(nameof(SchedulerAppointment.RecurrenceApptExceptions))"
                  RecurrenceIdField="@(nameof(SchedulerAppointment.RecurrenceAppointmentId))"
                  >
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                AppointmentTitle = "Board meeting",
                ApptDescription = "Q4 is coming to a close, review the details.",
                StartTime = new DateTime(2019, 12, 5, 10, 00, 0),
                EndTime = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Vet visit",
                ApptDescription = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 12, 2, 11, 30, 0),
                EndTime = new DateTime(2019, 12, 2, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Planning meeting",
                ApptDescription = "Kick off the new project.",
                StartTime = new DateTime(2019, 12, 6, 9, 30, 0),
                EndTime = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Trip to Hawaii",
                ApptDescription = "An unforgettable holiday!",
                AllDayAppt = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 05)
            },

            new SchedulerAppointment
            {
                AppointmentTitle = "Morning run",
                ApptDescription = "Some time to clear the head and exercise.",
                StartTime = new DateTime(2019, 11, 27, 9, 0, 0),
                EndTime = new DateTime(2019, 11, 27, 9, 30, 0),
                RecurrenceString = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
            }
    };

    public class SchedulerAppointment
    {
        public Guid ID { get; set; }
        public string AppointmentTitle { get; set; }
        public string ApptDescription { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool AllDayAppt { get; set; }
        public string RecurrenceString { get; set; }
        public List<DateTime> RecurrenceApptExceptions { get; set; }
        public Guid? RecurrenceAppointmentId { get; set; }

        public SchedulerAppointment()
        {
            ID = Guid.NewGuid();
        }
    }
}
````


## Next Steps

* [Configure Scheduler views](slug:scheduler-views-overview)
* [Enable Scheduler editing](slug:scheduler-appointments-edit)


## See Also

* [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
