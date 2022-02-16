---
title: Many different colors for the appointments
description: How to apply many different colors to the appointments
type: how-to
page_title: Many different colors for the appointments
slug: scheduler-kb-many-colors-for-appointments
position: 
tags: scheduler, many, colors, appointment
ticketid: 1553828
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

I want to set different background color to the appointments. I see that this can be achieved through the [OnItemRender]({%slug scheduler-events%}#itemrender) event by adding custom CSS class to the appointment. However, this isn't a practical use case for us, as we will be applying many different styles, which can change depending on who is using the application, so we don't want to have that many classes for each case. Is there any other way to achieve the desired result?

## Solution

You can add background-color and color properties to the appointment model which will be used to provide the desired background and font color for each appointment. Use [Appointment Templates]({%slug scheduler-templates-appointment%}), wrap the appointment content in a container and set some inline styles (background-color, color) based on the context. The example below demonstrates the suggested approach.

````CSHTML
<style>
/* remove the default padding, so the template container can be expanded to cover the whole appointment */
    .k-scheduler .k-event{
        padding:0px;
    } 
/* set some padding to the template containers, expand them and add any other desired customizations. 
Background and font color should be set inline in the templates, so we can get their values from the context 
based on the specific appointment*/
    .custom-appointment{    
        width:100%;
        height:100%;
        padding:5px;        
    }
</style>

<TelerikScheduler Data="@Appointments"
                  @bind-Date="@StartDate" 
                  @bind-View="@CurrView" 
                  Height="600px" 
                  Width="800px">
    <ItemTemplate>
        @{
            var appt = context as SchedulerAppointment;
            <div class="custom-appointment"
                 style="background-color:@appt.BackgroundColor; color:@appt.Color">
                @appt.Title
            </div>
        }
    </ItemTemplate>
    <AllDayItemTemplate>
        @{
            var appt = context as SchedulerAppointment;            
            <div class="custom-appointment"
                 style="background-color:@appt.BackgroundColor; color:@appt.Color">
                 @appt.Title                
            </div>
        }
    </AllDayItemTemplate>
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMonthView/>
    </SchedulerViews>
</TelerikScheduler>

@code {

    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 11, 26, 11, 30, 0),
                End = new DateTime(2019, 11, 26, 12, 0, 0),
                BackgroundColor = "#FFEFE2",
                Color = "#FDA150"
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 11, 25, 9, 30, 0),
                End = new DateTime(2019, 11, 25, 12, 45, 0),
                BackgroundColor = "#DBD5FD",
                Color = "#6E60B8"
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 07),
                BackgroundColor = "#D6F3FD",
                Color = "#269DC6"
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public string BackgroundColor { get; set; }
        public string Color { get; set; }
    }
}
````
