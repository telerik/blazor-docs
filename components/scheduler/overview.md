---
title: Overview
page_title: Scheduler Overview
description: Overview of the Scheduler for Blazor.
slug: scheduler-overview
tags: telerik,blazor,scheduler,overview
published: True
position: 0
---

# Blazor Scheduler Overview

The <a href="https://www.telerik.com/blazor-ui/scheduler" target="_blank">Blazor Scheduler component</a> lets users see, edit and add appointments, so they can plan their agenda. The Scheduler offers different views, control over the workday start and end, resource grouping and various other features and settings.


## Creating Blazor Scheduler

1. Use the `<TelerikScheduler>` tag.
1. Set its `Data` parameter to `IEnumerable<TItem>` to define the collection of appointments (events). The Scheduler can [detect and use some property names in the model](slug:scheduler-appointments-databinding#appointment-features), such as `Title`, `Description`, `Start`, `End` and others. Alternatively, you can use different property names and configure them explicitly. See [Data Binding](slug:scheduler-appointments-databinding) for more details.
1. Define the available views that users can toggle. Each view will be a child tag inside `<SchedulerViews>`.
1. (optional) Set `StartTime` and `EndTime` for the views, unless users should see the full 24 hours. Only the time portion of these `DateTime` objects will matter.
1. (optional) Set the Scheduler's `Date` and `View` parameters. By default, users will see today's date and the first view. Both parameters support two-way binding.

>caption Basic Scheduler

````RAZOR
<TelerikScheduler Data="@Appointments"
                  @bind-Date="@SchedulerStartDate"
                  @bind-View="@SchedulerCurrentView"
                  Height="600px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerMonthView />
        <SchedulerTimelineView StartTime="@DayStart" EndTime="@DayEnd" />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime SchedulerStartDate { get; set; } = new DateTime(2022, 7, 25);

    private SchedulerView SchedulerCurrentView { get; set; } = SchedulerView.Week;

    // only the time portion matters
    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 6, 0, 0);
    private DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 19, 0, 0);

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
        new SchedulerAppointment
        {
            Title = "Planning meeting",
            Start = new DateTime(2022, 7, 25, 9, 30, 0),
            End = new DateTime(2022, 7, 25, 12, 45, 0)
        },
        new SchedulerAppointment
        {
            Title = "Vet visit",
            Start = new DateTime(2022, 7, 26, 7, 0, 0),
            End = new DateTime(2022, 7, 26, 7, 30, 0)
        },
        new SchedulerAppointment
        {
            Title = "Trip to Hawaii",
            IsAllDay = true,
            Start = new DateTime(2022, 7, 27),
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


## Data Binding

As a data-driven component, the Scheduler needs a collection of appointments to work with. Learn how to [data bind the Scheduler and configure model property names](slug:scheduler-appointments-databinding).


## Views

The [Scheduler offers different views](slug:scheduler-views-overview) that are suitable for different user needs:

* Day view
* Multiday view
* Week view
* Month view
* Timeline (agenda) view


## Navigation

The [Scheduler features extensive navigation](slug:scheduler-navigation), which can be both programmatic and managed by the end user. The component can change the currently visible time range, the current view, and toggle business hours only display.


## Editing

Users can [create, edit and delete Scheduler appointments](slug:scheduler-appointments-edit). The component provides you with the new information so you can store it to the underlying data source.


## Recurrence

The [Scheduler supports recurring appointments and exceptions](slug:scheduler-recurrence). Telerik UI for Blazor also exposes [recurrence editor components](slug:scheduler-recurrence#recurrence-editor-components) that enable users to edit recurrence rules in an edit form.

## Resources and Grouping

[Scheduler resources](slug:scheduler-resources) provide a way to associate and [group appointments](slug:scheduler-resource-grouping) by certain criteria, such as a meeting room, a participating person, or used equipment.


## Templates

You can [customize the appointment appearance and content via Scheduler templates](slug:scheduler-templates-appointment). Another option is to use the [Scheduler `OnItemRender` event](slug:scheduler-events#itemrender).


## Events

The [Scheduler component fires events](slug:scheduler-events) related to CRUD operations, item (appointment) clicks and user navigation. Use them to gain more information about user actions and enhance the component behavior.


## Scheduler Parameters

The following table lists Scheduler parameters, which are not discussed elsewhere in the component documentation. Also check the [Scheduler API Reference](slug:Telerik.Blazor.Components.TelerikScheduler-1) for a full list of parameters, events and methods.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<div class="k-scheduler">` element. Use it to [override theme styles](slug:themes-override). |
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Determines if the Scheduler will display a loading animation for operations that take longer than 600 ms. |
| `Height` | `string` | A `height` style in [any supported unit](slug:common-features/dimensions). |
| `Width` | `string` | A `width` style in [any supported unit](slug:common-features/dimensions). |

## Scheduler Reference and Methods

To execute Scheduler methods, obtain reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Rebind` | Use to refresh the component data. |
| `Refresh` | Use to programmatically re-render the Scheduler. |

<div class="skip-repl"></div>

````RAZOR
<TelerikButton OnClick="@RefreshScheduler">Refresh Scheduler</TelerikButton>
<TelerikButton OnClick="@RefreshScheduler">Rebind Scheduler</TelerikButton>

<TelerikScheduler @ref="SchedulerRef" />

@code {
    private TekerikScheduler<Appointment>? SchedulerRef { get; set; }

    private void RefreshScheduler()
    {
        SchedulerRef?.Refresh();
    }

    private void RebindScheduler()
    {
        SchedulerRef?.Rebind();
    }
}
````

## Next Steps

* [Bind the Scheduler to data](slug:scheduler-appointments-databinding)
* [Configure Scheduler views](slug:scheduler-views-overview)
* [Enable Scheduler editing](slug:scheduler-appointments-edit)


## See Also

* [Live Demo: Scheduler](https://demos.telerik.com/blazor-ui/scheduler/overview)
* [Scheduler API Reference](slug:Telerik.Blazor.Components.TelerikScheduler-1)
