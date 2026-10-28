---
title: Overview
page_title: Gantt Chart - Timeline
description: Overview of the Timeline for the Gantt Chart for Blazor.
slug: gantt-timeline
tags: telerik,blazor,gantt,chart,timeline
published: True
position: 0
components: ["gantt"]
---

# Timeline

The Timeline of the Gantt component provides visual representation of the Gantt records in a timeline view. It is configured similarly to a Scheduler Timeline view, where the horizontal dimension is divided into time slots.

The Timeline exposes four predefined [views](slug:gantt-timeline-views), which dictate how much time a single time slot represents. It also includes two rows of hierarchical slot headers, which show the time divisions

It is rendered in the right pane of the Gantt component and allows you to interact with the tasks. You can invoke [editing](slug:gantt-timeline-editing) of a task by double click on it. You can drag it to change the time slot in which it will be displayed. You can resize it or delete it.

You can control the rendering of the tasks and their ToolTip in the Timeline through the [Templates](slug:gantt-timeline-templates) the Gantt exposes. The [`TaskTemplate`](slug:gantt-task-template) will allow to customize the tasks content and the [`ToolTipTemplate`](slug:gantt-tooltip-template) - the rendering of the ToolTip.

>Simple Gantt with Timeline. The result from the snippet below.

<demo metaUrl="client/gantt/overview/example-1/" height="740"></demo>


## See Also

* [Live Demos: Gantt](https://demos.telerik.com/blazor-ui/gantt/overview)