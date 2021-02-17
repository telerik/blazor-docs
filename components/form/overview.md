---
title: Overview
page_title: Form Overview
description: Overview of the Form for Blazor.
slug: form-overview
tags: telerik,blazor,form,edit,form
published: True
position: 0
---

# Form Overview

The Form for Blazor allows you to generate and manage forms. You can customize the component through various parameters, achieve the desired layout by using the default editor or add custom ones, set the orientation and organize those editors in groups and columns. 

>note The Form component is based on the underlying implementation and core properties of the <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">CSS Grid Layout</a> so we recommend that you get familiar with the concept first.

#### To use the Telerik Form for Blazor:

1. Add the `<TelerikForm>` tag.
1. Provide either an object to the `Model` parameter or an object of type `EditContext` to the `EditContext` parameter.

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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime? DOB { get; set; }
    }
}
````

>caption The result from the code snippet above

![Form Basic Example](images/form-basic-example.png)


## Component Reference

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

## Automatic Generation of fields

When the Telerik Form for Blazor is bound to a `model` or an `EditContext` and no editors are defined in the markup the component will render them automatically. For the different data types the default editors would be:

* `string` - [Telerik TextBox]({%slug components/textbox/overview%})

* `int`, `double`, `float`, `decimal` - [Telerik NumericTextBox]({%slug components/numerictextbox/overview%})

* `Enum` - [Telerik DropDownList]({%slug components/dropdownlist/overview%})

* `DateTime` - [Telerik DatePicker]({%slug components/datepicker/overview%})

* `bool` - [Telerik CheckBox]({%slug checkbox-overview%})

## Features

* `Model` - `object` - the object bound to the form. It will automatically create the `EditContext` and using the two together is not supported.

* `EditContext` - `EditContext` - the <a href="https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext?view=aspnetcore-5.0" target="_blank">EditContext</a> of the form.

* `ValidationMessageType` - `enum` - define the validation message type for the Form. Read the [Validation]({%slug form-validation%}) article for more information.

* `FormItems` - `RenderFragment` - read the [FormItems]({%slug form-formitems%}) article for more information.

* `FormButtons` - `RenderFragment` - add custom buttons to the Form. You can use the `FormButtons` tag to [add a Clear button to the Form]({%slug form-formitems%}#add-a-clear-button). If the `FormButtons` tag is defined there will be no default buttons in the Form. 

* `FormGroups` - Groups the FormItems. Read the [FormGroups]({%slug form-formgroups%}) article for more information.

* `Orientation` - `enum` - controls the orientation of the Form. Read the [Orientation]({%slug form-orientation%}) article for more information.
    
* `Columns` - `int` - defines the number of columns in the Form. Read the [Columns]({%slug form-columns%}) article for more information.

* `ColumnSpacing` - `string` - defines the space between the FormItems. Read the [Columns]({%slug form-columns%}) article for more information.

* `Events` - Read the [Events]({%slug form-events%}) article for more information


## See Also
  
  * [FormItems]({%slug form-formitems%})
  * [FormGroups]({%slug form-formgroups%})
  * [Columns]({%slug form-columns%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
  * [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikForm)
   
