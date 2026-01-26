---
title: Trendlines
page_title: Chart - Trendlines
description: How to define Trendlines in the Charts for Blazor to track trends. Explore the two types of trendlines - Linear Trendline and Moving Average Trendline.
slug: chart-trendlines
tags: telerik,blazor,chart,trendlines
published: true
position: 25
components: ["charts"]
---
# Trendlines

Trendlines are dynamic indicators that automatically reveal the overarching trends within your series data. These trendlines are defined as a special type of series linked to the main series by name.

Trendline series use the data from the main series. When the main series employs aggregates, which is common for date series, the trendlines align with the aggregated data. For instance, when using a `sum` aggregate, the trendline illustrates the trends for the sum within each category.

## Trendline Types

The Chart supports the following fundamental types of trendlines:

* [Linear Trendline](#linear-trendline)
* [Moving Average Trendline](#moving-average-trendline)
* [Exponential Trendline](#exponential-trendline)
* [Logarithmic Trendline](#logarithmic-trendline)
* [Power Trendline](#power-trendline)
* [Polynomial Trendline](#polynomial-trendline)

## Supported Series Types

Trendlines are supported for the following chart types:

 * Area
 * Bar
 * BoxPlot
 * Candlestick
 * Column
 * Line
 * OHLC
 * RangeArea
 * RangeColumn
 * Scatter
 * ScatterLine

## Chart Trendlines Parameters

The following table lists Chart Trendlines parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| `ChartSeriesMarkers.Visible` | `bool` | The visibility of the trendline markers. |
| `ChartSeries.For` | `string` | The name of the parent series of the trendline. |
| `ChartSeriesTrendline` | `object` | The trendline configuration options. |
| `ChartSeriesTrendlineForecast` | `object` | The trendline forecast settings. By default, the trendline does not display a forecast. |
| `ChartSeriesTrendlineForecast.Before` | `int` | The number of intervals to extend the trendline before the first data point. |
| `ChartSeriesTrendlineForecast.After` | `int` | The number of intervals to extend the trendline after the last data point. |
| `ChartSeriesTrendline.Period` | `int` | The number of intervals to take when calculating averages. The value must be an integer greater than `2`. |
| `Type` | `ChartSeriesType` enum | The type of the series. |

### Linear Trendline

Use the Linear Trendline to visualize the rise or decline of a specific quantity over time.

>caption Linear trendline in scatter line Chart series

`````RAZOR
<TelerikChart Width="100%" 
              Height="400px">
    <ChartPannable Enabled="true" 
                   Lock="@ChartAxisLock.Y">
    </ChartPannable>

    <ChartZoomable Enabled="true" />

    <ChartLegend Visible="true" 
                 Position="@ChartLegendPosition.Bottom">
    </ChartLegend>

    <ChartTooltip Visible="true" 
                  Shared="false">
    </ChartTooltip>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Name="@Series1Name"
                     Data="@ScatterData"
                     XField="@nameof(SalesData.NumericPeriod)"
                     YField="@nameof(SalesData.Count)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.LinearTrendline"
                     Name="Sales Forecast (LINEAR)"
                     For="@Series1Name"
                     Color="blue">
            <ChartSeriesMarkers Visible="true" />
            <ChartSeriesTrendline>
                <ChartSeriesTrendlineForecast Before="0" 
                                              After="10">
                </ChartSeriesTrendlineForecast>
            </ChartSeriesTrendline>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis>
            <ChartXAxisLabels Position="@ChartAxisLabelsPosition.Start">
                <ChartXAxisLabelsRotation Angle="-90" />
            </ChartXAxisLabels>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Min="-4e5" 
                    Max="1.2e6">
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    private const string Series1Name = "Sales By Quarter";

    private List<SalesData> ScatterData { get; set; } = new List<SalesData>();

    public class SalesData
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }
    }

    #region Load Data

    protected override Task OnInitializedAsync()
    {
        ScatterData = GenerateScatterData();
        return base.OnInitializedAsync();
    }

    private static List<SalesData> GenerateData()
    {
        var data = new List<SalesData>()
        {
            new SalesData() { Period = "2010 Q1", Date = new DateTime(2010, 1, 1), Count = 4485 },
            new SalesData() { Period = "2010 Q2", Date = new DateTime(2010, 4, 1), Count = 4409 },
            new SalesData() { Period = "2010 Q3", Date = new DateTime(2010, 7, 1), Count = 4469 },
            new SalesData() { Period = "2010 Q4", Date = new DateTime(2010, 10, 1), Count = 4682 },
            new SalesData() { Period = "2011 Q1", Date = new DateTime(2011, 1, 1), Count = 5610 },
            new SalesData() { Period = "2011 Q2", Date = new DateTime(2011, 4, 1), Count = 6580 },
            new SalesData() { Period = "2011 Q3", Date = new DateTime(2011, 7, 1), Count = 7534 },
            new SalesData() { Period = "2011 Q4", Date = new DateTime(2011, 10, 1), Count = 7894 },
            new SalesData() { Period = "2012 Q1", Date = new DateTime(2012, 1, 1), Count = 8748 },
            new SalesData() { Period = "2012 Q2", Date = new DateTime(2012, 4, 1), Count = 10223 },
            new SalesData() { Period = "2012 Q3", Date = new DateTime(2012, 7, 1), Count = 10797 },
            new SalesData() { Period = "2012 Q4", Date = new DateTime(2012, 10, 1), Count = 12295 },
            new SalesData() { Period = "2013 Q1", Date = new DateTime(2013, 1, 1), Count = 13153 },
            new SalesData() { Period = "2013 Q2", Date = new DateTime(2013, 4, 1), Count = 14628 },
            new SalesData() { Period = "2013 Q3", Date = new DateTime(2013, 7, 1), Count = 16779 },
            new SalesData() { Period = "2013 Q4", Date = new DateTime(2013, 10, 1), Count = 18710 },
            new SalesData() { Period = "2014 Q1", Date = new DateTime(2014, 1, 1), Count = 22219 },
            new SalesData() { Period = "2014 Q2", Date = new DateTime(2014, 4, 1), Count = 25886 },
            new SalesData() { Period = "2014 Q3", Date = new DateTime(2014, 7, 1), Count = 31640 },
            new SalesData() { Period = "2014 Q4", Date = new DateTime(2014, 10, 1), Count = 36846 },
            new SalesData() { Period = "2015 Q1", Date = new DateTime(2015, 1, 1), Count = 43433 },
            new SalesData() { Period = "2015 Q2", Date = new DateTime(2015, 4, 1), Count = 48575 },
            new SalesData() { Period = "2015 Q3", Date = new DateTime(2015, 7, 1), Count = 54533 },
            new SalesData() { Period = "2015 Q4", Date = new DateTime(2015, 10, 1), Count = 62388 },
            new SalesData() { Period = "2016 Q1", Date = new DateTime(2016, 1, 1), Count = 70706 },
            new SalesData() { Period = "2016 Q2", Date = new DateTime(2016, 4, 1), Count = 75439 },
            new SalesData() { Period = "2016 Q3", Date = new DateTime(2016, 7, 1), Count = 83213 },
            new SalesData() { Period = "2016 Q4", Date = new DateTime(2016, 10, 1), Count = 88527 },
            new SalesData() { Period = "2017 Q1", Date = new DateTime(2017, 1, 1), Count = 99865 },
            new SalesData() { Period = "2017 Q2", Date = new DateTime(2017, 4, 1), Count = 107388 },
            new SalesData() { Period = "2017 Q3", Date = new DateTime(2017, 7, 1), Count = 117761 },
            new SalesData() { Period = "2017 Q4", Date = new DateTime(2017, 10, 1), Count = 125263 },
            new SalesData() { Period = "2018 Q1", Date = new DateTime(2018, 1, 1), Count = 135950 },
            new SalesData() { Period = "2018 Q2", Date = new DateTime(2018, 4, 1), Count = 144737 },
            new SalesData() { Period = "2018 Q3", Date = new DateTime(2018, 7, 1), Count = 155933 },
            new SalesData() { Period = "2018 Q4", Date = new DateTime(2018, 10, 1), Count = 167960 },
            new SalesData() { Period = "2019 Q1", Date = new DateTime(2019, 1, 1), Count = 182725 },
            new SalesData() { Period = "2019 Q2", Date = new DateTime(2019, 4, 1), Count = 199079 },
            new SalesData() { Period = "2019 Q3", Date = new DateTime(2019, 7, 1), Count = 234952 },
            new SalesData() { Period = "2019 Q4", Date = new DateTime(2019, 10, 1), Count = 271298 },
            new SalesData() { Period = "2020 Q1", Date = new DateTime(2020, 1, 1), Count = 323309 },
            new SalesData() { Period = "2020 Q2", Date = new DateTime(2020, 4, 1), Count = 358145 },
            new SalesData() { Period = "2020 Q3", Date = new DateTime(2020, 7, 1), Count = 460927 },
            new SalesData() { Period = "2020 Q4", Date = new DateTime(2020, 10, 1), Count = 579568 },
            new SalesData() { Period = "2021 Q1", Date = new DateTime(2021, 1, 1), Count = 669590 },
            new SalesData() { Period = "2021 Q2", Date = new DateTime(2021, 4, 1), Count = 793564 },
            new SalesData() { Period = "2021 Q3", Date = new DateTime(2021, 7, 1), Count = 941133 },
            new SalesData() { Period = "2021 Q4", Date = new DateTime(2021, 10, 1), Count = 1133020 },
            new SalesData() { Period = "2022 Q1", Date = new DateTime(2022, 1, 1), Count = 426324 },
        };

        return data;
    }

    private static List<SalesData> GenerateScatterData()
    {
        var data = GenerateData();

        for (int i = 0; i < data.Count; i++)
        {
            data[i].NumericPeriod = i + 10;
        }

        return data;
    }

    #endregion
}
`````

### Moving Average Trendline

Use the Moving Average Trendline to smooth out data fluctuations. This trendline computes and visualizes an average of all data points over a specified period. By default, this period is set to two chart intervals.

>caption Line Chart with a moving average trendline

`````RAZOR
<TelerikChart Width="100%" 
              Height="400px">
    <ChartPannable Enabled="true" 
                   Lock="@ChartAxisLock.Y">
    </ChartPannable>

    <ChartZoomable Enabled="true" />

    <ChartLegend Visible="true" 
                 Position="@ChartLegendPosition.Bottom">
    </ChartLegend>

    <ChartTooltip Visible="true" 
                  Shared="true">
    </ChartTooltip>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Line"
                     Name="@Series1Name"
                     Data="@Data"
                     Field="@nameof(SalesData.Count)"
                     CategoryField="@nameof(SalesData.Period)">
            <ChartSeriesMarkers Visible="false" />
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.MovingAverageTrendline"
                     Name="Sales Forecast (MOVING AVERAGE)"
                     For="@Series1Name"
                     Color="teal">
            <ChartSeriesMarkers Visible="false" />
            <ChartSeriesTrendline>
                <ChartSeriesTrendline Period="4" />
            </ChartSeriesTrendline>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis>
            <ChartCategoryAxisLabels Position="@ChartAxisLabelsPosition.Start">
                <ChartCategoryAxisLabelsRotation Angle="-90" />
            </ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Min="-4e5" 
                        Max="1.2e6">
        </ChartValueAxis>
    </ChartValueAxes>
</TelerikChart>

@code {
    private const string Series1Name = "Sales By Quarter";

    private List<SalesData> Data { get; set; } = new List<SalesData>();

    public class SalesData
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }
    }

    #region Load Data

    protected override Task OnInitializedAsync()
    {
        Data = GenerateData();
        return base.OnInitializedAsync();
    }

    private static List<SalesData> GenerateData()
    {
        var data = new List<SalesData>()
        {
            new SalesData() { Period = "2010 Q1", Date = new DateTime(2010, 1, 1), Count = 4485 },
            new SalesData() { Period = "2010 Q2", Date = new DateTime(2010, 4, 1), Count = 4409 },
            new SalesData() { Period = "2010 Q3", Date = new DateTime(2010, 7, 1), Count = 4469 },
            new SalesData() { Period = "2010 Q4", Date = new DateTime(2010, 10, 1), Count = 4682 },
            new SalesData() { Period = "2011 Q1", Date = new DateTime(2011, 1, 1), Count = 5610 },
            new SalesData() { Period = "2011 Q2", Date = new DateTime(2011, 4, 1), Count = 6580 },
            new SalesData() { Period = "2011 Q3", Date = new DateTime(2011, 7, 1), Count = 7534 },
            new SalesData() { Period = "2011 Q4", Date = new DateTime(2011, 10, 1), Count = 7894 },
            new SalesData() { Period = "2012 Q1", Date = new DateTime(2012, 1, 1), Count = 8748 },
            new SalesData() { Period = "2012 Q2", Date = new DateTime(2012, 4, 1), Count = 10223 },
            new SalesData() { Period = "2012 Q3", Date = new DateTime(2012, 7, 1), Count = 10797 },
            new SalesData() { Period = "2012 Q4", Date = new DateTime(2012, 10, 1), Count = 12295 },
            new SalesData() { Period = "2013 Q1", Date = new DateTime(2013, 1, 1), Count = 13153 },
            new SalesData() { Period = "2013 Q2", Date = new DateTime(2013, 4, 1), Count = 14628 },
            new SalesData() { Period = "2013 Q3", Date = new DateTime(2013, 7, 1), Count = 16779 },
            new SalesData() { Period = "2013 Q4", Date = new DateTime(2013, 10, 1), Count = 18710 },
            new SalesData() { Period = "2014 Q1", Date = new DateTime(2014, 1, 1), Count = 22219 },
            new SalesData() { Period = "2014 Q2", Date = new DateTime(2014, 4, 1), Count = 25886 },
            new SalesData() { Period = "2014 Q3", Date = new DateTime(2014, 7, 1), Count = 31640 },
            new SalesData() { Period = "2014 Q4", Date = new DateTime(2014, 10, 1), Count = 36846 },
            new SalesData() { Period = "2015 Q1", Date = new DateTime(2015, 1, 1), Count = 43433 },
            new SalesData() { Period = "2015 Q2", Date = new DateTime(2015, 4, 1), Count = 48575 },
            new SalesData() { Period = "2015 Q3", Date = new DateTime(2015, 7, 1), Count = 54533 },
            new SalesData() { Period = "2015 Q4", Date = new DateTime(2015, 10, 1), Count = 62388 },
            new SalesData() { Period = "2016 Q1", Date = new DateTime(2016, 1, 1), Count = 70706 },
            new SalesData() { Period = "2016 Q2", Date = new DateTime(2016, 4, 1), Count = 75439 },
            new SalesData() { Period = "2016 Q3", Date = new DateTime(2016, 7, 1), Count = 83213 },
            new SalesData() { Period = "2016 Q4", Date = new DateTime(2016, 10, 1), Count = 88527 },
            new SalesData() { Period = "2017 Q1", Date = new DateTime(2017, 1, 1), Count = 99865 },
            new SalesData() { Period = "2017 Q2", Date = new DateTime(2017, 4, 1), Count = 107388 },
            new SalesData() { Period = "2017 Q3", Date = new DateTime(2017, 7, 1), Count = 117761 },
            new SalesData() { Period = "2017 Q4", Date = new DateTime(2017, 10, 1), Count = 125263 },
            new SalesData() { Period = "2018 Q1", Date = new DateTime(2018, 1, 1), Count = 135950 },
            new SalesData() { Period = "2018 Q2", Date = new DateTime(2018, 4, 1), Count = 144737 },
            new SalesData() { Period = "2018 Q3", Date = new DateTime(2018, 7, 1), Count = 155933 },
            new SalesData() { Period = "2018 Q4", Date = new DateTime(2018, 10, 1), Count = 167960 },
            new SalesData() { Period = "2019 Q1", Date = new DateTime(2019, 1, 1), Count = 182725 },
            new SalesData() { Period = "2019 Q2", Date = new DateTime(2019, 4, 1), Count = 199079 },
            new SalesData() { Period = "2019 Q3", Date = new DateTime(2019, 7, 1), Count = 234952 },
            new SalesData() { Period = "2019 Q4", Date = new DateTime(2019, 10, 1), Count = 271298 },
            new SalesData() { Period = "2020 Q1", Date = new DateTime(2020, 1, 1), Count = 323309 },
            new SalesData() { Period = "2020 Q2", Date = new DateTime(2020, 4, 1), Count = 358145 },
            new SalesData() { Period = "2020 Q3", Date = new DateTime(2020, 7, 1), Count = 460927 },
            new SalesData() { Period = "2020 Q4", Date = new DateTime(2020, 10, 1), Count = 579568 },
            new SalesData() { Period = "2021 Q1", Date = new DateTime(2021, 1, 1), Count = 669590 },
            new SalesData() { Period = "2021 Q2", Date = new DateTime(2021, 4, 1), Count = 793564 },
            new SalesData() { Period = "2021 Q3", Date = new DateTime(2021, 7, 1), Count = 941133 },
            new SalesData() { Period = "2021 Q4", Date = new DateTime(2021, 10, 1), Count = 1133020 },
            new SalesData() { Period = "2022 Q1", Date = new DateTime(2022, 1, 1), Count = 426324 },
        };

        return data;
    }

    #endregion
}
`````

### Exponential Trendline

Use the Exponential Trendline to visualize data with rapidly accelerating growth or decay over time. This trendline helps you to emphasize trends that follow an exponential pattern, and it requires positive `Y` values.

>caption Chart with an Exponential Trendline

`````RAZOR
<TelerikChart>
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y" />
    <ChartZoomable Enabled="true" />
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom" />
    <ChartTooltip Visible="true" Shared="false" />

    <ChartSeriesItems>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Name="Stock Price Trend"
                     Data="@ChartData"
                     XField="@nameof(StockPriceTrend.NumericPeriod)"
                     YField="@nameof(StockPriceTrend.Price)">
        </ChartSeries>

        <ChartSeries Type="@ChartSeriesType.ExponentialTrendline"
                     Name="Stock Price (EXPONENTIAL)"
                     For="Stock Price Trend"
                     Color="blue">
            <ChartSeriesTrendline Period="4">
                <ChartSeriesTrendlineForecast Before="0" After="3" />
            </ChartSeriesTrendline>
        </ChartSeries>

    </ChartSeriesItems>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="Price" />
            <ChartYAxisLabels Format="C0" />
        </ChartYAxis>
    </ChartYAxes>

</TelerikChart>

@code {
    private List<StockPriceTrend> ChartData { get; set; }

    protected override void OnInitialized()
    {
        ChartData = GetTrendlineData();
    }

    private List<StockPriceTrend> GetTrendlineData()
    {
        return new List<StockPriceTrend>()
        {
            new StockPriceTrend()
            {
                Period = "Q1 2019",
                NumericPeriod = 10,
                Date = new DateTime(2019, 1, 1),
                Price = 10.28m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2019",
                NumericPeriod = 20,
                Date = new DateTime(2019, 4, 1),
                Price = 20.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2019",
                NumericPeriod = 30,
                Date = new DateTime(2019, 7, 1),
                Price = 29.33m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2019",
                NumericPeriod = 40,
                Date = new DateTime(2019, 10, 1),
                Price = 69.81m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2020",
                NumericPeriod = 50,
                Date = new DateTime(2020, 1, 1),
                Price = 45.5m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2020",
                NumericPeriod = 60,
                Date = new DateTime(2020, 4, 1),
                Price = 57.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2020",
                NumericPeriod = 70,
                Date = new DateTime(2020, 7, 1),
                Price = 68.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2020",
                NumericPeriod = 80,
                Date = new DateTime(2020, 10, 1),
                Price = 70.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2021",
                NumericPeriod = 90,
                Date = new DateTime(2021, 1, 1),
                Price = 68.15m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2021",
                NumericPeriod = 100,
                Date = new DateTime(2021, 4, 1),
                Price = 76.24m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2021",
                NumericPeriod = 110,
                Date = new DateTime(2021, 7, 1),
                Price = 52.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2021",
                NumericPeriod = 120,
                Date = new DateTime(2021, 10, 1),
                Price = 75.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2022",
                NumericPeriod = 130,
                Date = new DateTime(2022, 1, 1),
                Price = 84.25m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2022",
                NumericPeriod = 140,
                Date = new DateTime(2022, 4, 1),
                Price = 85.4m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2022",
                NumericPeriod = 150,
                Date = new DateTime(2022, 7, 1),
                Price = 79.93m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2022",
                NumericPeriod = 160,
                Date = new DateTime(2022, 10, 1),
                Price = 80.76m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2023",
                NumericPeriod = 170,
                Date = new DateTime(2023, 1, 1),
                Price = 128.36m
            },
        };
    }

    private class StockPriceTrend
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
`````

### Logarithmic Trendline

Use the Logarithmic Trendline to visualize data with rapid initial growth that slows over time or vice versa. This trendline emphasizes trends with a logarithmic pattern, and it requires positive `X` values.

>caption Chart with a Logarithmic Trendline

`````RAZOR
<TelerikChart>
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y" />
    <ChartZoomable Enabled="true" />
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom" />
    <ChartTooltip Visible="true" Shared="false" />

    <ChartSeriesItems>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Name="Stock Price Trend"
                     Data="@ChartData"
                     XField="@nameof(StockPriceTrend.NumericPeriod)"
                     YField="@nameof(StockPriceTrend.Price)">
        </ChartSeries>

        <ChartSeries Type="@ChartSeriesType.LogarithmicTrendline"
                     Name="Stock Price (LOGARITHMIC)"
                     For="Stock Price Trend"
                     Color="green">
            <ChartSeriesTrendline Period="4">
                <ChartSeriesTrendlineForecast Before="0" After="3" />
            </ChartSeriesTrendline>
        </ChartSeries>

    </ChartSeriesItems>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="Price" />
            <ChartYAxisLabels Format="C0" />
        </ChartYAxis>
    </ChartYAxes>

</TelerikChart>

@code {
    private List<StockPriceTrend> ChartData { get; set; }

    protected override void OnInitialized()
    {
        ChartData = GetTrendlineData();
    }

    private List<StockPriceTrend> GetTrendlineData()
    {
        return new List<StockPriceTrend>()
        {
            new StockPriceTrend()
            {
                Period = "Q1 2019",
                NumericPeriod = 10,
                Date = new DateTime(2019, 1, 1),
                Price = 10.28m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2019",
                NumericPeriod = 20,
                Date = new DateTime(2019, 4, 1),
                Price = 20.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2019",
                NumericPeriod = 30,
                Date = new DateTime(2019, 7, 1),
                Price = 29.33m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2019",
                NumericPeriod = 40,
                Date = new DateTime(2019, 10, 1),
                Price = 69.81m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2020",
                NumericPeriod = 50,
                Date = new DateTime(2020, 1, 1),
                Price = 45.5m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2020",
                NumericPeriod = 60,
                Date = new DateTime(2020, 4, 1),
                Price = 57.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2020",
                NumericPeriod = 70,
                Date = new DateTime(2020, 7, 1),
                Price = 68.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2020",
                NumericPeriod = 80,
                Date = new DateTime(2020, 10, 1),
                Price = 70.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2021",
                NumericPeriod = 90,
                Date = new DateTime(2021, 1, 1),
                Price = 68.15m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2021",
                NumericPeriod = 100,
                Date = new DateTime(2021, 4, 1),
                Price = 76.24m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2021",
                NumericPeriod = 110,
                Date = new DateTime(2021, 7, 1),
                Price = 52.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2021",
                NumericPeriod = 120,
                Date = new DateTime(2021, 10, 1),
                Price = 75.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2022",
                NumericPeriod = 130,
                Date = new DateTime(2022, 1, 1),
                Price = 84.25m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2022",
                NumericPeriod = 140,
                Date = new DateTime(2022, 4, 1),
                Price = 85.4m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2022",
                NumericPeriod = 150,
                Date = new DateTime(2022, 7, 1),
                Price = 79.93m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2022",
                NumericPeriod = 160,
                Date = new DateTime(2022, 10, 1),
                Price = 80.76m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2023",
                NumericPeriod = 170,
                Date = new DateTime(2023, 1, 1),
                Price = 128.36m
            },
        };
    }

    private class StockPriceTrend
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
`````

### Power Trendline

Use the Power Trendline to visualize data that follows a power-law relationship, indicating that one variable's change is proportional to a power of another variable. This trendline helps you to highlight trends where the rate of change isn't constant. It requires positive `Y` and `X` values.

>caption Chart with a Power Trendline

`````RAZOR
<TelerikChart>
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y" />
    <ChartZoomable Enabled="true" />
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom" />
    <ChartTooltip Visible="true" Shared="false" />

    <ChartSeriesItems>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Name="Stock Price Trend"
                     Data="@ChartData"
                     XField="@nameof(StockPriceTrend.NumericPeriod)"
                     YField="@nameof(StockPriceTrend.Price)">
        </ChartSeries>

        <ChartSeries Type="@ChartSeriesType.PowerTrendline"
                     Name="Stock Price (POWER)"
                     For="Stock Price Trend"
                     Color="teal">
            <ChartSeriesMarkers Visible="true" />
            <ChartSeriesTrendline Period="4">
                <ChartSeriesTrendlineForecast Before="0" After="3" />
            </ChartSeriesTrendline>
        </ChartSeries>

    </ChartSeriesItems>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="Price" />
            <ChartYAxisLabels Format="C0" />
        </ChartYAxis>
    </ChartYAxes>

</TelerikChart>

@code {
    private List<StockPriceTrend> ChartData { get; set; }

    protected override void OnInitialized()
    {
        ChartData = GetTrendlineData();
    }

    private List<StockPriceTrend> GetTrendlineData()
    {
        return new List<StockPriceTrend>()
        {
            new StockPriceTrend()
            {
                Period = "Q1 2019",
                NumericPeriod = 10,
                Date = new DateTime(2019, 1, 1),
                Price = 10.28m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2019",
                NumericPeriod = 20,
                Date = new DateTime(2019, 4, 1),
                Price = 20.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2019",
                NumericPeriod = 30,
                Date = new DateTime(2019, 7, 1),
                Price = 29.33m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2019",
                NumericPeriod = 40,
                Date = new DateTime(2019, 10, 1),
                Price = 69.81m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2020",
                NumericPeriod = 50,
                Date = new DateTime(2020, 1, 1),
                Price = 45.5m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2020",
                NumericPeriod = 60,
                Date = new DateTime(2020, 4, 1),
                Price = 57.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2020",
                NumericPeriod = 70,
                Date = new DateTime(2020, 7, 1),
                Price = 68.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2020",
                NumericPeriod = 80,
                Date = new DateTime(2020, 10, 1),
                Price = 70.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2021",
                NumericPeriod = 90,
                Date = new DateTime(2021, 1, 1),
                Price = 68.15m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2021",
                NumericPeriod = 100,
                Date = new DateTime(2021, 4, 1),
                Price = 76.24m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2021",
                NumericPeriod = 110,
                Date = new DateTime(2021, 7, 1),
                Price = 52.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2021",
                NumericPeriod = 120,
                Date = new DateTime(2021, 10, 1),
                Price = 75.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2022",
                NumericPeriod = 130,
                Date = new DateTime(2022, 1, 1),
                Price = 84.25m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2022",
                NumericPeriod = 140,
                Date = new DateTime(2022, 4, 1),
                Price = 85.4m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2022",
                NumericPeriod = 150,
                Date = new DateTime(2022, 7, 1),
                Price = 79.93m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2022",
                NumericPeriod = 160,
                Date = new DateTime(2022, 10, 1),
                Price = 80.76m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2023",
                NumericPeriod = 170,
                Date = new DateTime(2023, 1, 1),
                Price = 128.36m
            },
        };
    }

    private class StockPriceTrend
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
`````

### Polynomial Trendline

Use the Polynomial Trendline to visualize complex data patterns not fitting the other trendlines. This trendline fits a polynomial equation to the data points, allowing for a more flexible representation of trends with multiple turning points.

>caption Chart with a Polynomial Trendline

`````RAZOR
<TelerikChart>
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y" />
    <ChartZoomable Enabled="true" />
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom" />
    <ChartTooltip Visible="true" Shared="false" />

    <ChartSeriesItems>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Name="Stock Price Trend"
                     Data="@ChartData"
                     XField="@nameof(StockPriceTrend.NumericPeriod)"
                     YField="@nameof(StockPriceTrend.Price)">
        </ChartSeries>

        <ChartSeries Type="@ChartSeriesType.PolynomialTrendline"
                     Name="Stock Price (POLYNOMIAL)"
                     For="Stock Price Trend"
                     Color="brown">
            <ChartSeriesTrendline Period="4">
                <ChartSeriesTrendlineForecast Before="0" After="3" />
            </ChartSeriesTrendline>
        </ChartSeries>

    </ChartSeriesItems>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="Price" />
            <ChartYAxisLabels Format="C0" />
        </ChartYAxis>
    </ChartYAxes>

</TelerikChart>

@code {
    private List<StockPriceTrend> ChartData { get; set; }

    protected override void OnInitialized()
    {
        ChartData = GetTrendlineData();
    }

    private List<StockPriceTrend> GetTrendlineData()
    {
        return new List<StockPriceTrend>()
        {
            new StockPriceTrend()
            {
                Period = "Q1 2019",
                NumericPeriod = 10,
                Date = new DateTime(2019, 1, 1),
                Price = 10.28m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2019",
                NumericPeriod = 20,
                Date = new DateTime(2019, 4, 1),
                Price = 20.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2019",
                NumericPeriod = 30,
                Date = new DateTime(2019, 7, 1),
                Price = 29.33m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2019",
                NumericPeriod = 40,
                Date = new DateTime(2019, 10, 1),
                Price = 69.81m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2020",
                NumericPeriod = 50,
                Date = new DateTime(2020, 1, 1),
                Price = 45.5m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2020",
                NumericPeriod = 60,
                Date = new DateTime(2020, 4, 1),
                Price = 57.54m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2020",
                NumericPeriod = 70,
                Date = new DateTime(2020, 7, 1),
                Price = 68.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2020",
                NumericPeriod = 80,
                Date = new DateTime(2020, 10, 1),
                Price = 70.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2021",
                NumericPeriod = 90,
                Date = new DateTime(2021, 1, 1),
                Price = 68.15m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2021",
                NumericPeriod = 100,
                Date = new DateTime(2021, 4, 1),
                Price = 76.24m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2021",
                NumericPeriod = 110,
                Date = new DateTime(2021, 7, 1),
                Price = 52.3m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2021",
                NumericPeriod = 120,
                Date = new DateTime(2021, 10, 1),
                Price = 75.73m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2022",
                NumericPeriod = 130,
                Date = new DateTime(2022, 1, 1),
                Price = 84.25m
            },
            new StockPriceTrend()
            {
                Period = "Q2 2022",
                NumericPeriod = 140,
                Date = new DateTime(2022, 4, 1),
                Price = 85.4m
            },
            new StockPriceTrend()
            {
                Period = "Q3 2022",
                NumericPeriod = 150,
                Date = new DateTime(2022, 7, 1),
                Price = 79.93m
            },
            new StockPriceTrend()
            {
                Period = "Q4 2022",
                NumericPeriod = 160,
                Date = new DateTime(2022, 10, 1),
                Price = 80.76m
            },
            new StockPriceTrend()
            {
                Period = "Q1 2023",
                NumericPeriod = 170,
                Date = new DateTime(2023, 1, 1),
                Price = 128.36m
            },
        };
    }

    private class StockPriceTrend
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public decimal Price { get; set; }
    }
}
`````

## See Also

* [Live Demos: Trendline Chart](https://demos.telerik.com/blazor-ui/chart/trendline-chart)