---
title: Replace the CreateLink Tool in the Editor
description: Replace the built-in CreateLink tool in the Telerik Editor for Blazor with a custom hyperlink dialog.
type: how-to
page_title: How to Replace the CreateLink Tool in the Telerik Editor for Blazor
slug: editor-kb-custom-create-link-tool
tags: telerik, blazor, editor, custom tool, hyperlink
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
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Replace the built-in `CreateLink` tool with a custom tool that opens a dialog with custom hyperlink fields.

## Solution

Remove `CreateLink` from the `Tools` collection and add a custom tool that opens a [`TelerikDialog`](slug:dialog-overview). After the user enters the link details, execute the Editor `createLink` command with `LinkCommandArgs`.

The following example creates a toolbar without the built-in `CreateLink` tool and uses a custom dialog instead:

````RAZOR
@using Telerik.Blazor.Components.Editor

<TelerikEditor @ref="@EditorRef"
               Tools="@Tools"
               @bind-Value="@EditorValue">
    <EditorCustomTools>
        <EditorCustomTool Name="CustomCreateLink">
            <TelerikButton OnClick="@OpenLinkDialog">Insert Hyperlink</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

<TelerikDialog @bind-Visible="@LinkDialogVisible" Title="Insert Hyperlink">
    <DialogContent>
        <label for="link-url">URL</label>
        <TelerikTextBox Id="link-url" @bind-Value="@LinkUrl" />

        <label for="link-text">Text</label>
        <TelerikTextBox Id="link-text" @bind-Value="@LinkText" />

        <label for="link-title">Title</label>
        <TelerikTextBox Id="link-title" @bind-Value="@LinkTitle" />
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@ApplyLink">Insert</TelerikButton>
        <TelerikButton OnClick="@CloseLinkDialog">Cancel</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private TelerikEditor EditorRef { get; set; }

    private string EditorValue { get; set; } = "<p>Select text, then insert a link.</p>";

    private List<IEditorTool> Tools { get; set; } = new()
    {
        new Bold(),
        new CustomTool("CustomCreateLink"),
        new Unlink()
    };

    private bool LinkDialogVisible { get; set; }

    private string LinkUrl { get; set; } = "https://www.example.com";

    private string LinkText { get; set; } = "Example link";

    private string LinkTitle { get; set; } = "Example link";

    private void OpenLinkDialog()
    {
        LinkDialogVisible = true;
    }

    private void CloseLinkDialog()
    {
        LinkDialogVisible = false;
    }

    private async Task ApplyLink()
    {
        await EditorRef.ExecuteAsync(new LinkCommandArgs(LinkUrl, LinkText, "_blank", LinkTitle, null));
        LinkDialogVisible = false;
    }
}
````

The browser owns the current text selection. Preserve the selection before opening the custom dialog if the command has to apply to selected text. For more information, see [getting the selected content from the Editor](slug:editor-kb-get-selection).

## See Also

* [Editor Custom Tools](slug:editor-custom-tools)
* [Editor Built-in Tools](slug:editor-built-in-tools)