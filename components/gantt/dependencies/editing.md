---
title: Editing
page_title: Gantt Dependencies - Editing
description: Create and Delete Dependencies.
slug: gantt-dependencies-editing
tags: telerik,blazor,gantt,chart,dependency,edit,editing,dependencies
published: True
position: 15
components: ["gantt"]
---

# Dependencies Editing

The Gantt Chart component allows you delete its dependencies and create new ones. It exposes dedicated events for dependency editing that you can use to transfer the changes to the underlying data source.

## Basics

This section explains the available events that you need to use for creating and deleting the Gantt dependencies. After that, you will find a code example.

The Gantt provides the following dependency events:

* `OnCreate` fires when the users drag the dependency handle of a task from one end point to another and thus create a new dependency. It provides a `GanttDependencyCreateEventArgs` object that contains the currently created dependency.
* `OnDelete` fires when the users deletes a dependency. To delete a dependency the user should select it using the mouse and press the `Delete` keyboard button. It provides a `GanttDependencyDeleteEventArgs` object that contains the currently deleted dependency in the `Item` field that you can cast to your model.

## Example

<demo metaUrl="client/gantt/editing/example-1/" height="740"></demo>
