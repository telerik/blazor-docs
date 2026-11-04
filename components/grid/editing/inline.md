---
title: Inline Editing
page_title: Grid - Inline Editing
description: Edit Telerik UI for Blazor Grid rows inline with command buttons, validation, keyboard navigation, and row-level events.
slug: grid-editing-inline
tags: telerik, blazor, grid, editing, inline
published: True
position: 1
components: ["grid"]
---

# Grid Inline Editing

Inline Grid editing lets users modify all values in a Grid row. The edit process starts and ends when users click command buttons in the row. Inline editing can be more intuitive for beginner users than in-cell editing.

@[template](/_contentTemplates/grid/editing.md#overview-required)

## Using Inline Editing

To use inline Grid editing, [set the Grid `EditMode` parameter to `GridEditMode.Inline`](slug:grid-editing-overview#edit-modes). During inline editing, only one table row is in edit mode at a time. Users can:

* Press `Tab` or `Shift+Tab` to focus the next or previous editable cell.
* Click the **Save** command button or press `Enter` to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press `Esc` to cancel the current row changes and exit edit mode.
* Perform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

## Commands

Inline add, edit, and delete operations use the following [command buttons](slug:grid-editing-overview#commands):

* **Add**
* **Delete**
* **Edit**
* **Save**
* **Cancel**

@[template](/_contentTemplates/grid/editing.md#without-commands)

The built-in `GridToolBarAddTool` starts the add operation and does not require a custom `OnAdd` handler. If clicking **Add** does not enter edit mode or fire `OnAdd`, first verify that the page is interactive and that the project uses the correct host configuration for its Blazor hosting model. For more information, see [Interactive Render Mode](slug:getting-started-workflow-details#interactive-render-mode).

In inline edit mode, the Grid commands execute row by row and the corresponding [Grid events](slug:grid-editing-overview#events) also fire row by row. This is similar to [popup editing](slug:grid-editing-popup) and unlike [in-cell editing](slug:grid-editing-incell), where commands and events relate to cells.

When validation is not satisfied, clicking the **Save**, **Delete**, or **Add** command buttons has no effect, but users can still navigate between all input components in the row to complete the editing.

## New Row Position

You can control whether a newly added item appears at the top or bottom of the Grid. Use the `NewRowPosition` parameter to specify the position.

The `NewRowPosition` parameter accepts values from the `GridNewRowPosition` enum:

* `Top` (default)&mdash;Inserts the new item at the top of the view.
* `Bottom`&mdash;Inserts the new item at the bottom of the view.

## Integration with Other Features

The following sections explain how the component behaves when users combine add and edit operations with other component features. Also check the [common information on this topic for all edit modes](slug:grid-editing-overview#integration-with-other-features).

### Handling Add and Edit Operations

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another row.

* If the validation is not satisfied, the component blocks the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing aborts and the component fires `OnCancel`.

### Handling Other Data Operations

If the component is already in add or edit mode, and the user tries to perform another data operation, then editing aborts and the component fires `OnCancel`.

Deleting items that are currently in edit mode [fires `OnDelete` with a cloned data item instance](slug:grid-editing-overview#delete-operations).

## Examples

### Basic Inline Editing Example

This example demonstrates how to:

* Implement inline Grid CRUD operations with the minimum required setup.
@[template](/_contentTemplates/grid/editing.md#basic-example-description)

>caption Basic Grid inline editing configuration

<demo metaUrl="client/grid/editing-inline-basic/" height="600"></demo>

### Advanced Inline Editing Example

The example below shows how to:

* Implement inline Grid CRUD operations with all available events and various built-in customizations.
@[template](/_contentTemplates/grid/editing.md#advanced-example-description)

>caption Advanced Grid inline editing configuration

<demo metaUrl="client/grid/editing-inline-advanced/" height="600"></demo>

## See Also

* [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Grid Editor Template](slug:grid-templates-editor)
* [Start and End Editing through the Grid State](slug:grid-kb-add-edit-state)
* [Blazor Grid](slug:grid-overview)
