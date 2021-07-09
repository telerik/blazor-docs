---
title: Overview
page_title: Card Overview
description: Overview of the Card for Blazor.
slug: card-overview
tags: telerik,blazor,card,overview
published: True
position: 0
---


# Card Overview

The Card for Blazor is a component that combines text, visual content and actions about a single subject. It quickly grabs the user’s attention with its clean layout, consisting of a title, usually an image, some text as the body and perhaps a footer. You can use it to easily organize content when building catalogs, dashboards, blogs, e-shops, etc. It has dedicated areas for its [building blocks]({%slug card-building-blocks%}) and that provides various ways of component usage.


#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Features](#features)

## Basics

To use a Telerik Card for Blazor:

1. add the `TelerikCard` tag

1. add the desired [Card Building Blocks]({%slug card-building-blocks%})

>tip You can see a code example below, review the [Building Blocks]({%slug card-building-blocks%}) article for more examples.

## Example 

The below snippet demonstrates the setup of a Card component with all building blocks implemented. You don't have to use them all.

>caption The result from the snippet.

![Card component](images/overview-card-example.png)

````CSHTML
@* Blazor Card with all building blocks included *@

<TelerikCard Width="300px">
    <CardHeader>
        <CardTitle>Tourism</CardTitle>
    </CardHeader>
    <CardImage Src="https://docs.telerik.com/blazor-ui/components/card/images/rome.jpg"></CardImage>
    <CardBody>
        <CardTitle>Rome</CardTitle>
        <CardSubTitle>Capital of Italy</CardSubTitle>
        <CardSeparator></CardSeparator>
        <p>
            Rome is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display.

            Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.
        </p>
    </CardBody>
    <CardActions Layout="@CardActionsLayout.Stretched">
        <TelerikButton Class="k-flat" Icon="heart-outline">Like</TelerikButton>
        <TelerikButton Class="k-flat" Icon="share">Share</TelerikButton>
        <TelerikButton Class="k-flat">Read More</TelerikButton>
    </CardActions>
    <CardFooter>
        <span style="float:left">Created by @@john</span>
        <span style="float:right">March 05, 2021</span>
    </CardFooter>
</TelerikCard>
````

## Features

The Card provides the following features:

* `Width` - `string` - defines width of the component.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the Card.

* `Orientation` - `CardOrientation` - defines the orientation of the card. Takes a member of the `Telerik.Blazor.CardOrientation` enum (`Horizontal` or `Vertical`). Read more in the [Card Orientation article]({%slug card-orientation%}).

* `ThemeColor` - `string` - defines the appearance of the component. We support predefined theme colors such as info, error, success (members of the `Telerik.Blazor.ThemeColors` class). Test changing the Card theme colors in our [live demo](https://demos.telerik.com/blazor-ui/card/appearance).

* `ChildContent` - `RenderFragment` - defines the child content of the component. All possible building blocks can be directly used as a `ChildContent` of the Card.

>tip To make multiple Cards occupy the same **height** automatically, use the predefined [Deck or Group layouts]({%slug card-layouts%}). If the Cards should wrap to multiple rows, use the custom [Tile layout](https://demos.telerik.com/blazor-ui/card/data-cards). It is also possible to set a specific height to Cards with a CSS rule.


## See Also

  * [Live Demo: Card Overview](https://demos.telerik.com/blazor-ui/card/overview)