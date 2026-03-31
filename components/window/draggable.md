---
title: Draggable
page_title: Window - Draggable
description: How to make a draggable or movable Window for Blazor.
slug: window-draggable
tags: telerik,blazor,window,draggable,movable
published: True
position: 5
components: ["window"]
---

# Window Dragging

You can move the Window for Blazor by dragging its titlebar with the mouse or with a touch and hold gesture, then dragging on a touch screen.

**Moving** the Window is **enabled by default** and you can stop it by setting the `Draggable` parameter of the Window component to `false`. You can also [restrict the Window dragging to a specific container](slug:components/window/position#containmentselector).

>important If you set the `Left` and `Top` parameters, you must use two-way binding for them (or update their values in the corresponding [events](slug:window-events)), otherwise the old information in the view-model will reset the position of the window.

````RAZOR
<TelerikWindow Visible="true"
               @bind-Left="@WindowLeft"
               @bind-Top="@WindowTop">
    <WindowTitle>Dragging <strong>Enabled</strong></WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

<TelerikWindow Visible="true"
               Draggable="false"
               Left="100px"
               Top="100px">
    <WindowTitle>Dragging <strong>Disabled</strong></WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

@code{
    private string WindowLeft { get; set; }

    private string WindowTop { get; set; }
}
````

## See Also

* [Live Demo: Draggable Window](https://demos.telerik.com/blazor-ui/window/draggable)
