---
title: Plot Bands
page_title: Chart Plot Bands
description: Plot Bands in the Charts for Blazor.
slug: chart-plot-bands
tags: telerik,blazor,chart,plot,bands,plotbands
published: true
position: 45
---

# Plot Bands

Plot Bands are colored ranges in the Telerik UI for Blazor Chart. Their purpose is to highlight areas of the chart by changing the background in a predefined axis range.

Plot bands are supported for [categorical and numerical charts](slug://components/chart/databind#series-types).

## Creating Plot Bands

1. Add `PlotBand` instances inside the `PlotBands` collection of a Chart axis.
1. Provide a valid CSS color to the `Color` parameter.
1. (Optional) Set the `Opacity` parameter.
1. [Set the `From` and `To` plot band parameters](#setting-from-and-to), according to the instructions below.

## Setting From and To

There are two different ways to configure the `From` and `To` values. The correct approach depends on:

* Whether the Chart is numeric or categorical.
* Whether the plot band is for the vertical or horizontal axis.

>caption How to set PlotBand From and To

<table>
    <colgroup>
        <col style="width: 10em" />
        <col style="width: 8em" />
        <col />
    </colgroup>
    <thead>
        <tr>
            <th>Axis Tag</th>
            <th>Axis Description</th>
            <th>Valid PlotBand <code>From</code> and <code>To</code> Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>ChartYAxis</code></td>
            <td>vertical numeric axis</td>
            <td rowspan="3">Any <strong>numeric value</strong> that makes sense for the series data, e.g. within the axis <code>Min</code> and <code>Max</code> range. The plot band will display <em>between the specified values</em>.</td>
        </tr>
        <tr>
            <td><code>ChartXAxis</code></td>
            <td>horizontal numeric axis</td>
        </tr>
        <tr>
            <td><code>ChartValueAxis</code></td>
            <td>vertical category axis</td>
        </tr>
        <tr>
            <td><code>ChartCategoryAxis</code> <br> including <a href="/blazor-ui/documentation/components/chart/date-axis">date axis</a></td>
            <td>horizontal category axis</td>
            <td><strong>Zero-based index</strong>, which corresponds to a major vertical grid line that intersects the axis. The plot band will display <em>between the specified grid lines</em>.</td>
        </tr>
    </tbody>
</table>

## Categorical Chart PlotBands

````RAZOR
@* Plot bands for the Column series type *@

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@series2Data">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems">
            <ChartCategoryAxisPlotBands>
                <ChartCategoryAxisPlotBand From="0" To="1" Color="blue" Opacity="0.2" />
                <ChartCategoryAxisPlotBand From="2" To="3" Color="#00f" Opacity="0.2" />
            </ChartCategoryAxisPlotBands>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisPlotBands>
                <ChartValueAxisPlotBand From="3" To="8" Color="green" Opacity="0.4"></ChartValueAxisPlotBand>
            </ChartValueAxisPlotBands>
        </ChartValueAxis>
    </ChartValueAxes>

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

## Numerical Chart PlotBands

````RAZOR
@* Plot bands for the Scatter series type *@

<TelerikChart>
    <ChartTitle Text="Unrecoverable Errors Per Minute vs. Signal Level"></ChartTitle>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@SeriesData"
                     Name="APSK modulation"
                     XField="@nameof(ModelData.Strength)"
                     YField="@nameof(ModelData.Errors)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis Max="-30" AxisCrossingValue="@(new object[] { -100 })">
            <ChartXAxisTitle Text="Signal Strength, dBm"></ChartXAxisTitle>
            <ChartXAxisPlotBands>
                <ChartXAxisPlotBand From="-90" To="-80" Color="blue" Opacity=".2" />
                <ChartXAxisPlotBand From="-50" To="-40" Color="orange" Opacity=".2" />
            </ChartXAxisPlotBands>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Max="20">
            <ChartYAxisTitle Text="Error count"></ChartYAxisTitle>
            <ChartYAxisPlotBands>
                <ChartYAxisPlotBand From="0" To="3" Color="green" Opacity="0.2"></ChartYAxisPlotBand>
                <ChartYAxisPlotBand From="12" To="20" Color="red" Opacity="0.2"></ChartYAxisPlotBand>
            </ChartYAxisPlotBands>
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    private List<ModelData> SeriesData { get; set; }

    protected override void OnInitialized()
    {
        SeriesData = new List<ModelData>();

        var rnd = new Random();

        for (int i = 0; i < 60; i++)
        {
            SeriesData.Add(new ModelData
            {
                Strength = rnd.Next(-90 + i / 3, -90 + i),
                Errors = rnd.Next(i / 20, i / 3)
            });
        }

        base.OnInitialized();
    }

    public class ModelData
    {
        public double Strength { get; set; }
        public double Errors { get; set; }
    }
}
````

## See Also

* [Live Demo: Chart Plot Bands](https://demos.telerik.com/blazor-ui/chart/plot-bands)
