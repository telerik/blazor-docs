---
title: Keep the content in the DOM when the Window is closed
description: How to keep the Window content in the DOM when the component is closed?
type: how-to
page_title: Keep the content in the DOM when the Window is closed
slug: window-kb-keep-content-when-closed
position: 
tags: window, keep , save , preserve, dom, close, disposed
ticketid: 1598259
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor, <br /> Dialog for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When the `Visible` parameter is set to `false` the Window content is disposed from the DOM. I want to keep the content in the DOM when the user closes the Window. How to achieve this?

How to preserve the Window content upon closing?

Is it possible to close/hide the Window with CSS?

## Solution

To achieve the desired result you can toggle the visibility of the Window with CSS. For that purpose:

1. Create a [custom "Close" action]({%slug components/window/actions%}#custom-actions).
1. Handle the [`OnClick`]({%slug button-events%}#onclick) event of the action button to apply the needed CSS.

The further steps will vary depending on whether or not the [Window is modal]({%slug components/window/modal%}). Only the second approach allpies to the [Dialog]({%slug dialog-overview%}) as it is always modal by design. See details and examples below:
* [Custom close for non-modal Window](#custom-close-for-non-modal-window)
* [Custom close for modal Window and Dialog](#custom-close-for-modal-window-and-dialog)

### Custom close for non-modal Window

The next steps for custom closing a non-modal Window are:

3. In the `OnClick` handler of the custom close action, set a custom CSS class to the Window through the `Class` parmeter.

4. Use this class to add `display: none;` rule to the Window.

5. Clear this class when the user opens the Window to revert the custom style and display the componet.

````CSHTML
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
                      Icon="@FontIcon.X"
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

### Custom close for modal Window and Dialog

The [modal Window]({%slug components/window/modal%}) and the [Dialog]({%slug dialog-overview%}) have a different rendering. They are wrapped in a `<div class="k-dialog-wrapper">` which contains both the Window/Dialog and the overlay. To allow the user interact with the page while the Window/Dialog is hidden you also need to hide the overlay.

The next steps for custom closing a modal Window or Dialog are:

3. In the `OnClick` handler of the custom close action, toggle a flag to indicate the user wants to hide the Window.

4. Based on this flag value, conditionally apply `display: none;` rule to the `<div class="k-dialog-wrapper">`. This will hide both the Window/Dialog and the overlay.

5. Toggle back the flag when the user opens the Window/Dialog to revert the custom style and display the component.

> With this approach the application cannot use other modal Windows or Dialogs. 

````CSHTML
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
                      Icon="@FontIcon.X"
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

## Notes

The current approach is based on simply hiding the Window in order to preserve its content on the DOM. Thus, the Window will never be treated as really closed. In this scenario, user actions such as [pressing Esc](https://demos.telerik.com/blazor-ui/window/keyboard-navigation) or [clicking on the overlay of a modal Window]({%slug components/window/modal%}) will not close the Window as there is no actual "Close" command. If needed, they have to be additionally implemented in a custom manner.
