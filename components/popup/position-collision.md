---
title: Position and Collision
page_title: Popup Position and Collision
description: Discover the placement settings of the Popup for Blazor. Learn how to configure the Popup position and handle collisions.
slug: popup-position-collision
tags: telerik,blazor,popup,position,collision
published: True
position: 10
components: ["popup"]
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

<demo metaUrl="client/popup/position-collision/" height="560"></demo>

## See Also

* [Live Popup Demos](https://demos.telerik.com/blazor-ui/popup/overview)
* [Popup API Reference](slug:Telerik.Blazor.Components.TelerikPopup)
