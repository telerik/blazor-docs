---
title: Validation
page_title: Form for Blazor - Validation
description: Form for Blazor - Validation.
slug: form-validation
tags: telerik,blazor,form,edit,form,validation
published: True
position: 5
components: ["form"]
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

To enable validation in the Telerik Form for Blazor, add the `<FormValidation>` tag inside the `<TelerikForm>`. The `<FormValidation>` provides validation configuration such as a validator (for example, `<DataAnnotationsValidator>`) and validation message UI like the [`<TelerikValidationSummary>`](slug:validation-tools-summary).

>caption Enable validation in the Telerik Form for Blazor

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@FormModel">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary />
    </FormValidation>
</TelerikForm>

@code {
    private Person FormModel { get; set; } = new Person();

    public class Person
    {
        [Required]
        [MaxLength(20, ErrorMessage ="The First Name cannot exceed 20 characters")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = "The Last Name cannot exceed 25 characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The Birth Date is required")]
        public DateTime? BirthDate { get; set; }

        [Range(30, 250, ErrorMessage ="The Height must be between 30 and 250 cm")]
        public int Height { get; set; }
    }
}
````

@[template](/_contentTemplates/common/form-validation.md#note-editcontext-formitem-template)

@[template](/_contentTemplates/common/form-validation.md#note-validation)

When you provide an `EditContext` to the form, you can use its [`EnableDataAnnotationsValidation(IServiceProvider serviceProvider)`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontextdataannotationsextensions.enabledataannotationsvalidation?view=aspnetcore-8.0#microsoft-aspnetcore-components-forms-editcontextdataannotationsextensions-enabledataannotationsvalidation(microsoft-aspnetcore-components-forms-editcontext-system-iserviceprovider)) method to add the data annotation validation instead of using the markup. This is useful in the following cases:

* When the Form `Model` changes at runtime. For example, when you [have a reset button](slug:form-formitems-buttons#how-to-add-a-reset-clear-button-to-the-form).
* When you need to re-attach the validation after changing the `Model`. In this case you need to use the [Form component reference](slug:form-overview#form-reference-and-methods)&mdash;`FormRef.EditContext.EnableDataAnnotationsValidation(IServiceProvider serviceProvider)`.

Telerik Blazor input components automatically display an invalid state when their value does not match the Form validation rules. This behavior depends on the input's `ValueExpression`. See how to [set the `ValueExpression` correctly when the input is nested in a child component of the Form](slug:inputs-kb-validate-child-component).

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## Validation Message Type

With the `ValidationMessageType` parameter of the Telerik Form for Blazor you can customize the way the validation messages are presented to the user. This setting accepts a member of the `FormValidationMessageType` enum:

* `Tooltip` - validation messages will show up in a tooltip pointing to the invalid input.
* `Inline` - the standard display of messages in text after the input. This is the default value.
* `None` - no validation messages will be rendered. The user will be notified that certain field is incorrect by a red border around the associated editor. 

>caption Display validation messages in tooltips

````RAZOR.skip-repl
<TelerikForm ValidationMessageType="@FormValidationMessageType.Tooltip" />
````

## Examples

This section discusses the following validation scenarios:

* [Fluent Validation](#fluent-validation)
* [Validate Nested Properties or Collections](#validate-a-nested-property-or-collection)

Also check the following pages for information on how to:

* [Trigger Form validation programmatically](slug:form-overview#form-reference-and-methods)
* [Use custom DataAnnotations validation](slug:validation-kb-custom-dataannotations-validator)
* [Apply invalid state to an editor that is inside a child component](slug:inputs-kb-validate-child-component)

### Fluent Validation

You can use third-party validation libraries that integrate with the standard `EditContext` such as [FluentValidation](https://fluentvalidation.net/) together with the Telerik Form for Blazor.

The example below:

* Requires the [`Blazilla` NuGet package](https://www.nuget.org/packages/Blazilla). Also refer to the [FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/blazor.html).
* Shows how to pass `ValueExpression` from a parent component to optional custom child components in a [Form item template](slug:form-formitems-template) or a [Grid editor template](slug:grid-templates-editor). If the `ValueExpression` is not passed correctly, the app will throw [exception similar to: `Cannot validate instances of type 'ComponentName'. This validator can only validate instances of type 'ModelClassName'`](slug:form-kb-fluent-validation-cannot-validate-instances-of-type).

@[template](/_contentTemplates/common/form-validation.md#note-fluentvalidation)

>caption Using FluentValidation

````RAZOR Home.razor
@using Blazilla
@using FluentValidation

<TelerikForm Model="@PersonToEdit"
             OnValidSubmit="@OnFormValidSubmit">
    <FormValidation>
        <FluentValidator Validator="@PersonFluentValidator" />
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

### Validate Nested Properties or Collections

Refer to the [Microsoft documentation about validating nested objects and collection types](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation).

When using a model with nested objects and properties, [specify their `Field` settings as dot-separate strings](slug:grid-use-navigation-properties). Do not use a single `nameof()` operator, because it does not return the full name of the nested property.

The example below demonstrates how to validate a nested property `Product.Category.Id` and a collection `Product.Ingredients`. The sample code assumes that:

* The project name and root namespace is `TelerikBlazorApp`.
* The model classes belong to the `TelerikBlazorApp.Data` namespace.

<div class="skip-repl">

````RAZOR Home.razor
<TelerikForm Model="@ProductModel"
             Orientation="@FormOrientation.Horizontal"
             Width="480px">
    <FormValidation>
        <DataAnnotationsValidator />
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Product.Name)" LabelText="Product Name"></FormItem>
        <FormItem Field="@($"{nameof(Product.Category)}.{nameof(Category.Id)}")" LabelText="Category">
            <Template>
                <label for="category" class="k-label k-form-label">Category</label>
                <div class="k-form-field-wrap">
                    <TelerikDropDownList @bind-Value="@ProductModel.Category.Id"
                                         DefaultText="Select Category"
                                         Data="@Categories"
                                         TextField="@nameof(Category.Name)"
                                         ValueField="@nameof(Category.Id)"
                                         Id="category">
                        <DropDownListSettings>
                            <DropDownListPopupSettings Height="auto" />
                        </DropDownListSettings>
                    </TelerikDropDownList>
                    <TelerikValidationMessage For="@(() => ProductModel.Category.Id)" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Product.ReleaseDate)" LabelText="Release Date"></FormItem>
        <FormItem Field="@nameof(Product.Ingredients)">
            <Template>
                <label class="k-label k-form-label ingredients-label">Ingredients</label>
                <div class="k-form-field-wrap ingredients-wrap">
                    <div class="ingredients">
                        <TelerikValidationMessage For="@(() => ProductModel.Ingredients)" />
                        @foreach (Ingredient ingredient in ProductModel.Ingredients ?? new List<Ingredient>())
                        {
                            <div>
                                <div class="ingredient">
                                    <label>Name</label>
                                    <TelerikTextBox @bind-Value="@ingredient.Name" />
                                    <TelerikButton Icon="@SvgIcon.Trash"
                                                OnClick="@(() => OnRemoveIngredient(ingredient))" />
                                </div>
                                <div>
                                    <TelerikValidationMessage For="@(() => ingredient.Name)" />
                                </div>
                            </div>
                        }
                        <div class="add-ingredient">
                            <TelerikButton Icon="@SvgIcon.Plus"
                                           OnClick="@OnAddIngredient">
                                Add Ingredient
                            </TelerikButton>
                        </div>
                    </div>
                </div>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

<style>
    .ingredients-label {
        margin-top: var(--kendo-spacing-3\.5);
    }

    .ingredients-wrap {
        border: 1px solid var(--kendo-color-border);
        padding: 1em;
        border-radius: var(--kendo-border-radius-md);
    }

    .ingredients {
        display: flex;
        flex-direction: column;
        gap: var(--kendo-spacing-4);
    }

    .ingredient {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-bottom: var(--kendo-spacing-4);
    }

    .ingredient > label {
        flex: 1 1 40%;
    }

    .ingredient + .add-ingredient {
        margin-top: var(--kendo-spacing-4);
    }

    div.ingredient:has(.k-invalid) label {
        color: var(--kendo-color-error-on-surface);
    }
</style>

@code {
    private Product ProductModel { get; set; } = new();
    private readonly Category[] Categories = new Category[]
    {
        new Category { Id = 1, Name = "First Category" },
        new Category { Id = 2, Name = "Second Category" },
        new Category { Id = 3, Name = "Third Category" }
    };

    private void OnAddIngredient()
    {
        ProductModel.Ingredients ??= new List<Ingredient>();
        ProductModel.Ingredients.Add(new Ingredient());
    }

    private void OnRemoveIngredient(Ingredient ingredient)
    {
        ProductModel.Ingredients?.Remove(ingredient);

        if (ProductModel.Ingredients?.Count == 0)
        {
            ProductModel.Ingredients = default;
        }
    }
}
````
````C# Program.cs
builder.Services.AddValidation();
````
````C# Category.cs
using System.ComponentModel.DataAnnotations;

namespace TelerikBlazorApp.Data;

public class Category
{
    [Required(ErrorMessage = "Category is required.")]
    public int? Id { get; set; }

    public string Name { get; set; } = string.Empty;
}
````
````C# Product.cs
using System.ComponentModel.DataAnnotations;

namespace TelerikBlazorApp.Data;

[ValidatableType]
public class Product
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required(ErrorMessage = "Product Name is required.")]
    public string Name { get; set; } = string.Empty;

    public Category Category { get; set; } = new Category();

    [Required(ErrorMessage = "Release Date is required.")]
    public DateTime? ReleaseDate { get; set; }

    [Required(ErrorMessage = "At least one ingredient is required.")]
    public List<Ingredient>? Ingredients { get; set; }
}
````
````C# Ingredient.cs
using System.ComponentModel.DataAnnotations;

namespace TelerikBlazorApp.Data;

public class Ingredient
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required(ErrorMessage = "Ingredient Name is required.")]
    public string Name { get; set; } = string.Empty;
}
````

## See Also

* [Custom Form `DataAnnotations` Validation](slug:validation-kb-custom-dataannotations-validator)
* [Conditional Form Validation Options](slug:form-kb-conditional-validation)
* [Display Invalid State in Child Component](slug:inputs-kb-validate-child-component)
