---
title: Editing
page_title: Scheduler for Blazor | Edit Appointments
description: Edit Appointments in the Scheduler for Blazor
slug: scheduler-appointments-edit
tags: telerik,blazor,scheduler,appointment,appointments,edit,editing
published: True
position: 1
---

# Edit Appointments

The Scheduler component lets you edit appointments. This article will explain how to enable and use it.

This article contains the following sections:

* [Basics](#basics)
* [User Experience](#user-experience)
* [Example](#example)


## Basics

By default, the user can only view the appointments, because creating, updating and deleting them requires that you, the developer, implement the actual data storage. The following parameters control the editing behavior:

* `AllowCreate` - enables the user to insert new appointments. Requires that you implement a handler for the `OnCreate` event where you must update the current `Data` and your actual data source.
* `AllowDelete` - enables the user to delete existing appointments. Requires that you implement a handler for the `OnDelete` event where you must update the current `Data` and your actual data source.
* `AllowUpdate` - enables the user to modify existing appointments. Requires that you implement a handler for the `OnUpdate` event where you must update the current `Data` and your actual data source.

>tip You can enable only certain editing features (for example, editing appointments) by enabling only their parameter. It is not required to enable all features.

There are two other events that you are not required to handle - you can use them to implement application logic:

* `OnEdit` - fires when the user is about to edit or create an appointment. If the user is creating a new appointment the event handler does not receive an item. You can cancel it to effectively make some appointments read-only. You can also use it to implement a custom edit/insert form to, for example, have more fields than the built-in ones.
* `OnCancel` - fires when the user clicks the `Cancel` button in the edit form to discard the changes they just made to an appointment.


## User Experience

The UI for the scheduler provides the following options for interacting with the appointments collection:

* Double click (or double tap) on an empty slot starts the process of inserting a new appointment. The user can cancel it without committing the data.
* Double click (or double tap) on an appointment opens it for editing. The user can cancel the changes through the Cancel button or the [x] close button on the window.
* Clicking (or tapping) the [x] button on the appointment itself deletes it.

>tip The built-in popup edit form supports validation because it contains an `EditForm`. This means you can use data annotations on your appointment class to ensure that the user enters, for example, both a title and description.

## Example

The example below shows the signature of the event handlers so you can copy the proper arguments and start implementing your business logic and data storage operations. The example only updates the local collection of appointments used in the UI.

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>note It is up to the data access logic to save the data once it is changed in the data collection. The example below showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

>caption Example of handling the CUD events in a Scheduler.

````CSHTML
@using System.ComponentModel.DataAnnotations @* only for the Required validation in the model *@

<TelerikScheduler Data="@Appointments"
                  OnUpdate="@UpdateAppointment"
                  OnCreate="@AddAppointment"
                  OnDelete="@DeleteAppointment"
                  OnEdit="@EditHandler" OnCancel="@CancelHandler"
                  AllowCreate="true" AllowDelete="true" AllowUpdate="true"
                  @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView"
                  StartField="@(nameof(SchedulerAppointment.StartTime))"
                  EndField="@(nameof(SchedulerAppointment.EndTime))"
                  TitleField="@(nameof(SchedulerAppointment.Title))"
                  DescriptionField="@(nameof(SchedulerAppointment.Description))"
                  IsAllDayField="@(nameof(SchedulerAppointment.IsAllDay))">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" />
        <SchedulerMultiDayView StartTime="@DayStart" EndTime="@DayEnd" WorkDayStart="@WorkDayStart" WorkDayEnd="@WorkDayEnd" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
        // Sample CUD operations over the local data
        // In a real case, carry the information over to the actual data source
        void UpdateAppointment(SchedulerUpdateEventArgs args)
        {
            SchedulerAppointment item = (SchedulerAppointment)args.Item;
            var matchingItem = Appointments.FirstOrDefault(a => a.Id == item.Id);
            if (matchingItem != null)
            {
                matchingItem.Title = item.Title;
                matchingItem.Description = item.Description;
                matchingItem.StartTime = item.StartTime;
                matchingItem.EndTime = item.EndTime;
                matchingItem.IsAllDay = item.IsAllDay;
            }
        }

        void AddAppointment(SchedulerCreateEventArgs args)
        {
            SchedulerAppointment item = args.Item as SchedulerAppointment;
            Appointments.Add(item);
        }

        void DeleteAppointment(SchedulerDeleteEventArgs args)
        {
            SchedulerAppointment item = (SchedulerAppointment)args.Item;
            Appointments.Remove(item);
        }

        //Handlers for application logic flexibility
        void EditHandler(SchedulerEditEventArgs args)
        {
            SchedulerAppointment item = args.Item as SchedulerAppointment;
            if (item != null) // an edit operation, otherwise - an insert operation
            {
                // you can prevent opening an item for editing based on a condition
                if (item.Title.Contains("vet", StringComparison.InvariantCultureIgnoreCase))
                {
                    args.IsCancelled = true;
                }
            }
        }

        void CancelHandler(SchedulerCancelEventArgs args)
        {
            // you can know when a user wanted to modify an appointment but decided not to
            // the model you get contains the new data from the edit form so you can see what they did
            SchedulerAppointment item = args.Item as SchedulerAppointment;
        }

    // sample data and scheduler settings
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    //the time portions are important
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    public DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 20, 0, 0);
    public DateTime WorkDayStart { get; set; } = new DateTime(2000, 1, 1, 9, 0, 0);
    public DateTime WorkDayEnd { get; set; } = new DateTime(2000, 1, 1, 17, 0, 0);
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 26, 11, 30, 0),
                EndTime = new DateTime(2019, 11, 26, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "The cat needs vaccinations and her teeth checked.",
                StartTime = new DateTime(2019, 11, 25, 9, 30, 0),
                EndTime = new DateTime(2019, 11, 25, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                StartTime = new DateTime(2019, 11, 27),
                EndTime = new DateTime(2019, 12, 07)
            }
    };

    public class SchedulerAppointment
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````


## See Also

  * [Appointments Overview]({%slug scheduler-appointments-overview%})
  
  
