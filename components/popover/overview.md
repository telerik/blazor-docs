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

The <a href = "https://www.telerik.com/blazor-ui/popover" target="_blank">Blazor Popover component</a> behaves much as a tooltip and helps you to easily display additional information to your users. This article explains how to start using the component and describes its features.

## Creating Blazor Popover

1. Add the `<TelerikPopover>` tag to a Razor file.
1. Obtain a `@ref` of the component.
1. Add the content to the `<PopoverContent>` child tag.
1. Use the [`Show`](#popover-reference-and-methods) method to display the `<TelerikPopover>`.
1. (optional) Add a title inside a `<PopoverHeader>` tag. HTML markup and child components are supported, too.

>caption Basic configuration of the Telerik Popover for Blazor

````CSHTML
<TelerikPopover @ref="@PopoverReference"
                AnchorSelector=".popover-target">
    <PopoverContent>
        I am a Telerik Popover
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@(() => PopoverReference.Hide())" Icon="@SvgIcon.X">Close</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<TelerikButton OnClick="@(() => PopoverReference.Show())" Class="popover-target">Show the Popover</TelerikButton>

@code{
    private TelerikPopover PopoverReference { get; set; }
}
````

## Popover Positioning and Collision

Use the available positioning and collision settings to customize how the Popover positions itself and reacts to insufficient space in the viewport. [Read more about the Blazor Popover Positioning and Collision...]({%slug popover-position-collision%})

## Popover Animations 

Use the available parameters to customize the animation type and its duration. [Read more about the Blazor Popover Animations...]({%slug popover-animation%})

## Popover Parameters

The Blazor Popover provides parameters to configure the component. Also check the [Popover API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPopover) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `ActionsLayout` | `PopoverActionsLayoutAlign ` enum <br /> (`Stretch`) | Defines the positioning of the elements in the `<PopoverActions>` child tag. The other possible values for are `Start`, `Center`, and `End`. |
| `AnchorSelector` | `string` | Specifies the CSS selector targeting the element that the Popover uses as an anchor. |
| `AnimationDuration` | `int` | Defines the duration of the animation in milliseconds. [Read more about Popover animations...]({%slug popover-animation%}) |
| `AnimationType` | `AnimationType` enum <br /> (`SlideDown`) | Sets the type of animation when the component displays and hides. [Read more about Popover animations...]({%slug popover-animation%}) |
| `Collision` | `PopoverCollision` enum <br /> (`Fit`) | Sets the behavior of the Popover when it doesn't fit in the viewport. [Read more about Popover collision...]({%slug popover-position-collision%}) |
| `Offset` | `double ` | Sets the space between the Popover and its anchor in `pixels`. |
| `Position` | `PopoverPosition  ` enum <br /> (`Top`) | Defines the position relative to the target element at which the Popover will be shown. [Read more about Popover position...]({%slug popover-position-collision%}) |
| `ShowCallout` | `bool` <br /> (`true`) | Defines if the callout is rendered. |
| `ShowOn` | `PopoverShowEvent` enum <br /> (`Click`) | The browser event that will display the Popover (`MouseEnter` or `Click`). When you set the `ShowOn` parameter to `Click`, the Popover will hide when the user clicks outside the component. If the parameter's value is `MouseEnter`, the Popover will hide when the mouse pointer leaves. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Popover:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class to be rendered on the `<div>` element, which wraps the component `ChildContent`. Use for [styling customizations]({%slug themes-override%}). |
| `Height` | `string` | The height of the Popover. |
| `Width` | `string` | The width of the Popover. |

## Popover Reference and Methods

To execute Popover methods, obtain a reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Use this method to programmatically re-render the Popover. <br /> The Popover is rendered as a child of the `TelerikRootComponent`, instead of where it is declared. As a result, it doesn't automatically refresh when its content is updated. In such cases, the `Refresh` method comes in handy to ensure that the Popover content is up-to-date. |
| `Show` | Use this method to display the Popover. |
| `Hide` | Use this method to close the Popover. |

````CSHTML
<TelerikPopover @ref="@PopoverReference"
                AnchorSelector=".popover-target">
    <PopoverContent>
        I am a Telerik Popover
    </PopoverContent>
    <PopoverActions>
        <TelerikButton OnClick="@(() => PopoverReference.Hide())" Icon="@SvgIcon.X">Close</TelerikButton>
    </PopoverActions>
</TelerikPopover>

<TelerikButton OnClick="@(() => PopoverReference.Show())" Class="popover-target">Show the Popover</TelerikButton>

@code{
    private TelerikPopover PopoverReference { get; set; }
}
````

## Next Steps

* [Explore the Popover Positioning and Collision Settings]({%slug popover-position-collision%})
* [Customize the Popover Animations]({%slug popover-animation%})

## See Also

* [Live Popover Demos](https://demos.telerik.com/blazor-ui/popover/overview)
* [Popover API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPopover)
