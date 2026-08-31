---
title: Separator
page_title: Card Separator
description: Separator element of the Card for Blazor.
slug: card-separator
tags: telerik,blazor,card,separator
published: True
position: 5
components: ["card"]
---

# Card Separator

The `CardSeparator` element of the Card for Blazor distinguishes separate sections or content in the Card. You can use it as a standalone building block, or inside any of the other Card elements. When used as nested component, the `CardSeparator` will be rendered in accordance to any margin applied to the content.

The `CardHeader` comes with a built-in separator at the bottom of the section and the `CardFooter` comes with a built-in separator at the top of the section. Therefore, you don't need to explicitly insert a `CardSeparator` after the `CardHeader` and before the `CardFooter` elements.


#### In this article:
   * [Standalone Card Separator](#standalone-card-separator) 
   * [Nested Card Separator](#nested-card-separator)
   * [Card Separator Orientation](#card-separator-orientation)
   * [Features](#features)

## Standalone Card Separator

Use the `CardSeparator` to distinguish `CardBody` and `CardActions` sections.

In the example below no separator is used after the `CardHeader`, the horizontal line is still present due to the built-in `CardHeader` feature.

<demo metaUrl="client/card/separator/standalone/" height="400"></demo>

## Nested Card Separator

Use the `CardSeparator` to distinguish two separate sections in the `CardBody`. The result from the snippet below.

<demo metaUrl="client/card/separator/nested/" height="400"></demo>

## Card Separator Orientation

You can change the `CardSeparator` orientation through its `Orientation` parameter.

<demo metaUrl="client/card/separator/vertical/" height="400"></demo>

## Features

The `CardSeparator` provides the following features:

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the `CardSeparator`.

* `Orientation` - `CardOrientation` - defines the orientation of the `CardSeparator`. Takes a member of the `Telerik.Blazor.CardOrientation` enum (`Horizontal` or `Vertical`).

## See Also

* [Live Demo: Card Building Blocks](https://demos.telerik.com/blazor-ui/card/building-blocks)