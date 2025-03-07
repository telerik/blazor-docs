---
title: How to Add CSS Class to Selected Text with Editor Custom Tool
description: Learn how to add CSS classes to elements using custom toolbar tools in the Telerik Editor for Blazor, enhancing the styling capabilities of your application.
type: how-to
page_title: How to Add CSS Class to Selected Text with Editor Custom Tool
slug: editor-kb-add-class-to-selected-text
tags: editor, blazor, custom tool
res_type: kb
ticketid: 1679881
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Editor for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

In certain situations, you might want to style the content within the [Editor for Blazor](slug:editor-overview) without relying on inline styles. Specifically, you might need to add CSS class to specific element of the Editor cotent. This knowledge base article guides you on how to add a [Editor Custom Tool](slug:editor-custom-tools) that applies a `<p>` and a CSS class to selected text.

This knowledge base article also answers the following questions:

- How can I enhance text styling in the Editor for Blazor using CSS classes?
- Is it possible to add a toolbar button in the Editor for Blazor that applies styling classes?
- How do I use custom tools in the Editor for Blazor to manipulate text styling?

## Solution

To add a custom CSS class to a `<p>` element or any other element using the Editor toolbar button, create a custom tool that applies the desired class. The following steps and example code illustrate how to achieve this functionality:

1. Define a Custom Tool in the Editor toolbar. This tool will specifically target the selected text and apply a CSS class to it.

2. Use JavaScript Interop to get the selected text.

````RAZOR
@using Telerik.Blazor.Components.Editor
@inject IJSRuntime js

<TelerikEditor Tools="@Tools" @bind-Value="@TheEditorContent" EditMode="@EditorEditMode.Div" @ref="@EditorRef">
    <EditorCustomTools>
        <EditorCustomTool Name="GetSelectedText">
            <TelerikButton OnClick="@ApplyImportantClass">Set span and class</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

<script>
    window.getSelectedText = function () {
        return window.getSelection().toString();
    }
</script>

<style>
    .@CustomClass {
        color: red;
    }
</style>

@code {
    private string TheEditorContent { get; set; } = "<h1>Sample Text</h1><p>More content here.</p>";
    private List<IEditorTool>? Tools { get; set; }
    private TelerikEditor? EditorRef { get; set; }
    private string CustomClass { get; set; } = "custom-content";

    private async Task ApplyImportantClass()
    {
        var selectedText = await js.InvokeAsync<string>("getSelectedText");

        if (!string.IsNullOrEmpty(selectedText))
        {
            // Apply a <span> with the class without modifying the actual HTML content manually
            await EditorRef!.ExecuteAsync(new HtmlCommandArgs("insertHtml", $"<p class='{CustomClass}'>{selectedText}</p>", false));
        }
    }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>(EditorToolSets.Default);
        Tools.Add(new CustomTool("GetSelectedText"));

        return base.OnInitializedAsync();
    }
}
````

## See Also

- [Editor Overview](slug:editor-overview)
- [JavaScript Interop in Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability)
- [Editor Custom Tools](slug:editor-custom-tools)
- [How to Get Selected Text in Editor](slug:editor-kb-get-selection)
