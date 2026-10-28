---
title: Display Multiline Text in a Predefined Alert
description: Display multiline text in a Telerik predefined Alert dialog and preserve line breaks.
type: how-to
page_title: How to Display Multiline Text in a Predefined Alert
slug: dialog-kb-dialogfactory-multiline-alert
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

The `AlertAsync` method accepts a `string`. Use a verbatim string to include line breaks in the message. The `white-space: pre-line` rule preserves those line breaks in the predefined Alert.

````RAZOR
<style>
    .k-dialog.k-alert .k-messagebox {
        white-space: pre-line;
    }
</style>

@code {
    [CascadingParameter]
    public DialogFactory? Dialogs { get; set; }

    private async Task ShowMultilineAlert()
    {
        if (Dialogs is not null)
        {
            await Dialogs.AlertAsync(@"Something went wrong!
mammaggia");
        }
    }
}
````

For HTML or richer content, use the [`TelerikDialog` component](slug:dialog-overview) and place the content in `DialogContent`.

## See Also

* [Predefined Dialogs](slug:dialog-predefined)
* [Setting Width to Predefined Dialogs](slug:dialog-kb-dialogfactory-alert-confirm-prompt-width)
