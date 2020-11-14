---
title: Radar Area
page_title: Chart - Radar Area
description: Overview of the Radar Area Chart for Blazor.
slug: chart-types-radararea
tags: telerik,blazor,chart,radar,area
published: True
position: 0
---

# Radar Area Chart

A Blazor Radar Area chart shows the data points on radial lines starting from a common center and act as value axis. The closer the data point to the center, the lower its value. The Radar Area chart connects the data points on each category with lines, and fills up the enclosed space to the center to provide a visual representation of the total enclosed volume.

Radar area charts are often used to make comparisons between several units that depend on a multitude of quantitative factors, with the compared units being the individual series, and the factors being the categories. When backgrounds are semi-transparent, it lets the user clearly see where different sets of data overlap.


>caption Radar Area chart. Results from the first code snippet below

![](images/basic-radar-area-chart.png)

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

To create an area chart:

1. add a `ChartSeries` to the `ChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.RadarArea`
3. provide a data collection to its `Data` property
4. optionally, provide data for the x-axis `Categories`


>caption A radar area chart that shows comparison between character evaluations

````CSHTML
@* Radar Area series*@

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.RadarArea" Name="John Smith" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.RadarArea" Name="Jane Doe" Data="@series2Data">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Candidate reviews and comparisons"></ChartTitle>

    <ChartLegend Position="Telerik.Blazor.ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 3, 3, 10, 2, 10 };
    public List<object> series2Data = new List<object>() { 4, 10, 10, 5, 5, 4 };
    public string[] xAxisItems = new string[] { "Experience", "Communication", "Friendliness", "Subject Knowledge", "Presentation", "Education" };
}
````


## Radar Area Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

You can control the color of the line itself separately by using the `Color` property of the nested `TelerikChartSeriesLine` tag. To see the line, set its `Width` parameter to a value larger than `0`.

@[template](/_contentTemplates/chart/link-to-basics.md#opacity-area-bubble)

### Missing Values

If some values are missing from the series data (they are `null`), you can have the chart work around this by setting the `MissingValues` property of the series to the desired behavior (member of the `Telerik.Blazor.ChartSeriesMissingValues` enum):

* `Zero` - the default behavior. The line goes to the 0 value mark.
* `Interpolate` - the line will go through the interpolated value of the missing data points and connect to the next data point with a value.
* `Gap` - Leaves a gap in the line, so you may end up with disconnected line portions where two items are surrounded by missing values, and other "islands" of color where the chart will connect the adjacent dots as best as it can.


### Line Style

You can render the lines between the points with different styles. The supported styles can be set via the `Style` property of the child `ChartSeriesLine` tag - it takes a member of `Telerik.Blazor.ChartSeriesLineStyle` enum:

* `Normal`—This is the default style. It produces a straight line between data points.
* `Step`—Behaves in the same way as `Normal` for a Radar Area chart.
* `Smooth`—This style causes the Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.



@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)

>caption Change the first series line settings, the Color and Font of the Category Axis Labels and the legend border

````CSHTML
@* Change the line of the series, the category labels and the legend border *@

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="@ChartSeriesType.RadarArea" Name="John Smith" Data="@series1Data">
            <ChartSeriesLine Color="blue" Width="5" Style="@ChartSeriesLineStyle.Smooth"></ChartSeriesLine>
        </ChartSeries>
        <ChartSeries Type="@ChartSeriesType.RadarArea" Name="Jane Doe" Data="@series2Data">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems">
            <ChartCategoryAxisLabels Color="#008000" Font="bold 12px 'Helvetica'"></ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Candidate reviews and comparisons">
    </ChartTitle>

    <ChartLegend Position="@Telerik.Blazor.ChartLegendPosition.Right">
        <ChartLegendBorder Color="red" DashType="@DashType.LongDashDotDot" Width="2"></ChartLegendBorder>
    </ChartLegend>

</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 8, null, 10, 2, 10 };
    public List<object> series2Data = new List<object>() { 4, 10, 10, 5, 5, 4 };
    public string[] xAxisItems = new string[] { "Experience", "Communication", "Friendliness", "Subject Knowledge", "Presentation", "Education" };
}
````


## See Also

  * [Live Demo: Area Chart](https://demos.telerik.com/blazor-ui/chart/area-chart)
