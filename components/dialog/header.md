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

The header contains the `Title` and the `Close Action` button.

There are two ways to define a Dialog title:
* a string `Title` attribute of the component
* a nested `<DialogTitle>` template.

The default `Title` value is `null`.

You can control the close action via the `ShowCloseButton` parameter. Its default value is `true`.

> If you don't want to render the header, set the `ShowCloseButton` to `false` and don't set a `Title`.

## Example

The following example demonstrates how to set up the title through a template. The close action button is also hidden.

>caption The result from the code snippet.

![](images/dialog-header.png)

>caption Title template and no close button in the Telerik Dialog.

````CSHTML
@* An example of a title template and hidden button for closing. *@

<TelerikDialog @bind-Visible="@Visible" ShowCloseButton="false">
    <DialogTitle>
        <TelerikIcon IconClass="k-icon k-i-star"></TelerikIcon>
        <strong>@Title</strong>
    </DialogTitle>
    <DialogContent>
        <br />
        <div>--- Place here the Dialog content ---</div>
        <br />
    </DialogContent>
    <DialogButtons>
        <TelerikButton Primary="true" OnClick="@(() => { Visible = false; })">Cancel</TelerikButton>
        <TelerikButton OnClick="@(() => { Visible = false; })">OK</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private bool Visible { get; set; } = true;
    private string Title { get; set; } = "Title here";
}
````