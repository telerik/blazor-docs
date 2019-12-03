---
title: Navigation
page_title: Scheduler for Blazor | Navigation
description: Navigating the Scheduler for Blazor
slug: scheduler-navigation
tags: telerik,blazor,scheduler,navigation
published: true
position: 5
---

# Scheduler Navigation

This article explains how to browse the available dates, views and features of the scheduler - as a user and from code.

This article contains the following sections:

* [User Experience](#user-experience)
* [Navigation From Code](#navigation-from-code)

## User Experience

The UI of the scheduler provides several navigation features for the user so they can make their experience more comfortable and suitable to the task at hand:

1. `Today` - Clicking the Today button shows the user today's date. If the current view shows more than one day, today's date will be its start (note: some views don't start on the exact start date).
1. `Previous` and `Next` - these buttons navigate to the previous and the next sections (periods) in the scheduler, according to the current view (for example, the next week for the WeekView, or the previous set of X days for the MultiDay view).
1. `Calendar Picker` - shows the current view start date. You can click it to open a date picker to select a new start date.
1. `Day Header` - clicking the header of a day navigates you to the day view for this day.
1. `Views` - the list of available views shows the current view and lets you select a different one.
1. `Show business hours` - a toggle that lets you see only the business portion of the day instead of the entire day, and vice-versa. 

![](images/scheduler-user-navigation.png)

## Navigation From Code

You can alter the following scheduler parameters through code:

* Currently shown date
* Currently shown View

>tip Usually, you would use the `@bind-Date` and `@bind-View` syntax to prevent the parameters from resetting to the initial values upon re-rendering.

>caption Navigate the scheduler programmatically

````CSHTML
Change active date:
<TelerikDatePicker @bind-Value="@StartDate" />
<br />
Change current View:
<TelerikDropDownList Data="@AvailableViews" @bind-Value="@CurrView" />


<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public List<SchedulerView> AvailableViews { get; set; } = new List<SchedulerView>(Enum.GetValues(typeof(SchedulerView)).AsQueryable() as IEnumerable<SchedulerView>);

    //sample data to get things shown
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                Start = new DateTime(2019, 12, 5, 10, 00, 0),
                End = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 12, 2, 11, 30, 0),
                End = new DateTime(2019, 12, 2, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 12, 6, 9, 30, 0),
                End = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Id = Guid.NewGuid(),
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 05)
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

## See Also

* [Scheduler Overview]({%slug scheduler-overview%})
* [Scheduler Views]({%slug scheduler-views-overview%})


