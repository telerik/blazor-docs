---
title: Selection
page_title: Rating Selection
description: Configure the selection mode of your Rating component for Blazor. Let users select all items from the start to end of the scale, or limit their selection to a single item.
slug: rating-selection
tags: telerik,blazor,rating,selection
published: True
position: 3
components: ["rating"]
---
# Selection

The Rating allows you to control the selection of its items.

To configure the selection option, use either of the following settings:

* [`Continuous`](#continuous)
* [`Single`](#single)

## Continuous

The continuous selection allows the selection of all items from the start to the end. This is the default selection mode of the Rating.

````RAZOR
<TelerikRating @bind-Value="@Value"
               SelectionMode="RatingSelectionMode.Continuous">
</TelerikRating>

@code {
    private double Value { get; set; } = 1;
}
````

## Single

The single selection allows the selection of a single item. To configure it, set the `SelectionMode` to `Single`.

````RAZOR
<TelerikRating @bind-Value="@Value"
               SelectionMode="RatingSelectionMode.Single">
</TelerikRating>

@code {
    private double Value { get; set; } = 1;
}
````

## See Also

* [Live Demo: Rating Selection](https://demos.telerik.com/blazor-ui/rating/selection)
* [Live Demo: Rating Keyboard Navigation](https://demos.telerik.com/blazor-ui/rating/keyboard-navigation)