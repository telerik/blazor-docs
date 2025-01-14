---
title: Line Breaks instead of Paragraphs on Editor Enter
description: How to render new line breaks in the Blazor Editor on Enter key press? How to set br tags by default on Enter, instead of new paragraphs?
type: how-to
page_title: How to render new line break in the Editor on Enter
slug: editor-kb-new-line-break
position: 
tags: editor, line, paragraph
ticketid: 1555336, 1559892
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

How to configure the Editor to use line breaks (single line spacing), instead of paragraphs (double line spacing)? Users wish to go to the next line when they press the Enter key, with no extra white space in-between.

Is it possible to change the default behavior of [Enter] to output a `<br />` tag? It's easier, compared to using [Shift] + [Enter].

## Current Behavior

The Blazor Editor does not have a setting to switch between new paragraphs (`<p>`) and new lines (`<br />`) on [Enter]. The built-in behavior is:

* [Enter] produces a new paragraph (or list item, etc.).
* [Shift] + [Enter] produces a new line break.

Here is some more context.

## ProseMirror Engine

The Telerik Blazor Editor uses the [**ProseMirror engine**](https://prosemirror.net). The [Enter] behavior depends on the engine.

The Editor can render `<br />` tags instead of `<p>` tags if you [use a ProseMirror plugin](slug://editor-prosemirror-plugins) that changes the default engine behavior.

## Side Effects

Our experience with rich HTML Editors shows that using `<br />` tags instead of `<p>` tags can be a fragile feature with unexpected side effects. A lot of core engine functionality relies on paragraphs (or block wrappers in general). That's why we have not been pushing this as a built-in feature so far (the demand is very low too).

## Possible Workarounds

If your concern is mainly related to the empty space around paragraphs, these can easily be removed with CSS styles, [even when the Editor is in Iframe mode](https://www.telerik.com/forums/telerikeditor-allowing-style-tags) and the editable content is in a separate web document.

Other alternatives may be:

* Hint end users to use [Shift] + [Enter] instead of [Enter] for `<br />` tags.
* Strip the `<p>` tags from the Editor value after submit, and replace them with `<br />`'s. In this case, test the resulting HTML content with the Editor again and see how all enabled tools behave.
