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

The Dialog component is a modal popup that displays information to the user. It is fully customizable and extends the `DialogBuilder` to provide you with a way to achieve complex UI popups.

## Basics

To add a Telerik Dialog to your Blazor app:

1. Add the `TelerikDialog` tag.
1. Set the `Visible` parameter via one-way or two-way binding..
1. Set a `Title`.
1. Optionally, choose a `ButtonsLayout` (from the `DialogButtonsLayout` enums).
    * Its default layout is `DialogButtonsLayout.Stretched`. See more in the [Action Buttons article]({%slug  dialog-action-buttons%})).
1. Optionally, set its `ShowCloseButton` parameter (true/false).
    * Its **true** by default. See more in the [Header article]({%slug  dialog-header%}).

The following example demonstrates how to set up the Dialog with its default configuration.

>caption A basic configuration of the Telerik Dialog.

````CSHTML
@* An example of the Dialog basic implementation. *@

<TelerikDialog @bind-Visible="@Visible"
               Title="@Title">
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

>caption The result from the above code snippet.

![](images/dialog-basic-overview.png)

## Features

>caption The Dialog provides the following features:

* `Title` - `string` - defines the title of the Dialog.

* `Visible` - `bool` - defines the visibility of the Dialog.

* `DialogTitle` - `RenderFragment` - defines the title template of the component.

* `DialogContent` - `RenderFragment` - defines the content template of the component.

* `DialogButtons` - `RenderFragment` - defines the actions bar template of the component.

* `ButtonLayout` - `enum`- `DialogButtonsLayout` - defines the layout of the actions button in the footer.

* `VisibleChanged` - `EventCallback<false>` - triggers when the visibility of the component changes.

* `Class` - `string` - defines the class of the component instance.

* `Width` - `string` - defines the width of the Dialog.

* `Height` - `string` - defines the height of the Dialog.

* `ShowCloseButton` - `bool` - defines the close behavior of the component - whether the component should render close flat button in the titlebar.

* `CloseOnOverlayClick` - `bool` - defines whether clicking the overlay should close the dialog.

* `FocusedElementSelector` - `string` - defines the queryselector of the initially focused item on open. By default, it is the first focusable item in the dialog.

## See Also

  * [Live Demo: Dialog](https://demos.telerik.com/blazor-ui/dialog/overview)