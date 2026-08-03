---
title: Resource Grouping
page_title: Scheduler - Resource Grouping
description: Group Resources in the Scheduler for Blazor.
slug: scheduler-resource-grouping
tags: telerik,blazor,scheduler,resource,grouping
published: true
position: 33
components: ["scheduler"]
---

# Scheduler Resource Grouping

The Telerik Scheduler for Blazor can group appointments by one or more resources. All available [Scheduler views](slug:scheduler-views-overview) support horizontal and vertical grouping, except the Agenda view, which only uses vertical grouping.

>tip This article requires familiarity with [Scheduler Resources](slug:scheduler-resources).

## Basics

When Scheduler grouping is active, the component renders multiple view tables in horizontal and vertical orientation. The date or hour headers repeat for each group (resource value).

Moving an appointment from one group to another is allowed. On drop, the appointment resource changes alongside the start date and the app should persist these changes in the [`OnUpdate` event handler](slug:scheduler-appointments-edit).

To configure resource display in groups:

1. [Configure the Scheduler component to work with resources](slug:scheduler-resources).
1. Add the `<SchedulerGroupSettings>` tag inside `<SchedulerSettings>`.
1. Set the `Resources` parameter to a `List<string>` of one or more resource names that match property names in the Scheduler model class.
1. (optional) Set the `Orientation` parameter to a member of the [`SchedulerGroupOrientation`](slug:telerik.blazor.schedulergrouporientation) enum. The default value is `Horizontal`.

>caption Scheduler Group Settings

````RAZOR.skip-repl
<TelerikScheduler>
    <SchedulerSettings>
        <SchedulerGroupSettings Orientation="@SchedulerGroupOrientation.Vertical"
                                Resources="@GroupResources" />
    </SchedulerSettings>
</TelerikScheduler>

@code {
    private readonly List<string> GroupResources = new()
    {
        nameof(Appointment.Room),
        nameof(Appointment.Manager)
    };
}
````

## Example

>caption Scheduler Resource Grouping

````RAZOR
<p>
    Enable or disable single or multiple resource grouping:
    <br />
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@GroupByRoom" />
        Group by Room
    </label>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@GroupByManager" />
        Group by Manager
    </label>
</p>

<p>
    Group orientation:
    <TelerikRadioGroup Data="@GroupOrientations"
                       @bind-Value="@GroupOrientation"
                       Layout="@RadioGroupLayout.Horizontal" />
</p>

<TelerikScheduler Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  @bind-View="@SchedulerView"
                  AllowCreate="true"
                  AllowUpdate="true"
                  OnCreate="@OnSchedulerCreate"
                  OnUpdate="@OnSchedulerUpdate"
                  Height="70vh">
    <SchedulerSettings>
        <SchedulerGroupSettings Orientation="@GroupOrientation"
                                Resources="@GroupResources" />
        <SchedulerPopupEditSettings MaxHeight="90vh" />
    </SchedulerSettings>
    <SchedulerViews>
        <SchedulerDayView StartTime="@StartTime"
                          EndTime="@EndTime"
                          WorkDayStart="@StartTime"
                          WorkDayEnd="@EndTime" />
        <SchedulerWeekView StartTime="@StartTime"
                           EndTime="@EndTime"
                           WorkDayStart="@StartTime"
                           WorkDayEnd="@EndTime" />
        <SchedulerMonthView />
        <SchedulerTimelineView NumberOfDays="1"
                               StartTime="@StartTime"
                               EndTime="@EndTime"
                               WorkDayStart="@StartTime"
                               WorkDayEnd="@EndTime" />
        <SchedulerAgendaView />
    </SchedulerViews>
    <SchedulerResources>
        <SchedulerResource Data="@Rooms"
                           Field="@nameof(Appointment.Room)"
                           Title="Room" />
        <SchedulerResource Data="@Managers"
                           Field="@nameof(Appointment.Manager)"
                           Title="Manager" />
    </SchedulerResources>
</TelerikScheduler>

