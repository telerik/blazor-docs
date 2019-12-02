---
title: Events
page_title: Scheduler for Blazor | Events
description: Events in the Scheduler for Blazor
slug: scheduler-events
tags: telerik,blazor,scheduler,events
published: true
position: 20
---

# Scheduler Events

This article explains the events available in the Telerik Scheduler for Blazor:

* [CUD Events](#cud-events)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)

## CUD Events

To implement appointment editing, the scheduler exposes the `OnCreate`, `OnDelete` and `OnUpdate` events. They let you propagate the changes the user makes in the UI to the view model and to the data storage. You can read mode in the [Appointment Editing]({%slug scheduler-appointments-edit%}) article.

## DateChanged

The `DateChanged` event fires when the user [navigates]({%slug scheduler-navigation%}) to another date in the scheduler. For a view whose start is determined by outside factors and not only by the `Date` parameter (the week view), the event argument may not always be the start time of the range, but a date contained within the range.

>caption Handle the `DateChanged` event


````CSHTML
@* Try navigating to the previous or next period, today or a random date, then repeat after changing the view *@

@result

<TelerikScheduler Data="@Appointments" @bind-View="@CurrView" Height="600px"
                  Date="@StartDate" DateChanged="@DateChangedHandler"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  TitleField="@(nameof(SchedulerAppointment.Title))"
                  DescriptionField="@(nameof(SchedulerAppointment.Description))"
                  IsAllDayField="@(nameof(SchedulerAppointment.IsAllDay))">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerMultiDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    async Task DateChangedHandler(DateTime currDate)
    {
        result = $"The user went to a range that contains the {currStart.ToShortDateString()} date";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        StartDate = currDate;
    }

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
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                StartTime = new DateTime(2019, 12, 5, 10, 00, 0),
                EndTime = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 29, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 29, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                StartTime = new DateTime(2019, 12, 6, 9, 30, 0),
                EndTime = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 05)
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


@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)





## ViewChanged

The `ViewChanged` event fires when the user chooses a new [View]({%slug scheduler-views-overview%}). You can read more about the navigation options the user has in the [Navigation]({%slug scheduler-navigation%}) article.

>caption Handle the `ViewChanged` event.

````CSHTML
@result

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px"
                  View="@CurrView" ViewChanged="@ViewChangedHandler"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  TitleField="@(nameof(SchedulerAppointment.Title))"
                  DescriptionField="@(nameof(SchedulerAppointment.Description))"
                  IsAllDayField="@(nameof(SchedulerAppointment.IsAllDay))">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerMultiDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    async Task ViewChangedHandler(SchedulerView nextView)
    {
        result = $"The user went to the {nextView.ToString()} view on {DateTime.Now}";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        CurrView = nextView;
    }

    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    //the time portions are important
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    public DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    public DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    public DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                StartTime = new DateTime(2019, 12, 5, 10, 00, 0),
                EndTime = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 29, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 29, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                StartTime = new DateTime(2019, 12, 6, 9, 30, 0),
                EndTime = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 05)
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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Scheduler Overview]({%slug scheduler-overview%})
* [Views Overview]({%slug scheduler-views-overview%})
* [Scheduler Naviation]({%slug scheduler-navigation%})
* [Appointments Overview]({%slug scheduler-appointments-overview%})
* [Appointments Editing]({%slug scheduler-appointments-edit%})

