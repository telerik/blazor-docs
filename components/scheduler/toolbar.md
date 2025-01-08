---
title: Toolbar
page_title: Scheduler Toolbar
description: Learn how to configure the toolbar of the Scheduler for Blazor.
slug: scheduler-toolbar
tags: telerik,blazor,scheduler,toolbar
published: True
position: 2
---

# Scheduler Toolbar

The [Blazor Scheduler toolbar](https://demos.telerik.com/blazor-ui/scheduler/toolbar) can render built-in and custom tools. This article shows how to use and customize the toolbar.

## Built-in Tools

By default, the [Blazor Scheduler](slug://scheduler-overview) displays all its built-in tools in the following order:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Tag | Description |
| --- | --- |
| `SchedulerToolBarNavigationTool` | A group of navigation buttons. They can navigate to the present day, to the previous period, and to the next period depending on the [Scheduler view](slug://scheduler-views-overview). |
| `SchedulerToolBarCalendarTool` | A button that shows the start and the end of the current period. Upon click, you can select a new period via a calendar popup. |
| `SchedulerToolBarViewsTool` | A button group or a dropdown (depending on the screen size) with all available views. |

By default, the toolbar also includes spacers (`<SchedulerToolBarSpacerTool />`). They consume the available empty space and push the rest of the tools next to one another.

## Custom Tools

To customize the order of the built-in tools or add a custom tool, define the `<SchedulerToolBar>` child tag in the Scheduler. To add a custom tool use the nested `<SchedulerToolBarCustomTool>` tag of the `<SchedulerToolBar>` tag. The `<SchedulerToolBarCustomTool>` is a standard Blazor `RenderFragment`. See the example below.


## Toolbar Configuration

Add a `<SchedulerToolBar>` tag inside `<TelerikScheduler>` to configure the toolbar, for example:

* Arrange the Scheduler tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the Scheduler toolbar

````RAZOR
<TelerikScheduler Data="@Appointments"
                  @bind-Date="@SchedulerStartDate"
                  Height="600px">
    <SchedulerToolBar>
        <SchedulerToolBarViewsTool />
        <SchedulerToolBarNavigationTool />
        <SchedulerToolBarSpacerTool />
        <SchedulerToolBarCustomTool>
            <TelerikButton OnClick="@OnCustomToolClick">Show When the Trip to Hawaii Ends</TelerikButton>
        </SchedulerToolBarCustomTool>
    </SchedulerToolBar>
    <SchedulerViews>
        <SchedulerDayView />
        <SchedulerWeekView />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime SchedulerStartDate { get; set; } = DateTime.Today;

    private void OnCustomToolClick()
    {
        var hawaiiTrip = Appointments.Where(x => x.Title == "Trip to Hawaii").FirstOrDefault();
        if (hawaiiTrip != null)
        {
            SchedulerStartDate = hawaiiTrip.End;
        }
    }

    private List<SchedulerAppointment> Appointments = new List<SchedulerAppointment>()
    {
        new SchedulerAppointment
        {
            Title = "Planning meeting",
            Start = DateTime.Today,
            End = DateTime.Today.AddHours(3)
    },
        new SchedulerAppointment
        {
            Title = "Vet visit",
            Start = DateTime.Today.AddDays(2),
            End = DateTime.Today.AddDays(2).AddHours(1)
        },
        new SchedulerAppointment
        {
            Title = "Trip to Hawaii",
            IsAllDay = true,
            Start = DateTime.Today.AddDays(3),
            End = DateTime.Today.AddDays(35)
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

## See Also

* [Scheduler Live Demo](https://demos.telerik.com/blazor-ui/scheduler/overview)
* [Scheduler Toolbar Demo](https://demos.telerik.com/blazor-ui/scheduler/toolbar)