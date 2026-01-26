---
title: Disable Copy and Paste in Telerik Blazor Inputs
description: A guide that shows how to prevent users from copying and pasting text into the Telerik Blazor Inputs in a Blazor application.
type: how-to
page_title: How to Prevent Copy and Paste Actions in Telerik Blazor Inputs
slug: inputs-kb-disable-copy-paste
tags: autocomplete, combobox, datepicker, daterangepicker, datetimepicker, multicolumncombobox, numerictextbox,   textbox, textarea, timepicker, blazor, copy, paste
res_type: kb
ticketid: 1670453
components: ["autocomplete","combobox","datepicker","datetimepicker","daterangepicker","multicolumncombobox","textarea","numerictextbox","textbox","timepicker"]
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
            <td>
                AutoComplete for Blazor,<br />
                ComboBox for Blazor,<br />
                DatePicker for Blazor,<br />
                DateRangePicker for Blazor,<br />
                DateTimePicker for Blazor,<br />
                MultiColumnComboBox for Blazor,<br />
                NumericTextBox for Blazor,<br />
                TextArea for Blazor,<br />
                TextBox for Blazor,<br />
                TimePicker for Blazor
            </td>
</tr>
</tbody>
</table>

## Description

This KB article answers the following questions:
- How can I prevent users from pasting text into a TextBox?
- What is the method to disable the copy and paste actions in a NumericTextBox?
- Can I use JavaScript Interop to control copy and paste in the Telerik ComboBox for Blazor?

## Solution

To disable the copy and paste functionality in a TextBox and other Telerik Blazor inputs, follow the steps below:

1. Add a custom CSS class to the component to ensure you are targeting this specific instance. 

2. Create a JavaScript function that targets the input of your component and prevents the default `oncopy` and `onpaste` events.

3. Use JS Interop to invoke the JavaScript function during the `OnAfterRenderAsync` lifecycle method. It fires when the DOM tree is built, but before the HTML output is actually rendered in the browser. This makes it the most appropriate place to listen to and prevent the `oncopy` and `onpaste` events.

````RAZOR
@inject IJSRuntime js

<TelerikTextBox @bind-Value="@TBValue"
                Width="300px"
                Class="no-copy-paste" />

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    function preventCutCopyPaste() {
        var input = document.querySelector(".no-copy-paste input");

        if (input) {
            input.addEventListener("copy", e => e.preventDefault());
            input.addEventListener("paste", e => e.preventDefault());
        }
    }
</script>

@code {
    private string TBValue { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // ensure the HTML is rendered in the browser
            await Task.Delay(1);

            // prevent copy and paste in the textbox
            await js.InvokeVoidAsync("preventCutCopyPaste");
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## See Also

- [Using JavaScript Interop in Blazor](https://docs.microsoft.com/aspnet/core/blazor/javascript-interop)
