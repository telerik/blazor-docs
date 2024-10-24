---
title: Events
page_title: Scheduler - Events
description: Events in the Scheduler for Blazor.
slug: scheduler-events
tags: telerik,blazor,scheduler,events
published: true
position: 100
---

# Scheduler Events

This article explains the events available in the Telerik Scheduler for Blazor:

* [CUD Events](#cud-events)
* [OnModelInit](#onmodelinit)
* [OnItemClick](#onitemclick)
* [OnItemDoubleClick](#onitemdoubleclick)
* [OnItemContextMenu](#onitemcontextmenu)
* [ItemRender](#itemrender)
* [OnCellRender](#oncellrender)
* [DateChanged](#datechanged)
* [ViewChanged](#viewchanged)

## CUD Events

To implement appointment editing, the scheduler exposes the `OnCreate`, `OnDelete` and `OnUpdate` events. They let you propagate the changes the user makes in the UI to the view model and to the data storage. You can read mode in the [Appointment Editing]({%slug scheduler-appointments-edit%}) article.

## OnModelInit

@[template](/_contentTemplates/common/onmodelinit.md#onmodelinit-info)

>caption The different use-cases of the OnModelInit event

<div class="skip-repl"></div>
````NoParameterlessConstructor
@* Bind the Scheduler to a class without a parameterless constructor *@

<TelerikScheduler Data="@Appointments"
                  OnModelInit="@OnModelInitHandler"
                  OnUpdate="@UpdateAppointment"
                  OnCreate="@AddAppointment"
                  OnDelete="@DeleteAppointment"
                  OnEdit="@EditHandler" OnCancel="@CancelHandler"
                  AllowCreate="true" AllowDelete="true" AllowUpdate="true"
                  @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    // sample data and scheduler settings
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

    private SchedulerAppointment OnModelInitHandler()
    {
        return new SchedulerAppointment(Guid.NewGuid(), String.Empty, String.Empty, new DateTime(), new DateTime(), false, String.Empty, null, null);
    }

    List<SchedulerAppointment> Appointments { get; set; }

    async Task UpdateAppointment(SchedulerUpdateEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task AddAppointment(SchedulerCreateEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;

        // perform actual data source operations here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetSchedulerData();

        // see the comments in the service mimic method below.
    }

    //Handlers for application logic flexibility
    void EditHandler(SchedulerEditEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;
        if (!args.IsNew) // an edit operation, otherwise - an insert operation
        {
            // you can prevent opening an item for editing based on a condition
            if (item.Title.Contains("vet", StringComparison.InvariantCultureIgnoreCase))
            {
                args.IsCancelled = true;
            }
        }
        else
        {
            // new appointment
            DateTime SlotStart = args.Start; // the start of the slot the user clicked
            DateTime SlotEnd = args.End; // the start of the slot the user clicked
            bool InsertInAllDay = args.IsAllDay; // whether the user started insertion in the All Day row
        }
    }

    void CancelHandler(SchedulerCancelEventArgs args)
    {
        // you can know when a user wanted to modify an appointment but decided not to
        // the model you get contains the new data from the edit form so you can see what they did
        SchedulerAppointment item = args.Item as SchedulerAppointment;
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

        public SchedulerAppointment(Guid id, string title, string description, DateTime start, DateTime end, bool allDay, string recurrance, List<DateTime> exceptions, Guid? recurrenceId)
        {
            Id = id;
            Title = title;
            Description = description;
            Start = start;
            End = end;
            IsAllDay = allDay;
            RecurrenceRule = recurrance;
            RecurrenceExceptions = exceptions;
            RecurrenceId = recurrenceId;
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

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SchedulerAppointment> _data { get; set; } = new List<SchedulerAppointment>()
        {
            new SchedulerAppointment(Guid.NewGuid(), "Board meeting", "Q4 is coming to a close, review the details.",new DateTime(2019, 12, 5, 10, 00, 0),new DateTime(2019, 12, 5, 11, 30, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Vet visit", "The cat needs vaccinations and her teeth checked.",new DateTime(2019, 12, 2, 11, 30, 0),new DateTime(2019, 12, 2, 12, 0, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Planning meeting", "Kick off the new project.", new DateTime(2019, 12, 6, 9, 30, 0), new DateTime(2019, 12, 6, 12, 45, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Trip to Hawaii", "An unforgettable holiday!", new DateTime(2019, 11, 27), new DateTime(2019, 12, 05), true, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Morning run", "Some time to clear the head and exercise.", new DateTime(2019, 11, 27, 9, 0, 0), new DateTime(2019, 11, 27, 9, 30, 0), false,  "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR", null, null)
        };

        public static async Task Create(SchedulerAppointment itemToInsert)
        {
            itemToInsert.Id = Guid.NewGuid();
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SchedulerAppointment>> Read()
        {
            return await Task.FromResult(_data);
        }

        public static async Task Update(SchedulerAppointment itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
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
````Interface
@* Bind the Scheduler to an interface *@

<TelerikScheduler Data="@Appointments"
                  OnModelInit="@OnModelInitHandler"
                  OnUpdate="@UpdateAppointment"
                  OnCreate="@AddAppointment"
                  OnDelete="@DeleteAppointment"
                  OnEdit="@EditHandler" OnCancel="@CancelHandler"
                  AllowCreate="true" AllowDelete="true" AllowUpdate="true"
                  @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    // sample data and scheduler settings
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

    private SchedulerAppointment OnModelInitHandler()
    {
        return new SchedulerAppointment(Guid.NewGuid(), String.Empty, String.Empty, new DateTime(), new DateTime(), false, String.Empty, null, null);
    }

    List<IAppointment> Appointments { get; set; }

    async Task UpdateAppointment(SchedulerUpdateEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task AddAppointment(SchedulerCreateEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;

        // perform actual data source operations here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetSchedulerData();

        // see the comments in the service mimic method below.
    }

    //Handlers for application logic flexibility
    void EditHandler(SchedulerEditEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;
        if (!args.IsNew) // an edit operation, otherwise - an insert operation
        {
            // you can prevent opening an item for editing based on a condition
            if (item.Title.Contains("vet", StringComparison.InvariantCultureIgnoreCase))
            {
                args.IsCancelled = true;
            }
        }
        else
        {
            // new appointment
            DateTime SlotStart = args.Start; // the start of the slot the user clicked
            DateTime SlotEnd = args.End; // the start of the slot the user clicked
            bool InsertInAllDay = args.IsAllDay; // whether the user started insertion in the All Day row
        }
    }

    void CancelHandler(SchedulerCancelEventArgs args)
    {
        // you can know when a user wanted to modify an appointment but decided not to
        // the model you get contains the new data from the edit form so you can see what they did
        SchedulerAppointment item = args.Item as SchedulerAppointment;
    }

    public interface IAppointment
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
    }

    public class SchedulerAppointment : IAppointment
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

        public SchedulerAppointment(Guid id, string title, string description, DateTime start, DateTime end, bool allDay, string recurrance, List<DateTime> exceptions, Guid? recurrenceId)
        {
            Id = id;
            Title = title;
            Description = description;
            Start = start;
            End = end;
            IsAllDay = allDay;
            RecurrenceRule = recurrance;
            RecurrenceExceptions = exceptions;
            RecurrenceId = recurrenceId;
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

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<IAppointment> _data { get; set; } = new List<IAppointment>()
        {
            new SchedulerAppointment(Guid.NewGuid(), "Board meeting", "Q4 is coming to a close, review the details.",new DateTime(2019, 12, 5, 10, 00, 0),new DateTime(2019, 12, 5, 11, 30, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Vet visit", "The cat needs vaccinations and her teeth checked.",new DateTime(2019, 12, 2, 11, 30, 0),new DateTime(2019, 12, 2, 12, 0, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Planning meeting", "Kick off the new project.", new DateTime(2019, 12, 6, 9, 30, 0), new DateTime(2019, 12, 6, 12, 45, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Trip to Hawaii", "An unforgettable holiday!", new DateTime(2019, 11, 27), new DateTime(2019, 12, 05), true, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Morning run", "Some time to clear the head and exercise.", new DateTime(2019, 11, 27, 9, 0, 0), new DateTime(2019, 11, 27, 9, 30, 0), false,  "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR", null, null)
        };

        public static async Task Create(SchedulerAppointment itemToInsert)
        {
            itemToInsert.Id = Guid.NewGuid();
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<IAppointment>> Read()
        {
            return await Task.FromResult(_data);
        }

        public static async Task Update(SchedulerAppointment itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
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
````AbstractClass
@* Bind the Scheduler to an abstract class *@

<TelerikScheduler Data="@Appointments"
                  OnModelInit="@OnModelInitHandler"
                  OnUpdate="@UpdateAppointment"
                  OnCreate="@AddAppointment"
                  OnDelete="@DeleteAppointment"
                  OnEdit="@EditHandler" OnCancel="@CancelHandler"
                  AllowCreate="true" AllowDelete="true" AllowUpdate="true"
                  @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    // sample data and scheduler settings
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

    private SchedulerAppointment OnModelInitHandler()
    {
        return new SchedulerAppointment(Guid.NewGuid(), String.Empty, String.Empty, new DateTime(), new DateTime(), false, String.Empty, null, null);
    }

    List<AppointmentBase> Appointments { get; set; }

    async Task UpdateAppointment(SchedulerUpdateEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task AddAppointment(SchedulerCreateEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;

        // perform actual data source operations here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetSchedulerData();
    }

    async Task DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        SchedulerAppointment item = (SchedulerAppointment)args.Item;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetSchedulerData();

        // see the comments in the service mimic method below.
    }

    //Handlers for application logic flexibility
    void EditHandler(SchedulerEditEventArgs args)
    {
        SchedulerAppointment item = args.Item as SchedulerAppointment;
        if (!args.IsNew) // an edit operation, otherwise - an insert operation
        {
            // you can prevent opening an item for editing based on a condition
            if (item.Title.Contains("vet", StringComparison.InvariantCultureIgnoreCase))
            {
                args.IsCancelled = true;
            }
        }
        else
        {
            // new appointment
            DateTime SlotStart = args.Start; // the start of the slot the user clicked
            DateTime SlotEnd = args.End; // the start of the slot the user clicked
            bool InsertInAllDay = args.IsAllDay; // whether the user started insertion in the All Day row
        }
    }

    void CancelHandler(SchedulerCancelEventArgs args)
    {
        // you can know when a user wanted to modify an appointment but decided not to
        // the model you get contains the new data from the edit form so you can see what they did
        SchedulerAppointment item = args.Item as SchedulerAppointment;
    }

    public abstract class AppointmentBase
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
    }

    public class SchedulerAppointment : AppointmentBase
    {
        public SchedulerAppointment(Guid id, string title, string description, DateTime start, DateTime end, bool allDay, string recurrance, List<DateTime> exceptions, Guid? recurrenceId)
        {
            Id = id;
            Title = title;
            Description = description;
            Start = start;
            End = end;
            IsAllDay = allDay;
            RecurrenceRule = recurrance;
            RecurrenceExceptions = exceptions;
            RecurrenceId = recurrenceId;
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

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<AppointmentBase> _data { get; set; } = new List<AppointmentBase>()
        {
            new SchedulerAppointment(Guid.NewGuid(), "Board meeting", "Q4 is coming to a close, review the details.",new DateTime(2019, 12, 5, 10, 00, 0),new DateTime(2019, 12, 5, 11, 30, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Vet visit", "The cat needs vaccinations and her teeth checked.",new DateTime(2019, 12, 2, 11, 30, 0),new DateTime(2019, 12, 2, 12, 0, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Planning meeting", "Kick off the new project.", new DateTime(2019, 12, 6, 9, 30, 0), new DateTime(2019, 12, 6, 12, 45, 0), false, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Trip to Hawaii", "An unforgettable holiday!", new DateTime(2019, 11, 27), new DateTime(2019, 12, 05), true, String.Empty, null, null),
            new SchedulerAppointment(Guid.NewGuid(), "Morning run", "Some time to clear the head and exercise.", new DateTime(2019, 11, 27, 9, 0, 0), new DateTime(2019, 11, 27, 9, 30, 0), false,  "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR", null, null)
        };

        public static async Task Create(SchedulerAppointment itemToInsert)
        {
            itemToInsert.Id = Guid.NewGuid();
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<AppointmentBase>> Read()
        {
            return await Task.FromResult(_data);
        }

        public static async Task Update(SchedulerAppointment itemToUpdate)
        {
            var index = _data.FindIndex(i => i.Id == itemToUpdate.Id);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
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

## OnItemClick

The `OnItemClick` event fires when the user clicks on an appointment in the Scheduler. 
It provides a `SchedulerItemClickEventArgs` object to the event handler and you can get the `Item` property and cast it to your own model. If you set the `ShouldRender` property to `true`, the component will re-render. This can be useful if you need to change the Scheduler parameters or state during the event execution and especially if you need to execute `async` logic in the event handler.

>caption Use the OnItemClick event for the scheduler

````CSHTML
@* You can react to user clicking on a Scheduler item by using the OnItemClick event *@

<TelerikScheduler Data="@Appointments" 
                  @bind-Date="@StartDate"
                  OnItemClick="@OnClickHandler"
                  @bind-View="@CurrView" 
                  Height="600px" 
                  Width="800px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private void OnClickHandler(SchedulerItemClickEventArgs args)
    {
        var currentItem = args.Item as SchedulerAppointment;

        args.ShouldRender = false;
    }

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
                End = new DateTime(2019, 11, 26, 12, 0, 0)
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
    }
}
````

## OnItemDoubleClick

The `OnItemDoubleClick` event fires when the user double clicks on an appointment in the Scheduler. 
It provides a `SchedulerItemDoubleClickEventArgs` object to the event handler and you can get the `Item` property and cast it to your own model. If you set the `ShouldRender` property to `true`, the component will re-render. This can be useful if you need to change the Scheduler parameters or state during the event execution and especially if you need to execute `async` logic in the event handler.

>caption Use the OnItemDoubleClick event for the scheduler

````CSHTML
@* You can react to user double clicking on a Scheduler item by using the OnItemDoubleClick event *@

<TelerikScheduler Data="@Appointments" 
                  @bind-Date="@StartDate"
                  OnItemDoubleClick="@OnDoubleClickHandler"
                  @bind-View="@CurrView" 
                  Height="600px" 
                  Width="800px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private void OnDoubleClickHandler(SchedulerItemDoubleClickEventArgs args)
    {
        var currentItem = args.Item as SchedulerAppointment;

        args.ShouldRender = false;
    }

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
                End = new DateTime(2019, 11, 26, 12, 0, 0)
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
    }
}
````

## OnItemContextMenu

The `OnItemContextMenu` event fires when the user right clicks on an appointment in the Scheduler. 
It provides a `SchedulerItemContextMenuEventArgs` object to the event handler and you can get the `Item` property and cast it to your own model. If you set the `ShouldRender` property to `true`, the component will re-render. This can be useful if you need to change the Scheduler parameters or state during the event execution and especially if you need to execute `async` logic in the event handler.

>caption Use the OnItemContextMenu event for the scheduler

````CSHTML
@* You can react to user right clicking on a Scheduler item by using the OnItemContextMenu event *@

<TelerikScheduler Data="@Appointments"
                  @bind-Date="@StartDate"
                  OnItemContextMenu="@OnItemContextMenu"
                  @bind-View="@CurrView"
                  Height="600px"
                  Width="800px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private void OnItemContextMenu(SchedulerItemContextMenuEventArgs args)
    {
        var currentItem = args.Item as SchedulerAppointment;

        args.ShouldRender = false;

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            Console.WriteLine($"The user clicked {keyboardEventArgs.Key} on item {currentItem.Description}");
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            Console.WriteLine($"The user clicked on {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} - item {currentItem.Description}");
        }
    }

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
                End = new DateTime(2019, 11, 26, 12, 0, 0)
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
    }
}
````

## ItemRender

The `OnItemRender` event fires when an appointment is going to be rendered in the scheduler. It fires one for every appointment, including all-day appointments that span several days/slots, and the class is rendered on all elements.

Through its event arguments you can get the `Item` to cast it to your model type and to set the `Class` that will render on the appointment wrapping element. This lets you customize the appearance of the entire appointment, not just the contents of its [template]({%slug scheduler-templates-appointment%}).

>caption Customize the appearance of the scheduler appointments by adding custom CSS classes to them conditionally

````CSHTML
@* The sample styles are at the end of the snippet, and you can also add more than one per appointment, depending on the necessary logic *@

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" @bind-View="@CurrView" Height="600px" Width="800px"
                  OnItemRender="@OnItemRenderHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerWeekView StartTime="@DayStart" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    void OnItemRenderHandler(SchedulerItemRenderEventArgs e)
    {
        SchedulerAppointment appt = e.Item as SchedulerAppointment;
        if (appt.Important)
        {
            e.Class = "important-appointment";
        }
        if (appt.IsAllDay)
        {
            e.Class += " all-day-style";
        }
    }

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
                Important = true
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
                Important = true
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

        public bool Important { get; set; }
    }
}

<style>
    .important-appointment {
        background-color: red;
        color: yellow;
        font-weight: 900;
    }

    .all-day-style {
        color: blue;
    }
</style>
````

## OnCellRender

The `OnCellRender` event fires upon rendering of each slot cell. It allows you to set a custom CSS class to the cell, based on business logic.

The handler receives an argument of type `SchedulerCellRenderEventArgs` which exposes the following fields:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Field | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class that will be applied to the cell. |
| `IsAllDay` | `bool` | Whether the slot is inside the `AllDay` row/column.
| `Resources` | `List<KeyValuePair<string, object>` | The resources that are associated with the column/row. Applicable when the Scheduler uses both - [resources]({%slug scheduler-resources%}) and [grouping]({%slug scheduler-resource-grouping%}). Needed to differentiate between the same dates within different groups. |
| `Start` | `DateTime` | The slot start time. |
| `End` | `DateTime` | The slot end time. |

>caption Customize certain Scheduler slots by handling the `OnCellRender` event

````CSHTML
<style>
    .lunch-break {
        background-color: rgba(255,124,115,0.3);
        pointer-events:none;
    }
    
    .lunch-break::after {
        content: "Lunch break";
    }
</style>

<TelerikScheduler Data="@Appointments"
                  OnCellRender="@OnCellRenderHandler"
                  @bind-Date="@SchedulerStartDate"
                  @bind-View="@SchedulerCurrentView"
                  Height="600px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime SchedulerStartDate { get; set; } = new DateTime(2022, 7, 25, 8, 0, 0);

    private SchedulerView SchedulerCurrentView { get; set; } = SchedulerView.Week;

    // only the time portion matters
    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);
    private DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 19, 0, 0);

    private void OnCellRenderHandler(SchedulerCellRenderEventArgs args)
    {
        DateTime lunchStart = new DateTime(1900, 1, 1, 12, 0, 0);
        DateTime lunchEnd = new DateTime(1900, 1, 1, 12, 30, 0);

        if ((args.Start.TimeOfDay.Equals(lunchStart.TimeOfDay) || args.End.TimeOfDay.Equals(lunchEnd.TimeOfDay)) && 
            (args.Start.DayOfWeek != DayOfWeek.Saturday && args.Start.DayOfWeek != DayOfWeek.Sunday)
            )
        {
            args.Class = "lunch-break";
        }
    }

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
        new SchedulerAppointment
        {
            Title = "Planning meeting",
            Start = new DateTime(2022, 7, 25, 9, 0, 0),
            End = new DateTime(2022, 7, 25, 11, 30, 0)
        },
        new SchedulerAppointment
        {
            Title = "Software updates",
            Start = new DateTime(2022, 7, 26, 13, 0, 0),
            End = new DateTime(2022, 7, 26, 14, 30, 0)
        },
          new SchedulerAppointment
        {
            Title = "Support meeting",
            Start = new DateTime(2022, 7, 27, 8, 0, 0),
            End = new DateTime(2022, 7, 27, 9, 30, 0)
        },
        new SchedulerAppointment
        {
            Title = "Trip to Hawaii",
            IsAllDay = true,
            Start = new DateTime(2022, 7, 28),
            End = new DateTime(2022, 8, 07)
        }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

## DateChanged

The `DateChanged` event fires when the user [navigates]({%slug scheduler-navigation%}) to another date in the scheduler. For a view whose start is determined by outside factors and not only by the `Date` parameter (the week view), the event argument may not always be the start time of the range, but a date contained within the range. You could also use this event to load only appointments from the view's range which can be a performance optimization technique if you have a very large number of appointments.

>caption Handle the `DateChanged` event


````CSHTML
@* Try navigating to the previous or next period, today or a random date, then repeat after changing the view *@

@result

<TelerikScheduler Data="@Appointments" @bind-View="@CurrView" Height="600px"
                  Date="@StartDate" DateChanged="@DateChangedHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    async Task DateChangedHandler(DateTime currDate)
    {
        result = $"The user went to a range that contains the {currDate.ToShortDateString()} date";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        StartDate = currDate;
    }

    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
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
                Start = new DateTime(2019, 11, 29, 11, 30, 0),
                End = new DateTime(2019, 11, 29, 12, 0, 0)
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
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````


@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ViewChanged

The `ViewChanged` event fires when the user chooses a new [View]({%slug scheduler-views-overview%}). You can read more about the navigation options the user has in the [Navigation]({%slug scheduler-navigation%}) article.

>caption Handle the `ViewChanged` event.

````CSHTML
@result

<TelerikScheduler Data="@Appointments" @bind-Date="@StartDate" Height="600px"
                  View="@CurrView" ViewChanged="@ViewChangedHandler">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" />
        <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="3" />
        <SchedulerWeekView StartTime="@DayStart" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    string result { get; set; }
    public DateTime StartDate { get; set; } = new DateTime(2019, 11, 29);
    async Task ViewChangedHandler(SchedulerView nextView)
    {
        result = $"The user went to the {nextView.ToString()} view on {DateTime.Now}";

        // update the model field the scheduler uses, otherwise it may revert
        // to the default/initial/previous value upon repainting
        CurrView = nextView;
    }

    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0);//the time portion is important
    List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
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
                Start = new DateTime(2019, 11, 29, 11, 30, 0),
                End = new DateTime(2019, 11, 29, 12, 0, 0)
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
            }
    };

    public class SchedulerAppointment
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Scheduler Overview]({%slug scheduler-overview%})
* [Views Overview]({%slug scheduler-views-overview%})
* [Scheduler Navigation]({%slug scheduler-navigation%})
* [Data Binding]({%slug scheduler-appointments-databinding%})
* [Appointments Editing]({%slug scheduler-appointments-edit%})
