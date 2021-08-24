---
title: Rendering Modes
page_title: Chart Rendering Modes
description: Rendering Modes of the Chart for Blazor.
slug: chart-rendering-modes
tags: telerik,blazor,chart,rendering,modes
published: True
position: 5
---

# Rendering Modes

The Chart for Blazor supports two modes for rendering its data. You can set the desired rendering mode through the `RenderAs` parameter the `TelerikChart` exposes. It takes a member of the `Telerik.Blazor.RenderingMode` enum and depending on the result you are trying to achieve, you can choose one of the following:

* [SVG](#svg) (the default)
* [Canvas](#canvas)


## SVG

The default rendering mode of the Chart is SVG(Scalable Vector Graphics) and it is recommended for general use.

Using vector graphics ensures that:

* The browser zoom does not degrade the image.
* The prints are crisp regardless of the resolution.

Since `SVG` is the default rendering mode of the Chart, you don't need to explicitly define it.

>caption Bar Chart rendered as SVG. The result from the snippet below.

![](images/svg-chart-example.png)

````CSHTML
@* SVG Bar Chart *@

<TelerikChart Width="700px" Height="400px">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 1" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 2" Data="@series2Data">
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

## Canvas

When performance is critical (for example when rendering large dashboards and frequently updated charts) it is recommended to use Canvas (bitmap).

The browser does not have to maintain a live DOM tree for the Chart which results in:

* Quicker screen updates.
* Lower memory usage.

On the downside, rendering to a fixed resolution bitmap results in:

* Blurry images on zoom.
* Poorer print quality.

>caption Bar Chart rendered as Canvas. The result from the snippet below.

![](images/canvas-chart-example.png)

````CSHTML
@* Canvas Bar Chart *@

<TelerikChart RenderAs="@RenderingMode.Canvas" Width="700px" Height="400px">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 1" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 2" Data="@series2Data">
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


## See Also

  * [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/index)