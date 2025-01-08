---
title: Change Input Font Size and Paddings
description: How to reduce the font size and paddings for the Telerik Blazor components, with custom CSS.
type: how-to
page_title: How to Change the Font Styles and Paddings of the Input Components
slug: inputs-kb-change-font-size
position: 
tags: styling
ticketid: 1564495
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor, <br />
                Button for Blazor, <br />
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />
                TextBox for Blazor, <br />
            </td>
        </tr>
    </tbody>
</table>


## Description

How to change the default css styles for the input controls? I need to alter the default font family, font size and padding of these components.


## Solution

All input components and the Button provide a `Size` parameter that changes the component padding styles. For example, [here is the corresponding article about the ComboBox](slug://combobox-appearance). For more advanced customization, [override the theme styles](slug://themes-override) and set the desired font styles to the components.

>caption Change input font styles and paddings

````RAZOR
<TelerikAutoComplete Data="@DropDownData"
    ValueField="Text"
    @bind-Value="@AutoCompleteValue"
    Width="100px" />

<TelerikComboBox Data="@DropDownData"
    TextField="Text"
    ValueField="Id"
    @bind-Value="@DropDownValue"
    Width="100px" />

<TelerikDropDownList Data="@DropDownData"
    TextField="Text"
    ValueField="Id"
    @bind-Value="@DropDownValue"
    Width="100px" />

<TelerikTextBox @bind-Value="@StringValue"
    Width="100px" />

<TelerikButton>Button</TelerikButton>

<style>
    /* reduce default 14px font-size */
    .k-button,
    .k-input,
    .k-input .k-input-inner,
    .k-picker,
    .k-picker .k-input-inner {
        font-size: 12px;
    }
    
    /* reduce default 4px/8px paddings */
    .k-button,
    .k-picker .k-input-inner,
    .k-input .k-input-inner,
    .k-button.k-input-button {
        padding: 2px 4px;
    }

    /* remove default 20px min-height */
    .k-button.k-input-button .k-button-icon {
        min-height: initial;
    }

    /* styles for the dropdown items */
    .k-animation-container .k-list .k-list-item {
        font-size: 12px;
        padding: 2px 4px;
    }
</style>

@code {
    IEnumerable<DropDownModel> DropDownData = Enumerable.Range(1, 5).Select(x => new DropDownModel { Text = "item " + x, Id = x });
    int DropDownValue { get; set; } = 3;
    string AutoCompleteValue { get;set; } = "Item 3";
    string StringValue { get;set; } = "TextBox";

    public class DropDownModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Change Grid Font Size](slug://grid-kb-change-font-size)
