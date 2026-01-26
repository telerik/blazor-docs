---
title: Message
page_title: Validation Tools - Message
description: Validation Tools - Message.
slug: validation-tools-message
tags: telerik,blazor,validation,tools,message
published: True
position: 15
components: ["validationmessage", "validationsummary", "validationtooltip"]
---
# Telerik Validation Message for Blazor

The [Telerik Validation Message for Blazor](https://www.telerik.com/blazor-ui/validation-message) adds built-in styling and customization options on top of the standard [.NET ValidationMessage](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationmessage-1), such as [`Template`](#template) and [`Class`](#class) parameters.

## Basics

To use a Telerik Validation Message:

1. Add the `<TelerikValidationMessage>` tag.
1. Set the `For` parameter in the same way as with a standard Blazor `<ValidationMessage>`. There are two options:
    * If the `TelerikValidationMessage` is in the same component as the Form or if the Form model object is available, use a lambda expression that points to a property of the Form model.
        ````RAZOR.skip-repl
        <TelerikValidationMessage For="@(() => Customer.FirstName)" />

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
        <TelerikValidationMessage For="@FirstNameExpression" />

        @code {
            [Parameter]
            public Expression<System.Func<string>>? FirstNameExpression { get; set; }
        }
        ````

Refer to the following sections for additional information and examples with the [Telerik Form](#using-with-telerikform) and standard [Blazor `<EditForm>`](#using-with-editform).

## Using with TelerikForm

The Telerik Form [displays inline validation messages by default if validation is enabled](slug:form-validation). You may need to define `<TelerikValidationMessage>` components manually when you want to:

* Use [form item templates](slug:form-formitems-template). In this case, [add the validation message in the form item template](slug:form-formitems-template#example).
* Customize the validation messages, for example, change their rendering with a [validation message template](#template). In this case, add the validation message inside a [Form item template](slug:form-formitems-template#example).
* Customize the placement of the validation messages in the Form, so that they are outside the Form item containers. In this case, consider a [`<FormItemsTemplate>`](slug:form-formitems-formitemstemplate) that gives you full control over the Form rendering between the form items. Alternatively, consider a [Telerik ValidationSummary](slug:validation-tools-summary).

>caption Use Telerik ValidationMessage in a TelerikForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@Employee"
             Width="300px">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name">
            <Template>
                <label for="first-name" class="k-label k-form-label">First Name</label>
                <div class="k-form-field-wrap">
                    <TelerikTextBox @bind-Value="@Employee.FirstName"
                                    Id="first-name" />
                    <TelerikValidationMessage For="@(() => Employee.FirstName)" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.LastName)" LabelText="Last Name" />
    </FormItems>
</TelerikForm>

@code {
    private Person Employee { get; set; } = new();

    public class Person
    {
        [Required(ErrorMessage = "Please enter a first name")]
        [MinLength(2, ErrorMessage = "The first name must be at least 2 characters long")]
        [MaxLength(40, ErrorMessage = "The first name must be up to 40 characters long")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
    }
}
````

## Using with EditForm

In an existing Blazor `EditForm`, replace the `<ValidationMessage>` tags with `<TelerikValidationMessage>` tags. The `For` parameter is set in the same way for both validation components.

>caption Use Telerik ValidationMessage in an EditForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<EditForm Model="@Employee" style="width:300px">
    <DataAnnotationsValidator />

    <label for="first-name">First Name</label>
    <TelerikTextBox @bind-Value="@Employee.FirstName" Id="first-name" />
    <TelerikValidationMessage For="@(() => Employee.FirstName)" />

    <label for="last-name">Last Name</label>
    <TelerikTextBox @bind-Value="@Employee.LastName" Id="last-name" />
    <TelerikValidationMessage For="@(() => Employee.LastName)" />

    <div>
        <TelerikButton>Submit</TelerikButton>
    </div>
</EditForm>

@code {
    private Person Employee { get; set; } = new();

    public class Person
    {
        [Required(ErrorMessage = "Please enter a first name")]
        [MinLength(2, ErrorMessage = "The first name must be at least 2 characters long")]
        [MaxLength(40, ErrorMessage = "The first name must be up to 40 characters long")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
    }
}
````

## Template

The Telerik ValidationMessage allows you to customize its rendering with a nested `<Template>` tag. The template `context` is an `IEnumerable<string>` collection of all messages for the validated model property.

>caption Using ValidationMessage Template

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@Employee"
             Width="300px">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name">
            <Template>
                <label for="first-name" class="k-label k-form-label">First Name</label>
                <div class="k-form-field-wrap">
                    <TelerikTextBox @bind-Value="@Employee.FirstName"
                                    Id="first-name" />
                    <TelerikValidationMessage For="@(() => Employee.FirstName)">
                        <Template Context="validationMessages">
                            @foreach (string message in validationMessages)
                            {
                                <div>
                                    <span class="k-form-error k-invalid-msg" style="display:flex; gap: .4em;">
                                        <TelerikSvgIcon Icon="@SvgIcon.ExclamationCircle" />
                                        @message
                                    </span>
                                </div>
                            }
                        </Template>
                    </TelerikValidationMessage>
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.LastName)" LabelText="Last Name" />
    </FormItems>
</TelerikForm>

@code {
    private Person Employee { get; set; } = new();

    public class Person
    {
        [Required(ErrorMessage = "Please enter a first name")]
        [MinLength(2, ErrorMessage = "The first name must be at least 2 characters long")]
        [MaxLength(40, ErrorMessage = "The first name must be up to 40 characters long")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;
    }
}
````

## Class

Use the `Class` parameter of the Validation Message to add a custom CSS class to the `span.k-form-error`. This element holds the validation message.

>caption Using TelerikValidationMessage Class

````RAZOR.skip-repl
<TelerikValidationMessage Class="bold-blue"
                          For="@(() => Employee.FirstName)" />

<style>
    .bold-blue {
        font-weight: bold;
        color: blue;
    }
</style>
````

## Next Steps

* Explore [TelerikValidationTooltip](slug:validation-tools-tooltip)

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [Validate Inputs in Child Components](slug:inputs-kb-validate-child-component)
* [Telerik ValidationSummary](slug:validation-tools-summary)
* [Telerik ValidationTooltip](slug:validation-tools-tooltip)
