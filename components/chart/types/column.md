---
title: Column
page_title: Chart | Column
description: Overview of the Column Chart for Blazor.
slug: components/chart/types/column
tags: telerik,blazor,chart,column
published: True
position: 0
---

# Column Chart

A **Column** chart displays data as vertical bars whose heights vary according to their value. You can use a Column chart to show a comparison between several sets of data (for example, summaries of sales data for different time periods). Each series is automatically colored differently for easier reading.

>caption Column chart.  Results from the first code snippet below

![](images/basic-column-chart.png)

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

To create a column chart:

1. add a `ChartSeries` to the `ChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Column`
3. provide a data collection to its `Data` property
4. optionally, provide data for the x-axis `Categories`


>caption A column chart that shows product revenues

````CSHTML
Column series

<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@series1Data">
		</ChartSeries>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@series2Data">
		</ChartSeries>
	</ChartSeriesItems>

	<ChartCategoryAxes>
		<ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
	</ChartCategoryAxes>

	<ChartTitle Text="Quarterly revenue per product"></ChartTitle>

	<ChartLegend Position="ChartLegendPosition.Right">
	</ChartLegend>
</TelerikChart>

@code {
	public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
	public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````


## Column Chart Specific Appearance Settings

### Markers

Each data item is denoted with a marker (label). You can control and customize them through the `< ChartCategoryAxisLabels />` and its children tags.

* `Visible` - hide all markers by setting this parameter to `false`.
* `Step` - renders every n-th marker, where n is the value(double number) passed to the parameter.
* `Skip` - skips the first n markers, where n is the value(double number) passed to the parameter.
* `Angle` - rotates the markers with the desired angle by n degrees, where n is the value passed to the parameter. It can take positive and negative numbers. To set this parameter use the `< ChartCategoryAxisLabelsRotation />` child tag.

To rotate the markers use the `ChartCategoryAxisLabelsRotation` child tag and set its `Angle` parameter. It can take positive and negative numbers as value.

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

@[template](/_contentTemplates/chart/link-to-basics.md#color-field-bar-column)

@[template](/_contentTemplates/chart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)

>caption Configuring Label Rotation, Skipping the rendering of every second label and adding borders and padding to the Labels.

````CSHTML
@* Skip rendering every second label and customize them to have borders, padding and rotation. *@

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@series2Data">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems">
            <ChartCategoryAxisLabels Step="2"> @* With this you set the rendering step, in this case it will skip the rendering of every second label *@
                <ChartCategoryAxisLabelsRotation Angle="-45"></ChartCategoryAxisLabelsRotation>
                <ChartCategoryAxisLabelsPadding Top="10" Left="10" Right="10" Bottom="10"></ChartCategoryAxisLabelsPadding>
                <ChartCategoryAxisLabelsBorder Width="1" Color="#FF0000" DashType="DashType.DashDot"></ChartCategoryAxisLabelsBorder>
            </ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue per product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 2, 5, 6, 8, 8, 13, 11, 4, 9, 10, 15, 14, 3, 2 };
    public List<object> series2Data = new List<object>() { 5, 8, 2, 7, 6, 11, 14, 13, 8, 7, 2, 7, 5, 9, 11 };
    public string[] xAxisItems = new string[15];

    protected override void OnInitialized()
    {
        for (int i = 0; i < 15; i++)
        {
            xAxisItems[i] = $"looooong label {i + 1}";
        }
        base.OnInitialized();
    }
}
````


## See Also

  * [Live Demo: Column Chart](https://demos.telerik.com/blazor-ui/chart/column-chart)
