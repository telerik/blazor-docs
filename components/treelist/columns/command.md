---
title: Command Column
page_title: TreeList - Command Column
description: Command buttons per row in treelist for Blazor.
slug: treelist-columns-command
tags: telerik,blazor,treelist,column,command
published: True
position: 1
components: ["treelist"]
---

# TreeList Command Column

The command column of a treelist allows you to initiate [inline](slug:treelist-editing-inline) or [popup](slug:treelist-editing-popup) editing, or to execute your own commands.

To define it, add a `TreeListCommandColumn` in the `TreeListColumns` collection of a treelist. The command column takes a collection of `TreeListCommandButton` instances that invoke the commands. It also provides the data item `context` and a `Title` property to set its header text.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

In this article:

* [TreeList Command Column Features](#features)
   * [TreeListCommandButton](#the-treelistcommandbutton-tag)
   * [Built-in Commands](#built-in-commands)
   * [Context](#context)
   * [OnClick Handler](#onclick-handler)
* [Code Example](#example)


## Features

This section describes the available features and their use.

### The TreeListCommandButton Tag

The `TreeListCommandButton` tag offers the following features:

* `Command` - the command that will be invoked. Can be one of the built-in commands (see below), or a custom command name.
* `OnClick` - the event handler that the button will fire. If used on a built-in command, this handler will fire before the [corresponding CRUD event](slug:treelist-editing-overview). Cancelling it will prevent the built-in CRUD event from firing.
* `ShowInEdit` - a boolean property indicating whether the button is visible only in edit mode or only in display mode.
* `ChildContent` - the text the button will render. You can also place it between the command button's opening and closing tags.
* Appearance properties like `Icon`, `Class`, `Enabled` that are come from the underlying [Telerik UI for Blazor Button Component features](slug:components/button/overview).

### Built-in Commands

There are four built-in commands:

* `Add` - initiates the creation of a new item. Can apply to rows as well, to create a child element for the current row.
* `Edit` - initiates the inline or popup editing (depending on the TreeListEditMode configuration of the treelist).
* `Delete` - initiates the [deletion of an existing item](slug:treelist-editing-overview#delete-operations).
* `Save` - performs the actual update operation after the data has been changed. Triggers the `OnUpdate` or `OnCreate` event so you can perform the data source operation. Which event is triggered depends on whether the item was created or edited.
* `Cancel` - aborts the current operation (edit or insert).

> The `Add` and `Edit` commands require [enabled editing](slug:treelist-overview#editing).

### Context

The command column provides access to the data item via `context`. This may be useful for conditional statements or passing parameters to custom business logic.

<div class="skip-repl"></div>
````RAZOR
<TreeListCommandColumn>
    @{
        var product = context as ProductModel;
        if (product.Discontinued)
        {
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
        }
        else
        {
            <span>Cannot delete active products</span>
        }
    }
</TreeListCommandColumn>
````

### OnClick Handler

The `OnClick` handler of the commands receives an argument of type `TreeListCommandEventArgs` that exposes the following properties:

* `IsCancelled` - set this to true to prevent the operation if the business logic requires it.
* `Item` - the model item of the treelist row. You can use it to access the model fields and preform the actual data source operations. This property is applicable only for command buttons that are inside a treelist row, not the toolbar.
* `ParentItem` - the parent item of the current item, if any, otherwise `null`.
* `IsNew` - a boolean field indicating whether the item was just added through the treelist interface.

>tip For handling CRUD operations we recommend that you use the treelist events (`OnEdit`, `OnUpdate`, `OnCancel`, `OnCreate`). The `OnClick` handler is available for the built-in commands to provide consistency of the API.

>tip The event handlers use `EventCallback` and can be synchronous or async. This example shows async versions, and the signature for the synchronous handlers is `void MyHandlerName(TreeListCommandEventArgs args)`.

## Example

>caption Example of handling custom commands in a TreeList

<demo metaUrl="client/treelist/columns/command/example-1/" height="720"></demo>

, after the custom command was clicked for the second row, and after the user tried to edit the first row to put the letter "a" in the Name column.
## See Also

* [Live Demo: TreeList Command Column](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
