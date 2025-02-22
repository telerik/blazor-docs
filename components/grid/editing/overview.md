---
title: Overview
page_title: Grid - CRUD Overview
description: CRUD basics for the Grid for Blazor.
slug: components/grid/editing/overview
tags: telerik, blazor, grid, editing
published: True
previous_url: /components/grid/editing/built-in-dialogs/delete-confirmation, /components/grid/editing/built-in-dialogs/overview
position: 0
---

# Blazor Grid CRUD Operations

The Telerik Grid for Blazor features create, update, and delete operations (CRUD) in different UX modes. The component also supports `DataAnnotations` or custom validation. This page describes:

* [How the create, update, and delete operations work in the Grid](#basics).
* [What are the available edit modes and how to enable them](#edit-modes).
* [The Grid commands](#commands)
* [The Grid events](#events)
* [How to change the built-in editors for certain data types](#column-editors).
* [How to refresh the Grid after editing](#rebinding-after-data-changes).
* [How Grid editing integrates with other component features](#integration-with-other-features).

## Basics

The Grid CRUD operations rely on the following algorithm and milestones:

1. Users execute [Grid commands (**Edit**, **Save**, **Delete**, and more)](#commands) with the mouse or keyboard.
1. The Grid fires [events (`OnCreate`, `OnDelete`, `OnUpdate` and more)](#events), which provide information what the user did or how the component data changed.
1. The application applies the changes to the Grid data source in the above event handlers.
1. The Grid rebinds to display the latest data.

### Model Requirements

Adding or editing rows in the Grid has the following requirements on the Grid model:

* The Grid model class must have a parameterless constructor. Otherwise, use the [Grid `OnModelInit` event](slug:grid-events#onmodelinit) to provide a data item instance [when the Grid needs to create one](#item-instance). Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* There must be no self-referencing or inherited properties that can cause `StackOverflowException` or `AmbiguousMatchException` during [programmatic model instance creation](#events).

## Edit Modes

The Grid offers several ways to add and edit rows with a different user experience:

* *In-Cell*&mdash;users modify the Grid content cell by cell.
* *Inline*&mdash;users modify the Grid content row by row.
* *Popup*&mdash;users modify the Grid content row by row in a modal popup form.

To allow users to add or edit values in the Grid:

1. Set the `EditMode` parameter to a [member of the `GridEditMode` enum](slug:telerik.blazor.grideditmode).
1. Define the required [command buttons](#commands) and [events](#events) for the selected edit mode.

The default `EditMode` parameter value is `GridEditMode.None`. The built-in [`Add` and `Edit` commands](slug://components/grid/columns/command#built-in-commands) don't work in this case.

Editing multiple rows at the same time is not supported. You can [render editors in all Grid data cells through column `<Template>`s](slug:grid-kb-edit-all-rows-cells) as an alternative.

### Delete Operations

Delete operations provide the same user experience in all Grid edit modes and require the same configuration:

* [**Delete** command button](#commands)
* [`OnDelete` event](#events)
* Optional `ConfirmDelete` Grid parameter. It determines if the component will show a Dialog before firing `OnDelete`, so that users can abort the operation.

Delete operations can work even if the Grid `EditMode` parameter value is `None`.

See delete operations in action in the examples for Grid [inline](slug:components/grid/editing/inline#examples), [in-cell](slug:components/grid/editing/incell#examples) and [popup](slug:components/grid/editing/popup#examples) editing. Also check how to [customize the Delete Confirmation Dialog](slug:grid-kb-customize-delete-confirmation-dialog).

## Commands

The Grid provides the following built-in commands, which enable users to manage the component data:

* `Add`&mdash;adds a new row and puts it in edit mode. Fires the `OnAdd` [event](#events).
* `Cancel`&mdash;cancels the row changes and exits edit mode. Fires the `OnCancel` event.
* `Delete`&mdash;deletes a Grid rows. Fires the `OnDelete` event.
* `Edit`&mdash;puts a Grid row in edit mode. Fires the `OnEdit` event.
* `Save`&mdash;confirms the row changes and exits edit mode, if the user input is valid. Fires the `OnUpdate` event.

Users execute commands in the following ways:

* By clicking on [command buttons](slug:slug:components/grid/columns/command#the-gridcommandbutton-tag).
* By clicking on editable cells in [in-cell edit mode](slug:components/grid/editing/incell) and then anywhere else on the page.
* By pressing keys that are part of the [Grid keyboard navigation](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation).

Command buttons can only reside in a [Grid Command Column](slug:components/grid/columns/command) or the [Grid ToolBar](slug:components/grid/features/toolbar). You can also [trigger add and edit operations programmatically](slug:grid-kb-add-edit-state) from anywhere on the web page through the [Grid State](slug:grid-state).

## Events

The Grid events, which are related to adding, editing, and deleting items, have the following characteristics:

* All events provide a [`GridCommandEventArgs` argument](#gridcommandeventargs) in the handler.
* All events are cancellable, so that the user action is prevented.
* Some of the events are required. The app must use them to modify the Grid data source, based on the user changes.
* Some of the events are optional. The app can use them to implement custom logic and manage the user experience.
* Some event handlers receive the original data item in `GridCommandEventArgs.Item`, while others receive a [new or cloned data item instance](#item-instances).

The Grid CRUD event handlers must return either `void` or `async Task`. Do not use `async void` for handlers that execute awaitable operations. Otherwise the Grid may show incorrect data, or the app may throw exceptions related to disposed objects or concurrency.

### GridCommandEventArgs

The [`GridCommandEventArgs` event argument](slug:telerik.blazor.components.gridcommandeventargs) exposes the following properties:

| Property Name | Type | Description |
| --- | --- | --- |
| `Field` | `string` | The [column `Field` name](slug:components/grid/columns/bound#data-binding). Applicable only for [in-cell edit mode](slug:components/grid/editing/incell). |
| `IsCancelled` | `bool` | Defines if the user action should be prevented. See the [Comparison table](#comparison) below for details. |
| `IsNew` | `bool` | Defines if `Item` is a newly added row or an existing row. |
| `Item` | `object` | The data item, which the user is adding, deleting, or editing. Cast it to the Grid model type. |
| `Value` | `object` | The data item value, which the user is editing. You can cast it to the correct type, based on the `Field`. Applicable only for [in-cell edit mode](slug:components/grid/editing/incell). |

### Item Instances

The Grid does not modify its data directly when going to add or edit mode. Instead, it creates a new item instance or clones an existing one. The component uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) and [`PropertyInfo.SetValue()`](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.propertyinfo.setvalue). This approach:

* Allows users to cancel their changes and revert to the original data item values.
* Provides the app with full control over the data source.
* Brings some requirements [for the Grid model class](#model-requirements) and for [updating Entity Framework models](slug:grid-kb-entity-framework-model-update).

### Comparison

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Event | Required | Description | `GridCommandEventArgs` `Item` Instance | If Cancelled |
| --- | --- | --- | --- | --- |
| `OnAdd` | No | Fires on `Add` [command button](slug://components/grid/columns/command) click, before the Grid enters add mode. This event preceeds `OnCreate` or `OnCancel`. | New | The Grid remains in read mode. |
| `OnCancel` | No | Fires on `Cancel` command button click. | New or cloned | The Grid remains in add or edit mode. |
| `OnCreate` | To add new items. | Fires on `Save` command button click for new items. This event succeeds `OnAdd`. | New | The Grid remains in add mode. |
| `OnDelete` | To [delete items](#delete-operations). | Fires on `Delete` command button click. | Original | The item remains in the data. |
| `OnEdit` | No | Fires on `Edit` command button click, before the Grid actually enters edit mode. This event preceeds `OnCreate` or `OnCancel`. | Original | The Grid remains in read mode. |
| `OnUpdate` | To edit existing items. | Fires on `Save` command button click for existing items. This event succeeds `OnEdit`. | Cloned | The Grid remains in edit mode. |

## Column Editors

You can customize the editors rendered in the Grid by providing the `EditorType` attribute, exposed on the `<GridColumn>`, or by using the [Editor Template](slug:grid-templates-editor). The `EditorType` attribute accepts a member of the `GridEditorType` enum:

| Column Field Type | Valid `GridEditorType` Enum Members |
| --- | --- |
| `bool` | `CheckBox` (default) <br /> `Switch` |
| `DateTime` | `DatePicker` (default) <br /> `DateTimePicker` <br> `TimePicker` |
| `string` | `TextArea` <br /> `TextBox` (default) |

## Rebinding After Data Changes

During add, edit, and delete operations, the Grid expects the application to make changes to the data source and provide the latest data to the component. This can happen in different ways, depending on the current Grid [data binding mechanism](slug:common-features-data-binding-overview#how-to-provide-data).

### Data Parameter

At the end of the `OnCreate`, `OnDelete`, and `OnUpdate` event handler, the application must do one of the following:

* Make a request to the database and retrieve the latest data. Set the collection as the new value of the Grid `Data` parameter. The Grid will rebind automatically. The following examples demonstrate this approach: ........
* [Use the CUD event arguments to update the local item collection in the `Data` parameter manually](slug:grid-kb-load-cached-data-after-crud-operations#data-parameter).

### OnRead Event

The Grid automatically fires [`OnRead`](slug://components/grid/manual-operations) immediately after the following events, unless they are cancelled:

* `OnCancel`
* `OnCreate`
* `OnDelete`
* `OnUpdate`

In this way, the Grid receives the latest data after each operation is complete. If you need to skip the database read request in this case, you can [cache the Grid data in the `OnRead` handler, modify it manually, and reuse it](slug:grid-kb-load-cached-data-after-crud-operations#onread-event).

## Integration with Other Features

Updated rows comply with the current filter, group, search, and sort settings, just like all other rows. As a result, an updated row may render at a different place or disappear. To prevent this temporarily, you can [bind the component with `OnRead` and provide cached data after the edit operation](slug:grid-kb-load-cached-data-after-crud-operations#onread-event).

When editing a master row in a [hierarchy Grid](slug://components/grid/features/hierarchy), the respective `DetailTemplate` will collapse unless you [override the `Equals()` method of the master data item class](slug://grid-kb-editing-in-hierarchy).

Learn more integration details for the [inline](slug:components/grid/editing/inline#integration-with-other-features) and [in-cell](slug:components/grid/editing/incell#integration-with-other-features) edit modes.

## Examples

See Grid CRUD operations in action at:

* [Inline Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Popup Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-popup)
* [In-Cell Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-incell)
* [Custom Batch Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/batch-editing)


## See Also

* [Live Demos: Grid Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Enter and Exit Grid Edit Mode Programmatically](slug://grid-kb-add-edit-state)
* [Set Default Values for Grid Add and Edit Mode](slug://grid-kb-default-value-for-new-row)
* [Edit Rows in Hierarchy Grid](slug://grid-kb-editing-in-hierarchy)
* [Edit All Grid Rows and Cells at the Same Time](slug:grid-kb-edit-all-rows-cells)
