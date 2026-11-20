---
title: Category Axis
page_title: Chart Category Axis
description: Configure the category axis and category highlighting in the Telerik UI for Blazor Chart.
slug: chart-category-axis
tags: telerik,blazor,chart,category,axis,highlight
published: true
position: 31
components: ["charts"]
---

# Chart Category Axis

The category axis groups the data points of a categorical Chart into equally spaced slots. Depending on the Chart type, the category axis can be horizontal or vertical.

Categorical Charts include Area, Bar, Column, Line, and their variations. For more information about the available Chart groups, refer to the [Chart series types](slug:components/chart/databind#series-types).

## Configuring the Category Axis

Add a `ChartCategoryAxis` instance inside the `ChartCategoryAxes` tag. You can define the categories directly in the axis or bind them from the series data.

### Defining Categories

Set the `Categories` parameter of the `ChartCategoryAxis` to an `object[]`. The Chart matches each series item to a category by their index.

>caption Define the categories in the category axis

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Data="@Revenue"
                     Type="@ChartSeriesType.Column"
                     Name="Revenue" />
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@Quarters" />
    </ChartCategoryAxes>
</TelerikChart>

@code {
    private List<object> Revenue { get; set; } = new()
    {
        120, 150, 140, 180
    };

    private object[] Quarters { get; set; } =
        new object[] { "Q1", "Q2", "Q3", "Q4" };
}
````

Alternatively, set the `CategoryField` parameter of a `ChartSeries` to a field in the series data. For more information and examples of both approaches, refer to [Chart data binding](slug:components/chart/databind).

### Customizing Labels

Add a `ChartCategoryAxisLabels` child tag to configure the category labels. You can hide the labels, display labels at a specific interval, skip the first labels, or rotate them.

The following example demonstrates the category label settings:

````RAZOR.skip-repl
<ChartCategoryAxis Categories="@Categories">
    <ChartCategoryAxisLabels Visible="@true"
                             Step="@2"
                             Skip="@0">
        <ChartCategoryAxisLabelsRotation Angle="@45" />
    </ChartCategoryAxisLabels>
</ChartCategoryAxis>
````

### Associating Series with Category Axes

To use more than one category axis, set the `Name` parameter of each `ChartCategoryAxis`. Then, set the matching `CategoryAxis` parameter of each `ChartSeries`.

For configuration examples and information about axis position, refer to [Chart multiple axes](slug:components/chart/multiple-axes).

## Highlighting Categories

The category axis supports a visual highlight when the user hovers over a category. The highlight displays a colored overlay across the entire category slot and helps the user identify the category under focus.

Category highlighting is disabled by default. To enable and customize it:

1. Add a `ChartCategoryAxisHighlight` child tag to the `ChartCategoryAxis`.
1. Set the `Visible` parameter of the highlight to `true`.
1. (Optional) Set the highlight `Color` and `Opacity`.
1. (Optional) Add a `ChartCategoryAxisHighlightBorder` child tag and configure its `Color`, `DashType`, `Width`, and `Opacity`.

The following example enables a semi-transparent category highlight with a dashed border.

>caption Highlight the hovered category

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Data="@Sales"
                     Type="@ChartSeriesType.Column"
                     Name="World Sales" />
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@Years">
            <ChartCategoryAxisHighlight Visible="@true"
                                        Color="yellow"
                                        Opacity="@(0.2f)">
                <ChartCategoryAxisHighlightBorder Color="orange"
                                                  DashType="@DashType.Dash"
                                                  Width="2"
                                                  Opacity="@(0.6f)" />
            </ChartCategoryAxisHighlight>
        </ChartCategoryAxis>
    </ChartCategoryAxes>
</TelerikChart>

@code {
    private List<object> Sales { get; set; } = new()
    {
        15.7, 16.7, 20, 23.5, 26.6
    };

    private object[] Years { get; set; } =
        new object[] { 2005, 2006, 2007, 2008, 2009 };
}
````

The category highlight has the following behavior:

* It appears when the user hovers over a Chart category, such as a bar or column.
* It covers the full height or width of the category slot, depending on the axis orientation.
* It remains within the corresponding pane boundaries in a Chart with multiple panes.
* It displays for one category at a time on each axis. When the user hovers over another category, the Chart removes the previous highlight.

### Highlight Parameters

The `ChartCategoryAxisHighlight` tag supports the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `Visible` | `bool?` | Controls whether the Chart displays a category highlight. The default value is `false`. |
| `Color` | `string?` | Sets the highlight fill to any valid CSS color. |
| `Opacity` | `float?` | Sets the fill opacity from `0` (fully transparent) to `1` (fully opaque). |

The `ChartCategoryAxisHighlightBorder` tag supports the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `Color` | `string?` | Sets the border to any valid CSS color. |
| `DashType` | `DashType` | Sets the border line pattern. |
| `Width` | `double?` | Sets the border width in pixels. |
| `Opacity` | `float?` | Sets the border opacity from `0` (fully transparent) to `1` (fully opaque). |

## Additional Category Axis Features

The category axis supports the following additional features:

* Use date values as categories and control their aggregation through a [date axis](slug:components/chart/date-axis).
* Associate different series with separate category axes through [multiple axes](slug:components/chart/multiple-axes).
* Highlight predefined category ranges through [Chart plot bands](slug:chart-plot-bands).

## See Also

* [Chart Data Binding](slug:components/chart/databind)
* [Chart Date Axis](slug:components/chart/date-axis)
* [Chart Multiple Axes](slug:components/chart/multiple-axes)
* [Chart Plot Bands](slug:chart-plot-bands)
