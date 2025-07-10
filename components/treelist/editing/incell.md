---
title: InCell Editing
page_title: TreeList - InCell Editing
description: In-cell editing of data in TreeList for Blazor.
slug: treelist-editing-incell
tags: telerik, blazor, treelist, editing, incell
published: True
position: 4
---

# TreeList In-Cell Editing

In-cell editing allows users to click TreeList data cells and type new values like in Excel. There is no need for command buttons to enter and exit edit mode. Users can quickly move between the editable cells and rows by using keyboard navigation.

The in-cell edit mode provides a different user experience, compared to the inline and popup edit modes. In-cell edit mode can be more convenient for advanced users, fast users, or users who prefer keyboard navigation rather than clicking command buttons.

@[template](/_contentTemplates/treelist/editing.md#overview-required)

## Basics

To use in-cell TreeList editing, [set the TreeList `EditMode` parameter to `TreeListEditMode.Incell`](slug:treelist-editing-overview#edit-modes). During in-cell editing, only one table cell is in edit mode at a time. Users can:

* Press **Tab** or **Shift** + **Tab** to confirm the current value and edit the next or previous cell.
* Press **Enter** to confirm the current value and edit the cell below.
* Press **ESC** to cancel the current change and exit edit mode.
* Click on another cell to confirm the current value and edit the new cell.
* Click outside the TreeList to confirm the current value and exit edit mode.
* Peform another TreeList operation, for example, paging or sorting, to cancel the current edit operation.

Command columns and non-editable columns are skipped while tabbing.

## Commands

In-cell add, edit, and delete operations use the following [command buttons](slug:treelist-editing-overview#commands):

* **Add**
* **Delete**

@[template](/_contentTemplates/treelist/editing.md#without-commands)

Unlike [inline editing](slug:treelist-editing-inline), the in-cell edit mode does not use **Edit**, **Save**, and **Cancel** command buttons.

## Events

Users enter and exit in-cell edit mode cell by cell, so the [`OnEdit`, `OnCancel`, and `OnUpdate` events](slug:treelist-editing-overview#events) also fire cell by cell.

In in-cell edit mode, the `OnAdd` and `OnCreate` events fire immediately one after the other, unless `OnAdd` is cancelled. This means that:

* The new row is added to the TreeList data source before users start editing it.
* Valid [default values](slug:grid-kb-default-value-for-new-row) are recommended.
* Users are always editing existing rows, not adding new ones.
* The [`InsertedItem` property](slug:treelist-state#information-in-the-treelist-state) of the [TreeList state](slug:treelist-state) is not used and is always `null`.
* To [add a new row programmatically and put it in edit mode](slug:grid-kb-add-edit-state), use the `OriginalEditItem`, `EditItem`, and `EditField` properties of the TreeList state.

The above algorithm is different from [inline](slug:treelist-editing-inline) and [popup](slug:treelist-editing-popup) editing where new rows are only added to the data source after users populate them with valid values.

## New Row Position

You can control whether a newly added item appears at the top or bottom of the TreeList. Use the `NewRowPosition` parameter to specify the position.

The `NewRowPosition` parameter accepts values from the `TreeListNewRowPosition` enum:

- `Top` (default) — Inserts the new item at the top of the view.
- `Bottom` — Inserts the new item at the bottom of the view.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:treelist-editing-overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another cell.

* If the validation is not satisfied, the component blocks the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing completes and the component fires `OnUpdate`.

### Delete, Filter, Page, Search, Sort

This section explains what happens when the user tries to perform another data operation, while the component is already in add or edit mode.

* If the validation is satisfied, then editing completes and the component fires `OnUpdate`.
* If the validation is not satisfied, then editing aborts and the component fires `OnCancel`.

Deleting items that are currently in edit mode [fires `OnDelete` with a cloned data item instance](slug:treelist-editing-overview#delete-operations).

### Selection

To enable [row selection](slug:treelist-selection-row) with in-cell edit mode, use a [checkbox column](slug:treelist-columns-checkbox). More information on that can be read in the [Row Selection](slug:treelist-selection-row#selection-and-editing-modes) article.

To see how to select the row that is currently in in-cell edit mode without using a `<TreeListCheckboxColumn />`, see the [Row Selection in Edit with InCell EditMode](slug:grid-kb-row-select-incell-edit) Knowledge Base article.

[Cell selection](slug:treelist-selection-cell) is not supported with in-cell edit mode.

## Example

The example below shows how to:

* Implement in-cell TreeList CRUD operations with the minimal required number of events.
* Bind an editable TreeList to [flat data](slug:treelist-data-binding-flat-data). Check the [popup editing example] for an implementation with [hierarchical data](slug:treelist-data-binding-hierarchical-data).
@[template](/_contentTemplates/treelist/editing.md#basic-example-description)

>caption Basic TreeList in-cell editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 ConfirmDelete="true"
                 EditMode="@TreeListEditMode.Incell"
@[template](/_contentTemplates/treelist/editing.md#basic-example-parameters-columns)
        <TreeListCommandColumn Width="120px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
            <TreeListCommandButton Command="Delete">Delete</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
@[template](/_contentTemplates/treelist/editing.md#basic-example-code)

@[template](/_contentTemplates/treelist/editing.md#flat-crud-service-and-model)
}
````

## See Also

* [Live Demo: TreeList InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)
* [TreeList Editor Template](slug:treelist-templates-editor)
* [Start and End Editing through the TreeList State](slug:grid-kb-add-edit-state)
* [TreeList Selection Documentation](slug:treelist-selection-overview)
