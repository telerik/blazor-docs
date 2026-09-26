---
title: Reorder
page_title: Gantt Tree - Reorder Columns
description: Drag to reorder columns in the Gantt Tree for Blazor.
slug: gantt-columns-reorder
tags: telerik,blazor,gantt,column,reorder,drag
published: True
position: 2
components: ["gantt"]
---

# Reorder Columns

The Gantt Tree lets the user reorder columns by dragging their headers.

To enable column reordering, set the `Reorderable` parameter of the respective `GanttColumn` to `true`.

To prevent the user from moving a certain column, set its own parameter `Reorderable="false"`. Note that the user can still re-arrange other columns around it.

>caption Enable column reordering in Telerik Gantt

<demo metaUrl="client/gantt/reorder/example-1/" height="740"></demo>


## See Also

* [Live Demo: Column Reordering](https://demos.telerik.com/blazor-ui/gantt/column-reordering)
