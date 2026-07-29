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

When Scheduler grouping is active, the component renders multiple view tables in horizontal and vertical orientation. The date or hour headers repeat for each group.

Moving an appointment from one group to another is allowed. On drop, the appointment resource changes alongside the start date and the app should persist these changes in the [`OnUpdate` event handler](slug:scheduler-appointments-edit).

To configure group rendering, use the `<SchedulerGroupSettings>` tag inside `<SchedulerSettings>`.

The group settings tag exposes the following parameters:

* `Resources` expects a `List<string>` of one or more resource names that match property names in the Scheduler model class.
* `Orientation` determines the orientation as an [`SchedulerGroupOrientation`](slug:telerik.blazor.schedulergrouporientation) enum. The default is `Horizontal`.

>caption Scheduler Group Settings

````RAZOR.skip-repl
<TelerikScheduler>
    <SchedulerSettings>
        <SchedulerGroupSettings Orientation="@SchedulerGroupOrientation.Horizontal"
                                Resources="@GroupingResources" />
    </SchedulerSettings>
</TelerikScheduler>

@code {
    private readonly List<string> GroupingResources = new()
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
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@GroupByRoom" />
        Group by Room
    </label>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@GroupByManager" />
        Group by Manager
    </label>
</p>

<TelerikScheduler Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  @bind-View="@SchedulerView"
                  AllowCreate="true"
                  AllowUpdate="true"
                  AllowDelete="true"
                  OnCreate="@OnSchedulerCreate"
                  OnUpdate="@OnSchedulerUpdate"
                  OnDelete="@OnSchedulerDelete"
                  Width="96vw"
                  Height="80vh">
    <SchedulerSettings>
        <SchedulerGroupSettings Orientation="@SchedulerGroupOrientation.Horizontal"
                                Resources="@GroupingResources" />
    </SchedulerSettings>
    <SchedulerViews>
        <SchedulerDayView StartTime="@StartTime" EndTime="@EndTime" WorkDayStart="@StartTime" WorkDayEnd="@EndTime" />
        <SchedulerWeekView StartTime="@StartTime" EndTime="@EndTime" WorkDayStart="@StartTime" WorkDayEnd="@EndTime" />
        <SchedulerMonthView />
        <SchedulerAgendaView />
    </SchedulerViews>
    <SchedulerResources>
        @if (GroupByRoom)
        {
            <SchedulerResource Data="@SchedulerRooms"
                            Field="@nameof(Appointment.Room)"
                            Title="Room" />
        }
        @if (GroupByManager)
        {
            <SchedulerResource Data="@SchedulerManagers"
                               Field="@nameof(Appointment.Manager)"
                               Title="Manager" />
        }
    </SchedulerResources>
</TelerikScheduler>

@code {
    #nullable enable

    private AppointmentService appointmentService = new();
    private ResourceService resourceService = new();

    private DateTime SchedulerDate { get; set; } = DateTime.Today;
    private DateTime StartTime { get; set; } = DateTime.Today.AddHours(10);
    private DateTime EndTime { get; set; } = DateTime.Today.AddHours(18);
    private SchedulerView SchedulerView { get; set; } = SchedulerView.Day;

    private List<Appointment> SchedulerData { get; set; } = new List<Appointment>();
    private List<Resource> SchedulerRooms { get; set; } = new List<Resource>();
    private List<Resource> SchedulerManagers { get; set; } = new List<Resource>();

    private List<string> GroupingResources => GroupByManager && GroupByRoom ?
        new List<string> { nameof(Appointment.Room), nameof(Appointment.Manager) } :
        GroupByManager ?
        new List<string> { nameof(Appointment.Manager) } :
        GroupByRoom ?
        new List<string> { nameof(Appointment.Room) } :
        new List<string>();

    private bool GroupByManager { get; set; }
    private bool GroupByRoom { get; set; } = true;

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

    private void OnSchedulerDelete(SchedulerDeleteEventArgs args)
    {
        Appointment itemToDelete = (Appointment)args.Item;

        SchedulerData.Remove(itemToDelete);
    }

    protected override async Task OnInitializedAsync()
    {
        SchedulerRooms = await resourceService.GetRoomsAsync();
        SchedulerManagers = await resourceService.GetManagersAsync();
        SchedulerData = await appointmentService.GetAppointmentsAsync();

        SchedulerDate = appointmentService.GetStartTime().Date;
    }

    public class AppointmentService
    {
        public async Task<List<Appointment>> GetAppointmentsAsync()
        {
            await Task.Delay(100);

            List<Appointment> data = new List<Appointment>();
            DateTime baselineTime = GetStartTime();

            data.Add(new Appointment
            {
                Title = "Weekly Monday Sync",
                Description = "Planning sync",
                Start = baselineTime.AddHours(0),
                End = baselineTime.AddHours(0).AddMinutes(30),
                Room = "1",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "Cross-team meeting",
                Description = "Product and design sync",
                Start = baselineTime.AddHours(1),
                End = baselineTime.AddHours(2),
                Room = "2",
                Manager = "2"
            });
            data.Add(new Appointment
            {
                Title = "Support Meeting",
                Description = "Discuss feature requests, bugs, tickets",
                Start = baselineTime.AddHours(3),
                End = baselineTime.AddHours(3).AddMinutes(30),
                Room = "1",
                Manager = "2"
            });
            data.Add(new Appointment
            {
                Title = "Table Tennis",
                Description = "Sports and fun",
                Start = baselineTime.AddHours(4),
                End = baselineTime.AddHours(4).AddMinutes(30),
                Room = "2",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "One-on-one with the manager",
                Start = baselineTime.AddHours(5),
                End = baselineTime.AddHours(5).AddMinutes(30),
                Room = "1",
                Manager = "1"
            });
            data.Add(new Appointment
            {
                Title = "Cheer the wins",
                Description = "Recap and snacks",
                Start = baselineTime.AddHours(6),
                End = baselineTime.AddHours(7),
                Room = "2",
                Manager = "2"
            });

            return data;
        }

        public DateTime GetStartTime()
        {
            DateTime today = DateTime.Today;
            int daysSinceMonday = today.DayOfWeek - DayOfWeek.Monday;

            return new DateTime(today.Year, today.Month, today.Day, 10, 0, 0).AddDays(-daysSinceMonday);
        }
    }

    public class ResourceService
    {
        public async Task<List<Resource>> GetRoomsAsync()
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

        public async Task<List<Resource>> GetManagersAsync()
        {
            await Task.Delay(100);

            List<Resource> result = new List<Resource>();

            result.Add(new Resource()
            {
                Text = "Alex",
                Value = "1",
                Color = "var(--kendo-color-warning-subtle)"
            });
            result.Add(new Resource()
            {
                Text = "Bob",
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
