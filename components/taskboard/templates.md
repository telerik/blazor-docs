---
title: Templates
page_title: TaskBoard Templates
description: Learn how to use rich content templates in the Telerik TaskBoard component for Blazor, also known as a Kanban Board. See how to customize the card content, column headers, and edit form.
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

The `CardBodyTemplate` renders custom content instead of the default Card description. The template receives a `context` of type [`TaskBoardCardTemplateContext<TItem, TColumn>`](slug:Telerik.Blazor.Components.TaskBoardCardTemplateContext-2) that exposes the Card's data item, the [column state](slug:Telerik.Blazor.Components.TaskBoardColumnState-1), and methods to trigger Card editing and deletion.

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

The `CardTemplate` renders custom content instead of the default Card title and description. The template receives a `context` of type [`TaskBoardCardTemplateContext<TItem, TColumn>`](slug:Telerik.Blazor.Components.TaskBoardCardTemplateContext-2) that exposes the Card's data item, the [column state](slug:Telerik.Blazor.Components.TaskBoardColumnState-1), and methods to trigger Card editing and deletion.

The `CardTemplate` disables the built-in rendering of the Card header, including the `Edit` and `Delete` actions. Thus you need to define custom UI for both operations, but you can still use the built-in:

* [Card edit form](slug:taskboard-editing)
* Card delete confirmation dialog
* [`OnCardDelete` event](slug:taskboard-events#oncarddelete)
* [`OnCardUpdate` event](slug:taskboard-events#oncardupdate)

Do not use `CardTemplate` and `CardBodyTemplate` at the same time. If the app defines both, the TaskBoard will use the `CardTemplate`.

>caption Using TaskBoard CardTemplate

````RAZOR.skip-repl
<TelerikTaskBoard OnCardDelete="@OnTaskBoardCardDelete"
                  OnCardUpdate="@OnTaskBoardCardUpdate">
    <CardTemplate>
        <div>
            <span>@context.Item.Title</span>
            <TelerikButton Icon="@SvgIcon.Pencil"
                           OnClick="@(async () => await context.EditCardAsync())"
                           Title="Edit" />
            <TelerikButton Icon="@SvgIcon.Trash"
                           OnClick="@(async () => await context.DeleteCardAsync())"
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

The `ColumnHeaderTemplate` renders custom content instead of the default Column title and action buttons. The template receives a `context` of type [`TaskBoardColumnHeaderTemplateContext<TColumn>`](slug:Telerik.Blazor.Components.TaskBoardColumnHeaderTemplateContext-1) that exposes the Column's data item, the Buttons to render, and methods to trigger Column deletion and Card addition.

The `ColumnHeaderTemplate` disables the built-in rendering of the actions in the Column header, so you need to define custom UI for these operations:

* Column edit
* Column delete
* Card add

You can still use the built-in Card edit form and `OnCardCreate` event.

>caption Using TaskBoard ColumnHeaderTemplate

````RAZOR.skip-repl
<TelerikTaskBoard OnCardCreate="@OnTaskBoardCardCreate">
    <ColumnHeaderTemplate>
        <div class="taskboard-column-header">
            <span>@context.Column.Title</span>
            <span>
                @if (context.Buttons.HasFlag(TaskBoardColumnButtons.AddCard) == true)
                {
                    <TelerikButton Icon="@SvgIcon.Plus"
                                   OnClick="@(async () => await context.AddCardAsync())"
                                   Title="Add Card" />
                }
                @if (context.Buttons.HasFlag(TaskBoardColumnButtons.DeleteColumn) == true)
                {
                    <TelerikButton Icon="@SvgIcon.Trash"
                                   OnClick="@(async () => await context.DeleteColumnAsync())"
                                   Title="Delete Column" />
                }
            </span>
        </div>
    </ColumnHeaderTemplate>
</TelerikTaskBoard>
````

Also see the [runnable example below](#example).

## EditPaneTemplate

The `EditPaneTemplate` renders custom content instead of the default Form that adds and edits Cards. The template receives a `context` of type [`TaskBoardEditPaneTemplateContext<TItem>`](slug:Telerik.Blazor.Components.TaskBoardEditPaneTemplateContext-1) that exposes the Card's data item, and methods to trigger Card edit completion or cancellation.

`context.SaveAsync()` fires the TaskBoard `OnCardCreate` event for new Cards or `OnCardUpdate` for existing Cards.

>caption Using TaskBoard EditPaneTemplate

````RAZOR.skip-repl
<TelerikTaskBoard OnCardCreate="@OnTaskBoardCardCreate"
                  OnCardUpdate="@OnTaskBoardCardUpdate">
    <EditPaneTemplate>
        <TelerikForm Model="@context.Item"
                     OnValidSubmit="@(async () => await context.SaveAsync())" />
    </EditPaneTemplate>
</TelerikTaskBoard>
````

## Example

>caption Using TaskBoard templates

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikTaskBoard CardData="@TaskBoardCards"
                  ColumnData="@TaskBoardColumns"
                  Height="96vh"
                  OnCardCreate="@OnTaskBoardCardCreate"
                  OnCardDelete="@OnTaskBoardCardDelete"
                  OnCardMove="@OnTaskBoardCardMove"
                  OnCardUpdate="@OnTaskBoardCardUpdate"
                  OnColumnDelete="@OnTaskBoardColumnDelete"
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
            <dt>Status (Column)</dt>
            <dd>@context.Item.Status</dd>
        </dl>
    </CardBodyTemplate>
    <CardTemplate>
        <div class="k-hbox k-card-header">
            <span class="k-card-title k-link">@context.Item.Title</span>
            <span class="k-spacer"></span>
            <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Flat"
                           Icon="@SvgIcon.Pencil"
                           OnClick="@(async () => await context.EditCardAsync())"
                           Title="Edit" />
            <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Flat"
                           Icon="@SvgIcon.Trash"
                           OnClick="@(async () => await context.DeleteCardAsync())"
                           Title="Delete" />
        </div>
        <div class="k-card-body">
            <dl>
                <dt>Description</dt>
                <dd>@context.Item.Description</dd>
                <dt>Priority</dt>
                <dd>@context.Item.Priority</dd>
                <dt>Status (Column)</dt>
                <dd>@context.Item.Status</dd>
            </dl>
        </div>
    </CardTemplate>
    <ColumnHeaderTemplate>
        <div class="taskboard-column-header">
            <span>@context.Column.Title</span>
            <span>
                @if (context.Buttons.HasFlag(TaskBoardColumnButtons.AddCard) == true)
                {
                    <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Clear"
                                   Icon="@SvgIcon.Plus"
                                   OnClick="@(async () => await context.AddCardAsync())"
                                   Title="Add Card" />
                }
                @if (context.Buttons.HasFlag(TaskBoardColumnButtons.DeleteColumn) == true)
                {
                    <TelerikButton FillMode="@ThemeConstants.Button.FillMode.Clear"
                                   Icon="@SvgIcon.Trash"
                                   OnClick="@(async () => await context.DeleteColumnAsync())"
                                   Title="Delete Column" />
                }
            </span>
        </div>
    </ColumnHeaderTemplate>
    <EditPaneTemplate>
        <TelerikForm Model="@context.Item"
                     OnValidSubmit="@(async () => await context.SaveAsync())">
            <FormValidation>
                <DataAnnotationsValidator />
            </FormValidation>
            <FormItems>
                <FormItem Field="@nameof(TaskBoardCard.Title)" />
                <FormItem Field="@nameof(TaskBoardCard.Description)" />
                <FormItem Field="@nameof(TaskBoardCard.Priority)">
                    <Template>
                        <label class="k-label k-form-label" for="ddl-priority">Priority</label>
                        <div class="k-form-field-wrap">
                            <TelerikDropDownList Data="@TaskBoardPriorities"
                                                 @bind-Value="@context.Item.Priority"
                                                 TextField="@nameof(TaskBoardCardPriority.Text)"
                                                 ValueField="@nameof(TaskBoardCardPriority.Value)"
                                                 Id="ddl-priority" />
                        </div>
                    </Template>
                </FormItem>
            </FormItems>
            <FormButtons>
                <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Save</TelerikButton>
                <TelerikButton OnClick="@(async () => await context.CancelAsync())">Cancel</TelerikButton>
            </FormButtons>
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

    private void OnTaskBoardCardCreate(TaskBoardCardCreateEventArgs<TaskBoardCard> args)
    {
        args.Item.Id = ++LastId;

        TaskBoardCards.Add(args.Item);
    }

    private async Task OnTaskBoardCardDelete(TaskBoardCardDeleteEventArgs<TaskBoardCard> args)
    {
        TaskBoardCards.Remove(args.Item);
    }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.Status = args.NewStatus;
    }

    private void OnTaskBoardCardUpdate(TaskBoardCardUpdateEventArgs<TaskBoardCard> args)
    {
        args.OriginalItem.Description = args.Item.Description;
        args.OriginalItem.Priority = args.Item.Priority;
        args.OriginalItem.Title = args.Item.Title;
    }

    private void OnTaskBoardColumnDelete(TaskBoardColumnDeleteEventArgs<TaskBoardColumn> args)
    {
        TaskBoardColumns.Remove(args.Item);

        TaskBoardCards.RemoveAll(c => c.Status == args.Item.Status);
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
                Priority = TaskBoardPriorities[i % TaskBoardPriorities.Count].Value,
                Status = cardStatus,
                Title = $"Card {i}"
            });
        }

        base.OnInitialized();
    }

    public class TaskBoardCard
    {
        [Required]
        public string Description { get; set; } = string.Empty;
        public int Id { get; set; }
        public int Index { get; set; }
        [Required]
        public string Priority { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        [Required]
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

* [Manage TaskBoard state](slug:taskboard-state)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [Live Demo: TaskBoard Templates](https://demos.telerik.com/blazor-ui/taskboard/templates)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
