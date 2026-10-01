---
title: InCell Editing
page_title: Gantt Tree - InCell Editing
description: InCell editing of data in Gantt Tree for Blazor.
slug: gant-tree-incell-editing
tags: telerik,blazor,gantt,incell,editing
published: True
position: 20
components: ["gantt"]
---

# Gantt Tree InCell Editing

InCell editing is the default mode of Gantt Tree. InCell allows the user to click cells and type new values immediately like in Excel. There is no need for Edit, Update and Cancel buttons.

Users can use the `Tab`, `Shift+Tab` and `Enter` keys to move between edited cells quickly. If validation is not satisfied, the user cannot exit edit mode, unless they satisfy validation, or cancel changes by pressing `Esc`.

Command columns and non-editable columns are skipped while tabbing.

The InCell edit mode provides a specific user experience and behaves differently than other edit modes. Please review the notes below to get a better understanding of these specifics.

## New Row Position

To control whether a newly added item appears at the top or bottom of the Gantt Tree, set the `NewRowPosition` parameter.

The `NewRowPosition` parameter accepts values from the `GanttTreeListNewRowPosition` enum:

* `Top` (default)&mdash;Inserts the new item at the top of the view.
* `Bottom`&mdash;Inserts the new item at the bottom of the view.

### Note
It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

>caption InCell Editing Example.

<demo metaUrl="client/gantt/incell/example-1/" height="740"></demo>


## See Also

* [Live Demo: Gantt InCell Editing](https://demos.telerik.com/blazor-ui/gantt/editing-incell)
