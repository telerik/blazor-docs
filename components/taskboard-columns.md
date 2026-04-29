---
title: Columns
page_title: TaskBoard - Columns
description: Configure and manage columns in the Blazor TaskBoard component. Define column data, add buttons, and configure column appearance.
slug: taskboard-columns
tags: telerik,blazor,taskboard,columns,kanban
published: True
position: 10
components: ["taskboard"]
---

# TaskBoard Columns

Columns in the Blazor TaskBoard represent the workflow stages that group task cards. Each column displays all tasks whose status value matches the column's configured status. This article explains how to define and configure columns.

## Column Data

Provide column data through the `ColumnsData` parameter. The TaskBoard accepts an `IEnumerable<TColumn>` collection of column objects. Set the `ColumnTextField` and `ColumnStatusField` parameters when your model uses non-default property names. See [Data Binding](slug:taskboard-data-binding#column-fields) for the full list of column fields.

>caption Defining columns through ColumnsData

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  Height="400px">
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
            new ColumnModel { Id = 3, Title = "Review", Status = "review" },
            new ColumnModel { Id = 4, Title = "Done", Status = "done" }
        };

        TaskData = new List<TaskModel>
        {
            new TaskModel { Id = 1, Title = "Plan sprint", Status = "done" },
            new TaskModel { Id = 2, Title = "Build feature A", Status = "inprogress" },
            new TaskModel { Id = 3, Title = "Test feature A", Status = "review" },
            new TaskModel { Id = 4, Title = "Document API", Status = "todo" }
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

## Column Header

The `Title` field of each column model renders as the column header text. To display custom content in the column header, use the [Column Header Template](slug:taskboard-templates#column-header-template).

## Add Task Button

When `AllowAdd` is set to `true` on the TaskBoard, each column displays an **Add task** button at the bottom. Clicking this button opens the built-in edit form with the column's status pre-populated. See [Editing](slug:taskboard-editing) for details.

## Column Width

Configure the width of columns using the `ColumnWidth` parameter on the `<TelerikTaskBoard>` tag. The value accepts any valid CSS unit.

>caption Setting a fixed column width

````RAZOR
<TelerikTaskBoard Data="@TaskData"
                  ColumnsData="@ColumnData"
                  ColumnWidth="280px"
                  Height="400px">
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
            new TaskModel { Id = 1, Title = "Write documentation", Status = "inprogress" },
            new TaskModel { Id = 2, Title = "Fix bug #142", Status = "todo" },
            new TaskModel { Id = 3, Title = "Release version 2.0", Status = "done" }
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

## Next Steps

* [Enable TaskBoard editing](slug:taskboard-editing)
* [Customize column headers with templates](slug:taskboard-templates#column-header-template)

## See Also

* [TaskBoard Overview](slug:taskboard-overview)
* [TaskBoard Data Binding](slug:taskboard-data-binding)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
