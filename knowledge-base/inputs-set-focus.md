---
title: Focus TextBox Programmatically
description: How to focus a blazor textbox or input programmatically.
type: how-to
page_title: Focus textbox or input programmatically
slug: inputs-kb-focus
position: 
tags: 
ticketid: 1618182, 1610413, 1590689, 1544989, 1546166, 1532875, 1527317
res_type: kb
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
                DateTimePicker for Blazor,<br />
                DropDownList for Blazor,<br />
                MultiColumnComboBox for Blazor,<br />
                MultiSelect for Blazor,<br />
                TimePicker for Blazor
            </td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>2.25.0 and later</td>
        </tr>
    </tbody>
</table>

## Description

How do I focus a Blazor TextBox or any other input component programmatically?

## Solution

The Telerik Blazor textboxes and inputs offer a `FocusAsync` method that lets you focus them with code.

The example below showcases it for a few of them, but it is available for all input components and buttons:

* AutoComplete
* Button
* CheckBox
* ColorPicker
* ComboBox
* DateInput
* DatePicker
* DateRangePicker
* DateTimePicker
* DropDownButton
* DropDownList
* Editor
* MaskedTextBox
* MultiColumnComboBox
* MultiSelect
* NumericTextBox
* SplitButton
* TextArea
* TextBox
* TimePicker
* ToggleButton

>caption Focus Telerik Blazor input component programmatically

````RAZOR
<TelerikButton OnClick="@FocusTextbox">Focus TextBox</TelerikButton>
<TelerikButton OnClick="@FocusDropdown">Focus DropDownList</TelerikButton>

<TelerikTextBox @ref="@TextBoxRef"
                @bind-Value="@TextBoxValue"
                Width="200px" />

<TelerikDropDownList @ref="@DropDownListRef"
                     Data="@DropdownData"
                     @bind-Value="@DropDownListValue"
                     Width="200px" />

@code{
    private TelerikTextBox TextBoxRef { get; set; }
    private TelerikDropDownList<string, string> DropDownListRef { get; set; }

    private string TextBoxValue { get; set; } = "lorem ipsum";
    private string DropDownListValue { get; set; } = "one";
    private List<string> DropdownData { get; set; } = new List<string>() { "one", "two", "three" };

    private async Task FocusTextbox()
    {
        await TextBoxRef.FocusAsync();
    }

    private async Task FocusDropdown()
    {
        await DropDownListRef.FocusAsync();
    }
}
````

## Focus on Page Load

* The earliest reliable programmatic focus can occur in `OnAfterRenderAsync` and with some delay. The reason is that `OnAfterRenderAsync` is fired when the DOM tree is built, but before the HTML output is actually rendered in the browser. After the event is fired, the .NET runtime sends the HTML to the browser.
The `FocusAsync` method relies on `JSInterop`, which in turn relies on the component to be rendered in the browser.
* You can still use JavaScript to focus DOM elements by having a proper element reference or selector. The C# method is built on top of that. If you want more specific functionality (like <a href="https://feedback.telerik.com/blazor/1454982-always-highlight-all-numerictextbox-content-on-focus" target="_blank">selecting the text</a> as well), a pure JS solution might be simpler.

>caption Focus on page load and select textbox content

````RAZOR
@inject IJSRuntime js

<TelerikMaskedTextBox @ref="@MaskedTextBoxRef"
                      @bind-Value="@MaskedValue"
                      Mask="0000-0000-0000-0000"
                      Width="300px"
                      Class="focus-me" />

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">
    function focusMTB() {
        var mtb = document.querySelector(".focus-me input");
        if (mtb) {
            mtb.focus()
            mtb.select();
        }
    }
</script>

@code{
    private TelerikMaskedTextBox MaskedTextBoxRef { get; set; }

    private string MaskedValue { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1);

            // focus and select all textbox content
            await js.InvokeVoidAsync("focusMTB");

            // OR focus only
            //await MaskedTextBoxRef.FocusAsync();
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````
