---
title: Delete Confirmation Dialog
page_title: Scheduler - Delete Confirmation Dialog
description: Delete Confirmation Dialog in the Scheduler for Blazor.
slug: scheduler-delete-confirmation-dialog
tags: telerik,blazor,scheduler,appointment,appointments,edit,editing,delete,confirmation,dialog
published: True
position: 5
---

# Delete Confirmation Dialog

This article provides information on how to enable the built-in delete confirmation dialog and how you can create a custom dialog:
* [Basics](#basics)
* [Custom Delete Confirmation Dialog](#custom-delete-confirmation-dialog)

## Basics

The built-in delete confirmation dialog triggers before event deletion. You can enable it by setting the `ConfirmDelete` parameter of the Scheduler to `true`. The default texts of the dialog are exposed in the [localization](slug://globalization-localization) messages of the component, and you can customize them.

>important This dialog displays only for **single** events, **not** for recurring. The built-in delete confirmation dialog for recurring events is **not** changed.

>caption Enabling of the Delete Confirmation Dialog

````RAZOR
@* Scheduler with enabled Delete Confirmation Dialog *@

<TelerikScheduler Data="@Appointments"
                  OnDelete="@DeleteAppointment" AllowDelete="true"
                  @bind-Date="@StartDate" Height="500px" @bind-View="@CurrView" ConfirmDelete="true">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);

    List<SchedulerAppointment> Appointments { get; set; }

    async Task DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        await MyService.Delete(item);

        await GetSchedulerData();
    }

    public class SchedulerAppointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public List<DateTime> RecurrenceExceptions { get; set; }
        public Guid? RecurrenceId { get; set; }

        public SchedulerAppointment()
        {
            Id = Guid.NewGuid();
        }
    }

    async Task GetSchedulerData()
    {
        Appointments = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetSchedulerData();
    }

    public static class MyService
    {
        private static List<SchedulerAppointment> _data { get; set; } = new List<SchedulerAppointment>()
        {
            new SchedulerAppointment
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                Start = new DateTime(2019, 12, 5, 10, 00, 0),
                End = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 12, 2, 11, 30, 0),
                End = new DateTime(2019, 12, 2, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 12, 6, 9, 30, 0),
                End = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 05)
            },

            new SchedulerAppointment
            {
                Title = "Morning run",
                Description = "Some time to clear the head and exercise.",
                Start = new DateTime(2019, 11, 27, 9, 0, 0),
                End = new DateTime(2019, 11, 27, 9, 30, 0),
                RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
            }
        };

        public static async Task<List<SchedulerAppointment>> Read()
        {
            return await Task.FromResult(_data);
        }

        public static async Task Delete(SchedulerAppointment itemToDelete)
        {
            if (itemToDelete.RecurrenceId != null)
            {
                // a recurrence exception was deleted, you may want to update
                // the rest of the data source - find an item where theItem.Id == itemToDelete.RecurrenceId
                // and remove the current exception date from the list of its RecurrenceExceptions
            }

            if (!string.IsNullOrEmpty(itemToDelete.RecurrenceRule) && itemToDelete.RecurrenceExceptions?.Count > 0)
            {
                // a recurring appointment was deleted that had exceptions, you may want to
                // delete or update any exceptions from the data source - look for
                // items where theItem.RecurrenceId == itemToDelete.Id
            }

            _data.Remove(itemToDelete);
        }
    }
}
````

## Custom Delete Confirmation Dialog

@[template](/_contentTemplates/grid/built-in-dialogs.md#delete-confirmation)


## See Also

  * [Data Binding](slug://scheduler-appointments-databinding)
  * [Live Demo: Appointment Editing](https://demos.telerik.com/blazor-ui/scheduler/appointment-editing)
  * [Custom Edit Form](https://github.com/telerik/blazor-ui/tree/master/scheduler/custom-edit-form)
  * [Customize the Delete Confirmation Dialog](slug://grid-kb-customize-delete-confirmation-dialog)

