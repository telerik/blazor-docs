---
title: Templates
page_title: TaskBoard Templates
description: The Telerik TaskBoard
slug: taskboard-templates
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 50
---

# TaskBoard Templates

The Telerik TaskBoard component for Blazor exposes templates for more powerful and flexible content customization. This article lists the available templates and describes how to use them.

* [`CardBodyTemplate`](#cardbodytemplate)
* [`CardTemplate`](#cardtemplate)
* [`ColumnHeaderTemplate`](#columnheadertemplate)
* [`EditPaneTemplate`](#editpanetemplate)
* [Complete runnable example](#example)

## CardBodyTemplate

The `CardBodyTemplate` renders custom content instead of the default Card description. The template receives a `context` of type [`TaskBoardCardTemplateContext<TItem, TColumn>`](slug:Telerik.Blazor.Components.TaskBoardCardTemplateContext-2) that exposes the Card's data item and the [column state](slug:Telerik.Blazor.Components.TaskBoardColumnState-1).

Do not use `CardBodyTemplate` and `CardTemplate` at the same time. If the app defines both, the TaskBoard will use the `CardTemplate`.

>caption Using TaskBoard CardBodyTemplate

````RAZOR.skip-repl
<TelerikTaskBoard>
    <CardBodyTemplate>
        @context.Item.Description
    </CardBodyTemplate>
</TelerikTaskBoard>
````

Also see the [runnable example below](#example).

## CardTemplate

The `CardTemplate` renders custom content instead of the default Card title and description. The template receives a `context` of type [`TaskBoardCardTemplateContext<TItem, TColumn>`](slug:Telerik.Blazor.Components.TaskBoardCardTemplateContext-2) that exposes the Card's data item and the [column state](slug:Telerik.Blazor.Components.TaskBoardColumnState-1).

The `CardTemplate` disables the built-in rendering of the Card headers, including the `Edit` and `Delete` actions. Thus you need to define custom UI for both operations.

Do not use `CardTemplate` and `CardBodyTemplate` at the same time. If the app defines both, the TaskBoard will use the `CardTemplate`.

>caption Using TaskBoard CardTemplate

````RAZOR.skip-repl
<TelerikTaskBoard CardData="@TaskBoardCards">
    <CardTemplate>
        <div>
            <span>@context.Item.Title</span>
            <TelerikButton Icon="@SvgIcon.X"
                           OnClick="@(() => TaskBoardCards.Remove(context.Item))"
                           Title="Delete" />
        </div>
        <div>
            @context.Item.Description
        </div>
    </CardTemplate>
</TelerikTaskBoard>
````

Also see the [runnable example below](#example).

## ColumnHeaderTemplate

The `CardTemplate` renders custom content instead of the default Card title and description. The template receives a `context` of type [`TaskBoardCardTemplateContext<TItem, TColumn>`](slug:Telerik.Blazor.Components.TaskBoardCardTemplateContext-2) that exposes the Card's data item and the [column state](slug:Telerik.Blazor.Components.TaskBoardColumnState-1).

The `ColumnHeaderTemplate` disables the built-in rendering of the actions in the Column header, so you need to define custom UI for these operations:

* Column edit
* Column delete
* Card add

>caption Using TaskBoard ColumnHeaderTemplate

````RAZOR.skip-repl
<TelerikTaskBoard CardData="@TaskBoardCards">
    <ColumnHeaderTemplate>
        <div class="taskboard-column-header">
            <span>@context.Column.Title</span>
            <span>
                @if (context.Column.DataItem.Buttons?.HasFlag(TaskBoardColumnButtons.AddCard) == true)
                {
                    <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Clear"
                                   Icon="@SvgIcon.Plus"
                                   OnClick="@(() => TaskBoardCards.Add(new TaskBoardCard() { Title = "New Card" }))"
                                   Title="Add Card" />
                }
            </span>
        </div>
    </ColumnHeaderTemplate>
</TelerikTaskBoard>
````

Also see the [runnable example below](#example).

## EditPaneTemplate

The `EditPaneTemplate` renders custom content instead of the default Form that adds and edits Cards. The template receives a `context` of type [`TItem`] that is the Card model type.

>caption Using TaskBoard EditPaneTemplate

````RAZOR.skip-repl
<TelerikTaskBoard TItem="@TaskBoardCard">
    <EditPaneTemplate>
        <TelerikForm Model="@context" />
    </EditPaneTemplate>
</TelerikTaskBoard>
````

## Example

>caption Using TaskBoard templates

````RAZOR
<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  Height="96vh"
                  OnCardMove="@OnTaskBoardCardMove"
                  Priorities="@TaskBoardPriorities"
                  TColumn="@TaskBoardColumn"
                  TItem="@TaskBoardCard">
    <TaskBoardSettings>
        <TaskBoardColumnSettings Width="240px" />
    </TaskBoardSettings>
    <CardBodyTemplate>
        <dl>
            <dt>Description</dt>
            <dd>@context.Item.Description</dd>
            <dt>Priority</dt>
            <dd>@context.Item.Priority</dd>
            <dt>Status</dt>
            <dd>@context.Item.Status</dd>
        </dl>
    </CardBodyTemplate>
    @* <CardTemplate>
        <div class="k-hbox k-card-header">
            <span class="k-card-title k-link">@context.Item.Title</span>
            <span class="k-spacer"></span>
            <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Flat"
                        Icon="@SvgIcon.X"
                        OnClick="@(() => OnDeleteCardClick(context.Item))"
                        Title="Delete" />
        </div>
        <div class="k-card-body">
            <dl>
                <dt>Description</dt>
                <dd>@context.Item.Description</dd>
                <dt>Priority</dt>
                <dd>@context.Item.Priority</dd>
                <dt>Status</dt>
                <dd>@context.Item.Status</dd>
            </dl>
        </div>
    </CardTemplate> *@
    <ColumnHeaderTemplate>
        <div class="taskboard-column-header">
            <span>@context.Column.Title</span>
            <span>
                @if (context.Column.DataItem.Buttons?.HasFlag(TaskBoardColumnButtons.AddCard) == true)
                {
                    <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Clear"
                                   Icon="@SvgIcon.Plus"
                                   OnClick="@((MouseEventArgs args) => OnAddCardClick(args, context.Column.DataItem.Status))"
                                   Title="Add Card" />
                }
            </span>
        </div>
    </ColumnHeaderTemplate>
    <EditPaneTemplate>
        <TelerikForm Model="@context" OnValidSubmit="@(() => OnEditCardFormSubmit(context))">
            <FormItems>
                <FormItem Field="@nameof(TaskBoardCard.Title)" />
                <FormItem Field="@nameof(TaskBoardCard.Description)" />
                <FormItem Field="@nameof(TaskBoardCard.Priority)">
                    <Template>
                        <label class="k-label k-form-label" for="ddl-priority">Priority</label>
                        <div class="k-form-field-wrap">
                            <TelerikDropDownList Data="@TaskBoardPriorities"
                                                 @bind-Value="@context.Priority"
                                                 TextField="@nameof(TaskBoardCardPriority.Text)"
                                                 ValueField="@nameof(TaskBoardCardPriority.Value)"
                                                 Id="ddl-priority" />
                        </div>
                    </Template>
                </FormItem>
            </FormItems>
        </TelerikForm>
    </EditPaneTemplate>
</TelerikTaskBoard>

<style>
    .taskboard-column-header {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

@code {
    private List<TaskBoardCard> TaskBoardCards { get; set; } = new List<TaskBoardCard>();
    private List<TaskBoardColumn> TaskBoardColumns { get; set; } = new List<TaskBoardColumn>();

    private List<TaskBoardCardPriority> TaskBoardPriorities { get; set; } = new()
        {
            new() { Text = "Low", Value = "low", Color = "var(--kendo-color-success)" },
            new() { Text = "Normal", Value = "normal", Color = "var(--kendo-color-info)" },
            new() { Text = "Medium", Value = "medium", Color = "var(--kendo-color-warning)"},
            new() { Text = "High", Value = "high", Color = "var(--kendo-color-error)" }
        };

    [CascadingParameter]
    public DialogFactory? TelerikDialogs { get; set; }

    private int LastId { get; set; }

    private void OnAddCardClick(MouseEventArgs args, string status)
    {
        TaskBoardCards.Add(new TaskBoardCard()
        {
            Id = ++LastId,
            Title = $"New Card",
            Priority = "normal",
            Status = status
        });
    }

    private async Task OnDeleteCardClick(TaskBoardCard deletedCard)
    {
        if (await TelerikDialogs!.ConfirmAsync($"Do you want to delete {deletedCard.Title}?"))
        {
            TaskBoardCards.Remove(deletedCard);
        }
    }

    private void OnEditCardFormSubmit(TaskBoardCard updatedCard)
    {
        // Update original data source here
    }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
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
                Title = $"Column {columnId}",
                Buttons = TaskBoardColumnButtons.EditColumn | TaskBoardColumnButtons.AddCard
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

## Next Steps

* [Subscribe to TaskBoard events](slug:taskboard-events)

## See Also

* [Live Demo: TaskBoard Templates](https://demos.telerik.com/blazor-ui/taskboard/templates)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
