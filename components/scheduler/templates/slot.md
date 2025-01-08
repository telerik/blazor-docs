---
title: Slot
page_title: Scheduler - Slot Templates
description: Use custom rendering for the slots in the Scheduler for Blazor.
slug: scheduler-templates-slot
tags: telerik,blazor,scheduler,templates,slot,alldayslot,dateheader
published: True
position: 15
---

# Slot Templates

You can use the `SlotTemplate` and the `AllDaySlotTemplate` to customize the rendering of the slots in the Scheduler.

* [AllDaySlotTemplate](#alldayslottemplate)
* [SlotTemplate](#slottemplate)

## AllDaySlotTemplate

Use the `AllDaySlotTemplate` to provide a custom rendering for the cells in the Telerik Scheduler for Blazor that span across a full day. This template can be defined for the [Day, Multiday, and Week Scheduler views](slug://scheduler-views-overview). 

The `context` of the template is a `SchedulerAllDaySlotTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Start` | `DateTime` | The slot's start time. |
| `End` | `DateTime` | The slot's end time.|
| `Resources` | `List<KeyValuePair<string, object>` | A collection of resources for which the slot is defined. The collection is populated when the [Resources](slug://scheduler-resources) and [Resource Grouping](slug://scheduler-resource-grouping) features are used. |

## SlotTemplate

Use the `SlotTemplate` to provide a custom rendering for the cells in the Telerik Scheduler for Blazor. This template can be defined for the [Day, Multiday, Month, Timeline, and Week Scheduler views](slug://scheduler-views-overview). 

The `context` of the template is a `SchedulerSlotTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Start` | `DateTime` | The slot's start time. |
| `End` | `DateTime` | The slot's end time.|
| `Resources` | `List<KeyValuePair<string, object>` | A collection of resources for which the slot is defined. The collection is populated when the [Resources](slug://scheduler-resources) and [Resource Grouping](slug://scheduler-resource-grouping) features are used. |

>note When you use the SlotTemplate in the Timeline Scheduler view, and the content of the template is not a plain string, you must add the `!k-pos-absolute` built-in class to the custom element.

## Example

````RAZOR
@* Use the AllDaySlotTemplate and SlotTemplate *@

<TelerikScheduler @bind-Date="@SelectedDate" Height="600px" Data="@Data"
                  @bind-View="@CurrView"
                  OnCreate="@AddAppointment"
                  OnUpdate="@UpdateAppointment"
                  OnDelete="@DeleteAppointment"
                  AllowDelete="true"
                  AllowUpdate="true"
                  AllowCreate="true">
    <ItemTemplate>
        <div class="scheduler-set-item-template">S.Item: @(((Appointment)context).Title)</div>
    </ItemTemplate>
    <AllDayItemTemplate>
        <div class="scheduler-set-all-day-item-template">S.AllDayItem: @(((Appointment)context).Title)</div>
    </AllDayItemTemplate>
    <SchedulerViews>
        <SchedulerDayView>
            <SlotTemplate>
                @if (context.Start.TimeOfDay >= ControlDate.TimeOfDay
                && context.End.AddSeconds(-1).TimeOfDay <= ControlDate.AddHours(1).TimeOfDay)
                {
                    <div style="color: green;"><TelerikSvgIcon Icon="@SvgIcon.Pause"></TelerikSvgIcon>Lunch Break</div>
                }
            </SlotTemplate>
            <AllDaySlotTemplate>
                <div style="color: blue;">AllDay SlotTemplate</div>
            </AllDaySlotTemplate>
            <ItemTemplate>
                <div class="view-set-item-template">V.Item: @(((Appointment)context).Title)</div>
            </ItemTemplate>
        </SchedulerDayView>
        <SchedulerWeekView>
            <SlotTemplate>
                @if (context.Start.TimeOfDay >= ControlDate.TimeOfDay
                && context.End.AddSeconds(-1).TimeOfDay <= ControlDate.AddHours(1).TimeOfDay)
                {
                    <div style="color: green;"><TelerikSvgIcon Icon="@SvgIcon.Pause"></TelerikSvgIcon>Lunch Break</div>
                }
            </SlotTemplate>
            <AllDaySlotTemplate>
                <div style="color: blue;">AllDay week SlotTemplate</div>
            </AllDaySlotTemplate>
        </SchedulerWeekView>
        <SchedulerMonthView>
            <SlotTemplate>
                @{
                    var dayNumber = context.Start.Day;
                    <span class="k-link" @onclick="() => OnDateClick(dayNumber)">
                        @context.Start.Day
                    </span>

                    if (context.Start.DayOfWeek == DayOfWeek.Saturday
                    || context.Start.DayOfWeek == DayOfWeek.Sunday)
                    {
                        <div style="color: green;"><span>Free Weekend</span></div>
                    }
                }
            </SlotTemplate>
            <ItemTemplate>
                <div class="view-set-item-template">V.Item: @(((Appointment)context).Title)</div>
            </ItemTemplate>
        </SchedulerMonthView>
        <SchedulerTimelineView>
            <SlotTemplate>
                @if (context.Start.Day % 2 == 0)
                {
                    <div style="color: green;">Workout Day</div>
                }
                else
                {
                    <div>Rest Day</div>
                }
            </SlotTemplate>
            <ItemTemplate>
                <div class="view-set-item-template">V.Item: @(((Appointment)context).Title)</div>
            </ItemTemplate>
        </SchedulerTimelineView>
    </SchedulerViews>
</TelerikScheduler>
@code
{
    private DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);
    private DateTime ControlDate { get; set; } = new DateTime(2000, 1, 1, 12, 0, 0);
    private SchedulerView CurrView { get; set; }
    List<Appointment> Data = new List<Appointment>();

    protected override void OnInitialized()
    {
        Data = AppointmentService.GetAppointments();

        base.OnInitialized();
    }

    private void UpdateAppointment(SchedulerUpdateEventArgs args)
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
        }
    }

    private void OnDateClick(int day)
    {
        var currentDate = DateTime.Now;
        var navigateDate = new DateTime(currentDate.Year, currentDate.Month, day);

        CurrView = SchedulerView.Day;
        SelectedDate = navigateDate;
    }

    private void AddAppointment(SchedulerCreateEventArgs args)
    {
        Appointment item = args.Item as Appointment;

        Data.Add(item);
    }

    private void DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        Appointment item = (Appointment)args.Item;

        Data.Remove(item);
    }

    private class AppointmentService
    {
        public static async Task<List<Appointment>> GetAppointmentsAsync()
        {
            await Task.Delay(100);

            return GetAppointments();
        }

        public static List<Appointment> GetAppointments()
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


            return data;
        }

        public static DateTime GetStartTime()
        {
            DateTime dt = new DateTime(2019, 12, 11);
            int daysSinceMonday = dt.DayOfWeek - DayOfWeek.Monday;
            return new DateTime(dt.Year, dt.Month, dt.Day - daysSinceMonday, 8, 0, 0);
        }
    }

    private class Appointment
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
}
````

## See Also

 * [Live Demo: Scheduler Templates](https://demos.telerik.com/blazor-ui/scheduler/templates)

