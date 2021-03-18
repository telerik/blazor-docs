---
title: Refresh Data
page_title: Scheduler Refresh Data
description: Refresh Scheduler Data using Observable Data or creating a new Collection reference.
slug: scheduler-refresh-data
tags: telerik,blazor,scheduler,observable,data,new,collection
published: True
position: 40
---

# Scheduler Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Scheduler will receive this feature in a future release. You can currently refresh its Data by creating a [New collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Scheduler data.

````CSHTML
@* Add/remove an appointment or change the data collection to see how the Scheduler reacts to that change. *@

<TelerikButton OnClick="@AddAppointment">Add appointment</TelerikButton>

<TelerikButton OnClick="@RemoveAppointment">Remove appointment</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change data</TelerikButton>

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

    void AddAppointment()
    {
        Appointments.Add(
            new SchedulerAppointment
            {
                Title = "Hairdresser",
                Description = "I need to get my hair cut.",
                Start = new DateTime(2019, 11, 28, 10, 0, 0),
                End = new DateTime(2019, 11, 28, 11, 0, 0)
            });
        Appointments = new List<SchedulerAppointment>(Appointments);
    }

    void RemoveAppointment()
    {
        if (Appointments.Count > 0)
        {
            Appointments.RemoveAt(Appointments.IndexOf(Appointments.Last()));
            Appointments = new List<SchedulerAppointment>(Appointments);
        }
    }

    void ChangeData()
    {
        Appointments = new List<SchedulerAppointment>()
        {
            new SchedulerAppointment
            {
                Title = "Hairdresser",
                Description = "I need to get my hair cut.",
                Start = new DateTime(2019, 11, 25, 9, 30, 0),
                End = new DateTime(2019, 11, 25, 10, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Lunch with Alice",
                Description = "Spend some time with a friend",
                Start = new DateTime(2019, 11, 28, 12, 0, 0),
                End = new DateTime(2019, 11, 28, 13, 0, 0)
            }
        };
        Appointments = new List<SchedulerAppointment>(Appointments);
    }

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

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
