---
title: Position
page_title: AppBar Position
description: Position settings of the AppBar for Blazor.
slug: appbar-position
tags: telerik,blazor,appbar,navbar,position
published: True
position: 35
---

# Position Settings

This article outlines the available AppBar parameters, which control its position.

>note Read the [CSS positioning MDN documentation article](https://developer.mozilla.org/en-US/docs/Web/CSS/position) to get a better understanding of how the AppBar component positioning works.

## Position

The `Position` parameter accepts a member of the `AppBarPosition` enum and sets the `top` and `bottom` CSS properties:

| Enum members | Description |
|---------------|--------|
| `None` <br /> default value   | Does not set any values for the `top` and `bottom` CSS properties. |
| `Top` | Sets the `top: 0` and `bottom: auto` CSS properties. |
| `Bottom`   | Sets the `top: auto` and `bottom: 0` CSS properties. | 

>info The `Position` parameter takes effect when used with fixed [PositionMode](#positionmode).

## PositionMode

The `PositionMode` parameter accepts a member of the `AppBarPositionMode` enum and sets how the AppBar is positioned according to the [flow of the document](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow):

| Enum members | Description |
|---------------|--------|
| `Static` <br /> default value   | The AppBar is positioned according to the normal flow of the document. |
| `Fixed` | The AppBar is removed from the normal document flow, and no space is created for the element in the page layout. The component is positioned relatively to the viewport of the application. |
| `Sticky`   | The AppBar is positioned according to the normal flow of the document, and then offset relative to its nearest scrolling ancestor | 

## See Also

  * [Live Demo: AppBar Position](https://demos.telerik.com/blazor-ui/appbar/position)