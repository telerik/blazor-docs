#day-views-common-properties
## View Parameters

Generally, the views are designed around the timeframe that they show and the day-based views share some common properties that you will likely have to set to provide a good user experience for the user:

* `StartTime` - this is the first hour that is shown in the view. Defaults to midnight, so if you do not set it to a value close to the start of the working day, the user is likely to see only blank spaces before they scroll down.

* `WorkDayStart` - this is when the working day starts. The work hours have a different background than non-working hours so the user can distinguish them easily. This parameter also influences the "Show Business Hours" toggle.

* `EndTime` - the counterpart to `StartTime` - defines when the full day ends. Defaults to midnight. If you have the day end earlier you can reduce the amount of elements that render, but the user may not see some late appointments.

* `WorkDayEnd` - the counterpart to `WorkDayStart` - defines when the working day ends.

* `SlotDuration` - the time span of each major time slot in minutes.

* `SlotDivisions` - the number of partitions in each major time slot.
#end

#visible-times-tip
If there are appointments outside of the defined visible time the user will not be able to see them. For most cases where the working day is subject to scheduling this may not be a problem, but if your users need to manage night shifts or irregular work hours, you may want to have a longer day rendered, or to bind the value to a time picker so the user can alter it themselves.
#end

#day-slots-explanation
### Slots

Views that show hours let you control their precision through the `SlotDuration` and `SlotDivisions` parameters:

1. `SlotDuration` - the time span of each major time slot in minutes.
1. `SlotDivisions` - the number of partitions in each major time slot.

>caption Figure: Slots explanation

![](images/slot-example.png)
#end

#resource-grouping-code-snippet-for-examples
````SchedulerResourceGrouping.razor
@* The example showcases Resource Grouping by one resource. *@

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

    List<string> GroupingResources = new List<string> { "Room" };

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
#end