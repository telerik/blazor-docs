---
title: Templates
page_title: TaskBoard - Templates
description: Customize the card, column header, and edit form appearance using templates in the Blazor TaskBoard component.
slug: taskboard-templates
tags: telerik,blazor,taskboard,templates,card,template
published: True
position: 25
components: ["taskboard"]
---

# TaskBoard Templates

The TaskBoard exposes templates that let you customize the rendering of task cards, column headers, and the edit form. Templates use the standard Blazor `RenderFragment` approach and give you full control over the appearance and content of each element.

## Card Template

Use the `<CardTemplate>` to replace the default card content with custom markup. The `context` of the template is the task object bound to the card. Cast it to your model type to access all properties.

The card template controls the content inside the card, but the built-in card wrapper (including drag handles and action buttons) is still rendered by the TaskBoard.

>caption Customizing the card appearance

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowEdit="true"
                  AllowDelete="true"
                  Height="550px">
    <CardTemplate>
        @{
            var task = context as TaskModel;
        }
        <div class="custom-card">
            <div class="card-category" style="background-color: @GetCategoryColor(task?.Category)">
                @task?.Category
            </div>
            <strong>@task?.Title</strong>
            @if (!string.IsNullOrEmpty(task?.Description))
            {
                <p class="card-description">@task.Description</p>
            }
        </div>
    </CardTemplate>
</TelerikTaskBoard>

<style>
    .custom-card { padding: 8px; }
    .card-category { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; color: white; margin-bottom: 4px; }
    .card-description { font-size: 0.85rem; color: #555; margin: 4px 0 0; }
</style>

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
            new TaskModel { Id = 1, Title = "Performance audit", Status = "todo", Description = "Profile the app with dotnet-trace.", Category = "Backend" },
            new TaskModel { Id = 2, Title = "Responsive layout", Status = "inprogress", Description = "Fix breakpoints for mobile.", Category = "Frontend" },
            new TaskModel { Id = 3, Title = "Accessibility review", Status = "done", Description = "WCAG 2.1 AA compliance check.", Category = "QA" }
        };
    }

    private string GetCategoryColor(string? category) => category switch
    {
        "Backend" => "#6c757d",
        "Frontend" => "#0d6efd",
        "QA" => "#198754",
        _ => "#adb5bd"
    };

    public class TaskModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }

    public class ColumnModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
````

## Column Header Template

Use the `<ColumnHeaderTemplate>` to customize the header of each column. The `context` is the column object. Cast it to your column model to access its properties.

>caption Customizing the column header

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  Height="450px">
    <ColumnHeaderTemplate>
        @{
            var column = context as ColumnModel;
            var taskCount = TaskData.Count(t => t.Status == column?.Status);
        }
        <span>@column?.Title</span>
        <span class="task-count">@taskCount</span>
    </ColumnHeaderTemplate>
</TelerikTaskBoard>

<style>
    .task-count { display: inline-block; margin-left: 8px; padding: 1px 8px; background: #e9ecef; border-radius: 12px; font-size: 0.8rem; }
</style>

@code {
    private List<TaskModel> TaskData { get; set; } = new();
    private List<ColumnModel> ColumnData { get; set; } = new();

    protected override void OnInitialized()
    {
        ColumnData = new List<ColumnModel>
        {
            new ColumnModel { Id = 1, Title = "Backlog", Status = "backlog" },
            new ColumnModel { Id = 2, Title = "In Progress", Status = "inprogress" },
            new ColumnModel { Id = 3, Title = "Done", Status = "done" }
        };

        TaskData = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Task A", Status = "backlog" },
            new TaskModel { Id = 2, Title = "Task B", Status = "backlog" },
            new TaskModel { Id = 3, Title = "Task C", Status = "inprogress" },
            new TaskModel { Id = 4, Title = "Task D", Status = "done" }
        };
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

## Edit Form Template

Use the `<EditFormTemplate>` to replace the built-in edit dialog with a custom form. The `context` is the task object being edited. Cancel the `OnEdit` event (`args.IsCancelled = true`) if you want to suppress the built-in form entirely.

>caption TaskBoard with a custom edit form

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  AllowAdd="true"
                  AllowEdit="true"
                  AllowDelete="true"
                  OnCreate="@OnTaskCreate"
                  OnUpdate="@OnTaskUpdate"
                  OnDelete="@OnTaskDelete"
                  Height="550px">
    <EditFormTemplate>
        @{
            var task = context as TaskModel;
        }
        <div style="padding: 16px;">
            <h3>@(task?.Id == 0 ? "New Task" : "Edit Task")</h3>
            <TelerikTextBox @bind-Value="@task!.Title" Label="Title" />
            <TelerikTextArea @bind-Value="@task!.Description" Label="Description" />
        </div>
    </EditFormTemplate>
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
            new TaskModel { Id = 1, Title = "Initial setup", Status = "done", Description = "Repository and CI/CD configured." }
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

## Next Steps

* [Handle TaskBoard events](slug:taskboard-events)
* [Enable editing](slug:taskboard-editing)

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard Editing](slug:taskboard-editing)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
