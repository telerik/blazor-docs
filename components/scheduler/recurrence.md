---
title: Recurrence
page_title: Scheduler Recurrence
description: Learn how to set up the Telerik Scheduler for Blazor to display and edit recurring appointments.
slug: scheduler-recurrence
tags: telerik, blazor, scheduler, recurrence
published: True
position: 7
---

# Scheduler Recurrence

The Telerik Scheduler for Blazor supports displaying and editing of recurring appointments and exceptions. This article describes how to:

* Configure the Scheduler for using recurring appointments.
* Define recurrence rules and recurrence exceptions in the Scheduler data.
* Edit recurring appointments and exceptions.

## Basics

To display recurring appointments in the Scheduler component, the model class must implement [three recurrence-related properties](slug:scheduler-appointments-databinding#appointment-features):

* `RecurrenceRule`
* `RecurrenceExceptions`
* `RecurrenceId`

You can also [define custom property names](slug:scheduler-appointments-databinding#example-with-custom-field-names) through the respective Scheduler parameters:

* `RecurrenceRuleField`
* `RecurrenceExceptionsField`
* `RecurrenceIdField`

A single Scheduler data item defines one series of recurring appointments. Set the `RecurrenceRule` value, according to the [RFC5545 standard](https://tools.ietf.org/html/rfc5545#section-3.3.10). Then, if exceptions to the recurrence rule exist:

* Each exception must be a separate data item.
* The `RecurrenceId` property of each exception must be equal to `Id` value of the recurring appointment.
* The `RecurrenceExceptions` property of the recurring appointment must contain the `Start` values of all occurrences, which are exceptions to the recurrence rule. The correct values are the original start `DateTime` values of the occurrences, which would apply if there were no exceptions.

## Example

>caption Bind Scheduler to recurring appointments and recurrence exceptions

````RAZOR
<TelerikScheduler Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  @bind-View="@SchedulerView"
                  AllowCreate="true"
                  AllowDelete="true"
                  AllowUpdate="true"
                  OnCreate="@OnSchedulerCreate"
                  OnDelete="@OnSchedulerDelete"
                  OnUpdate="@OnSchedulerUpdate"
                  Height="99vh">
    <SchedulerViews>
        <SchedulerDayView StartTime="@SchedulerViewStartTime"
                          EndTime="@SchedulerViewEndTime" />
        <SchedulerWeekView StartTime="@SchedulerViewStartTime"
                           EndTime="@SchedulerViewEndTime" />
        <SchedulerMonthView />
    </SchedulerViews>
    <SchedulerSettings>
        <SchedulerPopupEditSettings MaxHeight="99vh" />
    </SchedulerSettings>
</TelerikScheduler>

@code {
    private List<Appointment> SchedulerData { get; set; } = new();

    private DateTime SchedulerDate { get; set; }

    private SchedulerView SchedulerView { get; set; } = SchedulerView.Week;

    private DateTime SchedulerViewStartTime { get; set; } = DateTime.Today.AddHours(10);
    private DateTime SchedulerViewEndTime { get; set; } = DateTime.Today.AddHours(19);

    private void OnSchedulerCreate(SchedulerCreateEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        SchedulerData.Add(item);
    }

    private void OnSchedulerDelete(SchedulerDeleteEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        SchedulerData.Remove(item);
    }

    private void OnSchedulerUpdate(SchedulerUpdateEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        int originalItemIndex = SchedulerData.FindIndex(a => a.Id == item.Id);

        if (originalItemIndex >= 0)
        {
            SchedulerData[originalItemIndex] = item;
        }
    }

    protected override void OnInitialized()
    {
        SchedulerDate = GetNextMonthStart();

        DateTime mondayMidnight = GetStartDateTime();

        SchedulerData.Add(new Appointment
        {
            Title = "Weekly team meeting",
            Start = mondayMidnight.AddHours(10).AddMinutes(30),
            End = mondayMidnight.AddHours(11).AddMinutes(30),
            RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO"
        });

        SchedulerData.Add(new Appointment
        {
            Title = "Workout at the gym",
            Start = mondayMidnight.AddHours(17),
            End = mondayMidnight.AddHours(18),
            RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE,FR"
        });

        SchedulerData.Add(new Appointment
        {
            Title = "Quaterly meeting with manager",
            Start = mondayMidnight.AddDays(3).AddHours(14).AddMinutes(30),
            End = mondayMidnight.AddDays(3).AddHours(15).AddMinutes(30),
            RecurrenceRule = "FREQ=MONTHLY;INTERVAL=3;COUNT=36;BYDAY=TH;BYSETPOS=1"
        });

        SchedulerData.Add(new Appointment
        {
            Title = "Pay monthly bills",
            Start = new DateTime(mondayMidnight.Year, mondayMidnight.Month, 1),
            End = new DateTime(mondayMidnight.Year, mondayMidnight.Month, 1),
            IsAllDay = true,
            RecurrenceRule = "FREQ=MONTHLY"
        });

        // Create a base recurring appointment.
        // Exceptions are defined below.
        Appointment dailyLunch = new Appointment
        {
            Title = "Daily lunch",
            Start = mondayMidnight.AddHours(12),
            End = mondayMidnight.AddHours(13),
            RecurrenceRule = "FREQ=DAILY"
        };
        SchedulerData.Add(dailyLunch);

        // Create exceptions to the base appointment.
        int daysSinceMonday = SchedulerDate.DayOfWeek - DayOfWeek.Monday;
        DateTime lastMonday = DateTime.SpecifyKind(SchedulerDate.AddDays(-daysSinceMonday), DateTimeKind.Unspecified);

        Appointment lateLunchException = new Appointment
        {
            Title = "Late lunch",
            Start = lastMonday.AddHours(13),
            End = lastMonday.AddHours(14),
            RecurrenceId = dailyLunch.Id
        };
        SchedulerData.Add(lateLunchException);

        Appointment earlyLunchException = new Appointment
        {
            Title = "Early lunch",
            Start = lastMonday.AddDays(3).AddHours(11),
            End = lastMonday.AddDays(3).AddHours(12),
            RecurrenceId = dailyLunch.Id

        };
        SchedulerData.Add(earlyLunchException);

        // Relate the exceptions to the base appointment.
        DateTime lateLunchOriginalStart = DateTime.SpecifyKind(lastMonday.AddHours(12), DateTimeKind.Unspecified);
        DateTime earlyLunchOriginalStart = DateTime.SpecifyKind(lastMonday.AddDays(3).AddHours(12), DateTimeKind.Unspecified);
        dailyLunch.RecurrenceExceptions = new List<DateTime>()
        {
            lateLunchOriginalStart,
            earlyLunchOriginalStart
        };
    }

    private DateTime GetNextMonthStart()
    {
        DateTime today = DateTime.Today;

        return new DateTime(today.Year, today.Month, 1).AddMonths(1);
    }

    private DateTime GetStartDateTime()
    {
        DateTime firstDayOfLastYear = new DateTime(DateTime.Today.Year, 1, 1).AddYears(-1);

        return firstDayOfLastYear.AddDays(1 - (int)firstDayOfLastYear.DayOfWeek);
    }

    public class Appointment
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }

        public string RecurrenceRule { get; set; } = string.Empty;
        public List<DateTime>? RecurrenceExceptions { get; set; }
        public object? RecurrenceId { get; set; }

        public Appointment()
        {
            var rand = new Random();
            Id = Guid.NewGuid();
        }
    }
}
````

## Next Steps

* [Enable Scheduler Editing](slug:scheduler-appointments-edit)

## See Also

* [Live Demo: Scheduler Recurring Appointments](https://demos.telerik.com/blazor-ui/scheduler/recurring-appointments)
* [Scheduler API Reference](slug:Telerik.Blazor.Components.TelerikScheduler-1)
