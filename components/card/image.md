---
title: Image
page_title: Image
description: CardImage building block of the Card for Blazor.
slug: card-image
tags: telerik,blazor,card,image
published: True
position: 7
---

# CardImage

Every Blazor Card can have a dedicated area to render a card image that will fill the size of the card. The content of the CardImage as well as its size is completely customizable through the available configuration options.

>caption Use the CardImage building block to insert an image in the Card

````RAZOR
@* Insert an image in the Card *@

<TelerikCard Width="200px">
    <CardHeader>
        <CardTitle>Bulgarian Mountains</CardTitle>
        <CardSubTitle>Bulgaria, Europe</CardSubTitle>
    </CardHeader>

    <CardImage Src="https://demos.telerik.com/blazor-ui/images/cards/bg/rila_lakes.jpg"></CardImage>

    <CardActions Layout="CardActionsLayout.Stretch">
        <TelerikButton Class="k-flat" Icon="@SvgIcon.HeartOutline" Title="Like"></TelerikButton>
        <TelerikButton Class="k-flat" Icon="@SvgIcon.Comment" Title="Comment"></TelerikButton>
        <TelerikButton Class="k-flat" Icon="@SvgIcon.Share" Title="Share"></TelerikButton>
    </CardActions>
</TelerikCard>
````

## Features

The CardImage provides the following features:

* `Class` - `string` - the CSS class that will be rendered on the main wrapping container of the image.

* `Src` - `string` - defines the source of the image.

* `Width` - `string` - defines width of the image.

* `Height` - `string` - defines the height of the image.

## See Also

  * [Live Demo: Card Building Blocks](https://demos.telerik.com/blazor-ui/card/building-blocks)
