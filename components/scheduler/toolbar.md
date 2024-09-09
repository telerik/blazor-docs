---
title: Toolbar
page_title: Scheduler Toolbar
description: Toolbar of the Scheduler for Blazor. List of all built-in tools. How to use custom Scheduler tools.
slug: scheduler-toolbar
tags: telerik,blazor,scheduler,toolbar
published: True
position: 2
---

# Scheduler Toolbar

The [Blazor Scheduler toolbar](https://demos.telerik.com/blazor-ui/scheduler/toolbar) can render built-in and custom tools. This article shows how to use and customize the toolbar.

## Built-in Tools

By default, the [Blazor Scheduler]({%slug scheduler-overview%}) displays all its built-in tools in the following order:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Tag | Description |
| --- | --- |
| `SchedulerToolBarNavigationTool` | A group of navigation buttons. They can navigate to the present day, to the previous period, and to the next period depending on the [Scheduler view]({%slug scheduler-views-overview%}). |
| `SchedulerToolBarCalendarTool` | A button that shows the start and the end of the current period. Upon click, you can select a new period via a calendar popup. |
| `SchedulerToolBarViewsTool` | A button group or a dropdown (depending on the screen size) with all available views. |

By default, the toolbar also includes spacers (`<SchedulerToolBarSpacerTool/>`). They consume the available empty space and push the rest of the tools next to one another.

## Custom Tools

To customize the order of the built-in tools or add a custom tool, define the `<SchedulerToolBar>` tag of the Scheduler. To add a custom tool use the nested `<SchedulerToolBarCustomTool>` tag of the `<SchedulerToolBar>` tag. The `<SchedulerToolBarCustomTool>` is a standard Blazor `RenderFragment`. See the example below.


## Toolbar Configuration

Add a `<SchedulerToolBar>` tag inside `<TelerikScheduler>` to configure the toolbar, for example:

* Arrange the Scheduler tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the Scheduler toolbar

````CSHTML
<TelerikScheduler Data="@Appointments"
                  @bind-Date="@SchedulerStartDate"
                  @bind-View="@SchedulerCurrentView"
                  Height="600px">
    <SchedulerToolBar>
        <SchedulerToolBarViewsTool />
        <SchedulerToolBarNavigationTool />
        <SchedulerToolBarSpacerTool />
        <SchedulerToolBarCustomTool>
            <TelerikButton OnClick="@OnCustomButtonClick">Show When the Trip to Hawaii Ends</TelerikButton>
        </SchedulerToolBarCustomTool>
    </SchedulerToolBar>
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerWeekView StartTime="@DayStart" EndTime="@DayEnd" />
        <SchedulerMonthView />
    </SchedulerViews>
</TelerikScheduler>

@code {
    private DateTime SchedulerStartDate { get; set; } = new DateTime(2022, 7, 25);

    private SchedulerView SchedulerCurrentView { get; set; } = SchedulerView.Week;

    private DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 6, 0, 0);
    private DateTime DayEnd { get; set; } = new DateTime(2000, 1, 1, 19, 0, 0);

    private void OnCustomButtonClick()
    {
        var findEvent = Appointments.Where(x => x.Title == "Trip to Hawaii").FirstOrDefault();
        if (findEvent != null)
        {
            SchedulerStartDate = findEvent.End;
        }
    }

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

## See Also

* [Scheduler Live Demo](https://demos.telerik.com/blazor-ui/scheduler/overview)
* [Scheduler Toolbar Demo](https://demos.telerik.com/blazor-ui/scheduler/toolbar)