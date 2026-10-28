---
title: Overview
page_title: Filter Overview
description: Discover the Blazor Filter and explore the examples.
slug: filter-overview
tags: telerik,blazor,filter,overview
published: True
position: 0
components: ["filter"]
---

# Blazor Filter Overview

The <a href="https://www.telerik.com/blazor-ui/filter" target="_blank">Blazor Filter component</a> serves as a complementary addition to data-bound components that do not have built-in filtering.

The component gives a unified way to build filter descriptors using its [fields](slug:filter-fields). You can also define different field operators and use these filter descriptors to filter data.

## Creating Blazor Filter

1. Use the `TelerikFilter` tag to add the component to your razor page.
2. Set the `Value` parameter via one-way or two-way binding.
3. Add the `FilterField` tag, a child tag of the `FilterFields`.
4. Set the `Name` and `Type` properties.

>caption A basic configuration of the Telerik Filter.

<demo metaUrl="client/filter/overview/example-2/" height="420"></demo>

## Fields

The fields are responsible for setting up the Filter information. [Read more about the supported Blazor Filter fields...](slug:filter-fields)

## Events

The Blazor Filter generates events that you can handle and further customize its behavior. [Read more about the Blazor Filter events...](slug:filter-events).

## Filter Parameters

The Blazor Filter provides parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The class that will be rendered on the outermost element. |
| `Value` | [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering) | Sets the value of the Filter component. |

## Filter Reference and Methods

The Filter exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Rebind` | Processes the component `Value` and updates the component UI. |

>caption Using the Filter component reference and methods

<demo metaUrl="client/filter/overview/example-1/" height="420"></demo>


## Next Steps

* [Configure Filter Fields](slug:filter-fields)
* [Handle Filter Events](slug:filter-events)

## See Also

* [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)
