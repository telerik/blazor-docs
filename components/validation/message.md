---
title: Message
page_title: Validation Tools - Message
description: Validation Tools - Message.
slug: validation-tools-message
tags: telerik,blazor,validation,tools,message
published: True
position: 15
---

# Telerik Validation Message for Blazor

The <a href = "https://www.telerik.com/blazor-ui/validation-message" target="_blank">Telerik Validation Message for Blazor</a> adds customization options on top of the standard <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.validationmessage-1" target="_blank">.NET ValidationMessage</a>, such as [`Template`](#template) and [`Class`](#class) parameters.

## Using Validation Message with TelerikForm

To enable Telerik Validation Messages for a form field:

1. Add a `<TelerikValidationMessage>` tag near the respective `<FormItem>` tag, or [inside a form item `<Template>`](slug:form-formitems-template).
1. Provide a lambda expression in the `For` parameter that sets the associated property of the model, just like with the standard Blazor `ValidationMessage` component.
1. (optional) Disable the built-in validation messages of the Telerik Form to avoid repetition. Set `ValidationMessageType="@FormValidationMessageType.None"`.

>caption Use Telerik Validation Message in a TelerikForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" LabelText="Name" />
        <TelerikValidationMessage For="@(() => customer.CustomerName)" />

        <FormItem Field="@nameof(Customer.CustomerAge)" LabelText="Age" />
        <TelerikValidationMessage For="@(() => customer.CustomerAge)" />

        <FormItem Field="@nameof(Customer.EmailAddress)" LabelText="Email Address" />
        <TelerikValidationMessage For="@(() => customer.EmailAddress)" />
    </FormItems>
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

## Using Validation Message with EditForm

1. Replace the `<ValidationMessage>` tags with `<TelerikValidationMessage>` tags.
1. Provide a lambda expression in the `For` parameter that sets the associated property of the model, just like with the standard Blazor `ValidationMessage` component.

>caption Use Telerik ValidationMessage in an EditForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<EditForm Model="@customer" width="600px">
    <DataAnnotationsValidator />

    <InputText @bind-Value="@customer.CustomerName"></InputText>
    <TelerikValidationMessage For="@(() => customer.CustomerName)" />
    <br />
    <InputNumber @bind-Value="@customer.CustomerAge"></InputNumber>
    <TelerikValidationMessage For="@(() => customer.CustomerAge)" />
    <br />
    <InputText @bind-Value="@customer.EmailAddress"></InputText>
    <TelerikValidationMessage For="@(() => customer.EmailAddress)" />
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

The `TelerikValidationMessage` allows you to control its rendering via a nested `<Template>` tag. The `context` represents an `IEnumerable<string>` collection of all messages for this model property.

````RAZOR
@using System.ComponentModel.DataAnnotations

<style>
    .custom-validation-message {
        color: blue;
        font-weight: bold;
    }
</style>

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" LabelText="Name" />
        <TelerikValidationMessage For="@(() => customer.CustomerName)" />

        <FormItem Field="@nameof(Customer.CustomerAge)" LabelText="Age" />
        <TelerikValidationMessage For="@(() => customer.CustomerAge)">
            <Template>
                @{
                    IEnumerable<string> validationMessages = context;

                    @foreach (string message in validationMessages)
                    {
                        <div>
                            <TelerikSvgIcon Icon="@SvgIcon.XOutline"></TelerikSvgIcon>
                            <span class="custom-validation-message">@message</span>
                        </div>
                    }
                }
            </Template>
        </TelerikValidationMessage>

        <FormItem Field="@nameof(Customer.EmailAddress)" LabelText="Email Address" />
        <TelerikValidationMessage For="@(() => customer.EmailAddress)" />
    </FormItems>
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

Use the `Class` parameter of the Validation Message to add a custom CSS class to the `span.k-form-error`. This element holds the validation message.

>caption Using TelerikValidationMessage Class for EmailAddress.

````RAZOR
@using System.ComponentModel.DataAnnotations

<style>
    .my-email-message {
        color: blue;
        font-weight: bold;
        text-decoration: underline;
    }
</style>

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" LabelText="Name" />
        <TelerikValidationMessage For="@(() => customer.CustomerName)" />

        <FormItem Field="@nameof(Customer.CustomerAge)" LabelText="Age" />
        <TelerikValidationMessage For="@(() => customer.CustomerAge)" />

        <FormItem Field="@nameof(Customer.EmailAddress)" LabelText="Email Address" />
        <TelerikValidationMessage For="@(() => customer.EmailAddress)" Class="my-email-message" />
    </FormItems>
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

## Next Steps

* Explore [TelerikValidationTooltip](slug:validation-tools-tooltip)

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [TelerikValidationSummary](slug:validation-tools-summary)
* [TelerikValidationTooltip](slug:validation-tools-tooltip)
* [Form Component](slug:form-overview)
