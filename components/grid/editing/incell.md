---
title: InCell Editing
page_title: Grid - InCell Editing
description: In-cell editing of data in Grid for Blazor.
slug: grid-editing-incell
tags: telerik, blazor, grid, editing, incell
published: True
position: 4
---

# Grid In-Cell Editing

In-cell editing allows users to click Grid data cells and type new values like in Excel. There is no need for command buttons to enter and exit edit mode. Users can quickly move between the editable cells and rows by using keyboard navigation.

The in-cell edit mode provides a different user experience, compared to the inline and popup edit modes. In-cell edit mode can be more convenient for advanced users, fast users, or users who prefer keyboard navigation rather than clicking command buttons.

@[template](/_contentTemplates/grid/editing.md#overview-required)

## Basics

To use in-cell Grid editing, [set the Grid `EditMode` parameter to `GridEditMode.Incell`](slug:grid-editing-overview#edit-modes). During in-cell editing, only one table cell is in edit mode at a time. Users can:

* Press **Tab** or **Shift** + **Tab** to confirm the current value and edit the next or previous cell.
* Press **Enter** to confirm the current value and edit the cell below.
* Press **ESC** to cancel the current change and exit edit mode.
* Click on another cell to confirm the current value and edit the new cell.
* Click outside the Grid to confirm the current value and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

Command columns and non-editable columns are skipped while tabbing.

## Commands

In-cell add, edit, and delete operations use the following [command buttons](slug:grid-editing-overview#commands):

* **Add**
* **Delete**

@[template](/_contentTemplates/grid/editing.md#without-commands)

Unlike [inline editing](slug:grid-editing-inline), the in-cell edit mode does not use **Edit**, **Save**, and **Cancel** command buttons.

## Events

Users enter and exit in-cell edit mode cell by cell, so the [`OnEdit`, `OnCancel`, and `OnUpdate` events](slug:grid-editing-overview#events) also fire cell by cell.

In in-cell edit mode, the `OnAdd` and `OnCreate` events fire immediately one after the other, unless `OnAdd` is cancelled. This means that:

* The new row is added to the Grid data source before users start editing it.
* Valid [default values](slug:grid-kb-default-value-for-new-row) are recommended.
* Users are always editing existing rows, not adding new ones.
* The [`InsertedItem` property](slug:grid-state#information-in-the-grid-state) of the [Grid state](slug:grid-state) is not used and is always `null`.
* To [add a new row programmatically and put it in edit mode](slug:grid-kb-add-edit-state), use the `OriginalEditItem`, `EditItem`, and `EditField` properties of the Grid state.

The above algorithm is different from [inline](slug:grid-editing-inline) and [popup](slug:grid-editing-popup) editing where new rows are only added to the data source after users populate them with valid values.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:grid-editing-overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another cell.

* If the validation is not satisfied, the component blocks the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing completes and the component fires `OnUpdate`.

### Delete, Filter, Group, Page, Search, Sort

This section explains what happens when the user tries to perform another data operation, while the component is already in add or edit mode.

* If the validation is satisfied, then editing completes and the component fires `OnUpdate`.
* If the validation is not satisfied, then editing aborts and the component fires `OnCancel`.

### Selection

To enable [row selection](slug:grid-selection-row) with in-cell edit mode, use a [checkbox column](slug:components/grid/columns/checkbox). More information on that can be read in the [Row Selection](slug:grid-selection-row#selection-and-editing-modes) article.

To see how to select the row that is currently in in-cell edit mode without using a `<GridCheckboxColumn />`, see the [Row Selection in Edit with InCell EditMode](slug:grid-kb-row-select-incell-edit) Knowledge Base article.

[Cell selection](slug:grid-selection-cell) is not supported with in-cell edit mode.

## Examples

### Basic

The example below shows how to:

* Implement in-cell Grid CRUD operations with the simplest and minimal required setup.
@[template](/_contentTemplates/grid/editing.md#basic-example-description)

>caption Basic Grid in-cell editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Incell"
@[template](/_contentTemplates/grid/editing.md#basic-example-parameters-columns)
        <GridCommandColumn Width="180px">
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

* Implement in-cell Grid CRUD operations with all available events and various built-in customizations.
@[template](/_contentTemplates/grid/editing.md#advanced-example-description)

>caption Advanced Grid in-cell editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Incell"
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

* [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
* [Grid Editor Template](slug:grid-templates-editor)
* [Start and End Editing through the Grid State](slug:grid-kb-add-edit-state)
* [Grid Selection Documentation](slug:grid-selection-overview)
