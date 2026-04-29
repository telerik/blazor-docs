---
title: Overview
page_title: TaskBoard Overview
description: Overview of the TaskBoard for Blazor. Visualize and manage tasks in a Kanban-style board with columns, drag-and-drop, and built-in editing.
slug: taskboard-overview
tags: telerik,blazor,taskboard,kanban,overview
published: True
position: 0
components: ["taskboard"]
---

# Blazor TaskBoard Overview

The <a href="https://www.telerik.com/blazor-ui/taskboard" target="_blank">Blazor TaskBoard component</a> is a Kanban-style board that lets users visualize and manage tasks across workflow stages. Tasks are displayed as cards in vertical columns, where each column represents a status, such as "To Do", "In Progress", or "Done". Users can drag cards between columns, and create, edit, or delete tasks through a built-in edit form.

## Creating Blazor TaskBoard

1. Add the `<TelerikTaskBoard>` tag to a Razor file.
1. Set the `Data` parameter to an `IEnumerable<TItem>` collection of task objects. The TaskBoard recognizes [default model property names](slug:taskboard-data-binding#task-fields) such as `Id`, `Title`, `Status`, and `Description` automatically. Use the `IdField`, `TitleField`, `StatusField`, and `DescriptionField` parameters when your model uses different names.
1. Set the `ColumnsData` parameter to an `IEnumerable<TColumn>` collection of column objects. The TaskBoard maps each task to its column through a matching status value. Configure the column field names with `ColumnIdField`, `ColumnTextField`, and `ColumnStatusField` when your column model uses non-default names.
1. (optional) Set `AllowEdit`, `AllowDelete`, and `AllowAdd` to `true` to enable the built-in [CRUD operations](slug:taskboard-editing).
1. (optional) Handle `OnCreate`, `OnUpdate`, and `OnDelete` events to persist changes to your data source.

>caption Basic TaskBoard

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowAdd="true"
                  AllowEdit="true"
                  AllowDelete="true"
                  OnCreate="@OnTaskCreate"
                  OnUpdate="@OnTaskUpdate"
                  OnDelete="@OnTaskDelete"
                  Height="600px">
</TelerikTaskBoard>

@code {
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
            new TaskModel { Id = 1, Title = "Design mockups", Status = "done", Description = "Create wireframes for the new dashboard." },
            new TaskModel { Id = 2, Title = "Implement login page", Status = "inprogress", Description = "Build the authentication UI." },
            new TaskModel { Id = 3, Title = "Write unit tests", Status = "todo", Description = "Cover the business logic layer." },
            new TaskModel { Id = 4, Title = "Code review", Status = "todo", Description = "Review pull requests from the team." },
            new TaskModel { Id = 5, Title = "Deploy to staging", Status = "inprogress", Description = "Set up CI/CD pipeline." }
        };
    }

    private void OnTaskCreate(TaskBoardCreateEventArgs args)
    {
        var newTask = (TaskModel)args.Item;
        newTask.Id = TaskData.Count > 0 ? TaskData.Max(t => t.Id) + 1 : 1;
        TaskData.Add(newTask);
    }

    private void OnTaskUpdate(TaskBoardUpdateEventArgs args)
    {
        var updatedTask = (TaskModel)args.Item;
        var index = TaskData.FindIndex(t => t.Id == updatedTask.Id);
        if (index >= 0)
        {
            TaskData[index] = updatedTask;
        }
    }

    private void OnTaskDelete(TaskBoardDeleteEventArgs args)
    {
        var taskToDelete = (TaskModel)args.Item;
        TaskData.RemoveAll(t => t.Id == taskToDelete.Id);
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

## Data Binding

The TaskBoard requires two data collections: one for the tasks (cards) and one for the columns. Learn how to [configure the task and column data models and field name mappings](slug:taskboard-data-binding).

## Columns

[TaskBoard columns represent workflow stages](slug:taskboard-columns), such as "To Do", "In Progress", and "Done". Each column displays the tasks whose status value matches the column's configured status. You can add and configure columns to match your workflow.

## Editing

Users can [create, edit, and delete tasks](slug:taskboard-editing) through the built-in edit form. Handle the `OnCreate`, `OnUpdate`, and `OnDelete` events to persist the changes to your data source.

## Drag and Drop

Users can [drag cards between columns](slug:taskboard-drag-drop) to update a task's status. The `OnDrop` event fires after a card is moved, letting you update the underlying data source with the new status.

## Templates

Customize the appearance and content of [task cards, column headers, and the edit form](slug:taskboard-templates) using Razor templates. Templates let you display additional task fields, icons, or custom actions inside each card.

## Events

The [TaskBoard fires events](slug:taskboard-events) for CRUD operations and drag-and-drop interactions. Use events to react to user actions and keep your data source in sync.

## More TaskBoard Features

* [Keyboard Navigation](slug:taskboard-wai-aria-support)
* [Accessibility](slug:taskboard-wai-aria-support)

## TaskBoard API

Get familiar with all TaskBoard parameters, methods, and events in the [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2).

## TaskBoard Reference

The Blazor TaskBoard component exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. Blazor populates component references in `OnAfterRenderAsync`, so they are not available earlier.

>caption Obtain a reference to the TaskBoard instance

````RAZOR.skip-repl
<TelerikTaskBoard @ref="@TaskBoardRef"
                  Data="@TaskData"
                  ColumnsData="@ColumnData" />

@code {
    private TelerikTaskBoard<TaskModel, ColumnModel>? TaskBoardRef { get; set; }

    private List<TaskModel> TaskData { get; set; } = new();
    private List<ColumnModel> ColumnData { get; set; } = new();
}
````

## Next Steps

* [Bind the TaskBoard to data](slug:taskboard-data-binding)
* [Configure TaskBoard columns](slug:taskboard-columns)
* [Enable TaskBoard editing](slug:taskboard-editing)
* [Set up drag and drop](slug:taskboard-drag-drop)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [Live TaskBoard Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
