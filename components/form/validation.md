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

````RAZOR
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

@[template](/_contentTemplates/common/form-validation.md#note-editcontext-formitem-template)

@[template](/_contentTemplates/common/form-validation.md#note-validation)

When you provide an `EditContext` to the form, you can use its [`EnableDataAnnotationsValidation(IServiceProvider serviceProvider)`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontextdataannotationsextensions.enabledataannotationsvalidation?view=aspnetcore-8.0#microsoft-aspnetcore-components-forms-editcontextdataannotationsextensions-enabledataannotationsvalidation(microsoft-aspnetcore-components-forms-editcontext-system-iserviceprovider)) method to add the data annotation validation instead of using the markup. This is useful in the following cases:
* When the model the form is bound to changes at runtime. For example, when you [have a reset button](slug:form-formitems-buttons#how-to-add-a-reset-clear-button-to-the-form).
* When you need to re-attach the validation after changing the `Model`. In this case you need to use the [reference to the Form component](slug:form-overview#form-reference-and-methods)&mdash;`TheFormReference.EditContext.EnableDataAnnotationsValidation(IServiceProvider serviceProvider)`.

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## Validation Message Type

With the `ValidationMessageType` parameter of the Telerik Form for Blazor you can customize the way the validation messages are presented to the user. This setting accepts a member of the `FormValidationMessageType` enum:

* `Tooltip` - validation messages will show up in a tooltip pointing to the invalid input.
* `Inline` - the standard display of messages in text after the input. This is the default value.
* `None` - no validation messages will be rendered. The user will be notified that certain field is incorrect by a red border around the associated editor. 

>caption Change the type of the validation message to tooltip

````RAZOR
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

It is also possible to [trigger Form validation programmatically](slug:form-overview#form-reference-and-methods) or [use custom DataAnnotations validation](slug:validation-kb-custom-dataannotations-validator).

### Validate a Model

You can use the built-in `DataAnnotationsValidator` that comes with the Blazor framework.

````RAZOR
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

You can use the <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation?view=aspnetcore-8.0#nested-models-collection-types-and-complex-types" target="_blank">ObjectGraphDataAnnotationsValidator</a> inside the Telerik Form for Blazor to validate a nested model.

When using a model with nested objects and fields, specify their `Field` settings as a dot-separate string, do *not* use the `nameof` operator, it does not return the full name of the model.

````RAZOR.skip-repl
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

You can use third-party validation libraries that integrate with the standard `EditContext` such as [FluentValidation](https://fluentvalidation.net/) together with the Telerik Form for Blazor.

The example below:

* Requires the [`Blazored.FluentValidation` NuGet package](https://www.nuget.org/packages/Blazored.FluentValidation). Also refer to the [FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/blazor.html).
* Shows how to pass `ValueExpression` from a parent component to optional custom child components in a [Form item template](slug:form-formitems-template) or a [Grid editor template](slug:grid-templates-editor). If the `ValueExpression` is not passed correctly, the app will throw [exception similar to: `Cannot validate instances of type 'ComponentName'. This validator can only validate instances of type 'ModelClassName'`](slug:form-kb-fluent-validation-cannot-validate-instances-of-type).

>caption Using FluentValidation

````RAZOR Home.razor
@using Blazored.FluentValidation
@using FluentValidation

<TelerikForm Model="@PersonToEdit"
             OnValidSubmit="@OnFormValidSubmit">
    <FormValidation>
        <FluentValidationValidator Validator="@PersonFluentValidator" />
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.Id)" Enabled="false" LabelText="ID" />
        <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name" />
        <FormItem Field="@nameof(Person.MiddleName)">
            <Template>
                <label for="person-middlename" class="k-label k-form-label">Middle Name (two-way binding)</label>
                <div class="k-form-field-wrap">
                    <TextBox @bind-Value="@PersonToEdit.MiddleName"
                             Id="person-middlename" />
                    <TelerikValidationMessage For="@( () => PersonToEdit.MiddleName )" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.LastName)">
            <Template>
                <label for="person-lastname" class="k-label k-form-label">Last Name (one-way binding with explicit ValueExpression)</label>
                <div class="k-form-field-wrap">
                    <TextBox Value="@PersonToEdit.LastName"
                             ValueChanged="@LastNameChanged"
                             ValueExpression="@( () => PersonToEdit.LastName )"
                             Id="person-lastname" />
                    <TelerikValidationMessage For="@( () => PersonToEdit.LastName )" />
                </div>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

<p style="color:var(--kendo-color-success)"><strong>@FormSubmitResult</strong></p>

@code {
    private Person PersonToEdit { get; set; } = new();

    public PersonValidator PersonFluentValidator { get; set; } = new();

    private string FormSubmitResult { get; set; } = string.Empty;

    private void LastNameChanged(string newLastName)
    {
        PersonToEdit.LastName = newLastName;
    }

    private void OnFormValidSubmit()
    {
        FormSubmitResult = $"Form Submit Success at {DateTime.Now.ToString("HH:mm:ss")}";
    }

    public class PersonValidator : AbstractValidator<Person>
    {
        public PersonValidator()
        {
            RuleFor(customer => customer.FirstName).NotEmpty().MinimumLength(2).MaximumLength(60);
            RuleFor(customer => customer.MiddleName).NotEmpty().MaximumLength(60);
            RuleFor(customer => customer.LastName).NotEmpty().MinimumLength(2).MaximumLength(60);
        }
    }

    public class Person
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string MiddleName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;
    }
}
````
````RAZOR TextBox.razor
@using System.Linq.Expressions

<TelerikTextBox Value="@Value"
                ValueChanged="@ValueChanged"
                ValueExpression="@ValueExpression"
                Id="@Id" />

@code {
    [Parameter]
    public string Value { get; set; } = string.Empty;

    [Parameter]
    public EventCallback<string> ValueChanged { get; set; }

    [Parameter]
    public Expression<System.Func<string>>? ValueExpression { get; set; }

    [Parameter]
    public string Id { get; set; } = string.Empty;

    private async Task TextBoxValueChanged(string newValue)
    {
        Value = newValue;

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(newValue);
        }
    }
}
````

## See Also

* [Custom Form `DataAnnotations` Validation](slug:validation-kb-custom-dataannotations-validator)
* [Conditional Form Validation Options](slug:form-kb-conditional-validation)
