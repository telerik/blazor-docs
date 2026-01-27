---
title: Overview
page_title: Rating Overview
description: Discover the Rating component for Blazor. Learn how to add the component to your app and explore its configuration options, such as selection, precision, templates and label.
slug: rating-overview
tags: telerik,blazor,rating
published: True
position: 0
components: ["rating"]
---
# Blazor Rating Overview

The <a href = "https://www.telerik.com/blazor-ui/rating" target="_blank">Blazor Rating</a> is a component that allows you to intuitively rate by selecting number of items stars from a predefined number of items.

## Creating Blazor Rating

1. Add the `<TelerikRating>` tag to a Razor file.
2. Set the `Value` parameter to a double. It supports one-way and two-way binding.
3. (optional) Set the `Label` parameter.

>caption Basic configuration of the Blazor Rating

````RAZOR
<TelerikRating @bind-Value="@Value"
               Label="@Label">
</TelerikRating>

@code {
    private double Value { get; set; } = 1;
    private string Label => $"{Value} / 5";
}
````

## Selection

You can choose between `Continuous` and `Single` selection. The behavior depends on the `SelectionMode` parameter value. [Read more about the selection options of the Rating...](slug:rating-selection)

## Precision

You can choose between `Full` and `Half` precision. The behavior depends on the `PrecisionMode` parameter value. [Read more about the selection precision options of the Rating...](slug:rating-precision)

## Label

You can set a label with the `Label` parameter value. [Read more about the label of the Rating...](slug:rating-label)

## Templates

You can use templates to customize the rendering and appearance of the component. [Read more about the templates of the Rating...](slug:rating-templates)

## Events

The Rating events allow you to implement custom functionality and handle user interactions with the component. [Read more about the events of the Rating...](slug:rating-events)

## Rating Parameters

The Blazor Rating provides various parameters that allow you to configure the component. Also check the [Rating API Reference](slug:Telerik.Blazor.Components.TelerikRating) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `AriaLabel` | `string` | The `aria-label` attribute of the `<span class="telerik-blazor k-rating">` element that represents the Rating component. |
| `AriaLabelledBy` | `string` | The `aria-labelledby` attribute of the `<span class="telerik-blazor k-rating">` element that represents the Rating component. |
| `Class` | `string` | The `class` attribute of the `<span class="telerik-blazor k-rating">` element. Use it to apply custom styles or [override the theme](slug:themes-override). |
| `Enabled` | `bool` <br /> (`true`) | Defines if the Rating allows selection. |
| `HoverThrottleInterval` | `int` | Determines the delay between hovering and applying the hover value to the component. |
| `Label` | `string` | If set, renders an additional HTML element next to the rating with arbitrary content. |
| `Max` | `int` <br /> (`5`) | Defines the number of items (icons). |
| `PrecisionMode` | `RatingPrecisionMode` <br /> (`Full`) | Controls the [precision mode](slug:rating-precision) of the component selection. |
| `ReadOnly` | `bool` <br /> (`false`) | Defines whether the component should be rendered in a read-only state. |
| `SelectionMode` | `RatingSelectionMode` <br /> (`Continuous`) | Controls the [selection mode](slug:rating-selection) of the component. |

## Next Steps

* [Explore the Rating Selection Options](slug:rating-selection)
* [Explore the Rating Precision Options](slug:rating-precision)
* [Customize the Rating Appearance](slug:rating-templates)

## See Also

* [Live Rating Demos](https://demos.telerik.com/blazor-ui/rating/overview)
* [Rating API Reference](slug:Telerik.Blazor.Components.TelerikRating)
