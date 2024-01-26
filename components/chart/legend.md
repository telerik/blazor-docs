---
title: Legend
page_title: Chart Legend
description: Discover the capabilities of the Chart Legend in Telerik UI for Blazor. Learn how to show it, and explore the customization options.
slug: chart-legend
tags: telerik,blazor,chart,legend,customizations
published: True
position: 100
---

# Telerik Chart Legend

The Telerik Chart for Blazor has the capability to showcase a visual guide offering details about the elements depicted in the chart. This article explores how to add a Chart legend, identify its building blocks, and customizing the legend.

## Adding a Legend

1. Add the `<ChartLegend>` child tag and set the `Visible` parameter to `true`
1. Add the `Name` parameter to all Chart series that must be visible in the legend.

## Chart Legend Customization

You can customize the legend of the Telerik Chart for Blazor by adding nested (child) tags to the `<ChartLegend>` and use their parameters for fine-tuning. 

The structure of the nested tags is `<ChartLegend*Specifics*>`, where the specifics can be:

* `Title`
* `Item`
* `Border`

>note Use the IntelliSense to explore the nested tags.

## Chart Legend Series Customization

You can customize individual items in the legend for a specific Chart series by adding the `<ChartSeriesLegendItem>` (child tag of `<ChartSeries>`) and its nested tag settings and parameters.

The structure of the nested tags is `<ChartSeriesLegend*Specifics*>`, where the specifics can be:

* `Markers`
* `Highlight`
* and others

>note Use the IntelliSense to explore the nested tags.

## Example

Customize the legend items by using nested tag settings.

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@series1Data">
            <ChartSeriesLegendItem>
                <ChartSeriesLegendItemMarkers Background="blue">
                </ChartSeriesLegendItemMarkers>
            </ChartSeriesLegendItem>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@series2Data">
            <ChartSeriesLegendItem Type="@ChartLegendItemType.Area">
                <ChartSeriesLegendItemMarkers Background="#00ff00">
                </ChartSeriesLegendItemMarkers>
            </ChartSeriesLegendItem>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right" Visible="true">
        <ChartLegendTitle Text="Revenue per product"
                          Background="lightblue"
                          Color="black">
        </ChartLegendTitle>
        <ChartLegendItem>
            <ChartLegendItemMarkers Type="@ChartSeriesMarkersType.Cross"
                                    Background="#00ff00">
            </ChartLegendItemMarkers>
        </ChartLegendItem>
    </ChartLegend>
</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
    public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

## See Also

[Live Chart Legend Customization Demo](https://demos.telerik.com/blazor-ui/chart/legend-customization)
