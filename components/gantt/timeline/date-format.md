---
title: Date Format
page_title: Gantt Tree - Date Format
description: Date format of headers of the Gantt Timeline for Blazor.
slug: gantt-columns-dateformat
tags: telerik,blazor,gantt,column,date,format
published: True
position: 16
components: ["gantt"]
---

# Date Header Format

You can set a date format to the timeline major and minor slot headers. 

To set the desired date format, use the parent tag of each view in the timeline.

All parameters are of type `string`. 

| GanttViews | Major slot header| Minor slot header|
| ----------- | ----------- | ----------- |
| `DayView` | `DayHeaderDateFormat` | `TimeHeaderDateFormat` |
| `WeekView` | `WeekHeaderDateFormat` | `DayHeaderDateFormat` |
| `MonthView` | `MonthHeaderDateFormat` | `WeekHeaderDateFormat` |
| `YearView` | `YearHeaderDateFormat` | `MonthHeaderDateFormat` |


## Example

<demo metaUrl="client/gantt/date-format/example-1/" height="740"></demo>


