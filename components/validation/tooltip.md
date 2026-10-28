---
title: Tooltip
page_title: Validation Tools - Tooltip
description: Validation Tools - Tooltip.
slug: validation-tools-tooltip
tags: telerik,blazor,validation,tools,tooltip
published: True
position: 20
components: ["validationmessage", "validationsummary", "validationtooltip"]
---

# Telerik Validation Tooltip for Blazor

The [Telerik Validation Tooltip for Blazor](https://www.telerik.com/blazor-ui/validationtooltip) displays validation errors as tooltips that point to the problematic input component. The tooltips show on mouse over. Validaton tooltips serve the same purpose as inline [validation messages](slug:validation-tools-message), but as popups, they don't take up space on the page.

## Basics

To use a Telerik Validation Tooltip:

1. Add the `<TelerikValidationTooltip>` tag.
1. Set the `TargetSelector` parameter to a CSS selector that points to the desired element in the Form.
1. (optional) Set the `Position` parameter to define on which side of the target the tooltip shows. Refer to the [Position article for the Telerik Blazor Tooltip component](slug:tooltip-position) for details.
1. Set the `For` parameter in the same way as with a standard Blazor `<ValidationMessage>`. There are two options:
    * If the `TelerikValidationTooltip` is in the same component as the Form or if the Form model object is available, use a lambda expression that points to a property of the Form model.
        ````RAZOR.skip-repl
        <TelerikTextBox Id="first-name" />
        <TelerikValidationTooltip For="@(() => Customer.FirstName)"
                                  TargetSelector="#first-name" />

        @code {
            private CustomerModel Customer { get; set; } = new();

            public class CustomerModel
            {
                public string FirstName { get; set; } = string.Empty;
            }
        }
        ````
    * If the [validation message is in a child component](slug:inputs-kb-validate-child-component) that receives a `ValueExpression`, set the `For` parameter directly to the expression, without a lambda.
        ````RAZOR.skip-repl
        <TelerikTextBox Id="first-name" />
        <TelerikValidationTooltip For="@FirstNameExpression"
                                  TargetSelector="#first-name" />

        @code {
            [Parameter]
            public Expression<System.Func<string>>? FirstNameExpression { get; set; }
        }
        ````

Refer to the following sections for additional information and examples with the [Telerik Form](#using-with-telerikform) and standard [Blazor `<EditForm>`](#using-with-editform).

## Using with TelerikForm

The Telerik Form can [display built-in validation tooltips](slug:form-validation#validation-message-type). You may need to define `<TelerikValidationTooltip>` components manually when you want to:

* Use [form item templates](slug:form-formitems-template). In this case, [add the validation tooltip in the form item template](slug:form-formitems-template#example).
* Customize the validation tooltips, for example, change their rendering with a [validation tooltip template](#template). In this case, add the validation tooltip inside a [Form item template](slug:form-formitems-template#example).

The following example sets a `Tooltip` `ValidationMessageType` on the Form. This is not required, but makes the validation user experience the same for `FirstName` and `LastName` properties, as the latter is not using an explicit `<TelerikValidationTooltip>`.

>caption Use Telerik ValidationTooltip in a Telerik Form

<demo metaUrl="client/validation/tooltip/example-1/" height="420"></demo>

## Using with EditForm

In an existing Blazor `EditForm`, replace the `<ValidationMessage>` tags with `<TelerikValidationTooltip>` tags. The `For` parameter is set in the same way for both validation components.

>caption Use Telerik Validation Tooltip in an EditForm

<demo metaUrl="client/validation/tooltip/example-2/" height="420"></demo>

## Position

The position of the ValidationTooltip is configured in the [same way as for the Telerik Tooltip component for Blazor](slug:tooltip-position).

## Template

The Telerik ValidationTooltip allows you to customize its rendering with a nested `<Template>` tag. The template `context` is an `IEnumerable<string>` collection of all messages for the validated model property.

>caption Using ValidationTooltip Template

<demo metaUrl="client/validation/tooltip/example-3/" height="420"></demo>

## Class

Use the `Class` parameter of the Validation Tooltip to add a custom CSS class to `div.k-animation-container`. This element wraps the `div.k-tooltip` and element and its child `div.k-tooltip`.

<demo metaUrl="client/validation/tooltip/example-4/" height="420"></demo>

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [Validate Inputs in Child Components](slug:inputs-kb-validate-child-component)
* [Telerik ValidationSummary](slug:validation-tools-summary)
* [Telerik ValidationMessage](slug:validation-tools-message)
