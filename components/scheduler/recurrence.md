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

A single Scheduler data item defines one series of recurring appointments. Set the `RecurrenceRule` value, according to the [RFC5545 standard](https://tools.ietf.org/html/rfc5545#section-3.3.10), except for a [known discrepancy with extra hyphens in `UNTIL`](https://feedback.telerik.com/blazor/1529000-recurrencerule-does-not-support-the-rfc5545-date-format-like-20210722t000000). Then, if exceptions to the recurrence rule exist:

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

## Recurrence Editor Components

Telerik UI for Blazor provides standalone components that you can use to edit recurring appointments outside the Scheduler or in a [custom Scheduler popup edit form](slug:scheduler-kb-custom-edit-form).

The Telerik Blazor recurrence editor components include:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Component Name | Renders As | Description |
| --- | --- | --- |
| `RecurrenceFrequencyEditor` | Button Group | Defines whether the appointment repeats daily, weekly, monthly, yearly, or never. |
| `RecurrenceIntervalEditor` | Numeric TextBox | Defines whether the appointment repeats in each period (for example, every day), or skips periods (for example, once in three days). |
| `RecurrenceEditor` | Button&nbsp;Group or Radio&nbsp;Group | <ul><li>For weekly frequency, the Recurrence Editor is a Button Group with multiple selection, which allows choosing week days.</li><li>For monthly and yearly frequency, the Recurrence Editor is a combination for DropDownLists and a Numeric TextBox, which allow selecting repetition on specific days or week days.</li></ul> |
| `RecurrenceEndEditor` | Radio&nbsp;Group, Numeric&nbsp;TextBox, Date&nbsp;Picker | Defines if the appointment repeats indefinitely, a number of times, or until a specific date. |

### Parameters

All recurrence editor components expose:

* A `Rule` parameter of type `Telerik.Recurrence.RecurrenceRule` that supports two-way binding.
* A `RuleChanged` event that receives a `RecurrenceRule` argument.
* A `Class` parameter for [styling customizations](slug:themes-override).

In addition:

* The `RecurrenceIntervalEditor` supports an `Id` parameter of type `string`. Use it to set a custom `id` attribute to the Numeric TextBox and the same `for` attribute to the associated **Repeat every** label.
* The `RecurrenceEndEditor` supports an `End` parameter of type `DateTime`. Use it to set a default value for the **End On** Date Picker when there is no `UNTIL` setting in the recurrence rule string.

### Recurrence Rule Type Conversion

Use the following methods to convert from [RFC5545 strings](https://tools.ietf.org/html/rfc5545#section-3.3.10) to `RecurrenceRule` objects and vice-versa:

* The static method `RecurrenceRule.Parse()` to convert from RFC5545 `string` to `RecurrenceRule`.
* The instance method `RecurrenceRule.ToString()` to convert from `RecurrenceRule` to a RFC5545 `string`.

>caption Converting between different recurrence rule formats

````C#.skip-repl
// RFC5545 string
string recurrenceString = "FREQ=WEEKLY;BYDAY=MO,WE,FR";

// Convert to RecurrenceRule
RecurrenceRule recurrenceRule = RecurrenceRule.Parse(recurrenceString);

// Make some changes...

// Convert to RFC5545 string
string newRecurrenceString = recurrenceRule.ToString();
````

### Telerik Form Integration

There are two recommended ways to use the Telerik recurrence editors in a Telerik Form:

* Place each recurrence editor in a separate [Form item `Template`](slug:form-formitems-template). This is the simpler option to set up.
* Place all recurrence editors in a [`<FormItemsTemplate>`](slug:form-formitems-formitemstemplate). This is a more verbose approach, which provides better control over the Form's HTML rendering, layout and styling.

The following examples can serve as a reference for creating [custom Telerik Scheduler edit forms](slug:scheduler-kb-custom-edit-form) with recurrence editing. Using a markup structure that differs from the ones below may produce unexpected layouts.

>caption Using Telerik recurrence editors in separate Form item templates

````RAZOR
@using Telerik.Recurrence

<TelerikForm Model="@RecurringAppointment"
             OnUpdate="@OnFormUpdate">
    <FormItems>
        <FormItem Field="@nameof(Appointment.Title)" />
        <FormItem Field="@nameof(Appointment.Start)" />
        <FormItem Field="@nameof(Appointment.End)" />
        <FormItem Field="@nameof(Appointment.RecurrenceRule)"
                  LabelText="Recurrence Rule"
                  Enabled="false" />
        <FormItem>
            <Template>
                <TelerikRecurrenceFrequencyEditor Rule="@Rule"
                                                  RuleChanged="@OnRuleChanged" />
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                @if (Rule != null)
                {
                    <TelerikRecurrenceIntervalEditor Rule="@Rule" />
                }
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                <TelerikRecurrenceEditor Rule="@Rule"
                                         RuleChanged="@OnRuleChanged" />
            </Template>
        </FormItem>
        <FormItem>
            <Template>
                @if (Rule != null)
                {
                    <TelerikRecurrenceEndEditor Rule="@Rule"
                                                EndDate="@RecurrenceEndDefaultDate" />
                }
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

@code {
    private Appointment? RecurringAppointment { get; set; }

    private RecurrenceRule? Rule { get; set; }

    private DateTime RecurrenceEndDefaultDate =>
        new DateTime(Math.Max(RecurringAppointment?.End.Ticks ?? default, DateTime.Now.Ticks));

    private void OnFormUpdate()
    {
        // Only necessary to refresh the UI until all Rule parameters gain two-way binding.
        RecurringAppointment!.RecurrenceRule = Rule?.ToString() ?? string.Empty;
    }

    private void OnRuleChanged(RecurrenceRule newRule)
    {
        Rule = newRule;

        RecurringAppointment!.RecurrenceRule = Rule?.ToString() ?? string.Empty;
    }

    protected override void OnInitialized()
    {
        DateTime nextMonday = DateTime.Today.AddDays(8 - (int)DateTime.Today.DayOfWeek);

        RecurringAppointment = new Appointment
        {
            Title = "Workout at the gym",
            Start = nextMonday.AddHours(17),
            End = nextMonday.AddHours(18),
            RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,WE,FR"
        };

        Rule = RecurrenceRule.Parse(RecurringAppointment.RecurrenceRule);
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
        public Guid? RecurrenceId { get; set; }

        public Appointment()
        {
            var rand = new Random();
            Id = Guid.NewGuid();
        }
    }
}
````

To add the recurrence editors to a `FormItemsTemplate`, follow the same approach as in the example above, but add the following `<FormItemsTemplate>` tag as a child of `<TelerikForm>`.

>caption Using Telerik recurrence editors in a FormItemsTemplate

````RAZOR.skip-repl
<FormItemsTemplate Context="formContext">
    @{
        var formItems = formContext.Items.Cast<IFormItem>().ToList();
    }
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.Title)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.Start)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.End)) )" />
    <TelerikFormItemRenderer Item="@( formItems.First(x => x.Field == nameof(Appointment.RecurrenceRule)) )" />
    <div class="k-form-field">
        <TelerikRecurrenceFrequencyEditor Rule="@Rule"
                                            RuleChanged="@OnRuleChanged" />
    </div>
    @if (Rule != null)
    {
        <div class="k-form-field">
            <TelerikRecurrenceIntervalEditor Rule="@Rule" />
        </div>
    }
    <div class="k-form-field">
        <TelerikRecurrenceEditor Rule="@Rule"
                                    RuleChanged="@OnRuleChanged" />
    </div>
    @if (Rule != null)
    {
        <div class="k-form-field">
            <TelerikRecurrenceEndEditor Rule="@Rule"
                                        EndDate="@RecurrenceEndDefaultDate" />
        </div>
    }
</FormItemsTemplate>
````

## Next Steps

* [Enable Scheduler Editing](slug:scheduler-appointments-edit)

## See Also

* [Live Demo: Scheduler Recurring Appointments](https://demos.telerik.com/blazor-ui/scheduler/recurring-appointments)
* [Scheduler API Reference](slug:Telerik.Blazor.Components.TelerikScheduler-1)
