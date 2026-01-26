---
title: Use Custom DataAnnotations Validator
description: Learn how to implement and integrate custom DataAnnotations validation with Telerik Blazor components such as Form, Grid, ValidationMessage, ValidationTooltip, and others.
type: how-to
page_title: How to Use Custom DataAnnotations Validator with Telerik UI for Blazor
slug: validation-kb-custom-dataannotations-validator
tags: telerik, blazor, validation, form, grid
ticketid: 1666005, 1665269, 1658101, 1560189, 1558247, 1543336
res_type: kb
components: ["grid, form"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                UI for Blazor, <br />
                Grid for Blazor, <br />
                Form for Blazor, <br />
                ValidationMessage for Blazor, <br />
                ValidationSummary for Blazor, <br />
                ValidationTooltip for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to use conditional required validation with Telerik UI for Blazor components?
* How to make a Form field required, depending on the value of another field?
* How to implement a conditional `DataAnnotations` validator and integrate it with the Telerik Blazor Form or Grid?
* How to display inline validation messages or validation tooltips when using a custom validator?

## Solution

1. Implement a class that inherits from [`ValidationAttribute`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute).
1. Override the [`IsValid()` method overload](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationattribute.isvalid), which accepts a [`ValidationContext`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationcontext) and returns a [`ValidationResult`](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationresult).
1. Return a `ValidationResult` that includes the failing field name(s) as a second argument of type `IEnumerable<string>`. This step is crucial in order to apply invalid state to the respective input component and display an inline validation message next to it.
1. (optional) Override the `FormatErrorMessage` method to provide a custom validation message.

> Creating a custom `DataAnnotations` validator does not involve Telerik APIs and is outside the Telerik support scope. The following implementation is just an example that shows that Telerik Blazor components can work with a custom validator. The exact validator implementation <a href="https://stackoverflow.com/questions/26354853/conditionally-required-property-using-data-annotations" target="_blank">depends on the specific requirements and can vary</a>.

>caption Use custom conditional required DataAnnotations validator with Telerik components for Blazor

````RAZOR
@using System.ComponentModel.DataAnnotations

@using System.Reflection

<h1>Conditional Validation</h1>

<p><code>ShippingAddress</code> is required when <code>UseBillingAddressForShipping</code> is <code>false</code>.</p>

<h2>Form</h2>

<TelerikForm Model="@FormModel">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(OrderDelivery.BillingAddress)" LabelText="Billing Address"></FormItem>
        <FormItem Field="@nameof(OrderDelivery.UseBillingAddressForShipping)" LabelText="Use Billing Address for Shipping"></FormItem>
        <FormItem Field="@nameof(OrderDelivery.ShippingAddress)" LabelText="Shipping Address"></FormItem>
    </FormItems>
</TelerikForm>

<h2>Grid</h2>

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add Item</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(OrderDelivery.BillingAddress)" Title="Billing Address" />
        <GridColumn Field="@nameof(OrderDelivery.UseBillingAddressForShipping)" Title="Use Billing Address for Shipping" />
        <GridColumn Field="@nameof(OrderDelivery.ShippingAddress)" Title="Shipping Address" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<style>
    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }
</style>

@code {
    private OrderDelivery FormModel { get; set; } = new() { Id = 1 };

    #region Grid

    private List<OrderDelivery> GridData { get; set; } = new();

    private int LastId { get; set; }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (OrderDelivery)args.Item;

        createdItem.Id = ++LastId;

        GridData.Insert(0, createdItem);
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (OrderDelivery)args.Item;
        var originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    #endregion Grid

    #region Model

    public class OrderDelivery
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Billing Address")]
        public string BillingAddress { get; set; } = string.Empty;

        [Display(Name = "Use Billing Address For Shipping")]
        public bool UseBillingAddressForShipping { get; set; }

        [ConditionalRequired(nameof(OrderDelivery.UseBillingAddressForShipping), false)]
        [Display(Name = "Shipping Address")]
        public string ShippingAddress { get; set; } = string.Empty;
    }

    #endregion Model

    #region Custom Validator

    public class ConditionalRequired : ValidationAttribute
    {
        private string DependentPropertyName { get; set; }
        private string DependentPropertyDisplayName { get; set; } = string.Empty;
        private object? DependentPropertyExpectedValue { get; set; }
        private object? DependentPropertyValue { get; set; }

        public override bool RequiresValidationContext
        {
            get { return true; }
        }

        public ConditionalRequired(string dependentPropertyName, object dependentPropertyExpectedValue)
        : base("The {0} field is required when {1} is equal to {2}.")
        {
            DependentPropertyName = dependentPropertyName;
            DependentPropertyExpectedValue = dependentPropertyExpectedValue;
        }

        public override string FormatErrorMessage(string requiredPropertyName)
        {
            return string.Format(
                System.Globalization.CultureInfo.CurrentCulture,
                base.ErrorMessageString,
                requiredPropertyName,
                DependentPropertyDisplayName,
                DependentPropertyValue);
        }

        protected override ValidationResult IsValid(object? validatedValue, ValidationContext validationContext)
        {
            if (validationContext == null)
            {
                throw new ArgumentNullException("validationContext");
            }

            PropertyInfo? dependentProperty = validationContext.ObjectType.GetProperty(DependentPropertyName);
            DependentPropertyValue = dependentProperty?.GetValue(validationContext.ObjectInstance);
            DependentPropertyDisplayName = dependentProperty?.GetCustomAttribute<DisplayAttribute>()?.Name ?? DependentPropertyName;

            if ((DependentPropertyValue == null && DependentPropertyExpectedValue == null)
                || (DependentPropertyValue != null && DependentPropertyValue.Equals(DependentPropertyExpectedValue))
                && string.IsNullOrEmpty(validatedValue?.ToString()))
            {
                return new ValidationResult(FormatErrorMessage(validationContext.DisplayName), new List<string> { validationContext.DisplayName });
            }

            return ValidationResult.Success!;
        }
    }

    #endregion Custom Validator
}
````

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## See Also

* [Conditional Form Validation Options](slug:form-kb-conditional-validation)
* [Form Validation](slug:form-validation)
* [Grid Validation](slug:grid-editing-validation)
* [Validation Tools Overview](slug:validation-tools-overview)
