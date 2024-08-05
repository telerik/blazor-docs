---
title: Conditionally Disable Dragging for Specific Scheduler Appointments
description: Learn how to disable the drag functionality for certain appointments in the Scheduler component based on a condition.
type: how-to
page_title: How to Conditionally Disable Drag for Certain Appointments in Blazor Scheduler
slug: scheduler-kb-conditionally-disable-drag-for-some-appointments
tags: scheduler, blazor, drag, disable, appointment
res_type: kb
ticketid: 1660283
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

I want to disable the dragging of some appointments based on a condition, such as the status of the appointment. 

This KB article also answers the following questions:
- How can I prevent specific appointments from being dragged in the Scheduler?
- Is it possible to conditionally disable the drag functionality for appointments in the Scheduler?
- How to use CSS and event handling to disable dragging for certain appointments?

## Solution

To conditionally disable dragging an appointment based on your desired condition, follow these steps:

1. Handle the [OnItemRender event]({%slug scheduler-events%}#itemrender) to add a custom CSS class to the appointments that you want to disable the dragging for.
2. Use this custom CSS class as a selector to stop the [pointer-events](https://www.w3schools.com/cssref/css3_pr_pointer-events.php) of the targeted appointments.
3. Extend the [OnUpdate handler]({%slug scheduler-appointments-edit%}#basics) logic to ensure the appointment will not be dropped to another slot. Steps 1 and 2 will prevent the drag, but the user can enable the pointer-events from the DOM inspector. Add a check in your OnUpdate handler to ensure that if the user drags the appointment, it will not be updated and dropped to a different slot.

Below is a basic sample demonstrating the suggested approach:
````CSHTML
<TelerikScheduler Data="@Appointments"
                  @bind-Date="@StartDate"
                  @bind-View="@CurrView"
                  AllowUpdate="true"
                  OnItemRender="@OnItemRenderHandler"
                  OnUpdate="@OnUpdate"
                  Height="600px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);

    private SchedulerView CurrView { get; set; } = SchedulerView.Week;

    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);

    private void OnItemRenderHandler(SchedulerItemRenderEventArgs e)
    {
        SchedulerAppointment appt = e.Item as SchedulerAppointment;
        
        //add custom class to stop the pointer events of the appointment
        if (appt.NonDraggable)
        {
            e.Class = "non-draggable-appointment";
        }
    }

    private void OnUpdate(SchedulerUpdateEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        if (item.NonDraggable)
        {
            //Do not execute code for updating the appointment.
        }
        else
        {
            //Execute appointment update.
            //The actual update is not handled here for brevity.
        }
    }

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 11, 26, 11, 30, 0),
                End = new DateTime(2019, 11, 26, 12, 0, 0),
                NonDraggable = true
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
                Start = new DateTime(2019, 11, 29),
                End = new DateTime(2019, 12, 07),
                NonDraggable = true
            },

            new SchedulerAppointment
            {
                Title = "Online conference",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 25),
                End = new DateTime(2019, 11, 26)
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }

        public bool NonDraggable { get; set; }
    }
}

<style>
    .non-draggable-appointment {
        background-color: grey;
        font-weight: 900;
        pointer-events: none !important;
    }
</style>
````

## Notes

- The custom CSS class used to disable dragging should be defined in your application's stylesheets.
- Ensure the condition for disabling drag is consistent across both the `OnItemRender` event and the `OnUpdate` event handler.
