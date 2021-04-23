---
title: Avoid Validation When Typing
description: how to make Telerik textbox validate not immediately when typing but when blurred.
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

## Description

We believe that firing the validation immediately makes the user experience more fluid and lets the user know about form issues quickly, which reduces frustration. Thus, we fire validation with the `ValueChanged` event.

### Differences with standard inputs

The standard inputs (such as `InputText` and `InputNumber`) use the `onchange` DOM event to change the `Value` of the model. We have chosen to use `oninput` to provide immediate feedback.

We do, however, use the same approach as Microsoft - when the value changes, we call ` TheEditContext?.NotifyFieldChanged()` which triggers validation.

So, even with the approach below, the first keystroke in the Telerik textbox will call this method and trigger validation, even if later validation will manually trigger only in `OnChange` - the Value of the field changes from the default (empty) to the first input of the user because of the `oninput` event.

Note that blurring the first input will always trigger validation, both with the Telerik, and with the standard inputs.

Perhaps a parameter could be exposed that prevents this, something like `ValidateOnlyOnChange`, that will make the solution below obsolete. If you need that, leave your comments, preferences and ideas in this Feedback Portal page: <a href="https://feedback.telerik.com/blazor/1474706-inputs-to-validate-only-in-the-onchange-event-not-on-every-keystroke" target="_blank">Inputs to Validate only in the OnChange event, not on every keystroke</a>.

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

        // We want to control when validation happens. To do that, we need to have
	// the EditContext object, and to call its .Validate() method
	// In this example, we use the OnChange event of the Telerik component
	// to avoid the default behavior where validation happens on every ValueChanged event
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

## See Also

Here is a request for an implementation of a `Submit()` method on the form so you can also submit it directly from the code if you wish: [https://github.com/dotnet/aspnetcore/issues/10953](https://github.com/dotnet/aspnetcore/issues/10953)
