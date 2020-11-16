---
title: Candlestick
page_title: Chart - Candlestick
description: Overview of the Candlestick Chart for Blazor.
slug: chart-types-candlestick
tags: telerik,blazor,chart,candlestick
published: True
position: 0
---

# Candlestick Chart

The **Candlestick** chart shows data for the movement of the price of a financial unit. It consists of a bar (the candle), representing the open and close values, and vertical lines, the candlesticks, which illustrate the highest and lowest values.

>caption Candlestick chart. Results from the first code snippet below

![](images/basic-candlestick-chart.png)

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

#### To create a candlestick chart:

1. add a `ChartSeries` to the `ChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Candlestick`
3. provide a data collection to its `Data` property and set the corresponding fields:
    * `CategoryField` - the date that will be matched to the x-axis
    * `OpenField` - the field with the Open value
    * `CloseField` - the field with the Close value
    * `HighField` - the field with the High value
    * `LowField` - the field with the Low value
4. make the x-axis a [Date axis]({%slug components/chart/date-axis%}) - while the candlestick chart can work with simple string categories, it is designed to show financial data over time


>caption A Candlestick chart that shows product financial stock data

````CSHTML
@* Candlestick chart *@

<TelerikChart Height="480px" Width="640px">

    <ChartSeriesItems>
        <ChartSeries Type="@ChartSeriesType.Candlestick"
                     Name="Product 1"
                     Data="@ChartProduct1Data"
                     CategoryField="@(nameof(StockDataPoint.Date))"
                     OpenField="@nameof(StockDataPoint.Open)"
                     CloseField="@nameof(StockDataPoint.Close)"
                     HighField="@nameof(StockDataPoint.High)"
                     LowField="@nameof(StockDataPoint.Low)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Type="@ChartCategoryAxisType.Date" BaseUnit="@ChartCategoryAxisBaseUnit.Months">
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisLabels Format="{0:C4}"></ChartValueAxisLabels>
        </ChartValueAxis>
    </ChartValueAxes>

</TelerikChart>

@code {
    List<StockDataPoint> ChartProduct1Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GenerateChartData();
    }

    async Task GenerateChartData()
    {
        ChartProduct1Data = new List<StockDataPoint>()
        {
            new StockDataPoint(new DateTime(2019, 1, 1), 39.88m, 40.12m, 41.12m, 39.75m, 3584700),
            
            // Close is lower than Open, so the Down color is used, see later in the article for more details
            new StockDataPoint(new DateTime(2019, 2, 1), 41.62m, 40.12m, 41.69m, 39.81m, 2632000),
            
            new StockDataPoint(new DateTime(2019, 3, 1), 42m, 42.62m, 43.31m, 41.38m, 7631700),
            new StockDataPoint(new DateTime(2019, 4, 1), 42.25m, 43.06m, 43.31m, 41.12m, 4922200),
        };

        await Task.FromResult(ChartProduct1Data);
    }

    public class StockDataPoint
    {
        public StockDataPoint() { }

        public StockDataPoint(DateTime date, decimal open, decimal close, decimal high, decimal low, int volume)
        {
            Date = date;
            Open = open;
            Close = close;
            High = high;
            Low = low;
            Volume = volume;
        }
        public DateTime Date { get; set; }

        public decimal Open { get; set; }

        public decimal Close { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public int Volume { get; set; }
    }
}
````



## Candlestick Chart Specific Appearance Settings


### DownColor

Set the color - a valid CSS, RGB, RGBA color - of the series when the `OpenField` is greater than the `CloseField` by setting the `DownColor` property of the `ChartSeries`. This can be passed throught the data model and bound to the `DownColorField`.

@[template](/_contentTemplates/stockchart/link-to-basics.md#color-field-column-ohlc-candlestick)

@[template](/_contentTemplates/stockchart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)




## See Also

 * [Live Demo: Candlestick Chart](https://demos.telerik.com/blazor-ui/chart/candlestick-chart)
