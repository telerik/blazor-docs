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
        <div class="carousel-item">Carousel page @(context)</div>
    </Template>
</TelerikCarousel>

<style>
    .carousel-item {
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

    public List<int> CarouselData { get; set; }

    protected override Task OnInitializedAsync()
    {
        CarouselData = Enumerable.Range(1, 8).ToList();

        return base.OnInitializedAsync();
    }
}
````

## See Also

* [Carousel Overview]({%slug carousel-overview%})
