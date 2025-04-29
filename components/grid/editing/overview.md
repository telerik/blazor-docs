---
title: Overview
page_title: Grid - CRUD Overview
description: CRUD basics for the Grid for Blazor.
slug: grid-editing-overview
tags: telerik, blazor, grid, editing
published: True
previous_url: /components/grid/editing/built-in-dialogs/delete-confirmation, /components/grid/editing/built-in-dialogs/overview
position: 0
---

# Blazor Grid CRUD Operations

The Telerik Grid for Blazor supports create, update, and delete operations (CRUD) with different modes and user experience. The component also supports built-in `DataAnnotations` or custom validation. This page describes:

* [How the create, update, and delete operations work in the Grid](#basics).
* [What are the available edit modes and how to enable them](#edit-modes).
* [The applicable Grid commands](#commands).
* [The applicable Grid events](#events).
* [How to change the built-in editors for certain data types](#column-editors).
* [How to refresh the Grid data after add, edit, and delete operations](#rebinding-after-data-changes).
* [How the Grid CRUD operations integrate with other component features](#integration-with-other-features).

## Basics

The Grid CRUD operations rely on the following algorithm:

1. Users execute [Grid commands (**Edit**, **Save**, **Delete**, and more)](#commands) with the mouse or keyboard.
1. The Grid fires [events (`OnCreate`, `OnDelete`, `OnUpdate` and more)](#events), which provide information what the user did or how the component data changed.
1. The application applies the changes to the Grid data source in the above event handlers.
1. The Grid rebinds to display the latest data.

### Model Requirements

Adding or editing rows in the Grid sets the following requirements on the Grid model:

* The Grid model class must have a parameterless constructor. Otherwise, use the [Grid `OnModelInit` event](slug:grid-events#onmodelinit) to provide a data item instance [when the Grid needs to create one](#item-instances). Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* All complex properties used in the Grid must be instantiated in the [Grid `OnModelInit` event](slug:grid-events#onmodelinit).
* Self-referencing or inherited properties must not cause `StackOverflowException` or `AmbiguousMatchException` during [programmatic model instance creation](#item-instances).
## Edit Modes

The Grid offers several ways to add and edit rows with a different user experience:

* [*In-Cell*](slug:grid-editing-incell)&mdash;users modify the Grid content cell by cell.
* [*Inline*](slug:grid-editing-inline)&mdash;users modify the Grid content row by row.
* [*Popup*](slug:grid-editing-popup)&mdash;users modify the Grid content row by row in a modal popup form.

To allow users to add or edit values in the Grid:

1. Set the `EditMode` parameter to a [member of the `GridEditMode` enum](slug:telerik.blazor.grideditmode). The default `EditMode` parameter value is `None` and the built-in [`Add` and `Edit` commands](slug://components/grid/columns/command#built-in-commands) don't work.
1. Define the required [command buttons](#commands) and [events](#events) for the selected edit mode and operations.

>caption Set up Grid popup edit mode

````RAZOR.skip-repl
<TelerikGrid EditMode="@GridEditMode.Popup"
             OnUpdate="@OnGridUpdate">
    <GridColumns>
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>
````

>tip See the Grid add and edit operations in action in the complete examples for Grid [inline](slug:grid-editing-inline#examples), [in-cell](slug:grid-editing-incell#examples), and [popup](slug:grid-editing-popup#examples) editing.

> Editing multiple rows at the same time is not supported. You can [render editors in all Grid data cells through column `<Template>`s](slug:grid-kb-edit-all-rows-cells) as an alternative.

### Delete Operations

Delete operations provide the same user experience in all Grid edit modes and require the same configuration:

* [**Delete** command button](#commands).
* [`OnDelete` event](#events).
* Optional `ConfirmDelete` Grid parameter. It determines if the component will show a Dialog before firing `OnDelete`, so that users can abort the operation.

Delete operations can work even if the Grid `EditMode` parameter value is `None`.

>tip See the delete operations in action in the complete examples for Grid [inline](slug:grid-editing-inline#examples), [in-cell](slug:grid-editing-incell#examples), and [popup](slug:grid-editing-popup#examples) editing. Also check how to [customize the Delete Confirmation Dialog](slug:grid-kb-customize-delete-confirmation-dialog).

## Commands

The Grid provides the following built-in commands, which enable users to add, delete, and edit rows:

* `Add`&mdash;adds a new row and puts it in edit mode. Fires the `OnAdd` [event](#events).
* `Cancel`&mdash;cancels the [row or cell](#edit-modes) changes and exits edit mode. Fires the `OnCancel` event.
* `Delete`&mdash;deletes a row. Fires the `OnDelete` event.
* `Edit`&mdash;puts a Grid row or cell in edit mode. Fires the `OnEdit` event.
* `Save`&mdash;confirms the row or cell changes and exits edit mode, if the user input is valid. Fires the `OnUpdate` event.

Users execute commands in the following ways:

* By clicking on [command buttons](slug:components/grid/columns/command#the-gridcommandbutton-tag).
* By clicking on editable cells in [in-cell edit mode](slug:grid-editing-incell) and then anywhere else on the page.
* By using the [Grid keyboard navigation](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation).

Command buttons can only reside in a [Grid Command Column](slug:components/grid/columns/command) or the [Grid ToolBar](slug:components/grid/features/toolbar). You can also [trigger add and edit operations programmatically](slug:grid-kb-add-edit-state) from anywhere on the web page through the [Grid State](slug:grid-state).

## Events

The following table describes the Grid events, which are related to adding, deleting, and editing items. Also check the sections about [item instances](#item-instances) and [event arguments](#gridcommandeventargs) below.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Event | Required | Description | [Item Instance](#gridcommandeventargs) | If&nbsp;Cancelled |
| --- | --- | --- | --- | --- |
| `OnAdd` | No | Fires on `Add` [command button](slug://components/grid/columns/command) click, before the Grid enters add mode. This event preceeds `OnCreate` or `OnCancel`. | [New](#item-instances) | Grid remains in read mode. |
| `OnCancel` | No | Fires on `Cancel` command invocation. | [New or cloned](#item-instances) | Grid remains in add or edit mode. |
| `OnCreate` | To add new items. | Fires on `Save` command invocation for new items. This event succeeds `OnAdd`. | [New](#item-instances) | Grid remains in add mode. |
| `OnDelete` | To [delete items](#delete-operations). | Fires on `Delete` command button click. | Original | Grid won't rebind. Deletion depends on the app itself. |
| `OnEdit` | No | Fires on `Edit` command invocation, before the Grid actually enters edit mode. This event preceeds `OnUpdate` or `OnCancel`. | Original | Grid remains in read mode. |
| `OnModelInit` | [Depends on the Grid model type](slug:grid-events#onmodelinit) | Fires when the Grid requires a [new model instance](#item-instances), which is immediately before `OnAdd` or immediately after `OnEdit`. <br /> Use this event when the Grid model type is an [interface, abstract class, or has no parameterless constructor](slug:grid-events#onmodelinit). | No event arguments | Not cancellable |
| `OnUpdate` | To edit existing items. | Fires on `Save` command invocation for existing items. This event succeeds `OnEdit`. | [Cloned](#item-instances) | Grid remains in edit mode. |

The following considerations apply for the Grid CRUD events:

* Most events provide a [`GridCommandEventArgs` argument](#gridcommandeventargs) in the handler. `OnModelInit` has no event argument.
* All events, except `OnModelInit`, are cancellable and the user action can be prevented. Cancelling `OnDelete` does not automatically prevent item deletion from the Grid data source. This depends entirely on the executed application code.
* The `OnCreate`, `OnDelete`, and `OnUpdate` events are required when using add, delete, and edit operations, respectively. The app must use these events to modify the Grid data source. [The Grid does not modify its data directly](#item-instances).

Some events always fire in the same sequence, based on the user actions. In the list below, the value input and [validation](slug:grid-editing-validation) occur between the second and third event:

* `OnModelInit`, `OnAdd`, and `OnCreate` for add operations
* `OnEdit`, `OnModelInit`, and `OnUpdate` for edit operations

Both user workflows can end with the `OnCancel` event instead of `OnCreate` or `OnUpdate`.

> Use `async Task` instead of `async void` for event handlers that execute awaitable operations. Otherwise the Grid may show incorrect data, or the app may throw exceptions related to disposed objects or concurrency.

### Item Instances

The Grid does not expose or modify its data items directly in add or edit mode. Instead, the component creates a new item instance or clones an existing one. The user is always changing the values of the separate item instance. The Grid uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) and [`PropertyInfo.SetValue()`](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.propertyinfo.setvalue) to create and populate items for add and edit mode. This approach:

* Allows users to cancel their changes and revert to the original data item values.
* Provides the app with full control over the data source.
* Sets some requirements [for the Grid model class](#model-requirements) and for [updating Entity Framework models](slug:grid-kb-entity-framework-model-update).

### GridCommandEventArgs

All events in the [Events table](#events), except `OnModelInit`, provide a [`GridCommandEventArgs`](slug:telerik.blazor.components.gridcommandeventargs) event argument. It exposes the following properties:

| Property&nbsp;Name | Type | Description |
| --- | --- | --- |
| `Field` | `string` | The [column `Field` name](slug:components/grid/columns/bound#data-binding). Applicable only for [in-cell edit mode](slug:grid-editing-incell). |
| `IsCancelled` | `bool` | Defines if the user action should be prevented. See the [Comparison table](#comparison) below for details. |
| `IsNew` | `bool` | Defines if `Item` is a newly added row or an existing row. |
| `Item` | `object` | The data item, which the user is adding, deleting, or editing. Cast it to the Grid model type. |
| `Value` | `object` | The data item value, which the user is editing. You can cast it to the correct type, based on the `Field`. Applicable only for [in-cell edit mode](slug:grid-editing-incell). |

## Column Editors

You can customize the column editors through the [column `EditorType` parameter](slug:components/grid/columns/bound#data-operations), or by using an [editor template](slug:grid-templates-editor). The `EditorType` parameter accepts a member of the `GridEditorType` enum:

| Column Field Type | Valid `GridEditorType` Enum Members |
| --- | --- |
| `bool` | `CheckBox` (default) <br /> `Switch` |
| `DateTime` | `DatePicker` (default) <br /> `DateTimePicker` <br> `TimePicker` |
| `string` | `TextArea` <br /> `TextBox` (default) |

>caption Setting column editor type

````RAZOR.skip-repl
<GridColumn Field="@nameof(Race.StartDateTime)"
            EditorType="@GridEditorType.DateTimePicker" />
````

## Rebinding After Data Changes

During add, edit, and delete operations, the Grid expects the application to make changes to the data source (database) and then provide the latest data to the component. Reloading the Grid can happen in different ways, depending on the current Grid [data binding mechanism](slug:common-features-data-binding-overview#how-to-provide-data).

### Data Parameter

In the `OnCreate`, `OnDelete`, and `OnUpdate` event handler, the application must do one of the following:

* Make a read request to the database. Retrieve the latest data and set it as the new value of the Grid `Data` parameter. The Grid will rebind automatically. The following examples demonstrate this approach:
    * [Inline Grid Editing](slug:grid-editing-inline#advanced)
    * [Popup Grid Editing](slug:grid-editing-popup#advanced)
    * [In-Cell Grid Editing](slug:grid-editing-incell#advanced)
* [Use the event arguments to update the local item collection in the `Data` parameter manually](slug:grid-kb-load-cached-data-after-crud-operations#data-parameter).

### OnRead Event

The Grid automatically fires [`OnRead`](slug://components/grid/manual-operations) immediately after the following events, unless they are cancelled:

* `OnCancel`
* `OnCreate`
* `OnDelete`
* `OnUpdate`

In this way, the Grid receives the latest data after each operation is complete. If you need to skip the database read request, you can [cache the Grid data in the `OnRead` handler, modify it manually, and reuse it](slug:grid-kb-load-cached-data-after-crud-operations#onread-event).

## Integration with Other Features

Updated rows comply with the current filter, group, search, and sort settings, just like all other rows. As a result, an updated row may render at a different place or disappear. To prevent this temporarily, you can [bind the component with `OnRead` and provide cached data after the edit operation](slug:grid-kb-load-cached-data-after-crud-operations#onread-event).

When editing a master row in a [hierarchy Grid](slug://components/grid/features/hierarchy), the respective `DetailTemplate` will collapse unless you [override the `Equals()` method of the master data item class](slug://grid-kb-editing-in-hierarchy).

Learn more integration details for the [inline](slug:grid-editing-inline#integration-with-other-features) and [in-cell](slug:grid-editing-incell#integration-with-other-features) edit modes.

## Examples

See Grid CRUD operations in action at:

* [Grid Inline Editing](slug:grid-editing-inline#examples)
* [Grid Popup Editing](slug:grid-editing-popup#examples)
* [Grid In-Cell Editing](slug:grid-editing-incell#examples)
* [Online Grid Demos](https://demos.telerik.com/blazor-ui/grid/editing-inline)

## See Also

* [Enter and Exit Grid Edit Mode Programmatically](slug://grid-kb-add-edit-state)
* [Set Default Values for Grid Add and Edit Mode](slug://grid-kb-default-value-for-new-row)
* [Edit Rows in Hierarchy Grid](slug://grid-kb-editing-in-hierarchy)
* [Edit All Grid Rows and Cells at the Same Time](slug:grid-kb-edit-all-rows-cells)
* [Blazor Grid](slug:grid-overview)
