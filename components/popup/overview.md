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

The <a href = "https://www.telerik.com/blazor-ui/popup" target="_blank">Blazor Popup component</a> helps you to easily add popups to an element in your application. You can use to Telerik UI for Blazor Popup to display additional information. This article explains how to start using the component and describes its features.

## Creating Blazor Popup

1. Add the `<TelerikPopup>` tag to a Razor file.
1. Obtain a `@ref` of the component.
1. Use the [Show](#popup-reference-and-methods) method to display the `<TelerikPopup>`.

>caption Basic configuration of the Telerik Popup for Blazor

````CSHTML
<TelerikPopup AnchorSelector=".popup-target" @ref="@PopupRef">
    I am a Telerik Popup.
</TelerikPopup>

<div class="popup-target styled-container" @onclick="@(_ => PopupRef.Show())">
    Popup target
</div>

@code {
    private TelerikPopup PopupRef { get; set; }
}

<style>
    .styled-container {
        width: 200px;
        height: 30px;
        background-color: yellowgreen;
    }
</style>
````

## Popup Positioning and Collision

Use the available positioning and collision settings to customize how the Popup positions and reacts to insufficient space in the viewport. [Read more about the Blazor Popup Positioning and Collision...]({%slug popup-position-collision%})

## Popup Animations 

Use the available parameters to customize the animation type and its duration. [Read more about the Blazor Popup animations...]({%slug popup-animation%}).

## Popup Parameters

The Blazor Popup provides parameters to configure the component. Also check the [Popup API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPopup) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `AnchorHorizontalAlign` | `PopupAnchorHorizontalAlign` enum <br /> (`Left`) | Defines how the anchor aligns with the Popup component on the horizontal plane. [Read more about Popup Positioning.]({%slug popup-position-collision%})|
| `AnchorSelector` | `string` | Specifies the CSS selector targeting the element that the Popup uses as an anchor. |
| `AnchorVerticalAlign` | `PopupAnchorVerticalAlign` enum <br /> (`Bottom`) | Defines how the anchor aligns with the Popup on the vertical plane. [Read more about Popup Positioning.]({%slug popup-position-collision%}). |
| `AnimationDuration` | `int` | Defines the duration of the animation in milliseconds. [Read more about Popup animations.]({%slug popup-animation%}) |
| `AnimationType` | `AnimationType` enum <br /> (`SlideDown`) | Sets the type of animation when the component displays and hides. [Read more about Popup animations.]({%slug popup-animation%}) |
| `HorizontalAlign` | `PopupHorizontalAlign ` enum <br /> (`Left`) | Determines if the left or the right side of the Popup will touch its anchor. [Read more about Popup Positioning.]({%slug popup-position-collision%}) |
| `HorizontalCollision` | `PopupCollision  ` enum <br /> (`Fit`) | Sets the behavior of the Popup when it doesn't fit in the viewport based on the horizontal plane. [Read more about Popup collision behavior.]({%slug popup-position-collision%}) |
| `HorizontalOffset` | `double` | Sets the horizontal space between the Popup and its anchor in `pixels`. |
| `VerticalAlign` | `PopupVerticalAlign ` enum <br /> (`Top`) | Determines if the Popup will touch the anchor with its top, bottom, or center. [Read more about Popup Positioning.]({%slug popup-position-collision%}) |
| `VerticalCollision` | `PopupCollision  ` enum <br /> (`Flip`) | Sets the behavior of the Popup when it doesn't fit in the viewport based on the vertical plane. [Read more about Popup collision behavior.]({%slug popup-position-collision%}) |
| `VerticalOffset` | `double` | Sets the vertical space between the Popup and its anchor in `pixels`. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Popup:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class to be rendered on the `<div>` element, which wraps the component `ChildContent`. Use for [styling customizations]({%slug themes-override%}). |
| `Height` | `string` | The height of the Popup. |
| `Width` | `string` | The width of the Popup. |

## Popup Reference and Methods

To execute Popup methods, obtain reference to the component instance with `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Use this method to programmatically re-render the Popup. |
| `Show` | Use this method to display the Popup. |
| `Hide` | Use this method to close the Popup. |

````CSHTML
<TelerikButton OnClick="@ShowPopup">Show the Popup</TelerikButton>

<TelerikPopup AnchorSelector=".popup-target" @ref="@PopupRef">
    I am a Telerik Popup! 
</TelerikPopup>

<div class="popup-target styled-container">
    Popup target
</div>

@code {
    private TelerikPopup PopupRef { get; set; }

    private void ShowPopup()
    {
        PopupRef.Show();
    }
}

<style>
    .styled-container {
        width: 200px;
        height: 30px;
        background-color: yellowgreen;
    }
</style>
````

## Next Steps

* [Explore the Popup Positioning and Collision settings]({%slug popup-position-collision%})
* [Customize the Popup Animations]({%slug popup-animation%})

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPopup)
