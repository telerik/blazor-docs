---
title: Events
page_title: Events - Carousel for Blazor
description: Events in the Carousel for Blazor.
slug: carousel-events
tags: telerik,blazor,carousel,events
published: true
position: 20
components: ["carousel"]
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

<demo metaUrl="client/carousel/events/page-changed/" height="300"></demo>

@[template](/_contentTemplates/carousel/general.md#carousel-item-class)

## See Also

* [Carousel Overview](slug:carousel-overview)
