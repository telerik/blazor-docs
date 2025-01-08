---
title: Keep the Content in the DOM When the Window Is Closed
description: Learn how to keep the content of the Telerik UI for Blazor Window in the DOM when the component is closed.
type: how-to
page_title: Keep Content in DOM When Blazor Window Is Closed
slug: window-kb-keep-content-when-closed
tags: telerikui, blazor, window, keep, save, preserve, dom, close, disposed
ticketid: 1598259
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Dialog for Blazor,<br />
                Window for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

When the `Visible` parameter is set to `false`, the Window content is disposed from the DOM. How can I keep the content in the DOM when the user closes the Window? How can I preserve the Window content upon closing? Is it possible to close or hide the Window with CSS?

## Solution

To achieve the desired result, toggle the visibility of the Window with CSS:

1. Create a [custom **Close** action](slug://components/window/actions#custom-actions).
1. Handle the [`OnClick`](slug://button-events#onclick) event of the action button to apply the needed CSS.

The further steps will vary depending on whether or not the [Window is modal](slug://components/window/modal). Only the second approach applies to the [Dialog](slug://dialog-overview) as it is always modal by design.

For more details on the suggested approaches, refer to the following examples in the section:
* [Customizing the closing action of non-modal Windows](#custom-close-for-non-modal-windows)
* [Customizing the closing action of modal Windows and Dialogs](#custom-close-for-modal-windows-and-dialogs)

> The suggested implementations are based on hiding the Window and preserving its content in the DOM. As a result, the component is never treated as really closed and user actions such as [pressing the `Esc` key](https://demos.telerik.com/blazor-ui/window/keyboard-navigation) or [clicking the overlay of a modal Window](slug://components/window/modal) will not close the Window as no **Close** command is actually defined. If needed, you have to implement the required behavior in a custom manner.

### Custom Close for Non-Modal Windows

To customize the closing of a non-modal Window:

1. In the `OnClick` handler of the custom **Close** action, set a custom CSS class to the Window through the `Class` parameter.
1. Use this class to add the `display: none;` rule to the Window.
1. Clear this class when the user opens the Window to revert the custom style and display the component.

````RAZOR
@*Hide Window with CSS to preserve its content*@

@using System.ComponentModel.DataAnnotations

<style>
    .hidden-window {
        display: none;
    }
</style>

<TelerikWindow @bind-Visible="@WindowRendered"
               Class="@WindowClass">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>

        <TelerikForm Model="@person">
            <FormValidation>
                <DataAnnotationsValidator />
            </FormValidation>
        </TelerikForm>

    </WindowContent>
    <WindowActions>
        <WindowAction Name="CustomClose"
                      Icon="@SvgIcon.X"
                      OnClick="@CustomCloseHandler" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@OpenWindowHandler">Open Window</TelerikButton>

@code {
    private bool WindowRendered { get; set; }

    private string WindowClass { get; set; }

    private void CustomCloseHandler()
    {
        WindowClass = "hidden-window";
    }

    private void OpenWindowHandler()
    {
        if (!WindowRendered)
        {
            WindowRendered = true;
        }

        WindowClass = "";
    }

    private Person person = new Person();

    public class Person
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        public DateTime? DOB { get; set; }
    }
}
````

### Custom Close for Modal Windows and Dialogs

The [modal Window](slug://components/window/modal) and [Dialog](slug://dialog-overview) components have a different rendering. They are wrapped in a `<div class="k-dialog-wrapper">` which contains both the component and the overlay. To allow the user to interact with the page while the Window or Dialog is hidden, you also need to hide the overlay.

To customize the closing of a modal Window or Dialog:

1. In the `OnClick` handler of the custom close action, toggle a flag to indicate the user wants to hide the Window.
1. Based on this flag value, conditionally apply the `display: none;` rule to `<div class="k-dialog-wrapper">`. As a result, both the Window or Dialog and the overlay will be hidden.
1. Toggle back the flag when the user opens the Window or Dialog to revert the custom style and display the component.

> The suggested approach prevents the application from using other modal Windows or Dialogs.

````RAZOR
@*Hide modal Window with CSS to preserve its content*@

@using System.ComponentModel.DataAnnotations

@if (WindowHidden)
{
    <style>
        .k-dialog-wrapper {
            display: none;
        }
    </style>
}

<TelerikWindow @bind-Visible="@WindowRendered"
               Modal="true">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>

        <TelerikForm Model="@person">
            <FormValidation>
                <DataAnnotationsValidator />
            </FormValidation>
        </TelerikForm>

    </WindowContent>
    <WindowActions>
        <WindowAction Name="CustomClose"
                      Icon="@SvgIcon.X"
                      OnClick="@CustomCloseHandler" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@OpenWindowHandler">Open Window</TelerikButton>

@code {
    private bool WindowRendered { get; set; }

    private bool WindowHidden { get; set; }

    private void CustomCloseHandler()
    {
        WindowHidden = true;
    }

    private void OpenWindowHandler()
    {
        if (!WindowRendered)
        {
            WindowRendered = true;
        }

        WindowHidden = false;
    }

    private Person person = new Person();

    public class Person
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        public DateTime? DOB { get; set; }
    }
}
````
