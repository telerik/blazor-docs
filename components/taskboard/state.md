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

````RAZOR
@using System.Text.Json

<TelerikButton OnClick="@OnSaveStateButtonClick">Save State</TelerikButton>
<TelerikButton OnClick="@OnLoadStateButtonClick">Load State</TelerikButton>
<TelerikButton OnClick="@OnResetColumnsButtonClick">Reset Columns</TelerikButton>
<TelerikButton OnClick="@OnResetCardsButtonClick">Reset Cards</TelerikButton>

<div style="display: flex; gap: 1em;">
    <TelerikTaskBoard @ref="TaskBoardRef"
                    CardData="@TaskBoardCards"
                    ColumnData="@TaskBoardColumns"
                    ColumnReorderable="true"
                    Height="80vh"
                    OnCardMove="@OnTaskBoardCardMove"
                    OnColumnReorder="@OnTaskBoardColumnReorder"
                    Priorities="@TaskBoardPriorities"
                    TColumn="@TaskBoardColumn"
                    TItem="@TaskBoardCard">
        <TaskBoardSettings>
            <TaskBoardCardSettings Buttons="@TaskBoardCardButtons.None" />
            <TaskBoardColumnSettings Buttons="@TaskBoardColumnButtons.None" Width="180px" />
        </TaskBoardSettings>
    </TelerikTaskBoard>

    <pre style="flex: 0 0 300px; max-height: 80vh; overflow: auto; border: 1px solid var(--kendo-color-border); padding: 1em;">
        @JsonSerializer.Serialize(TaskBoardState, new JsonSerializerOptions { WriteIndented = true })
    </pre>
</div>

@code {
    private TelerikTaskBoard<TaskBoardCard, TaskBoardColumn>? TaskBoardRef;

    private TaskBoardState<TaskBoardColumn>? TaskBoardState { get; set; }
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private List<TaskBoardCardPriority> TaskBoardPriorities { get; set; } = new()
        {
            new() { Text = "Low", Value = "low", Color = "var(--kendo-color-success)" },
            new() { Text = "Normal", Value = "normal", Color = "var(--kendo-color-info)" },
            new() { Text = "Medium", Value = "medium", Color = "var(--kendo-color-warning)"},
            new() { Text = "High", Value = "high", Color = "var(--kendo-color-error)" }
        };

    private int LastId { get; set; }

    private void OnSaveStateButtonClick()
    {
        if (TaskBoardRef is null)
        {
            return;
        }

        TaskBoardState = TaskBoardRef.GetState();
    }

    private async Task OnLoadStateButtonClick()
    {
        if (TaskBoardRef is null)
        {
            return;
        }

        await TaskBoardRef.SetStateAsync(TaskBoardState);
    }

    private async Task OnResetColumnsButtonClick()
    {
        if (TaskBoardRef is null)
        {
            return;
        }

        TaskBoardState = TaskBoardRef.GetState();

        int columnIndex = 0;

        TaskBoardState.ColumnStates
            .OrderBy(x => x.Status)
            .ToList()
            .ForEach(x => x.Index = columnIndex++);

        await TaskBoardRef.SetStateAsync(TaskBoardState);
    }

    private async Task OnResetCardsButtonClick()
    {
        if (TaskBoardRef is null)
        {
            return;
        }

        TaskBoardState = TaskBoardRef.GetState();

        int cardIndex = 0;

        TaskBoardState.CardStates
            .OrderBy(x => x.Id)
            .ToList()
            .ForEach(x => { x.Status = "status-1"; x.Index = cardIndex++; });

        await TaskBoardRef.SetStateAsync(TaskBoardState);
    }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
    }

    private void OnTaskBoardColumnReorder(TaskBoardColumnReorderEventArgs<TaskBoardColumn> args)
    {
        args.Item.Index = args.NewIndex;
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
                Status = $"status-{columnId}",
                Title = $"Column {columnId}"
            });
        }

        for (int i = 1; i <= cardsCount; i++)
        {
            int cardId = ++LastId;
            string cardStatus = $"status-1";
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

## Next Steps

* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)
* [Use TaskBoard templates](slug:taskboard-templates)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
