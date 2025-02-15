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

This page explains how to:

* Enable editing
* Use the relevant events
* Define command buttons

## Edit Modes

The Grid offers several ways to add and edit rows with different user experience. To allow users to add or edit in the Grid:

1. Set the `EditMode` parameter to a [member of the `GridEditMode` enum](slug:telerik.blazor.grideditmode).
1. Define the required [events](#events) and appropriate [command buttons](#commands) for the selected edit mode and operations.

The default Grid edit mode is `GridEditMode.None`. The built-in [`Add` and `Edit` commands](slug://components/grid/columns/command#built-in-commands) don't work in this mode.

All Grid edit modes work with one cell or one row. Editing multiple rows at the same time is not supported. You can [render editors in all Grid data cells through column `<Template>`s](slug:grid-kb-edit-all-rows-cells) as an alternative.

### Item Instances During Editing

The Grid uses [`Activator.CreateInstance<TItem>()`](https://learn.microsoft.com/en-us/dotnet/api/system.activator.createinstance) to generate item instances for add and edit mode. This brings the following requirements and considerations:

* The Grid model class must have a parameterless constructor. Otherwise, use the [Grid `OnModelInit` event](slug:grid-events#onmodelinit) to provide a data item instance. Optinally, you can also [set some default values](slug://grid-kb-default-value-for-new-row).
* All editable properties must be `public` and have setters. These properties must not be `readonly`.
* There must be no `public` properties that create a circular reference. For example, if the Grid model class is `Person`, it must not have properties of type `Person`.
* The `OnEdit` event handler receives the original item instance from the Grid data collection in `GridCommandEventArgs.Item`.
* The [column `<EditorTemplate>` `context`](slug:grid-templates-editor) is the new (cloned) item instance.
* The `OnUpdate` event handler receives the cloned and modified item in `GridCommandEventArgs.Item`. The app must replace the original item with the cloned item. Alternatively, the app must update the property values in the original item one by one.

### In Cell

Set the Grid `EditMode` parameter to `GridEditMode.Incell`. During in-cell editing, only one table cell is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to confirm the current value and edit the next or previous cell.
* Press **Enter** to confirm the current value and edit the cell below.
* Press **ESC** to cancel the current change and exit edit mode.
* Click on another cell to confirm the current value and edit the new cell.
* Click outside the Grid to confirm the current value and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

In-cell CUD operations require the following setup:

* **Add** command button
* **Delete** command button

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

In-cell edit mode does not require **Edit**, **Save**, and **Cancel** command buttons.

### Inline

Set the Grid `EditMode` parameter to `GridEditMode.Inline`. During inline editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous editable cell.
* Click the **Save** command button or press **Enter** to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

Inline CUD operations require the following setup:

* **Add** command button
* **Delete** command button
* **Edit** command button
* **Save** command button
* **Cancel** command button

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

### Popup

Set the Grid `EditMode` parameter to `GridEditMode.Popup`. During popup editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous input component.
* Click the **Save** command button to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.

Popup CUD operations require the following setup:

* **Add** command button
* **Delete** command button
* **Edit** command button

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

Popup edit mode does not require **Save** and **Cancel** command buttons. The Grid renders them automaatically in the popup, unless you define a [`<ButtonsTemplate>`](slug:grid-templates-popup-buttons) or a [`<FormTemplate>`](slug:grid-templates-popup-form).

## Events

* `OnAdd` - fires when the `Add` [command button](slug:components/grid/columns/command) for a newly added item is clicked. The event is cancellable.
* `OnCreate` - fires when the `Save` [command button](slug:components/grid/columns/command) for a newly added item is clicked. Cancellable (cancelling it keeps the grid in Insert mode).
* `OnUpdate` - fires when the `Save` command button is clicked on an existing item. Cancellable (cancelling it keeps the grid in Edit mode). The model reference is a copy of the original data source item.
* `OnDelete` - fires when the `Delete` command button is clicked. You can also display a [delete confirmation dialog](slug:grid-delete-confirmation) before the deletion.
* `OnEdit` - fires when the user is about to enter edit mode for an existing row. Cancellable (cancelling it prevents the item from opening for editing).
* `OnCancel` - fires when the user clicks the `Cancel` command button. Allows you to undo the changes to the data in the view data. Cancellable (keeps the grid in Edit/Insert mode).
* `OnRead` - fires when the grid needs data - after any data source operation like updating, creating, deleting, filtering, sorting. If you cancel the CUD events, the [OnRead](slug:components/grid/manual-operations) event will not fire.

The CUD event handlers receive an argument of type `GridCommandEventArgs` that exposes the following fields:

* `IsCancelled` - a boolean field indicating whether the grid operation is to be prevented (for example, prevent a row from opening for edit, or from updating the data layer).
* `IsNew` - a boolean field indicating whether the item was just added through the grid. Lets you differentiate a data source Create operation from Update operation in the `OnClick` event of a command button.
* `Item` - an object you can cast to your model class to obtain the current data item.
* `Field` - specific to [InCell editing](slug:components/grid/editing/incell) - indicates which is the model field the user changed when updating data.
* `Value` - specific to [InCell editing](slug:components/grid/editing/incell) - indicates what is the new value the user changed when updating data.

You can initiate editing or inserting of an item from anywhere on the page (buttons outside of the grid, or components in a column template) through the [grid state](slug:grid-kb-add-edit-state).

## Customize The Editor Fields

You can customize the editors rendered in the Grid by providing the `EditorType` attribute, exposed on the `<GridColumn>`, or by using the [Editor Template](slug:grid-templates-editor). The `EditorType` attribute accepts a member of the `GridEditorType` enum:

| Field data type | GridEditorType enum members              |
|-----------------|------------------------------------------|
| **Text**            | `GridEditorType.TextArea`<br> `GridEditorType.TextBox` |
| **Boolean**         | `GridEditorType.CheckBox`<br> `GridEditorType.Switch` |
| **DateTime**        | `GridEditorType.DatePicker`<br> `GridEditorType.DateTimePicker`<br> `GridEditorType.TimePicker` |

## Rebind Grid After CUD

During CUD operations, the Grid expects the application to make changes to the data source and provide the latest data to the component. This can happen in different ways, depending on the current Grid [data binding mechanism](slug:common-features-data-binding-overview#how-to-provide-data).

### Data Parameter

At the end of the `OnCreate`, `OnDelete`, and `OnUpdate` event handler, the application must do one of the following:

* Make a request to the database and retrieve the latest data. Set the collection as the new value of the Grid `Data` parameter. The Grid will rebind automatically. The following examples demonstrate this approach: ........
* Use the CUD event arguments to update the local data collection in the `Data` parameter manually. This approach spares one database request, but the user may not see recent changes made by other users.

### OnRead Event

The Grid will automatically fire its `OnRead` event after any CUD event. Given that the original component data source is already up-to-date, the component will receive the latest data.

To spare the database request in this case, the app must:

* Use previously cached data in the `OnRead` handler.
* Update the cached data with the latest user changes before setting it to `args.Data`.

## Examples

See Grid CRUD operations in action at:

* [Inline Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Popup Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-popup)
* [In-Cell Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/editing-incell)
* [Custom Batch Editing Online Demo](https://demos.telerik.com/blazor-ui/grid/batch-editing)

## Notes

There are a few considerations to keep in mind with the CUD operations of the grid. They are explained in the following list:

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.
    
    * For example, you may want to update the view-model only on success of the data service with the model returned from the server. Another thing you may want to do is to inform the user for server (async, remote) validation errors such as duplicates. You can find examples of both in the [Remote Validation sample project](https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation).

* The CRUD event handlers must be `async Task` and **not** `async void`. A Task can be properly awaited and allows working with services and contexts, and lets the grid update after the actual data source operations complete.

    * When the method returns `void`, the execution of the context operations is not actually awaited, and you may get errors from the context (such as "Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application" or "A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext"). The grid may also re-render before the actual data update happens and you may not see the result.

* If you are [using the `OnRead` event to optimize the data requests](slug:components/grid/manual-operations), it will fire after the CUD events (`OnCreate`, `OnUpdate`, `OnDelete`, `OnCancel`) so that the grid data can be refreshed properly from the real data source. If you want to avoid such calls to the database, you can raise a flag in those four events to avoid calling your data service in the `OnRead` event, and then you can lower that flag at the end of `OnRead` so subsequent calls can fetch fresh data.

* When you are using your Entity Framework models directly in the Grid (especially in a server-side Blazor scenario) and you use the `Item` property of `GridCommandEventArgs` directly in your DataBase update method, you can get one of the following exceptions: `The instance of entity type 'YourModel' cannot be tracked because another instance with the same key value for {'Id'} is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached...` or `This is a DynamicProxy2 error: The interceptor attempted to 'Proceed' for method 'Microsoft.EntityFrameworkCore.Infrastructure.ILazyLoader get_LazyLoader()' which has no target. When calling method without target there is no implementation to 'proceed' to and it is the responsibility of the interceptor to mimic the implementation (set return value, out arguments etc)`.
    
    To fix it you can change the update using this approach:
    
    1.  Find the object in your database by Id (you can use `dbContext.Find()` or similar method depending on your infrastructure).
    1. Apply all the changes you need to it one by one - assign the values of all of its properties - `dbObject.Property1 = argsItem.Property1...`
    1. Call `dbContext.SaveChanges()`

* The [Grid validation](slug:grid-editing-validation) is based on the <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#validator-components" target="_blank">`DataAnnotationValidator`</a> and creates its own `EditContext` for a row that is in edit/insert mode. When the row is not in edit/insert mode, the `EditContext` is `null`. The `EditContext` is a cascading parameter and overrides any cascading parameters from parent components (such as an `<EditForm>` that may wrap the grid).

    * The validation will not be enabled for Grids bound to Expando objects or Dictionaries (such as DataTable).

    * When an input receives an `EditContext` (usually comes down as a cascading parameter), the framework also requires a `ValueExpression`. If you use two-way binding (the `@bind-Value` syntax), the `ValueExpression` is deducted from there. However, if you use only the `Value` property, you have to pass the `ValueExpression` yourself. This is a lambda expression that tells the framework what field in the model to update. The following sample demonstrates how to achieve that. You can also check the [Requires a value for ValueExpression](slug:common-kb-requires-valueexpression) knowledge base article for more details.

    <div class="skip-repl"></div>
    ````RAZOR
    <EditorTemplate>
        <TelerikTextBox Value="@myModel.MyField"
                        ValueExpression="@( () => myModel.MyField )">
        </TelerikTextBox>
    </EditorTemplate>

    @* Applies to the other input type components as well *@
    ````
    
* If you want to perform other data operations while the component is in Edit mode (applicable for [InCell](slug:components/grid/editing/incell) and [Inline](slug:components/grid/editing/inline) editing) the following behavior will occur:

@[template](/_contentTemplates/common/grid-treelist-editing-notes.md#grid-treelist-data-operations-while-editing)

* When editing a master row in a [hierarchy Grid](slug:components/grid/features/hierarchy), the respective `DetailTemplate` will collapse unless you [override the `Equals()` method of the master data item class](slug:grid-kb-editing-in-hierarchy).

## See Also

* [Live Demos: Grid Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Enter and Exit Grid Edit Mode Programmatically](slug://grid-kb-add-edit-state)
* [Set Default Values for Grid Add and Edit Mode](slug://grid-kb-default-value-for-new-row)
* [Edit All Grid Rows and Cells at the Same Time](slug:grid-kb-edit-all-rows-cells)
