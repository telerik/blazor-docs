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

<demo metaUrl="client/taskboard/templates/example-1/" height="550"></demo>

## Next Steps

* [Manage TaskBoard state](slug:taskboard-state)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [Live Demo: TaskBoard Templates](https://demos.telerik.com/blazor-ui/taskboard/templates)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
