---
title: Inline Editing
page_title: TreeList - Inline Editing
description: Inline (row) editing of data in TreeList for Blazor.
slug: treelist-editing-inline
tags: telerik, blazor, treelist, editing, inline
published: True
position: 1
components: ["treelist"]
---
# TreeList Inline Editing

Inline TreeList editing lets users modify all values on a TreeList row. The edit process starts and ends with clicking of command buttons on the respective row. Inline editing can be more intuitive for beginner users, compared to in-cell editing.

@[template](/_contentTemplates/treelist/editing.md#overview-required)

## Basics

To use inline TreeList editing, [set the TreeList `EditMode` parameter to `TreeListEditMode.Inline`](slug:treelist-editing-overview#edit-modes). During inline editing, only one table row is in edit mode at a time. Users can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous editable cell.
* Click the **Save** command button or press **Enter** to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.
* Peform another TreeList operation, for example, paging or sorting, to cancel the current edit operation.

## Commands

Inline add, edit, and delete operations use the following [command buttons](slug:treelist-editing-overview#commands):

* **Add**
* **Delete**
* **Edit**
* **Save**
* **Cancel**

@[template](/_contentTemplates/treelist/editing.md#without-commands)

In inline edit mode, the TreeList commands execute row by row and the corresponding [TreeList events](slug:treelist-editing-overview#events) also fire row by row. This is similar to [popup editing](slug:treelist-editing-popup) and unlike [in-cell editing](slug:treelist-editing-incell), where commands and events relate to cells.

When validation is not satisfied, clicking the **Save**, **Delete** or **Add** command buttons has no effect, but users can still navigate between all input components in the row to complete the editing.

## New Row Position

You can control whether a newly added item appears at the top or bottom of the TreeList. Use the `NewRowPosition` parameter to specify the position. This parameter does not affect Popup edit mode, which always displays a dialog for new items.

The `NewRowPosition` parameter accepts values from the `TreeListNewRowPosition` enum:

- `Top` (default)&mdash;Inserts the new item at the top of the view.
- `Bottom`&mdash;Inserts the new item at the bottom of the view.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:treelist-editing-overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another row.

* If the validation is not satisfied, the component blocks the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing aborts and the component fires `OnCancel`.

### Delete, Filter, Group, Page, Search, Sort

If the component is already in add or edit mode, and the user tries to perform another data operation, then editing aborts and the component fires `OnCancel`.

Deleting items that are currently in edit mode [fires `OnDelete` with a cloned data item instance](slug:treelist-editing-overview#delete-operations).

## Example

The example below shows how to:

* Implement inline TreeList CRUD operations with the minimal required number of events.
* Bind an editable TreeList to [flat data](slug:treelist-data-binding-flat-data). Check the [popup editing example] for an implementation with [hierarchical data](slug:treelist-data-binding-hierarchical-data).
@[template](/_contentTemplates/treelist/editing.md#basic-example-description)

>caption TreeList inline editing

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 ConfirmDelete="true"
                 EditMode="@TreeListEditMode.Inline"
@[template](/_contentTemplates/treelist/editing.md#basic-example-parameters-columns)
        <TreeListCommandColumn Width="200px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
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

* [Live Demo: TreeList Inline Editing](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
* [TreeList Editor Template](slug:treelist-templates-editor)
* [Start and End Editing through the TreeList State](slug:grid-kb-add-edit-state)
