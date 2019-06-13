---
title: Area
page_title: Chart for Blazor | Area
description: Overview of the Area Chart for Blazor
slug: components/chart/types/area
tags: telerik,blazor,chart,area
published: True
position: 0
---

# Area Chart

An **Area** chart shows the data as continuous lines that pass through points defined by their items' values. The portion of the graph beneath the lines is filled with a particular color for every series. Colors in an Area chart can be useful for emphasizing changes in values from several sets of similar data. A colored background will clearly visualize the differences.


An Area chart emphasizes the volume of money, data or any other unit that the given series has encompassed. When backgrounds are semi-transparent, it lets the user clearly see where different sets of data overlap.

>caption Area chart.  Results from the first code snippet below

![](images/basic-area-chart.png)

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

To create an area chart:

1. add a `TelerikChartSeries` to the `TelerikChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Area`
3. provide a data collection to its `Data` property
4. optionally, provide data for the x-axis `Categories`


>caption An area chart that shows product revenues

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Area" Name="Product 1" Data="@series1Data">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Line" Name="Product 2" Data="@series2Data">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis Color="red"></TelerikChartValueAxis>
	</TelerikChartValueAxes>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartTitle Text="Quarterly revenue per product"></TelerikChartTitle>

	<TelerikChartLegend Position="Telerik.Blazor.ChartLegendPosition.Bottom">
	</TelerikChartLegend>
</TelerikChart>

@code {
	public List<object> series1Data = new List<object>() { 10, 2, 7, 5 };
	public List<object> series2Data = new List<object>() { 10, 2, 7, 5 };
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````


## Area Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

You can control the color of the line itself separately by using the `Color` property of the nested `TelerikChartSeriesLine` tag.

### Opacity

You can control how transparent the area fill is through the `Opacity` property. `0` means a completely opaque (non-transparent) series, and `255` means a completely transparent fill.

### Missing Values

If some values are missing from the series data (they are `null`), you can have the chart work around this by setting the `MissingValues` property of the series to the desired behavior (member of the `Telerik.Blazor.ChartSeriesMissingValues` enum):

* `Zero` - the default behavior. The line goes to the 0 value mark.
* `Interpolate` - the line will go through the interpolated value of the missing data points and connect to the next data point with a value.
* `Gap` - behaves the same way as `Zero` because a line chart cannot have a gap in its filled area.


### Line Style

You can render the lines between the points with different styles. The supported styles can be set via the `Style` property that takes a member of `Telerik.Blazor.ChartSeriesStyle` enum:

* `Normal`—This is the default style. It produces a straight line between data points.
* `Step`—The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* `Smooth`—This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

>caption Comparison between line styles

![](images/area-chart-step-and-smooth.png)


## See Also

  * [Live Demo: Area Chart](https://demos.telerik.com/blazor-ui/chart/area-chart)
