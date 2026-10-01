---
title: Zooming
page_title: Gantt Timeline - Zooming 
description: Zooming for the Gantt Chart for Blazor.
slug: gantt-timeline-zootofit
tags: telerik,blazor,gantt,timeline,zoom
published: True
position: 20
components: ["gantt"]
---

# Zoom for the Gantt Timeline

You can change the starting point of the Gantt Timeline view through the `RangeSnapTo`. By default, the range of the view is calculated based on major slot division.

The `RangeSnapTo` parameter receives an argument of type `GanttRangeSnapTo` which exposes two enum values:
* `MajorSlot`(default value) - dates are calculated based on the nearest major slot division of the view.
* `MinorSlot` - dates are calculated based on the nearest minor slot division of the view.

>caption Change the timeline view based to the minor slot
<demo metaUrl="client/gantt/zooming/example-1/" height="740"></demo>


## See Also

* [Live Demo: Gantt Zooming](https://demos.telerik.com/blazor-ui/gantt/zooming)