---
title: Overview
page_title: Card Overview
description: Discover the Blazor Card and explore the examples.
slug: card-overview
tags: telerik,blazor,card,overview
published: True
position: 0
---


# Blazor Card Overview

The <a href = "https://www.telerik.com/blazor-ui/card" target="_blank">Card for Blazor</a> is a component that combines text, visual content and actions about a single subject. It quickly grabs the user’s attention with its clean layout, consisting of a title, usually an image, some text as the body and perhaps a footer. You can use it to easily organize content when building catalogs, dashboards, blogs, e-shops, etc. It has dedicated areas for its [building blocks](slug:card-building-blocks) and that provides various ways of component usage.


## Creating Card

1. Use the `TelerikCard` tag to add the component to your razor page.

1. Add the desired Building Blocks - explore the available elements in the [Card Building Blocks](slug:card-building-blocks) article.

1. (Optional) Configure the Card settings such as ThemeColor, [Orientation](slug:card-orientation).

The below snippet demonstrates the setup of a Card component with all building blocks implemented. You don't have to use them all.

````RAZOR
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
    <CardActions Layout="@CardActionsLayout.Stretch">
        <TelerikButton Class="k-flat" Icon="@SvgIcon.HeartOutline" Title="Like"></TelerikButton>
        <TelerikButton Class="k-flat" Icon="@SvgIcon.Comment" Title="Comment"></TelerikButton>
        <TelerikButton Class="k-flat">Read More</TelerikButton>
    </CardActions>
    <CardFooter>
        <span style="float:left">Created by @@john</span>
        <span style="float:right">March 05, 2021</span>
    </CardFooter>
</TelerikCard>
````

## Parameters

The Card provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter   | Type | Description |
| ----------- | ----------- | -------|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Card.
| `ChildContent` | `RenderFragment` | Defines the child content of the component. All possible [Card Building Blocks](slug:card-building-blocks) can be directly used as a `ChildContent` of the Card.
| `Height` | `string` | Defines the height of the component.
| `Orientation` | `CardOrientation` | Defines the orientation of the card. Takes a member of the `Telerik.Blazor.CardOrientation` enum (`Horizontal` or `Vertical`). Read more in the [Card Orientation article](slug:card-orientation).
| `ThemeColor` | `string` | Defines the appearance of the component. We support predefined theme colors such as primary, secondary, tertiary, success, info, warning, error, dark, light, and inverse (members of the `Telerik.Blazor.ThemeConstants.Card` class). Test changing the Card theme colors in our [live demo](https://demos.telerik.com/blazor-ui/card/appearance).
| `Width` | `string` | Defines the width of the component.


>tip To make multiple Cards occupy the same **height** automatically, use the predefined [Deck or Group layouts](slug:card-layouts). If the Cards should wrap to multiple rows, use the custom [Tile layout](https://demos.telerik.com/blazor-ui/card/data-cards). It is also possible to set a specific height to Cards with a CSS rule.


## Next Steps

* [Card Building Blocks](slug:card-building-blocks)
* [Card Actions](slug:card-actions)

## See Also

  * [Live Demo: Card Overview](https://demos.telerik.com/blazor-ui/card/overview)
