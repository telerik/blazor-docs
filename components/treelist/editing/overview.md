---
title: Overview
page_title: TreeList - CRUD Overview
description: CRUD basics for the TreeList for Blazor.
slug: treelist-editing-overview
tags: telerik, blazor, treelist, editing
published: True
previous_url: /components/treelist/editing/built-in-dialogs/delete-confirmation, /components/treelist/editing/built-in-dialogs/overview
position: 0
components: ["treelist"]
---
# Blazor TreeList CRUD Operations

The Telerik TreeList for Blazor supports create, update, and delete operations (CRUD) with different modes and user experience. The component also supports built-in `DataAnnotations` or custom validation. This page describes:

* [How the create, update, and delete operations work in the TreeList](#basics).
* [What are the available edit modes and how to enable them](#edit-modes).
* [The applicable TreeList commands](#commands).
* [The applicable TreeList events](#events).
* [How to change the built-in editors for certain data types](#column-editors).
* [How to refresh the TreeList data after add, edit, and delete operations](#rebinding-after-data-changes).
* [How the TreeList CRUD operations integrate with other component features](#integration-with-other-features).

## Basics

The TreeList CRUD operations rely on the following algorithm:

1. Users execute [TreeList commands (**Edit**, **Save**, **Delete**, and more)](#commands) with the mouse or keyboard.
1. The TreeList fires [events (`OnCreate`, `OnDelete`, `OnUpdate` and more)](#events), which provide information what the user did or how the component data changed.
1. The application applies the changes to the TreeList data source in the above event handlers.
1. The TreeList rebinds to display the latest data.

### Model Requirements

Adding or editing rows in the TreeList sets the following requirements on the TreeList model:

* The TreeList model class must have a parameterless constructor. Otherwise, use the [TreeList `OnModelInit` event](slug:treelist-events#onmodelinit) to provide a data item instance [when the TreeList needs to create one](#item-instances). Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* There must be a non-editable property that serves as a unique identifier.
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* Self-referencing or inherited properties must not cause `StackOverflowException` or `AmbiguousMatchException` during [programmatic model instance creation](#item-instances).

## Edit Modes

The TreeList offers several ways to add and edit rows with a different user experience:

* [*In-Cell*](slug:treelist-editing-incell)&mdash;users modify the TreeList content cell by cell.
* [*Inline*](slug:treelist-editing-inline)&mdash;users modify the TreeList content row by row.
* [*Popup*](slug:treelist-editing-popup)&mdash;users modify the TreeList content row by row in a modal popup form.

To allow users to add or edit values in the TreeList:

1. Set the `EditMode` parameter to a [member of the `TreeListEditMode` enum](slug:telerik.blazor.treelisteditmode). The default `EditMode` parameter value is `None` and the built-in [`Add` and `Edit` commands](slug://treelist-columns-command#built-in-commands) don't work.
1. Define the required [command buttons](#commands) and [events](#events) for the selected edit mode and operations.

>caption Set up TreeList popup edit mode

````RAZOR.skip-repl
<TelerikTreeList EditMode="@TreeListEditMode.Popup"
                 OnUpdate="@OnTreeListUpdate">
    <TreeListColumns>
        <TreeListCommandColumn>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>
````

>tip See the TreeList add and edit operations in action in the complete examples for TreeList [inline](slug:treelist-editing-inline#example), [in-cell](slug:treelist-editing-incell#example), and [popup](slug:treelist-editing-popup#example) editing.

> Editing multiple rows at the same time is not supported. You can [render editors in all TreeList data cells through column `<Template>`s](slug:grid-kb-edit-all-rows-cells) as an alternative.

### Delete Operations

Delete operations provide the same user experience in all TreeList edit modes and require the same configuration:

* [**Delete** command button](#commands).
* [`OnDelete` event](#events).
* Optional `ConfirmDelete` TreeList parameter. It determines if the component will show a Dialog before firing `OnDelete`, so that users can abort the operation.

Delete operations can work even if the TreeList `EditMode` parameter value is `None`.

If the TreeList contains Delete command buttons that display and operate in edit mode, these buttons will fire the [`OnDelete` event](#events) with a [cloned data item instance](#item-instances) in the [event argument](#treelistcommandeventargs). To find the original data item in the TreeList data source, use the item ID or [override the `Equals()` method of the TreeList model class](slug:grid-kb-save-load-state-localstorage).

>tip See the delete operations in action in the complete examples for TreeList [inline](slug:treelist-editing-inline#example), [in-cell](slug:treelist-editing-incell#example) and [popup](slug:treelist-editing-popup#example) editing. Also check how to [customize the Delete Confirmation Dialog](slug:grid-kb-customize-delete-confirmation-dialog).

## Commands

The TreeList provides the following built-in commands, which enable users to add, delete, and edit rows:

* `Add`&mdash;adds a new row and puts it in edit mode. Fires the `OnAdd` [event](#events). If the command button is in the TreeList toolbar, the new row is created at root level. If the command button is in the command column, the new row is created as a child of the current row.
* `Cancel`&mdash;cancels the [row or cell](#edit-modes) changes and exits edit mode. Fires the `OnCancel` event.
* `Delete`&mdash;deletes a row. Fires the `OnDelete` event.
* `Edit`&mdash;puts a TreeList row or cell in edit mode. Fires the `OnEdit` event.
* `Save`&mdash;confirms the row or cell changes and exits edit mode, if the user input is valid. Fires the `OnUpdate` event.

Users execute commands in the following ways:

* By clicking on [command buttons](slug:treelist-columns-command#the-treelistcommandbutton-tag).
* By clicking on editable cells in [in-cell edit mode](slug:treelist-editing-incell) and then anywhere else on the page.
* By using the [TreeList keyboard navigation](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation).

Command buttons can only reside in a [TreeList Command Column](slug:treelist-columns-command) or the [TreeList ToolBar](slug:treelist-toolbar). Each command button in the command column is visible only in display mode or only in edit mode, depending on the button's `ShowInEdit` boolean parameter value

You can also [trigger add and edit operations programmatically](slug:grid-kb-add-edit-state) from anywhere on the web page through the [TreeList State](slug:treelist-state).

## Events

The following table describes the TreeList events, which are related to adding, deleting, and editing items. Also check the sections about [item instances](#item-instances) and [event arguments](#treelistcommandeventargs) below.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Event | Required | Description | [Item Instance](#treelistcommandeventargs) | If&nbsp;Cancelled |
| --- | --- | --- | --- | --- |
| `OnAdd` | No | Fires on `Add` [command button](slug://treelist-columns-command) click, before the TreeList enters add mode. This event preceeds `OnCreate` or `OnCancel`. | [New](#item-instances) | TreeList remains in read mode. |
| `OnCancel` | No | Fires on `Cancel` command invocation. | [New or cloned](#item-instances) | TreeList remains in add or edit mode. |
| `OnCreate` | To add new items. | Fires on `Save` command invocation for new items. This event succeeds `OnAdd`. | [New](#item-instances) | TreeList remains in add mode. |
| `OnDelete` | To [delete items](#delete-operations). | Fires on `Delete` command button click. | [Original or cloned](#item-instances) | TreeList won't rebind. Deletion depends on the app itself. |
| `OnEdit` | No | Fires on `Edit` command invocation, before the TreeList actually enters edit mode. This event preceeds `OnCreate` or `OnCancel`. | Original | TreeList remains in read mode. |
| `OnModelInit` | [Depends on the TreeList model type](slug:treelist-events#onmodelinit) | Fires when the TreeList requires a [new model instance](#item-instances), which is immediately before `OnAdd` or immediately after `OnEdit`. <br /> Use this event when the TreeList model type is an [interface, abstract class, or has no parameterless constructor](slug:treelist-events#onmodelinit). | No event arguments | Not cancellable |
| `OnUpdate` | To edit existing items. | Fires on `Save` command invocation for existing items. This event succeeds `OnEdit`. | [Cloned](#item-instances) | TreeList remains in edit mode. |

The following considerations apply for the TreeList CRUD events:

* Most events provide a [`TreeListCommandEventArgs` argument](#treelistcommandeventargs) in the handler. `OnModelInit` has no event argument.
* All events, except `OnModelInit`, are cancellable and the user action can be prevented. Cancelling `OnDelete` does not automatically prevent item deletion from the TreeList data source. This depends entirely on the executed application code.
* The `OnCreate`, `OnDelete`, and `OnUpdate` events are required when using add, delete, and edit operations, respectively. The app must use these events to modify the TreeList data source. [The TreeList does not modify its data directly](#item-instances).

Some events always fire in the same sequence, based on the user actions. In the list below, the value input and [validation](slug:treelist-editing-validation) occur between the second and third event:

* `OnModelInit`, `OnAdd`, and `OnCreate` for add operations
* `OnEdit`, `OnModelInit`, and `OnUpdate` for edit operations

Both user workflows can end with the `OnCancel` event instead of `OnCreate` or `OnUpdate`.

> Use `async Task` instead of `async void` for event handlers that execute awaitable operations. Otherwise the TreeList may show incorrect data, or the app may throw exceptions related to disposed objects or concurrency.

### Item Instances

The TreeList does not expose or modify its data items directly in add or edit mode. Instead, the component creates a new item instance or clones an existing one. The user is always changing the values of the separate item instance. The TreeList uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) and [`PropertyInfo.SetValue()`](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.propertyinfo.setvalue) to create and populate items for add and edit mode. This approach:

* Allows users to cancel their changes and revert to the original data item values.
* Provides the app with full control over the data source.
* Sets some requirements [for the TreeList model class](#model-requirements) and for [updating Entity Framework models](slug:grid-kb-entity-framework-model-update).

### TreeListCommandEventArgs

All events in the [Events table](#events), except `OnModelInit`, provide a [`TreeListCommandEventArgs`](slug:telerik.blazor.components.treelistcommandeventargs) event argument. It exposes the following properties:

| Property&nbsp;Name | Type | Description |
| --- | --- | --- |
| `Field` | `string` | The [column `Field` name](slug:treelist-columns-bound#data-binding). Applicable only for [in-cell edit mode](slug:treelist-editing-incell). |
| `IsCancelled` | `bool` | Defines if the user action should be prevented. See the [Events table](#events) for details. |
| `IsNew` | `bool` | Defines if `Item` is a newly added row or an existing row. |
| `Item` | `object` | The data item, which the user is adding, deleting, or editing. Cast it to the TreeList model type. |
| `ParentItem` | `object?` | The parent of the data item, which the user is adding. Available only in the `OnCreate` event. Cast the object to the TreeList model type. |
| `Value` | `object` | The data item value, which the user is editing. You can cast it to the correct type, based on the `Field`. Applicable only for [in-cell edit mode](slug:treelist-editing-incell). |

## Column Editors

You can customize the column editors through the [column `EditorType` parameter](slug:treelist-columns-bound#data-operations), or by using an [editor template](slug:treelist-templates-editor). The `EditorType` parameter accepts a member of the `TreeListEditorType` enum:

| Column Field Type | Valid `TreeListEditorType` Enum Members |
| --- | --- |
| `bool` | `CheckBox` (default) <br /> `Switch` |
| `DateTime` | `DatePicker` (default) <br /> `DateTimePicker` <br> `TimePicker` |
| `string` | `TextArea` <br /> `TextBox` (default) |

>caption Setting column editor type

````RAZOR.skip-repl
<TreeListColumn Field="@nameof(Race.StartDateTime)"
                EditorType="@TreeListEditorType.DateTimePicker" />
````

## Rebinding After Data Changes

During add, edit, and delete operations, the TreeList expects the application to make changes to the data source (database) and then provide the latest data to the component.

In the `OnCreate`, `OnDelete`, and `OnUpdate` event handler, the application must do one of the following:

* Make a read request to the database. Retrieve the latest data and set it as the new value of the TreeList `Data` parameter. The TreeList will rebind automatically. The following examples demonstrate this approach:
    * [Inline TreeList Editing](slug:treelist-editing-inline#example)
    * [Popup TreeList Editing](slug:treelist-editing-popup#example)
    * [In-Cell TreeList Editing](slug:treelist-editing-incell#example)
* [Use the event arguments to update the local item collection in the `Data` parameter manually](slug:grid-kb-load-cached-data-after-crud-operations#data-parameter).

## Integration with Other Features

Updated rows comply with the current filter, search, and sort settings, just like all other rows. As a result, an updated row may render at a different place or disappear.

When editing a row with child items, it will collapse unless you override the `Equals()` method of the TreeList model class.

Learn more integration details for the [inline](slug:treelist-editing-inline#integration-with-other-features) and [in-cell](slug:treelist-editing-incell#integration-with-other-features) edit modes.

## New Row Position

You can control whether a newly added item appears at the top or bottom of the TreeList. Use the [`NewRowPosition`](https://www.telerik.com/blazor-ui/documentation/api/telerik.blazor.treelistnewrowposition) parameter to specify the position. This parameter does not affect Popup edit mode, which always displays a dialog for new items.

This configuration is available in InCell and Inline edit modes. For more details, see the [InCell Editing](slug:treelist-editing-incell#new-row-position) and [Inline Editing](slug:treelist-editing-inline#new-row-position) articles.

> When you set `NewRowPosition` to `Bottom`, add the new item at the end of your data collection in the `OnCreate` event handler. When set to `Top`, insert the new item at the beginning of the collection. This ensures the new row appears in the correct position in the view after successfully creating the new record.

>caption Example of adding a new item to the TreeList based on the `NewRowPosition` value

<div class="skip-repl"></div>
````C#
private void OnCreate(TreeListCommandEventArgs args)
{
    if (NewRowPosition == TreeListNewRowPosition.Bottom)
    {
        dataCollection.Add(newItem);
    }
    else // Top
    {
        dataCollection.Insert(0, newItem);
    }
}    
````

## Examples

See TreeList CRUD operations in action at:

* [TreeList Inline Editing](slug:treelist-editing-inline#example)
* [TreeList Popup Editing](slug:treelist-editing-popup#example)
* [TreeList In-Cell Editing](slug:treelist-editing-incell#example)
* [Online TreeList Demos](https://demos.telerik.com/blazor-ui/treelist/editing-inline)

## See Also

* [Enter and Exit TreeList Edit Mode Programmatically](slug://grid-kb-add-edit-state)
* [Set Default Values for TreeList Add and Edit Mode](slug://grid-kb-default-value-for-new-row)
* [Edit All TreeList Rows and Cells at the Same Time](slug:grid-kb-edit-all-rows-cells)
