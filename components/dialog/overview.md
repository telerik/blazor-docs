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

The <a href="https://www.telerik.com/blazor-ui/dialog" target="_blank">Blazor Dialog component</a> is a modal popup that brings information to the user. It provides actions through its action buttons to prompt the user for input or to ask for a decision. The component can also contain more complex UI elements that require the attention of the user.

The Dialog component and its [predefined options](slug:dialog-predefined) aim to deliver user experience similar to default browser dialogs. For more functionalities such as drag and resize, use the [Window](slug:window-overview) component.

## Creating Blazor Dialog

1. Add the `TelerikDialog` tag to a Razor file.

2. Set the `Visible` parameter to a `bool` object. It supports one-way and two-way binding.

3. Set the `Title` property to a `string` object.

4. Set the Dialog content through the `DialogContent` RenderFragment parameter

5. (optional) Configure the [`DialogButtons`](slug:dialog-action-buttons) inside the `TelerikDialog` tag.

>caption A basic configuration of the Telerik Dialog.

<demo metaUrl="client/dialog/overview/" height="400"></demo>

## Predefined Dialogs

Predefined Dialogs are styled substitutes to the standard browser dialogs - confirm, alert and prompt. [Read more about the Blazor Predefined Dialogs](slug:dialog-predefined).

## Header

The Dialog allows header customization and gives the option to toggle the close button. [Read more about the Dialog Header](slug:dialog-header).

## Action Buttons

The Dialog provides options for rendering action buttons and customizing their text and layout. [Read more about the Dialog Action Buttons](slug:dialog-action-buttons).

## Events

The Blazor Dialog fires a `VisibleChanged` event to customize the application behavior and respond to user actions. [Read more about the Blazor Dialog events](slug:dialog-events).

## Dialog Parameters

The Blazor Dialog provides various parameters to configure the component. Also check the [Dialog public API](slug:Telerik.Blazor.Components.TelerikDialog).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `ButtonsLayout` | `DialogButtonsLayout` enum <br /> (`Stretch`) | The layout of the actions button in the footer. See more in the [Action Buttons article](slug:dialog-action-buttons)). |
| `Class` | `string` | A custom CSS class to the `<div class="k-window k-dialog">` element. |
| `CloseOnOverlayClick` | `bool` | Defines if clicking on the modal overlay should close the Dialog. |
| `FocusedElementSelector` | `string` | The CSS selector of the initially focused item on open. By default, it is the first focusable item in the Dialog. |
| `Height` | `string` | The height of the Dialog in any [supported CSS unit](slug:common-features/dimensions). |
| `ShowCloseButton` | `bool` <br /> (`true`) | Defines if the component will render a Close button in the titlebar. See more in the [Header article](slug:dialog-header). |
| `ThemeColor` | `string` | A predefined color scheme for the Dialog, especially the titlebar. Use the available members of the static class [`ThemeConstants.Dialog.ThemeColor`](slug:Telerik.Blazor.ThemeConstants.Dialog.ThemeColor). |
| `Title` | `string` | The Dialog title. |
| `Visible` | `bool` | Defines the Dialog visibility. |
| `Width` | `string` | The width of the Dialog in any [supported CSS unit](slug:common-features/dimensions). |


## Dialog Reference and Methods

The Dialog methods are accessible through its reference.

| Method | Description |
| --- | --- |
| `Refresh` | Re-renders the Dialog. <br /> The Dialog is rendered as a child of the [`TelerikRootComponent`](slug:rootcomponent-overview), instead of where it is declared. As a result, it doesn't automatically refresh when its content is updated. In such cases, the `Refresh` method comes in handy to ensure that the Dialog content is up-to-date. |

>caption Get a reference to the Dialog and use its methods.

````RAZOR
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

* [Customize the Dialog Header](slug:dialog-header)

* [Customize the Dialog Action Buttons](slug:dialog-action-buttons)

* [Explore the Predefined Dialogs](slug:dialog-predefined)

* [Handle the Dialog Events](slug:dialog-events)

## See Also

* [Live Dialog Demos](https://demos.telerik.com/blazor-ui/dialog/overview)
* [Dialog API Reference](slug:Telerik.Blazor.Components.TelerikDialog)
* [Comparison between All Popup Components](slug:common-kb-popup-component-comparison)
