---
title: Print Editor Content
description: How to print only the Editor content (value), without the rest of the web page.
type: how-to
page_title: Print the Editor Content
slug: editor-kb-print-content
position: 
tags: editor, print
ticketid: 1563914
res_type: kb
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

How to print the contents of the Blazor Editor? The user should print only the Editor value, without the page content around the component.


## Solution

Programmatic printing relies on the [JavaScript `print()` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/print) of the `window` object.

The example below shows three possible techniques:

1. If the Editor's [`EditMode`](slug://editor-edit-modes-overview) is [`Iframe`](slug://editor-edit-modes-iframe), then call the `print()` method of the iframe `window` object.
1. If `EditMode` is [`Div`](slug://editor-edit-modes-div), there are two options:
    * Call the `print()` method of the current page's `window` object. Use [CSS `@media` query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) to implement print-only styles and hide everything outside the Editor's content area.
    * Open a new browser window with JavaScript. Inject the Editor value as content of the new window. Call the `print()` method of the new `window` object. Note that browser popups may be disabled by the user.

>caption Print the Editor Content

````RAZOR
@using Telerik.Blazor.Components.Editor

@inject IJSRuntime js

<div class="noprint">
    <p>Iframe EditMode:</p>

    <TelerikEditor EditMode="@EditorEditMode.Iframe"
                   Class="editor-iframe"
                   Tools="@EditorTools"
                   @bind-Value="@EditorValue">
        <EditorCustomTools>
            <EditorCustomTool Name="Print">
                <TelerikButton OnClick="@PrintIframe" Icon="@SvgIcon.Print">Print iframe</TelerikButton>
            </EditorCustomTool>
        </EditorCustomTools>
    </TelerikEditor>

    <p>Div EditMode:</p>
</div>

<TelerikEditor EditMode="@EditorEditMode.Div"
               Class="editor-div"
               Tools="@EditorTools"
               @bind-Value="@EditorValue">
    <EditorCustomTools>
        <EditorCustomTool Name="Print">
            <TelerikButton OnClick="@PrintDiv" Icon="@SvgIcon.Print">Print via CSS media</TelerikButton>
            <TelerikButton OnClick="@PrintWindow" Icon="@SvgIcon.Print">Print via popup window</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@* suppress-error allows <script> tags inside Razor components as a workaround. *@
@* Move this script to an external file in production environment. *@
<script suppress-error="BL9992">
    function printIframe() {
        var editorIframe = document.querySelector(".editor-iframe iframe");
        if (editorIframe) {
            editorIframe.contentWindow.print();
        }
    }

    function printDiv() {
        var editorDiv = document.querySelector(".editor-div .k-content");
        if (editorDiv) {
            window.print();
        }
    }

    function printExtraWindow(editorValue) {
        var printWin = window.open('', '', 'left=0,top=0,width=800,height=500,toolbar=0,scrollbars=0,status=0');
        printWin.document.write(editorValue);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    }
</script>

<style>
    @@media print {
        /* hide the Editor toolbar and everything outside the component */
        .noprint,
        .k-editor .k-toolbar {
            display: none;
        }

        /* expand Editor and disable scrollability */
        .k-editor-content {
            height: auto;
            overflow: visible;
        }
    }
</style>

@code {
    string EditorValue { get; set; } = "<p>foo <strong>bar</strong> baz</p>";
    List<IEditorTool> EditorTools { get; set; } = new List<IEditorTool>() { new CustomTool("Print") };

    async Task PrintIframe()
    {
        await js.InvokeVoidAsync("printIframe");
    }

    async Task PrintDiv()
    {
        await js.InvokeVoidAsync("printDiv");
    }

    async Task PrintWindow()
    {
        await js.InvokeVoidAsync("printExtraWindow", EditorValue);
    }
}
````
