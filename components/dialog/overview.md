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

1. Add the `TelerikDialog` tag to add the component to your razor page.

2. Set the `Visible` parameter. It supports one-way and two-way binding.

3. Set the `Title` property.

4. Configure the `DialogContent` instance inside the `TelerikDialog` tag.

5. (optional) Configure the [`DialogButtons` instance]({%slug  dialog-action-buttons%}) inside the `TelerikDialog` tag.

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

The Dialog provides options for rendering action buttons and customizing their text. [Read more about the Dialog Action Buttons]({%slug dialog-action-buttons%}).

## Events

The Blazor Dialog generates events that you can handle and further customize its behavior. [Read more about the Blazor Dialog events]({%slug dialog-events%}).

## Parameters

The Blazor Dialog provides various parameters that allow you to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Visible` | `bool` | Defines the Dialog visibility. |
| `Title` | `string` | Defines the Dialog title. |
| `DialogTitle` | `RenderFragment` | Defines the title template of the component. |
| `DialogContent` | `RenderFragment` | Defines the content template of the component. |
| `DialogButtons` | `RenderFragment` | Defines the actions bar template of the component. |
| `ButtonsLayout` | `DialogButtonsLayout` enum <br /> `Stretched` | Defines the layout of the actions button in the footer. See more in the [Action Buttons article]({%slug  dialog-action-buttons%})). |
| `ShowCloseButton` | `bool` <br /> `true` | Defines the close behavior of the component - whether the component should render close flat button in the titlebar. See more in the [Header article]({%slug  dialog-header%}). |
| `CloseOnOverlayClick` | `bool` | Defines whether clicking on the modal overlay should close the Dialog. |
| `FocusedElementSelector` | `string` | Defines the CSS selector of the initially focused item on open. By default, it is the first focusable item in the dialog.
 |
| `Class` | `string` | Defines the class of the component instance. |
| `Width` | `string` | Defines the width of the Dialog. |
| `Height` | `string` | Defines the height of the Dialog. |

## Dialog Reference and Methods

The Dialog methods are accessible through its reference.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Method | Description |
| ----------- | ----------- |
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