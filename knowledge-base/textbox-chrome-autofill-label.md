---
title: Label not moved from input on browser autofill in Chrome
description: Using the Chrome AutoFill does not update the inputs value and causes rendering issues with the floating label
type: troubleshooting
page_title: Chrome AutoFill does not update input Value
slug: textbox-chrome-autofill-label
position: 
tags: 
ticketid: 1447911
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
When the browser autofills a textbox, the label is not moved from the input - it remains overlaying the text instead of moving up. This happens only in Chrome. It works fine in Firefox and Edge.

>caption A short video of the browser behavior and how the Blazor model data is only updated when some other action happens - a click somewhere or you typing in the input

![](images/chrome-autofill-does-not-update-value.gif)

## Steps to Reproduce
Create a simple form with a textbox and a password box. Click its Submit button and when Chrome prompts you to Save the user-password, Save them. Refresh the page. The browser autofills the form.

Expected: The textbox label is above the textbox.

Actual: The textbox label is still "inside" the textbox.

>caption Sample reproducible

````CSHTML
<form>
    @* The autofill should populate these lines here, but it does not *@
    @SomeUserModel.UserName
    <br />
    @SomeUserModel.Password
    <br />
    <input @bind="@SomeUserModel.UserName" />
    <br />
    <TelerikTextBox @bind-Value="@SomeUserModel.UserName" Label="Enter Username" />
    <br />
    <input type="password" @bind="@SomeUserModel.Password" />
    <br />
    <button type="submit">Submit</button>
</form>

@code{ 
    public class SomeModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    SomeModel SomeUserModel { get; set; } = new SomeModel();
}
````



## Cause\Possible Cause(s)
It seems Chrome updates only the rendering, but no the actual `value` of the input. This also happens with the regular `<input>` elements. 

The data Chrome filled in does not appear in the Blazor model and so the Blazor components don't actually see the change in order to update.

## Suggested Workarounds
At the time of writing, we are not aware of ways to work around this browser behavior.

You can try setting the `autocomplete="off"` attribute on the `form` to prevent the autofill in the first place, yet it is up to the browser to respect it and it may not.

General suggestions on the Internet are to handle events like `mouseover` or `mouseenter` on the form/page to detect that the user is doing something, so you can try updating your form - in Blazor that would be calling `StateHasChanged()`. The downside of this is that it can cause severe performance issues in Blazor if called repeatedly. Moreover, in our local tests, neither calling `StateHasChanged()`, nor invoking a JS click on the `body`, nor updating a third field in the model helped (you can't update the autofilled fields because it will defeat the purpose of the autofill, and it seems that their value still does not exist - even if you update one, the other does not get populated).
