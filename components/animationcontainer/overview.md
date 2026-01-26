---
title: Overview
page_title: Animation Container Overview 
description: How to use the Animation Container in the UI for Blazor suite to create messages and popups.
slug: components/animationcontainer/overview
tags: telerik,blazor,animation,container
published: True
position: 0
components: ["animationcontainer"]
---
# Blazor AnimationContainer Overview

The <a href="https://www.telerik.com/blazor-ui/animation-container" target="_blank">Blazor Animation Container component</a> enables you to create messages and popups or expandable containers. It lets you define its animation, size and position, and arbitrary content.

>tip The `AnimationContainer` animates and renders content in-place and does not have all the features of a true popup. [Compare the abilities of all Telerik Blazor popup components](slug:common-kb-popup-component-comparison) to verify if the [Popup](slug:popup-overview) or [Popover](slug:popover-overview) components are more suitable for your needs. If you are looking for an option to create [Notification](slug:notification-overview), [Tooltip](slug:tooltip-overview) or expandable container such as [Drawer](slug:drawer-overview), you may use the dedicated components.

## Creating Blazor AnimationContainer

1. Use the `TelerikAnimationContainer` tag.
1. Assign a [reference to the component instance via `@ref`](#animationcontainer-reference-and-methods).
1. Add content as `ChildContent` inside the `TelerikAnimationContainer` tag.
1. (optional) Define the [`AnimationType` or `AnimationDuration`](#animation).
1. (optional) Set [parameters](#animationcontainer-parameters) for dimensions or [position](#position).

>caption Basic AnimationContainer

````RAZOR
<TelerikButton OnClick="@ToggleAnimationContainer">Toggle Animation Container</TelerikButton>

<TelerikAnimationContainer @ref="@TAC"
                           AnimationType="@AnimationType.ZoomIn"
                           Width="300px"
                           Top="100px"
                           Left="100px">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikAnimationContainer>

@code {
    private TelerikAnimationContainer TAC { get; set; }

    private async Task ToggleAnimationContainer()
    {
        await TAC.ToggleAsync();
    }
}
````

## Position

The Animation Container renders at the place of its declaration. It has a `position:absolute` CSS style, so it will display over adjacent elements. The component position can be offset by parent elements with a `position` style, even of the `Top` and `Left` parameters are set.

The component should reside outside elements with an `overflow` CSS style. Otherwise, it may be clipped or overlapped by other scrollable containers. This limitation does not exist for the [Popup](slug:popup-overview) and [Popover](slug:popover-overview) components.

## Animation

One of the core features of the Animation Container is the customizable open and close animation type and animation duration. Set the `AnimationDuration` parameter in milliseconds as `int`. The possible `AnimationType` values are the members of the `AnimationType` enum:

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

>caption AnimationContainer animation options

````RAZOR
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

<TelerikButton OnClick="@ToggleAnimationContainer">Toggle Animation Container</TelerikButton>

<TelerikAnimationContainer @ref="@TAC"
                           AnimationType="@SelectedAnimationType"
                           AnimationDuration="@SelectedAnimationDuration"
                           Width="300px"
                           Top="100px"
                           Left="200px">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikAnimationContainer>

@code {
    private TelerikAnimationContainer TAC { get; set; }

    private List<AnimationType> AnimationTypes { get; set; }

    private AnimationType SelectedAnimationType { get; set; } = AnimationType.SlideDown;

    private int SelectedAnimationDuration { get; set; } = 300;

    private async Task ToggleAnimationContainer()
    {
        await TAC.ToggleAsync();
    }

    private async Task OnDropDownValueChanged(AnimationType newAnimationType)
    {
        await TAC.HideAsync();

        SelectedAnimationType = newAnimationType;

        await TAC.ShowAsync();
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
````

## AnimationContainer Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `AnimationDuration` | `int` <br /> (`300`) | The length of the opening and closing animations. |
| `AnimationType` | `AnimationType` enum <br /> (`SlideDown`) | The [animation type (fade, slide, push, zoom, etc.)](#animation).  |
| `Class` | `string` | The custom CSS class to be rendered on the `<div>` element, which wraps the component `ChildContent`. This is *not* the outermost component container. See `ParentClass`. |
| `Height` | `string` | The `height` CSS style of the `div.k-animation-container` element. |
| `HideDelay` | `int` | The milliseconds between the closing animation and the Animation Container removal from the DOM. |
| `Left` | `string` | The `left` CSS style of the `div.k-animation-container` element. |
| `ParentClass` | `string` | The custom CSS class to be rendered on the `<div class="k-animation-container>` element. This is the outermost component element, which has the position and dimension styles. See `Class`. |
| `ParentInlineStyle` | `string` | The custom inline CSS styles to be rendered on the `div.k-animation-container` element. |
| `ShowDelay` | `int` | The time in millisends between the Animation Container rendering and the opening animation. |
| `Top` | `string` | The `top` CSS style of the `div.k-animation-container` element. |
| `Width` | `string` | The `width` CSS style of the `div.k-animation-container` element. |

## AnimationContainer Reference and Methods

The Animation Container provides methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` attribute. The available methods are:

* `ShowAsync()` - to display the component;
* `HideAsync()` - to hide the component;
* `ToggleAsync()` - if you want to use a single method for both operations.

>tip To show an Animation Container immediately when the page loads, use the `OnAfterRenderAsync` event.

>caption Use AnimationContainer reference and methods

````RAZOR
<TelerikAnimationContainer @ref="@TAC">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikAnimationContainer>

@code {
    private TelerikAnimationContainer TAC { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await TAC.ShowAsync();
        }
    }
}
````

## See Also

* [Live Demos: Animation Container](https://demos.telerik.com/blazor-ui/animationcontainer/overview)
* [AnimationContainer API Reference](slug:Telerik.Blazor.Components.TelerikAnimationContainer)
* [Hide the AnimationContainer on Outside Click](slug:animationcontainer-kb-close-on-outside-click)
* [Comparison between All Popup Components](slug:common-kb-popup-component-comparison)
