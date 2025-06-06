---
title: Overview
page_title: Form Overview
description: Overview of the Form for Blazor.
slug: form-overview
tags: telerik,blazor,form,edit,form
published: True
position: 0
---

# Blazor Form Overview

The <a href = "https://demos.telerik.com/blazor-ui/form/overview" target="_blank">Form for Blazor</a> allows you to generate and customize a form based on your model. You can control the component through various [parameters](#form-parameters), use [default editors](#automatic-generation-of-fields) or [custom ones](slug:form-formitems), set the [orientation](slug:form-orientation) and organize the form fields in [groups](slug:form-formgroups) and [columns](slug:form-columns).


## Creating Blazor Form

1. Add the `TelerikForm` tag to a razor file.
1. Bind the Form to data by using only one of the following two options:
    * Set the Form `Model` parameter to an object.
    * Set the `EditContext` parameter to an [`EditContext` instance](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext). The object instance from which the `EditContext` is created is important, especially when using [FormItem templates](slug:form-formitems-template) and [validation messages](slug:form-validation).
1. (optional) To enable [form validation](slug:form-validation), add the `<FormValidation>` tag. Define a validator component inside, for example the [`DataAnnotationsValidator`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.dataannotationsvalidator) that is part of .NET Core.

<div class="skip-repl"></div>
````RAZOR Model
@* Provide a model to the Telerik Form *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@PersonModel">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
</TelerikForm>

@code {
    private Person PersonModel { get; set; } = new Person();

    public class Person
    {
        [Editable(false)]
        public int Id { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "The first name should be maximum 20 characters long")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = "The last name should be maximum 25 characters long")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        public DateTime? DOB { get; set; }
    }
}
````
````RAZOR EditContext
@* Provide an EditContext to the TelerikForm *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@PersonEditContext">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
</TelerikForm>

@code {
    private EditContext PersonEditContext { get; set; }

    private Person PersonModel = new Person();

    protected override void OnInitialized()
    {
        PersonEditContext = new EditContext(PersonModel);
    }

    public class Person
    {
        [Editable(false)]
        public int Id { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "The first name should be maximum 20 characters long")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(25, ErrorMessage = "The last name should be maximum 25 characters long")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        public DateTime? DOB { get; set; }
    }
}
````

## Form Items

There are three ways to generate fields in the Blazor Form:

