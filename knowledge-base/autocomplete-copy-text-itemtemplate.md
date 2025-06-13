---
title: How to Copy Text from an ItemTemplate
description: Learn how to allow users to copy text from the ItemTemplate in the AutoComplete for Blazor component.
type: how-to
page_title: How to Enable Text Copy in AutoComplete Dropdown Blazor
slug: autocomplete-kb-copy-text-itemtemplate
tags: autocomplete, blazor, itemtemplate, clipboard, text, copy, paste
res_type: kb
ticketid: 1689288
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>AutoComplete for Blazor</td>
            <td>DropDownList for Blazor</td>
            <td>ComboBox for Blazor</td>
            <td>MultiSelect for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to allow users to copy the text from the dropdown list in the [AutoComplete component](slug:autocomplete-overview).

## Solution

To enable text copying from the dropdown list in the AutoComplete, use the `ItemTemplate` to display the desired text alongside a button that uses JavaScript and the Clipboard API for copying. Here’s an example implementation:

````RAZOR
@inject IJSRuntime JS

<style>
    .copy-button {
        margin-left: 8px;
    }
</style>

<TelerikAutoComplete Data="@AutoCompleteData" @bind-Value="@Role" Placeholder="Write your position">
    <ItemTemplate>
        @{
            var text = context.ToString();
        }
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <strong>@text</strong>
            <TelerikButton OnClick="@(() => CopyToClipboard(text))" Class="copy-button" Icon="@SvgIcon.Copy" FillMode="@ThemeConstants.Button.FillMode.Outline" />
        </div>
    </ItemTemplate>
</TelerikAutoComplete>

@code {
    private string Role { get; set; }
    private List<string> AutoCompleteData { get; set; }
    private List<string> SourceData { get; set; } = new List<string> { "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer" };

    protected override void OnInitialized()
    {
        AutoCompleteData = SourceData;
    }

    private void OnCheckBoxChangeHandler()
    {
        AutoCompleteData = new List<string>(SourceData);
    }

    private async Task CopyToClipboard(string text)
    {
        await JS.InvokeVoidAsync("navigator.clipboard.writeText", text);
    }
}
````

## See Also

* [AutoComplete Documentation](slug:autocomplete-overview)
* [Clipboard API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
* [Blazor JavaScript Interoperability](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability)
