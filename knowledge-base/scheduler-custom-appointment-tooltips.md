---
title: Custom Scheduler Appointment Tooltips
description: Learn how to customize the appointment tooltips in the Telerik Scheduler for Blazor.
type: how-to
page_title: How to Display Custom Scheduler Appointment Tooltips
slug: scheduler-kb-custom-appointment-tooltips
position: 
tags: 
res_type: kb
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

How to customize the Scheduler appointment tooltips? How to show more content in the appointment tooltips?

## Solution

1. Define a [Scheduler `ItemTemplate`](slug:scheduler-templates-appointment) with a `title` HTML attribute or one or more `data` attributes. 
1. Define a [Telerik Tooltip component for Blazor](slug:tooltip-overview) that targets all appointments by a `class` or some other selector.
1. (optional) Define a [Tooltip `Template`](slug:tooltip-template) that consumes the `data` attributes from the Scheduler item template.

>caption Display Telerik Tooltips over Scheduler appointments

````RAZOR
<TelerikScheduler Data="@SchedulerData"
                  @bind-Date="@SchedulerDate"
                  Height="60vh"
                  @bind-View="@SchedulerView">
    <SchedulerViews>
        <SchedulerDayView />
        <SchedulerWeekView StartTime="@SchedulerViewStartTime" />
        <SchedulerMonthView />
    </SchedulerViews>
    <ItemTemplate>
        @{ var dataItem = (Appointment)context; }
        <div class="k-event-template scheduler-tooltip-target"
             data-id="guid-@dataItem.Id"
             style="height:100%">
            @dataItem.Title
        </div>
    </ItemTemplate>
</TelerikScheduler>

<TelerikTooltip TargetSelector=".scheduler-tooltip-target">
    <Template>
        @{ var appointment = GetAppointmentById(context.DataAttributes["id"]); }
        <div>@appointment.Title</div>
        <div>@appointment.Start.ToString("g") - @appointment.End.ToString("g")</div>
    </Template>
</TelerikTooltip>

@code {
    private List<Appointment> SchedulerData { get; set; } = new();
    private DateTime SchedulerDate { get; set; } = DateTime.Today;
    private SchedulerView SchedulerView { get; set; } = SchedulerView.Week;
    private DateTime SchedulerViewStartTime { get; set; } = DateTime.Today.AddHours(8);

    private Appointment GetAppointmentById(string id)
    {
        return SchedulerData.First(x => string.Concat("guid-", x.Id) == id);
    }

    private DateTime GetStartTime()
    {
        DateTime dt = DateTime.Now;
        int daysSinceMonday = dt.DayOfWeek - DayOfWeek.Monday;

        return new DateTime(dt.Year, dt.Month, dt.Day - daysSinceMonday, 8, 0, 0);
    }

    protected override async Task OnInitializedAsync()
    {
        List<Appointment> data = new();
        DateTime baselineTime = GetStartTime();

        data.Add(new Appointment
        {
            Title = "Vet visit",
            Description = "The cat needs vaccinations and her teeth checked.",
            Start = baselineTime.AddHours(3),
            End = baselineTime.AddHours(3).AddMinutes(30)
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

        SchedulerData = data;

        await base.OnInitializedAsync();
    }

    public class Appointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public string Description { get; set; } = string.Empty;

        public Appointment()
        {
            var rand = new Random();
            Id = Guid.NewGuid();
        }
    }
}
````
