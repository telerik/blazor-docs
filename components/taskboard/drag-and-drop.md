---
title: Drag and Drop
page_title: TaskBoard Drag and Drop
description: Learn how to enable and disable dragging and reordering of cards and columns in the Telerik Blazor TaskBoard component, also known as a Kanban Board.
slug: taskboard-drag-and-drop
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 20
---

# TaskBoard Drag and Drop

The Telerik TaskBoard for Blazor supports two types of drag-and-drop operations:

* Dragging of Cards to a different column or to a different index in the same column.
* Reordering of Columns.

## Dragging Cards

The ability to move TaskBoard Cards depends on the `CardDraggable` boolean parameter. The feature is enabled by default.

When the user drops a Card to another position (index) or column, the [TaskBoard fires the `OnCardMove` event](slug:taskboard-events#oncardmove). Use the event to update the Card `Index` (order) and `Status` (column).

>caption Using the TaskBoard CardDraggable parameter and OnCardMove event

````RAZOR.skip-repl
<TelerikTaskBoard CardDraggable="true"
                  OnCardMove="@OnTaskBoardCardMove"
                  TItem="@TaskBoardCard" />

@code {
    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        //args.IsCancelled = true;

        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
    }
}
````

See [Creating Blazor TaskBoard](slug:taskboard-overview#creating-blazor-taskboard) and [TaskBoard Events](slug:taskboard-events#example) for full runnable examples.

## Reordering Columns

The ability to reorder TaskBoard Columns depends on the `ColumnReorderable` boolean parameter. The feature is disabled by default.

>caption Using the TaskBoard ColumnReorderable parameter

````RAZOR.skip-repl
<TelerikTaskBoard ColumnReorderable="true" />
````

When the user drops a Column to another position (index), the [TaskBoard fires the `OnColumnReorder` event](slug:taskboard-events#oncolumnreorder). If needed, you can cancel the event to undo the column reordering.

>caption Enable or cancel TaskBoard column reordering

<demo metaUrl="client/taskboard/drag-and-drop/example-1/" height="550"></demo>

## Next Steps

* [Define a TaskBoard toolbar](slug:taskboard-toolbar)
* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)
* [Manage TaskBoard state](slug:taskboard-state)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
