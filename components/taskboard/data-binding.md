---
title: Data Binding
page_title: TaskBoard Data Binding
description: Learn the data binding fundamentals of the Telerik Blazor TaskBoard component, also known as a Kanban Board. See the default model class property names and how to use custom ones.
slug: taskboard-data-binding
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 10
---

# TaskBoard Data Binding

This article explains how to bind the TaskBoard to card data and column data, and how to relate component features to properties of the model classes. This is a prerequisite for successful data binding of the TaskBoard:

## Default Property Names

The TaskBoard has features that map to properties in the Card and Column models. The following classes use property names that will [work automatically, with no additional TaskBoard configuration](slug:taskboard-overview#creating-blazor-taskboard).

>caption TaskBoard Card and Column model classes with default property names

````C#.skip-repl
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
````

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

<style>
    style + table td {
        vertical-align: top;
    }
</style>

The Card model properties have the following meaning for the TaskBoard:

| Property | Description |
| --- | --- |
| `Description` | The plain text that shows in the Cart content area. You can define rich Card content with a [`CardBodyTemplate`](slug:taskboard-templates#cardbodytemplate) |
| `Id` | The unique Card identifier. |
| `Index` | The number that determines the Card position in a column. The index is zero-based and the Card sort order is by ascending `Index` value. |
| `Priority` | Custom text that can [separate Cards into different categories](slug:taskboard-overview#creating-blazor-taskboard). If set, the Card `Priority` must match the `Value` of a [`TaskBoardCardPriority`](slug:Telerik.Blazor.Components.TaskBoardCardPriority) member of the TaskBoard `Priorities` collection. Users distinguish priorities by the Card border color. |
| `Status` | Custom text that determines which TaskBoard Column displays the Card. |
| `Title` | The plain text that shows in the Card header. |

The Column model properties have the following meaning for the TaskBoard:

| Property | Description |
| --- | --- |
| `Buttons` | The available buttons that show in the Column header. You can also define default column buttons in the model class or in [`TaskBoardColumnSettings`](slug:taskboard-overview#cards-and-columns) where the default value is `TaskBoardColumnButtons.EditColumn \| TaskBoardColumnButtons.AddCard \| TaskBoardColumnButtons.DeleteColumn`. |
| `Enabled` | Determines if the Column allows editing and dragging and dropping of Card. |
| `Index` | The number that determines the Column position in the TaskBoard column. The index is zero-based and the Column sort order is by ascending `Index` value. |
| `Status` | The unique Column identifier. Each Column displays Cards with a matching `Status` value. |
| `Title` | The plain text that shows in the Column header. You can define rich Column header content with a [`ColumnHeaderTemplate`](slug:taskboard-templates#columnheadertemplate). |
| `Width` | The Column width in any valid CSS unit. You can also define a default column width in the model class or in [`TaskBoardColumnSettings`](slug:taskboard-overview#cards-and-columns). The default value depends on the Telerik CSS theme and is `"320px"`. |
| `WipLimit` | The maximum number of Cards in the Column. Use `null` for no limit. |

See a runnable example with default model property names in [Creating Blazor TaskBoard](slug:taskboard-overview#creating-blazor-taskboard).

## Custom Property Names

To use custom model property names, set the respective `Card...Field` or `Column...Field` parameter of the TaskBoard that matches the [default model property](#default-property-names), for example:

* `CardDescriptionField` to define a custom Card `Description` property
* `CardTitleField` to define a custom Card `Title` property
* `ColumnStatusField` to define a custom Column `Status` property, and so on

The following example is similar to the [basic TaskBoard sample](slug:taskboard-overview#creating-blazor-taskboard), but uses custom class property names.

>caption Using TaskBoard Card and Column model classes with custom property names

````RAZOR
<TelerikTaskBoard CardData="@TaskBoardCards"
                  CardDescriptionField="@nameof(TaskBoardCard.Text)"
                  CardPriorityField="@nameof(TaskBoardCard.Severity)"
                  CardStatusField="@nameof(TaskBoardCard.ColumnId)"
                  ColumnData="@TaskBoardColumns"
                  ColumnStatusField="@nameof(TaskBoardColumn.Id)"
                  ColumnWipLimitField="@nameof(TaskBoardColumn.MaxCards)"
                  Height="96vh"
                  OnCardMove="@OnTaskBoardCardMove"
                  Priorities="@TaskBoardSeverities"
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

    private List<TaskBoardCardPriority> TaskBoardSeverities { get; set; } = new()
        {
            new() { Text = "Low", Value = "low", Color = "var(--kendo-color-success)" },
            new() { Text = "Normal", Value = "normal", Color = "var(--kendo-color-info)" },
            new() { Text = "Medium", Value = "medium", Color = "var(--kendo-color-warning)"},
            new() { Text = "High", Value = "high", Color = "var(--kendo-color-error)" }
        };

    private int LastId { get; set; }

    private void OnTaskBoardCardMove(TaskBoardCardMoveEventArgs<TaskBoardCard> args)
    {
        args.Item.Index = args.NewIndex;
        args.Item.ColumnId = args.NewStatus;
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
                Id = $"column-{columnId}",
                Title = $"Column {columnId}"
            });
        }

        for (int i = 1; i <= cardsCount; i++)
        {
            int cardId = ++LastId;
            string cardColumnId = $"column-{(i % columnsCount) + 1}";
            int cardIndex = TaskBoardCards.Where(c => c.ColumnId == cardColumnId).Count();
            
            TaskBoardCards.Add(new TaskBoardCard()
            {
                Text = $"Description {i}",
                Id = cardId,
                Index = cardIndex,
                Severity = TaskBoardSeverities[i % TaskBoardSeverities.Count].Value,
                ColumnId = cardColumnId,
                Title = $"Card {i}"
            });
        }

        base.OnInitialized();
    }

    public class TaskBoardCard
    {
        public string Text { get; set; } = string.Empty; // Description
        public int Id { get; set; }
        public int Index { get; set; }
        public string Severity { get; set; } = string.Empty; // Priority
        public string ColumnId { get; set; } = string.Empty; // Status
        public string Title { get; set; } = string.Empty;
    }

    public class TaskBoardColumn
    {
        public TaskBoardColumnButtons? Buttons { get; set; }
        public bool Enabled { get; set; } = true;
        public int Index { get; set; }
        public string Id { get; set; } = string.Empty; // Status
        public string Title { get; set; } = string.Empty;
        public string Width { get; set; } = string.Empty;
        public int? MaxCards { get; set; } // WipLimit
    }
}
````

## Next Steps

* [Learn about TaskBoard drag and drop](slug:taskboard-drag-and-drop)
* [Define a TaskBoard toolbar](slug:taskboard-toolbar)
* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
