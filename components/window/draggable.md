---
title: Draggable
page_title: Window - Draggable
description: How to make a draggable or movable Window for Blazor.
slug: window-draggable
tags: telerik,blazor,window,draggable,movable
published: True
position: 5
---

# Draggable Window

You can move the Window for Blazor by dragging its titlebar with the mouse or with a touch and hold gesture, then dragging on a touch screen.

**Moving** the Window is **enabled by default** and you can stop it by setting the `Draggable` parameter of the Window component to `false`.

>important If you set the `Left` and `Top` parameters, you must use two-way binding for them (or update their values in the corresponding [events]({%slug window-events%})), otherwise the old information in the view-model will reset the position of the window.

````CSHTML
@* Movable windows *@

<TelerikWindow Visible="true">
    <WindowTitle><strong>Drag me!</strong></WindowTitle>
    <WindowContent>You can drag me around easily.</WindowContent>
</TelerikWindow>

<TelerikWindow Visible="true" @bind-Left="@TheLeft" @bind-Top="@TheTop">
    <WindowTitle>Drag me too!</WindowTitle>
    <WindowContent>When using Left and Top, make sure to update them in the view-model.</WindowContent>
</TelerikWindow>

<TelerikWindow Visible="true" Draggable="false" Left="400px" Top="200px">
    <WindowTitle><strong>Non-</strong> movable</WindowTitle>
    <WindowContent>You are not allowed to drag me so you do not have to update my Top and Left.</WindowContent>
</TelerikWindow>

@code{
    string TheLeft { get; set; } = "50px";
    string TheTop { get; set; } = "50px";
}
````



## See Also

  * [Live Demo: Draggable Window](https://demos.telerik.com/blazor-ui/window/draggable)
