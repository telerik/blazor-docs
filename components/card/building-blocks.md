---
title: Building Blocks
page_title: Card Building Blocks
description: Building Blocks of the Card for Blazor.
slug: card-building-blocks
tags: telerik,blazor,card,building,blocks
published: True
position: 2
components: ["card"]
---

# Card Building Blocks

The Card component supports a variety of template-based components used as building blocks. All building blocks can be rendered as root level elements of the Card and therefore can be used as desired with no restriction in their place of declaration or requirement for the Card structure. The elements can also be nested inside each other.


* [`CardHeader`](#cardheader) - renders header area, useful for title, subtitle, etc. Has a separator after itself.

* [`CardBody`](#cardbody) - renders the body of the card with added paddings.

* [`CardFooter`](#cardfooter) -  renders footer area separated from the content through a separator.

* [`CardImage`](#cardimage) - renders card image to fill the size of the card. Read more in the [Card Image article](slug:card-image).

* [`CardActions`](#cardactions) - renders dedicated area for actions. Read more in the [Actions article](slug:card-actions).

* [`CardSeparator`](#cardseparator) - renders a horizontal line. Read more in the [Card Separator](slug:card-separator) article.

* [`CardTitle`](#cardtitle) - renders div title with default theme styling.

* [`CardSubTitle`](#cardsubtitle) - renders div title with default theme styling as sub title.


## CardHeader

Use the `CardHeader` tag to render header area of the Card.

>caption Render `CardHeader` area. The result from the snippet below.

![Card Header](images/card-header-example.png)

<demo metaUrl="client/card/building-blocks/header/" height="350"></demo>

## CardBody

Use the `CardBody` tag to render the body of the Card.

>caption Render `CardBody` area. The result from the snippet below.

![Card Body](images/card-body-example.png)

<demo metaUrl="client/card/building-blocks/body/" height="300"></demo>

## CardFooter

Use the `CardFooter` tag to render the footer area of the Card.

>caption Render `CardFooter` area. The result from the snippet below.

![Card Footer](images/card-footer-example.png)

<demo metaUrl="client/card/building-blocks/footer/" height="350"></demo>

## CardImage

Use the [`CardImage`](slug:card-image) tag to render the image section of the Card. The image will fill the size of the card unless you set any other `Width` and `Height` values.

>caption Use `CardImage` in the Card component. The result from the snippet below.

![Card Image](images/image-example.png)

<demo metaUrl="client/card/building-blocks/image/" height="450"></demo>

## CardActions

Use the [`CardActions`](slug:card-actions) tag to render the actions area of the Card. You could place any action buttons inside and style them with the predefined orientation and layout of the buttons.

>caption Use `CardActions` in the Card component. The result from the snippet below.

![Card Actions](images/card-actions-example.png)

<demo metaUrl="client/card/building-blocks/actions/" height="400"></demo>

## CardSeparator

Use the `CardActions` tag to render the actions area of the Card. An example of [`CardSeparator`](slug:card-separator) used between Card elements or nested inside an element.

>caption Use `CardSeparator` in the Card component. The result from the snippet below.

![Card Separator](images/card-separator-example.png)

<demo metaUrl="client/card/building-blocks/separator/" height="450"></demo>

## CardTitle

Use the `CardTitle` tag to render a title (heading). Although the header area is suitable for placing title, it is not required and you can use the `CardTitle` as desired. The below sample demonstrates implementation of a title in three different sections.

>caption Use `CardTitle` in the Card component. The result from the snippet below.

![Card Footer](images/card-title-example.png)

<demo metaUrl="client/card/building-blocks/title/" height="400"></demo>


## CardSubTitle

Use the `CardSubTitle` tag to render sub title. Although the header area is suitable for placing title and sub title, it is not required and you can use the `CardSubTitle` as desired. It can also be used along with the `CardTitle` or as a standalone element. The below sample demonstrates both approaches.

>caption Use `CardSubTitle` in the Card component. The result from the snippet below.

![Card Footer](images/card-subtitle-example.png)

<demo metaUrl="client/card/building-blocks/subtitle/" height="400"></demo>

## See Also

* [Live Demo: Card Building Blocks](https://demos.telerik.com/blazor-ui/card/building-blocks)