---
title: Avoid Validation When Typing
description: how to make Telerik textbox validate not immediately when typing but when blurred
type: troubleshooting
page_title: Do not validate when typing, but on blur
slug: textbox-validate-on-change
position: 
tags: 
ticketid: 1448879
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TextBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

Why does the TelerikTextBox activate the `<ValidationSummary />` while typing in the field?

Is there a way to disable this behaviour?

## Cause\Possible Cause(s)

We believe that firing the validation immediately makes the user experience more fluid and lets the user know about form issues quickly, which reduces frustration. Thus, we fire validation with the `ValueChanged` event.

## Solution

A way to change the default behavior would be to:

1. Remove the two-way bindig (`@bind-Value` -> `Value`),
1. use the `OnChange` event of the Telerik component to alter the model value,
1. re-validate the form by using an `EditContext` object.

>caption Fire Validataion on Blur and Enter with Telerik Textbox

```CSHTML
@using System.ComponentModel.DataAnnotations

from model: @person.theTbValue

<EditForm EditContext="@MyEditContext" OnValidSubmit="@OnValidSubmit" OnInvalidSubmit="@OnInvalidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <TelerikTextBox OnChange="@MyChangeHandler"
                    Value="@person.theTbValue"
                    ValueExpression="@( () => person.theTbValue )">
    </TelerikTextBox>

    <button type="submit">Submit</button>

</EditForm>

@logger

@code {
    Person person = new Person();

    EditContext MyEditContext { get; set; }

    protected override void OnInitialized()
    {
        MyEditContext = new EditContext(person);
    }

    public class Person
    {
        [Required(ErrorMessage = "Enter a name")]
        [StringLength(10, ErrorMessage = "That name is too long")]
        public string theTbValue { get; set; }
    }

    private void MyChangeHandler(object theUserInput)
    {
        person.theTbValue = (string)theUserInput;

        //you need to tell the edit context to re-validate the current data
        //so you need to create your own edit context, not just a model
        MyEditContext.Validate();
    }

    MarkupString logger { get; set; }
    void OnValidSubmit()
    {
        logger = new MarkupString(logger + $"<br />valid submit on {DateTime.Now}");
    }

    void OnInvalidSubmit()
    {
        logger = new MarkupString(logger + $"<br />INVALID submit on {DateTime.Now}");
    }
}
```
