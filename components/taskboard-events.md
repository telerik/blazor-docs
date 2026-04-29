---
title: Events
page_title: TaskBoard - Events
description: Events available in the Blazor TaskBoard component for editing, drag-and-drop, and lifecycle interactions.
slug: taskboard-events
tags: telerik,blazor,taskboard,events
published: True
position: 30
components: ["taskboard"]
---

# TaskBoard Events

The Blazor TaskBoard fires events for CRUD operations, drag-and-drop, and edit form lifecycle interactions. Use them to synchronize the board's state with your data source.

This article covers the following events:

* [OnCreate](#oncreate)
* [OnUpdate](#onupdate)
* [OnDelete](#ondelete)
* [OnEdit](#onedit)
* [OnCancel](#oncancel)
* [OnDrop](#ondrop)

## OnCreate

The `OnCreate` event fires when the user saves a new task through the built-in edit form. The event provides a `TaskBoardCreateEventArgs` argument.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The new task item. Cast it to your model type. |

Handle this event to add the new task to your data source.

>caption Handle OnCreate

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowAdd="true"
                  OnCreate="@OnTaskCreate"
                  Height="450px">
</TelerikTaskBoard>

<p>@EventLog</p>

@code {
    private string EventLog { get; set; } = string.Empty;
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
            new TaskModel { Id = 1, Title = "Existing task", Status = "todo" }
        };
    }

    private void OnTaskCreate(TaskBoardCreateEventArgs args)
    {
        var newTask = (TaskModel)args.Item;
        newTask.Id = TaskData.Count > 0 ? TaskData.Max(t => t.Id) + 1 : 1;
        TaskData.Add(newTask);
        EventLog = $"Created: \"{newTask.Title}\" in column \"{newTask.Status}\"";
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

## OnUpdate

The `OnUpdate` event fires when the user saves changes to an existing task. The event provides a `TaskBoardUpdateEventArgs` argument.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The updated task item. Cast it to your model type. |

Handle this event to persist the updated task in your data source.

## OnDelete

The `OnDelete` event fires when the user deletes a task. The event provides a `TaskBoardDeleteEventArgs` argument.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The deleted task item. Cast it to your model type. |

Handle this event to remove the task from your data source.

## OnEdit

The `OnEdit` event fires when the edit form is about to open. The event provides a `TaskBoardEditEventArgs` argument.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The task being edited. Cast it to your model type. |
| `IsNew` | `bool` | `true` when the user is creating a new task; `false` when editing an existing one. |
| `IsCancelled` | `bool` | Set to `true` to prevent the edit form from opening. |

Use this event to conditionally make tasks read-only or to implement custom editing logic.

>caption Handle OnEdit to make certain tasks read-only

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowEdit="true"
                  OnEdit="@OnTaskEdit"
                  OnUpdate="@OnTaskUpdate"
                  Height="450px">
</TelerikTaskBoard>

<p>@EventLog</p>

@code {
    private string EventLog { get; set; } = string.Empty;
    private List<TaskModel> TaskData { get; set; } = new();
    private List<ColumnModel> ColumnData { get; set; } = new();

    protected override void OnInitialized()
    {
        ColumnData = new List<ColumnModel>
        {
            new ColumnModel { Id = 1, Title = "To Do", Status = "todo" },
            new ColumnModel { Id = 2, Title = "Done", Status = "done" }
        };
        TaskData = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Editable task", Status = "todo" },
            new TaskModel { Id = 2, Title = "Locked (Done)", Status = "done" }
        };
    }

    private void OnTaskEdit(TaskBoardEditEventArgs args)
    {
        var task = args.Item as TaskModel;
        if (task?.Status == "done")
        {
            args.IsCancelled = true;
            EventLog = $"Editing blocked: \"{task.Title}\" is already done.";
        }
    }

    private void OnTaskUpdate(TaskBoardUpdateEventArgs args)
    {
        var updatedTask = (TaskModel)args.Item;
        var index = TaskData.FindIndex(t => t.Id == updatedTask.Id);
        if (index >= 0)
        {
            TaskData[index] = updatedTask;
        }
        EventLog = $"Updated: \"{updatedTask.Title}\"";
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

## OnCancel

The `OnCancel` event fires when the user closes the edit form without saving, either by clicking the Cancel button or the close button on the dialog. The event provides a `TaskBoardCancelEventArgs` argument.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The task that was being edited. Cast it to your model type. |

## OnDrop

The `OnDrop` event fires after the user drops a task card in a column. The event provides a `TaskBoardDropEventArgs` argument. See [Drag and Drop](slug:taskboard-drag-drop) for a full example.

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The dragged task. Cast it to your model type. |
| `DestinationColumn` | `object` | The column where the task was dropped. Cast it to your column model. |
| `DestinationItemIndex` | `int` | The zero-based index of the position within the destination column. |

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard Editing](slug:taskboard-editing)
* [TaskBoard Drag and Drop](slug:taskboard-drag-drop)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
