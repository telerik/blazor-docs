---
title: Summary
page_title: Validation Tools - Summary
description: Validation Tools - Summary.
slug: validation-tools-summary
tags: telerik,blazor,validation,tools,summary
published: True
position: 5
---

# Telerik Validation Summary for Blazor

The <a href = "https://www.telerik.com/blazor-ui/validationsummary" target="_blank">Telerik Validation Summary for Blazor</a> adds customization options on top of the standard <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationsummary" target="_blank">.NET ValidationSummary</a>, such as [`Template`](#template) and [`Class`](#class) parameters.

## Using Validation Summary with TelerikForm

1. Add the `<TelerikValidationSummary>` tag inside the `<FormValidation>` child tag of the `<TelerikForm>`.
1. (optional) Disable the built-in validation messages of the Telerik Form to avoid repetition. Set `ValidationMessageType="@FormValidationMessageType.None"`.

>caption Use Telerik ValidationSummary in a Telerik Form

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary />
    </FormValidation>
</TelerikForm>

@code {
    private Customer customer = new Customer();

    public class Customer
    {
        [Required(ErrorMessage = "Please enter your name")]
        [MaxLength(40, ErrorMessage = "The name must be up to 40 characters long")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter your age")]
        [Range(18, 120, ErrorMessage = "You should be at least 18 years old to place an order")]
        public int CustomerAge { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string EmailAddress { get; set; }
    }
}
````

## Using Validation Summary with EditForm

Use the `<TelerikValidationSummary>` tag instead of `<ValidationSummary>` directly in the Blazor `EditForm` component.

>caption Use Telerik ValidationSummary in an EditForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<EditForm Model="@customer" width="600px">
    <DataAnnotationsValidator />
    <TelerikValidationSummary />
    <InputText @bind-Value="@customer.CustomerName"></InputText>
    <br />
    <InputNumber @bind-Value="@customer.CustomerAge"></InputNumber>
    <br />
    <InputText @bind-Value="@customer.EmailAddress"></InputText>
    <br />
    <input type="submit" value="Submit" />
</EditForm>

@code {
    private Customer customer = new Customer();

    public class Customer
    {
        [Required(ErrorMessage = "Please enter your name")]
        [MaxLength(40, ErrorMessage = "The name must be up to 40 characters long")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter your age")]
        [Range(18, 120, ErrorMessage = "You should be at least 18 years old to place an order")]
        public int CustomerAge { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string EmailAddress { get; set; }
    }
}
````

## Template

The `TelerikValidationSummary` allows you to control its rendering via a nested `<Template>` tag. The `context` is an `IEnumerable<string>` collection of all error messages for the form.

>caption Using TelerikValidationSummary Template

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px" ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary>
            <Template>
                @{ 
                    IEnumerable<string> validationSummaryContext = context;

                    @foreach (var message in validationSummaryContext)
                    {
                        <div>
                            <TelerikSvgIcon Icon="@SvgIcon.XOutline" />
                            <span>@message</span>
                        </div>
                    }
                }
            </Template>
        </TelerikValidationSummary>
    </FormValidation>
</TelerikForm>

@code {
    private Customer customer = new Customer();

    public class Customer
    {
        [Required(ErrorMessage = "Please enter your name")]
        [MaxLength(40, ErrorMessage = "The name must be up to 40 characters long")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter your age")]
        [Range(18, 120, ErrorMessage = "You should be at least 18 years old to place an order")]
        public int CustomerAge { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string EmailAddress { get; set; }
    }
}
````

## Class

Use the `Class` parameter of the Validation Summary component to add a custom CSS class to the `div.k-validation-summary`. This element wraps the validation summary content.

>caption Using TelerikValidationSummary Class

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px" ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary Class="validation-summary-class" />
    </FormValidation>
</TelerikForm>

<style>
    .validation-summary-class {
        background-color: lightblue;
    }
</style>

@code {
    private Customer customer = new Customer();

    public class Customer
    {
        [Required(ErrorMessage = "Please enter your name")]
        [MaxLength(40, ErrorMessage = "The name must be up to 40 characters long")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter your age")]
        [Range(18, 120, ErrorMessage = "You should be at least 18 years old to place an order")]
        public int CustomerAge { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string EmailAddress { get; set; }
    }
}
````

## Next Steps

* Use [TelerikValidationMessage](slug:validation-tools-message)
* Try [TelerikValidationTooltip](slug:validation-tools-tooltip)

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [Form Component](slug:form-overview)
