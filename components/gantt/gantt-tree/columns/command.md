---
title: Command Column
page_title: Gantt Tree - Command Column
description: Command buttons per row in treelist for Blazor.
slug: gantt-columns-command
tags: telerik,blazor,gantt,column,command
published: True
position: 1
components: ["gantt"]
---

# Gantt Tree Command Column

The command column of a Gantt Tree allows you to initiate [editing](slug:gantt-tree-editing), or to execute your own commands.

To define it, add a `GanttCommandColumn` in the `GanttColumns` collection of a Gantt Chart. The command column takes a collection of `GanttCommandButton` instances that invoke the commands.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

In this article:

* [Gantt Tree Command Column Features](#command-column-parameters)
   * [GanttCommandButton](#the-ganttcommandbutton-tag)
   * [Built-in Commands](#built-in-commands)
   * [OnClick Handler](#onclick-handler)
   * [Context](#context)
* [Code Example](#example)


## Command Column Parameters

The Blazor Gantt Command Column provides various parameters to configure the component. Also check the [Gantt public API](slug:Telerik.Blazor.Components.TelerikGantt-1).

### The GanttCommandButton Tag

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Description |
| --- | --- |
| `Command` | The command to invoke. Can be one of the built-in commands ([see below](#built-in-commands)), or a custom command name. |
| `ShowInEdit` | Defines if the button is visible only when the user is editing or inserting data. |
| `ChildContent` | The text of the button. You can also place it between the command button's opening and closing tags. |

See also Appearance properties like `Icon`, `Class`, `Enabled` that are coming from the underlying [Telerik UI for Blazor Button Component features](slug:components/button/overview).

### Built-in Commands

Built-in commands:

| Command | Description |
| --- | --- |
| `Add` | Initiates the creation of a new item. Can apply to rows as well, to create a child element for the current row. |
| `Delete` | Initiates the deletion of an existing item. |

### OnClick handler

The `OnClick` handler of the commands receives an argument of type `GanttTaskCommandEventArgs` that exposes the following parameters:

| Parameter | Description |
| --- | --- |
| `IsCancelled` | Set this to `true` to prevent the operation if the business logic requires it. |
| `Item` | The model item of the Gantt row. Use it to access the model fields and perform the actual data source operations. This property is applicable only for command buttons that are inside a Gantt row, not the toolbar. |
| `IsNew` | A boolean field indicating whether the item was just added through the Gantt interface. |

>tip For handling CRUD operations we recommend that you use the Gantt events (`OnEdit`, `OnUpdate`, `OnCancel`, `OnCreate`). The `OnClick` handler is available for the built-in commands to provide consistency of the API.

### Context

The command column provides access to the data item via `context`. This may be useful for conditional statements or passing parameters to custom business logic.

Use a **named** context variable to avoid errors when nesting components or `RenderFragment`s in general. In such cases, the exception will be similar to ["Child content element ... uses the same parameter name ('context') as enclosing child content element ..."](slug:nest-renderfragment).

<div class="skip-repl"></div>
````RAZOR
        <GanttCommandColumn Context="currTask">
            @{
                var task = currTask as FlatModel;

                if (task.ParentId != null)
                {
                    <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
                }
                else
                {
                    <span>Cannot delete main tasks</span>
                }
            }
        </GanttCommandColumn>
````

## Example

The following code example demonstrates declarations and handling of the built-in and custom commands.

>tip The event handlers use `EventCallback` and can be synchronous or async. This example shows async versions, and the signature for the synchronous handlers is `void MyHandlerName(GanttTaskCommandEventArgs args)`.

>caption Example of handling built-in and custom commands in the Gantt component

<demo metaUrl="client/gantt/command/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Tree Command Column](https://demos.telerik.com/blazor-ui/gantt/editing-inline)
