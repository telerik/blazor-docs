---
title: Hide DatePicker Input
description: How to hide DatePicker input textbox.
type: how-to
page_title: Hide DatePicker Input
slug: datepicker-kb-hide-input
position: 
tags: 
ticketid: 1504648, 1557843, 1572315
res_type: kb
components: ["datepicker"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                DatePicker for Blazor, <br />
                DateTimePicker for Blazor, <br />
                TimePicker for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

Is there a way to hide the input portion of the DatePicker and leave only the selections Icon? Users should not see or type in the textbox.


## Solution

Use [custom CSS](slug:themes-override) to hide the textbox and leave only the button and icon.

To customize only specific Date/Time Pickers, use their Class parameter.

This technique prevents automatic closing of the DatePicker popup after the user selects a date. To hide the popup, call JavaScript from the [`ValueChanged` event handler](slug:components/datepicker/events#valuechanged). This workaround is not necessary for DateTimePickers and TimePickers.

>caption Hide Date/Time Picker TextBox

````RAZOR
@inject IJSRuntime js

<p>DatePickerValue: @DatePickerValue.ToLongDateString()</p>

DatePicker:
<TelerikDatePicker Class="date-picker-only-icon"
                   Value="@DatePickerValue"
                   Id="datePicker1"
                   ValueChanged="@( (DateTime newValue) => OnValueChanged(newValue, "datePicker1") )" />

DateTimePicker:
<TelerikDateTimePicker Class="date-picker-only-icon"
                       @bind-Value="@DatePickerValue" />

TimePicker:
<TelerikTimePicker Class="date-picker-only-icon"
                   @bind-Value="@DatePickerValue" />

<style>
    /* remove default 100% width */
    .date-picker-only-icon.k-input {
        width: auto;
    }

    /* hide textbox */
    .date-picker-only-icon .k-input-inner {
        display: none;
    }

    /* remove button left border */
    .date-picker-only-icon .k-input-button {
        border-left-width: 0;
    }
</style>

@* Move this script outside the Razor component *@
<script suppress-error="BL9992">

    function closePickerPopup(pickerId) {
        document.getElementById(pickerId).dispatchEvent(new Event("focus"));
    }

</script>

@code  {
    DateTime DatePickerValue { get; set; } = DateTime.Now;

    async Task OnValueChanged(DateTime newValue, string pickerId)
    {
        DatePickerValue = newValue;

        // close the DatePicker popup
        await js.InvokeVoidAsync("closePickerPopup", pickerId);
    }
}

@* CSS for UI for Blazor 2.30 and older versions *@

@*<style>
    .date-picker-only-icon,
    .date-picker-only-icon .k-picker-wrap {
        width: auto;
    }

    .date-picker-only-icon .k-dateinput {
        display: none;
    }

    .date-picker-only-icon .k-select {
        width: 30px;
        height: 30px;
    }
</style>*@
````
