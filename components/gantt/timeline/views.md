---
title: Templates
page_title: Gantt Chart - Templates
description: Templates for the Gantt Chart for Blazor.
slug: gantt-timeline-templates
tags: telerik,blazor,gantt,chart,templates
published: True
position: 0
---

# Templates for the Gantt Timeline

The Gantt Timeline provides four predefined views, which dictate how much time a single time slot represents:

* `DayView` - each slot is a single hour. Main Header row shows the day, and the secondary row shows each hour slot.

* `WeekView` - each slot is a single day. Main Header row shows the week, and the secondary row shows each day slot.

* `MonthView` - each slot is a whole week. Main Header row shows the month, and the secondary row shows each week slot.

* `YearView` - each slot is whole month. Main Header row shows the year, and the secondary row shows each month slot.

## Basics

## To use the desired Views for the Timelene:

1. Under the `<GanttViews>` define the desired views. (You should include at least one view that the Timeline will display, otherwise the component will throw an exception).

2. Use the features the views expose to control their setup

>caption Define and configure the Gantt Timeline Views. The result from the snippet


````CSHTML

````



## Features

* `SlotWidth` - `double` - the width of each individual slot in pixels.

* `RangeStart` - `DateTime` - determines where the view should start. If not provided, the value is calculated based on the data source. If no data is present `DateTime.Now` is used, and the view shows a single major time slot (a day in `DayView`, month in `MonthView` and so on).

* `RangeEnd` - `DateTime` - determines where the view should end. If not provided the value is calculated based on the data source.

## See Also

  * [Live Demo: Gantt Views](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
 