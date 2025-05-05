---
title: Legend Colors Do Not Match Data Points in Stacked Bar Chart
description: Explains why the legend colors might not match the data points in a stacked bar chart and provides a solution.
type: troubleshooting
page_title: Ensure Legend Colors Match Data Points in Stacked Bar Charts
slug: chart-kb-legend-colors-not-matching-stacked-bar-chart
tags: charts, bar chart, stacked series, legend, color
res_type: kb
ticketid: 1684367
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Charts for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When creating a Chart with Stacked Series, the colors of the data points render correctly on the Chart itself, but the legend colors do not match the colors of the data points. This discrepancy occurs when using the `ColorField` parameter.

## Cause

This behavior is by design. Using the `ColorField` parameter to assign a unique color to each data point within a single series is supported in **non-stacked** Charts, but not in stacked Charts.

Stacked Charts are designed to display the combined values of multiple series stacked together. Assigning unique colors to individual data points in this scenario can reduce the visual clarity of the stack relationships and prevent the legend from accurately representing the data.

## Solution

To ensure that the legend colors match the data points in a stacked Chart, use the `Color` parameter of the `ChartSeries`. This parameter sets a uniform color for all data points (bars) within a single series and determines the color shown in the legend for that series.

Here is an example configuration that applies a specific color to each `ChartSeries` in a Stacked Bar Chart:

`````Razor
<TelerikChart Width="100%" Height="100%">
    <ChartSeriesItems>
        @foreach (var series in GraphDataPoints)
        {
            <ChartSeries Field="@nameof(GraphDataPoint.Value)"
                         Type="ChartSeriesType.Bar"
                         Name="@series.Label"
                         Color="@series.Color"
                         Data="@([series])">
                <ChartSeriesStack Enabled="true" />
            </ChartSeries>
        }
    </ChartSeriesItems>
    <ChartLegend Position="ChartLegendPosition.Right" />
</TelerikChart>

@code {
    private List<GraphDataPoint> GraphDataPoints { get; set; } = [
        new GraphDataPoint
        {
            Label = "Early Settlement Candidate",
            Value = 1024,
            Color = "#D46663"
        },
    new GraphDataPoint
         {
            Label = "Needs Discovery to Strategize",
            Value = 980,
            Color = "#F89995"
        },
    new GraphDataPoint
        {
            Label = "Potential Dispositive Candidate",
            Value = 1006,
            Color = "#FFC7C7"
        },
    new GraphDataPoint
         {
            Label = "Potential Trial Candidate",
            Value = 1003,
            Color =  "#BCDCCF",
        },
    new GraphDataPoint
        {
            Label = "Settlement Candidate",
            Value = 987,
            Color = "#79C8AB"
        }
    ];

    public class GraphDataPoint
    {
        public required string Color { get; set; }
        public required int Value { get; set; }
        public required string Label { get; set; }
    }
}
