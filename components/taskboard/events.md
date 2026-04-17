---
title: Events
page_title: TaskBoard Events
description: The Telerik TaskBoard
slug: taskboard-events
tags: blazor,taskboard,kanban,events
components: ["taskboard"]
published: True
position: 100
---

# TaskBoard Events

This article describes the available events in the Telerik TaskBoard for Blazor:

* [`OnCardAdd`](#oncardadd)
* [`OnCardClick`](#oncardclick)
* [`OnCardDelete`](#oncarddelete)
* [`OnCardMove`](#oncardmove)
* [`OnCardUpdate`](#oncardupdate)
* [`OnColumnAdd`](#oncolumnadd)
* [`OnColumnDelete`](#oncolumndelete)
* [`OnColumnReorder`](#oncolumnreorder)
* [`OnColumnUpdate`](#oncolumnupdate)
* [`SelectedCardChanged`](#selectedcardchanged)

Most TaskBoard event arguments are generic and depend on the two TaskBoard `@typeparam` types `TItem` and `TColumn`. To overcome a Blazor framework limitation and define events with a simpler syntax, you can set `TItem` and `TColumn` explicitly as in the code snippets below.

## OnCardAdd

The event handler receives a generic [`TaskBoardCardAddEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardAddEventArgs-1) argument.

````RAZOR.skip-repl
<TelerikTaskBoard CardData="@TaskBoardCards"
                  OnCardAdd="@OnTaskBoardCardAdd"
                  TItem="@TaskBoardCard" />

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();

    private void OnTaskBoardCardAdd(TaskBoardCardAddEventArgs<TaskBoardCard> args)
    {
        //args.IsCancelled = true;

        args.Item.Id = 123;

        TaskBoardCards.Add(args.Item);
    }
}
````

Also see the [runnable example](#example) below.

## OnCardClick

The TaskBoard `OnCardClick` event fires when the user:

* Clicks or taps a Card.
* Hits `Enter` while a Card is focused.

The event handler receives a generic [`TaskBoardCardClickEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardClickEventArgs-1) argument.

`OnCardClick` fires after [`SelectedCardChanged`](#selectedcardchanged).

>caption Using the TaskBoard OnCardClick event

````RAZOR.skip-repl
<TelerikTaskBoard OnCardClick="@OnTaskBoardCardClick"
                  TItem="@TaskBoardCard" />

@code {
    private void OnTaskBoardCardClick(TaskBoardCardClickEventArgs<TaskBoardCard> args)
    {
        TaskBoardCard clickedCard = args.Item;
    }
}
````

Also see the [runnable example](#example) below.

## OnCardDelete

The event handler receives a generic [`TaskBoardCardDeleteEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardDeleteEventArgs-1) argument.

>caption Using the TaskBoard OnCardDelete event

````RAZOR.skip-repl
<TelerikTaskBoard CardData="@TaskBoardCards"
                  OnCardDelete="@OnTaskBoardCardDelete"
                  TItem="@TaskBoardCard" />

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();

    private void OnTaskBoardCardDelete(TaskBoardCardDeleteEventArgs<TaskBoardCard> args)
    {
        TaskBoardCards.Remove(args.Item);
    }
}
````
Also see the [runnable example](#example) below.

## OnCardMove

The event handler receives a generic [`TaskBoardCardMoveEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardMoveEventArgs-1) argument.

>caption Using the TaskBoard OnCardMove event

````RAZOR.skip-repl
<TelerikTaskBoard OnCardMove="@OnTaskBoardCardMove"
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
Also see the [runnable example](#example) below.

## OnCardUpdate

The event handler receives a generic [`TaskBoardCardUpdateEventArgs<TItem>`](slug:Telerik.Blazor.Components.TaskBoardCardUpdateEventArgs-1) argument.

>caption Using the TaskBoard OnCardUpdate event

````RAZOR.skip-repl
<TelerikTaskBoard OnCardUpdate="@OnTaskBoardCardUpdate"
                  TItem="@TaskBoardCard" />

@code {
    private void OnTaskBoardCardUpdate(TaskBoardCardUpdateEventArgs<TaskBoardCard> args)
    {
        //args.IsCancelled = true;

        args.OriginalItem.Description = args.Item.Description;
        args.OriginalItem.Title = args.Item.Title;
    }
}
````

Also see the [runnable example](#example) below.

## OnColumnAdd

The event handler receives a generic [`TaskBoardColumnAddEventArgs<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardColumnAddEventArgs-1) argument.

>caption Using the TaskBoard OnColumnAdd event

````RAZOR.skip-repl
<TelerikTaskBoard ColumnData="@TaskBoardColumns"
                  OnColumnAdd="@OnTaskBoardColumnAdd"
                  TColumn="@TaskBoardColumn" />

@code {
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private void OnTaskBoardColumnAdd(TaskBoardColumnAddEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        args.Item.Id = 123;

        TaskBoardColumns.Add(args.Item);
    }
}
````

Also see the [runnable example](#example) below.

## OnColumnDelete

The event handler receives a generic [`TaskBoardColumnDeleteEventArgs<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardColumnDeleteEventArgs-1) argument.

>caption Using the TaskBoard OnColumnDelete event

````RAZOR.skip-repl
<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  OnColumnDelete="@OnTaskBoardColumnDelete"
                  TColumn="@TaskBoardColumn" />

@code {
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private void OnTaskBoardColumnDelete(TaskBoardColumnDeleteEventArgs<TaskBoardColumn> args)
    {
        TaskBoardColumns.Remove(args.Item);

        // Optionally, delete or move all Cards from the column
        TaskBoardCards.RemoveAll(c => c.Status == args.Item.Status);
    }
}
````

Also see the [runnable example](#example) below.

## OnColumnReorder

The event handler receives a generic [`TaskBoardColumnReorderEventArgs<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardColumnReorderEventArgs-1) argument.

>caption Using the TaskBoard OnColumnReorder event

````RAZOR.skip-repl
<TelerikTaskBoard OnColumnReorder="@OnTaskBoardColumnReorder"
                  TColumn="@TaskBoardColumn" />

@code {
    private void OnTaskBoardColumnReorder(TaskBoardColumnReorderEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        Console.WriteLine($"Reordered column {args.Item.Title} from index {args.OldIndex} to index {args.NewIndex}");
    }
}
````

Also see the [runnable example](#example) below.

## OnColumnUpdate

The event handler receives a generic [`TaskBoardColumnUpdateEventArgs<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardColumnUpdateEventArgs-1) argument.

>caption Using the TaskBoard OnColumnUpdate event

````RAZOR.skip-repl
<TelerikTaskBoard ColumnData="@TaskBoardColumns"
                  OnColumnUpdate="@OnTaskBoardColumnUpdate"
                  TColumn="@TaskBoardColumn" />

@code {
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private void OnTaskBoardColumnUpdate(TaskBoardColumnUpdateEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        args.OriginalItem.Title = args.Item.Title;
    }
}
````

Also see the [runnable example](#example) below.

## SelectedCardChanged

The TaskBoard `SelectedCardChanged` event fires when the user selects a card. Use the event if you need to execute related custom logic. Make sure to update the value of the `SelectedCard` parameter in the event handler.

The event handler receives a `TItem` argument that is the newly selected Card data item.

`SelectedCardChanged` fires before [`OnCardClick`](#oncardclick).

````RAZOR.skip-repl
<TelerikTaskBoard SelectedCard="@TaskBoardSelectedCard"
                  SelectedCardChanged="@TaskBoardSelectedCardChanged" />

@code {
    private TaskBoardCard? TaskBoardSelectedCard { get; set; }

    private void TaskBoardSelectedCardChanged(TaskBoardCard? newSelectedCard)
    {
        TaskBoardSelectedCard = newSelectedCard;

        EventHelper = $"Selected card {newSelectedCard?.Title}";
    }
}
````

## Example

>caption Using the TaskBoard events

````RAZOR
<p>Last Event: @TaskBoardEventLog</p>

<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  ColumnReorderable="true"
                  Height="600px"
                  OnCardAdd="@OnTaskBoardCardAdd"
                  OnCardClick="@OnTaskBoardCardClick"
                  OnCardDelete="@OnTaskBoardCardDelete"
                  OnCardMove="@OnTaskBoardCardMove"
                  OnCardUpdate="@OnTaskBoardCardUpdate"
                  OnColumnAdd="@OnTaskBoardColumnAdd"
                  OnColumnDelete="@OnTaskBoardColumnDelete"
                  OnColumnReorder="@OnTaskBoardColumnReorder"
                  OnColumnUpdate="@OnTaskBoardColumnUpdate"
                  SelectedCard="@TaskBoardSelectedCard"
                  SelectedCardChanged="@TaskBoardSelectedCardChanged"
                  TColumn="@TaskBoardColumn"
                  TItem="@TaskBoardCard">
    <TaskBoardToolBar>
        <TaskBoardToolBarAddColumnTool />
    </TaskBoardToolBar>
</TelerikTaskBoard>

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();
    private TaskBoardCard? TaskBoardSelectedCard { get; set; }

    private string TaskBoardEventLog { get; set; } = string.Empty;

    private void OnTaskBoardCardAdd(TaskBoardCardAddEventArgs<TaskBoardCard> args)
    {
        args.Item.Id = ++LastId;

        TaskBoardCards.Add(args.Item);

        TaskBoardEventLog = $"Added card {args.Item.Title}";
    }

    private void OnTaskBoardCardClick(TaskBoardCardClickEventArgs<TaskBoardCard> args)
    {
        TaskBoardEventLog = $"Clicked card {args.Item.Title}";
    }

    private void OnTaskBoardCardDelete(TaskBoardCardDeleteEventArgs<TaskBoardCard> args)
    {
        TaskBoardCards.Remove(args.Item);

        TaskBoardEventLog = $"Deleted card {args.Item.Title}";
    }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        //args.IsCancelled = true;

        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;

        TaskBoardEventLog = $"Moved card {args.Item.Title} from index {args.OldIndex} to index {args.NewIndex} and from status {args.OldStatus} to status {args.NewStatus}";
    }

    private void OnTaskBoardCardUpdate(TaskBoardCardUpdateEventArgs<TaskBoardCard> args)
    {
        //args.IsCancelled = true;

        args.OriginalItem.Description = args.Item.Description;
        args.OriginalItem.Title = args.Item.Title;

        TaskBoardEventLog = $"Updated card {args.Item.Title}";
    }

    private void OnTaskBoardColumnAdd(TaskBoardColumnAddEventArgs<TaskBoardColumn> args)
    {
        args.Item.Id = ++LastId;
        TaskBoardColumns.Add(args.Item);

        TaskBoardEventLog = $"Added column {args.Item.Title}";
    }

    private void OnTaskBoardColumnDelete(TaskBoardColumnDeleteEventArgs<TaskBoardColumn> args)
    {
        TaskBoardColumns.Remove(args.Item);

        // Optionally, delete or move all Cards from the column
        string newCardStatus = TaskBoardColumns.FirstOrDefault()?.Status ?? string.Empty;
        TaskBoardCards.ForEach(c =>
        {
            if (c.Status == args.Item.Status)
            {
                c.Status = newCardStatus;
            }
        });

        TaskBoardEventLog = $"Deleted column {args.Item.Title}";
    }

    private void OnTaskBoardColumnReorder(TaskBoardColumnReorderEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        TaskBoardEventLog = $"Reordered column {args.Item.Title} from index {args.OldIndex} to index {args.NewIndex}";
    }

    private void OnTaskBoardColumnUpdate(TaskBoardColumnUpdateEventArgs<TaskBoardColumn> args)
    {
        //args.IsCancelled = true;

        args.OriginalItem.Title = args.Item.Title;

        TaskBoardEventLog = $"Updated column {args.Item.Title}";
    }

    private void TaskBoardSelectedCardChanged(TaskBoardCard newSelectedCard)
    {
        TaskBoardSelectedCard = newSelectedCard;

        TaskBoardEventLog = $"Selected card {newSelectedCard?.Title}";
    }

    private int LastId { get; set; }

    protected override void OnInitialized()
    {
        int columnsCount = 3;
        int cardsCount = 5;

        for (int i = 1; i <= columnsCount; i++)
        {
            int columnId = ++LastId;

            TaskBoardColumns.Add(new TaskBoardColumn()
            {
                Id = columnId,
                Index = i - 1,
                Status = $"Status {columnId}",
                Title = $"Column {columnId}"
            });
        }

        for (int i = 1; i <= cardsCount; i++)
        {
            string cardStatus = $"Status {(i % columnsCount) + 1}";
            int cardIndex = TaskBoardCards.Where(c => c.Status == cardStatus).Count();
            int cardId = ++LastId;
            
            TaskBoardCards.Add(new TaskBoardCard()
            {
                Description = $"Description {cardId}",
                Id = cardId,
                Index = cardIndex,
                Status = cardStatus,
                Title = $"Card {cardId}"
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
        public int Id { get; set; }
        public int Index { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Width { get; set; } = string.Empty;
        public int? WipLimit { get; set; }
    }
}
````

## See Also

* [TaskBoard Data Binding](slug:taskboard-data-binding)
* [TaskBoard Templates](slug:taskboard-templates)
