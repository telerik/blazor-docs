---
title: Range Area
page_title: Chart - Range Area
description: Overview of the Range Area Chart for Blazor with a description of the common use cases and the different ways to data bind the chart. The article lists configuration options and provides Range Area Chart examples.
slug: components/chart/types/rangearea
tags: telerik,blazor,chart,rangearea
published: True
position: 0
components: ["charts"]
---

# Range Area Chart

The <a href="https://www.telerik.com/blazor-ui/range-area-chart" target="_blank">Blazor Range Area Chart</a> shows the data as a colored area between two continuous lines that pass through points defined by pairs of `from` and `to` values. The graph between the border lines has a different customizable color for each series. The Range Area Chart is similar to the [Area Chart](slug:components/chart/types/area), which can be regarded as a Range Area Chart with zero `from` values.

You can use the Range Area Chart to emphasize the difference between pairs of continuous value sequences.

By default, the series backgrounds are semi-transparent, which lets the user clearly see where different sets of data overlap.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating Blazor Range Area Chart

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
2. Set the series `Type` parameter to `ChartSeriesType.RangeArea`.
3. Provide a data collection to its `Data` property. You can use a [collection of arrays](#binding-range-area-series-to-collection-of-arrays) or a [collection of custom objects](#binding-range-area-series-to-custom-objects).
4. If the Range Area data is a collection of arrays, provide data for the `Categories` parameter of the `ChartCategoryAxis`.
5. (optional) Set `Visible="true"` to `<ChartSeriesLabels>` to show both the `from` and `to` labels. Alternatively, enable visibility or define [label `Template`](slug:components/chart/label-template-format) for `<ChartSeriesLabelsFrom>` or `<ChartSeriesLabelsTo>`. These are nested tags inside `<ChartSeriesLabels>` of the respective `<ChartSeries>`.

### Binding Range Area Series to Collection of Arrays

In this case, set the `ChartSeries` `Data` parameter to a `List` of arrays or a jagged array (an array of arrays). The inner arrays should have two members - one for the lower `from` value, and one for the higher `to` value.

Set the `Categories` parameter of the `ChartCategoryAxis` to `object[]`. The members of this array will be used as labels for the category axis in their respective order.

>caption Blazor Range Area Chart bound to arrays

<demo metaUrl="client/chart/types/rangearea/array-binding/" height="460"></demo>

### Binding Range Area Series to Custom Objects

1. Set the `ChartSeries` `Data` parameter to an `IEnumerable<T>`. 
1. Set the `FromField`, `ToField`, and `CategoryField` parameters of the `ChartSeries` to properties of the `T` type.

>caption Blazor Range Area Chart bound to custom objects

<demo metaUrl="client/chart/types/rangearea/custom-object-binding/" height="460"></demo>

## Range Area Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The property controls the fill color of the area.

You can control the color of the line itself separately by using the `Color` property of the nested `TelerikChartSeriesLine` tag.

@[template](/_contentTemplates/chart/link-to-basics.md#opacity-area-bubble)

### Missing Values

If both values in a range pair are missing or `null`, you can have the Chart work around this by setting the `MissingValues` property of the series to the desired behavior. Use a member of the `Telerik.Blazor.ChartSeriesMissingValues` enum:

* `Zero` (default)—The two lines and the area between them will go to the `0` value mark.
* `Interpolate`—The lines and area will go through the interpolated values of the missing data points and connect to the next data points with a value.
* `Gap`—The range area will contain empty space until the next pair of values.


### Line Style

You can render the lines between the points with different styles. The supported styles can be set via the `Style` property of the child `ChartSeriesLine` tag—it takes a member of the `Telerik.Blazor.ChartSeriesLineStyle` enum:

* `Normal` (default)—This style produces a straight line between data points.
* `Step`—The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* `Smooth`—This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)


## See Also

* [Live Demo: Range Area Chart](https://demos.telerik.com/blazor-ui/chart/range-area-chart)
