---
title: Position
page_title: AppBar Position
description: Position settings of the AppBar for Blazor.
slug: appbar-position
tags: telerik,blazor,appbar,navbar,position
published: True
position: 35
components: ["appbar"]
---
# Position Settings

This article outlines the available AppBar parameters, which control its position.

>note Read the [CSS positioning MDN documentation article](https://developer.mozilla.org/en-US/docs/Web/CSS/position) to get a better understanding of how the AppBar component positioning works.

## Position

The `Position` parameter accepts a member of the `AppBarPosition` enum and sets the `top` and `bottom` CSS properties:

| Enum member | Description |
|---------------|--------|
| `None` <br /> (default) | Does not set any values for the `top` and `bottom` CSS properties. |
| `Top` | Sets the `top: 0` and `bottom: auto` CSS properties. |
| `Bottom`   | Sets the `top: auto` and `bottom: 0` CSS properties. | 

>info The `Position` parameter takes effect when used with fixed [PositionMode](#positionmode).

## PositionMode

The `PositionMode` parameter accepts a member of the `AppBarPositionMode` enum and sets how the AppBar is positioned according to the [flow of the document](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow):

| Enum member | Description |
|---------------|--------|
| `Static` <br /> default value   | The AppBar displays at the position where it is defined and scrolls together with the other page content. |
| `Fixed` | The AppBar displays at a fixed place, which depends on the `Position` parameter. The component doesn't scroll with the other page content. |
| `Sticky`   | The AppBar displays at the position where it is defined. It scrolls together with the other page content, until it reaches the top of the browser viewport. Then the component will remain there. Use the `Sticky` `PositionMode` together with `Top` `Position` .| 

## See Also

  * [Live Demo: AppBar Position](https://demos.telerik.com/blazor-ui/appbar/position)