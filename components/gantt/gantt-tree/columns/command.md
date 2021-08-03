---
title: Command Column
page_title: Gantt Tree - Command Column
description: Command buttons per row in treelist for Blazor.
slug: treelist-columns-command
tags: telerik,blazor,treelist,column,command
published: True
position: 1
---

# TreeList Command Column

The command column of a Gantt Tree allows you to initiate [editing]({%slug gantt-tree-editing%}), or to execute your own commands.

To define it, add a `GanttCommandColumn` in the `GanttColumns` collection of a Gantt Chart. The command column takes a collection of `GanttCommandButton` instances that invoke the commands.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

In this article:

* [Gantt Tree Command Column Features](#features)
   * [GanttCommandButton](#the-ganttcommandbutton-tag)
   * [Built-in Commands](#built-in-commands)
   * [OnClick Handler](#onclick-handler)
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

## See Also

  * [Live Demo: TreeList Command Column](https://demos.telerik.com/blazor-ui/treelist/inlineediting)
