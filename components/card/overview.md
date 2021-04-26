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

The Card for Blazor is a component that combines text, visual content and actions about a single subject. It quickly grabs the user’s attention with its clean layout, consisting of a title, usually an image, some text as the body and perhaps a footer. You can use it to easily organize content when building catalogues, dashboards, blogs, e-shops, etc. It has a dedicated areas for its building blocks and that provide various ways of commponent usage.

#### To use a Telerik Card for Blazor

1. add the `TelerikCard` tag
1. add the desired [Card Building Blocks](#card-building-blocks)


## Card Building Blocks

The Card component supports the following template-based components used as building blocks:

* `CardHeader` - renders header area, useful for title, subtitle, etc.

* `CardImage` - renders card image to fill the size of the card.

* `CardBody` - renders the body of the card with added paddings.

* `CardFooter` -  renders footer area separated from the content through separator

* `CardActions` - renders dedicated area for actions. You could place any action buttons inside and style them with the predefined orientation and layout of the buttons. Read more in the [Actions article]({%slug card-actions%})

* `CardSeparator` - renders a horizontal line. It could be used it as a standalone building block, or inside any of the above blocks. When used as nested component, it will be rendered in accordance to any margin applied to the content.

* `CardTitle` - renders div title with default theme styling.

* `CardSubTitle` - renders div title with default theme styling as sub title.


## Features

>caption The Card provides the following features:

* `Width` - string - defines width of the component

* `Class` - string - the CSS class that will be rendered on the main wrapping element of the Card.

* `Orientation` - `CardOrientation` - defines the orientation of the card. Takese a member of the `Telerik.Blazor.CardOrientation` enum:
    * `Horizontal`
    * `Vertical`

* `ThemeColor` - string - defines the appearance of the component. We support predefined theme colors such as info, error, success (members of the `Telerik.Blazor.ThemeColors` class).

* `ChildContent` - `RenderFragment` - defines the child content of the component.

>caption Setup of a Card component with all building blocks implemented. The resut from the snippet below.

![Card component](images/overview-card-example.png)

````CSHTML
@* Blazor Card with all building blocks included *@

<TelerikCard Width="300px">
    <CardHeader>
        <CardTitle>Tourism</CardTitle>        
    </CardHeader>
    <CardImage Src="https://demos.telerik.com/blazor-ui/images/cards/places/rome.jpg"></CardImage>
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
    <CardFooter Class="k-hbox justify-space-between">
        <span>Created by @@john</span>
        <span>March 05, 2021</span>
    </CardFooter>
</TelerikCard>

<style>
    .justify-space-between {
        justify-content: space-between;
    }
</style>
````


## See Also

  * [Live Demo: Card](https://demos.telerik.com/blazor-ui/card/overview)