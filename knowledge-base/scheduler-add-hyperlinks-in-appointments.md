---
title: How to Add Hyperlinks in Scheduler Appointments
description: Learn how to add clickable hyperlinks in Scheduler appointments in UI for Blazor.
type: how-to
page_title: Making Links Clickable in Scheduler Appointment Descriptions
meta_title: Make Links Clickable in Scheduler Appointment Descriptions
slug: scheduler-kb-add-hyperlinks-in-appointments
tags: scheduler, templates, appointments, hyperlinks
res_type: kb
ticketid: 1697204
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

I want to add clickable hyperlinks in Scheduler appointments. Including plain URLs in the Description field without having to write full `<a>` tags would be good.

## Solution

To achieve clickable hyperlinks in Scheduler appointments, implement a method to automatically detect and convert plain URLs in the Description field into clickable links.

1. Use the [`ItemTemplate`](slug:scheduler-templates-appointment) of the Scheduler to customize appointment rendering.
2. Apply a helper method to parse the Description field and convert plain URLs to clickable links.

Here’s an example:

````Razor
<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px" Width="800px">
    <ItemTemplate>
        @{
            var appointment = context as SchedulerAppointment;
            var formattedDescription = ConvertUrlsToLinks(appointment.Description);
        }
        <div style="padding: 10px;" @onclick:stopPropagation>
            @((MarkupString)formattedDescription)
        </div>
    </ItemTemplate>

    <AllDayItemTemplate>
        @{
            var appointment = context as SchedulerAppointment;
        }
        @appointment.Title
        <span>
            Starts on @appointment.Start.Date.ToShortDateString()
            ends on @appointment.End.Date.ToShortDateString()
        </span>
    </AllDayItemTemplate>

    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMonthView>
            <ItemTemplate>
                @{
                    var appointment = context as SchedulerAppointment;
                    if (appointment.IsAllDay)
                    {
                        <span>@appointment.Title</span>
                    }
                    else
                    {
                        <div title="@appointment.Title" style="font-size: small">
                            @appointment.Start.ToShortTimeString() to @appointment.End.ToShortTimeString()
                        </div>
                    }
                }
            </ItemTemplate>
        </SchedulerMonthView>
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    private SchedulerView CurrView { get; set; } = SchedulerView.Week;
    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); // the time portion is important

    private List<SchedulerAppointment> Appointments = new()
    {
        new SchedulerAppointment
        {
            Title = "Vet visit",
            Description = "Check this link: https://www.telerik.com/blazor-ui/documentation/components/scheduler/templates/appointment",
            Start = new DateTime(2019, 11, 26, 11, 30, 0),
            End = new DateTime(2019, 11, 26, 12, 30, 0)
        },
        new SchedulerAppointment
        {
            Title = "Planning meeting",
            Description = "Details here: http://example.com/meeting-notes",
            Start = new DateTime(2019, 11, 25, 9, 30, 0),
            End = new DateTime(2019, 11, 25, 12, 45, 0),
            Icon = SvgIcon.ExclamationCircle
        },
        new SchedulerAppointment
        {
            Title = "Trip to Hawaii",
            Description = "Info at www.travelagency.com/hawaii",
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
        public ISvgIcon Icon { get; set; }
    }

    private string ConvertUrlsToLinks(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return string.Empty;

        // Regex to match URLs like http://, https://, or www.
        var urlPattern = @"((http|https):\/\/[^\s]+|www\.[^\s]+)";
        return System.Text.RegularExpressions.Regex.Replace(input, urlPattern, match =>
        {
            var url = match.Value;
            var href = url.StartsWith("http", StringComparison.OrdinalIgnoreCase) ? url : "https://" + url;
            return $"<a href=\"{href}\" target=\"_blank\">{url}</a>";
        });
    }
}
````

## See Also
- [Scheduler Appointment Templates](scheduler-templates-appointment)
