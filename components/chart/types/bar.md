---
title: Bar
page_title: Chart for Blazor | Bar
description: Overview of the Bar Chart for Blazor
slug: components/chart/types/bar
tags: telerik,blazor,chart,bar
published: True
position: 0
---

# Bar Chart

A **Bar** chart displays data as horizontal bars whose lengths vary according to their value. You can use a Bar chart to show a comparison between several sets of data (for example, summaries of sales data for different time periods). Each series is automatically colored differently for easier reading.

>caption Bar chart. Results from the first code snippet below

![](images/basic-bar-chart.png)

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

To create a bar chart:

1. add a `TelerikChartSeries` to the `TelerikChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Bar`
3. provide a data collection to its `Data` property
4. optionally, provide data for the x-axis `Categories`


>caption A bar chart that shows product revenues

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Bar" Name="Product 1" Data="@series1Data">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Bar"Name="Product 2" Data="@series2Data">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartTitle Text="Quarterly revenue per product"></TelerikChartTitle>

	<TelerikChartLegend Position="ChartLegendPosition.Right">
	</TelerikChartLegend>
</TelerikChart>

@functions {
	public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
	public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````



## Bar Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

@[template](/_contentTemplates/chart/link-to-basics.md#color-field-bar-column)

@[template](/_contentTemplates/chart/link-to-basics.md#gap-and-spacing)

## See Also

 * [Live Demo: Bar Chart](https://demos.telerik.com/blazor-ui/chart/index)
