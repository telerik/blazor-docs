---
title: Trendlines
page_title: Chart Trendlines
description: Trendlines in the Charts for Blazor.
slug: chart-trendlines
tags: telerik,blazor,chart,trendlines
published: true
position: 25
---

# Trendlines

Trendlines are dynamic indicators that automatically reveal the overarching trends within your series data. These trendlines are defined as a special type of series linked to the main series by name.

Trendline series use the data from the main series. In cases where the main series employs aggregates, which is common for date series, the trendlines align with the aggregated data. For instance, when using a `sum` aggregate, the trendline illustrates the trends of the summations within each category.

## Trendline Types

The Chart supports two fundamental types of trendlines - the `Linear Trendline` and the `Moving Average Trendline`.

### Linear Trendline

The Linear Trendline serves the purpose of indicating whether a specific quantity is on the rise or decline over time.

>caption Below is an illustrative example showcasing the creation of a linear trendline in scatter line series:

`````CSHTML
<TelerikChart Width="@Width" Height="@Height">
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y"></ChartPannable>
    <ChartZoomable Enabled="true"></ChartZoomable>
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom"></ChartLegend>
    <ChartTooltip Visible="true" Shared="false"></ChartTooltip>

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
            <ChartSeriesMarkers Visible="true"></ChartSeriesMarkers>
            <ChartSeriesTrendline>
                <ChartSeriesTrendlineForecast Before="0" After="10"></ChartSeriesTrendlineForecast>
            </ChartSeriesTrendline>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis>
            <ChartXAxisLabels Position="@ChartAxisLabelsPosition.Start">
                <ChartXAxisLabelsRotation Angle="-90"></ChartXAxisLabelsRotation>
            </ChartXAxisLabels>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Min="-4e5" Max="1.2e6"></ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    public const string Height = "400px";
    public const string Width = "100%";
    public const string Series1Name = "Sales By Quarter";

    List<SalesData> ScatterData { get; set; } = new List<SalesData>();

    protected override Task OnInitializedAsync()
    {
        ScatterData = SalesData.GenerateScatterData();
        return base.OnInitializedAsync();
    }

    public class SalesData
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }

        public static List<SalesData> GenerateData()
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

        public static List<SalesData> GenerateScatterData()
        {
            var data = SalesData.GenerateData();

            for (int i = 0; i < data.Count; i++)
            {
                data[i].NumericPeriod = i + 10;
            }

            return data;
        }
    }
}
`````

### Moving Average Trendline

The Moving Average Trendline smoothens out data fluctuations by computing an average of all data points over a specified period. By default, this period is set to `2` chart intervals.

>caption The following example showcases a moving average trendline in line series:

`````CSHTML
<TelerikChart Width="@Width" Height="@Height">
    <ChartPannable Enabled="true" Lock="@ChartAxisLock.Y"></ChartPannable>
    <ChartZoomable Enabled="true"></ChartZoomable>
    <ChartLegend Visible="true" Position="@ChartLegendPosition.Bottom"></ChartLegend>
    <ChartTooltip Visible="true" Shared="true"></ChartTooltip>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Line"
                     Name="@Series1Name"
                     Data="@Data"
                     Field="@nameof(SalesData.Count)"
                     CategoryField="@nameof(SalesData.Period)">
            <ChartSeriesMarkers Visible="false"></ChartSeriesMarkers>
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.MovingAverageTrendline"
                     Name="Sales Forecast (MOVING AVERAGE)"
                     For="@Series1Name"
                     Color="teal">
            <ChartSeriesMarkers Visible="false"></ChartSeriesMarkers>
            <ChartSeriesTrendline>
                <ChartSeriesTrendline Period="4"></ChartSeriesTrendline>
            </ChartSeriesTrendline>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis>
            <ChartCategoryAxisLabels Position="@ChartAxisLabelsPosition.Start">
                <ChartCategoryAxisLabelsRotation Angle="-90"></ChartCategoryAxisLabelsRotation>
            </ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Min="-4e5" Max="1.2e6"></ChartValueAxis>
    </ChartValueAxes>
</TelerikChart>

@code {
    public const string Height = "400px";
    public const string Width = "100%";
    public const string Series1Name = "Sales By Quarter";

    List<SalesData> Data { get; set; } = new List<SalesData>();

    protected override Task OnInitializedAsync()
    {
        Data = SalesData.GenerateData();
        return base.OnInitializedAsync();
    }

    public class SalesData
    {
        public string Period { get; set; }
        public int NumericPeriod { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }

        public static List<SalesData> GenerateData()
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
    }
}
`````

## Chart Trendlines Parameters

The following table lists Chart Trendlines parameters.

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `ChartSeries.For` | `string` | The name of the parent series of the trendline. |
| `ChartSeriesTrendline` | `Object` | The trendline configuration options. |
| `ChartSeriesTrendlineForecast` | `Object` | The trendline forecast settings. By default, the trendline does not display a forecast. |
| `ChartSeriesTrendlineForecast.Before` | `int` | The number of intervals to extend the trendline before the first data point. |
| `ChartSeriesTrendlineForecast.After` | `int` | The number of intervals to extend the trendline after the last data point. |
| `ChartSeriesTrendline.Period` | `int` | The number of intervals to take when calculating averages. The value should be an integer greater than 2. |
| `Type` | `ChartSeriesType (enum) ` | The type of the series. |

## Supported Series Types

Trendlines are supported for the following chart types:

| Chart Type |
| --- |
| `Area` |
| `Bar` |
| `BoxPlot` |
| `Candlestick` |
| `Column` |
| `Line` |
| `OHLC` |
| `RangeArea` |
| `RangeColumn` |
| `Scatter` |
| `ScatterLine` |

## See Also

* [Live Demos: Trendline Chart](https://demos.telerik.com/blazor-ui/chart/trendline-chart)