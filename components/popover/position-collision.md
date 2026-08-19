---
title: Position and Collision
page_title: Popover Position and Collision
description: Discover the placement settings of the Popover for Blazor. Learn how to configure the Popover position and handle collisions.
slug: popover-position-collision
tags: telerik,blazor,popover,popover,align,position,collision
published: True
position: 10
components: ["popover"]
---

# Popover Position and Collision Settings

This article outlines the available settings which enable you to control the position of the Popover based on its anchor and dictate how the component responds to insufficient screen space.

The [example](#example) below lets you customize the Popover `Position`, `Offset`, and `Collision` parameters and see how they affect the component.

## Position

To customize how the popover aligns with its anchor element, use the `Position` parameter and set its value to a member of the `PopoverPosition` enum:

* `Top` (default value)
* `Bottom`
* `Left`
* `Right`

## Offset

The `Offset` moves the Popover further away from its anchor in the direction that is consistent with the `Position` parameter value. For example, the Popover will move further down when the `Position` is set to `Bottom`.

## Collision

To define how the Popover reacts to insufficient screen space, set the `Collision` parameter to a member of the `PopoverCollision` enum:

* `Fit`&mdash;The Popover will shift until it is fully visible on the screen.
* `Flip`&mdash;The Popover will render on the other side of the anchor.

## Example

The following example lets you experiment with the available settings that control the position and collision behavior of the Popover. It starts with the default component behavior.

>caption Popover Position and Collision

<demo metaUrl="client/popover/position-collision/" height="520"></demo>

## See Also

* [How to Align Popover with Anchor After Content and Size Change](slug:popover-kb-refresh-callout-position)
