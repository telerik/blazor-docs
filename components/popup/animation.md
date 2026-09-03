---
title: Animation
page_title: Popup Animation
description: Explore the animation settings of the Popup for Blazor. Discover how to adjust the way the Popup appears and disappears on the screen.
slug: popup-animation
tags: telerik,blazor,popup,animation
published: True
position: 35
components: ["popup"]
---

# Popup Animation

This article outlines how to customize the animations when the Popup displays and hides.

## Type

You can change the way the Popup component shows and hides by setting the `AnimationType` parameter to a member of the `AnimationType` enum:

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

See the [example](#example) below to customize the available parameters and see how they affect the Popup component.

## Duration

Set the `AnimationDuration` parameter in milliseconds as `int` to control how long the animation will take until the component is fully displayed.

See the [example](#example) below to customize the available parameters and see how they affect the Popup component.

## Example

The following example lets you experiment with the available settings that control the animation in the Popup. It starts with the default component behavior.

<demo metaUrl="client/popup/animation/" height="420"></demo>

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug:Telerik.Blazor.Components.TelerikPopup)
