---
title: Events
page_title: Filter - Events
description: Discover the Blazor Filter events and explore the examples.
slug: filter-events
tags: telerik,blazor,filter,events,event
published: true
position: 11
components: ["filter"]
---

# Filter Events

This article explains the available events for the Telerik Filter for Blazor:

* [OnUpdate](#onupdate)

## OnUpdate

The `OnUpdate` event fires when the user changes the Filter `Value`. The component is designed for one-way binding and works directly with the object reference of the bound `CompositeFilterDescriptor`. The component updates the `Value` internally. Use the `OnUpdate` event to handle any additional logic when the Filter `Value` is modified.

>caption Handle OnUpdate

<demo metaUrl="client/filter/events/example-1/" height="420"></demo>

## See Also

* [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)