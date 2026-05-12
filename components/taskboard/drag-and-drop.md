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

````RAZOR
<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@TaskBoardColumnReorderable" />
    Allow Column Reordering
</label>

<br />

<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@ShouldCancelColumnReordering" />
    Cancel <code>OnColumnReorder</code> Event
</label>

<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  ColumnReorderable="@TaskBoardColumnReorderable"
                  Height="240px"
                  OnCardMove="@OnTaskBoardCardMove"
                  OnColumnReorder="@OnTaskBoardColumnReorder"
                  TColumn="@TaskBoardColumn"
                  TItem="@TaskBoardCard">
    <TaskBoardSettings>
        <TaskBoardCardSettings Buttons="@TaskBoardCardButtons.None" />
        <TaskBoardColumnSettings Buttons="@TaskBoardColumnButtons.None" Width="240px" />
    </TaskBoardSettings>
</TelerikTaskBoard>

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private bool TaskBoardColumnReorderable { get; set; } = true;
    private bool ShouldCancelColumnReordering { get; set; }

    private int LastId { get; set; }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
    }

    private void OnTaskBoardColumnReorder(TaskBoardColumnReorderEventArgs<TaskBoardColumn> args)
    {
        args.IsCancelled = ShouldCancelColumnReordering;

        Console.WriteLine($"Reordered column {args.Item.Title} from index {args.OldIndex} to index {args.NewIndex}");
    }

    protected override void OnInitialized()
    {
        int columnsCount = 3;
        int cardsCount = 3;

        for (int i = 1; i <= columnsCount; i++)
        {
            int columnId = ++LastId;

            TaskBoardColumns.Add(new TaskBoardColumn()
            {
                Index = i - 1,
                Status = $"Status {columnId}",
                Title = $"Column {columnId}"
            });
        }

        for (int i = 1; i <= cardsCount; i++)
        {
            int cardId = ++LastId;
            string cardStatus = $"Status {(i % columnsCount) + 1}";
            int cardIndex = TaskBoardCards.Where(c => c.Status == cardStatus).Count();
            
            TaskBoardCards.Add(new TaskBoardCard()
            {
                Description = $"Description {i}",
                Id = cardId,
                Index = cardIndex,
                Status = cardStatus,
                Title = $"Card {i}"
            });
        }

        base.OnInitialized();
    }

    public class TaskBoardCard
    {
        public string Description { get; set; } = string.Empty;
        public int Id { get; set; }
        public int Index { get; set; }
        public string Priority { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }

    public class TaskBoardColumn
    {
        public TaskBoardColumnButtons? Buttons { get; set; }
        public bool Enabled { get; set; } = true;
        public int Index { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Width { get; set; } = string.Empty;
        public int? WipLimit { get; set; }
    }
}
````

## Next Steps

* [Define a TaskBoard toolbar](slug:taskboard-toolbar)
* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)
* [Manage TaskBoard state](slug:taskboard-state)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
