---
title: Overview
page_title: Dialog Overview
description: Overview of the Dialog for Blazor.
slug: dialog-overview
tags: telerik,blazor,dialog,overview
published: True
position: 0
---

# Dialog Overview

The Dialog is a modal popup that brings information to the user. It provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the attention of the user. The main difference from the Window modal is the functionality for actions and predefined dialogs.

## Basics

To add a Telerik Dialog to your Blazor app:

1. Add the `TelerikDialog` tag.
1. Set the `Visible` parameter via one-way or two-way binding.
1. Set a `Title`.

The following example demonstrates how to set up the Dialog with its default configuration.

>caption A basic configuration of the Telerik Dialog.

````CSHTML
@* An example of the Dialog basic implementation. *@

<TelerikDialog @bind-Visible="@Visible"
               Title="@Title">
    <DialogContent>
        A new version of <strong>Telerik UI for Blazor</strong> is available. Would you like to download and install it now?
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@(() => { Visible = false; })">Skip this version</TelerikButton>
        <TelerikButton OnClick="@(() => { Visible = false; })">Remind me later</TelerikButton>
        <TelerikButton OnClick="@(() => { Visible = false; })" Primary="true">Install update</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private bool Visible { get; set; } = true;
    private string Title { get; set; } = "Software Update";
}
````

>caption The result from the above code snippet.

![](images/dialog-basic-configuration.png)

## Features

The Dialog provides the following features:

* `Visible` - `bool` - defines the visibility of the Dialog.

* `Title` - `string` - defines the title of the Dialog.

* `DialogTitle` - `RenderFragment` - defines the title template of the component.

* `DialogContent` - `RenderFragment` - defines the content template of the component.

* `DialogButtons` - `RenderFragment` - defines the actions bar template of the component.

* `ButtonsLayout` - `enum`- `DialogButtonsLayout` - defines the layout of the actions button in the footer. The default layout is `DialogButtonsLayout.Stretched`. See more in the [Action Buttons article]({%slug  dialog-action-buttons%})).

* `ShowCloseButton` - `bool` - defines the close behavior of the component - whether the component should render close flat button in the titlebar. Its **true** by default. See more in the [Header article]({%slug  dialog-header%}).

* `CloseOnOverlayClick` - `bool` - defines whether clicking on the modal overlay should close the Dialog.

* `FocusedElementSelector` - `string` - defines the CSS selector of the initially focused item on open. By default, it is the first focusable item in the dialog.

* `Class` - `string` - defines the class of the component instance.

* `Width` - `string` - defines the width of the Dialog.

* `Height` - `string` - defines the height of the Dialog.

## See Also

  * [Live Demo: Dialog](https://demos.telerik.com/blazor-ui/dialog/overview)