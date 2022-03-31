---
title: Overview
page_title: Dialog Overview
description: Overview of the Dialog for Blazor.
slug: dialog-overview
tags: telerik,blazor,dialog,overview
published: True
position: 0
---

# Blazor Dialog Overview

The Dialog is a modal popup that brings information to the user. It provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the attention of the user. The main difference from the Window modal is the functionality for actions and predefined dialogs.

## Creating Blazor Dialog

1. Add the `TelerikDialog` tag to a Razor file.

2. Set the `Visible` parameter to a `bool` object. It supports one-way and two-way binding.

3. Set the `Title` property to a `string` object.

4. Define the `DialogContent` inside the `TelerikDialog` tag.

5. (optional) Configure the [`DialogButtons`]({%slug  dialog-action-buttons%}) inside the `TelerikDialog` tag.

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
        <TelerikButton OnClick="@(() => { Visible = false; })" ThemeColor="primary">Install update</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private bool Visible { get; set; } = true;
    private string Title { get; set; } = "Software Update";
}
````

## Predefined Dialogs

Predefined Dialogs are styled substitutes to the standard confirm, alert and prompt dialogs. They are separate from the main Dialog component. [Read more about the Blazor Predefined Dialogs]({%slug dialog-predefined%}).

## Header

The Dialog provides header customization. [Read more about the Dialog Header]({%slug dialog-header%}).

## Action Buttons

The Dialog provides options for rendering action buttons and customizing their text and layout. [Read more about the Dialog Action Buttons]({%slug dialog-action-buttons%}).

## Events

The Blazor Dialog fires a `VisibleChanged` event to customize the application behavior and respond to user actions. [Read more about the Blazor Dialog events]({%slug dialog-events%}).

## Dialog Parameters

The Blazor Dialog provides various parameters to configure the component. Also check the [Dialog public API](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDialog).

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `ButtonsLayout` | `DialogButtonsLayout` enum <br /> (`Stretched`) | Defines the layout of the actions button in the footer. See more in the [Action Buttons article]({%slug  dialog-action-buttons%})). |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-window k-dialog">` element. |
| `CloseOnOverlayClick` | `bool` | Defines if clicking on the modal overlay should close the Dialog. |
| `FocusedElementSelector` | `string` | Defines the CSS selector of the initially focused item on open. By default, it is the first focusable item in the dialog. |
| `Height` | `string` | Defines the height of the Dialog. |
| `ShowCloseButton` | `bool` <br /> (`true`) | Defines if the component will render a Close button in the titlebar. See more in the [Header article]({%slug  dialog-header%}). |
| `Title` | `string` | Defines the Dialog title. |
| `Visible` | `bool` | Defines the Dialog visibility. |
| `Width` | `string` | Defines the width of the Dialog. |


## Dialog Reference and Methods

The Dialog methods are accessible through its reference.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Method | Description |
| --- | --- |
| `Refresh` | Redraws the component. |

>caption Get a reference to the Dialog and use its methods.

````CSHTML
@* This code snippet showcases an example usage of the Refresh() method. *@

<TelerikButton  OnClick="OpenDialog">Open Dialog</TelerikButton>

<TelerikDialog @ref="DialogRef" @bind-Visible="_dialogVisible">
    <DialogContent>
        <p role="status">Current count: @_currentCount</p>
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="IncrementCount">Increment Count</TelerikButton>
        <TelerikButton OnClick="@(() => { _dialogVisible = false; })">Close</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    TelerikDialog DialogRef;

    private bool _dialogVisible;

    private int _currentCount = 0;

    private void IncrementCount()
    {
        _currentCount++;

        DialogRef.Refresh(); //Need refresh to reflect the change here.
    }

    private void OpenDialog()
    {
        _dialogVisible = true;
    }
}
````

## Next Steps

* [Customize the Dialog Header]({%slug dialog-header%})

* [Customize the Dialog Action Buttons]({%slug dialog-action-buttons%})

* [Explore the Predefined Dialogs]({%slug dialog-predefined%})

* [Handle the Dialog Events]({%slug dialog-events%})

## See Also

  * [Live Dialog Demos](https://demos.telerik.com/blazor-ui/dialog/overview)
  * [Dialog API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikDialog)