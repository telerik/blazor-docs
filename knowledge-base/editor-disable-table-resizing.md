---
title: Disable Table Resizing in the Editor
description: Learn how to hide table resize handles in the Telerik UI for Blazor Editor.
type: how-to
page_title: Disable Table Resizing in the Editor
slug: editor-kb-disable-table-resizing
published: true
position:
tags: telerik, blazor, editor, table, resize
ticketid: 1710657
res_type: kb
components: ["editor"]
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

How can I disable table resizing in the Telerik UI for Blazor Editor?

## Solution

Hide table resize handles, to prevent table resizing. The approach depends on the [Editor edit mode](slug:editor-edit-modes-overview):

* [Div mode](#div-mode) — use regular page CSS.
* [Iframe mode](#iframe-mode) — inject CSS into the iframe document with JavaScript.

### Div mode

When the Editor [`EditMode`](slug:editor-edit-modes-overview) is [`Div`](slug:editor-edit-modes-div), the editable area is part of the current page document and inherits its CSS.

>caption Hide table resize handles in the Telerik UI for Blazor Editor (Div mode)

````RAZOR
@using Telerik.Blazor.Components.Editor

<TelerikEditor EditMode="@EditorEditMode.Div"
               @bind-Value="@EditorValue"
               Tools="@EditorToolSets.All">
</TelerikEditor>

<style>
    /* Hide column resizers */
    .k-editor .ProseMirror .column-resize-handle,
    /* Hide row resizers */
    .k-editor .ProseMirror .row-resize-handle,
    /* Hide table resizers */
    .k-editor .ProseMirror table ~ .k-editor-resize-handle {
        display: none !important;
    }
</style>

@code {
    private string EditorValue { get; set; } = @"
<table>
    <tbody>
        <tr><td>R1C1</td><td>R1C2</td><td>R1C3</td></tr>
        <tr><td>R2C1</td><td>R2C2</td><td>R2C3</td></tr>
        <tr><td>R3C1</td><td>R3C2</td><td>R3C3</td></tr>
    </tbody>
</table>";
}
````

### Iframe mode

When the Editor [`EditMode`](slug:editor-edit-modes-overview) is [`Iframe`](slug:editor-edit-modes-iframe) (the default), the editable area is inside an `<iframe>` element that does not apply the CSS rules of the current page. You must [inject the CSS into the iframe document using JavaScript](https://feedback.telerik.com/blazor/1543925-add-the-ability-to-inject-css-files-into-the-iframe).

>caption Hide table resize handles in the Telerik UI for Blazor Editor (Iframe mode)

````RAZOR
@inject IJSRuntime JS
@using Telerik.Blazor.Components.Editor

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorToolSets.All">
</TelerikEditor>

@* suppress-error allows script tags inside Razor components as a workaround. *@
@* Move this script to an external JS file in production environment. *@
<script suppress-error="BL9992">
    function hideEditorTableResizeHandlesInIframe() {
        var iframe = document.querySelector(".k-editor iframe");
        if (!iframe) return;
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var style = doc.createElement("style");
        style.textContent = ".column-resize-handle, .row-resize-handle, table ~ .k-editor-resize-handle { display: none !important; }";
        doc.head.appendChild(style);
    }
</script>

@code {
    private string EditorValue { get; set; } = @"
<table>
    <tbody>
        <tr><td>R1C1</td><td>R1C2</td><td>R1C3</td></tr>
        <tr><td>R2C1</td><td>R2C2</td><td>R2C3</td></tr>
        <tr><td>R3C1</td><td>R3C2</td><td>R3C3</td></tr>
    </tbody>
</table>";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JS.InvokeVoidAsync("hideEditorTableResizeHandlesInIframe");
        }
    }
}
````

## See Also

* [Editor Edit Modes](slug:editor-edit-modes-overview)
* [Editor Built-in Tools](slug:editor-built-in-tools)
