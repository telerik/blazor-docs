---
title: Data Binding
page_title: TaskBoard - Data Binding
description: Data binding in the Blazor TaskBoard component. Configure task and column data models with default or custom field names.
slug: taskboard-data-binding
tags: telerik,blazor,taskboard,data,binding,databinding
published: True
position: 5
components: ["taskboard"]
---

# TaskBoard Data Binding

The TaskBoard component requires two data collections to display content:

* **Task data** — the cards displayed inside the columns.
* **Column data** — the columns that group tasks by status.

This article explains how to define the data models and configure the field name mappings.

## Task Fields

The TaskBoard maps properties from your task model to render cards and support editing. There are two ways to configure the field mapping:

* **Default field names** — define your model with the expected property names. The TaskBoard recognizes them automatically.
* **Custom field names** — use any property names and explicitly set the corresponding `*Field` parameters on `<TelerikTaskBoard>`.

The following table lists the task model fields.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Default Property Name | TaskBoard Parameter | Type | Description |
| --- | --- | --- | --- |
| `Id` | `IdField` | `object` | A unique identifier for the task. Required for editing and drag-and-drop operations. |
| `Title` | `TitleField` | `string` | The task title displayed on the card and in the edit form. |
| `Status` | `StatusField` | `string` | The status value that maps the task to a column. Must match the column's status value. |
| `Description` | `DescriptionField` | `string` | An optional longer description shown in the edit form. |
| `Order` | `OrderField` | `double` | Determines the position of the task within its column. |
| `Category` | `CategoryField` | `string` | An optional category label used to color-code cards. |

## Column Fields

Column objects define the vertical sections of the board. Each column has a status value that acts as the grouping key for tasks.

| Default Property Name | TaskBoard Parameter | Type | Description |
| --- | --- | --- | --- |
| `Id` | `ColumnIdField` | `object` | A unique identifier for the column. |
| `Title` | `ColumnTextField` | `string` | The column header text. |
| `Status` | `ColumnStatusField` | `string` | The status value used to match tasks to this column. Must match the `Status` values in the task data. |

## Example with Default Field Names

When your models use the default property names, the TaskBoard uses them automatically without any additional configuration.

>caption TaskBoard with default field names

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  Height="500px">
</TelerikTaskBoard>

@code {
    private List<TaskItem> TaskData { get; set; } = new();
    private List<ColumnItem> ColumnData { get; set; } = new();

    protected override void OnInitialized()
    {
        ColumnData = new List<ColumnItem>
        {
            new ColumnItem { Id = 1, Title = "Backlog", Status = "backlog" },
            new ColumnItem { Id = 2, Title = "In Progress", Status = "inprogress" },
            new ColumnItem { Id = 3, Title = "Done", Status = "done" }
        };

        TaskData = new List<TaskItem>
        {
            new TaskItem { Id = 1, Title = "Research competitors", Status = "backlog", Description = "Analyze top 5 competing products." },
            new TaskItem { Id = 2, Title = "Define MVP scope", Status = "backlog", Description = "List the minimum viable features." },
            new TaskItem { Id = 3, Title = "Set up CI/CD", Status = "inprogress", Description = "Configure the deployment pipeline." },
            new TaskItem { Id = 4, Title = "Launch beta", Status = "done", Description = "Released to selected customers." }
        };
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ColumnItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
````

## Example with Custom Field Names

When your model uses different property names, set the `*Field` parameters to tell the TaskBoard which properties to use.

>caption TaskBoard with custom field names

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  IdField="@nameof(ProjectTask.TaskId)"
                  TitleField="@nameof(ProjectTask.Name)"
                  StatusField="@nameof(ProjectTask.Stage)"
                  DescriptionField="@nameof(ProjectTask.Notes)"
                  ColumnIdField="@nameof(BoardColumn.ColumnId)"
                  ColumnTextField="@nameof(BoardColumn.Label)"
                  ColumnStatusField="@nameof(BoardColumn.Stage)"
                  Height="500px">
</TelerikTaskBoard>

@code {
    private List<ProjectTask> TaskData { get; set; } = new();
    private List<BoardColumn> ColumnData { get; set; } = new();

    protected override void OnInitialized()
    {
        ColumnData = new List<BoardColumn>
        {
            new BoardColumn { ColumnId = 10, Label = "New", Stage = "new" },
            new BoardColumn { ColumnId = 20, Label = "Active", Stage = "active" },
            new BoardColumn { ColumnId = 30, Label = "Resolved", Stage = "resolved" }
        };

        TaskData = new List<ProjectTask>
        {
            new ProjectTask { TaskId = 1, Name = "Fix login bug", Stage = "active", Notes = "Users cannot log in with SSO." },
            new ProjectTask { TaskId = 2, Name = "Update dependencies", Stage = "new", Notes = "Upgrade NuGet packages to latest versions." },
            new ProjectTask { TaskId = 3, Name = "Write release notes", Stage = "resolved", Notes = "Published in version 3.2." }
        };
    }

    public class ProjectTask
    {
        public int TaskId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Stage { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class BoardColumn
    {
        public int ColumnId { get; set; }
        public string Label { get; set; } = string.Empty;
        public string Stage { get; set; } = string.Empty;
    }
}
````

## Next Steps

* [Configure TaskBoard columns](slug:taskboard-columns)
* [Enable TaskBoard editing](slug:taskboard-editing)

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
