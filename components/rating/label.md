---
title: Label
page_title: Rating Label
description: Display a label for your Rating component for Blazor. Use it to guide your users through the rating process or be explicit about a read-only value. The Rating label shows the currently selected value compared to the max value.
slug: rating-label
tags: telerik,blazor,rating,label
published: True
position: 8
components: ["rating"]
---
# Label

The Rating allows you to display a label that shows the current value out of the max value right next to the component.

You can set the desired label via the `Label` parameter value.

````RAZOR
<TelerikRating @bind-Value="@Value" Label="@Label" />

@code {
    private double Value { get; set; } = 1;
    private string Label => $"{Value} out of 5";
}
````

## See Also

* [Live Demo: Rating Label](https://demos.telerik.com/blazor-ui/rating/label)