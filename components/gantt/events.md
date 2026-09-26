---
title: Events
page_title: Gantt - Events
description: Events of the Gantt for Blazor
slug: gantt-events
tags: telerik,blazor,gantt,events
published: True
position: 25
components: ["gantt"]
---

# Gantt Events

This article explains the events available in the Telerik Gantt for Blazor. They are grouped logically.

* [CUD Event](#cud-events) - events related to Creating, Updating and Deleting items
* [OnExpand and OnCollapse](#onexpand-and-oncollapse) - events related to Expanding and Collapsing Gantt Tree items

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events lets you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` event lets you respond to user actions when they want to edit an item. For example, you can use it to prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Gantt Tree Editing Overview](slug:gantt-tree-editing) article.

## TreeListWidthChanged

The `TreeListWidthChanged` event fires as a response to the user changing the width of the TreeList pane in the splitter.

## OnExpand and OnCollapse

The `OnExpand` and `OnCollapse` events fire as a response to the user expanding and collapsing an item of the Gantt Tree.

The event handlers receive arguments of type `GanttExpandEventArgs` and `GanttCollapseEventArgs` respectively which exposes the following fields:
* `Item` - an object you can cast to your model class to obtain the current data item.
* `ShouldRender` - a boolean field indicating whether the component will re-render.

The `OnCollapse` event fires as a response to the user collapsing an item of the Gantt Tree.


>caption Handle OnExpand and OnCollapse events
<demo metaUrl="client/gantt/events/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Events](https://demos.telerik.com/blazor-ui/gantt/events)