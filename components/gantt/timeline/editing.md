---
title: Editing
page_title: Timeline Editing
description: Tasks Editing in the Gantt Timeline
slug: gantt-timeline-editing
tags: telerik,blazor,gantt,task,editing
published: True
position: 10
components: ["gantt"]
---

# Timeline Editing

The Gantt component allows you to initiate editing from its Timeline component in several ways. The updates will be accordingly applied in both Gantt components - Gantt Tree and Timeline.

* [Popup Editing](#popup-editing)

* [Drag Tasks](#drag-tasks)

* [Resize Tasks](#resize-tasks)

* [Drag Handle](#drag-handle)

* [Delete Tasks](#delete-tasks)


>caption Edit the Gantt records from the Timeline by double clicking on a task, drag, resize or delete it.

<demo metaUrl="client/gantt/editing/example-1/" height="740"></demo>

## Popup Editing

You can invoke popup editing of a task by double clicking on it. A Popup container will be displayed containing only the default editors associated with a Gantt Task. No additional fields defined in the Gantt will be editable through this form.

If you have set the corresponding handlers, you will be able to Save or Cancel the editing operation, or Delete the record.

## Drag Tasks

The Gantt allows you to horizontally drag the tasks in the Timeline component. Once the task is dropped in the desired slot, its Start and End fields in the Gantt Tree will be updated. Tasks editing through dragging can be applied to all kinds of tasks (regular, summary and milestone).

## Resize Tasks

You are able to resize the tasks by expanding and collapsing their width through side handles. Thus, you can update the Start/End time of a certain task as well as its duration. Once the handles are released, the Start and End fields of the task in the Gantt Tree will be updated. Tasks editing through resizing can be applied only to the regular tasks.

## Drag Handle

When a task is hovered a drag handle is rendered underneath its status bar. It allows you to drag it and thus update the completeness of the task. Once the handle is dropped, the Percent Complete field of the Gantt will be updated for the corresponding task. Updating the task status can be applied only to the regular tasks.

## Delete Tasks

By default, a delete button is rendered on the right side of a task when it is hovered. Pressing it will delete the corresponding task from the Timeline and Tree components.

## See Also

* [Live Demo: Gantt Editing](https://demos.telerik.com/blazor-ui/gantt/editing-incell)