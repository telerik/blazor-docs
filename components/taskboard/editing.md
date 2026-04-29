---
title: Editing
page_title: TaskBoard Editing
description: Learn how to set up create, edit, and delete operations on cards and columns in the Telerik Blazor TaskBoard component, also known as a Kanban Board.
slug: taskboard-editing
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 40
---

# TaskBoard Editing

The TaskBoard allows users to make changes to Cards and Columns. This article describes the available features and how to set them up.

The built-in TaskBoard editing includes setting the following [Card and Column model properties](slug:taskboard-data-binding):

* `Title` of existing or new Columns
* `Title`, `Description`, and `Priority` of existing or new Cards

[TaskBoard templates](slug:taskboard-templates) can enable users to edit additional Card and Column properties.

[Drag-and-drop in the TaskBoard](slug:taskboard-drag-and-drop) changes specific Card and Column properties without user typing.

## Model Requirements

Adding or editing TaskBoard Cards and Columns sets the following requirements:

* The TaskBoard Card and Column model classes must have a parameterless constructor.
* All editable properties must be `public` and have setters. These properties must not be `readonly`.

## Card Operations

The built-in Card edit operations depend on action buttons and TaskBoard events.

### Buttons

Users can edit or delete Cards by clicking action buttons in the Card headers. To add new Cards to a given TaskBoard Column, users can click a button in the Column header.

The `Add`, `Edit`, and `Delete` buttons render by default. You can control their visibility through the `Buttons` parameters of `TaskBoardCardSettings` and `TaskBoardColumnSettings`.

>caption Enable adding, editing, and deleting Cards (default)

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardSettings>
        <TaskBoardCardSettings Buttons="@(TaskBoardCardButtons.EditCard | TaskBoardCardButtons.DeleteCard)" />
        <TaskBoardColumnSettings Buttons="@(TaskBoardColumnButtons.AddCard)" />
    </TaskBoardSettings>
</TelerikTaskBoard>
````

>caption Disable adding, editing, and deleting Cards

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardSettings>
        <TaskBoardCardSettings Buttons="@(TaskBoardCardButtons.None)" />
        <TaskBoardColumnSettings Buttons="@(TaskBoardColumnButtons.None)" />
    </TaskBoardSettings>
</TelerikTaskBoard>
````

### Events

Handle the following TaskBoard events in order to perform Card CRUD operations (create, update, delete):

* [`OnCardCreate`](slug:taskboard-events#oncardcreate)
* [`OnCardDelete`](slug:taskboard-events#oncarddelete)
* [`OnCardUpdate`](slug:taskboard-events#oncardupdate)

### Edit Pane Position

The [TaskBoard `PanePosition` `enum` parameter](slug:Telerik.Blazor.Components.TelerikTaskBoard-2) determines the Card edit form placement. The default value is [`TaskBoardPanePosition.End`](slug:Telerik.Blazor.Components.TaskBoardPanePosition), which is on the right side in left-to-right interfaces.

````RAZOR.skip-repl
<TelerikTaskBoard PanePosition="@TaskBoardPanePosition.End" />
````

## Column Operations

The built-in Column edit operations depend on action buttons and TaskBoard events.

### Buttons

Users can edit or delete Columns by clicking actions in the Column headers. To add a new TaskBoard Column, users can click a button in the [TaskBoard toolbar](slug:taskboard-toolbar).

The `Add`, `Edit`, and `Delete` actions render by default. You can control their visibility through `Buttons` parameters of `TaskBoardCardSettings` and `TaskBoardColumnSettings`.

>caption Enable adding, editing, and deleting Columns (default)

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardSettings>
        <TaskBoardColumnSettings Buttons="@(TaskBoardColumnButtons.EditColumn | TaskBoardColumnButtons.DeleteColumn)" />
    </TaskBoardSettings>
    <TaskBoardToolBar>
        <TaskBoardToolBarAddColumnTool />
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

>caption Disable adding, editing, and deleting Columns

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardSettings>
        <TaskBoardColumnSettings Buttons="@(TaskBoardColumnButtons.AddCard)" />
    </TaskBoardSettings>
    <TaskBoardToolBar>
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

### Events

Handle the following TaskBoard events in order to perform Column CRUD operations (create, update, delete):

* [`OnColumnCreate`](slug:taskboard-events#oncolumncreate)
* [`OnColumnDelete`](slug:taskboard-events#oncolumndelete)
* [`OnColumnUpdate`](slug:taskboard-events#oncolumnupdate)

## Confirm Delete Operations

By default, the TaskBoard requires users to confirm Card and Column delete operations. To delete Cards and Columns immediately without a confirmation, set the TaskBoard `ConfirmDelete` parameter to `false`.

````RAZOR.skip-repl
<TelerikTaskBoard ConfirmDelete="false" />
````

## Next Steps

* [Use TaskBoard templates](slug:taskboard-templates)
* [Manage TaskBoard state](slug:taskboard-state)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
