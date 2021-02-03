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
If you want to execute some business logic (such as fetching data) only once per value change, but you want to keep using the `@bind-Value` to populate your models, you can keep the last value with which `OnChange` fired and compare against it.

>caption Execute OnChange once per value selection

````CSHTML
@* monitor the console and try the following to see the difference:
    - selecting the same item several times
    - clicking away from the dropdownlist after selecting an item
    *@

@MySelectedItem
<br />
<TelerikDropDownList Data="@MyList" OnChange="@MyOnChangeHandler" @bind-Value="@MySelectedItem">
</TelerikDropDownList>

@code {
    string MySelectedItem { get; set; }
    protected List<string> MyList = new List<string>() { "first", "second", "third" };
    
    string lastOnChangeValue { get; set; }

    void MyOnChangeHandler(object theUserInput)
    {
        string currValue = theUserInput as string;

        Console.WriteLine($"OnChange fired for value: {currValue}");

        if (!currValue.Equals(lastOnChangeValue))
        {
            //this is where you execute the business logic you want to fire once per selected value
            Console.WriteLine($"Executing business logic for value {currValue}, such as loading data");
        }

        lastOnChangeValue = currValue;
    }
}
````
