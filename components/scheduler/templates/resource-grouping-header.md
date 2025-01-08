---
title: Resource Grouping Header
page_title: Scheduler - Resource Grouping Header Template
description: Use custom resource grouping header rendering through a template in the scheduler for Blazor.
slug: scheduler-templates-resource-grouping-header
tags: telerik,blazor,scheduler,templates,resource,grouping,header
published: True
position: 13
---

# Resource Grouping Header Templates

You can use the `SchedulerResourceGroupHeaderTemplate` to customize the rendering of the Scheduler resource grouping header cells. This allows you to change the appearance of the content, add custom content or any HTML elements.

The `SchedulerResourceGroupHeaderTemplate`:
* Is invoked for each resource when the Scheduler is configured to have resources and grouping.
* Applies in both horizontal and vertical grouping.
* Can be defined individually for each [Scheduler view](slug://scheduler-views-overview).

The `context` of the template is a `SchedulerResourceGroupHeaderTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Text` | `string` | The group text. |
| `Value` | `object` | The resource value.|
| `Field` | `string` | The field of the resource. |

>caption Example of using the SchedulerResourceGroupHeaderTemplate

````RAZOR
<TelerikScheduler Data="@Appointments"
                  @bind-Date="@StartDate"
                  Height="600px"
                  Width="900px">
    <SchedulerViews>
        <SchedulerDayView StartTime="@DayStart">
            <SchedulerResourceGroupHeaderTemplate>
                <p>
                    @{
                        if ((int)context.Value == 1)
                        {
                            <span title="The big meeting room is on 2nd floor." class="tooltip-target">
                                <TelerikSvgIcon Icon="SvgIcon.InfoCircle"></TelerikSvgIcon>
                            </span>
                        }
                        else
                        {
                            <span title="The small meeting room is on 3rd floor." class="tooltip-target">
                                <TelerikSvgIcon Icon="SvgIcon.InfoCircle"></TelerikSvgIcon>
                            </span>
                        }
                    }
                    @context.Text
                </p>
            </SchedulerResourceGroupHeaderTemplate>
        </SchedulerDayView>
        <SchedulerWeekView StartTime="@DayStart">
            <SchedulerResourceGroupHeaderTemplate>
                <div>
                    <span class="meeting-title">@context.Text</span>
                </div>
            </SchedulerResourceGroupHeaderTemplate>
        </SchedulerWeekView>
        <SchedulerMonthView>
            <SchedulerResourceGroupHeaderTemplate>
                Text: @context.Text
                <br />
                Value: @context.Value
                <br />
                Field: @context.Field
                <br />
            </SchedulerResourceGroupHeaderTemplate>
        </SchedulerMonthView>
    </SchedulerViews>
    <SchedulerResources>
        <SchedulerResource Field="@nameof(AppointmentModel.RoomId)" TextField="Name" ValueField="Id" Data="@Rooms"></SchedulerResource>
    </SchedulerResources>
    <SchedulerSettings>
        <SchedulerGroupSettings Resources="@GroupingResources" Orientation="@SchedulerGroupOrientation.Horizontal"></SchedulerGroupSettings>
    </SchedulerSettings>
</TelerikScheduler>

<TelerikTooltip TargetSelector=".tooltip-target" />

<style>
    .meeting-title {
        text-transform: uppercase;
        font-style: italic;
        color: red;
    }
</style>

@code {
    private List<string> GroupingResources = new List<string> { "RoomId" };
    private DateTime today { get; set; }
    private DateTime StartDate { get; set; } = DateTime.Today;
    private DateTime DayStart { get; set; }
    private IEnumerable<AppointmentModel> Appointments { get; set; }
    private IEnumerable<RoomModel> Rooms { get; set; }

    protected override void OnInitialized()
    {
        today = DateTime.Today;

        DayStart = new DateTime(today.Year, today.Month, today.Day, 10, 00, 0);

        Appointments = new List<AppointmentModel>()
        {
            new AppointmentModel
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                Start = new DateTime(today.Year, today.Month, today.Day, 10, 00, 0),
                End = new DateTime(today.Year, today.Month, today.Day, 11, 30, 0),
                RoomId = 1
            },
            new AppointmentModel
            {
                Title = "General meeting",
                Description = "Discuss general topics.",
                Start = new DateTime(today.Year, today.Month, today.Day, 14, 00, 0),
                End = new DateTime(today.Year, today.Month, today.Day, 15, 30, 0),
                RoomId = 1
            },
            new AppointmentModel
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(today.Year, today.Month, today.Day + 2, 10, 30, 0),
                End = new DateTime(today.Year, today.Month, today.Day + 2, 12, 45, 0),
                RoomId = 2
            },
            new AppointmentModel
            {
                Title = "Meeting about upcoming changes",
                Description = "Discuss upcoming changes.",
                Start = new DateTime(today.Year, today.Month, today.Day + 1, 15, 30, 0),
                End = new DateTime(today.Year, today.Month, today.Day + 1, 16, 45, 0),
                RoomId = 2
            },
            new AppointmentModel
            {
                Title = "Team meeting",
                Description = "Plan the work in the team.",
                Start = new DateTime(today.Year, today.Month, today.Day + 1, 11, 30, 0),
                End = new DateTime(today.Year, today.Month, today.Day + 1, 12, 0, 0),
                RoomId = 1
            },
        };

        Rooms = new List<RoomModel>()
        {
            new RoomModel { Id = 1, Name = "Big Meeting Room" },
            new RoomModel { Id = 2, Name = "Small Meeting Room" }
        };
    }

    public class AppointmentModel
    {
        public Guid Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? RoomId { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public int? RecurrenceId { get; set; }
        public string RecurrenceExceptions { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }

        public AppointmentModel()
        {
            Id = Guid.NewGuid();
        }
    }

    public class RoomModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

 * [Live Demo: Scheduler Templates](https://demos.telerik.com/blazor-ui/scheduler/templates)

