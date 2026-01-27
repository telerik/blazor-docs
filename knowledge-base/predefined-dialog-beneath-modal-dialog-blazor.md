---
title: Resolving Predefined Dialog Rendering Beneath Modal Dialog in Blazor
description: Learn how to address the issue of a predefined confirmation dialog appearing beneath a modal dialog in Blazor.
type: how-to
page_title: Fixing Predefined Dialog Display Order in Telerik Blazor Dialog
slug: predefined-dialog-beneath-modal-dialog-blazor
tags: dialog, blazor, zindex, predefined-dialog, modal-dialog, visiblechanged, workaround
res_type: kb
ticketid: 1686792
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
            <td>7.1.0 and earlier</td>
        </tr>
    </tbody>
</table>

## Description

When using the [Dialog](https://www.telerik.com/blazor-ui/documentation/components/dialog/overview) component in Blazor, you may encounter an issue where a predefined confirmation dialog appears beneath an already open modal dialog. This can occur when handling logic in the `VisibleChanged` event of the main dialog, such as displaying a confirmation prompt before closing the modal. The root cause is related to the `z-index` of the dialog components.

This knowledge base article also answers the following questions:
- How can I ensure the predefined dialog appears above the modal dialog?
- What workaround addresses z-index issues with predefined dialogs?
- How to prevent predefined dialogs from rendering behind other components?

## Solution

To resolve the issue, you have two options:

You can hide the close button of the main modal dialog via the `ShowCloseButton` Parameter, then handle the visibility of each dialog manually in a method.

Or, you can apply a workaround to adjust the `z-index` of the predefined dialog.

### Set `ShowCloseButton` to `false`

Set the `ShowCloseButton` parameter of the main modal dialog to `false`, and move the confirmation logic to a button within the modal dialog. This ensures the predefined dialog does not overlap with the modal.

````razor
<TelerikDialog ShowCloseButton="false" @bind-Visible="@Visible">
    <DialogContent>
        Dialog Content
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@OnShowConfirm">ShowDialog</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    [CascadingParameter]
    private DialogFactory? Dialogs { get; set; }

    private bool Visible { get; set; } = true;

    private async Task OnShowConfirm()
    {
        bool isConfirmed = await Dialogs!.ConfirmAsync("Are you sure?");

        if (isConfirmed)
        {
            Console.WriteLine("The user is sure, continue.");
            Visible = false;
        }
        else
        {
            Console.WriteLine("The user changed their mind.");
        }
    }
}
````

### Adjust the `z-index` Dynamically

Use JavaScript to dynamically adjust the `z-index` of the predefined dialog. This ensures it appears above the modal dialog. The approach targets the dialog wrapper using CSS selectors and modifies its `z-index` style.

> This workaround relies on CSS selectors which may change in future updates of the Telerik theme. Use this approach with caution.

>caption JavaScript

````javascript.skip-repl
function bringDialogToTop() {
    var dialogWrapper = document.querySelector(".k-window.k-dialog.k-alert").closest(".k-dialog-wrapper");
    if (dialogWrapper) {
        dialogWrapper.style.zIndex = parseInt(dialogWrapper.style.zIndex) + 2;
    }
}
````

>caption Razor

````razor
@inject IJSRuntime js

<TelerikDialog Visible="@Visible" VisibleChanged="OnDialogClosingAsync">
</TelerikDialog>

@code{
    [CascadingParameter]
    private DialogFactory Dialogs { get; set; }

    private bool Visible { get; set; } = true;
    private bool ShouldFocusDialog { get; set; }

    private async Task OnDialogClosingAsync(bool currentVisibility)
    {
        ShouldFocusDialog = true;
        await ShowConfirm(currentVisibility);

    }

    private async Task ShowConfirm(bool currentVisibility)
    {
        bool isConfirmed = await Dialogs.ConfirmAsync("Are you sure?");

        if (isConfirmed)
        {
            Console.WriteLine("The user is sure, continue.");
            Visible = currentVisibility;

        }
        else
        {
            Console.WriteLine("The user changed their mind");
          
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldFocusDialog)
        {
            ShouldFocusDialog = false;
            await Task.Delay(1);

            await js.InvokeVoidAsync("bringDialogToTop");
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## See Also

- [Dialog Overview](slug:dialog-overview)
- [VisibleChanged Event](slug:dialog-events#visiblechanged)
- [Predefined Dialogs](slug:dialog-predefined)
