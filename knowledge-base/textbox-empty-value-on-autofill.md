---
title: TextBox Value is Empty on Chrome Autofill
description: When using Chrome autofill, the TextBox value is null at first.
type: troubleshooting
page_title: TextBox Value is Empty on Chrome Autofill
slug: textbox-kb-empty-value-on-autofill
position: 
tags: textbox, empty, value, autofill
ticketid: 1546904
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

I am using TextBox components for username and password fields of a form. The browser (Chrome) saves them and when I execute the application, it automatically fills those fields for me.
However, if I try to send access data, the login fails, and the reason is that for the first time, and only for the first time, the value of each field is empty. If I try to login again, the fields appear correctly filled.
The issue occurs after an upgrade to version 2.30.


## Steps to Reproduce

1. Run the snippet
1. Enter some values for the username and password fields
1. Save their values with the browser management
1. Close the app and run it again in order to let the browser fill the fields.
1. Without any prior interaction on the page press Login and check the username and password values in the popup - they are empty
1. Close the popup and click Login again - username and password values are updated

````CSHTML
<label for="userId">Username</label>
<TelerikTextBox Id="userId"
                @bind-Value="@UserName">
</TelerikTextBox>

<label for="password">Password</label>
<TelerikTextBox Id="password"
                Password="true"
                @bind-Value="@Password">
</TelerikTextBox>

<TelerikButton Id="commandSubmit" Icon="login" OnClick="@OnLogin">
    Login
</TelerikButton>

@code {
    protected string UserName { get; set; } = "";
    protected string Password { get; set; } = "";

    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    protected async Task OnLogin()
    {
        await Dialogs.ConfirmAsync($"User: {UserName}; Pass: {Password}", "Confirm user");
    }
}
````

## Cause\Possible Cause(s)

As of Telerik UI for Blazor 2.30 the [TextBox]({%slug components/textbox/overview%}#features) component exposes a DebounceDelay parameter that specifies the time in milliseconds between the last typed symbol and the updating of the value. It has a default value of 150ms and is dependent on the `oninput` event to start counting this time.

However, when the browser (Chrome, for example) autofills the values in the fields, the `oninput` event is not fired until some interaction with the page occurs. This means that the browser does not notify the fields that their values have changed.

Thus, when clicking Login for the first time (interacting with the page), the `oninput` fires but by default there is a 150ms DebounceDelay due to which the TextBox values are still not updated.

Other components that also have DebounceDelay property and might be affected are [TextArea]({%slug textarea-overview%}#features) and [MaskedTextBox]({%slug maskedtextbox-overview%}#features).

## Suggested Workarounds

To solve the case you can proceed with one of the following approaches:

* Reduce the DebounceDelay value or even remove it (set its value to 0). Try setting different values to validate what works best for your use case as the minimum DebounceDelay value needed for the according TextBox value update may vary depending on the machine.

* Do not let the browser autofill the values

The example below demonstrates the first approach - removing the default DebounceDelay:

````CSHTML
<label for="userId">Username</label>
<TelerikTextBox Id="userId"
                @bind-Value="@UserName"
                DebounceDelay="0">
</TelerikTextBox>

<label for="password">Password</label>
<TelerikTextBox Id="password"
                Password="true"
                @bind-Value="@Password"
                DebounceDelay="0">
</TelerikTextBox>

<TelerikButton Id="commandSubmit" Icon="login" OnClick="@OnLogin">
    Login
</TelerikButton>

@code {
    protected string UserName { get; set; } = "";
    protected string Password { get; set; } = "";

    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    protected async Task OnLogin()
    {
        await Dialogs.ConfirmAsync($"User: {UserName}; Pass: {Password}", "Confirm user");
    }
}
````

## See Also

* [Chrome autofills the Form and the floating label overlaps the values]({%slug form-chrome-autofill%})

* [Label not moved from input on browser autofill in Chrome]({%slug textbox-chrome-autofill-label%})