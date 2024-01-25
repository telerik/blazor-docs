---
title: Animation
page_title: Popover Animation
description: Explore the animation settings of the Popover for Blazor. Discover how to adjust the way the Popover appears and disappears on the screen.
slug: popover-animation
tags: telerik,blazor,popover,animation
published: True
position: 35
---

# Popover Animation Settings

This article outlines the available settings that allow you to customize the animations when the Popover displays and hides.

## Type

You can change the way the Popover component flows in and out of the screen by setting the `AnimationType` parameter to a member of the `AnimationType` enum:

* `None`
* `Fade`
* `PushUp`
* `PushDown`
* `PushLeft`
* `PushRight`
* `RevealVertical`
* `SlideUp`
* `SlideIn`
* `SlideDown` (default)
* `SlideRight`
* `SlideLeft`
* `ZoomIn`
* `ZoomOut`

See the [example](#example) below to customize the available parameters and see how they affect the Popover component.

## Duration

Set the `AnimationDuration` parameter in milliseconds as `int` to control how long the animation will take until the component is fully displayed.

See the [example](#example) below to customize the available parameters and see how they affect the Popover component.

## Example

The following example lets you experiment with the available settings that control the animation in the Popover. It starts with the default component behavior.

````CSHTML
<label>
    Animation Type:
    <TelerikDropDownList Data="@AnimationTypes"
                         Value="@SelectedAnimationType"
                         ValueChanged="@( (AnimationType newValue) => OnDropDownValueChanged(newValue) )"
                         Width="160px" />
</label>
<label>
    Animation Duration:
    <TelerikNumericTextBox @bind-Value="@SelectedAnimationDuration"
                           Min="0"
                           Max="7000"
                           Width="100px" />
</label>

<TelerikButton OnClick="@(() => PopoverReference.Show())">Show Popover</TelerikButton>
<TelerikButton OnClick="@(() => PopoverReference.Hide())">Hide Popover</TelerikButton>

<TelerikPopover @ref="@PopoverReference"
              AnchorSelector=".popover-target"
              AnimationType="@SelectedAnimationType"
              AnimationDuration="@SelectedAnimationDuration"
              Width="300px">
    <PopoverContent>
        Telerik Blazor Popover
    </PopoverContent>
</TelerikPopover>

<div class="popover-target styled-container">
</div>

@code {
    private TelerikPopover PopoverReference { get; set; }

    private List<AnimationType> AnimationTypes { get; set; }

    private AnimationType SelectedAnimationType { get; set; } = AnimationType.SlideDown;

    private int SelectedAnimationDuration { get; set; } = 300;

    private void OnDropDownValueChanged(AnimationType newAnimationType)
    {
        PopoverReference.Hide();

        SelectedAnimationType = newAnimationType;

        PopoverReference.Show();
    }

    protected override void OnInitialized()
    {
        AnimationTypes = new List<AnimationType>();

        foreach (AnimationType animation in Enum.GetValues(typeof(AnimationType)))
        {
            AnimationTypes.Add(animation);
        }

        base.OnInitialized();
    }
}

<style>
    .styled-container {
        width: 200px;
        height: 30px;
        background-color: yellowgreen;
        margin-top: 20px;
    }
</style>
````