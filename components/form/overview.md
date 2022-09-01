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

The <a href = "https://www.telerik.com/blazor-ui/form" target="_blank">Form for Blazor</a> allows you to generate a form based on your model and to manage customized forms. You can control the component through various parameters, achieve the desired layout by using the [default editor](#automatic-generation-of-fields) or add [custom ones]({%slug form-formitems%}), set the [orientation]({%slug form-orientation%}) and organize those editors in [groups]({%slug form-formgroups%}) and [columns]({%slug form-columns%}). 


## Creating Blazor Form Bound to a Model

To use the Form component with a model: 

1. Use the `TelerikForm` tag to add the component to your razor page.

1. Provide an object to the `Model` parameter of the component or an <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext?view=aspnetcore-5.0">EditContext class</a> to the `EditContext` parameter. 

1. Use the `<FormValidation>` tag and in it, provide a validator - like the `DataAnnotationsValidator` that comes with the framework, to enable form validation. 

<div class="skip-repl"></div>
````Model
@* Provide a model to the Telerik Form *@

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
````EditContext
@* Provide an EditContext to the TelerikForm *@

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@MyEditContext">
    <FormValidation>
        <DataAnnotationsValidator />
    </FormValidation>
</TelerikForm>

@code {
    public EditContext MyEditContext { get; set; }

    public Person person = new Person();

    protected override void OnInitialized()
    {
        MyEditContext = new EditContext(person);
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

## Building Blocks

### Form Items

There are two ways to generate fields in the Blazor Form:

* By manually defining [FormItems]({%slug form-formitems%}).
* Allowing the Form to [automatically generate them](#automatic-generation-of-field).

The Form Items allow you customize the [default editors](#automatic-generation-of-field). [See the [FormItems article for more information...]({%slug form-formitems%}).

### Automatic Generation of fields

The Telerik Form can generate [editors]({%slug form-formitems%}) for you based on the model fields. It can take them from both a `Model`, or the `EditContext`, whichever you provide to it. You can use the [data annotation attributes](#data-annotation-attributes) to validate the value of the fields.

The following data types are supported out-of-the box and they use the following default editors:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Data Type | Default Editor |
|-----------|----------|
| `string`  | [Telerik TextBox]({%slug components/textbox/overview%}) |
| `int`, `double`, `float`, `decimal`  | [Telerik NumericTextBox]({%slug components/numerictextbox/overview%}) |
| `Enum`  | [Telerik DropDownList]({%slug components/dropdownlist/overview%}) |
| `DateTime`  | [Telerik DatePicker]({%slug components/datepicker/overview%}) |
| `bool`  | [Telerik CheckBox]({%slug checkbox-overview%}) |


#### Customize the Automatically Generated Fields

You can customize the automatically generated field by providing the `EditorType` attribute, exposed on the `<FormItem>`, or by using the [FormItem Template]({%slug form-formitems-template%}). The `EditorType` attribute accepts a member of the `FormEditorType` enum:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Field data type | FormEditorType enum members              |
|-----------------|------------------------------------------|
| **String**          | `FormEditorType.TextArea`<br> `FormEditorType.TextBox` |
| **Boolean**         | `FormEditorType.CheckBox`<br> `FormEditorType.Switch` |
| **DateTime**        | `FormEditorType.DatePicker`<br> `FormEditorType.DateTimePicker`<br> `FormEditorType.TimePicker` |


````CSHTML
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

### Data Annotation Attributes

The Telerik Form for Blazor supports validation through the `<DataAnnotationsValidator />`. This allows you to take advantage of all validation attributes from the <a href="https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-5.0" target="_blank">data annotation attributes</a> list provided by .NET.

The Form also uses the the following attributes from the model:

* `[Display(Name="Field Caption")]` - to get the title (caption) of the field name to render out as its label. 

* `[Editable(false)]` - to render the built-in editor as disabled so the user cannot change its value.

You can customize the editors further through the [form items]({%slug form-formitems%}). Explicit settings you provide through the parameters will take precedence over data annotation attributes.

### Form Buttons

The Form Buttons allow you to add custom buttons to the Form. You can use the `FormButtons` tag to add a Clear button to the Form. If the `FormButtons` tag is defined there will be no default buttons in the Form. [See the FormButtons article for more information...]({%slug form-formitems-buttons%})

### Form Groups

You can group Form items that are logically connected. [See the FormGroupsarticle for more information...]({%slug form-formgroups%})

### Form Events

You can react to user interactions with the Form through the available events. [See the Events article for more information...]({%slug form-events%})

### Form Validation

To validate and provide validation configuration to the Telerik Blazor Form you can use the `FormValidation` tag. [See the Validation article for more information...]({%slug form-validation%})

## Form Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Model`  | `object` | The object bound to the Form. It will automatically create the `EditContext` and using the two together is not supported. |
| `EditContext`  | `EditContext` | The <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext?view=aspnetcore-5.0" target="_blank">EditContext</a> of the form. |
| `ValidationMessageType`  | `FormValidationMessageType` enum <br /> (`Inline`) | Defines the type of the Validation messages. See the [Validation]({%slug form-validation%}) article for more information. |
| `Id`  | `string` | Sets an `id` attribute to the `<form>` element. It is possible to use it together with the [`Form` parameter of a submit button]({%slug button-type%}). Set both parameters to the same `string` value. This allows submitting the form from a button, which is outside the form. |

## Form Layout Customization

The Blazor Form exposes multiple parameters that allow you to customize its layout:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Width`  | `string` | Controls the width of the Form. |
| `Columns`  | `int` | Defines the number of columns in the Form. See the [Columns]({%slug form-columns%}) article for more information |
| `ColumnSpacing`  | `string` | Defines the amout of vertical space between the Columns. See the [Columns]({%slug form-columns%}) article for more information. |
| `Orientation`  | `FormOrientation` enum <br /> (`Vertical`) | controls the orientation of the Form. See the [Orientation]({%slug form-orientation%}) article for more information. |

## Component Reference

The component reference provides you with access to the `EditContext` object that the form will generate when you pass a `Model` to it. It could be useful to, for example, re-attach validation when you change the model - `FormReference.EditContext.AddDataAnnotationsValidation()`.

>caption Get a reference to the Telerik Form for Blazor 

````CSHTML
@* Get a reference to the Form component *@

<TelerikForm Model="@person" @ref="@FormReference">
</TelerikForm>

@code {
    public Telerik.Blazor.Components.TelerikForm FormReference { get; set; }

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

## See Also

* [Form Items]({%slug form-formitems%})
* [Form Groups]({%slug form-formgroups%})
* [Columns]({%slug form-columns%})
* [Orientation]({%slug form-orientation%})
* [Events]({%slug form-events%})
* [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
* [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikForm)
