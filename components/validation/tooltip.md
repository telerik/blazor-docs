---
title: Tooltip
page_title: Validation Tools - Tooltip
description: Validation Tools - Tooltip.
slug: validation-tools-tooltip
tags: telerik,blazor,validation,tools,tooltip
published: True
position: 20
---

# Telerik Validation Tooltip for Blazor

The <a href = "https://www.telerik.com/blazor-ui/validationtooltip" target="_blank">Telerik Validation Tooltip for Blazor</a> displays validation errors as tooltips that point to the problematic input component. The tooltips show on hover. Validaton Tooltips serve the same purpose as Validation Messages, but as popups, they don't take up space on the page.

## Using Validation Tooltip with TelerikForm

To enable Telerik Validation Tooltip for a field in the Telerik Form:

1. Add a `<TelerikValidationTooltip>` tag inside the TelerikForm `<FormItems>` tag, or [inside a form item `<Template>`](slug://form-formitems-template).
1. Provide a lambda expression in the `For` parameter that sets the associated property of the model, just like with the standard Blazor `ValidationMessage`.
1. Set the `TargetSelector` parameter to a CSS selector that points to the element(s) the Tooltip will associate itself with.
1. (optional) Disable the built-in validation messages of the Telerik Form to avoid repetition. Set `ValidationMessageType="@FormValidationMessageType.None"`.

>caption Use Telerik Validation Tooltip in a Telerik Form

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" Id="customer-name-field" LabelText="Name" />
        <TelerikValidationTooltip For="@(() => customer.CustomerName)" TargetSelector="#customer-name-field" />

        <FormItem Field="@nameof(Customer.CustomerAge)" Id="customer-age-field" LabelText="Age" />
        <TelerikValidationTooltip For="@(() => customer.CustomerAge)" TargetSelector="#customer-age-field" />

        <FormItem Field="@nameof(Customer.EmailAddress)" Id="customer-email-field" LabelText="Email Address" />
        <TelerikValidationTooltip For="@(() => customer.EmailAddress)" TargetSelector="#customer-email-field" />
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

>tip The Telerik Form can provide tooltips out-of-the-box with a single setting - see [Form Validation - Validation Message Type](slug://form-validation#validation-message-type). Use standalone validation tooltips only to make more advanced customizations such as the ones in this article.

## Using Validation Tooltip with EditForm

1. Add a `<TelerikValidationTooltip>` tag inside the `EditForm`.
1. Provide a lambda expression in the `For` parameter that sets the associated property of the model, just like with the standard Blazor `ValidationMessage`.
1. Set the `TargetSelector` parameter to a CSS selector that points to the element(s) the Tooltip will associate itself with.

>caption Use Telerik Validation Tooltip in an EditForm

````RAZOR
@using System.ComponentModel.DataAnnotations

<EditForm Model="@customer" width="600px">
    <DataAnnotationsValidator />

    <InputText @bind-Value="@customer.CustomerName" id="name"></InputText>
    <TelerikValidationTooltip For="@(() => customer.CustomerName)" TargetSelector="#name" />
    <br />
    <InputNumber @bind-Value="@customer.CustomerAge" id="age"></InputNumber>
    <TelerikValidationTooltip For="@(() => customer.CustomerAge)" TargetSelector="#age" />
    <br />
    <InputText @bind-Value="@customer.EmailAddress" id="email"></InputText>
    <TelerikValidationTooltip For="@(() => customer.EmailAddress)" TargetSelector="#email" />
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

## Position

Control the position of the validation tooltips through their `Position` parameter. It takes a member of the `TooltipPosition` enum:

* `Top` (default)
* `Bottom`
* `Right`
* `Left`

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px" ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" Id="customer-name-field" LabelText="Name" />
        <TelerikValidationTooltip For="@(() => customer.CustomerName)" TargetSelector="#customer-name-field" Position="@TooltipPosition.Left" />

        <FormItem Field="@nameof(Customer.CustomerAge)" Id="customer-age-field" LabelText="Age"  />
        <TelerikValidationTooltip For="@(() => customer.CustomerAge)" TargetSelector="#customer-age-field" Position="@TooltipPosition.Bottom" />

        <FormItem Field="@nameof(Customer.EmailAddress)" Id="customer-email-field" LabelText="Email Address" />
        <TelerikValidationTooltip For="@(() => customer.EmailAddress)" TargetSelector="#customer-email-field" Position="@TooltipPosition.Right" />
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

## Template

The `ValidationTooltip` allows you to control its rendering via a nested `<Template>` tag. The `context` is an `IEnumerable<string>` collection of all messages for the property.

````RAZOR
<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" Id="customer-name-field" LabelText="Name" />
        <TelerikValidationTooltip For="@(() => customer.CustomerName)" TargetSelector="#customer-name-field">
            <Template>
                @{ 
                    IEnumerable<string> validationContext = context;

                    @foreach (var message in validationContext)
                    {
                        <div>
                            <TelerikSvgIcon Icon="@SvgIcon.XOutline"></TelerikSvgIcon>
                            <span>@message</span>
                        </div>
                    }
                }
            </Template>
        </TelerikValidationTooltip>

        <FormItem Field="@nameof(Customer.CustomerAge)" Id="customer-age-field" LabelText="Age" />
        <TelerikValidationTooltip For="@(() => customer.CustomerAge)" TargetSelector="#customer-age-field" />

        <FormItem Field="@nameof(Customer.EmailAddress)" Id="customer-email-field" LabelText="Email Address" />
        <TelerikValidationTooltip For="@(() => customer.EmailAddress)" TargetSelector="#customer-email-field" />
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

Use the `Class` parameter of the Validation Tooltip to add a custom CSS class to `div.k-animation-container`. This element wraps the `div.k-tooltip` element.

````RAZOR
<style>
    .my-custom-tooltip-class .k-tooltip {
        color: #f00;
        text-decoration: underline;
    }
</style>

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@customer" Width="600px"
             ValidationMessageType="@FormValidationMessageType.None">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>

    <FormItems>
        <FormItem Field="@nameof(Customer.CustomerName)" Id="customer-name-field" LabelText="Name" />
        <TelerikValidationTooltip For="@(() => customer.CustomerName)" TargetSelector="#customer-name-field" />

        <FormItem Field="@nameof(Customer.CustomerAge)" Id="customer-age-field" LabelText="Age"  />
        <TelerikValidationTooltip For="@(() => customer.CustomerAge)" TargetSelector="#customer-age-field" Class="my-custom-tooltip-class" />

        <FormItem Field="@nameof(Customer.EmailAddress)" Id="customer-email-field" LabelText="Email Address" />
        <TelerikValidationTooltip For="@(() => customer.EmailAddress)" TargetSelector="#customer-email-field" />
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

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [TelerikValidationSummary](slug://validation-tools-summary)
* [TelerikValidationTooltip](slug://validation-tools-message)
* [Form Component](slug://form-overview)
