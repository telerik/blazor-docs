---
title: Date Header
page_title: Date Header
description: Date header templates for the Gantt Timeline 
slug: gantt-dateheader-template
tags: telerik,blazor,gantt,dateheader,template
published: True
position: 5
components: ["gantt"]
---

# Date Header

The `Date Header` provides you with full control over the rendering for each header view slot of the Timeline. The Date Header templates will be implemented inside the settings of the corresponding view parent tag.

| GanttViews | Major slot header| Minor slot header|
| ----------- | ----------- | ----------- |
| `DayView` | `DayHeaderTemplate` | `TimeHeaderTemplate` |
| `WeekView` | `WeekHeaderTemplate` | `DayHeaderTemplate` |
| `MonthView` | `MonthHeaderTemplate` | `WeekHeaderTemplate` |
| `YearView` | `YearHeaderTemplate` | `MonthHeaderTemplate` |

The templates are `RenderFragment<DateTime>`, so the `context` is of type `DateTime`.
When both `Template` and [`DateFormat`](slug:gantt-columns-dateformat) are specified, the `Template` will be rendered. 


### Notes

The `CurrentInfo.CurrentCulture` is used when rendering the formats, so if you need specific formats for specific users, you must set the culture of the app accordingly.

### Example

>caption Customize the date header of each slot of the timeline.

<demo metaUrl="client/gantt/dateheader/example-1/" height="740"></demo>


## See Also

* [Live Demo: Gantt Templates](https://demos.telerik.com/blazor-ui/gantt/templates)