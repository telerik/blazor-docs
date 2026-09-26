---
title: Views
page_title: Timeline Views
description: Templates for the Gantt Chart for Blazor.
slug: gantt-timeline-views
tags: telerik,blazor,gantt,chart,views
published: True
position: 5
components: ["gantt"]
---

# Timeline Views

The Gantt Timeline provides four predefined views, which dictate how much time a single time slot represents:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| View | One Slot Is | Main Header Shows | Secondary Header Shows |
| --- | --- | --- | --- |
| `DayView` | 1 Hour | Day | Hours |
| `WeekView` | 1 Day | Week | Days |
| `MonthView` | 1 Week | Month | Weeks |
| `YearView` | 1 Month | Year | Months |

## Basics

### To use the desired Views for the Timeline:

1. Under the `<GanttViews>` define the desired views. (You should include at least one view that the Timeline will display, otherwise the component will throw an exception).

2. Use the features the views expose to control their setup

>caption Define and configure the Gantt Timeline Views.

<demo metaUrl="client/gantt/views/example-1/" height="740"></demo>


## View Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `SlotWidth` | `double` | The width of each individual slot in pixels. |
| `RangeStart` | `DateTime` | Determines where the view should start. If not provided, the value is calculated based on the data source. If no data is present `DateTime.Now` is used, and the view shows a single major time slot (a day in `DayView`, month in `MonthView` and so on). |
| `RangeEnd` | `DateTime` | Determines where the view should end. If not provided the value is calculated based on the data source. |

## See Also

* [Live Demo: Gantt Views](https://demos.telerik.com/blazor-ui/treelist/editing-inline)