---
title: Overview
page_title: Popup Overview
description: Discover the Blazor Popup. Learn how to add the component to your app and explore its features like positioning, alignment, and animation customization.
slug: popup-overview
tags: telerik,blazor,popup
published: True
position: 0
---

# Blazor Popup Overview

The <a href = "https://www.telerik.com/blazor-ui/popup" target="_blank">Blazor Popup component</a> helps you easily display a popup for a target element (anchor) in your application. You can use the Telerik UI for Blazor Popup to display additional information. This article explains how to start using the component and describes its features.

## Creating Blazor Popup

1. Add the `<TelerikPopup>` tag to a Razor file.
1. Set the `AnchorSelector` parameter to a CSS selector, which points to the HTML element that the Popup will align with.
1. [Obtain the component reference to show and hide the Popover programmatically](#popup-reference-and-methods).
1. (optional) Set the Popup `Width` and `Height`, or configure animations.

>caption Basic configuration of the Telerik Popup for Blazor

````RAZOR
<TelerikPopup @ref="@PopupRef"
              AnchorSelector=".popup-target"
              AnimationType="@AnimationType.SlideDown"
              AnimationDuration="200"
              Width="200px"
              Height="100px">
    <div style="text-align: center;">
        <p>Telerik Popup for Blazor</p>
        <TelerikButton OnClick="@( () => PopupRef?.Hide() )"
                       Icon="@SvgIcon.XCircle">Close</TelerikButton>
    </div>

</TelerikPopup>

<TelerikButton OnClick="@( () => PopupRef?.Show() )"
               Class="popup-target">Show Popup</TelerikButton>

@code {
    private TelerikPopup? PopupRef { get; set; }
}
````

## Popup Positioning and Collision

Use the available positioning and collision settings to customize how the Popup positions and reacts to insufficient space in the viewport. [Read more about the Blazor Popup Positioning and Collision...](slug://popup-position-collision)

## Popup Animations 

Use the available parameters to customize the animation type and its duration. [Read more about the Blazor Popup animations...](slug://popup-animation).

## Popup Parameters

The Blazor Popup provides parameters to configure the component. Also check the [Popup API Reference](slug://Telerik.Blazor.Components.TelerikPopup) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `AnchorHorizontalAlign` | `PopupAnchorHorizontalAlign` enum <br /> (`Left`) | Defines how the anchor aligns with the Popup component on the horizontal plane. [Read more about Popup Positioning.](slug://popup-position-collision)|
| `AnchorSelector` | `string` | The CSS selector for the anchor element of the Popup. |
| `AnchorVerticalAlign` | `PopupAnchorVerticalAlign` enum <br /> (`Bottom`) | Defines how the anchor aligns with the Popup on the vertical plane. [Read more about Popup Positioning.](slug://popup-position-collision). |
| `AnimationDuration` | `int` | The duration of the animation in milliseconds. [Read more about Popup animations.](slug://popup-animation) |
| `AnimationType` | `AnimationType` enum <br /> (`SlideDown`) | The type of animation when the component displays and hides. [Read more about Popup animations.](slug://popup-animation) |
| `HorizontalAlign` | `PopupHorizontalAlign ` enum <br /> (`Left`) | Determines if the left or the right side of the Popup will touch its anchor. [Read more about Popup Positioning.](slug://popup-position-collision) |
| `HorizontalCollision` | `PopupCollision  ` enum <br /> (`Fit`) | Sets the behavior of the Popup when it doesn't fit in the viewport based on the horizontal plane. [Read more about Popup collision behavior.](slug://popup-position-collision) |
| `HorizontalOffset` | `double` | The horizontal space between the Popup and its anchor in pixels. |
| `VerticalAlign` | `PopupVerticalAlign ` enum <br /> (`Top`) | Determines if the Popup will touch the anchor with its top, bottom, or center. [Read more about Popup Positioning.](slug://popup-position-collision) |
| `VerticalCollision` | `PopupCollision  ` enum <br /> (`Flip`) | Defines the behavior of the Popup when it doesn't fit in the viewport based on the vertical plane. [Read more about Popup collision behavior.](slug://popup-position-collision) |
| `VerticalOffset` | `double` | The vertical space between the Popup and its anchor in `pixels`. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Popup:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class to be rendered on the `<div>` element, which wraps the component `ChildContent`. Use for [styling customizations](slug://themes-override). |
| `Height` | `string` | The height of the Popup. |
| `Width` | `string` | The width of the Popup. If not set, the component width will match the anchor width. |

## Popup Reference and Methods

To execute Popup methods, obtain a reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Re-renders the Popup. <br /> The Popup renders as a child of the `TelerikRootComponent`, instead of where it is declared. As a result, it doesn't automatically refresh when its content is updated. In such cases, the `Refresh` method ensures that the Popup content is up-to-date. |
| `Show` | Displays the Popup. |
| `Hide` | Closes the Popup. |

````RAZOR
<TelerikButton OnClick="@TogglePopup"
               Class="popup-target">Toggle Popup</TelerikButton>

<TelerikPopup @ref="@PopupRef"
              AnchorSelector=".popup-target">
    Telerik Popup for Blazor
</TelerikPopup>

@code {
    private TelerikPopup? PopupRef { get; set; }

    private bool PopupVisible { get; set; }

    private void TogglePopup()
    {
        if (!PopupVisible)
        {
            PopupVisible = true;
            PopupRef?.Show();
        }
        else
        {
            PopupVisible = false;
            PopupRef?.Hide();
        }
    }
}
````

## Next Steps

* [Explore the Popup Positioning and Collision Settings](slug://popup-position-collision)
* [Customize the Popup Animations](slug://popup-animation)

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug://Telerik.Blazor.Components.TelerikPopup)
* [Comparison between All Popup Components](slug://common-kb-popup-component-comparison)
