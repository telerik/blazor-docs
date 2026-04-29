---
title: Drag and Drop
page_title: TaskBoard - Drag and Drop
description: Drag and drop task cards between columns in the Blazor TaskBoard component to update their status.
slug: taskboard-drag-drop
tags: telerik,blazor,taskboard,drag,drop,dragging
published: True
position: 20
components: ["taskboard"]
---

# TaskBoard Drag and Drop

The Blazor TaskBoard allows users to drag task cards between columns. When a card is dropped into a new column, the board fires the `OnDrop` event so you can update the task's status in your data source.

## Enable Drag and Drop

Drag and drop is enabled by default. Set the `Draggable` parameter to `false` on `<TelerikTaskBoard>` to disable it.

## OnDrop Event

The `OnDrop` event fires after the user releases a card in a column. The event provides a `TaskBoardDropEventArgs` argument with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The task that was dragged. Cast it to your task model to access its properties. |
| `DestinationColumn` | `object` | The column object where the card was dropped. Cast it to your column model. |
| `DestinationItemIndex` | `int` | The zero-based index of the position within the destination column where the card was dropped. |

Handle the `OnDrop` event to update the task's status value in your data source. The TaskBoard does not update the data automatically.

>caption TaskBoard with drag and drop

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  Draggable="true"
                  OnDrop="@OnTaskDrop"
                  Height="600px">
</TelerikTaskBoard>

@if (!string.IsNullOrEmpty(LastDrop))
{
    <p>@LastDrop</p>
}

@code {
    private string LastDrop { get; set; } = string.Empty;
    private List<TaskModel> TaskData { get; set; } = new();
    private List<ColumnModel> ColumnData { get; set; } = new();

    protected override void OnInitialized()
    {
        ColumnData = new List<ColumnModel>
        {
            new ColumnModel { Id = 1, Title = "To Do", Status = "todo" },
            new ColumnModel { Id = 2, Title = "In Progress", Status = "inprogress" },
            new ColumnModel { Id = 3, Title = "Done", Status = "done" }
        };

        TaskData = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Set up database", Status = "done" },
            new TaskModel { Id = 2, Title = "Design REST API", Status = "inprogress" },
            new TaskModel { Id = 3, Title = "Create UI components", Status = "todo" },
            new TaskModel { Id = 4, Title = "Integrate payment gateway", Status = "todo" }
        };
    }

    private void OnTaskDrop(TaskBoardDropEventArgs args)
    {
        var droppedTask = (TaskModel)args.Item;
        var destinationColumn = (ColumnModel)args.DestinationColumn;

        // Update the task's status to match the destination column
        var task = TaskData.FirstOrDefault(t => t.Id == droppedTask.Id);
        if (task != null)
        {
            task.Status = destinationColumn.Status;
        }

        LastDrop = $"Moved \"{droppedTask.Title}\" to \"{destinationColumn.Title}\"";
    }

    public class TaskModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class ColumnModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
````

## Disable Drag and Drop

Set `Draggable="false"` to prevent users from reordering or moving cards via drag and drop. This is useful for read-only boards or boards where status changes must go through the edit form only.

>caption Disabling drag and drop

````RAZOR.skip-repl
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  Draggable="false"
                  Height="400px">
</TelerikTaskBoard>
````

## Next Steps

* [Handle all TaskBoard events](slug:taskboard-events)
* [Enable editing for a full CRUD workflow](slug:taskboard-editing)

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard Events](slug:taskboard-events)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
