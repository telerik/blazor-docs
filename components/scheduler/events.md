---
title: Events
page_title: Scheduler - Events
description: Events in the Scheduler for Blazor.
slug: scheduler-events
tags: telerik,blazor,scheduler,events
published: true
position: 50
---

# Scheduler Events

This article explains the events available in the Telerik Scheduler for Blazor:

* [CUD Events](#cud-events)
* [ItemRender](#itemrender)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)

## CUD Events

To implement appointment editing, the scheduler exposes the `OnCreate`, `OnDelete` and `OnUpdate` events. They let you propagate the changes the user makes in the UI to the view model and to the data storage. You can read mode in the [Appointment Editing]({%slug scheduler-appointments-edit%}) article.

## ItemRender

The `OnItemRender` event fires when an appointment is going to be rendered in the scheduler. It fires one for every appointment, including all-day appointments that span several days/slots.

Through its event arguments you can get the `Item` to cast it to your model type and to set the `Class` that will render on the appointment wrapping element. This lets you customize the appearance of the entire appointment, not just the contents of its [template]({%slug scheduler-templates-appointment%}).

>caption Customize the appearance of the scheduler appointments by adding custom CSS classes to them conditionally

````CSHTML
@* The sample styles are at the end of the snippet, and you can also add more than one per appointment, depending on the necessary logic *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px" Width="800px"
                  OnItemRender="@OnItemRenderHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    void OnItemRenderHandler(SchedulerItemRenderEventArgs e)
    {
        SchedulerAppointment appt = e.Item as SchedulerAppointment;
        if (appt.Important)
        {
            e.Class = "important-appointment";
        }
        if (appt.IsAllDay)
        {
            e.Class += " all-day-style";
        }
    }

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
                End = new DateTime(2019, 11, 26, 12, 0, 0),
                Important = true
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
                Start = new DateTime(2019, 11, 29),
                End = new DateTime(2019, 12, 07),
                Important = true
            },

            new SchedulerAppointment
            {
                Title = "Online conference",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 25),
                End = new DateTime(2019, 11, 26)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }

        public bool Important { get; set; }
    }
}

<style>
    .important-appointment {
        background-color: red;
        color: yellow;
        font-weight: 900;
    }

    .all-day-style {
        color: blue;
    }
</style>
````

>caption The result from the code snippet above

![Custom appointment appearance through conditional CSS classes](images/item-render-customization.png)

## DateChanged

The `DateChanged` event fires when the user [navigates]({%slug scheduler-navigation%}) to another date in the scheduler. For a view whose start is determined by outside factors and not only by the `Date` parameter (the week view), the event argument may not always be the start time of the range, but a date contained within the range. You could also use this event to load only appointments from the view's range which can be a performance optimization technique if you have a very large number of appointments.

>caption Handle the `DateChanged` event


````CSHTML
@* Try navigating to the previous or next period, today or a random date, then repeat after changing the view *@

@result

<TelerikScheduler Data="@Appointments" @bind-View="@CurrView" Height="600px"
                  Date="@StartDate" DateChanged="@DateChangedHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    async Task DateChangedHandler(DateTime currDate)
    {
        result = $"The user went to a range that contains the {currDate.ToShortDateString()} date";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        StartDate = currDate;
    }

    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
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
                Start = new DateTime(2019, 11, 29, 11, 30, 0),
                End = new DateTime(2019, 11, 29, 12, 0, 0)
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


@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)





## ViewChanged

The `ViewChanged` event fires when the user chooses a new [View]({%slug scheduler-views-overview%}). You can read more about the navigation options the user has in the [Navigation]({%slug scheduler-navigation%}) article.

>caption Handle the `ViewChanged` event.

````CSHTML
@result

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px"
                  View="@CurrView" ViewChanged="@ViewChangedHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    async Task ViewChangedHandler(SchedulerView nextView)
    {
        result = $"The user went to the {nextView.ToString()} view on {DateTime.Now}";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        CurrView = nextView;
    }

    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
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
                Start = new DateTime(2019, 11, 29, 11, 30, 0),
                End = new DateTime(2019, 11, 29, 12, 0, 0)
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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Scheduler Overview]({%slug scheduler-overview%})
* [Views Overview]({%slug scheduler-views-overview%})
* [Scheduler Naviation]({%slug scheduler-navigation%})
* [Data Binding]({%slug scheduler-appointments-databinding%})
* [Appointments Editing]({%slug scheduler-appointments-edit%})

