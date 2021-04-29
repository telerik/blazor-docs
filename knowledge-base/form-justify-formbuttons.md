---
title: Justify the FormButtons to the right side of the Form
description: Justify the FormButtons to the right side of the Form
type: how-to
page_title: Justify the FormButtons to the right side of the Form
slug: form-justify-formbuttons
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Form for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I am using the Telerik Form for Blazor and I would like to justify the [FormButtons]({%slug form-formitems-buttons%}) to the right side of the Form.

## Solution

You can customize the appearance of the Telerik Form by using CSS. To justify the FormButtons in a single instance of the Telerik Form you can take advantage of the `Class` parameter that the component provides and cascade the necessary CSS rules to the FormButton HTML element. The example below showcases a sample implementation that you can use as a base in your application.

````CSHTML
@* Justify the FormButtons to the right side of the Form via CSS *@

<style>
    .my-form.k-form .k-form-buttons{
        justify-content: flex-end;
    }
</style>

@using System.ComponentModel.DataAnnotations

<TelerikForm EditContext="@theEditContext" OnValidSubmit="@OnValidSubmitHandler" Width="200px" Class="my-form">

    <FormButtons>
        <TelerikButton ButtonType="@ButtonType.Submit" Primary="true">Submit</TelerikButton>
        <TelerikButton ButtonType="ButtonType.Button" OnClick="@ClearButton">Clear</TelerikButton>
    </FormButtons>

</TelerikForm>

@code {
    private void ClearButton()
    {
        person = new Person();
        CreatedEditContext(person);
    }

    void CreatedEditContext(Person model)
    {
        theEditContext = new EditContext(model);

        // we add the validation like this instead of in the markup
        // because changing the model and context does not otherwise attach the validator
        // and using the Clear button to new-up the model will leave you without validation
        theEditContext.AddDataAnnotationsValidation();
    }

    Person person { get; set; } = new Person();
    EditContext theEditContext { get; set; }

    protected override async Task OnInitializedAsync()
    {
        person = new Person()
        {
            FirstName = "John",
            DOB = DateTime.Now.AddYears(-37)
        };

        CreatedEditContext(person);
    }

    async Task OnValidSubmitHandler()
    {
        Console.WriteLine($"SAVING {person.FirstName} {person.LastName} who was born on {person.DOB}");
    }

    public class Person
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
    }
}

````