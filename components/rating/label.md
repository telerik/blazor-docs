---
title: Label
page_title: Rating Label
description: Discover the Rating component for Blazor. Learn how to add the component to your app and explore its configuration options, such as selection, precision, templates and label.
slug: rating-label
tags: telerik,blazor,rating,label
published: True
position: 8
---

# Label

The Rating allows you to display a label that shows the current value out of the max value right next to the component.

You can set the desired label via the `Label` parameter value.

````CSHTML
<TelerikRating @bind-Value="@Value" Label="@Label" />

@code {
    private double Value { get; set; } = 1;
    private string Label => $"{Value} out of 5";
}
````

## See Also

* [Live Demo: Rating Label](https://demos.telerik.com/blazor-ui/rating/label)