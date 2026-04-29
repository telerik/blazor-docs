---
title: Editing
page_title: TaskBoard - Editing
description: Create, edit, and delete tasks in the Blazor TaskBoard component using the built-in edit form and CRUD events.
slug: taskboard-editing
tags: telerik,blazor,taskboard,edit,editing,crud,create,update,delete
published: True
position: 15
components: ["taskboard"]
---

# TaskBoard Editing

The TaskBoard supports creating, editing, and deleting task cards through a built-in edit form. This article explains how to enable editing and handle the CRUD events.

## Enable Editing

Control which editing operations are available through the following parameters on `<TelerikTaskBoard>`:

* `AllowAdd` — shows an **Add task** button at the bottom of each column. Clicking it opens the edit form with the column's status pre-filled.
* `AllowEdit` — shows an edit button on each card. Clicking it opens the edit form pre-filled with the task's current data.
* `AllowDelete` — shows a delete button on each card. Clicking it removes the card from the board.

You can enable any combination of the three parameters independently.

## CRUD Events

The TaskBoard exposes three events for persisting data changes. Implement them to update your data source.

| Event | Description |
| --- | --- |
| `OnCreate` | Fires when the user saves a new task. The event arguments contain the new task item. |
| `OnUpdate` | Fires when the user saves changes to an existing task. The event arguments contain the updated task item. |
| `OnDelete` | Fires when the user deletes a task. The event arguments contain the deleted task item. |

The event argument types are `TaskBoardCreateEventArgs`, `TaskBoardUpdateEventArgs`, and `TaskBoardDeleteEventArgs`. Each provides an `Item` property of type `object` that you can cast to your task model.

## OnEdit and OnCancel

Two additional events let you react to the edit form lifecycle without requiring data changes:

* `OnEdit` — fires when the edit form is about to open. Set `args.IsCancelled = true` to prevent the form from opening and make specific tasks read-only.
* `OnCancel` — fires when the user closes the edit form without saving.

## Example

>caption TaskBoard with full CRUD support

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowAdd="true"
                  AllowEdit="true"
                  AllowDelete="true"
                  OnCreate="@OnTaskCreate"
                  OnUpdate="@OnTaskUpdate"
                  OnDelete="@OnTaskDelete"
                  OnEdit="@OnTaskEdit"
                  OnCancel="@OnTaskCancel"
                  Height="600px">
</TelerikTaskBoard>

@if (!string.IsNullOrEmpty(LastAction))
{
    <p>Last action: @LastAction</p>
}

@code {
    private string LastAction { get; set; } = string.Empty;
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
            new TaskModel { Id = 1, Title = "Write tests", Status = "todo", Description = "Cover edge cases in the payment module." },
            new TaskModel { Id = 2, Title = "Fix null reference", Status = "inprogress", Description = "Reproduce the crash in OrderService." },
            new TaskModel { Id = 3, Title = "Merge feature branch", Status = "done", Description = "Feature/checkout-flow merged." }
        };
    }

    private void OnTaskCreate(TaskBoardCreateEventArgs args)
    {
        var newTask = (TaskModel)args.Item;
        newTask.Id = TaskData.Count > 0 ? TaskData.Max(t => t.Id) + 1 : 1;
        TaskData.Add(newTask);
        LastAction = $"Created: {newTask.Title}";
    }

    private void OnTaskUpdate(TaskBoardUpdateEventArgs args)
    {
        var updatedTask = (TaskModel)args.Item;
        var index = TaskData.FindIndex(t => t.Id == updatedTask.Id);
        if (index >= 0)
        {
            TaskData[index] = updatedTask;
        }
        LastAction = $"Updated: {updatedTask.Title}";
    }

    private void OnTaskDelete(TaskBoardDeleteEventArgs args)
    {
        var taskToDelete = (TaskModel)args.Item;
        TaskData.RemoveAll(t => t.Id == taskToDelete.Id);
        LastAction = $"Deleted: {taskToDelete.Title}";
    }

    private void OnTaskEdit(TaskBoardEditEventArgs args)
    {
        var task = args.Item as TaskModel;
        // Prevent editing tasks that are already Done
        if (task?.Status == "done")
        {
            args.IsCancelled = true;
        }
    }

    private void OnTaskCancel(TaskBoardCancelEventArgs args)
    {
        LastAction = "Edit cancelled";
    }

    public class TaskModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ColumnModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
````

## Custom Edit Form

To display a custom form instead of the built-in one, use the [Edit Form Template](slug:taskboard-templates#edit-form-template). Always handle the `OnEdit` event and cancel it (`args.IsCancelled = true`) to prevent the built-in form from opening, then implement the desired logic in your custom form.

## Next Steps

* [Customize the edit form with templates](slug:taskboard-templates#edit-form-template)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard Templates](slug:taskboard-templates)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
