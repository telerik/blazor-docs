---
title: Focus Button or TextBox on Window Open
description: Learn how to focus a button, textbox, or any component when the Telerik Window for Blazor opens.
type: how-to
page_title: How to Focus Button or TextBox on Window Open
slug: window-kb-focus-button
position: 
tags: telerik, blazor, window, dialog
ticketid: 1659021
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

This KB article answers the following questions:

* How to set default focus to a Button in a TelerikWindow?
* How to focus a button or a textbox inside a Window when the Window is made visible?
* How to focus a component when the Window shows?


## Solution

To focus any element or component in the [Telerik Window for Blazor]({%slug dialog-overview%}), follow the steps below. They are also applicable for the [Telerik Dialog component]({%slug dialog-overview%}).

1. Raise a `bool` flag when showing the Window.
1. Check the boolean flag's value in `OnAfterRenderAsync()`.
1. Use a small `Task.Delay()` to wait for the Window to display and gain focus.
1. Focus the desired button, textbox, or input component. If it's a Telerik Blazor component, use the [`FocusAsync()` method]({%slug inputs-kb-focus%}).


````CSHTML
<TelerikButton OnClick="@ShowWindow">Show Window</TelerikButton>

<TelerikWindow @bind-Visible="@WindowVisible"
               Modal="true">
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        <TelerikButton @ref="@ButtonRef"
                       OnClick="@( () => { } )">Click Me</TelerikButton>
        <br />
        @(DateTime.Now.ToString("HH:mm:ss")).@DateTime.Now.Millisecond
    </WindowContent>
</TelerikWindow>

@code {
    private TelerikButton? ButtonRef { get; set; }

    private bool WindowVisible { get; set; }

    private bool ShouldFocusButton { get; set; }

    private void ShowWindow()
    {
        WindowVisible = true;
        ShouldFocusButton = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldFocusButton && ButtonRef != null)
        {
            ShouldFocusButton = false;
            // Wait for the Window to gain focus and then steal it
            await Task.Delay(200);
            await ButtonRef.FocusAsync();
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````


## See Also

* [Window Overview]({%slug window-overview%})
* [Focus Telerik Input Components]({%slug inputs-kb-focus%})
