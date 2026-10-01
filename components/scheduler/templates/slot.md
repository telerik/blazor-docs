---
title: Slot
page_title: Scheduler - Slot Templates
description: Use custom rendering for the slots in the Scheduler for Blazor.
slug: scheduler-templates-slot
tags: telerik,blazor,scheduler,templates,slot,alldayslot,dateheader
published: True
position: 15
components: ["scheduler"]
---

# Slot Templates

You can use the `SlotTemplate` and the `AllDaySlotTemplate` to customize the rendering of the slots in the Scheduler.

* [AllDaySlotTemplate](#alldayslottemplate)
* [SlotTemplate](#slottemplate)

## AllDaySlotTemplate

Use the `AllDaySlotTemplate` to provide a custom rendering for the cells in the Telerik Scheduler for Blazor that span across a full day. This template can be defined for the [Day, Multiday, and Week Scheduler views](slug:scheduler-views-overview). 

The `context` of the template is a `SchedulerAllDaySlotTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Start` | `DateTime` | The slot's start time. |
| `End` | `DateTime` | The slot's end time.|
| `Resources` | `List<KeyValuePair<string, object>` | A collection of resources for which the slot is defined. The collection is populated when the [Resources](slug:scheduler-resources) and [Resource Grouping](slug:scheduler-resource-grouping) features are used. |

## SlotTemplate

Use the `SlotTemplate` to provide a custom rendering for the cells in the Telerik Scheduler for Blazor. This template can be defined for the [Day, Multiday, Month, Timeline, and Week Scheduler views](slug:scheduler-views-overview). 

The `context` of the template is a `SchedulerSlotTemplateContext` object that contains:

| Property | Type | Description |
| --- | --- | --- |
| `Start` | `DateTime` | The slot's start time. |
| `End` | `DateTime` | The slot's end time.|
| `Resources` | `List<KeyValuePair<string, object>` | A collection of resources for which the slot is defined. The collection is populated when the [Resources](slug:scheduler-resources) and [Resource Grouping](slug:scheduler-resource-grouping) features are used. |

>note When you use the SlotTemplate in the Timeline Scheduler view, and the content of the template is not a plain string, you must add the `!k-pos-absolute` built-in class to the custom element.

## Example

<demo metaUrl="client/scheduler/slot/example-1/" height="780"></demo>

## See Also

* [Live Demo: Scheduler Templates](https://demos.telerik.com/blazor-ui/scheduler/templates)

