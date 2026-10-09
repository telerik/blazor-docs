---
title: Agenda
page_title: Scheduler - Agenda View
description: The Agenda view in the Scheduler for Blazor shows a weekly summary or a user-defined custom period in a table format, providing a clear event overview.
slug: scheduler-views-agenda
tags: telerik,blazor,scheduler,view,agenda
published: True
position: 6
components: ["scheduler"]
---

# Agenda View

The Agenda view of the Scheduler for Blazor shows a weekly summary (or another custom period set by the user) in a table format.

In this article:

* [View Parameters](#view-parameters)
* [Example](#example)

## View Parameters

The following parameters allow you to configure the Agenda view:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `NumberOfDays` | `int` <br /> (`7`) | Represents the number of days shown in the view. |
| `HideEmptyAgendaDays` | `bool` <br /> (`true`) | Defines whether dates with no appointments are rendered. |

>note The Agenda view does not support the `SlotTemplate` or a dedicated time-cell template. It renders appointments in a summary table. To customize Scheduler time slots, use a Day, Multiday, Month, Timeline, or Week view with the [`SlotTemplate`](slug:scheduler-templates-slot). To customize appointment content, use the [appointment templates](slug:scheduler-templates-appointment).

## Example

>tip You can declare other views as well, this example adds only the Agenda view for brevity.

>caption Declare the Agenda view in the markup

<demo metaUrl="client/scheduler/agenda/example-1/" height="780"></demo>

## See Also

* [Views](slug:scheduler-views-overview)
* [Navigation](slug:scheduler-navigation)
* [Live Demo: Scheduler Agenda View](https://demos.telerik.com/blazor-ui/scheduler/agenda-view)
* [Resource Grouping](slug:scheduler-resource-grouping)

