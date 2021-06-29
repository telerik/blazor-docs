---
title: Overview
page_title: Overview - FromItems
description: Overview of the FormItems.
slug: form-formitems
tags: telerik,blazor,form,edit,formitems
published: True
position: 0
---

# Form Items Overview

You can customize the [default editors]({%slug form-overview%}#automatic-generation-of-fields) by using instances of the `FormItem` tag. Those instances should be in the `FormItems` collection.

In this article:

* [Basics](#basics)
* [Example - Customize the appearance of the editors in the Form](#customize-the-appearance-of-the-editors-in-the-form)

## Basics

Each custom editor is expressed through the `FormItem` tag. You can define a collection of those editors in the `FormItems` tag that is a child of the `TelerikForm` tag. You can find some [code examples](#examples) below.

The `FormItem` tag exposes the following parameters which you can use to customize the editors:

* `LabelText` - `string` - defines the label for the associated editor. This parameter provides more compact syntax for the `<label for="myEditorId">` HTML tag. 

* `Id` - `string` - maps to the `id` HTML attribute of the `<input>` tag.

* `Hint` - `string` - defines a hint for the user on the place of the validation message. If a validation error occurs the hint will be replaced by the corresponding validation message.

* `Enabled` - `bool` - whether the editor is enabled. Defaults to `true`. If it is not specifically defined in the `FormItem` markup, it will take its value from the `[Editable]` data annotation attribute of the item.

* `Field` - `string` - the name of the field in the model that the editor will render for as a string (case-sensitive). You can set its as a plain string (`Field="SomeField"`) or to have .NET extract the field name from the model for flat models (`Field=@nameof(MyModelClass.SomeFIeld)`). If you are using its [Template]({%slug form-formitems-template%}) to provide a custom editor, the `Field` parameter is not required.

* `FieldType` - `string` - the data type of the `Field`. This parameter should be provided if the type of the property in the model can not be extracted using reflection, for example it is an `object` and you would like to render a `NumericTextBox`. 

* `ColSpan` - `int` - defines the `colspan` attribute. This parameter is applicable when the FormItems are divided in multiple columns in a single group. See the [FormGroups]({%slug form-formgroups%}) article for an example.

* `Class` - `string` - adds a custom CSS class to the `k-form-field` div tag.

* `Template` - `RenderFragment` - allows you to change the [default editor]({%slug form-overview%}#automatic-generation-of-fields) altogether. For more information see the [Template]({%slug form-formitems-template%}) article.



### Customize the appearance of the editors in the Form

````CSHTML
@* Provide a hint and change the Label of the editors *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.Id)" Enabled="false" LabelText="Id"></FormItem>
        <FormItem Field="@nameof(Person.FirstName)" LabelText="First name" Hint="Enter your first name"></FormItem>
        <FormItem Field="@nameof(Person.LastName)" LabelText="Last name" Hint="Enter your last name" ColSpan="2"></FormItem>
        <FormItem Field="@nameof(Person.DOB)" LabelText="Date of birth" Hint="Enter your Date of Birth"></FormItem>
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

>caption The result from the code snippet above

![FormItem example](images/formitem-example.png)




## See Also

  * [Overview]({%slug form-overview%})
  * [Template]({%slug form-formitems-template%})
  * [FormGroups]({%slug form-formgroups%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
