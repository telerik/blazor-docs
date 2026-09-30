---
title: ToolBar
page_title: TaskBoard ToolBar
description: Learn how to configure a toolbar in the Telerik TaskBoard component for Blazor, also known as a Kanban Board. See how to use built-in and custom tools.
slug: taskboard-toolbar
tags: blazor,taskboard,kanban
components: ["taskboard"]
published: True
position: 30
---

# TaskBoard ToolBar

The TaskBoard toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool&nbsp;Name | Tool Tag | Description |
| --- | --- | --- |
| Add&nbsp;Column | `<TaskBoardToolBarAddColumnTool/>` | A button that appends a new TaskBoard Column to the last position and allows the user to input a Column `Title`. The tool fires the [`OnColumnCreate` event](slug:taskboard-events#oncolumncreate). See the [`TaskBoardToolBarAddColumnTool` API reference](slug:Telerik.Blazor.Components.TaskBoardToolBarAddColumnTool) for the available parameters. |
| Search&nbsp;Box | `<TaskBoardToolBarSearchBoxTool/>` | A textbox that filters Cards by their Description with a `Contains` operator. See the [`TaskBoardToolBarSearchBoxTool` API reference](slug:Telerik.Blazor.Components.TaskBoardToolBarSearchBoxTool) for the available parameters. |
| Separator | `<TaskBoardToolBarSeparatorTool/>` | A vertical line for better visualization of adjacent tools. |
| Spacer | `<TaskBoardToolBarSpacerTool/>` | Empty space that expands to occupy the available space and pushes the tools on either side as far as possible. You can use multiple spacer tools between the other tools. |

>caption Using built-in TaskBoard tools

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardToolBar>
        <TaskBoardToolBarAddColumnTool />
        <TaskBoardToolBarSeparatorTool />
        <TaskBoardToolBarSearchBoxTool />
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

## Custom Tools

In addition to built-in tools, the TaskBoard also supports custom tools. Use the `<TaskBoardToolBarCustomTool>` tag and add HTML or Razor markup as child content.

>caption Using custom TaskBoard tools

````RAZOR.skip-repl
<TelerikTaskBoard>
    <TaskBoardToolBar>
        <TaskBoardToolBarCustomTool>
            <TelerikButton>Custom TaskBoard Button</TelerikButton>
        </TaskBoardToolBarCustomTool>
    </TaskBoardToolBar>
</TelerikTaskBoard>
````

## Example

<demo metaUrl="client/taskboard/toolbar/example-1/" height="550"></demo>

## Next Steps

* [Set up TaskBoard Card and Column editing](slug:taskboard-editing)
* [Use TaskBoard templates](slug:taskboard-templates)
* [Handle TaskBoard events](slug:taskboard-events)

## See Also

* [TaskBoard Live Demos](https://demos.telerik.com/blazor-ui/taskboard/overview)
* [TaskBoard API Reference](slug:Telerik.Blazor.Components.TelerikTaskBoard-2)
