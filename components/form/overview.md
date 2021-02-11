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

The Form component for Blazor allows you to generate and manage forms. You can customize the form through various parameters, achieve the desired layout by using the default editor or add custom, set the orientation and display those editors in groups and columns. 

#### To use the Telerik Form for Blazor:

1. Add the `<TelerikForm>` tag.
1. Provide either an object to the `Model` parameter or an object of type `EditContext` to the `EditContext` parameter.

````Model
@* Provide a model to the Telerik Form *@

<TelerikForm Model="@person">
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
````EditContext
@* Provide an EditContext to the TelerikForm *@

<TelerikForm EditContext="@MyEditContext">
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
        public int Id { get; set; } = 10;
        public string FirstName { get; set; } = "John";
        public string LastName { get; set; } = "Doe";
        public DateTime DOB { get; set; } = DateTime.Today.AddYears(-20);
    }
}
````

>caption The result from the code snippet above

![Form Basic Example](images/form-basic-example.png)


## Component Reference

You can use the component reference to call its [Methods](#methods).


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

When the Telerik Form for Blazor is bound to a `model` or an `EditContext` and not editors are defined in the markup the component will render them automatically. For the different data types the editors vary:

* `string` - [Telerik TextBox]({%slug components/textbox/overview%})

* `int`, `double`, `float`, `decimal` - [Telerik NumericTextBox]({%slug components/numerictextbox/overview%})

* `Enum` - [Telerik DropDownList]({%slug components/dropdownlist/overview%})

* `DateTime`, `DateTimeOffset` - [Telerik DatePicker]({%slug components/datepicker/overview%})

* `bool` - [Telerik CheckBox]({%slug checkbox-overview%})

## Features

* `ValidationType` - `enum` - define the validation type for the From. Read the [Validation]({%slug form-validation%}) article for more information.

* `FormItems` - `RenderFragment` - read the [FormItems]({%slug form-formitems%}) article for more information.

* `FormGroups` - Groups the FormItems. Read the [FormGroups]({%slug form-formgroups}) article for more information.

* `Orientation` - `enum` - controls the orientation of the Form. Read the [Layout]({%slug form-layout%}) article for more information.
    
* `Columns` - `int` - defines the number of columns in the Form. Read the [Columns]({%slug form-columns%}) article for more information.

* `ColumnSpacing` - `string` - defines the space between the FormItems. Read the [Columns]({%slug form-columns%}) article for more information.

* `Events` - Read the [Events]({%slug form-events%}) article for more information

## Methods

The Form [reference](#component-reference) exposes the `Refresh` method which allows you to programatically re-render the form. 


>caption Alter a value in the bound model from outside the Form

````CSHTML
@* This snippet shows how to re-render the Form using the Refresh method when the model is updates from outside. *@

<TelerikButton OnClick="@ChangeTheFirstName">Change the First Name</TelerikButton>

<TelerikForm Model="@person" @ref="@FormReference">
</TelerikForm>

@code {
    public Telerik.Blazor.Components.TelerikForm FormReference { get; set; }

    public Person person = new Person();

    private void ChangeTheFirstName()
    {
        person.FirstName = "My Name";

        FormReference.Refresh();
    }

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
  
  * [FormItems]({%slug form-formitems%})
  * [FormGroups]({%slug form-formgroups%})
  * [Columns]({%slug form-columns%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
  * [Live Demo: Form](https://demos.telerik.com/blazor-ui/form/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikForm)
   
