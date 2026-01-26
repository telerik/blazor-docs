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
components: ["charts"]
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

To configure the Chart for drawing horizontal and vertical lines, you can use [plot bands](slug:chart-plot-bands) or additional [line series](slug:components/chart/types/line).

### Using Plot Bands

Steps for drawing vertical and horizontal lines with [plot bands](slug:chart-plot-bands):

1. Add `PlotBand` instances inside the `PlotBands` collection of a Chart axis.
2. Provide a valid CSS color to the `Color` parameter.
3. [Set the `From` and `To`](slug:chart-plot-bands#setting-from-and-to) plot band parameters.

>caption Drawing Horizontal and Vertical lines with Plot Bands

`````RAZOR
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

### Using Additional ScatterLine Series

Steps for drawing horizontal and vertical lines with additional [ScatterLine Series](slug:components/chart/types/scatterline):

1. Add `ChartSeries` instances of type `ChartSeriesType.ScatterLine` based on the needed number of lines.
2. Set data for the lines based on the information shown from the main Chart.

>caption Drawing Horizontal and Vertical lines with additional ScatterLine Chart

````RAZOR
<TelerikChart>
    <ChartLegend Visible="true"></ChartLegend>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@SeriesScatterData"
                     Name="Scatter"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.Bubble"
                     Data="@SeriesBubbleData"
                     Name="Bubble"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)"
                     SizeField="@nameof(BubbleData.SizeField)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series1Data"
                     Name="Line"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
            <ChartSeriesMarkers Visible="false" />
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series2Data"
                     Name="Dashed Line"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)"
                     DashType="@DashType.Dash">
            <ChartSeriesMarkers Visible="false" />
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series3Data"
                     Name="Dotted Line"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)"
                     DashType="@DashType.Dot">
            <ChartSeriesMarkers Visible="false" />
        </ChartSeries>

    </ChartSeriesItems>
</TelerikChart>

@code {
    public class ModelData
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
    public class BubbleData
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int SizeField { get; set; }
    }

    public List<ModelData> Series1Data = new List<ModelData>()
    {
        new ModelData() { X = 120, Y = 0 },
        new ModelData() { X = 120, Y = 100 },
    };

    public List<ModelData> Series2Data = new List<ModelData>()
    {
        new ModelData() { X = 0, Y = 20 },
        new ModelData() { X = 140, Y = 20 },
    };

    public List<ModelData> Series3Data = new List<ModelData>()
    {
        new ModelData() { X = 0, Y = 80 },
        new ModelData() { X = 140, Y = 80 },
    };

    public List<BubbleData> SeriesBubbleData = new List<BubbleData>()
    {
        new BubbleData() { X = 40, Y = 40 , SizeField=1000},
        new BubbleData() { X = 66, Y = 77 , SizeField=500},
        new BubbleData() { X = 90, Y = 50 , SizeField=200},
        new BubbleData() { X = 120, Y = 70 , SizeField=350}
    };

    public List<ModelData> SeriesScatterData = new List<ModelData>()
    {
        new ModelData() { X = 10, Y = 10 },
        new ModelData() { X = 17, Y = 50 },
        new ModelData() { X = 18, Y = 70 },
        new ModelData() { X = 35, Y = 90 },
        new ModelData() { X = 47, Y = 95 },
        new ModelData() { X = 100, Y = 100 }
    };
}
````

## See Also

* [Charts Plot Bands](slug:chart-plot-bands)
* [ScatterLine Chart](https://demos.telerik.com/blazor-ui/chart/scatter-line-chart)
