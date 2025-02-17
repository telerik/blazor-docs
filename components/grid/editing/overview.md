---
title: Overview
page_title: Grid - CRUD Overview
description: CRUD basics for the Grid for Blazor.
slug: components/grid/editing/overview
tags: telerik, blazor, grid, editing
published: True
position: 0
---

# Blazor Grid CRUD Operations

The Telerik Grid for Blazor features create, update, and delete operations (CRUD). The component also supports `DataAnnotations` or custom validation. This page describes:

* How the create, update, and delete operations work in the Grid.
* What are the available edit modes and how to enable them.
* The Grid commands
* The Grid events
* How to change the built-in editors for certain data types.
* How to refresh the Grid after editing.
* How Grid editing integrates with other component features.

## Basics

The Grid CRUD operations rely on the following algorithm and milestones:

1. Users execute [Grid commands (**Edit**, **Save**, **Delete**, and more)](#commands) with the mouse or keyboard. The commands control the Grid behavior.
1. The Grid fires [events (`OnCreate`, `OnDelete`, `OnUpdate` and more)](#events), which provide information what the user did or how the component data changed.
1. The application applies the changes to the Grid data source in the above event handlers.
1. The Grid rebinds to display the latest data.

### Model Requirements

Adding or editing rows in the Grid has the following requirements on the Grid model:

* The Grid model class must have a parameterless constructor. Otherwise, use the [Grid `OnModelInit` event](slug:grid-events#onmodelinit) to provide a data item instance [when the Grid needs to create one](#item-instance). Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* There must be no self-referencing or inherited properties that can cause `StackOverflowException` or `AmbiguousMatchException` during [programmatic model instance creation](#events).

## Edit Modes

The Grid offers several ways to add and edit rows with a different user experience and UI:

* *In-Cell*&mdash;users modify the Grid content cell by cell.
* *Inline*&mdash;users modify the Grid content row by row.
* *Popup*&mdash;users modify the Grid content row by row in a modal popup form.

To allow users to add or edit values in the Grid:

1. Set the `EditMode` parameter to a [member of the `GridEditMode` enum](slug:telerik.blazor.grideditmode).
1. Define the required [command buttons](#commands) and [events](#events) for the selected edit mode.

The default `EditMode` parameter value is `GridEditMode.None`. The built-in [`Add` and `Edit` commands](slug://components/grid/columns/command#built-in-commands) don't work in this case.

Editing multiple rows at the same time is not supported. You can [render editors in all Grid data cells through column `<Template>`s](slug:grid-kb-edit-all-rows-cells) as an alternative.

Delete operations require the same configuration and work in the same way, no matter what is the Grid `EditMode`. Delete operations do not require Grid editing to be enabled.

## Commands

The Grid provides the following built-in commands, which enable users to manage the component data:

* `Add`&mdash;inserts a new row and puts it in edit mode. Fires the `OnAdd` [event](#events).
* `Cancel`&mdash;cancels the row changes and exits edit mode. Fires the `OnCancel` event.
* `Delete`&mdash;deletes a Grid rows. Fires the `OnDelete` event.
* `Edit`&mdash;puts a Grid row in edit mode. Fires the `OnEdit` event.
* `Save`&mdash;confirms the row changes and exits edit mode, if the user input is valid. Fires the `OnUpdate` event.

To use a command, define a `<GridCommandButton>` and set its `Name` parameter to the required command name.

Command buttons can only reside in a [Command Column](slug:components/grid/columns/command) or the [Grid ToolBar](slug:components/grid/features/toolbar). You can also [trigger add and edit operations programmatically](slug:grid-kb-add-edit-state) from anywhere on the web page through the [Grid State](slug:grid-state).

## Events

The Grid events, which are related to adding, editing, and deleting items, have the following characteristics:

* All events provide a [`GridCommandEventArgs` argument](slug:telerik.blazor.components.gridcommandeventargs) in the handler.
* All events are cancellable if you set the `GridCommandEventArgs.IsCancelled` property to `true`.
* Some of the events are required. The app must use them to modify the Grid data source, based on the user changes.
* Some of the events are optional. The app can use them to implement custom logic and manage the user experience.
* Some event handlers receive the original data item in `GridCommandEventArgs.Item`, while others receive a new or cloned data item instance. See the next section and the table below for details.

### Item Instances

The Grid does not modify its data directly when going to add or edit mode. Instead, it creates a new item instance or clones an existing one. The component uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) and [`PropertyInfo.SetValue()`](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.propertyinfo.setvalue). This approach:

* Allows users to cancel their changes and revert to the original data item values.
* Provides the app with full control over the data source.
* Brings some requirements [for the Grid model class](#model-requirements) and for [updating Entity Framework models](slug:grid-kb-entity-framework-model-update).

### Comparison

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Event | Required | Description | `GridCommandEventArgs` `Item` Instance | If Cancelled |
| --- | --- | --- | --- | --- |
| `OnAdd` | No | Fires on `Add` [command button](slug://components/grid/columns/command) click, before the Grid enters insert mode. This event preceeds `OnCreate` or `OnCancel`. | New | The Grid remains in read mode. |
| `OnCancel` | No | Fires on `Cancel` command button click. | New or cloned | The Grid remains in insert or edit mode. |
| `OnCreate` | To insert new items. | Fires on `Save` command button click for new items. This event succeeds `OnAdd`. | New | The Grid remains in insert mode. |
| `OnDelete` | To delete items. | Fires on `Delete` command button click. Can display a [delete confirmation dialog](slug://grid-delete-confirmation). |Original | The item remains in the data. |
| `OnEdit` | No | Fires on `Edit` command button click, before the Grid actually enters edit mode. This event preceeds `OnCreate` or `OnCancel`. | Original | The Grid remains in read mode. |
| `OnUpdate` | To edit existing items. | Fires on `Save` command button click for existing items. This event succeeds `OnEdit`. | Cloned | The Grid remains in edit mode. |

### Handler Signatures

The CRUD event handlers must return either `void` or `async Task`. Do not use `async void` for handlers that execute awaitable operations or data service calls. Otherwise you may experience errors such as:

* `Cannot access a disposed object.`
* `A second operation started on this context before a previous operation completed.`
* The Grid may refresh before the data operation is complete and the expected changes will not be present in the UI.

## Column Editors

You can customize the editors rendered in the Grid by providing the `EditorType` attribute, exposed on the `<GridColumn>`, or by using the [Editor Template](slug:grid-templates-editor). The `EditorType` attribute accepts a member of the `GridEditorType` enum:

| Column Field Type | Valid `GridEditorType` Enum Members |
| --- | --- |
| `bool` | `CheckBox` (default) <br /> `Switch` |
| `DateTime` | `DatePicker` (default) <br /> `DateTimePicker` <br> `TimePicker` |
| `string` | `TextArea` <br /> `TextBox` (default) |

## Rebind Grid After CUD

During CUD operations, the Grid expects the application to make changes to the data source and provide the latest data to the component. This can happen in different ways, depending on the current Grid [data binding mechanism](slug:common-features-data-binding-overview#how-to-provide-data).

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

## Integration with Other Grid Features

* If you want to perform other data operations while the component is in Edit mode (applicable for [InCell](slug://components/grid/editing/incell) and [Inline](slug://components/grid/editing/inline) editing) the following behavior will occur:

@[template](/_contentTemplates/common/grid-treelist-editing-notes.md#grid-treelist-data-operations-while-editing)

* Updated rows comply with the current sort, filter, and group settings, just like all other rows. As a result, an updated row may render at a different place or disappear from the current page.

* When editing a master row in a [hierarchy Grid](slug://components/grid/features/hierarchy), the respective `DetailTemplate` will collapse unless you [override the `Equals()` method of the master data item class](slug://grid-kb-editing-in-hierarchy).


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
* [Edit All Grid Rows and Cells at the Same Time](slug:grid-kb-edit-all-rows-cells)
