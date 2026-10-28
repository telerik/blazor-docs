---
title: Overview
page_title: TaskBoard Overview
description: Learn the basics of the Telerik TaskBoard component for Blazor, also known as a Kanban Board. See an overview of the component features and functionality.
slug: taskboard-overview
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 0
---

# Blazor TaskBoard Overview

The [Telerik TaskBoard component for Blazor](https://www.telerik.com/blazor-ui/taskboard), also known as a Kanban Board, displays task and progress information as cards in a column layout. Users can drag and drop Cards to update their status, or create, edit, and delete Cards and Columns. The TaskBoard component also supports flexible data binding, column reordering, templates, custom toolbar tools, and various events.

## Creating Blazor TaskBoard

1. Add a `<TelerikTaskBoard>` tag to your Razor file.
1. Set the `CardData` parameter to an `IEnumerable<TItem>` of your Card objects. The TaskBoard automatically recognizes [Card property names](slug:taskboard-data-binding#default-property-names) like `Title`, `Description`, `Status` and a few others.
1. Set the `ColumnData` parameter to an `IEnumerable<TColumn>` of your Column objects. The TaskBoard automatically recognizes [Column property names](slug:taskboard-data-binding#default-property-names) like `Title`, `Index`, `Status` and a few others.
1. Set Card `Status` values that match the desired Column `Status` values.
1. (optional) Set `TItem` and `TColumn` to your Card and Column model types to simplify the event definition syntax.
1. Subscribe to the [`OnCardMove` event](slug:taskboard-events#oncardmove) to update the `CardData` collection when users drag Cards across different Columns.
1. (optional) Set the TaskBoard `Priorities` parameter to a [`List<TaskBoardCardPriority>`](slug:Telerik.Blazor.Components.TaskBoardCardPriority). Set Card `Priority` values that match the desired [`TaskBoardCardPriority` `Value`](slug:Telerik.Blazor.Components.TaskBoardCardPriority).
1. (optional) Define `TaskBoardCardSettings` and `TaskBoardColumnSettings`, for example, a Column `Width`.

<demo metaUrl="client/taskboard/overview/example-1/" height="550"></demo>

## Cards and Columns

The main UI elements in the Blazor TaskBoard are Cards and Columns.

## Drag and Drop

The UX milestone of the TaskBoard component is the user ability to [drag Cards from one column to another](slug:taskboard-drag-and-drop#dragging-cards). Users can also [reorder Columns](slug:taskboard-drag-and-drop#reordering-columns), which is less common and disabled by default.

## ToolBar

The [TaskBoard ToolBar](slug:taskboard-toolbar) allows you to add built-in and custom tools above the Columns. The built-in tools include the ability to add new Columns or search Cards by their title or description.

## Editing

Depending on the TaskBoard configuration, users can [create, update, and delete Cards and Columns](slug:taskboard-editing).

## Templates

The TaskBoard templates allow you to [customize the content of Cards, Column headers, and Card edit form](slug:taskboard-templates).

## Events

The [TaskBoard exposes a variety of Card and Column related events](slug:taskboard-events) that enable the app to detect and react to user actions.

## TaskBoard API

Consult the [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2) to see all available component parameters, methods, and events.

Use `@ref` to add a reference to the component instance and use the TaskBoard methods. Note that the [TaskBoard is a generic component](slug:common-features-data-binding-overview#component-type). Its Card and Column model types must be part of the component reference definition.

The earliest possible time to use Blazor component references is in `OnAfterRender` or `OnAfterRenderAsync`.

````RAZOR.skip-repl
<TelerikTaskBoard @ref="@TaskBoardRef">

@code {
    private TelerikTaskBoard<TaskBoardCard, TaskBoardColumn>? TaskBoardRef;
}
````

## Next Steps

* [Bind TaskBoard to Cards and Columns](slug:taskboard-data-binding)
* [Learn about TaskBoard drag and drop](slug:taskboard-drag-and-drop)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
