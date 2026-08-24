---
title: Bubble
page_title: Chart - Bubble
description: Overview of the Bubble Chart for Blazor.
slug: components/chart/types/bubble
tags: telerik,blazor,chart,bubble
published: True
position: 0
components: ["charts"]
---

# Bubble Chart

The <a href="https://www.telerik.com/blazor-ui/bubble-chart" target="_blank">Blazor Bubble chart</a> shows the data as points with coordinates and size defined by their items' values. You might think of a Bubble chart as a variation of the [Scatter chart](slug:components/chart/types/scatter), in which the data points are replaced with bubbles. This allows a Bubble chart to display three dimensional data — two values for the items' coordinates and one for their size.

![bubble chart](images/bubble-chart.png)

A Bubble chart is useful for visualizing different scientific relationships (e.g, economical, social, etc.). This chart type's x-axis is also numerical and does not require items.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating a Blazor Bubble Chart

To use a Chart component with Bubble series:

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
2. Set its `Type` property to `ChartSeriesType.Bubble`.
3. Provide a data collection to its `Data` property, which contains numerical data for the X and Y axes, and for the bubble size.

>caption A bubble chart that shows projected population change on a plot of life expectancy versus fertility rate

<demo metaUrl="client/chart/types/bubble/overview/" height="420"></demo>

## Bubble Sizing

By default, the Chart determines the physical size of each bubble automatically:

* The maximum bubble diameter is 20% of the smaller Chart dimension (width or height). This ensures that the largest bubbles do not occupy too much space.
* The minimum bubble diameter is 2% of the smaller Chart dimension, but not less than `10px`. This ensures that even the smallest bubbles are perceivable and accessible. The smallest bubble size also depends on the largest `Size` value in the Chart series.
* All bubble sizes are set proportionately, as long as they comply with the preceding rules.

To change the minimum and maximum bubble diameter, use the `MinSize` and `MinSize` parameters of `<ChartSeries>`. In this case, the Chart component sets the diameter of the rendered bubbles based on:

* The absolute values of `MinSize` and `MaxSize`, which represent pixels.
* The ratio between `MinSize` and `MaxSize`.
* The ratio between the smallest and largest `Size` values in the series.

As a result of the above algorithms:

* Bubble sizing may not look proportionate if the ratio between the smallest and largest `Size` value in the series is not consistent with the ratio between the current minimum and maximum allowed bubble size.
* The Bubble Chart helps users compare bubble sizes in the same Chart instance, rather than between different instances. To compare bubbles from multiple series, define these series in the same Chart instance.

If you need to [improve the bubble size comparability across several Charts](slug:chart-kb-bubble-size), then use a dummy data item with a `Size` value that matches the maximum `Size` value in all Chart instances.

>caption Using default and custom Chart bubble sizes

<demo metaUrl="client/chart/types/bubble/bubble-sizing/" height="460"></demo>

## Bubble Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the bubble.

The `ColorField` can change the color of individual items. To use it, pass a valid CSS color to the corresponding field in the model and the chart will use its values instead of the `Color` parameter.

@[template](/_contentTemplates/chart/link-to-basics.md#opacity-area-bubble)

### Negative Values

Negative values are allowed for the X and Y fields, because they are plotted on standard numerical axes.

The size field should, generally, have positive values as it correlates to the physical size of the bubble. To render negative values, set the `Visible` parameter of the `ChartSeriesNegativeValues` tag of the series to `true`. Bubbles with negative size values will be calculated as if their sizes are positive. To distinguish one from the other, you can have negative items show up in a different color through the `Color` parameter of the `ChartSeriesNegativeValues` tag.

>caption Negative bubble size

<demo metaUrl="client/chart/types/bubble/negative-values/" height="420"></demo>

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-numerical)

## See Also

* [Live Demo: Bubble Chart](https://demos.telerik.com/blazor-ui/chart/bubble-chart)
* [Configure Relative Bubble Sizes in Multiple Charts](slug:chart-kb-bubble-size)
