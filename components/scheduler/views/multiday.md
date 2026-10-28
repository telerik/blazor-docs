---
title: MultiDay
page_title: Scheduler - MultiDay View
description: MultiDay View in the Scheduler for Blazor.
slug: scheduler-views-multiday
tags: telerik,blazor,scheduler,view,multiday
published: True
position: 3
components: ["scheduler"]
---

# MultiDay View

The MultiDay view of the Scheduler for Blazor shows several days at once to the user.

The `Date` parameter of the Scheduler controls which is the first rendered date, and the `NumberOfDays` parameter of the View controls how many days will be rendered.

In this article:

* [View Parameters](#view-parameters)
	* [Slots](#slots)
* [Example](#example)

@[template](/_contentTemplates/scheduler/views.md#day-views-common-properties)
| `NumberOfDays` | `int` <br/> `1` | How many days to show side by side in the view.

@[template](/_contentTemplates/scheduler/views.md#visible-times-tip)

@[template](/_contentTemplates/scheduler/views.md#day-slots-explanation)

## Example

>tip You can declare other views as well, this example adds only the Multiday view for brevity.

>caption Declare the MultiDay view in the markup

<demo metaUrl="client/scheduler/multiday/example-1/" height="780"></demo>

## See Also

* [Views](slug:scheduler-views-overview)
* [Navigation](slug:scheduler-navigation)
* [Live Demo: Scheduler MultiDay View](https://demos.telerik.com/blazor-ui/scheduler/multiday-view)
* [Resource Grouping](slug:scheduler-resource-grouping)

