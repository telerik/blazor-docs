---
title: Template
page_title: FormItem - Template
description: Template for the FormItem.
slug: form-formitems-template
tags: telerik,blazor,form,edit,formitems,template
published: True
position: 5
components: ["form"]
---

# FormItem Template - Custom Editors

This article explains how to customize the editor of a single Form item. To customize the rendering and item structure of the whole Form, check the article [Form Template for All Items](slug:form-formitems-formitemstemplate).

## Basics

Form item templates enables the app to:

* Replace the [default editor that the Form generates for a given data type](slug:form-overview#automatic-generation-of-fields) with a different component.
* Use the usual editor component for a given data type, but customize the editor or handle additional events.

To use a form item template, add a `<Template>` tag inside the [FormItem](slug:form-formitems).

When using a Form item template, the following `FormItem` parameters are ignored, because the Form expects the template content to provide suitable replacements:

* `EditorType`
* `Hint`
* `Id`
* `LabelText`

@[template](/_contentTemplates/common/form-validation.md#note-editcontext-formitem-template)

## Validation Messages and Styling

The `FormItem` `Template` replaces all the Form item's built-in rendering, which includes validation messages and form item labels. You can use the [Telerik validation tools](slug:validation-tools-overview) to display the desired validation UI, or even use the standard Blazor `ValidationMessage` component.

The Telerik [Blazor Form](slug:form-overview) applies red color to the labels of invalid Form items. To preserve this behavior in Form item templates:

1. Set the `FormItem` [`Field` parameter](slug:form-formitems#formitem-parameters), which is otherwise not required when using a `Template`.
1. Use a `<label class="k-label k-form-label">` element inside the `<Template>`.

Also see how to [set `ValueExpression` correctly when nesting inputs in child components inside the Form item `Template`](slug:inputs-kb-validate-child-component). This is crucial for the input component to display its invalid state.

## Example

The sample below shows how to:

* Define custom editor components inside a `FormItem` `Template`.
* (optional) Preserve the built-in HTML rendering inside the template for consistent form item layout (`<label>` and `<div>` tags).
* (optional) Preserve the built-in label styling for invalid form items (`FormItem` `Field` parameters and `<label>` classes).
* (optional) Use [validation messages](https://www.telerik.com/blazor-ui/validation-message) inside Form item templates (`<TelerikValidationMessage>`).

>caption Using Form Item Templates

<demo metaUrl="client/form/template/example-1/" height="470"></demo>

## See Also

* [Live Demo: Form Item Templates](https://demos.telerik.com/blazor-ui/form/templates)
* [Form Items](slug:form-formitems)
* [Form Groups](slug:form-formgroups)
* [Display Invalid State in Child Component](slug:inputs-kb-validate-child-component)
