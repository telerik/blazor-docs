---
title: Create Animated Fly-Out Side Popup
description: Learn how to create an animated fly-out side popup using the Telerik AnimationContainer for Blazor.
type: how-to
page_title: How to Create Animated Fly-Out Side Popup in Blazor
meta_title: How to Create Animated Fly-Out Side Popup in Blazor
slug: animationcontainer-kb-like-animated-floatingactionbutton
tags: animationcontainer, blazor
res_type: kb
ticketid: 1717399
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>AnimationContainer for Blazor, <br /> FloatingActionButton for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

The [FloatingActionButton](slug:fab-overview) component in Telerik UI for Blazor allows positioning through alignment parameters, but it doesn't dynamically adjust its position based on the content beneath it. How to implement flexible behavior similar to a fly-out side popup?

This knowledge base article also answers the following questions:

* How can I reposition the FloatingActionButton dynamically?
* How do I create a side popup similar to the Ninja button for the feedback form in the Telerik documentation and demo sites?
* Can I implement a floating popup with toggle functionality?

## Solution

The FloatingActionButton relies on its `Position` and `Alignment` properties for placement. It doesn't adjust or move dynamically at runtime unless custom application logic exists.

Instead, you can use the [AnimationContainer](slug:components/animationcontainer/overview) component. Consider the following scenarios:

* A fly-out popup that is completely hidden
* A fly-out popup that is partially visible at all times

### Fully Hiding AnimationContainer

Set the AnimationContainer `Top` and `Left` parameters, depending on the browser viewport dimensions and the component's `Width` and `Height` parameter values. In this way, the Animation Container will appear next to the browser viewport boundary.

````RAZOR
<TelerikButton OnClick="@ToggleAnimationContainer">Toggle Animation Container</TelerikButton>

<TelerikAnimationContainer @ref="@TAC"
                           AnimationType="@AnimationType.SlideLeft"
                           Width="300px"
                           Height="100px"
                           Top="calc(100vh - 200px)"
                           Left="calc(100vw - 300px)">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikAnimationContainer>

@code {
    private TelerikAnimationContainer? TAC;

    private async Task ToggleAnimationContainer()
    {
        await TAC!.ToggleAsync();
    }
}
````

### Partially Visible AnimationContainer

1. Set the AnimationContainer `Top` and `Left` parameters to `0`.
1. Wrap the component in another HTML element with the desired position styles.
1. Add some content in the additional HTML element (outside the AnimationContainer) that should be always visible.

````RAZOR
<TelerikButton OnClick="@ToggleAnimationContainer">Toggle Animation Container</TelerikButton>

<div id="side-popup">
    <TelerikAnimationContainer @ref="@TAC"
                            AnimationType="@AnimationType.SlideLeft"
                            Width="300px"
                            Height="100px"
                            Top="0"
                            Left="0">
        <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
            Telerik Blazor Animation Container
        </div>
    </TelerikAnimationContainer>
    <div @onclick="@ToggleAnimationContainer" id="side-popup-inner">
        Click Me
    </div>
</div>

<style>
    #side-popup {
        position: fixed;
        bottom: 100px;
        right: 0;
        z-index: 10;
        width: 400px;
    }

    #side-popup-inner {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px; 
        padding: 1em;
        background: lime;
        cursor: pointer;
    }
</style>

@code {
    private TelerikAnimationContainer? TAC;

    private async Task ToggleAnimationContainer()
    {
        await TAC!.ToggleAsync();
    }
}
````

## See Also

* [AnimationContainer Overview](slug:components/animationcontainer/overview)
* [FloatingActionButton Overview](slug:fab-overview)
