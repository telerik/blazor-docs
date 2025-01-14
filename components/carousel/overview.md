---
title: Overview
page_title: Overview - Carousel for Blazor
description: Overview of the Carousel for Blazor.
slug: carousel-overview
tags: telerik,blazor,carousel,overview
published: True
position: 0
---

# Blazor Carousel Overview

The <a href = "https://www.telerik.com/blazor-ui/carousel" target="_blank">Carousel for Blazor</a> is an interactive component that allows users to browse a collection of content items (pages) one at a time. The Carousel template supports random web content, although it is most often used to display images.

## Creating Blazor Carousel

1. Use the `TelerikCarousel` tag to add the component to your razor page.
1. Populate the `Data` property with your collection of items.
1. Use the nested [`<Template>`](slug://carousel-template) tag to declare the HTML content that you want to display.
1. Set `Width` and `Height` attributes of the Carousel, according to the content to display.

>caption Carousel with 5 pages and some basic content

````RAZOR
@* Blazor Carousel *@

<TelerikCarousel Data="@CarouselData"
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

## Template

To display any content in the Carousel, use a [Template](slug://carousel-template) and place your desired markup inside. If a template is not set, the Carousel will not display anything.

## Events

The Blazor Carousel generates events that you can handle and further customize its behavior. [Read more about the Blazor Carousel events...](slug://carousel-events)

## Carousel Parameters

The following table lists Carousel parameters. Check the [Carousel API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikCarousel-1) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
|---|---|---|
| `Arrows` | `bool` <br/> (`true`) | Whether the navigation arrow buttons will be shown.|
| `LoopPages` | `bool` <br/> (`true`) | Whether the Carousel will switch to the first page, when the last one is reached.|
| `Pageable` | `bool` <br/> (`true`) | Whether the overlay pager will be visible. Each page is represented by a clickable dot. The current page is represented by a colored dot. If the dots cannot fit in the available horizontal space, the pager will be scrollable.|
| `Page` | `int` <br/> ( 1 ) | The 1-based index of content item to display. Supports two-way binding.|
| `AutomaticPageChange` | `bool` <br/> (`true`) | Whether the Carousel will automatically switch to the next page after a short delay.|
| `AutomaticPageChangeInterval` | `int` <br/> ( 5000 )| The automatic page change delay in milliseconds.|
| `Width` | `string` | The Carousel width. See [Dimensions](slug://common-features/dimensions) for more details. The Carousel renders in a `<div>`, so it expands horizontally to 100% by default.|
| `Height` | `string` | The Carousel height. By default and by design, the component has no height and does not expand, based on its content. *In other words, the Carousel will be zero pixels high, if height is not applied.*|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the component. Use it to apply custom styles or [override the theme](slug://themes-override).
| `ThemeColor` | `string` <br /> (`"light"`) | Sets predefined colors to the Carousel component. Use the members of the static class `ThemeConstants.Carousel.ThemeColor` to set valid values. |

## Carousel Reference and Methods

To execute Carousel methods, obtain reference to the component instance via `@ref`.

The Carousel is a generic component. Its type depends on the type of its model and the type of its `Value`. In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters](slug://common-features-data-binding-overview#component-type).

The table below lists the Carousel methods. Also consult the [Carousel API](/blazor-ui/api/Telerik.Blazor.Components.TelerikCarousel-1).

| Method | Description |
| --- | --- |
| `Rebind` | [Refreshes the component data](slug://carousel-refresh-data#rebind-method). |

<div class="skip-repl"></div>
````RAZOR
<TelerikCarousel @ref="@CarouselRef" .../>

@code{
    private TelerikCarousel<MyModel> CarouselRef;
}
````

## Next Steps

* [Declare a Template](slug://carousel-template)
* [Explore the Carousel Events](slug://carousel-events)

## See Also

* [Carousel Template](slug://carousel-template)
* [Carousel Events](slug://carousel-events)
* [Carousel Live Demo](https://demos.telerik.com/blazor-ui/carousel/overview)
* [Carousel API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikCarousel-1)
