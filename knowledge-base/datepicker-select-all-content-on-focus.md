---
title: How to Select All Content in DatePicker on Focus
description: Learn how to ensure the entire content of the DatePicker input is selected on focus.
type: how-to
page_title: Automatically Select All Text in DatePicker Input on Focus
meta_title: Automatically Select All Text in DatePicker Input on Focus
slug: datepicker-kb-select-all-content-on-focus
tags: datepicker, focus, input, selection
res_type: kb
ticketid: 1704388
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DatePicker for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want the entire content of the [Telerik DatePicker](slug:components/datepicker/overview) input to be automatically selected when focused, allowing users to copy-paste dates directly.

## Solution

To ensure the entire input content is selected on focus and the popup calendar remains functional, follow these steps:

1. Hide the default calendar button using CSS.
2. Add a custom button for opening the popup calendar.
3. Utilize the [`FocusAsync`](slug:components/datepicker/overview#datepicker-reference-and-methods) and a JavaScript function to select all text in the input.

Here is the complete implementation:

````Razor
@inject IJSRuntime JS

<style>
    .k-datepicker button{
        display: none;
    }
</style>

<span @onclick="FocusAndSelect">
    <TelerikDatePicker @ref="DatePickerRef"
                       @bind-Value="DatePickerValue"
                       Width="200px" />
</span>
<TelerikButton Icon="@SvgIcon.Calendar" OnClick="@OpenPicker" />

<script>
    window.selectDatePickerInput = function () {
        // Finds the active element (the DatePicker input after FocusAsync)
        const input = document.activeElement;
        if (input && input.tagName === "INPUT") {
            input.select();    // selects all text
        }
    }
</script>

@code {
    private TelerikDatePicker<DateTime> DatePickerRef { get; set; }
    private DateTime DatePickerValue { get; set; } = DateTime.Now;

    private void OpenPicker()
    {
        DatePickerRef?.Open();
    }

    private async Task FocusAndSelect()
    {
        await DatePickerRef.FocusAsync();

        // wait a moment so the input renders focus
        await Task.Delay(20);

        await JS.InvokeVoidAsync("selectDatePickerInput");
    }
}
````

## See Also

* [DatePicker Documentation](slug:components/datepicker/overview)
* [FocusAsync Method](slug:components/datepicker/overview#datepicker-reference-and-methods)
