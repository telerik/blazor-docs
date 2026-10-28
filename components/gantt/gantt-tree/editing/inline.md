---
title: Inline Editing
page_title: Gantt Tree - Inline Editing
description: Inline (row) editing of data in Gantt Tree for Blazor.
slug: gant-tree-inline-editing
tags: telerik,blazor,gantt,inline,editing
published: True
position: 10
components: ["gantt"]
---

# Gantt Tree Inline Editing

Inline editing lets the user click an [Edit command button](slug:gantt-columns-command) on the row, and all its editable columns open up for changes. They can then click a `Save` command button to submit the changes to the data access layer. This fires the `OnUpdate` event where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service).

In a similar fashion, the `Cancel` and `Delete` command buttons fire events to let you handle the data source operations.

When validation is not satisfied, clicking the Save, Delete or Add buttons will not have effect, but you can still navigate between all fields in the row to complete editing.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Inline editing in the Gantt Tree, set its `TreeListEditMode` property to `GanttTreeListEditMode.Inline`, then handle the CRUD events as shown in the example below.

## New Row Position

To control whether a newly added item appears at the top or bottom of the Gantt Tree, set the `NewRowPosition` parameter.

The `NewRowPosition` parameter accepts values from the `GanttTreeListNewRowPosition` enum:

* `Top` (default)&mdash;Inserts the new item at the top of the view.
* `Bottom`&mdash;Inserts the new item at the bottom of the view.

>caption The Command buttons and the Gantt events let you handle data operations in Inline edit mode.

<demo metaUrl="client/gantt/inline/example-1/" height="740"></demo>

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## See Also

* [Live Demo: Gantt Inline Editing](https://demos.telerik.com/blazor-ui/gantt/editing-inline)
   
