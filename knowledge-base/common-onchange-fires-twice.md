---
title: OnChange fires twice
description: how to fire OnChange only once, it seems to fire twice.
type: troubleshooting
page_title: Fire OnChange only once
slug: ddl-kb-onchange-fires-twice
position: 
previous_url: /knowledge-base/ddl-onchange-fires-twices
tags: 
ticketid: 1471167
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor, ComboBox for Blazor, AutoComplete for Blazor, TextBox for Blazor, NumericTextBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I observe twice firing onchange event in dropdownlist or other inputs.

I want the event to fire only once when the user selects something.

## Cause\Possible Cause(s)

The OnChange event is a user confirmation event - it fires when the user chooses an item from the dropdown list, and also when the user blurs an input (the dropdownlist is, in essence, an input).

For example, pressing Enter in an input will fire the event, but will not remove the focus from the input. Thus, the next click on the page (on a button, another component) will fire the event again.

## Solution

>tip As of `2.22.0`, you can use the `OnBlur` event of the components to capture the `focusout` event, so you may not need to use `OnChange`.

If you want to execute some business logic (such as fetching data) only once per value change, but you want to keep using the `@bind-Value` to populate your models, you can keep the last value with which `OnChange` fired and compare against it.

>caption Execute OnChange once per value selection

````CSHTML
@* monitor the console and try the following to see the difference:
    - selecting the same item several times
    - clicking away from the dropdownlist after selecting an item
*@

@DropDownValue
<br />
<TelerikDropDownList Data="@DropDownData"
                     @bind-Value="@DropDownValue"
                     OnChange="@OnChangeHandler">
</TelerikDropDownList>

@code {
    private string DropDownValue { get; set; }

    private List<string> DropDownData = new List<string>() { "first", "second", "third" };

    private string lastOnChangeValue { get; set; }

    private async Task OnChangeHandler(object theUserInput)
    {
        string currValue = theUserInput as string;

        Console.WriteLine($"OnChange fired for value: {currValue}");

        if (!currValue.Equals(lastOnChangeValue))
        {
            //save the changed value first, so the check does not pass afterwards
            lastOnChangeValue = currValue;

            //this is where you execute the business logic you want to fire once per selected value
            await Task.Delay(2000); //simulate some asynchronous operation, e.g. loading data

            Console.WriteLine($"Executing business logic for value {currValue}, such as loading data");
        }
    }
}
````
