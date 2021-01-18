---
title: Shared Tooltip
page_title: Chart - Shared Tooltip
description: Shared Tooltip for the Blazor Chart.
slug: chart-tooltip-shared
tags: telerik,blazor,chart,tooltip,shared,tooltips
published: True
position: 2
---

# Shared Tooltip for Telerik Blazor Chart

The Telerik Chart allows you to show a unified tooltip for all categories in [Categorical]({%slug components/chart/databind%}#series-types) Charts.

In this article:
* [Basics](#basics)
* [Customization](#customization)
 * [Parameter Settings](#parameter-settings)
 * [Shared Template](#shared-template)


## Basics

The shared tooltip provides summarized information of all data points from the hovered category (applies for [Categorical Charts]({%slug components/chart/databind%}#series-types)). This tooltip will take precedence over tooltip settings defined for a specific series.

To enable the shared tooltip:

1. Inside the `<TelerikChart>` tag, add the `<ChartTooltip>` tag.
1. Set its `Visible` parameter to `true`.
1. Set its `Shared` parameter to `true`.

>caption Basic configuration of a Chart with Shared Tooltip

````CSHTML
@* This example shows how to enable a Shared Tooltip *@

<TelerikChart>
    <ChartTooltip Visible="true" Shared="true"></ChartTooltip>
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
>caption The result from the code snippet above

![shared tooltip example](images/shared-tooltip-basic.png)

## Customization

There are two types of customizations you can do for the tooltips:

* [Parameter Settings](#parameter-settings) - lets you alter cosmetic settings such as borders, colors and padding through simple parameters
* [Shared Template](#shared-template) - lets you control the entire content

### Parameter Settings
You can customize the rendering of the `Shared` tooltip by using:

@[template](/_contentTemplates/chart/chart-tooltip-context-templates.md#shared-tooltip-parameter-settings)


### Shared Template

The `SharedTemplate` allows you to control the rendering of the shared tooltip.

In the template you can:

* Use business logic and render HTML

* Use the `context` parameter that provides information about the current category and all data points in it.

The `context` contains the following information:

* `Category` - renders the name of the Category.

* `Points` - a collection of data for each series data point in this category.


Each `Point` contains the following data:

@[template](/_contentTemplates/chart/chart-tooltip-context-templates.md#context-parameter-information)


>caption Usage of the SharedTemplate

````CSHTML
@* This example shows how to use the SharedTemplate and extract information on the data points value, parse them to int and get the category from the context *@

<TelerikChart>
    <ChartTooltip Visible="true" Shared="true">
        <SharedTemplate>
            @{
                var points = context.Points;

                foreach (var point in points)
                {
                    <div>
                        <TelerikIcon Icon="information" />
                        @*this example shows how to parse the FormattedValue to a int,*@
                        @*but you can also parse it to any other type your data uses / has*@
                        Point value: @(int.Parse(point.FormattedValue).ToString("C"))
                        Category: @context.Category
                    </div>
                }
            }
        </SharedTemplate>
    </ChartTooltip>
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
>caption The result from the code snippet above

![shared tooltip template example](images/shared-tooltip-template.png)

## See also

* [Chart Overview]({%slug components/chart/overview%})
* [Chart Tooltip Overview]({%slug chart-tooltip-overview%})
