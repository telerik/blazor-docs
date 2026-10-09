---
title: Summary
page_title: Validation Tools - Summary
description: Validation Tools - Summary.
slug: validation-tools-summary
tags: telerik,blazor,validation,tools,summary
published: True
position: 5
components: ["validationmessage", "validationsummary", "validationtooltip"]
---

# Telerik Validation Summary for Blazor

The [Telerik Validation Summary for Blazor](https://www.telerik.com/blazor-ui/validationsummary) adds built-in styling and customization options on top of the standard [.NET ValidationSummary](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationsummary), such as [`Template`](#template) and [`Class`](#class) parameters.

The Telerik ValidationSummary component must be placed inside a Form. Refer to the following sections for additional information and examples with the [Telerik Form](#using-with-telerikform) and standard [Blazor `<EditForm>`](#using-with-editform).

## Using with TelerikForm

There are three ways to add a Telerik ValidationSummary to a Telerik Form:

* To display validation messages at the top of the Telerik Form, add the `<TelerikValidationSummary>` tag inside the [`<FormValidation>` child tag of the `<TelerikForm>`](slug:form-validation).
* To display validation messages at the bottom of the Telerik Form, add the `<TelerikValidationSummary>` tag inside the [`<FormButtons>` template](slug:form-formitems-buttons). Wrap the `<TelerikValidationSummary>` and all buttons in a single HTML element, otherwise the validation messages will shrink horizontally and display on the same line as the buttons.
* To display validation messages anywhere else in the Telerik Form, add the `<TelerikValidationSummary>` tag inside a [`<FormItemsTemplate>` child tag of the `<TelerikForm>`](slug:form-formitems-formitemstemplate).

Optionally, [disable the built-in inline validation messages of the Telerik Form](slug:form-validation#validation-message-type) to avoid repetition.

>caption Use Telerik ValidationSummary at the top of a TelerikForm

<demo metaUrl="client/validation/summary/example-1/" height="420"></demo>

>caption Use Telerik ValidationSummary at the bottom of a TelerikForm

<demo metaUrl="client/validation/summary/example-2/" height="420"></demo>

## Using with EditForm

In a standard Blazor `EditForm`, place a `<TelerikValidationSummary />` instead of a `<ValidationSummary />` anywhere inside the Form.

>caption Use Telerik ValidationSummary in an EditForm

<demo metaUrl="client/validation/summary/example-3/" height="420"></demo>

## Template

The Telerik ValidationSummary allows you to customize its rendering with a nested `<Template>` tag. The template `context` is an `IEnumerable<string>` collection of all messages for the validated model.

>caption Using ValidationSummary Template

<demo metaUrl="client/validation/summary/example-4/" height="420"></demo>

## Class

Use the `Class` parameter of the Validation Summary to add a custom CSS class to the `div.k-validation-summary` container element. If you need to override the color styles, use [CSS specificity](slug:themes-override) that is higher than 2 CSS classes.

>caption Using TelerikValidationSummary Class

````RAZOR.skip-repl
<TelerikValidationSummary Class="bold-blue" />

<style>
    div.bold-blue.k-validation-summary {
        font-weight: bold;
        color: blue;
    }
</style>
````

## Next Steps

* Use [TelerikValidationMessage](slug:validation-tools-message)
* Try [TelerikValidationTooltip](slug:validation-tools-tooltip)

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [Form Component](slug:form-overview)
