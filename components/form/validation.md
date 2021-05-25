---
title: Validation
page_title: Form for Blazor - Validation
description: Form for Blazor - Validation.
slug: form-validation
tags: telerik,blazor,form,edit,form,validation
published: True
position: 5
---

# Form Validation

To enable validation in the Form for Blazor you can use the `<FormValidation>` nested tag. The component works with the Microsoft `DataAnnotationsValidator` as well as any validator that is compatible with the `EditForm` and `EditContext` provided by the framework.

In this article:

* [Basics](#basics)
* [Validation Message Type](#validation-message-type)
* [Examples](#examples)
    * [Validate a Model](#validate-a-model)
    * [Validate a Complex Model](#validate-a-complex-model)
    * [Fluent Validation](#fluent-validation)


## Basics

To enable validation in the Telerik Form for Blazor add the `<FormValidation>` tag inside the `<TelerikForm>`. The `<FormValidation>` is used to provide validation configuration such as a validator (for example the `<DataAnnotationsValidator>`) and other validation settings like `ValidationSummary`.

>caption Enable validation in the Telerik Form for Blazor

````CSHTML
@* Basic validation in the Form component *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
</TelerikForm>

@code {
    public Person person = new Person();

    public class Person
    {
        [Range(100, 1000, ErrorMessage ="The Id must be between 100 and 1000")]
        public int Id { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage ="The first name should be maximum 20 characters long")]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(25, ErrorMessage = "The last name should be maximum 25 characters long")]
        public string LastName { get; set; }
        [Required]
        public DateTime? DOB { get; set; }
    }
}
````

When you provide an `EditContext` to the form, you cold use its `AddDataAnnotationsValidation()` method to add the data annotation validation to the form, instead of using the markup. This can be useful when you will be changing the model the form is bound to at runtime, for example, when you [add a reset button]({%slug form-formitems-buttons%}#how-to-add-a-reset-clear-button-to-the-form). Alternatively, you could call this method to re-attach validation on the `Model` you pass when you change it by using the [reference to the Form component]({%slug form-overview%}#component-reference) - `TheFormReference.EditContext.AddDataAnnotationsValidation()`.

>note The Telerik form and validation tools don't add functionality over the standard ones. You should implement the desired custom validations first, and then you can replace it immediately with ours.

## Validation Message Type

With the `ValidationMessageType` parameter of the Telerik Form for Blazor you can customize the way the validation messages are presented to the user. This setting accepts a member of the `FormValidationMessageType` enum:

* `Tooltip` - validation messages will show up in a tooltip pointing to the invalid input.
* `Inline` - the standard display of messages in text after the input. This is the default value.
* `None` - no validation messages will be rendered. The user will be notified that certain field is incorrect by a red border around the associated editor. 

>caption Change the type of the validation message to tooltip

````CSHTML
@* Set the FormValidationMessageType to Tooltip *@ 

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person" ValidationMessageType="@FormValidationMessageType.Tooltip">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
</TelerikForm>

@code {
    public Person person = new Person();

    public class Person
    {
        [Required]
        public int? Id { get; set; }
        [Required(ErrorMessage = "Enter your first name")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Enter your last name")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Enter your date of birth")]
        public DateTime? DOB { get; set; }
    }
}
````

![Validation Tooltip Message](images/validation-tooltip-example.png)

## Examples

This section provides the following examples:

* [Validate a Model](#validate-a-model)
* [Validate a Complex Model](#validate-a-complex-model)
* [Fluent Validation](#fluent-validation)

### Validate a Model

You can use the built-in `DataAnnotationsValidator` that comes with the Blazor framework.

````CSHTML
@* Use the Telerik Edit Form for Blazor to Validate a model *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
</TelerikForm>


@code {
    public Person person { get; set; } = new Person();

    public class Person
    {
        [Required(ErrorMessage = "The First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "The Last name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage ="Enter the name of the company you work for")]
        public string CompanyName { get; set; }
        [Required(ErrorMessage ="Enter your position")]
        [MaxLength(25, ErrorMessage ="The position can be maximum 25 characters long")]
        public string Position { get; set; }
    }
}
````

### Validate a Complex Model

You can use the <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#nested-models-collection-types-and-complex-types" target="_blank">ObjectGraphDataAnnotationsValidator</a>  inside the Telerik Form for Blazor to validate a nested model.

When using a model with nested objects and fields, specify their `Field` setings as a dot-separate string, do *not* use the `nameof` operator, it does not return the full name of the model.

````CSHTML
@using System.Dynamic
@using System.ComponentModel.DataAnnotations

<div class="mt-4" style="margin: 0 auto;">
    <TelerikForm Model="@MyModel">
        <FormValidation>
            <ObjectGraphDataAnnotationsValidator></ObjectGraphDataAnnotationsValidator>
        </FormValidation>
        <FormItems>
            <FormItem Field="StringProperty"></FormItem>
            <FormItem Field="Child.StringProperty" />
            <FormItem Field="Child.Child.StringProperty" />
            <FormItem Field="Child.Child.IntProperty" />
            <FormItem Field="Child.Child.BoolProperty" />
            <FormItem Field="Child.Child.DateTimeProperty" />
        </FormItems>
    </TelerikForm>
</div>
@code {
    TestModel MyModel { get; set; } = new TestModel();

    abstract class TestBaseClass
    {
        [Required(ErrorMessage = "String prop is required")]
        public string StringProperty { get; set; }

        [Required(ErrorMessage = "Int prop is required")]
        public int? IntProperty { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "You must accept.")]
        public bool BoolProperty { get; set; }

        [Required]
        public DateTime? DateTimeProperty { get; set; }
    }

    class TestGrandChildModel : TestBaseClass
    {
    }

    class TestChildModel : TestBaseClass
    {
        [ValidateComplexType]
        public TestGrandChildModel Child { get; set; }

        public TestChildModel()
        {
            Child = new TestGrandChildModel();
        }
    }

    class TestModel : TestBaseClass
    {
        public int Id { get; set; }

        [ValidateComplexType]
        public TestChildModel Child { get; set; }

        public TestModel()
        {
            Child = new TestChildModel();
        }
    }
}
````

### Fluent Validation

You can use third-party validation libraries that integrate with the standard `EditContext` such as <a href="https://fluentvalidation.net/" target="_blank">FluentValidation</a> together with the Telerik Form for Blazor.

>note Such third party tools are not included with the Telerik UI for Blazor package. Your project must reference their NuGet packages explicitly. The code snippet below will not run unless you install the an appropriate package first. You can find some in <a href="https://docs.fluentvalidation.net/en/latest/blazor.html" target="_blank">their official documentation</a>.

````CSHTML
@* Use FluentValidation to validate a model *@ 

@using Microsoft.AspNetCore.Components.Forms
@using FluentValidation

<div class="mt-4" style="margin: 0 auto;">
    <TelerikForm EditContext="@EditContext">
        <FormValidation>
            <FluentValidationValidator Validator="@Validator"></FluentValidationValidator>
        </FormValidation>
    </TelerikForm>
</div>

@code {
    public EditContext EditContext {get; set; }
    public Customer MyModel { get; set; } = new Customer();
    public CustomerValidator Validator { get; set; } = new CustomerValidator();

    protected override void OnInitialized()
    {
        EditContext = new EditContext(MyModel);
        base.OnInitialized();
    }

    public class Customer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(customer => customer.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(customer => customer.LastName).NotEmpty().MaximumLength(50);
        }
    }
}
````