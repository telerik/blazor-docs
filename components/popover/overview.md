---
title: Overview
page_title: Popover Overview
description: Discover the Blazor Popover. Learn how to add the component to your app and explore its features like adding content, execute actions, positioning and collision, and animation customization.
slug: popover-overview
tags: telerik,blazor,popover,pop,over
published: True
position: 0
---

# Blazor Popover Overview

The <a href = "https://www.telerik.com/blazor-ui/popover" target="_blank">Blazor Popover component</a> behaves much like a tooltip, as it helps you display additional information in a container that shows on top of the other page content. The major differences between the Popover and the [Tooltip](slug://tooltip-overview) components is that the Popover has built-in support for action buttons and provides more configuration options about its animation and placement on the screen. This article explains how to start using the component and describes its features.

## Creating Blazor Popover

1. Add the `<TelerikPopover>` tag to a Razor file.
1. Set the `AnchorSelector` parameter to a CSS selector, which points to the HTML element that the Popover will align with.
1. Configure how the app will show and hide the Popover component. Use one or both options below:
    * Set the `ShowOn` parameter to an `PopoverShowOn` enum value to set which user interaction with the anchor will display the Popover automatically.
    * [Obtain the component reference with the `@ref` attribute](#popover-reference-and-methods) to show and hide the Popover programmatically.
1. Add the content to the `<PopoverContent>` child tag.
1. (optional) Configure the Popover `Position` and `Offset`, or add a title inside the `<PopoverHeader>` tag.

>caption Basic Telerik Popover for Blazor

````RAZOR
<TelerikPopover @ref="@PopoverRef"
                AnchorSelector=".popover-target"
                ShowOn="@PopoverShowOn.Click"
                Position="@PopoverPosition.Bottom"
                Offset="20">
    <PopoverContent>
        Telerik Popover for Blazor
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@( () => PopoverRef?.Hide() )"
                       Icon="@SvgIcon.X">Close</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<TelerikButton Class="popover-target">Show Popover Automatically</TelerikButton>

<TelerikButton OnClick="@( () => PopoverRef?.Show() )">Show Popover Programmatically</TelerikButton>

@code{
    private TelerikPopover? PopoverRef { get; set; }
}
````

## Popover Positioning and Collision

Use the available positioning and collision settings to customize how the Popover positions itself and reacts to insufficient space in the viewport. [Read more about the Blazor Popover Positioning and Collision...](slug://popover-position-collision)

## Popover Animations 

Use the available parameters to customize the animation type and its duration. [Read more about the Blazor Popover Animations...](slug://popover-animation)

## Popover Parameters

The Blazor Popover provides parameters to configure the component. Also check the [Popover API Reference](slug://Telerik.Blazor.Components.TelerikPopover) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `ActionsLayout` | `PopoverActionsLayoutAlign ` enum <br /> (`Stretch`) | The positioning of the elements in the `<PopoverActions>` child tag. The possible values are `Stretch`, `Start`, `Center`, and `End`. |
| `AnchorSelector` | `string` | The CSS selector targeting the element that the Popover uses as an anchor. |
| `AnimationDuration` | `int` | The duration of the animation in milliseconds. [Read more about Popover animations...](slug://popover-animation) |
| `AnimationType` | `AnimationType` enum <br /> (`SlideDown`) | The type of animation when the component displays and hides. [Read more about Popover animations...](slug://popover-animation) |
| `Collision` | `PopoverCollision` enum <br /> (`Fit`) | The behavior of the Popover when it doesn't fit in the viewport. [Read more about Popover collision...](slug://popover-position-collision) |
| `Offset` | `double ` | The [space between the Popover and its anchor](slug://popover-position-collision#offset) in pixels. The component ignores its callout when applying this setting. |
| `Position` | `PopoverPosition  ` enum <br /> (`Top`) | The position relative to the target element at which the Popover will be shown. [Read more about Popover position...](slug://popover-position-collision) |
| `ShowCallout` | `bool` <br /> (`true`) | Defines if the callout is rendered. |
| `ShowOn` | `PopOverShowOn?` enum <br /> (`null`) | The browser event that will display the Popover (`MouseEnter` or `Click`) without the need to [use component methods](#popover-reference-and-methods). When you set the `ShowOn` parameter to `Click`, the Popover will hide when the user clicks outside the component. If the parameter value is `MouseEnter`, the Popover will hide when the mouse pointer leaves. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Popover:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class to be rendered on the `<div>` element, which wraps the component `ChildContent`. Use for [styling customizations](slug://themes-override). |
| `Height` | `string` | The height of the Popover. |
| `Width` | `string` | The width of the Popover. |

## Popover Reference and Methods

To execute Popover methods, obtain a reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Use this method to programmatically re-render the Popover. <br /> The Popover is rendered as a child of the `TelerikRootComponent`, instead of where it is declared. As a result, it doesn't automatically refresh when its content is updated. In such cases, the `Refresh` method comes in handy to ensure that the Popover content is up-to-date. |
| `Show` | Use this method to display the Popover. |
| `Hide` | Use this method to close the Popover. |

````RAZOR
<TelerikPopover @ref="@PopoverRef"
                AnchorSelector=".popover-target"
                Position="@PopoverPosition.Bottom"
                Offset="20">
    <PopoverContent>
        Telerik Popover for Blazor
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@( () => PopoverRef?.Hide() )"
                       Icon="@SvgIcon.X">Hide</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<TelerikButton OnClick="@( () => PopoverRef?.Show() )">Show Popover</TelerikButton>

<TelerikSvgIcon Class="popover-target" Icon="@SvgIcon.QuestionCircle" />

@code{
    private TelerikPopover? PopoverRef { get; set; }
}
````

## Next Steps

* [Explore the Popover Positioning and Collision Settings](slug://popover-position-collision)
* [Customize the Popover Animations](slug://popover-animation)

## See Also

* [Live Popover Demos](https://demos.telerik.com/blazor-ui/popover/overview)
* [Popover API Reference](slug://Telerik.Blazor.Components.TelerikPopover)
* [Comparison between All Popup Components](slug://common-kb-popup-component-comparison)