@code {
    private List<Appointment> SchedulerData { get; set; } = new List<Appointment>();
    private DateTime SchedulerDate { get; set; } = DateTime.Today;
    private SchedulerView SchedulerView { get; set; } = SchedulerView.Day;
    private DateTime StartTime { get; set; } = DateTime.Today.AddHours(10);
    private DateTime EndTime { get; set; } = DateTime.Today.AddHours(18);
    private List<Resource> Rooms { get; set; } = new List<Resource>();
    private List<Resource> Managers { get; set; } = new List<Resource>();

    private bool GroupByRoom { get; set; } = true;
    private bool GroupByManager { get; set; }

    private List<string> GroupResources => GroupByManager && GroupByRoom ?
        new List<string> { nameof(Appointment.Room), nameof(Appointment.Manager) } :
        GroupByManager ?
        new List<string> { nameof(Appointment.Manager) } :
        GroupByRoom ?
        new List<string> { nameof(Appointment.Room) } :
        new List<string>();

    private readonly List<SchedulerGroupOrientation> GroupOrientations = new()
        {
            SchedulerGroupOrientation.Horizontal,
            SchedulerGroupOrientation.Vertical
        };
    private SchedulerGroupOrientation GroupOrientation { get; set; } = SchedulerGroupOrientation.Horizontal;

    private void OnSchedulerUpdate(SchedulerUpdateEventArgs args)
    {
        Appointment itemToUpdate = (Appointment)args.Item;
        Appointment? originalItem = SchedulerData.Find(a => a.Id == itemToUpdate.Id);

        if (originalItem is not null)
        {
            originalItem.Title = itemToUpdate.Title;
            originalItem.Description = itemToUpdate.Description;
            originalItem.Start = itemToUpdate.Start;
            originalItem.End = itemToUpdate.End;
            originalItem.IsAllDay = itemToUpdate.IsAllDay;
            originalItem.Room = itemToUpdate.Room;
            originalItem.Manager = itemToUpdate.Manager;
        }
    }

    private void OnSchedulerCreate(SchedulerCreateEventArgs args)
    {
        Appointment itemToCreate = (Appointment)args.Item;

        SchedulerData.Add(itemToCreate);
    }

    protected override async Task OnInitializedAsync()
    {
        Rooms = await ResourceService.GetRoomsAsync();
        Managers = await ResourceService.GetManagersAsync();
        SchedulerData = await AppointmentService.GetAppointmentsAsync();

        SchedulerDate = AppointmentService.GetStartDateTime().Date;
    }

    public static class AppointmentService
    {
        public static async Task<List<Appointment>> GetAppointmentsAsync()
        {
            await Task.Delay(100);

            List<Appointment> data = new List<Appointment>();
            DateTime baseDateTime = GetStartDateTime();

            data.Add(new Appointment
            {
                Title = "Weekly Monday Sync",
                Description = "Planning sync",
                Start = baseDateTime.AddHours(0),
                End = baseDateTime.AddHours(0).AddMinutes(30),
                Room = "1",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "Cross-Team Meeting",
                Description = "Product and design sync",
                Start = baseDateTime.AddHours(1),
                End = baseDateTime.AddHours(2),
                Room = "2",
                Manager = "2"
            });
            data.Add(new Appointment
            {
                Title = "Support Meeting",
                Description = "Discuss feature requests, bugs, tickets",
                Start = baseDateTime.AddHours(3),
                End = baseDateTime.AddHours(3).AddMinutes(30),
                Room = "1",
                Manager = "2"
            });
            data.Add(new Appointment
            {
                Title = "Table Tennis",
                Description = "Sports and fun",
                Start = baseDateTime.AddHours(4),
                End = baseDateTime.AddHours(4).AddMinutes(30),
                Room = "2",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "Team Lead 1:1",
                Start = baseDateTime.AddHours(5),
                End = baseDateTime.AddHours(5).AddMinutes(30),
                Room = "1",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "Cheer the Wins",
                Description = "Recap and snacks",
                Start = baseDateTime.AddHours(6),
                End = baseDateTime.AddHours(7),
                Room = "2",
                Manager = "2"
            });

            return data;
        }

        public static DateTime GetStartDateTime()
        {
            DateTime today = DateTime.Today;
            int daysSinceMonday = today.DayOfWeek - DayOfWeek.Monday;

            return new DateTime(today.Year, today.Month, today.Day, 10, 0, 0).AddDays(-daysSinceMonday);
        }
    }

    public static class ResourceService
    {
        public static async Task<List<Resource>> GetRoomsAsync()
        {
            await Task.Delay(100);

            List<Resource> result = new List<Resource>();

            result.Add(new Resource()
            {
                Text = "Small Room",
                Value = "1",
                Color = "var(--kendo-color-success-subtle)"
            });
            result.Add(new Resource()
            {
                Text = "Big Room",
                Value = "2",
                Color = "var(--kendo-color-info-subtle)"
            });

            return result;
        }

        public static async Task<List<Resource>> GetManagersAsync()
        {
            await Task.Delay(100);

            List<Resource> result = new List<Resource>();

            result.Add(new Resource()
            {
                Text = "Team Lead",
                Value = "1",
                Color = "var(--kendo-color-warning-subtle)"
            });
            result.Add(new Resource()
            {
                Text = "Senior Manager",
                Value = "2",
                Color = "var(--kendo-color-error-subtle)"
            });

            return result;
        }
    }

    public class Appointment
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Room { get; set; } = string.Empty;
        public string Manager { get; set; } = string.Empty;
    }

    public class Resource
    {
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: Scheduler Grouping](https://demos.telerik.com/blazor-ui/scheduler/grouping)
* [Scheduler Overview](slug:scheduler-overview)