* Allow the [Form to automatically generate items](#automatic-generation-of-fields). In this case, each editor component type will depend on the model property type.
* [Define `FormItems`](slug:form-formitems) manually. This allows more configuration flexibility and [changing the editor type](slug:form-formitems). You can also control when [changes in one Form item cause other Form items to re-render](slug:form-formitems#ui-rendering-inside-the-form).
* [Combine the above two options](slug:form-formitems#add-form-fields-to-autogenerated-ones).

### Automatic Generation of Fields

The Telerik Form can generate [editors](slug:form-formitems) for you based on the model fields. It can take them from both a `Model`, or the `EditContext`, whichever you provide to it. You can use [data annotation attributes](#data-annotation-attributes) to validate the field values and customize the auto-generated form fields, for example set labels, visibility and editability.

The following data types are supported out-of-the box and they use the following default editors:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Data Type | Default Editor |
|-----------|----------|
| `string`  | [Telerik TextBox](slug:components/textbox/overview) |
| `int`, `double`, `float`, `decimal`  | [Telerik NumericTextBox](slug:components/numerictextbox/overview) |
| `Enum`  | [Telerik DropDownList](slug:components/dropdownlist/overview) |
| `DateTime`  | [Telerik DatePicker](slug:components/datepicker/overview) |
| `bool`  | [Telerik CheckBox](slug:checkbox-overview) |


#### Customize the Automatically Generated Field Editors

You can customize the automatically generated field editors by providing the `EditorType` attribute, exposed on the `<FormItem>`, or by using the [FormItem Template](slug:form-formitems-template). The `EditorType` attribute accepts a member of the `FormEditorType` enum:

| Field data type | FormEditorType enum members              |
|-----------------|------------------------------------------|
| **String**          | `FormEditorType.TextArea`<br /> `FormEditorType.TextBox` |
| **Boolean**         | `FormEditorType.CheckBox`<br /> `FormEditorType.Switch` |
| **DateTime**        | `FormEditorType.DatePicker`<br /> `FormEditorType.DateTimePicker`<br> `FormEditorType.TimePicker` |


````RAZOR
@* The usage of the EditorType parameter *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.Id)" LabelText="Id"></FormItem>
        <FormItem Field="@nameof(Person.FirstName)"
                  EditorType="@FormEditorType.TextArea"
                  LabelText="First name">
        </FormItem>
        <FormItem Field="@nameof(Person.LastName)" 
                  EditorType="@FormEditorType.TextArea"
                  LabelText="Last name">
        </FormItem>
        <FormItem Field="@nameof(Person.DOB)"
                  EditorType="@FormEditorType.DateTimePicker"
                  LabelText="Date of birth">
        </FormItem>
    </FormItems>
</TelerikForm>

@code {
    public Person person = new Person();

    public class Person
    {
        public int Id { get; set; } = 10;
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public DateTime DOB { get; set; } = DateTime.Today.AddYears(-20);
    }
}
````

## Data Annotation Attributes

The Telerik Form for Blazor supports validation through the `<DataAnnotationsValidator />`. This allows you to take advantage of all validation attributes from the <a href="https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-5.0" target="_blank">data annotation attributes</a> list provided by .NET.

The Form also uses the the following attributes from the model:

* `[Display(Name = "Field Caption")]` - to get the title (caption) of the field name to render out as its label.

* `[Display(AutoGenerateField = false)]` - to skip a class member and *not* create a `FormItem` for it.

* `[Editable(false)]` - to render the built-in editor as disabled so the user cannot change its value.

You can customize the editors further through the [form items](slug:form-formitems). Explicit settings you provide through the parameters will take precedence over data annotation attributes.

## Form Parameters

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AutoComplete` | `string` | The [`autocomplete` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) of the `<form>` element. |
| `EditContext`  | `EditContext` | The [EditContext](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext) of the form. |
| `Id`  | `string` | The `id` attribute of the `<form>` element. You can use it together with the [`Form` parameter of a submit button](slug:button-type). Set both parameters to the same `string` value to submit the form from a button, which is outside the form. |
| `Model`  | `object` | The object bound to the Form. It will automatically create the `EditContext` and using both parameters together is not supported. |
| `ValidationMessageType`  | `FormValidationMessageType` enum <br /> (`Inline`) | The validation message UI. The other options are `Tooltip` and `None`. See the [Validation](slug:form-validation) article. |

### Form Layout Customization

The [Blazor Form](https://demos.telerik.com/blazor-ui/form/overview) exposes multiple parameters that allow you to customize its layout. Besides the parameters below, the Form component also allows you to [define a completely custom layout with HTML markup and Razor components](slug:form-formitems-formitemstemplate).

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `ButtonsLayout` | `FormButtonsLayout` enum <br /> (`Start`) | Determines the position and width of all Form buttons. See [Form Buttons](slug:form-formitems-buttons). |
| `Columns`  | `int` | Defines the number of columns in the Form. See the [Columns](slug:form-columns) article for more information |
| `ColumnSpacing`  | `string` | Defines the amout of horizontal space between the Columns. See the [Columns](slug:form-columns) article for more information. |
| `Orientation`  | `FormOrientation` enum <br /> (`Vertical`) | Determines the position of each label with regard to its editor. See [Orientation](slug:form-orientation) for more information. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the [Blazor Form](https://demos.telerik.com/blazor-ui/form/overview):

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | A custom CSS class for the `<form>` element. |
| `Size` | `string` | Determines the size and font size of the Form editors, and the spacing between them. |
| `Width`  | `string` | Controls the width of the Form in any [CSS length unit](slug:common-features/dimensions). |

You can find more information for customizing the Form appearance in the [Appearance article](slug:form-appearance).

## Form Reference and Methods

Use the Form reference to get access to its `EditContext`. The Form generates this object, no matter if the component uses a `Model` or an `EditContext` parameter. You can validate the `EditContext` manually or re-attach validation when you change the model - [`FormReference.EditContext.EnableDataAnnotationsValidation(IServiceProvider serviceProvider)`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontextdataannotationsextensions.enabledataannotationsvalidation?view=aspnetcore-8.0#microsoft-aspnetcore-components-forms-editcontextdataannotationsextensions-enabledataannotationsvalidation(microsoft-aspnetcore-components-forms-editcontext-system-iserviceprovider)).

The Form also exposes a `Refresh()` method that calls `StateHasChanged()` only for the component itself.

>caption Get the Form Reference and Validate the EditContext

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@TeamMate" @ref="@FormRef" Width="300px">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
</TelerikForm>

@code {
    private TelerikForm FormRef { get; set; }

    private Employee TeamMate { get; set; } = new();

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            FormRef?.EditContext.Validate();
        }

        base.OnAfterRender(firstRender);
    }

    public class Employee
    {
        [Display(AutoGenerateField = false)]
        public int Id { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "{0} should be at least {1} characters.")]
        public string Name { get; set; }
        [Required]
        public DateTime? BirthDate { get; set; }
    }
}
````

## Next Steps

* [Validate the Form](slug:form-validation)
* [Explore the Form events](slug:form-events)
* [Learn more about the Form Buttons](slug:form-formitems-buttons)
* [Group the FormItems](slug:form-formgroups)

## See Also

* [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
* [Form API Reference](slug:Telerik.Blazor.Components.TelerikForm)
