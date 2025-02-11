---
title: Focus Button or TextBox on Window Open
description: Learn how to focus a button, input, textbox, or any component when the Telerik Window for Blazor opens.
type: how-to
page_title: How to Focus Button or TextBox on Window Open
slug: window-kb-focus-button-textbox-on-open
position: 
tags: telerik, blazor, window, dialog
ticketid: 1486212, 1513605, 1610413, 1659021
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Dialog for Blazor, <br /> Window for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to set default focus to a TextBox or a Button in a Telerik UI for Blazor Window?
* How to focus a button or a textbox inside a Window when the Window is made visible?
* How to focus a component after the Window opens? The JavaScript call is made before the Window actually shows, so the focusable element is `null`.
* How do you set focus on an input element in a Window, so that the user doesn't have to use their mouse?


## Solution

To focus any element or component in the [Telerik UI Window for Blazor](slug:dialog-overview), follow the steps below. They are also applicable for the [Dialog component](slug:dialog-overview).

1. To focus a Telerik UI for Blazor component, [set the `@ref` attribute to obtain the component's reference](slug:components/textbox/overview#textbox-reference-and-methods).
1. Raise a `bool` flag when showing the Window.
1. Check the boolean flag's value in `OnAfterRenderAsync()`.
1. Use a small `Task.Delay()` to wait for the Window to display and gain focus. Without a delay, the focusable component will either not exist yet, or the Window will steal the focus.
1. Focus the desired button, textbox, or input component. If it's a Telerik UI for Blazor component, use the [`FocusAsync()` method](slug:inputs-kb-focus).

>caption Focus a component on Dialog or Window open

````RAZOR
<TelerikButton OnClick="@ShowWindow">Show Window and Focus Button</TelerikButton>
<TelerikButton OnClick="@ShowDialog">Show Dialog and Focus TextBox</TelerikButton>

<TelerikWindow @bind-Visible="@WindowVisible"
               Modal="true">
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window
    </WindowTitle>
    <WindowContent>
        <p>This Button is now focused:</p>
        <TelerikButton @ref="@ButtonRef"
                       OnClick="@OnWindowButtonClick">
            Click Me
        </TelerikButton>
        <p><code>StringValue</code>: @StringValue</p>
    </WindowContent>
</TelerikWindow>

<TelerikDialog @bind-Visible="@DialogVisible"
               Title="Dialog"
               ButtonsLayout="@DialogButtonsLayout.End">
    <DialogContent>
        <TelerikTextBox @ref="@TextBoxRef" @bind-Value="@StringValue" />
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@( () => DialogVisible = false )">Close</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private TelerikButton? ButtonRef { get; set; }
    private TelerikTextBox? TextBoxRef { get; set; }

    private string StringValue { get; set; } = string.Empty;

    private bool WindowVisible { get; set; }
    private bool DialogVisible { get; set; }

    private bool ShouldFocusButton { get; set; }
    private bool ShouldFocusTextBox { get; set; }

    private void ShowWindow()
    {
        WindowVisible = true;
        ShouldFocusButton = true;
    }

    private void ShowDialog()
    {
        StringValue = string.Empty;
        DialogVisible = true;
        ShouldFocusTextBox = true;
    }

    private void OnWindowButtonClick()
    {
        var now = DateTime.Now;
        StringValue = $"{now.ToString("HH:mm:ss")}.{now.Millisecond}";
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (ShouldFocusButton && ButtonRef != null)
        {
            ShouldFocusButton = false;
            // Wait for the Window to render and gain focus.
            await Task.Delay(200);
            await ButtonRef.FocusAsync();
        }

        if (ShouldFocusTextBox && TextBoxRef != null)
        {
            ShouldFocusTextBox = false;
            // Wait for the Dialog to render and gain focus.
            await Task.Delay(200);
            await TextBoxRef.FocusAsync();
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````


## See Also

* [Dialog Overview](slug:dialog-overview)
* [Window Overview](slug:window-overview)
* [Focus Telerik Input Components](slug:inputs-kb-focus)
