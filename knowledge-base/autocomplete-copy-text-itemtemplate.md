---
title: How to Copy Text from an ItemTemplate
description: Learn how to allow users to copy text from the ItemTemplate in the AutoComplete for Blazor component.
type: how-to
page_title: How to Enable Text Copy in AutoComplete Dropdown Blazor
slug: autocomplete-kb-copy-text-itemtemplate
tags: blazor, autocomplete, itemtemplate, clipboard, copy, paste
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
    .autocomplete-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
</style>

<TelerikAutoComplete Data="@AutoCompleteData" @bind-Value="@Role" Placeholder="Write your position">
    <ItemTemplate>
        @{
            var text = context.ToString();
        }
        <div class="autocomplete-item">
            <strong>@text</strong>
            <TelerikButton OnClick="@(() => CopyToClipboard(text))"
                           Icon="@SvgIcon.Copy"
                           FillMode="@ThemeConstants.Button.FillMode.Outline" />
        </div>
    </ItemTemplate>
</TelerikAutoComplete>

@code {
    private string Role { get; set; }
    private List<string> AutoCompleteData { get; set; }
    private List<string> SourceData { get; set; } = new()
    {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };

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
        try
        {
            var isSupported = await JS.InvokeAsync<bool>("eval", "!!(navigator.clipboard && navigator.clipboard.writeText)");
            if (isSupported)
            {
                await JS.InvokeVoidAsync("navigator.clipboard.writeText", text);
            }
            else
            {
                Console.WriteLine("Clipboard API not supported in this browser.");
                // Optionally show a notification to the user
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Clipboard copy failed: {ex.Message}");
            // Optionally show a fallback UI message to the user
        }
    }
}
````

## See Also

* [AutoComplete Documentation](slug:autocomplete-overview)
* [Clipboard API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
* [Blazor JavaScript Interoperability](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability)
