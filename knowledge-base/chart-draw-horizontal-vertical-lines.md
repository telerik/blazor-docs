---
title: Draw Horizontal and Vertical Lines in a Blazor Chart
description: How to draw horizontal and vertical lines in Charts. Draw vertical lines in Charts with line series. Draw horizontal lines in Charts with plot bands.
type: how-to
page_title: How to Draw Horizontal and Vertical Lines in Charts
slug: chart-kb-draw-horizontal-and-vertical-lines
position: 
tags: telerik, blazor, chart, draw, horizontal, vertical, lines
ticketid: 1511761, 1569732
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Chart for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to draw horizontal and vertical lines in Telerik Blazor Charts?
* How to put pins or markers in Telerik Blazor Charts?
* Is it possible to add limits or thresholds on the Telerik Blazor Chart?

## Solution

To configure the Chart for drawing horizontal and vertical lines, you can use [plot bands]({%slug chart-plot-bands%}) or additional [line series]({%slug components/chart/types/line%}).

### Using Plot Bands

Steps for drawing vertical and horizontal lines with [plot bands]({%slug chart-plot-bands%}):

1. Add `PlotBand` instances inside the `PlotBands` collection of a Chart axis.
2. Provide a valid CSS color to the `Color` parameter.
3. [Set the `From` and `To`]({%slug chart-plot-bands%}#setting-from-and-to) plot band parameters.

>caption Drawing Horizontal and Vertical lines with Plot Bands

`````CSHTML
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
                <ChartXAxisPlotBand From="-89.7" To="-89.5" Color="blue" />
                <ChartXAxisPlotBand From="-50" To="-49.5" Color="orange" />
            </ChartXAxisPlotBands>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Max="20">
            <ChartYAxisTitle Text="Error count"></ChartYAxisTitle>
            <ChartYAxisPlotBands>
                <ChartYAxisPlotBand From="1.5" To="1.7" Color="green"></ChartYAxisPlotBand>
                <ChartYAxisPlotBand From="18.5" To="18.6" Color="red"></ChartYAxisPlotBand>
            </ChartYAxisPlotBands>
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    #region PlotBandsData
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
    #endregion
}
`````

### Using Additional Line Series

Steps for drawing horizontal and vertical lines with additional [Lines Series]({%slug components/chart/types/line%}):

1. Add `ChartSeries` instances of type `ChartSeriesType.Line` based on the needed number of lines.
2. Set data for the lines based on the information shown from the main Chart.

>caption Drawing Horizontal and Vertical lines with additional Lines Chart

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column" Name="Column 1" Data="@firstColumnTypeData">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Column 2" Data="@secondColumnTypeData">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Line" Name="Line 1" Data="@firstLineTypeData">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Line" Name="Line 2" Data="@secondLineTypeData">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xColumnAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Draw Horizontal and Vertical Lines"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    #region LinesData
    private List<object> firstColumnTypeData = new List<object>() { 10, 2, 5, 6 };
    private List<object> secondColumnTypeData = new List<object>() { 5, 8, 2, 7 };

    private List<object> firstLineTypeData = new List<object>() { 8, 8, 8, 6 };
    private List<object> secondLineTypeData = new List<object>() { 5, 8, 2, 7 };

    private string[] xColumnAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
    #endregion
}
````

## See Also

* [Charts Plot Bands]({%slug chart-plot-bands%})
* [Lines Chart](https://demos.telerik.com/blazor-ui/chart/line-chart)
