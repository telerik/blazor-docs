---
title: Display Multiline Text in a Predefined Alert
description: Display multiline text in a Telerik predefined Alert dialog and preserve line breaks.
type: how-to
page_title: How to Display Multiline Text in a Predefined Alert
slug: dialog-kb-dialogfactory-multiline-alert
position:
tags: telerik, blazor, dialog, alert, multiline, newline
res_type: kb
components: ["dialog"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Dialog for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Display a multiline message in a predefined `AlertAsync` dialog.

## Solution

The `AlertAsync` method accepts a `string`. Use the `\n` escape sequence or a verbatim string to include a line break in the message.

````RAZOR
@code {
    private async Task ShowMultilineAlert()
    {
        await Dialogs.AlertAsync("Something went wrong!\nmammaggia");
    }
}
````

The predefined Alert renders the message as text. Do not convert a `MarkupString` to a string or pass `<br />` markup to `AlertAsync`, because the method does not accept HTML content. If the active theme collapses newline characters, preserve them with a scoped CSS rule:

````CSS
.k-dialog.k-alert .k-messagebox {
    white-space: pre-line;
}
````

For HTML or richer content, use the [`TelerikDialog` component](slug:dialog-overview) and place the content in `DialogContent`.

## See Also

* [Predefined Dialogs](slug:dialog-predefined)
* [Setting Width to Predefined Dialogs](slug:dialog-kb-dialogfactory-alert-confirm-prompt-width)
