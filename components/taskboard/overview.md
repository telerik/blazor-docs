---
title: Overview
page_title: TaskBoard Overview
description: The Telerik TaskBoard
slug: taskboard-overview
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 0
---

# Blazor TaskBoard Overview

asdfasd

## Creating Blazor TaskBoard

1. Add a `<TelerikTaskBoard>` tag to your Razor file.
1. Set the `CardData` parameter to an `IEnumerable<TItem>` of your Card objects. The TaskBoard automatically recognizes [Card property names](slug:taskboard-data-binding#default-property-names) like `Title`, `Description`, `Status` and a few others.
1. Set the `ColumnData` parameter to an `IEnumerable<TColumn>` of your Column objects. The TaskBoard automatically recognizes [Column property names](slug:taskboard-data-binding#default-property-names) like `Title`, `Index`, `Status` and a few others.
1. Set Card `Status` values that match the desired Column `Status` values.
1. (optional) Set `TItem` and `TColumn` to your Card and Column model types to simplify the event definition syntax.
1. Subscribe to the [`OnCardMove` event](slug:taskboard-events#oncardmove) to update the `CardData` collection when users drag Cards across different Columns.
1. (optional) Set the TaskBoard `Priorities` parameter to a [`List<TaskBoardCardPriority>`](slug:Telerik.Blazor.Components.TaskBoardCardPriority). Set Card `Priority` values that match the desired [`TaskBoardCardPriority` `Value`](slug:Telerik.Blazor.Components.TaskBoardCardPriority).
1. (optional) Define `TaskBoardCardSettings` and `TaskBoardColumnSettings`, for example, a Column `Width`.

````RAZOR
<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  Height="480px"
                  OnCardMove="@OnTaskBoardCardMove"
                  Priorities="@TaskBoardPriorities"
                  TColumn="@TaskBoardColumn"
                  TItem="@TaskBoardCard">
    <TaskBoardSettings>
        <TaskBoardCardSettings Buttons="@TaskBoardCardButtons.None" />
        <TaskBoardColumnSettings Buttons="@TaskBoardColumnButtons.None" Width="240px" />
    </TaskBoardSettings>
</TelerikTaskBoard>

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new List<TaskBoardCard>();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new List<TaskBoardColumn>();

    private List<TaskBoardCardPriority> TaskBoardPriorities { get; set; } = new List<TaskBoardCardPriority>()
        {
            new TaskBoardCardPriority() { Text = "Low", Value = "low", Color = "var(--kendo-color-success)" },
            new TaskBoardCardPriority() { Text = "Normal", Value = "normal", Color = "var(--kendo-color-info)" },
            new TaskBoardCardPriority() { Text = "Medium", Value = "medium", Color = "var(--kendo-color-warning)"},
            new TaskBoardCardPriority() { Text = "High", Value = "high", Color = "var(--kendo-color-error)" }
        };

    private int LastId { get; set; }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
    }

    protected override void OnInitialized()
    {
        int columnsCount = 3;
        int cardsCount = 4;

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
                Priority = TaskBoardPriorities[i % TaskBoardPriorities.Count].Value,
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

## Cards and Columns

The main UI elements in the Blazor TaskBoard are Cards and Columns.

## TaskBoard Reference and Methods

Add a reference to the component instance to use the [TaskBoard's methods](slug:Telerik.Blazor.Components.TelerikTaskBoard-2). Note that the [TaskBoard is a generic component](slug:common-features-data-binding-overview#component-type). Its Card and Column model types must be part of the component reference definition.

The earliest possible time to use Blazor component references is in `OnAfterRender` or `OnAfterRenderAsync`.

````RAZOR.skip-repl
<TelerikTaskBoard @ref="@TaskBoardRef">

@code {
    private TelerikTaskBoard<TaskBoardCard, TaskBoardColumn>? TaskBoardRef;
}
````

## Next Steps

* []()

## See Also

* []()