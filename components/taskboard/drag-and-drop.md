---
title: Drag and Drop
page_title: TaskBoard Drag and Drop
description: The Telerik TaskBoard
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

When the user drops a Card to another position (index) or column, the [TaskBoard fires the `OnCardMove` event](slug:taskboard-events#oncardmove).

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

## Reordering Columns

The ability to reorder TaskBoard Columns depends on the `ColumnReorderable` boolean parameter. The feature is disabled by default.

>caption Using the TaskBoard ColumnReorderable parameter

````RAZOR.skip-repl
<TelerikTaskBoard ColumnReorderable="true" />
````

When the user drops a Column to another position (index), the [TaskBoard fires the `OnColumnReorder` event](slug:taskboard-events#oncolumnreorder).

````RAZOR.skip-repl
<TelerikTaskBoard ColumnReorderable="true"
                  OnColumnReorder="@OnTaskBoardColumnReorder"
                  TColumn="@TaskBoardColumn" />

@code {
    private void OnTaskBoardColumnReorder(TaskBoardColumnReorderEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        Console.WriteLine($"Reordered column {args.Item.Title} from index {args.OldIndex} to index {args.NewIndex}");
    }
}
````

## Next Steps

* [Configure the TaskBoard ToolBar](slug:taskboard-toolbar)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
