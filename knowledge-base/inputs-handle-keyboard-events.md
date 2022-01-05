---
title: Capture input keyboard events
description: how to handle keyboard events in Telerik inputs (textbox, numeric textbox, etc.).
type: how-to
page_title: Capture input keyboard events
slug: inputs-kb-handle-keyboard-events
position: 
tags: 
ticketid: 1450341
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TextBox for Blazor, NumericTextBox for Blazor, other inputs/form elements such as the Editor</td>
		</tr>
	</tbody>
</table>


## Description

I would know how to discriminate between lost focus and enter key press in OnChange event. Also, is there a way to mange other events such as OnKeyDown, OnKeyPress, OnInput, etc.


## Solution

The keyboard events bubble up the DOM, so you can attach event handlers for them on an element above the Telerik input.

If you are looking for an event when the user confirms an action, consider the built-in `OnChange` event which fires when the user presses `Enter` or blurs the input.

>important Optionally, you can disable the [**`DebounceDelay`**](https://docs.telerik.com/blazor-ui/components/textbox/overview#:~:text=DebounceDelay,int) parameter of the textbox by setting it to 0. The `DebounceDelay` default value is 150. It can fire the `onkeypress` event logic before the [**`ValueChanged`**](https://docs.telerik.com/blazor-ui/components/textbox/events#valuechanged) event of the input. 

>caption Handle keyboard events in Telerik inputs

````CSHTML
@* Add a keyboard event handler on the parent element to capture the events *@

<span @onkeypress="@KeyHandlerTb" @onkeydown="@KeyHandlerTb">
    <TelerikTextBox DebounceDelay="0" @bind-Value="@TbValue"></TelerikTextBox>
</span>

<span @onkeypress="@KeyHandlerNtb" @onkeydown="@KeyHandlerNtb">
    <TelerikNumericTextBox @bind-Value="@NtbValue"></TelerikNumericTextBox>
</span>

<br />
@logger

@code{
    MarkupString logger { get; set; }
    string TbValue { get; set; } = "lorem ipsum";
    int NtbValue { get; set; } = 123;

    void LogEvent(string evt)
    {
        logger = new MarkupString($"{logger}{evt} on {DateTime.Now.ToLongTimeString()}<br />");
    }

    void KeyHandlerTb(KeyboardEventArgs e)
    {
        string evtInfo = $"Textbox: {e.Type}, key: {e.Key}";
        LogEvent(evtInfo);
    }

    void KeyHandlerNtb(KeyboardEventArgs e)
    {
        string evtInfo = $"Numeric: {e.Type}, key: {e.Key}";
        LogEvent(evtInfo);
    }
}
````

## Notes

The same approach can work for capturing events from the Editor component when it is in its [Div mode]({%slug editor-edit-modes-div%}).
