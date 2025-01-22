---
title: Minimize a Window to the Bottom Right of the Page
description: Learn how to collapse a Window to the bottom of a page and create a responsive popup that is a chat bubble.
type: how-to
page_title: How to Minimize a Popup Window to the Bottom Right of the Page
slug: window-modal-minimize-popup
tags: blazor, window, minimize
ticketid: 1542823, 1676477
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Window for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to minimize the Telerik Window for Blazor to the bottom right?
* How to collapse a Window to the bottom of a page?
* How to create a responsive modal Window that can be minimized?
* How to minimize a modal Window as a chat for messages?

## Solution

### Minimize Window to the Bottom Right

To minimize the Window to the bottom-right corner of the viewport:

1. Set a custom CSS class to the Window with the `Class` parameter, for example, `minimized-at-bottom`.
1. Apply the following styles to the `.k-window-minimized.minimized-at-bottom` CSS combinator:
    * `top` and `left` must be `auto !important`
    * `bottom` and `right` must be zero or an arbitrary small value
    * `transform` must be `none`

````RAZOR
<TelerikButton OnClick="@( () => WindowVisible = !WindowVisible )">Toggle Window</TelerikButton>

<TelerikWindow @bind-Visible="@WindowVisible"
               Class="minimized-at-bottom">
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

<style>
    .k-window-minimized.minimized-at-bottom {
        top: auto !important;
        left: auto !important;
        bottom: 1em;
        right: 1em;
        transform: none;
    }
</style>

@code {
    private bool WindowVisible { get; set; } = true;
}
````

### Create Responsive Chat Window

To configure a responsive popup Window that transforms to a chat bubble on small screens:

1. Use the [MediaQuery component](slug://mediaquery-overview) to make the Window responsive and change its configuration, depending on the browser viewport size.
1. Use custom CSS classes and styles to tweak the Window appearance and make it look like a bubble when minimized.

````RAZOR
<TelerikMediaQuery Media="(max-width: 960px)"
                   OnChange="@( (bool matches) => IsSmallScreen = matches )" />

<TelerikWindow Class="@WindowClass"
               MinWidth="140px"
               @bind-State="@WindowState"
               ThemeColor="@ThemeConstants.Window.ThemeColor.Primary"
               Visible="true">
    <WindowTitle>@WindowTitle</WindowTitle>
    <WindowContent>
        <p>The Window title changes, depending on the browser viewport size.</p>
        <p>Reduce the browser width and minimize the Window to minimize it as a chart bubble at the bottom-right.</p>
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize" />
    </WindowActions>
</TelerikWindow>

<style>
    .k-window-minimized.minimized-at-bottom {
        top: auto !important;
        left: auto !important;
        bottom: 1em;
        right: 1em;
        transform: none;
    }

    .chat-bubble-window {
        min-height: auto !important;
        padding: var(--kendo-spacing-4);
        border-radius: var(--kendo-border-radius-full);
        background-color: var(--kendo-color-primary);
        color: var(--kendo-color-on-primary);
    }
</style>

@code {
    private string WindowClass => IsSmallScreen && WindowState == WindowState.Minimized ? "minimized-at-bottom chat-bubble-window" : "";
    private WindowState WindowState { get; set; } = WindowState.Default;
    private string WindowTitle => IsSmallScreen ? "Chat" : "Customer Support Chat";

    private bool IsSmallScreen { get; set; }
}
````

## See Also

* [Window Position](slug://components/window/position)
