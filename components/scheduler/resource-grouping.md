---
title: Resource Grouping
page_title: Scheduler - Resource Grouping
description: Group Resources in the Scheduler for Blazor.
slug: scheduler-resource-grouping
tags: telerik,blazor,scheduler,resource,grouping
tag: updated
published: true
position: 33
components: ["scheduler"]
---

# Scheduler Resource Grouping

The Telerik Scheduler for Blazor can group appointments by one or more resources. All available [Scheduler views](slug:scheduler-views-overview) support horizontal and vertical grouping, except the Agenda view, which only uses vertical grouping.

>tip This article requires familiarity with [Scheduler Resources](slug:scheduler-resources).

## Basics

When Scheduler grouping is active, the component renders multiple view tables in horizontal and vertical orientation. The date or hour headers repeat for each group (resource value).

Moving an appointment from one group to another is allowed. On drop, the appointment resource changes alongside the start date and the app should persist these changes in the [`OnUpdate` event handler](slug:scheduler-appointments-edit).

To configure resource display in groups:

1. [Configure the Scheduler component to work with resources](slug:scheduler-resources).
1. Add the `<SchedulerGroupSettings>` tag inside `<SchedulerSettings>`.
1. Set the `Resources` parameter to a `List<string>` of one or more resource names that match property names in the Scheduler model class.
1. (optional) Set the `Orientation` parameter to a member of the [`SchedulerGroupOrientation`](slug:telerik.blazor.schedulergrouporientation) enum. The default value is `Horizontal`.

>caption Scheduler Group Settings

````RAZOR.skip-repl
<TelerikScheduler>
    <SchedulerSettings>
        <SchedulerGroupSettings Orientation="@SchedulerGroupOrientation.Vertical"
                                Resources="@GroupResources" />
    </SchedulerSettings>
</TelerikScheduler>

@code {
    private readonly List<string> GroupResources = new()
    {
        nameof(Appointment.Room),
        nameof(Appointment.Manager)
    };
}
````

## Example

>caption Scheduler Resource Grouping

<demo metaUrl="client/scheduler/resource-grouping/example-1/" height="780"></demo>

## See Also

* [Live Demo: Scheduler Grouping](https://demos.telerik.com/blazor-ui/scheduler/grouping)
* [Scheduler Overview](slug:scheduler-overview)
