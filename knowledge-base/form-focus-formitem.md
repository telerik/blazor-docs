---
title: Set Programmatic Focus to a FormItem
description: How to set programmatic focus to an item in the Telerik Form.
type: how-to
page_title: How to set Programmatic Focus to a FormItem? How to set initial focus to a specific input in the TelerikForm?
slug: form-kb-focus-formitem
position: 
tags: telerik, blazor, ref
ticketid: 1592333
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Telerik UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to set initial focus to a specific input in the `TelerikForm`?

## Solution

The `<FormItem>` is an abstraction of the real editor that is rendered in the browser. To set programmatic focus you must:

1. Use a [`FormItem` `Template`](slug:form-formitems-template) to provide the desired editor.
1. Use the `FocusAsync()` method accessible through the `@ref` of the added editor.

>caption Set programmatic focus to the first FormItem

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@person">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
    </FormValidation>
    <FormItems>
        <FormItem>
            <Template>
                <label for="first-name-textbox">First name:</label>
                <TelerikTextBox @bind-Value="@person.FirstName"
                                @ref="@TextBoxReference"
                                Id="first-name-textbox">
                </TelerikTextBox>
                <TelerikValidationMessage For="(() => person.FirstName)"></TelerikValidationMessage>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Person.LastName)" LabelText="Last name" Hint="Enter your last name" ColSpan="2"></FormItem>
        <FormItem Field="@nameof(Person.DOB)" LabelText="Date of birth" Hint="Enter your Date of Birth"></FormItem>
    </FormItems>
</TelerikForm>

@code {
    private TelerikTextBox TextBoxReference { get; set; }

    private Person person = new Person();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await Task.Delay(20);

        await TextBoxReference.FocusAsync();
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

## Notes

* The **earliest reliable programmatic focus** can occur in `OnAfterRenderAsync` and with some delay. The reason is that `OnAfterRenderAsync` fires when the DOM tree is built, but **before** the HTML output is actually rendered in the browser. After the event is fired, the .NET runtime sends the HTML to the browser. The `FocusAsync` method relies on `JSInterop`, which in turn relies on the component to be rendered in the browser.
