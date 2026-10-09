---
title: Toolbar
page_title: Scheduler Toolbar
description: Learn how to configure the toolbar of the Scheduler for Blazor.
slug: scheduler-toolbar
tags: telerik,blazor,scheduler,toolbar
published: True
position: 2
components: ["scheduler"]
---

# Scheduler Toolbar

The [Blazor Scheduler toolbar](https://demos.telerik.com/blazor-ui/scheduler/toolbar) can render built-in and custom tools. This article shows how to use and customize the toolbar.

## Built-in Tools

By default, the [Blazor Scheduler](slug:scheduler-overview) displays all its built-in tools in the following order:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Tag | Description |
| --- | --- |
| `SchedulerToolBarNewEventTool` | A button that [opens the Scheduler edit form to add a new appointment](slug:scheduler-appointments-edit). |
| `SchedulerToolBarNavigationTool` | A group of navigation buttons. They can navigate to the present day, to the previous period, and to the next period depending on the [Scheduler view](slug:scheduler-views-overview). |
| `SchedulerToolBarCalendarTool` | A button that shows the start and the end of the current period. Upon click, you can select a new period via a calendar popup. |
| `SchedulerToolBarViewsTool` | A button group or a dropdown (depending on the screen size) with all available views. |

By default, the toolbar also includes spacers (`<SchedulerToolBarSpacerTool />`). They consume the available empty space and push the rest of the tools next to one another.

## Custom Tools

To customize the order of the built-in tools or add a custom tool, define the `<SchedulerToolBar>` child tag in the Scheduler. To add a custom tool use the nested `<SchedulerToolBarCustomTool>` tag of the `<SchedulerToolBar>` tag. The `<SchedulerToolBarCustomTool>` is a standard Blazor `RenderFragment`. See the example below.


## Toolbar Configuration

Add a `<SchedulerToolBar>` tag inside `<TelerikScheduler>` to configure the toolbar, for example:

* Arrange the Scheduler tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the Scheduler toolbar

<demo metaUrl="client/scheduler/toolbar/example-1/" height="780"></demo>

## See Also

* [Scheduler Live Demo](https://demos.telerik.com/blazor-ui/scheduler/overview)
* [Scheduler Toolbar Demo](https://demos.telerik.com/blazor-ui/scheduler/toolbar)
