---
title: Resources
page_title: Scheduler - Resources
description: Resources in the Scheduler for Blazor.
slug: scheduler-resources
tags: telerik,blazor,scheduler,resources
tag: updated
published: true
position: 30
components: ["scheduler"]
---

# Scheduler Resources

The Scheduler lets you associate appointments with shared resources (such as meeting rooms, people, equipment) and display the appointments in the corresponding resource color. This article describes how to set up the Scheduler and its data to work with resources.

## Basics

Resources are optional. You can define no resources, one type of resource, or multiple types of resources. When the user opens an appointment for editing, they will have a DropDownList for each type of resource.

To use resources:

1. Define a resource class with a name of your choice and `string` properties for the resource name, value, and color. The following snippet uses the default expected property names, which do not require additional Scheduler configuration (`Color`, `Text`, `Value`). You can also use custom names and specify them in each `<SchedulerResource>` definition.
    ````C#.skip-repl
    public class Resource
    {
        public string Color { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
    ````
1. Define one or more collections of resources.
    ````C#.skip-repl
        private List<Resource> Rooms { get; set; } = new List<Resource>()
            {
                new Resource()
                {
                    Text = "Small Room",
                    Value = "1",
                    Color = "lime"
                },
                new Resource()
                {
                    Text = "Big Room",
                    Value = "2",
                    Color = "orange"
                }
            };
    ````
1. Add a `string` property to the Scheduler model for each resource.
    ````C#.skip-repl
    public class Appointment
    {
        public string Room { get; set; } = string.Empty;
    }
    ````
1. Add one `<SchedulerResource>` tag for each resource type.
    * Set the `Data` parameter to the resource collection of that type.
    * Set the `Field` parameter to the property name for the same resource in the Scheduler model.
    * If the resource class uses custom property names, specify them with the `ColorField`, `TextField`, and `ValueField` parameters.
    ````RAZOR.skip-repl
    <TelerikScheduler>
        <SchedulerResources>
            <SchedulerResource Data="@Rooms"
                               Field="@nameof(Appointment.Room)"
                               Title="Room" />
        </SchedulerResources>
    </TelerikScheduler>
    ````

The resource definition order in the `<SchedulerResources>` collection matters:

* It determines the order of the resource selection dropdowns in the [Scheduler edit form](slug:scheduler-appointments-edit).
* The background color of each appointment depends on the first matched resource.

>tip Other ways to style the appointments are the [`ItemTemplate`](slug:scheduler-templates-appointment) and the [`OnItemRender` event](slug:scheduler-events#onitemrender).

## Example

>caption Using Scheduler resources with default property names

````RAZOR
<p>
    Enable or disable resources to see their respective dropdowns in the popup edit form:
    <br />
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@EnableRoomResource"
                         OnChange="@(() => SchedulerRef?.Refresh())" />
        Use Room Resource
    </label>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@EnableManagerResource"
                         OnChange="@(() => SchedulerRef?.Refresh())" />
        Use Manager Resource
    </label>
</p>

<TelerikScheduler @ref="@SchedulerRef"
                  Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  @bind-View="@SchedulerView"
                  AllowCreate="true"
                  AllowUpdate="true"
                  OnCreate="@OnSchedulerCreate"
                  OnUpdate="@OnSchedulerUpdate"
                  Height="70vh">
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
        @if (EnableRoomResource)
        {
            <SchedulerResource Data="@Rooms"
                                Field="@nameof(Appointment.Room)"
                                Title="Room" />
        }
        @if (EnableManagerResource)
        {
            <SchedulerResource Data="@Managers"
                                Field="@nameof(Appointment.Manager)"
                                Title="Manager" />
        }
    </SchedulerResources>
    <SchedulerSettings>
        <SchedulerPopupEditSettings MaxHeight="90vh" />
    </SchedulerSettings>
</TelerikScheduler>

@code {
    private TelerikScheduler<Appointment>? SchedulerRef;

    private List<Appointment> SchedulerData { get; set; } = new List<Appointment>();
    private DateTime SchedulerDate { get; set; } = DateTime.Today;
    private SchedulerView SchedulerView { get; set; } = SchedulerView.Day;
    private DateTime StartTime { get; set; } = DateTime.Today.AddHours(10);
    private DateTime EndTime { get; set; } = DateTime.Today.AddHours(18);
    private List<Resource> Rooms { get; set; } = new List<Resource>();
    private List<Resource> Managers { get; set; } = new List<Resource>();

    private bool EnableRoomResource { get; set; } = true;
    private bool EnableManagerResource { get; set; }

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

* [Live Demo: Scheduler Resources](https://demos.telerik.com/blazor-ui/scheduler/resources)
* [Scheduler Resource Grouping](slug:scheduler-resource-grouping)
* [Scheduler Appointment Editing](slug:scheduler-appointments-edit)
* [Scheduler Data Binding](slug:scheduler-appointments-databinding)
