---
title: Overview
page_title: Overview | Carousel for Blazor
description: Overview of the Carousel for Blazor.
slug: carousel-overview
tags: telerik,blazor,carousel,overview
published: True
position: 0
---

# Carousel Overview

The <a href = "https://www.telerik.com/blazor-ui/carousel" target="_blank">Carousel for Blazor</a> is an interactive component that allows users to browse a collection of content items (pages) one at a time. The Carousel template supports random web content, although it is most often used to display images.

#### In this article:
   * [Basics](#basics)
   * [Example](#example)
   * [Features](#features)

## Basics

To use a Telerik Carousel for Blazor:

1. Add the `TelerikCarousel` tag.
1. Set the `Data` attribute to the variable that holds the component data.
1. Add a nested [`<Template>`]({%slug carousel-template%}) tag that will define the HTML content to display.
1. Set `Width` and `Height` attributes of the Carousel, according to the content to display.

## Example

Here is a simple Carousel that has 5 pages with some styled text.

````CSHTML
@* Blazor Carousel *@

<TelerikCarousel Data="@CarouselData"
                 Width="400px" Height="200px">
    <Template>
        <div class="carousel-item">ID @(context.ID) : @(context.Text)</div>
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
>caption The snippet will produce the following result:
![Carousel component](images/carousel-overview.png)

## Features

The Carousel provides the following features:

* `Arrows` - `bool` - shows or hides the overlay arrow buttons that navigate the Carousel pages (`true` by default).
* `LoopPages` - `bool` - enables the Carousel to switch to the first page, when the last one is reached (`true` by default).
* `Pageable` - `bool` - shows or hides the overlay pager (`true` by default). Each page is represented by a clickable dot. The current page is represented by a colored dot. If the dots cannot fit in the available horizontal space, the pager will be scrollable.
* `Page` - `int` - defines the 1-based index of content item to display (`1` by default). Supports two-way binding.
* `AutomaticPageChange` - `bool` - allows the Carousel to switch the next page automatically after a short delay (`true` by default).
* `AutomaticPageChangeInterval` - `int` - defines the automatic page change delay in milliseconds (`5000` by default).
* `Width` - `string` - sets the Carousel width as a CSS string. See [Dimensions]({%slug common-features/dimensions%}) for more details. The Carousel renders in a `<div>`, so it expands horizontally to 100% by default.
* `Height` - `string` - sets the Carousel height as a CSS string. By default and by design, the component has no height and does not expand, based on its content. *In other words, the Carousel will be zero pixels high, if a height is not applied.*
* [Template]({%slug carousel-template%}) for the Carousel content
* `Class` - `string` - sets a custom CSS class to the component. To customize the appearance of all Carousels, you can also use its default CSS class `k-scrollview`.

>tip You can use `Class` to set the Carousel dimensions, instead of `Width` and `Height`.

## See Also

* [Carousel Template]({%slug carousel-template%})
* [Carousel Events]({%slug carousel-events%})
* [Carousel Live Demo](https://demos.telerik.com/blazor-ui/carousel/overview)
