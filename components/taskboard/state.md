---
title: State
page_title: TaskBoard State
description: Learn how to get or set the column state of the Telerik TaskBoard component for Blazor, also known as a Kanban Board.
slug: taskboard-state
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 90
---

# TaskBoard State

The TaskBoard state holds up-to-date information about the component Columns and Cards, and their properties. The component exposes methods to get or set the TaskBoard state at runtime. The TaskBoard state management allows different users to work with a different Column and Card layout if that is necessary.

## Methods

Use the TaskBoard [`GetState()` method](slug:Telerik.Blazor.Components.TelerikTaskBoard-2) to get the [TaskBoard state](slug:Telerik.Blazor.Components.TaskBoardState-1) programmatically at runtime. This allows the app to obtain complete information about the Card and Column layout outside an event handler.

Use the TaskBoard [`SetStateAsync(TaskBoardState<TColumn> state)` asynchronous method](slug:Telerik.Blazor.Components.TelerikTaskBoard-2) and provide a [`TaskBoardState<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardState-1) argument to modify the component state.

The TaskBoard methods require a [component reference](slug:taskboard-overview#taskboard-api), which is populated by Blazor. The earliest time when the component reference is available is in `OnAfterRender` and `OnAfterRenderAsync`. The methods cannot be used earlier.

## Example

>caption Using the TaskBoard state

<demo metaUrl="client/taskboard/state/example-1/" height="550"></demo>

## Next Steps

* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)
* [Use TaskBoard templates](slug:taskboard-templates)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
