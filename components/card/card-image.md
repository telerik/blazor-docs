---
title: CardImage
page_title: CardImage
description: CardImage building block of the Card for Blazor.
slug: card-image
tags: telerik,blazor,card,image
published: True
position: 3
---

# CardImage

Every Blazor Card has a dedicated area to render a card image that will fill the size of the card. The content of these action items, as well as their overall layout and orientation, is completely customizable through the available configuration options.

## Features

>caption The CardImage provides the following features:

* `Class` - string - the CSS class that will be rendered on the main wrapping container of the image.

* `Src` - `string` - defines the source of the image.

* `Width` - string - defines width of the image.

* `Height` - string - defines the height of the image.

>caption Use the CardImage builing block to insert an image in the Card. The result from the snippet below.

![Image in Card](images/cardimage-example.png)

````CSHTML
@* Insert an image in the Card *@

<TelerikCard Width="200px">
    <CardHeader>
        <CardTitle>Bulgarian Mountains</CardTitle>
        <CardSubTitle>Bulgaria, Europe</CardSubTitle>
    </CardHeader>
    <CardImage Src="https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg"></CardImage>
    <CardActions Layout="CardActionsLayout.Stretched">
        <TelerikButton Class="k-flat" Icon="heart-outline" Title="Like"></TelerikButton>
        <TelerikButton Class="k-flat" Icon="comment" Title="Comment"></TelerikButton>
        <TelerikButton Class="k-flat" Icon="share" Title="Share"></TelerikButton>
    </CardActions>
</TelerikCard>
````

## See Also

  * [Live Demo: Card](https://demos.telerik.com/blazor-ui/card/building-blocks)