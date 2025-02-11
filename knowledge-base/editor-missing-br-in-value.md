---
title: Missing BR Tags in Editor HTML Value
description: Missing BR Tags in Editor HTML Value
type: troubleshooting
page_title: Missing BR Tags in Editor HTML Value
slug: editor-kb-missing-br-tags-in-value
position: 
tags: telerik, blazor, editor
ticketid: 1628534
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Editor for Blazor</td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>4.6.0 +</td>
        </tr>
    </tbody>
</table>


## Description

This KB article addresses the following questions or issues:

* Multiple newlines in the Editor are represented by empty paragraphs and are not visible when rendered outside the Editor.
* Why empty paragraphs look different in the Editor and outside the Editor?
* Why empty paragraphs in the Editor don't show afterwards on the web page?


## Cause

By default, empty paragraphs do not occupy any space on the web page. Here is why empty paragraphs look different inside and outside the Editor:

Note that the Editor uses the [ProseMirror engine](https://prosemirror.net). By design, the engine inserts a `<br />` tag in every empty `<p></p>`. This ensures that each empty paragraph takes up visible space and the user can distinguish it, focus it, and type inside. Since version 4.6.0, the Editor `Value` does not contain these "service" `<br />` tags anymore.


## Suggested Workarounds

* Expand the empty paragraphs with CSS.
* Add `&nbsp;` or `<br />` tags to the resulting HTML markup before rendering it on the web page.

> The Editor will insert an additional `<br />` tag to empty paragraphs even if they already contains one, for example, `<p><br /></p>`. So adding `<br />` to all empty paragraphs in the database may not be optimal for future editing.

>caption Render empty paragraphs from the Editor Value

````RAZOR
<TelerikEditor @bind-Value="@EditorValue"
               EditMode="@EditorEditMode.Div"
               Height="180px" />

<h2>Editor Value</h2>

@EditorValue

<h2>Editor Value on Page</h2>

@(new MarkupString(EditorValue))

<div style="display: flex; gap: 3em; flex-wrap: wrap;">
    <div>
        <h2>CSS Workaround</h2>

        <div class="empty-p-tags">
            @(new MarkupString(EditorValue))
        </div>

        <style>
            .empty-p-tags p:empty::before {
                content: " ";
                white-space: pre;
            }
        </style>
    </div>

    <div>
        <h2>&amp;nbsp; Workaround</h2>

        @(new MarkupString(EditorValue.Replace("<p></p>", "<p>&nbsp;</p>")))
    </div>

    <div>
        <h2>&lt;BR /&gt; Workaround</h2>

        @(new MarkupString(EditorValue.Replace("<p></p>", "<p><br /></p>")))
    </div>
</div>

@code {
    private string EditorValue { get; set; } = "<p>Paragraph 1.</p><p></p><p>Paragraph 3.</p>";
}
````


## See Also

* [Editor Paste Cleanup](slug:editor-paste-cleanup)
