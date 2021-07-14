---
title: Focus TextBox Programmatically
description: How to focus a blazor textbox or input programmatically.
type: how-to
page_title: Focus textbox or input programmatically
slug: inputs-kb-focus
position: 
tags: 
ticketid: 1527317
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.25.0 and later</td>
		</tr>
	</tbody>
</table>

## Description
How do I focus a Blazor TelerikTextBox or any other input component programmatically?

## Solution
The Telerik textboxes and inputs offer a `FocusAsync` method that lets you focus them with code.

The example below showcases it for a few of them, but it is available for all input components and buttons:

* AutoComplete
* Button
* ComboBox
* CheckBox
* DateInput
* DatePicker
* DateRangePicker
* DateTimePicker
* Editor
* MaskedTextBox
* MultiSelect
* NumericTextBox
* TextArea
* TextBox
* TimePicker

>caption Focus input with code

````CSHTML
@code{
    async Task FocusTextbox()
    {
        await TextboxRef.FocusAsync();
    }

    async Task FocusNumericTextbox()
    {
        await NumericTextboxRef.FocusAsync();
    }

    async Task FocusDropdown()
    {
        await DropdownRef.FocusAsync();
    }
}

<TelerikButton OnClick="@FocusTextbox">Focus textbox</TelerikButton>
<TelerikButton OnClick="@FocusNumericTextbox">Focus numeric textbox</TelerikButton>
<TelerikButton OnClick="@FocusDropdown">Focus dropdown</TelerikButton>

<TelerikTextBox @ref="@TextboxRef" @bind-Value="@TextoboxValue"></TelerikTextBox>
<TelerikNumericTextBox @ref="@NumericTextboxRef" @bind-Value="@NumericTextoboxValue"></TelerikNumericTextBox>
<TelerikDropDownList @ref="@DropdownRef" @bind-Value="@DropdownValue" Data="@DropdownData"></TelerikDropDownList>

@code{
    TelerikTextBox TextboxRef { get; set; }
    TelerikNumericTextBox<int> NumericTextboxRef { get; set; }
    TelerikDropDownList<string, string> DropdownRef { get; set; }

    string TextoboxValue { get; set; } = "lorem ipsum";
    int NumericTextoboxValue { get; set; } = 123;
    string DropdownValue { get; set; } = "one";
    List<string> DropdownData { get; set; } = new List<string>() { "one", "two", "three" };
}
````

## Notes
You can still use JavaScript to focus DOM elements by having a proper element reference or selector. The C# method is built on top of that. If you want more specific functionality (like <a href="https://feedback.telerik.com/blazor/1454982-always-highlight-all-numerictextbox-content-on-focus" target="_blank">selecting the text</a> as well, a pure JS solution might be simpler).
