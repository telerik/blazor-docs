---
title: Resource Grouping
page_title: Scheduler - Resource Grouping
description: Group Resources in the Scheduler for Blazor.
slug: scheduler-resource-grouping
tags: telerik,blazor,scheduler,resource,grouping
published: true
position: 33
---

# Scheduler Resource Grouping

The feature allows grouping Scheduler views by one or more resources. All available supported views: `Day`, `Week`, `MultiDay` and `Month` can render both `horizontal` and `vertical` grouping.

This article contains the following sections:

* [Basics](#basics)
    * [Define Settings](#define-settings)
* [Examples](#examples)
    * [Resource Grouping by one resource](#resource-grouping-by-one-resource)
    * [Resource Grouping by multiple resources](#resource-grouping-by-multiple-resources)

## Basics

In the grouping rendering in both horizontal and vertical orientation, the view tables are rendered next to each other. 

Moving an appointment between the resource tables is allowed, and upon dropping, the appointment resource changes alongside the start date.

### Define Settings

To configure the group rendering, define the `SchedulerGroupSettings` tag inside the `SchedulerSettings` tag.

The settings tag will have the following Parameters:

* `Resources(List<string>)` - provides a list of one or more resource names, which will be used to group the scheduler by.
* `Orientation(SchedulerGroupOrientation)` - has two values: `Horizontal(default)` and `Vertical`. Determines the direction in which the resource tables are rendered.

For more information on grouping by resources in each view, refer to the following sections:

* [**Day** view grouping]({%slug scheduler-views-day%}#resource-grouping-in-the-day-view)
* [**MultiDay** view grouping]({%slug scheduler-views-multiday%}#resource-grouping-in-the-multiday-view)
* [**Week** view grouping]({%slug scheduler-views-week%}#resource-grouping-in-the-week-view)
* [**Month** view grouping]({%slug scheduler-views-month%}#resource-grouping-in-the-month-view)

## Examples
The examples below showcase [resource grouping by one resource](#resource-grouping-by-one-resource) and [resource grouping by multiple resources](#resource-grouping-by-multiple-resources) respectively.

### Resource Grouping by one resource

>caption The result from the code snippet below.

![](images/scheduler-resource-grouping.png)

@[template](/_contentTemplates/scheduler/views.md#resource-grouping-code-snippet-for-examples)

### Resource Grouping by multiple resources

>caption The result from the code snippet below.

![](images/scheduler-multiple-resource-grouping.png)

>caption Declare multiple resources.

````SchedulerResourceGrouping.razor
@* The example showcases Resource Grouping by two resources. *@

@using System.Collections.Generic

@inject AppointmentService appointmentService

@inject ResourceService resourceService

<div class="example-wrapper">
    <TelerikScheduler @bind-Date="@SelectedDate" Height="600px" Data="@Data"
                      OnCreate="@AddAppointment"
                      OnUpdate="@UpdateAppointment"
                      OnDelete="@DeleteAppointment"
                      AllowDelete="true"
                      AllowUpdate="true"
                      AllowCreate="true"
                      OnCancel="@(() => Console.WriteLine("CANCEL"))">
        <SchedulerSettings>
            <SchedulerGroupSettings Resources="@GroupingResources" Orientation="@SchedulerGroupOrientation.Horizontal"></SchedulerGroupSettings>
        </SchedulerSettings>
        <SchedulerViews>
            <SchedulerDayView></SchedulerDayView>
            <SchedulerWeekView></SchedulerWeekView>
            <SchedulerMultiDayView></SchedulerMultiDayView>
            <SchedulerMonthView></SchedulerMonthView>
        </SchedulerViews>
        <SchedulerResources>
            <SchedulerResource Field="Manager" Title="Manager" Data="@SchedulerManagers"></SchedulerResource>
            <SchedulerResource Field="Room" Title="Edit Room" Data="@SchedulerResources"></SchedulerResource>
        </SchedulerResources>
    </TelerikScheduler>
</div>

@code
{
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);
    List<Appointment> Data = new List<Appointment>();
    List<Resource> SchedulerResources = new List<Resource>();
    List<Resource> SchedulerManagers = new List<Resource>();
    List<Resource> SchedulerDirectors = new List<Resource>();

    List<string> GroupingResources = new List<string> { "Room", "Manager" };

    protected override async Task OnInitializedAsync()
    {
        SchedulerDirectors = await resourceService.GetDirectorsAsync();
        SchedulerResources = await resourceService.GetResourcesAsync();
        SchedulerManagers = await resourceService.GetManagersAsync();
        Data = await appointmentService.GetAppointmentsAsync();
    }

    void UpdateAppointment(SchedulerUpdateEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        var matchingItem = Data.FirstOrDefault(a => a.Id == item.Id);

        if (matchingItem != null)
        {
            matchingItem.Title = item.Title;
            matchingItem.Description = item.Description;
            matchingItem.Start = item.Start;
            matchingItem.End = item.End;
            matchingItem.IsAllDay = item.IsAllDay;
            matchingItem.Room = item.Room;
            matchingItem.Manager = item.Manager;
        }
    }

    void AddAppointment(SchedulerCreateEventArgs args)
    {
        Appointment item = args.Item as Appointment;

        Data.Add(item);
    }

    void DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        Data.Remove(item);
    }
}
````
````AppointmentService.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class AppointmentService
{
    public async Task<List<Appointment>> GetAppointmentsAsync()
    {
        await Task.Delay(0);

        return GetAppointments();
    }

    public List<Appointment> GetAppointments()
    {
        List<Appointment> data = new List<Appointment>();
        DateTime baselineTime = GetStartTime();

        data.Add(new Appointment
        {
            Title = "Vet visit",
            Description = "The cat needs vaccinations and her teeth checked.",
            Start = baselineTime.AddHours(2),
            End = baselineTime.AddHours(2).AddMinutes(30)
        });
        data.Add(new Appointment
        {
            Title = "Trip to Hawaii",
            Description = "An unforgettable holiday!",
            IsAllDay = true,
            Start = baselineTime.AddDays(-10),
            End = baselineTime.AddDays(-2)
        });
        data.Add(new Appointment
        {
            Title = "Jane's birthday party",
            Description = "Make sure to get her fresh flowers in addition to the gift.",
            Start = baselineTime.AddDays(5).AddHours(10),
            End = baselineTime.AddDays(5).AddHours(18),
        });
        data.Add(new Appointment
        {
            Title = "One-on-one with the manager",
            Start = baselineTime.AddDays(2).AddHours(3).AddMinutes(30),
            End = baselineTime.AddDays(2).AddHours(3).AddMinutes(45),
        });
        data.Add(new Appointment
        {
            Title = "Brunch with HR",
            Description = "Performance evaluation of the new recruit.",
            Start = baselineTime.AddDays(3).AddHours(3),
            End = baselineTime.AddDays(3).AddHours(3).AddMinutes(45)
        });
        data.Add(new Appointment
        {
            Title = "Interview with new recruit",
            Description = "See if John will be a suitable match for our team.",
            Start = baselineTime.AddDays(3).AddHours(1).AddMinutes(30),
            End = baselineTime.AddDays(3).AddHours(2).AddMinutes(30)
        });
        data.Add(new Appointment
        {
            Title = "Conference",
            Description = "The big important work conference. Don't forget to practice your presentation.",
            Start = baselineTime.AddDays(6),
            End = baselineTime.AddDays(11),
            IsAllDay = true
        });
        data.Add(new Appointment
        {
            Title = "New Project Kickoff",
            Description = "Everyone assemble! We will also have clients on the call from a later time zone.",
            Start = baselineTime.AddDays(3).AddHours(8).AddMinutes(30),
            End = baselineTime.AddDays(3).AddHours(11).AddMinutes(30)
        });
        data.Add(new Appointment
        {
            Title = "Get photos",
            Description = "Get the printed photos from last week's holiday. It's on the way from the vet to work.",
            Start = baselineTime.AddHours(2).AddMinutes(15),
            End = baselineTime.AddHours(2).AddMinutes(30)
        });

        var rng = new Random();
        var startDate = new DateTime(2019, 11, 10);

        data.Add(new Appointment()
        {
            Title = "AllDay 1.0-1.0",
            Start = startDate.AddDays(5),
            End = startDate.AddDays(5),
            IsAllDay = true
        });
        data.Add(new Appointment()
        {
            Title = "AllDay 1.2-1.2",
            Start = startDate.AddDays(5).AddHours(2),
            End = startDate.AddDays(5).AddHours(2),
            IsAllDay = true
        });
        data.Add(new Appointment()
        {
            Title = "AllDay 1.0-2.0",
            Start = startDate.AddDays(5),
            End = startDate.AddDays(6),
            IsAllDay = true
        });
        data.Add(new Appointment()
        {
            Title = "S AllDay",
            Start = startDate,
            End = startDate.AddDays(1)
        });
        data.Add(new Appointment()
        {
            Title = "S AllDay 2",
            Start = startDate,
            End = startDate.AddDays(1)
        });
        data.Add(new Appointment()
        {
            Title = "S AllDay 3",
            Start = startDate.AddDays(-1),
            End = startDate.AddDays(1)
        });
        data.Add(new Appointment()
        {
            Title = "S AllDay 4",
            Start = startDate.AddDays(1),
            End = startDate.AddDays(2)
        });
        data.Add(new Appointment()
        {
            Title = "S AllDay span 3",
            Start = startDate.AddDays(1),
            End = startDate.AddDays(4)
        });
        data.Add(new Appointment()
        {
            Title = "At Start",
            Start = startDate,
            End = startDate.AddHours(1)
        });
        data.Add(new Appointment()
        {
            Title = "Middle",
            Start = startDate.AddHours(9),
            End = startDate.AddHours(10)
        });
        data.Add(new Appointment()
        {
            Title = "Before Start",
            Start = startDate.AddDays(1).AddHours(5),
            End = startDate.AddDays(1).AddHours(10)
        });
        data.Add(new Appointment()
        {
            Title = "After End",
            Start = startDate.AddHours(16),
            End = startDate.AddHours(19)
        });
        data.Add(new Appointment()
        {
            Title = "Two Day",
            Start = startDate.AddDays(1).AddHours(22),
            End = startDate.AddDays(2).AddHours(3)
        });
        data.Add(new Appointment()
        {
            Title = "Three Day",
            Start = startDate.AddDays(2).AddHours(4),
            End = startDate.AddDays(5).AddHours(23)
        });
        data.Add(new Appointment()
        {
            Title = "Not exact",
            Start = startDate.AddDays(5).AddHours(8).AddMinutes(11),
            End = startDate.AddDays(5).AddHours(9).AddMinutes(11)
        });
        data.Add(new Appointment()
        {
            Title = "Not exact end",
            Start = startDate.AddDays(5).AddHours(10),
            End = startDate.AddDays(5).AddHours(10).AddMinutes(11)
        });
        data.Add(new Appointment()
        {
            Title = "Not exact start",
            Start = startDate.AddDays(5).AddHours(12).AddMinutes(11),
            End = startDate.AddDays(5).AddHours(13)
        });
        data.Add(new Appointment()
        {
            Title = "At End",
            Start = startDate.AddDays(6).AddHours(23),
            End = startDate.AddDays(6).AddHours(24)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 1",
            Start = startDate.AddDays(2).AddHours(9),
            End = startDate.AddDays(2).AddHours(12)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 2",
            Start = startDate.AddDays(2).AddHours(10),
            End = startDate.AddDays(2).AddHours(11)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 2",
            Start = startDate.AddDays(2).AddHours(11),
            End = startDate.AddDays(2).AddHours(12)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 2",
            Start = startDate.AddDays(2).AddHours(11),
            End = startDate.AddDays(2).AddHours(12)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 11",
            Start = startDate.AddDays(3).AddHours(9),
            End = startDate.AddDays(3).AddHours(12)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 12",
            Start = startDate.AddDays(3).AddHours(9),
            End = startDate.AddDays(3).AddHours(10)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 13",
            Start = startDate.AddDays(3).AddHours(9),
            End = startDate.AddDays(3).AddHours(11)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 14",
            Start = startDate.AddDays(3).AddHours(11).AddMinutes(30),
            End = startDate.AddDays(3).AddHours(13)
        });
        data.Add(new Appointment()
        {
            Title = "Same Slot 15",
            Start = startDate.AddDays(3).AddHours(11),
            End = startDate.AddDays(3).AddHours(12)
        });


        return data;
    }

    public DateTime GetStartTime()
    {
        DateTime dt = new DateTime(2019, 12, 11);
        int daysSinceMonday = dt.DayOfWeek - DayOfWeek.Monday;

        return new DateTime(dt.Year, dt.Month, dt.Day - daysSinceMonday, 8, 0, 0);
    }
}
````
````ResourceService.cs
using System.Collections.Generic;
using System.Threading.Tasks;

public class ResourceService
{
    public async Task<List<Resource>> GetResourcesAsync()
    {
        await Task.Delay(0);

        return GetResources();
    }

    public List<Resource> GetResources()
    {
        List<Resource> result = new List<Resource>();

        result.Add(new Resource()
        {
            Text = "None",
            Value = "",
            Color = ""
        });
        result.Add(new Resource()
        {
            Text = "Small meeting room",
            Value = "1",
            Color = "#66ccff"
        });
        result.Add(new Resource()
        {
            Text = "Big meeting room",
            Value = "2",
            Color = "#0066ff"
        });

        return result;
    }

    public async Task<List<Resource>> GetManagersAsync()
    {
        await Task.Delay(0);

        return GetManagers();
    }

    public List<Resource> GetManagers()
    {
        List<Resource> result = new List<Resource>();

        result.Add(new Resource()
        {
            Text = "Alex",
            Value = "1",
            Color = "#99ffcc"
        });
        result.Add(new Resource()
        {
            Text = "Bob",
            Value = "2",
            Color = "#47d147"
        });
        result.Add(new Resource()
        {
            Text = "Charlie",
            Value = "3",
            Color = "#336600"
        });

        return result;
    }

    public async Task<List<Resource>> GetDirectorsAsync()
    {
        await Task.Delay(0);

        return GetDirectors();
    }

    public List<Resource> GetDirectors()
    {
        List<Resource> result = new List<Resource>();

        result.Add(new Resource()
        {
            Text = "Mr. Director",
            Value = "1",
            Color = ""
        });
        result.Add(new Resource()
        {
            Text = "Mrs. Director",
            Value = "2",
            Color = ""
        });

        return result;
    }
}
````
````Resource.cs
public class Resource
{
    public string Text { get; set; }

    public string Value { get; set; }

    public string Color { get; set; }
}
````
````Appointment.cs
using System;

public class Appointment
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public DateTime Start { get; set; }

    public DateTime End { get; set; }

    public bool IsAllDay { get; set; }

    public string Description { get; set; }

    public string Room { get; set; }

    public string Manager { get; set; }

    public Appointment()
    {
        var rand = new Random();
        Id = Guid.NewGuid();
        Room = rand.Next(1, 3).ToString();
        Manager = rand.Next(1, 4).ToString();
    }
}
````

## See Also

* [Live Demo: Scheduler Grouping](https://demos.telerik.com/blazor-ui/scheduler/resource-grouping)
* [Scheduler Overview]({%slug scheduler-overview%})
