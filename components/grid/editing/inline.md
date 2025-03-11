---
title: Inline Editing
page_title: Grid - Inline Editing
description: Inline (row) editing of data in Grid for Blazor.
slug: grid-editing-inline
tags: telerik, blazor, grid, editing, inline
published: True
position: 1
---

# Grid Inline Editing

Inline Grid editing lets users modify all values on a Grid row. The edit process starts and ends with clicking of command buttons on the respective row. Inline editing can be more intuitive for beginner users, compared to in-cell editing.

@[template](/_contentTemplates/grid/editing.md#overview-required)

## Basics

To use inline Grid editing, [set the Grid `EditMode` parameter to `GridEditMode.Inline`](slug:grid-editing-overview#edit-modes). During inline editing, only one table row is in edit mode at a time. Users can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous editable cell.
* Click the **Save** command button or press **Enter** to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

## Commands

Inline add, edit, and delete operations use the following [command buttons](slug:grid-editing-overview#commands):

* **Add**
* **Delete**
* **Edit**
* **Save**
* **Cancel**

@[template](/_contentTemplates/grid/editing.md#without-commands)

In inline edit mode, the Grid commands execute row by row and the corresponding [Grid events](slug:grid-editing-overview#events) also fire row by row. This is similar to [popup editing](slug:grid-editing-popup) and unlike [in-cell editing](slug:grid-editing-incell), where commands and events relate to cells.

When validation is not satisfied, clicking the **Save**, **Delete** or **Add** command buttons has no effect, but users can still navigate between all input components in the row to complete the editing.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:grid-editing-overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another row.

* If the validation is not satisfied, the component blocks the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing aborts and the component fires `OnCancel`.

### Delete, Filter, Group, Page, Search, Sort

If the component is already in add or edit mode, and the user tries to perform another data operation, then editing aborts and the component fires `OnCancel`.

## Examples

### Basic

The example below shows how to:

* Implement inline Grid CRUD operations with the simplest and minimal required setup.
@[template](/_contentTemplates/grid/editing.md#basic-example-description)

>caption Basic Grid inline editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Inline"
@[template](/_contentTemplates/grid/editing.md#basic-example-parameters-columns)
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
@[template](/_contentTemplates/grid/editing.md#basic-example-code)

@[template](/_contentTemplates/grid/editing.md#crud-service-and-model)
}
````

### Advanced

The example below shows how to:

* Implement inline Grid CRUD operations with all available events and various built-in customizations.
@[template](/_contentTemplates/grid/editing.md#advanced-example-description)

>caption Advanced Grid inline editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
@[template](/_contentTemplates/grid/editing.md#advanced-example-parameters)
@[template](/_contentTemplates/grid/editing.md#advanced-example-toolbar)
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Editable="false" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Description)" EditorType="@GridEditorType.TextArea">
            <Template>
                @{ var dataItem = (Product)context; }
                <div style="white-space:pre">@dataItem.Description</div>
            </Template>
        </GridColumn>
@[template](/_contentTemplates/grid/editing.md#advanced-example-columns)
        <GridCommandColumn Title="Commands" Width="180px">
            @{ var dataItem = (Product)context; }
            <GridCommandButton Command="Edit" ThemeColor="@AddEditButtonThemeColor">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            @if (dataItem.Discontinued)
            {
                <GridCommandButton Command="Delete" ThemeColor="@DeleteButtonThemeColor">Delete</GridCommandButton>
            }
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
@[template](/_contentTemplates/grid/editing.md#advanced-example-code)

@[template](/_contentTemplates/grid/editing.md#crud-service-and-model)
}
````

## See Also

* [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
* [Grid Editor Template](slug:grid-templates-editor)
* [Start and End Editing through the Grid State](slug:grid-kb-add-edit-state)
* [Blazor Grid](slug:grid-overview)
