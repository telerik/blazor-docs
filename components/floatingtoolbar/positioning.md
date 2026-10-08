---
title: Positioning
page_title: Floating Toolbar Positioning
description: Position the Blazor Floating Toolbar next to an anchor element or at a free viewport location.
slug: floatingtoolbar-positioning
tags: telerik,blazor,floating toolbar,positioning
published: True
position: 10
components: ["floatingtoolbar"]
---

# Floating Toolbar Positioning

The Floating Toolbar supports anchored and free-position modes. The `AnchorSelector` parameter determines the effective mode.

## Anchoring to an Element

Set `AnchorSelector` to a CSS selector for the target element. Set `Position` to choose the preferred side of the anchor. The component can change the final position when collision handling is required.

<demo metaUrl="client/floatingtoolbar/positioning/anchor/example-1/" height="340"></demo>

An invalid or unmatched `AnchorSelector` prevents the show operation. Clear the anchor before switching to a free position.

## Using Free-Position Mode

Omit `AnchorSelector` to position the Floating Toolbar inside its containing element. Configure the initial location with the following parameters:

* `HorizontalAlign` - Aligns the component to the left, center, or right edge of its containing element.
* `VerticalAlign` - Aligns the component to the top, center, or bottom edge of its containing element.
* `HorizontalOffset` - Sets the horizontal distance in pixels from the aligned edge.
* `VerticalOffset` - Sets the vertical distance in pixels from the aligned edge.

<demo metaUrl="client/floatingtoolbar/positioning/free-position/example-1/" height="340"></demo>

Use the `FloatingToolBarHorizontalAlign` values `Left`, `Center`, and `Right` for `HorizontalAlign`. Use the `FloatingToolBarVerticalAlign` values `Top`, `Center`, and `Bottom` for `VerticalAlign`.

## Sticky Behavior

Anchor the Floating Toolbar to an element with `position: sticky` to keep the toolbar visible while the user scrolls its container.

<demo metaUrl="client/floatingtoolbar/positioning/sticky/example-1/" height="560"></demo>

## Positioning with Methods

Use a component reference to position the Floating Toolbar programmatically. All methods are asynchronous so the app can observe DOM positioning and JavaScript errors.

<demo metaUrl="client/floatingtoolbar/positioning/methods/example-1/" height="340"></demo>

Refer to the [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar) for all available methods.

Calling `ShowAsync()` while the component is visible updates its position without changing `Visible` or raising `VisibleChanged`.

## See Also

* [Floating Toolbar Overview](slug:floatingtoolbar-overview)
* [Enable Floating Toolbar Drag Support](slug:floatingtoolbar-drag-and-drop)
* [Floating Toolbar API Reference](slug:Telerik.Blazor.Components.TelerikFloatingToolBar)