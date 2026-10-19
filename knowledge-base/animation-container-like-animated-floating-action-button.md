---
title: Adjusting FloatingActionButton Position or Implementing Side Popup in Blazor
description: Learn how to adjust the position of the FloatingActionButton in Blazor or create a side popup using Telerik AnimationContainer.
type: how-to
page_title: Customizing FloatingActionButton Position or Creating Side Popup in Blazor
meta_title: Customizing FloatingActionButton Position or Creating Side Popup in Blazor
slug: adjusting-floatingactionbutton-position-or-side-popup
tags: floatingactionbutton, animationcontainer, blazor, position, side-popup
res_type: kb
ticketid: 1717399
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for Blazor FloatingActionButton, <br/>UI for Blazor AnimationContainer</td>
</tr>
<tr>
<td>Version</td>
<td>14.1.0</td>
</tr>
</tbody>
</table>

## Description

The [FloatingActionButton](https://www.telerik.com/blazor-ui/components/floatingactionbutton/overview) component in Telerik UI for Blazor allows positioning through alignment parameters, but it doesn't dynamically adjust its position based on the content beneath it. To implement flexible behavior similar to a side popup, consider using the [AnimationContainer](https://www.telerik.com/blazor-ui/components/animationcontainer/overview) component.

This knowledge base article also answers the following questions:
- How can I reposition the FloatingActionButton dynamically?
- How do I create a side popup similar to the Ninja button?
- Can I implement a floating popup with toggle functionality?

## Solution

### Using FloatingActionButton
The FloatingActionButton relies on its `Position` and `Alignment` properties for placement. It doesn't adjust dynamically at runtime unless custom application logic is implemented.

### Creating a Side Popup with AnimationContainer

To create a side popup, use the AnimationContainer with the following examples:

#### Example 1: Popup Without Always-Visible Part

```razor
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
    private TelerikAnimationContainer? TAC { get; set; }

    private async Task ToggleAnimationContainer()
    {
        await TAC!.ToggleAsync();
    }
}
```

#### Example 2: Popup With Always-Visible Part

```razor
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
    private TelerikAnimationContainer? TAC { get; set; }

    private async Task ToggleAnimationContainer()
    {
        await TAC!.ToggleAsync();
    }
}
```

## See Also

- [FloatingActionButton Documentation](https://www.telerik.com/blazor-ui/components/floatingactionbutton/overview)
- [AnimationContainer Documentation](https://www.telerik.com/blazor-ui/components/animationcontainer/overview)
- [Position and Alignment in FloatingActionButton](https://www.telerik.com/blazor-ui/components/floatingactionbutton/position-and-alignment)
