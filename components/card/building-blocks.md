---
title: Building Blocks
page_title: Card Building Blocks
description: Building Blocks of the Card for Blazor.
slug: card-building-blocks
tags: telerik,blazor,card,building,blocks
published: True
position: 2
---


The Card component supports a variety of template-based components used as building blocks


* [`CardHeader`](#cardheader) - renders header area, useful for title, subtitle, etc.

* [`CardBody`](#cardbody) - renders the body of the card with added paddings.

* [`CardFooter`](#cardfooter) -  renders footer area separated from the content through separator

* [`CardImage`](#cardimage) - renders card image to fill the size of the card. Read more in the [CardImage article]({%slug card-image%}).

* [`CardActions`](#cardactions) - renders dedicated area for actions. You could place any action buttons inside and style them with the predefined orientation and layout of the buttons. Read more in the [Actions article]({%slug card-actions%}).

* [`CardSeparator`](#cardseparator) - renders a horizontal line. It could be used it as a standalone building block, or inside any of the above blocks. When used as nested component, it will be rendered in accordance to any margin applied to the content.

* [`CardTitle`](#cardtitle) - renders div title with default theme styling.

* [`CardSubTitle`](#cardsubtitle) - renders div title with default theme styling as sub title.


## CardHeader

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



## CardActions

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

An example of `CardSeparator` used between Card elements or nested inside an element. Read more in the [CardSeparator article]({%slug %}). The result from the snippet below.

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