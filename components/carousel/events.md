---
title: Events
page_title: Events | Carousel for Blazor
description: Events in the Carousel for Blazor.
slug: carousel-events
tags: telerik,blazor,carousel,events
published: true
position: 20
---

# Carousel Events

This article describes the available events of the Telerik Carousel for Blazor.

* [PageChanged](#pagechanged)

## PageChanged

The `PageChanged` event fires when:

* the user clicks on the left or right navigation arrow;
* the user clicks on a pager dot;
* the Carousel navigates to the next page automatically;

The event can be used to implement custom business logic, or update the Carousel `Page` attribute value, when using one-way binding for it.

````CSHTML
@* Handle the Carousel PageChanged event *@

<p>Page changed to index: @PageIndex</p>

<TelerikCarousel Data="@CarouselData"
                 PageChanged="@PageChangedHandler"
                 Page="@PageIndex"
                 Width="400px" Height="200px">
    <Template>
        <div class="item">ID @(context.ID) : @(context.Text)</div>
    </Template>
</TelerikCarousel>

<style>
    .item {
        background: #3d57d8;
        color: #fff;
        font: 36px/200px sans-serif;
        text-align: center;
    }
</style>

@code {

    public int PageIndex = 1;
    public async Task PageChangedHandler(int newPage)
    {
        PageIndex = newPage;
    }

    public IEnumerable<CarouselModel> CarouselData = Enumerable.Range(1, 5).Select(x => new CarouselModel
    {
        ID = x,
        Text = "Text " + x
    });

    public class CarouselModel
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }
}
````

@[template](/_contentTemplates/carousel/general.md#carousel-item-class)

## See Also

* [Carousel Overview]({%slug carousel-overview%})
