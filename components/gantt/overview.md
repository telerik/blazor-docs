---
title: Overview
page_title: Gantt Chart Overview
description: Overview of the Gantt Chart for Blazor.
slug: gantt-overview
tags: telerik,blazor,gantt,overview
published: True
position: 0
components: ["gantt"]
---

# Blazor Gantt Component Overview

The <a href = "https://www.telerik.com/blazor-ui/gantt" target="_blank">Blazor Gantt Chart component</a> allows you to easily illustrate a collection of tasks. The component consists of two areas: 

* The [Gantt Tree](slug:gantt-tree) hosts hierarchical information on the tasks, their start and end time.
* The [Timeline](slug:gantt-timeline) view illustrates the time-frame and the completeness of the task.

When the data collection is passed to the [Gantt Tree](slug:gantt-tree), the component will automatically render the necessary elements in the [Timeline](slug:gantt-timeline).

## Creating Blazor Gantt

1. Add the `TelerikGantt` tag to a Razor file.

2. Set its `Data` attribute to the variable that will hold your collection of data.

3. Set the component dimensions through the `Width` and `Height` properties.

4. Under its `GanttViews` tag, set the desired [views](slug:gantt-timeline-views).

5. Under its `GanttColumns` tag, set the desired [`GanttColumn`](slug:gantt-columns-bound) instances whose `Field` property points to the name of the model field that you want to show.

6. Handle [`OnUpdate` and `OnDelete`](slug:gantt-events) events to react to items changes.

>caption Basic configuration of the Gantt Chart.

<demo metaUrl="client/gantt/overview/example-2/" height="740"></demo>

## Data Binding

To show data in a Telerik Gantt Chart, define [GanttColumn](slug:gantt-columns-bound) instances - they take a model `Field` and expose settings to control the [visibility](slug:gantt-columns-visible) of the column, the [format of the displayed data](slug:gantt-columns-displayformat), and the text alignment.

>tip The Telerik Blazor Gantt Chart is data source agnostic - you can use any database and service according to your project, you only need to get the collection of data models to the Gantt Chart in the view-model of the component hosting it.

The following list of resources provides examples for data binding a Gantt Chart in various scenarios:

* General information on how data binding works - [Gantt Chart Data Binding Overview](slug:gantt-data-binding-overview).

* Binding to a self-referencing flat data source - [Bind the Gantt Chart to Flat Self-Referencing Data](slug:gantt-data-binding-flat-data).

* Using hierarchical data source with item collections nested in each item - [Bind the Gantt Chart to Hierarchical Data](slug:gantt-data-binding-hierarchical-data).

## Editing

The Gantt Chart can perform CRUD operations on its current data collection and exposes events that let you control the operations and transfer changes to the actual data source. The component allows you to edit both the tasks in the [TreeList](slug:gantt-tree-editing) and their respective representation in the [Timeline](slug:gantt-timeline-editing).

## Sorting

The Gantt Chart can sort data automatically. [Read more about the Blazor Gantt sorting](slug:gantt-sorting).

## Filtering

The Gantt Chart can filter data automatically. [Read more about the Blazor Gantt filtering](slug:gantt-filtering-overview).

## Templates

The Blazor Gantt component exposes templates for customizing the [Timeline](slug:gantt-timeline) items rendering. [Read more about the Blazor Gantt templates](slug:gantt-timeline-templates).

## Toolbar

The Blazor Gantt component has a dedicated toolbar for defining user actions.

## Scrolling

When the total column width exceeds the width of the Gantt Chart, you will get a horizontal scrollbar.
When the height of the rows exceeds the height of the Gantt Chart, you will get a vertical scrollbar.

## Gantt Tree

The Gantt Tree is the left part of the Gantt Chart. The part to provide data through its data binding options. [Read more about the Blazor Gantt Tree](slug:gantt-tree).

## Gantt Timeline

The Gantt Timeline provides visual representation of the Gantt records in a timeline view. The right part of the component. It is configured similarly to a [Scheduler Timeline](slug:scheduler-views-timeline) view. [Read more about the Blazor Gantt Timeline](slug:gantt-timeline).

## Gantt Dependencies

The Blazor Gantt allows defining dependencies, which are rendered in the [Timeline](slug:gantt-timeline) section of the component. A dependency represents a relation between two tasks. [Read more about the Blazor Gantt Dependencies](slug:gantt-dependencies-overview).

## Events

The Blazor Gantt fires CUD, expand/collapse, and TreeList pane width change events. Handle those events to respond to user actions. [Read more about the Blazor Gantt events](slug:gantt-events).

## Gantt Reference and Methods

To execute Gantt methods, obtain reference to the component instance via `@ref`.

The Gantt is a generic component. Its type depends on the type of its model and the type of its `Value`. In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters](slug:common-features-data-binding-overview#component-type).

The table below lists the Gantt methods. Also consult the [Gantt API](slug:Telerik.Blazor.Components.TelerikGantt-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `Rebind` | [Refreshes the component data](slug:gantt-refresh-data#rebind-method). |

<div class="skip-repl"></div>
<demo metaUrl="client/gantt/overview/example-1/" height="740"></demo>

## Next Steps

[Bind the Gantt to Data](slug:gantt-data-binding-overview)

[Explore the Gantt Tree](slug:gantt-tree)

[Explore the Gantt Timeline](slug:gantt-timeline)

[Handle the Gantt Events](slug:gantt-events)

## See Also

* [Live Demos: Gantt](https://demos.telerik.com/blazor-ui/gantt/overview)
* [Gantt API Reference](slug:Telerik.Blazor.Components.TelerikGantt-1)
