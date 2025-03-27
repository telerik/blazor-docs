---
title: Position
page_title: Window - Position
description: How to control the position of the Window for Blazor.
slug: components/window/position
tags: telerik,blazor,window,position
published: True
position: 2
---

# Window Position

The Telerik Window component provides multiple options to control its position, allowing you to customize its placement and behavior to suit your application's layout and requirements. This article contains the following sections:

* [`ContainmentSelector` parameter](#containmentselector)
* [`Top` and `Left` parameters](#top-and-left)
* [Centered Window](#center)
* [Positions Example](#example)

The Window renders [in the root of the application](slug:window-overview#important-notes) or in its containment element. If the application is using special CSS positioning, margins, or other offsets on the Window ancestors, these CSS styles may [affect the position of the Window](slug:troubleshooting-general-issues#wrong-popup-position).

## ContainmentSelector

By default, users can drag and resize the Window without constraints. You can restrict the Window's visual position to the boundaries of a specific container:

1. Define a non-modal Window component inside the desired container.
1. Set the Window `ContainmentSelector` parameter to a unique CSS selector, which points to the container.
1. Apply a `position:relative` style to the container.

In this case, the Window will render inside the specified container and not as a child of the [`TelerikRootComponent`](slug:rootcomponent-overview).

>caption Using ContainmentSelector to limit Window dragging and resizing

````RAZOR
<div id="window-container"
     style="position: relative; border: 1px solid red; margin: 20vh; height: 50vh; width: 50vw;">

    <TelerikButton OnClick="@( () => WindowVisible = !WindowVisible )">Toggle Window</TelerikButton>

    <TelerikWindow ContainmentSelector="#window-container"
                   @bind-Width="@WindowWidth"
                   @bind-Visible="@WindowVisible">
        <WindowActions>
            <WindowAction Name="Maximize" />
            <WindowAction Name="Close" />
        </WindowActions>
        <WindowTitle>Contained Window</WindowTitle>
        <WindowContent>
            This Window can be dragged, resized, and maximized within the boundaries of the red box.
        </WindowContent>
    </TelerikWindow>

</div>

@code {
    private bool WindowVisible { get; set; } = true;

    private string WindowWidth { get; set; } = "300px";
}
````


## Top and Left

The `Top` and `Left` parameters control the Window placement on the page. The resulting position depends on the whole page content and not on the viewport or the current scroll offset. To see the parameters in action, refer to the [example](#example) below.

When the [Window `ContainmentSelector` parameter is set](#containmentselector), the `Top` and `Left` parameters apply with regard to the top-left corner of the containment element.

### Center

 The Telerik Window is automatically centered when the `Top` and `Left` parameters are not set or are explicitly set to `string.Empty`. To see this behavior in action, refer to the [example](#example) below.

## Example

>caption Use Top and Left to manage the Window position

````RAZOR
<p>
    <code>WindowLeft</code>: @WindowLeft
    <br />
    <code>WindowTop</code>: @WindowTop
</p>

<TelerikWindow @ref="@WindowRef"
               @bind-Left="@WindowLeft"
               @bind-Top="@WindowTop"
               Visible="true"
               Width="300px">
    <WindowTitle>Window</WindowTitle>
    <WindowContent>
        The values of <code>WindowLeft</code> and <code>WindowTop</code> change after the user ends dragging or resizing.
    </WindowContent>
    <WindowFooter>
        <TelerikButton OnClick="@CenterWindow">Center Window</TelerikButton>
    </WindowFooter>
</TelerikWindow>

@code {
    private TelerikWindow? WindowRef { get; set; }
    private string WindowLeft { get; set; } = "50px";
    private string WindowTop { get; set; } = "50px";

    private void CenterWindow()
    {
        WindowLeft = WindowTop = string.Empty;
        WindowRef?.Refresh();
    }
}
````

## See Also

* [Live Demo: Window Position](https://demos.telerik.com/blazor-ui/window/position)
* [Live Demo: Constrain Window Movement](https://demos.telerik.com/blazor-ui/window/constrain-movement)
* [How to Center the Window Programmatically](slug:window-kb-center-programmatically)
