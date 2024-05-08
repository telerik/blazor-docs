---
title: Header
page_title: Dialog Header
description: Header of the Dialog for Blazor.
slug: dialog-header
tags: telerik,blazor,dialog,header
published: True
position: 5
---

# Dialog Header

The header contains the `Title` and the [`Close Action` button]({%slug dialog-action-buttons%}).

There are two ways to define a Dialog title:
* a string `Title` attribute of the component
* a nested `<DialogTitle>` render fragment.

The default `Title` value is `null`.

You can control the close action via the `ShowCloseButton` parameter. Its default value is `true`.

> If you don't want to render the header, set the `ShowCloseButton` to `false` and don't set a `Title`.

## Example

The following example demonstrates how to set up the title through a template. The close action button is also hidden.

>caption Title template and no close button in the Telerik Dialog.

````CSHTML
@* An example of a title template and hidden button for closing. *@

<TelerikDialog @bind-Visible="@Visible" ShowCloseButton="false">
    <DialogTitle>
        <TelerikSvgIcon IconClass="k-icon k-i-caret-double-alt-up"></TelerikSvgIcon>
        <strong>@Title</strong>
        <TelerikSvgIcon IconClass="k-icon k-i-caret-double-alt-up"></TelerikSvgIcon>
    </DialogTitle>
    <DialogContent>
        A new version of <strong>Telerik UI for Blazor</strong> is available. Would you like to download and install it now?
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@(() => { Visible = false; })">Skip this version</TelerikButton>
        <TelerikButton OnClick="@(() => { Visible = false; })">Remind me later</TelerikButton>
        <TelerikButton OnClick="@(() => { Visible = false; })" ThemeColor="primary">Install update</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private bool Visible { get; set; } = true;
    private string Title { get; set; } = "Software Update";
}
````

## See Also

* [(KB) Keep Content in the DOM When the Window Is Closed]({%slug window-kb-keep-content-when-closed%})
