---
title: Position and Collision
page_title: Popup Position and Collision
description: Discover the placement settings of the Popup for Blazor. Learn how to configure the Popup position and handle collisions.
slug: popup-position-collision
tags: telerik,blazor,popup,position,collision
published: True
position: 10
---

# Popup Position and Collision

This article outlines how to control the position of the Popup based on its anchor and dictate how the component responds to insufficient screen space.

## Position

You can customize how the popup and its anchor align with each other. You can use the available parameters to control the position of the component.

### Anchor Alignment

Use the available parameters to control which part of the anchor touches the Popup.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `AnchorHorizontalAlign` | `PopupAnchorHorizontalAlign` | `Center` <br /> `Left` (default value) <br /> `Right` |
| `AnchorVerticalAlign` | `PopupAnchorVerticalAlign` | `Bottom` (default value) <br /> `Center` <br /> `Top` |

See the [example](#example) below to customize the available parameters and see how they affect the Popup component.

### Popup Alignment

Use the available parameters to control which side of the Popup is in contact with the anchor.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalAlign` | `PopupHorizontalAlign` | `Center` <br /> `Left` (default value) <br /> `Right` |
| `VerticalAlign` | `PopupVerticalAlign` | `Bottom` <br /> `Center` <br /> `Top` (default value) |

## Collision

There are two collision modes available for the Popup component:

* `Fit`&mdash;The Popup will shift until it is fully visible on the screen.
* `Flip`&mdash;The Popup will render on the other side of the anchor.

Use the available parameters to control how the Popup reacts to insufficient screen space.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Enum Members |
| ----------- | ----------- | ----------- |
| `HorizontalCollision` | `PopupCollision ` | `Fit` (default value) <br /> `Flip`  |
| `VerticalCollision` | `PopupCollision ` | `Fit` <br /> `Flip` (default value) |

See the [example](#example) below to customize the available parameters and see how they affect the Popup component.

## Example

The following example lets you experiment with the available settings that control the position and collision behavior of the Popup. It starts with the default component behavior.

````RAZOR
<div>
    <label>
        Anchor Horizontal Align
        <TelerikDropDownList @bind-Value="@PopupAnchorHorizontalAlign" Data="@PopupAnchorHorizontalAligns" Width="200px" />
    </label>
</div>
<div>
    <label>
        Anchor Vertical Align
        <TelerikDropDownList @bind-Value="@PopupAnchorVerticalAlign" Data="@PopupAnchorVerticalAligns" Width="200px" />
    </label>
</div>
<div>
    <label>
        Popup Horizontal Align
        <TelerikDropDownList @bind-Value="@PopupHorizontalAlign" Data="@PopupHorizontalAligns" Width="200px" />
    </label>
</div>
<div>
    <label>
        Popup Vertical Align
        <TelerikDropDownList @bind-Value="@PopupVerticalAlign" Data="@PopupVerticalAligns" Width="200px" />
    </label>
</div>
<div>
    <label>
        Horizontal Collision
        <TelerikDropDownList @bind-Value="@PopupHorizontalCollision" Data="@PopupCollisions" Width="200px" />
    </label>
</div>
<div>
    <label>
        Vertical Collision
        <TelerikDropDownList @bind-Value="@PopupVerticalCollision" Data="@PopupCollisions" Width="200px" />
    </label>
</div>

<br />

<TelerikButton OnClick="@(() => PopupRef.Show())">Show Popup</TelerikButton>
<TelerikButton OnClick="@(() => PopupRef.Hide())">Hide Popup</TelerikButton>

<TelerikPopup @ref="@PopupRef"
              AnchorSelector=".popup-target"
              AnchorHorizontalAlign="@PopupAnchorHorizontalAlign"
              AnchorVerticalAlign="@PopupAnchorVerticalAlign"
              HorizontalAlign="@PopupHorizontalAlign"
              HorizontalCollision="@PopupHorizontalCollision"
              VerticalAlign="@PopupVerticalAlign"
              VerticalCollision="@PopupVerticalCollision"
              Width="300px">
    <div style="padding: 1em; color: #fff; background: #282f89; text-align: center;">
        Telerik Blazor Animation Container
    </div>
</TelerikPopup>

<div class="popup-target styled-container">
</div>

@code {
    private TelerikPopup PopupRef { get; set; }

    private PopupAnchorHorizontalAlign PopupAnchorHorizontalAlign { get; set; } = PopupAnchorHorizontalAlign.Left;
    private PopupAnchorVerticalAlign PopupAnchorVerticalAlign { get; set; } = PopupAnchorVerticalAlign.Bottom;
    private PopupHorizontalAlign PopupHorizontalAlign { get; set; } = PopupHorizontalAlign.Left;
    private PopupVerticalAlign PopupVerticalAlign { get; set; } = PopupVerticalAlign.Top;
    private int PopupHorizontalOffset { get; set; }
    private int PopupVertivalOffset { get; set; }
    private PopupCollision PopupHorizontalCollision { get; set; } = PopupCollision.Flip;
    private PopupCollision PopupVerticalCollision { get; set; } = PopupCollision.Flip;

    private readonly List<PopupAnchorHorizontalAlign> PopupAnchorHorizontalAligns = new List<PopupAnchorHorizontalAlign>() {
        PopupAnchorHorizontalAlign.Left,
        PopupAnchorHorizontalAlign.Center,
        PopupAnchorHorizontalAlign.Right
    };

    private readonly List<PopupAnchorVerticalAlign> PopupAnchorVerticalAligns = new List<PopupAnchorVerticalAlign>() {
        PopupAnchorVerticalAlign.Bottom,
        PopupAnchorVerticalAlign.Center,
        PopupAnchorVerticalAlign.Top
    };

    private readonly List<PopupHorizontalAlign> PopupHorizontalAligns = new List<PopupHorizontalAlign>() {
        PopupHorizontalAlign.Left,
        PopupHorizontalAlign.Center,
        PopupHorizontalAlign.Right
    };

    private readonly List<PopupVerticalAlign> PopupVerticalAligns = new List<PopupVerticalAlign>() {
        PopupVerticalAlign.Bottom,
        PopupVerticalAlign.Center,
        PopupVerticalAlign.Top
    };

    private readonly List<PopupCollision> PopupCollisions = new List<PopupCollision>() {
        PopupCollision.Fit,
        PopupCollision.Flip
    };
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

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug:Telerik.Blazor.Components.TelerikPopup)
