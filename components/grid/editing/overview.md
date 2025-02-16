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

The Telerik Grid for Blazor supports create, update, and delete operations (CRUD). The component can also validate the user input. Use the CRUD events to transfer the changes to the underlying data source (for example, call a service to update the database, and not only with the view data).

This page describes:

* How Grid create, update, and delete operations work.
* What are the available edit modes.
* How to enable editing.
* The Grid commands.
* The Grid events.
* How to change the built-in editors for certain data types.
* How to refresh the Grid after editing.
* How Grid editing integrates with other component features.

## Basics

The Grid CRUD operations rely on the following algorithm:

1. Users execute Grid *commands* (**Edit**, **Save**, **Delete**, and more) with the mouse or keyboard.
1. The Grid fires *events* (`OnCreate`, `OnDelete`, `OnUpdate` and more), which provide information what the user did or how the component data changed.
1. The application applies the changes to the Grid data source.
1. The Grid rebinds to display the latest data.

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

## Item Instances During Editing

The Grid uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) to generate item instances for add and edit mode. This brings the following requirements and considerations:

* The Grid model class must have a parameterless constructor. Otherwise, use the [Grid `OnModelInit` event](slug:grid-events#onmodelinit) to provide a data item instance. Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* There must be no `public` properties that create a circular reference. For example, if the Grid model class is `Person`, it must not have properties of type `Person`.
* The `OnEdit` event handler receives the original item instance from the Grid data collection in `GridCommandEventArgs.Item`.
* The [column `<EditorTemplate>` `context`](slug:grid-templates-editor) is the new (cloned) item instance.
* The `OnUpdate` event handler receives the cloned and modified item in `GridCommandEventArgs.Item`. The app must replace the original item with the cloned item. Alternatively, the app must update the property values in the original item one by one.

When binding the Grid directly to Entity Framework models or `DbSet`, and using the cloned `GridCommandEventArgs.Item` in your database update method, you can get one of the following exceptions:

* `The instance of entity type ... cannot be tracked because another instance with the same key value for ... is already being tracked.`
* `This is a DynamicProxy2 error: The interceptor attempted to 'Proceed' for method 'Microsoft.EntityFrameworkCore.Infrastructure.ILazyLoader get_LazyLoader()' which has no target.`.

In such cases, perform the database update as follows:

1. Find the original object in your database by ID. For example, you can use `dbContext.Find()`.
1. Apply the changes property by property, for example, `efItem.Property1 = clonedItem.Property1`
1. Call `dbContext.SaveChanges()`.

## Commands

The Grid provides the following built-in commands, which enable users to manage the component data:

* `Add`&mdash;inserts a new row and puts it in edit mode. Fires the `OnAdd` [event](#events).
* `Cancel`&mdash;cancels the row changes and exits edit mode. Fires the `OnCancel` event.
* `Delete`&mdash;deletes a Grid rows. Fires the `OnDelete` event.
* `Edit`&mdash;puts a Grid row in edit mode. Fires the `OnEdit` event.
* `Save`&mdash;confirms the row changes and exits edit mode, if the user input is valid. Fires the `OnUpdate` event.

To use a command, define a `<GridCommandButton>` and set its `Name` parameter to the required command name.

## Events

The Grid does not modify its data directly. Instead, the component fires events, which allow the app to:

* Detect, approve, or reject the user actions.
* Make changes to the Grid data source.

The Grid CUD events have the following characteristics:

* Some of the events are required. The app must use them to modify the Grid data source, based on the user actions.
* Some of the events are optional. The app can use them to implement business logic and manage the user experience.
* Some events receive the original data item in the event argument, while others receive a newly created (cloned) data item instance.
* All events receive a [`GridCommandEventArgs` argument](slug:telerik.blazor.components.gridcommandeventargs) in the event handler.
* All events are cancellable.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Event | Required | Description | `args.Item` Instance | If Cancelled |
| --- | --- | --- | --- | --- |
| `OnAdd` | No | Fires on `Add` [command button](slug://components/grid/columns/command) click, before the Grid enters insert mode. Also see `OnCreate`. | New | The Grid remains in read mode. |
| `OnCancel` | No | Fires on `Cancel` command button click. | New | The Grid remains in insert or edit mode. |
| `OnCreate` | To insert new items. | Fires on `Save` command button click for new items. Also see `OnAdd`. | New | The Grid remains in insert mode. |
| `OnDelete` | To delete items. | Fires on `Delete` command button click. Can display a [delete confirmation dialog](slug://grid-delete-confirmation). |Original | The item remains in the data. |
| `OnEdit` | No | Fires on `Edit` command button click, before the Grid actually enters edit mode. Also see `OnUpdate`. | Original | The Grid remains in read mode. |
| `OnUpdate` | To edit existing items. | Fires on `Save` command button click for existing items. Also see `OnEdit`. | New | The Grid remains in edit mode. |

The CUD event handlers receive an argument of type `GridCommandEventArgs` that exposes the following fields:

* `IsCancelled` - a boolean field indicating whether the grid operation is to be prevented (for example, prevent a row from opening for edit, or from updating the data layer).
* `IsNew` - a boolean field indicating whether the item was just added through the grid. Lets you differentiate a data source Create operation from Update operation in the `OnClick` event of a command button.
* `Item` - an object you can cast to your model class to obtain the current data item.
* `Field` - specific to [InCell editing](slug:components/grid/editing/incell) - indicates which is the model field the user changed when updating data.
* `Value` - specific to [InCell editing](slug:components/grid/editing/incell) - indicates what is the new value the user changed when updating data.

You can initiate editing or inserting of an item from anywhere on the page (buttons outside of the grid, or components in a column template) through the [grid state](slug:grid-kb-add-edit-state).

The CRUD event handlers must return either `void` or `async Task`. Do not use `async void` for awaitable operations or data service calls, otherwise you may experience errors such as:

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
* Use the CUD event arguments to update the local data collection in the `Data` parameter manually. This approach spares one database request, but the user may not see recent changes made by other users.

### OnRead Event

The Grid automatically fires [`OnRead`](slug://components/grid/manual-operations) immediately after the following events, unless they are cancelled:

* `OnCancel`
* `OnCreate`
* `OnDelete`
* `OnUpdate`

In this way, the Grid receives the latest data after each operation is complete. If you need to skip the database read request in this case, you can:

1. Cache the values of `args.Data` and `args.Total` from the previous `OnRead` event handler execution.
1. Raise a boolen flag in the CUD event handler and check it in the `OnRead` handler.
1. Update the cached data and total value with the latest user changes before using them in the current `OnRead` call.
1. Reset the boolean flag, so that next time the Grid receives fresh data from the data source.

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
