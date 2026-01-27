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
components: ["autocomplete","combobox","datepicker","datetimepicker","dropdownlist","maskedtextbox","numerictextbox","textbox","timepicker"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor,<br />
                ComboBox for Blazor<br />
                DatePicker for Blazor<br />
                DateTimePicker for Blazor<br />
                DropDownList for Blazor<br />
                MaskedTextBox for Blazor, <br />
                NumericTextBox for Blazor,<br />
                TextBox for Blazor,<br />
                TimePicker for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

I would know how to discriminate between lost focus and enter key press in OnChange event. Also, is there a way to mange other events such as OnKeyDown, OnKeyPress, OnInput, etc.


## Solution

The keyboard events bubble up the DOM, so you can attach event handlers for them on an element above the Telerik input.

If you are looking for an event when the user confirms an action, consider the built-in `OnChange` event which fires when the user presses `Enter` or blurs the input.

>important Optionally, you can set the [**`DebounceDelay`**](slug:components/textbox/overview#textbox-parameters) parameter of the textbox to 0. This can prevent textbox value mismatch in the `onkeypress` and [**`ValueChanged`**](slug:components/textbox/events#valuechanged) event handlers. Such mismatch can occur due to the default `DebounceDelay` value.

>caption Handle keyboard events in Telerik inputs

````RAZOR
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

The same approach can work for capturing events from the Editor component when it is in its [Div mode](slug:editor-edit-modes-div).
