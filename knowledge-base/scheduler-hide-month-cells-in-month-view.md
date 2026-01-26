---
title: How to Hide Other Month Cells in Month View
description: Learn how to hide dates from other months in the Scheduler component's current month view.
type: how-to
page_title: How to Hide Dates from Other Months in the Current Month View
slug: scheduler-kb-hide-month-cells-in-month-view
tags: hiding, other month cells, month view, scheduler
ticketid: 1637063
res_type: kb
components: ["scheduler"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Scheduler for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I need to hide the dates from other months in the Scheduler component's current month view because it may confuse the users.

## Solution

To hide the dates from other months in the month view of the Scheduler component:

1. Define `SlotTemplate`.
2. Use an `if` block to render conditionally the dates based on the selected month. 

>caption Scheduler with hidden dates in the current month view

````RAZOR
@using Telerik.SvgIcons

<TelerikScheduler Data="@Data"
                  @bind-Date="@SelectedDate"
                  @bind-View="@CurrView"
                  OnCreate="@AddAppointment"
                  OnUpdate="@UpdateAppointment"
                  OnDelete="@DeleteAppointment"
                  Height="600px"
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
        <SchedulerMonthView>
            <SlotTemplate>
                @{
                    if (context.Start.Month == SelectedDate.Month)
                    {
                        var dayNumber = context.Start.Day;
                        <span class="k-link" @onclick="() => OnDateClick(dayNumber)">
                            @context.Start.Day
                        </span>

                        if (context.Start.DayOfWeek == DayOfWeek.Saturday
                        || context.Start.DayOfWeek == DayOfWeek.Sunday)
                        {
                            <div style="color: green;"><span>Weekend</span></div>
                        }
                    }
                }
            </SlotTemplate>
            <ItemTemplate>
                <div class="view-set-item-template">V.Item: @(((Appointment)context).Title)</div>
            </ItemTemplate>
        </SchedulerMonthView>
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);
    private DateTime ControlDate { get; set; } = new DateTime(2000, 1, 1, 12, 0, 0);
    private SchedulerView CurrView { get; set; }
    private List<Appointment> Data = new List<Appointment>();

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
* [Scheduler Slot Templates](slug:scheduler-templates-slot)

