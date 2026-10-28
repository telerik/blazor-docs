---
title: Month
page_title: Scheduler - Month View
description: Monthy View in the Scheduler for Blazor.
slug: scheduler-views-month
tags: telerik,blazor,scheduler,view,month
published: True
position: 4
components: ["scheduler"]
---

# Month View

The Month view of the Scheduler for Blazor shows an entire month to the user.

The `Date` parameter of the Scheduler controls which month is displayed. It's the one containing the date.


In this article:

* [View Parameters](#view-parameters)
* [Example](#example)

## View Parameters

The following parameters allow you to configure the month view:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `ItemsPerSlot` | `int` <br /> (`2`) | Indicates the number of appointments that are displayed per day. |


If there are more appointments for a day than per the `ItemsPerSlot` parameter, an ellipsis button provides access to the DayView for the specific day. You must [define a day view](slug:scheduler-views-day) so the user can see it. The Scheduler sorts and displays the number of appointments per the `ItemsPerSlot` parameter, by start time (ascending) and then by end time (descending).

If the `ItemsPerSlot` parameter is a zero or a negative value, an `ArgumentOutOfRangeException` is thrown.

## Example

>tip You can declare other views as well, this example adds only the Month and Day views for brevity.

>caption Declare the Month and Day views in the markup

<demo metaUrl="client/scheduler/month/example-1/" height="780"></demo>

## See Also

* [Views](slug:scheduler-views-overview)
* [Navigation](slug:scheduler-navigation)
* [Live Demo: Scheduler Month View](https://demos.telerik.com/blazor-ui/scheduler/month-view)
* [Resource Grouping](slug:scheduler-resource-grouping)
