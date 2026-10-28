---
title: Popup Editing
page_title: TreeList - Popup Editing
description: Popup editing of data in TreeList for Blazor.
slug: treelist-editing-popup
tags: telerik, blazor, treelist, editing, popup
published: True
position: 2
components: ["treelist"]
---

# TreeList Popup Editing

TreeList popup editing allows the app to render a larger form with customizable dimensions and layout. The popup edit mode is also more suitable for mobile devices with small screens. The popup edit form may contain editable fields from hidden columns in the TreeList table.

@[template](/_contentTemplates/treelist/editing.md#overview-required)

## Basics

To use popup TreeList editing, set the TreeList `EditMode` parameter to `TreeListEditMode.Popup`. During popup editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous input component.
* Click the **Save** command button to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.

The popup edit mode can display a [Telerik Validation Summary component](slug:validation-tools-summary) if the TreeList model is configured for validation.

## Commands

Popup add, edit, and delete operations use the following [command buttons](slug:treelist-editing-overview#commands):

* **Add**
* **Delete**
* **Edit**

@[template](/_contentTemplates/treelist/editing.md#without-commands)

Popup edit mode does not use **Save** and **Cancel** command buttons in the [TreeList command column](slug:treelist-columns-command). The TreeList renders them automatically in the popup, unless you define a [Buttons Template](slug:treelist-templates-popup-buttons) or a [Form Template](slug:treelist-templates-popup-form).

In popup edit mode, the TreeList commands execute row by row and the corresponding [TreeList events](slug:treelist-editing-overview#events) also fire row by row.

## Customization

The TreeList exposes options to customize the edit popup and its form. Define the desired configuration in the `TreeListPopupEditSettings` and `TreeListPopupEditFormSettings` tags under the `TreeListSettings` tag.

### Edit Hidden Columns

Starting with version 7.0, the TreeList allows users to edit [hidden columns](slug:treelist-columns-visible) by default. To disable editing of a hidden column, set `Editable="false"` to the respective `<TreeListColumn>` tag.

### Popup Settings

The `TreeListPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

For example, here is [how to set the TreeList popup edit form's title, so that it matches a property value of the edited data item](slug:grid-kb-popup-edit-title).

### Form Layout

The `TreeListPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#edit-form-settings)

>important These settings are not applicable if you are using a [`<FormTemplate>` with a standalone Form component](slug:treelist-templates-popup-form).

### Form Template

In the `TreeListPopupEditFormSettings`, you can declare a `FormTemplate`. This template enables you to fully customize the appearance and content of the create/edit Popup window in the TreeList. For more information and examples on customizing the TreeList Popup window, refer to the [Popup Form Template](slug:treelist-templates-popup-form) article.

### Buttons Template

You can specify a `ButtonsTemplate` in the `TreeListPopupEditFormSettings` to customize how the buttons look in the create/edit Popup window of the TreeList. To learn more and see an example of customizing the TreeList Popup buttons, refer to the [Popup Buttons Template](slug:treelist-templates-popup-buttons) article.

## Example

The example below shows how to:

* Implement popup TreeList CRUD operations with the minimal required number of events.
* Bind an editable TreeList to [hierarchical data](slug:treelist-data-binding-hierarchical-data). Check the [inline editing example](slug:treelist-editing-inline#example) for an implementation with [flat data](slug:treelist-data-binding-flat-data).
@[template](/_contentTemplates/treelist/editing.md#basic-example-description)
* Edit the `Notes` column that is not visible in the TreeList.
* Customize the popup edit form dimensions and layout.

>caption TreeList popup editing

<demo metaUrl="client/treelist/editing/popup/example-1/" height="720"></demo>

## See Also

* [Live Demo: TreeList Popup Editing](https://demos.telerik.com/blazor-ui/treelist/editing-popup)
* [TreeList Editor Template](slug:treelist-templates-editor)
* [Start and End Editing through the TreeList State](slug:grid-kb-add-edit-state)
