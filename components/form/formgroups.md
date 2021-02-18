---
title: FormGroups
page_title: Form for Blazor - FormGroups
description: Form for Blazor - FormGroups.
slug: form-formgroups
tags: telerik,blazor,form,edit,formgroups,groups
published: True
position: 25
---

# FormGroups

You can group some associated fields in your form (model) by using the [FormItems]({%slug form-formitems%}). and putting them inside `FormGroup` tags.

In this article:

* [Features](#features)
* [Example - Organize FormItems into Groups](#example---organize-formitems-into-groups)

## Features

The `FormGroup` tag exposes the following parameters:

* `LabelText` - `string` - defines a label for the entire group. 

* `Columns` - `int` - defines the number of columns in the group.

* `ColumnSpacing` - `string` - defines the space between the editors in the group. 

## Example - Organize FormItems into Groups

You can organize some FormItems into logical groups. You can configure the label of the group, the number of columns and the spacing between the items.

>caption The result from the code snippet below

![FormItem example](images/formgroups-example.png)

````CSHTML
@* Organize items into groups *@

@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person" Columns="2" ColumnSpacing="25px">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormGroup LabelText="Personal Information" Columns="2" ColumnSpacing="15px">
            <FormItem LabelText="First Name" Field="@nameof(Person.FirstName)"></FormItem>
            <FormItem LabelText="Last Name" Field="@nameof(Person.LastName)"></FormItem>
            <FormItem LabelText="Age" Field="@nameof(Person.Age)"></FormItem>
            <FormItem LabelText="Email" Field="@nameof(Person.Email)"></FormItem>
        </FormGroup>
        <FormGroup LabelText="Employee Information" ColumnSpacing="25px">
            <FormItem LabelText="Company Name" Field="@nameof(Person.CompanyName)"></FormItem>
            <FormItem LabelText="Position" Field="@nameof(Person.Position)"></FormItem>
        </FormGroup>
    </FormItems>
</TelerikForm>

@code {
    public Person person { get; set; } = new Person();

    public class Person
    {
        [Required(ErrorMessage = "The First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "The Last name is required")]
        public string LastName { get; set; }
        [Range(18, 120, ErrorMessage = "The age should be between 18 and 120")]
        public int Age { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Enter a valid email")]
        public string Email { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [MaxLength(25, ErrorMessage = "The position can be maximum 25 characters long")]
        public string Position { get; set; }
    }
}
````



## See Also

  * [Overview]({%slug form-overview%})
  * [FormItems]({%slug form-formitems%})
  * [Template]({%slug form-formitems-template%})
  * [Orientation]({%slug form-orientation%})
  * [Events]({%slug form-events%})
   
   
