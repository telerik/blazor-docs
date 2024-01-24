---
title: Animation
page_title: Popup Animation
description: Animation settings of the Popup for Blazor.
slug: popup-animation
tags: telerik,blazor,popup,animation
published: True
position: 35
---

# Animation Settings

This article outlines the available settings that allow you to customize the animations when the Popup displays and hides.

## Type

You can change the way the Popup component flows in and out of the screen by setting the `AnimationType` parameter to a member of the `AnimationType` enum:

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

See the [example](#example) below to customize the available parameters and see how they reflect the Popup component.

## Duration

Set the `AnimationDuration` parameter in milliseconds as `int` to control how long the animation will take until the component is fully displayed.

See the [example](#example) below to customize the available parameters and see how they reflect the Popup component.

## Example

The following example lets you experiment with the available settings that control the animation in the Popup. It starts with the default component behavior.

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

<TelerikButton OnClick="@(() => PopupRef.Show())">Show Popup</TelerikButton>
<TelerikButton OnClick="@(() => PopupRef.Hide())">Hide Popup</TelerikButton>

<TelerikPopup @ref="@PopupRef"
              AnchorSelector=".popup-target"
              AnimationType="@SelectedAnimationType"
              AnimationDuration="@SelectedAnimationDuration"
              Width="300px">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikPopup>

<div class="popup-target styled-container">
    
</div>

@code {
    private TelerikPopup PopupRef { get; set; }

    private List<AnimationType> AnimationTypes { get; set; }

    private AnimationType SelectedAnimationType { get; set; } = AnimationType.SlideDown;

    private int SelectedAnimationDuration { get; set; } = 300;

    private void OnDropDownValueChanged(AnimationType newAnimationType)
    {
        PopupRef.Hide();

        SelectedAnimationType = newAnimationType;

        PopupRef.Show();
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