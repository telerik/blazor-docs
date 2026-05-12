---
title: ToolBar
page_title: TaskBoard ToolBar
description: Learn how to configure a toolbar in the Telerik TaskBoard component for Blazor, also known as a Kanban Board. See how to use built-in and custom tools.
slug: taskboard-toolbar
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 30
---

# TaskBoard ToolBar

The TaskBoard toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool&nbsp;Name | Tool Tag | Description |
| --- | --- | --- |
| Add&nbsp;Column | `<TaskBoardToolBarAddColumnTool/>` | A button that appends a new TaskBoard Column to the last position and allows the user to input a Column `Title`. The tool fires the [`OnColumnCreate` event](slug:taskboard-events#oncolumncreate). See the [`TaskBoardToolBarAddColumnTool` API reference](slug:Telerik.Blazor.Components.TaskBoardToolBarAddColumnTool) for the available parameters. |
| Search&nbsp;Box | `<TaskBoardToolBarSearchBoxTool/>` | A textbox that filters Cards by their Description with a `Contains` operator. See the [`TaskBoardToolBarSearchBoxTool` API reference](slug:Telerik.Blazor.Components.TaskBoardToolBarSearchBoxTool) for the available parameters. |
| Separator | `<TaskBoardToolBarSeparatorTool/>` | A vertical line for better visualization of adjacent tools. |
| Spacer | `<TaskBoardToolBarSpacerTool/>` | Empty space that expands to occupy the available space and pushes the tools on either side as far as possible. You can use multiple spacer tools between the other tools. |

>caption Using built-in TaskBoard tools

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardToolBar>
        <TaskBoardToolBarAddColumnTool />
        <TaskBoardToolBarSeparatorTool />
        <TaskBoardToolBarSearchBoxTool />
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

## Custom Tools

In addition to built-in tools, the TaskBoard also supports custom tools. Use the `<TaskBoardToolBarCustomTool>` tag and add HTML or Razor markup as child content.

>caption Using custom TaskBoard tools

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardToolBar>
        <TaskBoardToolBarCustomTool>
            <TelerikButton>Custom TaskBoard Button</TelerikButton>
        </TaskBoardToolBarCustomTool>
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

## Example

````RAZOR
<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  Height="96vh"
                  OnCardMove="@OnTaskBoardCardMove"
                  TColumn="@TaskBoardColumn"
                  TItem="@TaskBoardCard">
    <TaskBoardSettings>
        <TaskBoardCardSettings Buttons="@TaskBoardCardButtons.None" />
        <TaskBoardColumnSettings Buttons="@TaskBoardColumnButtons.None" Width="240px" />
    </TaskBoardSettings>
    <TaskBoardToolBar>
        <TaskBoardToolBarSearchBoxTool />
        <TaskBoardToolBarSeparatorTool />
        <TaskBoardToolBarCustomTool>
            <TelerikButton Icon="@SvgIcon.Check"
                           OnClick="@OnCompleteAllCardsClick"
                           ThemeColor="@ThemeConstants.Button.ThemeColor.Success">
                Complete All Tasks
            </TelerikButton>
        </TaskBoardToolBarCustomTool>
        <TaskBoardToolBarSpacerTool />
        <TaskBoardToolBarCustomTool>
            <TelerikButton Icon="@SvgIcon.ExclamationCircle"
                           OnClick="@OnDeleteAllCardsClick"
                           ThemeColor="@ThemeConstants.Button.ThemeColor.Error">
                Delete All Tasks
            </TelerikButton>
        </TaskBoardToolBarCustomTool>
    </TaskBoardToolBar>
</TelerikTaskBoard>

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new();

    private int LastId { get; set; }

    private void OnCompleteAllCardsClick()
    {
        if (TaskBoardColumns.Count > 0)
        {
            TaskBoardCards.ForEach(c =>
            {
                c.Status = TaskBoardColumns.MaxBy(col => col.Index)!.Status;
            });
        }
    }

    private void OnDeleteAllCardsClick()
    {
        TaskBoardCards.Clear();
    }

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
