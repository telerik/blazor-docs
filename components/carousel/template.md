---
title: Template
page_title: Template | Carousel for Blazor
description: How to use the Template of the Carousel for Blazor.
slug: carousel-template
tags: telerik,blazor,carousel,template
published: True
position: 10
---

# Carousel Template

The Carousel template defines the markup to be rendered by the component. If a template is not set, the Carousel will not display anything.

The nested `<Template>` tag of the `<TelerikCarousel>` represents a standard [`RenderFragment`](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/templated-components).

The template exposes a `context` parameter, which allows access to the Carousel model and its properties. The context variable can assume a custom name, which is needed for nesting templates of different components.

````CSHTML
@* Blazor Carousel - template context usage *@

<TelerikCarousel Data="@CarouselData"
                 Width="400px" Height="200px">
    <Template Context="carouselContext">
        <div class="carousel-item">@carouselContext.Text</div>
    </Template>
</TelerikCarousel>

<style>
    .carousel-item {
        background: #3d57d8;
        color: #fff;
        font: 36px/200px sans-serif;
        text-align: center;
    }
</style>

@code {
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

## See Also

* [Carousel Events]({%slug carousel-events%})
* [Carousel Live Demo](https://demos.telerik.com/blazor-ui/carousel/overview)
