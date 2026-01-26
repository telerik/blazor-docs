---
title: Paragraphs in List Items Cause Unwanted Line Space
description: How to remove extra white space in the Editor, which is caused by paragraph tags inside list item tags.
type: troubleshooting
page_title: Paragraphs in List Items Cause Extra White Space in the Blazor Editor
slug: editor-kb-paragraph-in-list-item
position:
tags: editor, styling
ticketid: 1551863, 1563286
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

The Blazor Editor adds unwanted HTML tags to the content. List items contain `<p>` tags around each item content. As a result, bullets are spread too far apart.

How can I get rid of the unwanted and unneeded paragraph tags, and the large spacing between list items?


## Possible Cause

List items show with some empty space in-between, because the Editor's [ProseMirror engine](https://prosemirror.net) always [inserts a `<p>` tag inside every `<li>` tag](https://discuss.prosemirror.net/t/removing-the-default-paragraph-p-inside-a-list-item-li/2745). This is how the engine handles block containers, although HTML standards don't require such an approach.

By default, HTML paragraphs have top and bottom margins.


## Solution

Here are the possible workarounds to remove extra empty space between list items:

* Remove the `<p>` tags via string manipulation of the submitted Editor value.
* Remove the paragraph margins with CSS in the app stylesheet. This is applicable when the Editor's [`EditMode`](slug:editor-edit-modes-overview) is [`Div`](slug:editor-edit-modes-div) and the Editor content is within the same web document as the Editor itself.
* Remove the paragraphs margins by injecting additional CSS into the Editor's iframe. This is applicable when the Editor's `EditMode` is [`Iframe`](slug:editor-edit-modes-iframe) and the Editor content is in a separate web document.

>caption Remove empty space between list items in the Editor

````RAZOR
@inject IJSRuntime js

<p>Div mode - the styling of the Editor content depends on the web page</p>
<TelerikEditor @bind-Value="@EditorValue" EditMode="@EditorEditMode.Div" Class="no-list-space" />

<style>
    .no-list-space li > p {
        margin: 0;
    }
</style>

<p>Iframe mode - the styling of the Editor content depends on the separate web document</p>
<TelerikEditor @bind-Value="@EditorValue" EditMode="@EditorEditMode.Iframe" Class="@EditorClass" />

<!-- The suppress-error attribute allows script tags inside Razor components. -->
<!-- Move this script to a proper place in production environment. -->
<script suppress-error="BL9992">//
    function injectEditorStyles(editorClass, editorStyles) {
        var doc = document.querySelector("." +editorClass + " .k-iframe").contentWindow.document;
        var head = doc.querySelector("head");
        var style = doc.createElement("style");
        style.type = "text/css";
        var css = editorStyles;
        style.appendChild(doc.createTextNode(css));
        head.appendChild(style);
    }
//</script>

<p>
    <TelerikButton OnClick="@RemovePTags">Get Editor Value Without P Tags</TelerikButton>
</p>

<TelerikTextArea @bind-Value="@EditorValueNoP" />

@code {
    string EditorValue { get; set; } = "<ul><li><p>foo</p></li><li><p>bar</p></li></ul>";
    string EditorStyles { get; set; } = "li > p { margin: 0; }";
    string EditorClass { get; set; } = "no-list-space";

    string EditorValueNoP { get; set; }

    void RemovePTags()
    {
        EditorValueNoP = EditorValue.Replace("<li><p>", "<li>").Replace("</p></li>", "</li>");
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await js.InvokeVoidAsync("injectEditorStyles", EditorClass, EditorStyles);
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## Notes

It is possible to [hack the ProseMirror engine and disable usage of `p` inside `li`](https://www.telerik.com/forums/remove-outer-p-tag-from-editor#5264679). However, this will break other features and is not recommended.


## See Also

* [How to render new line break in the Editor on Enter](slug:editor-kb-new-line-break)
