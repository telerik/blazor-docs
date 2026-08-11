---
title: Popup Form Template
page_title: Grid Popup Form Template
description: Learn how to define a custom popup create or edit template in the Blazor Data Grid. The template allows you to customize the layout and the content of the create/edit popup.
slug: grid-templates-popup-form
tags: telerik,blazor,grid,templates,popup,edit,create
published: True
position: 50
components: ["grid"]
---

# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the Grid. 

>caption In this article:
* [Using the Popup Form Template](#using-the-popup-form-template)
* [Specifics](#specifics)
* [Example](#example)

## Using the Popup Form Template

1. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<GridPopupEditFormSettings>`. For example, [`TelerikForm`](slug:form-overview) or [`EditForm`](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/).
1. The `FormTemplate` provides a `context` of type [`GridPopupEditFormTemplateContext`](slug:telerik.blazor.components.gridpopupeditformtemplatecontext). It contains a clone of the Grid data item in its `Item` property, and reveals if the user is adding a new item or editing an existing one through its `IsNew` boolean property. Cast `context.Item` to your model type, so you can pass it to the custom form.
1. (optional) Use the `Context` attribute of the `<FormTemplate>` tag to set the name of the `context` variable.

## Specifics

When using the template, the built-in popup form is replaced by the declared content in the `FormTemplate` tag. This introduces the following specifics:

* The default **Update** and **Cancel** buttons are removed. This means that the [`OnUpdate` and `OnCancel`](slug:grid-editing-overview#events) events do not fire. The only exception is that `OnCancel` fires when the user presses `ESC` or clicks the Close button in the popup Window header. To detect or cancel the update of a record, you need to include custom events to manage these actions.
* There are [two ways to define custom Form buttons](slug:grid-kb-handle-empty-popup-footer):
    * Use the [Form `<FormButtons>` template](slug:form-formitems-buttons).
    * Use the [Grid `<ButtonsTemplate>`](slug:grid-templates-popup-buttons), which is empty by default when using a `<FormTemplate>`. Remove the duplicate [built-in Form Submit button with an empty `<FormButtons>` template](slug:form-formitems-buttons).
* If you leave the Grid popup footer (`<ButtonsTemplate>`) empty, it takes up space in the popup. You can [remove this empty popup footer space with CSS](slug:grid-kb-handle-empty-popup-footer).
* The `FormTemplate` disables the [built-in validation](slug:grid-editing-validation) of the Grid. Implement a [Form Validation](slug:form-validation) instead.
* The [`<GridPopupEditFormSettings>` parameters](slug:grid-editing-popup#form-layout) do not apply to a custom `TelerikForm` that you may render inside the `<FormTemplate>` tag. Set the desired Form configurations such as `Columns`, `Orientation`, and more on the [Form component](slug:form-overview#form-parameters).

## Example

Using a `FormTemplate` to modify the Edit/Create Popup window.

<demo metaUrl="client/grid/templates-popup-form/" height="700"></demo>

## See Also

* [Grid Popup Buttons Template](slug:grid-templates-popup-buttons)
* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)
* [Blazor Grid](slug:grid-overview)
