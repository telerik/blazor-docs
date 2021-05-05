---
title: Building Blocks
page_title: Card Building Blocks
description: Building Blocks of the Card for Blazor.
slug: card-building-blocks
tags: telerik,blazor,card,building,blocks
published: True
position: 2
---

# Card Building Blocks

The Card component supports a variety of template-based components used as building blocks. All building blocks are rendered as root level elements of the Card and therefore can be used as desired with no restriction in their place of declaration or requirement for the Card structure. The elements can also be nested inside each other.


* [`CardHeader`](#cardheader) - renders header area, useful for title, subtitle, etc.

* [`CardBody`](#cardbody) - renders the body of the card with added paddings.

* [`CardFooter`](#cardfooter) -  renders footer area separated from the content through separator.

* [`CardImage`](#cardimage) - renders card image to fill the size of the card. Read more in the [Card Image article]({%slug card-image%}).

* [`CardActions`](#cardactions) - renders dedicated area for actions. Read more in the [Actions article]({%slug card-actions%}).

* [`CardSeparator`](#cardseparator) - renders a horizontal line. Read more in the [Card Separator]({%slug card-separator%}) article.

* [`CardTitle`](#cardtitle) - renders div title with default theme styling.

* [`CardSubTitle`](#cardsubtitle) - renders div title with default theme styling as sub title.


## CardHeader

Use the `CardHeader` tag to render header area of the Card.

>caption Render `CardHeader` area. The result from the snippet below.

![Card Header](images/card-header-example.png)

````CSHTML
@* Card Header *@

<TelerikCard Width="200px">
    <CardHeader>
        <strong>This is the Card Header.</strong>
    </CardHeader>
    <CardBody>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </CardBody>       
</TelerikCard>
````

## CardBody

Use the `CardBody` tag to render the body of the Card.

>caption Render `CardBody` area. The result from the snippet below.

![Card Body](images/card-body-example.png)

````CSTHML
@* Card Body *@

<TelerikCard Width="200px">
    <CardBody>        
        <p><strong>This is the Card Body.</strong> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </CardBody>       
</TelerikCard>
````

## CardFooter

Use the `CardFooter` tag to render the footer area of the Card.

>caption Render `CardFooter` area. The result from the snippet below.

![Card Footer](images/card-footer-example.png)

````CSHTML
@* Card Footer *@

<TelerikCard Width="200px">
    <CardBody>        
        <p> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </CardBody>  
    <CardFooter>
        <strong>This is the Card Footer.</strong>
    </CardFooter>
</TelerikCard>
````

## CardImage

Use the `CardImage` tag to render the image section of the Card. The image will fill the size of the card unless you set any other `Width` and `Height` values.

>caption Use `CardImage` in the Card component. The result from the snippet below.

![Card Image](images/image-example.png)

````CSHTML
@*Card Image*@

<TelerikCard Width="200px">
    <CardHeader>
        <CardTitle>Rome</CardTitle>
        <CardSubTitle>Capital of Italy</CardSubTitle>
    </CardHeader>
    <CardImage Src="https://docs.telerik.com/blazor-ui/components/card/images/rome.jpg"></CardImage>
</TelerikCard>
````

## CardActions

Use the `CardActions` tag to render the actions area of the Card. You could place any action buttons inside and style them with the predefined orientation and layout of the buttons.

>caption Use `CardActions` in the Card component. The result from the snippet below.

![Card Actions](images/card-actions-example.png)

````CSHTML
@* Card Actions *@

<TelerikCard Width="200px">
    <CardBody>        
        <p> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </CardBody>  
    <CardSeparator></CardSeparator>
    <CardActions Layout="CardActionsLayout.Center">
        <TelerikButton Class="k-flat">Action 1</TelerikButton>        
        <TelerikButton Class="k-flat">Action 2</TelerikButton>       
    </CardActions>
</TelerikCard>
````

## CardSeparator

Use the `CardActions` tag to render the actions area of the Card. An example of `CardSeparator` used between Card elements or nested inside an element.

>caption Use `CardSeparator` in the Card component. The result from the snippet below.

![Card Separator](images/card-separator-example.png)

````CSHTML
@* Card Separator *@

<TelerikCard Width="200px">
    <CardBody>        
        <p> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <CardSeparator></CardSeparator>
        <p>Some other text in the Card Body after the separator.</p>
    </CardBody>  
    <CardSeparator></CardSeparator>
    <CardActions Layout="CardActionsLayout.Center">
        <TelerikButton Class="k-flat">Action 1</TelerikButton>
        <CardSeparator Orientation="CardOrientation.Vertical"></CardSeparator>
        <TelerikButton Class="k-flat">Action 2</TelerikButton>       
    </CardActions>
</TelerikCard>
````

## CardTitle

Use the `CardTitle` tag to render title. Although the header area is suitable for placing title, it is not required and you can use the `CardTitle` as desired. The below sample demonstrates implementation of a title in three different sections.

>caption Use `CardTitle` in the Card component. The result from the snippet below.

![Card Footer](images/card-title-example.png)

````CSHTML
@* Card Title *@

<TelerikCard Width="200px">
    <CardTitle>This is standalone Title </CardTitle>    
    <CardHeader>
        <CardTitle>This is Title in the Card Header</CardTitle>
    </CardHeader>
    <CardBody>
        <CardTitle>This is Title in the Card Body</CardTitle>
        <p> Some quick example text to build on the card title and make up the bulk of the card's content.</p>        
    </CardBody>  
</TelerikCard>
````


## CardSubTitle

Use the `CardSubTitle` tag to render sub title. Although the header area is suitable for placing title and sub title, it is not required and you can use the `CardSubTitle` as desired. It can also be used along with the `CardTitle` or as a standalone element. The below sample demontstrates both approaches.

>caption Use `CardSubTitle` in the Card component. The result from the snippet below.

![Card Footer](images/card-subtitle-example.png)

````CSHTML
@* Card Subtitle *@

<TelerikCard Width="200px">       
    <CardHeader>
        <CardTitle>This is Title in the Card Header</CardTitle>
        <CardSubTitle>This is Subtitle in the Card Header along with Title</CardSubTitle>
    </CardHeader>
    <CardBody>
        <CardSubTitle><strong>Just Subtitle in the Card Body</strong></CardSubTitle>        
        <p> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </CardBody>  
</TelerikCard>
````

## See Also

* [Live Demo: Card Building Blocks](https://demos.telerik.com/blazor-ui/card/building-blocks)