---
title: Position and Collision
page_title: Popover Position and Collision
description: Discover the placement settings of the Popover for Blazor. Learn how to configure the Popover position and handle collisions.
slug: popover-position-collision
tags: telerik,blazor,popover,popover,align,position,collision
published: True
position: 10
---

# Popover Position and Collision Settings

This article outlines the available settings which enable you to control the position of the Popover based on its anchor and dictate how the component responds to insufficient screen space.

The [example](#example) below lets you customize the Popover `Position`, `Offset`, and `Collision` parameters and see how they affect the component.

## Position

To customize how the popover aligns with its anchor element, use the `Position` parameter and set its value to a member of the `PopoverPosition` enum:

* `Top` (default value)
* `Bottom`
* `Left`
* `Right`

## Offset

The `Offset` moves the Popover further away from its anchor in the direction that is consistent with the `Position` parameter value. For example, the Popover will move further down when the `Position` is set to `Bottom`.

## Collision

To define how the Popover reacts to insufficient screen space, set the `Collision` parameter to a member of the `PopoverCollision` enum:

* `Fit`&mdash;The Popover will shift until it is fully visible on the screen.
* `Flip`&mdash;The Popover will render on the other side of the anchor.

## Example

The following example lets you experiment with the available settings that control the position and collision behavior of the Popover. It starts with the default component behavior.

>caption Popover Position and Collision

````RAZOR
<div>
    <label>
        Popover Position
        <TelerikDropDownList @bind-Value="@PopoverPositionType" Data="@PopoverPositions" Width="200px" />
    </label>
</div>
<div>
    <label>
        Offset
        <TelerikNumericTextBox @bind-Value="@PopoverOffset" Width="200px" />
    </label>
</div>
<div>
    <label>
        Popover Collision Type
        <TelerikDropDownList @bind-Value="@PopoverCollisionType" Data="@PopoverCollisionTypes" Width="200px" />
    </label>
</div>

<TelerikPopover @ref="@PopoverRef"
                AnchorSelector=".popover-target"
                Collision="@PopoverCollisionType"
                Offset="@PopoverOffset"
                Position="@PopoverPositionType">
    <PopoverContent>
        I am a Telerik Popover
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@(() => PopoverRef?.Hide())" Icon="@SvgIcon.X">Close</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<div class="popover-target styled-container" @onclick="@(_ => PopoverRef.Show())">
    Popover target. Click in the element to show the Popover.
</div>

@code{
    private TelerikPopover? PopoverRef { get; set; }
    private PopoverCollision PopoverCollisionType { get; set; } = PopoverCollision.Fit;
    private int PopoverOffset { get; set; } = 0;
    private PopoverPosition PopoverPositionType { get; set; } = PopoverPosition.Top;

    private List<PopoverPosition> PopoverPositions { get; set; } = new List<PopoverPosition>() {
        PopoverPosition.Top,
        PopoverPosition.Left,
        PopoverPosition.Right,
        PopoverPosition.Bottom,
    };

    private List<PopoverCollision> PopoverCollisionTypes { get; set; } = new List<PopoverCollision>() {
        PopoverCollision.Fit,
        PopoverCollision.Flip
    };
}

<style>
    .styled-container {
        width: 300px;
        height: 50px;
        background-color: yellowgreen;
        margin-top: 20px;
    }
</style>
````

## See Also

* [How to Align Popover with Anchor After Content and Size Change](slug:popover-kb-refresh-callout-position)
