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

The plot bands appear on the chart as colored areas that fill the entire space between two grid lines on the x-axis or on the y-axis.


## Creating Plot Bands

1. Add `PlotBand` instances inside the `PlotBands` collection of the X or Y axes.
1. Set a value to the `From` and `To` parameters.
1. Provide a valid CSS color to the `Color` parameter.
1. (Optional) Provide a value to the `Opacity` parameter.

## Supported Chart types

You can render plot bands for `Categorical` (like column, bar, area, line, candlestick) and `Numerical` (like bubble, scatterline, scatter) charts.

<div class="skip-repl"></div>
````Categorical
@* Plot bands for the Column series type *@

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

    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisPlotBands>
                <ChartValueAxisPlotBand From="3" To="8" Color="red" Opacity="0.4"></ChartValueAxisPlotBand>
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
````Numerical
@* Plot bands for the Scatter series type *@

<TelerikChart>
    <ChartTitle Text="Unrecoverable Errors Per Minute vs. Signal Level"></ChartTitle>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@Series1Data"
                     Name="APSK modulation"
                     XField="@nameof(ModelData.Strength)"
                     YField="@nameof(ModelData.Errors)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@Series2Data"
                     Name="QAM modulation"
                     XField="@nameof(ModelData.Strength)"
                     YField="@nameof(ModelData.Errors)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis Max="-30" AxisCrossingValue="@(new object[] { -100 })">
            <ChartXAxisTitle Text="Signal Strength, dBm"></ChartXAxisTitle>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="Error count"></ChartYAxisTitle>
            <ChartYAxisPlotBands>
                <ChartYAxisPlotBand From="6" To="11" Color="blue" Opacity="0.4"></ChartYAxisPlotBand>
            </ChartYAxisPlotBands>
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    public class ModelData
    {
        public double Strength { get; set; }
        public double Errors { get; set; }
    }

    public List<ModelData> Series1Data = new List<ModelData>()
    {
       new ModelData { Strength = -82, Errors = 15  },
       new ModelData { Strength = -79, Errors = 13  },
       new ModelData { Strength = -77, Errors = 10  },
       new ModelData { Strength = -74, Errors = 7  },
       new ModelData { Strength = -70, Errors = 3  },
       new ModelData { Strength = -65, Errors = 1  }
    };

    public List<ModelData> Series2Data = new List<ModelData>()
    {
       new ModelData { Strength = -80, Errors = 25  },
       new ModelData { Strength = -76, Errors = 22  },
       new ModelData { Strength = -73, Errors = 17  },
       new ModelData { Strength = -70, Errors = 15  },
       new ModelData { Strength = -65, Errors = 12  },
       new ModelData { Strength = -61, Errors = 10  },
       new ModelData { Strength = -55, Errors = 7  },
       new ModelData { Strength = -50, Errors = 3  }
    };
}
````

### Plot bands on the category/X axis

The category and X axes support the usage of plot bands to highlight parts of the Chart. They are defined between two major grid lines, and the `From` and `To` parameters take the indexes of those major grid lines.

````CSHTML
@* Plot bands on the category axis *@ 

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
                <ChartCategoryAxisPlotBand From="2" To="3" Color="red" Opacity="0.4">

                </ChartCategoryAxisPlotBand>
            </ChartCategoryAxisPlotBands>
        </ChartCategoryAxis>
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

* [Live Demo: Chart Plot Bands](https://demos.telerik.com/blazor-ui/chart/plot-bands)
