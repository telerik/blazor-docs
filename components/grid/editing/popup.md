---
title: Popup Editing
page_title: Grid - Popup Editing
description: Popup editing of data in Grid for Blazor.
slug: grid-editing-popup
tags: telerik, blazor, grid, editing, popup
published: True
position: 2
---

# Grid Popup Editing

Grid popup editing allows the app to render a larger form with customizable dimensions and layout. The popup edit mode is also more suitable for mobile devices with small screens. The popup edit form may contain editable fields from hidden columns in the Grid table.

@[template](/_contentTemplates/grid/editing.md#overview-required)

## Basics

To use popup Grid editing, set the Grid `EditMode` parameter to `GridEditMode.Popup`. During popup editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous input component.
* Click the **Save** command button to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.

The popup edit mode can display a [Telerik Validation Summary component](slug:validation-tools-summary) if the Grid model is configured for validation.

## Commands

Popup add, edit, and delete operations use the following [command buttons](slug:grid-editing-overview#commands):

* **Add**
* **Delete**
* **Edit**

@[template](/_contentTemplates/grid/editing.md#without-commands)

Popup edit mode does not use **Save** and **Cancel** command buttons in the [Grid command column](slug:components/grid/columns/command). The Grid renders them automatically in the popup, unless you define a [Buttons Template](slug:grid-templates-popup-buttons) or a [Form Template](slug:grid-templates-popup-form).

In popup edit mode, the Grid commands execute row by row and the corresponding [Grid events](slug:grid-editing-overview#events) also fire row by row.

## Customization

The Grid exposes options to customize the edit popup and its form. Define the desired configuration in the `GridPopupEditSettings` and `GridPopupEditFormSettings` tags under the `GridSettings` tag.

### Edit Hidden Columns

Starting with version 7.0, the Grid allows users to edit [hidden columns](slug:grid-columns-visible) by default. To disable editing of a hidden column, set `Editable="false"` to the respective `<GridColumn>` tag.

### Popup Dimensions and Styles

The `GridPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

For example, here is [how to set the Grid popup edit form's title, so that it matches a property value of the edited data item](slug:grid-kb-popup-edit-title).

### Form Layout

The `GridPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#edit-form-settings)

>important These settings are not applicable if you are using a `<FormTemplate>` with a custom Form component. See more details in [Form Template - Specifics](slug:grid-templates-popup-form#specifics).

### Form Template

In the `GridPopupEditFormSettings`, you can declare a `FormTemplate`. This template enables you to fully customize the appearance and content of the create/edit Popup window in the Grid. For more information and examples on customizing the Grid Popup window, refer to the [Popup Form Template](slug:grid-templates-popup-form) article.

### Buttons Template

You can specify a `ButtonsTemplate` in the `GridPopupEditFormSettings` to customize how the buttons look in the create/edit Popup window of the Grid. To learn more and see an example of customizing the Grid Popup buttons, refer to the [Popup Buttons Template](slug:grid-templates-popup-buttons) article.

## Examples

### Basic

The example below shows how to:

* Implement popup Grid CRUD operations with the simplest and minimal required setup.
@[template](/_contentTemplates/grid/editing.md#basic-example-description)

>caption Basic Grid popup editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Popup"
@[template](/_contentTemplates/grid/editing.md#basic-example-parameters-columns)
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
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

* Implement popup Grid CRUD operations with all available events and various built-in customizations.
@[template](/_contentTemplates/grid/editing.md#advanced-example-description)
* Edit the `Description` column that is not visible in the Grid.
* Customize the popup edit form dimensions and layout.

>caption Advanced Grid popup editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Popup"
@[template](/_contentTemplates/grid/editing.md#advanced-example-parameters)
    <GridSettings>
        <GridPopupEditSettings Width="600px" MaxWidth="90vw" Height="400px" MaxHeight="90vh" />
        <GridPopupEditFormSettings Columns="2" ColumnSpacing="2em" ButtonsLayout="@FormButtonsLayout.Stretch" />
    </GridSettings>
@[template](/_contentTemplates/grid/editing.md#advanced-example-toolbar)
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Editable="false" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Description)" EditorType="@GridEditorType.TextArea" Visible="false">
            <Template>
                @{ var dataItem = (Product)context; }
                <div style="white-space:pre">@dataItem.Description</div>
            </Template>
        </GridColumn>
@[template](/_contentTemplates/grid/editing.md#advanced-example-columns)
        <GridCommandColumn Title="Commands" Width="180px">
            @{ var dataItem = (Product)context; }
            <GridCommandButton Command="Edit" ThemeColor="@AddEditButtonThemeColor">Edit</GridCommandButton>
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

* [Live Demo: Grid Popup Editing](https://demos.telerik.com/blazor-ui/grid/editing-popup)
* [Grid Editor Template](slug:grid-templates-editor)
* [Start and End Editing through the Grid State](slug:grid-kb-add-edit-state)
* [Blazor Grid](slug:grid-overview)
