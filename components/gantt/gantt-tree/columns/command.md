---
title: Command Column
page_title: Gantt Tree - Command Column
description: Command buttons per row in treelist for Blazor.
slug: gantt-columns-command
tags: telerik,blazor,gantt,column,command
published: True
position: 1
---

# Gantt Tree Command Column

The command column of a Gantt Tree allows you to initiate [editing]({%slug gantt-tree-editing%}), or to execute your own commands.

To define it, add a `GanttCommandColumn` in the `GanttColumns` collection of a Gantt Chart. The command column takes a collection of `GanttCommandButton` instances that invoke the commands.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

In this article:

* [Gantt Tree Command Column Features](#features)
   * [GanttCommandButton](#the-ganttcommandbutton-tag)
   * [Built-in Commands](#built-in-commands)
   * [OnClick Handler](#onclick-handler)
   * [Context](#context)
* [Code Example](#example)


## Features

This section describes the available features and their use.

### The GanttCommandButton Tag

The `GanttCommandButton` tag offers the following features:

* `Command` - the command that will be invoked. Can be one of the built-in commands (see below), or a custom command name.
* `ShowInEdit` - a `boolean` property indicating whether the button is only visible while the user is editing/inserting data.
* `ChildContent` - the text the button will render. You can also place it between the command button's opening and closing tags.
* Appearance properties like `Icon`, `Class`, `Enabled` that are come from the underlying [Button Component features]({%slug components/button/overview%}).

### Built-in Commands

There are four built-in commands:

* `Add` - initiates the creation of a new item. Can apply to rows as well, to create a child element for the current row.
* `Edit` - initiates the editing in the Gantt Tree.
* `Save` - performs the actual update operation after the data has been changed. Triggers the `OnUpdate` or `OnCreate` event so you can perform the data source operation. Which event is triggered depends on whether the item was created or edited.
* `Cancel` - aborts the current operation (edit or insert).

### The OnClick handler

The `OnClick` handler of the commands receives an argument of type `GridCommandEventArgs` that exposes the following properties:

* `IsCancelled` - set this to true to prevent the operation if the business logic requires it.
* `Item` - the model item the grid row is bound to. You can use it to access the model fields and methods in order to preform the actual data source operations. Applicable for buttons in a row, not in a toolbar.
* `IsNew` - a boolean field indicating whether the item was just added through the grid interface.

>tip For handling CRUD operations we recommend that you use the grid events (`OnEdit`, `OnUpdate`, `OnCancel`, `OnCreate`). The `OnClick` handler is available for the built-in commands to provide consistency of the API.

### Context

The command column provides access to the data item via `context`. This may be useful for conditional statements or passing parameters to custom business logic.

Use a **named** context variable to avoid errors when nesting components or `RenderFragment`s in general. In such cases, the exception will be similar to ["Child content element ... uses the same parameter name ('context') as enclosing child content element ..."]({%slug nest-renderfragment%}).

````CSHTML

````

## Example

The following code example demonstrates declarations and handling.

>tip The event handlers use `EventCallback` and can be synchronous or async. This example shows async versions, and the signature for the synchronous handlers is `void MyHandlerName(GridCommandEventArgs args)`.

>caption Example of handling custom commands in a grid column

````CSHTML
@* This sample showcases custom command handling for:
    - the built-in Save command that prevents it based on some condition (Name contains "3")
    - a custom command for a row
*@



````

## See Also

  * [Live Demo: TreeList Command Column](https://demos.telerik.com/blazor-ui/treelist/inlineediting)
