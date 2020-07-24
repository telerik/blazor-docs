---
title: Shared Tooltip
page_title: Stock Chart - Shared Tooltip
description: Shared Tooltip for the Blazor Stock Chart.
slug: stockchart-tooltip-shared
tags: telerik,blazor,stock,chart,tooltip,shared,tooltips
published: True
position: 2
---

# Shared Tooltip for Telerik Blazor Stock Chart

The Telerik Stock Chart allows you to show a unified tooltip for all categories in the Chart.

In this article:
* [Basics](#basics)
* [Customization](#customization)
 * [Parameter Settings](#parameter-settings)
 * [Shared Template](#shared-template)


## Basics

The shared tooltip provides summarized information of all data points from the hovered category. This tooltip will take precedence over tooltip settings defined for a specific series.

To enable the shared tooltip:

1. Inside the `<TelerikStockChart>` tag, add the `<StockChartTooltip>` tag.
1. Set its `Visible` parameter to `true`.
1. Set its `Shared` parameter to `true`.

>caption Basic configuration of a Stock Chart with Shared Tooltip

````CSHTML
@* This example shows how to enable a Shared Tooltip *@

<TelerikStockChart Width="750px"
                   Height="450px"
                   DateField="@nameof(StockDataPoint.Date)">

    <StockChartTooltip Visible="true" Shared="true"></StockChartTooltip>

    <StockChartCategoryAxes>
        <StockChartCategoryAxis BaseUnit="@ChartCategoryAxisBaseUnit.Months"></StockChartCategoryAxis>
    </StockChartCategoryAxes>

    <StockChartSeriesItems>
        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 1"
                          Data="@StockChartProduct1Data"
                          OpenField="@nameof(StockDataPoint.Open)"
                          CloseField="@nameof(StockDataPoint.Close)"
                          HighField="@nameof(StockDataPoint.High)"
                          LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>

        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 2"
                          Data="@StockChartProduct2Data"
                          OpenField="@nameof(StockDataPoint.Open)"
                          CloseField="@nameof(StockDataPoint.Close)"
                          HighField="@nameof(StockDataPoint.High)"
                          LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>
    </StockChartSeriesItems>

</TelerikStockChart>


@code {
    public List<StockDataPoint> StockChartProduct1Data { get; set; }
    public List<StockDataPoint> StockChartProduct2Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GenerateChartData();
    }

    public async Task GenerateChartData()
    {
        StockChartProduct1Data = new List<StockDataPoint>()
{
            new StockDataPoint(new DateTime(2019, 1, 1), (decimal)41.62, (decimal)40.12, (decimal)41.69, (decimal)39.81, 2632000),
            new StockDataPoint(new DateTime(2019, 2, 1), (decimal)39.88, (decimal)40.12, (decimal)41.12, (decimal)39.75, 3584700),
            new StockDataPoint(new DateTime(2019, 3, 1), (decimal)42, (decimal)42.62, (decimal)43.31, (decimal)41.38, 7631700),
            new StockDataPoint(new DateTime(2019, 4, 1), (decimal)42.25, (decimal)43.06, (decimal)43.31, (decimal)41.12, 4922200),
        };

        StockChartProduct2Data = new List<StockDataPoint>()
    {
            new StockDataPoint(new DateTime(2019, 1, 1), (decimal)39, (decimal)38, (decimal)44, (decimal)37, 26320),
            new StockDataPoint(new DateTime(2019, 2, 1), (decimal)37, (decimal)38, (decimal)41, (decimal)40, 35847),
            new StockDataPoint(new DateTime(2019, 3, 1), (decimal)42, (decimal)43, (decimal)45, (decimal)41, 76317),
            new StockDataPoint(new DateTime(2019, 4, 1), (decimal)40, (decimal)42, (decimal)43, (decimal)42, 49222),
        };

        await Task.FromResult(StockChartProduct1Data);
        await Task.FromResult(StockChartProduct2Data);
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
>caption The result from the code snippet above

![shared tooltip example](images/stockchart-tooltip-shared-basic.png)

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
@* This example shows how to use the SharedTemplate and extract information on the data points value and get the series name from the context *@

<TelerikStockChart Width="750px"
                   Height="450px"
                   DateField="@nameof(StockDataPoint.Date)">

    <StockChartTooltip Visible="true" Shared="true">
        <SharedTemplate>
            @{
                var points = context.Points;

                foreach (var point in points)
                {
                    <div>
                        <TelerikIcon Icon="@IconName.Information" />
                        <strong>Product name: @point.SeriesName</strong> has
                        High value: @(((point.DataItem as StockDataPoint).High).ToString("C2"))
                    </div>
                }
            }
        </SharedTemplate>
    </StockChartTooltip>

    <StockChartCategoryAxes>
        <StockChartCategoryAxis BaseUnit="@ChartCategoryAxisBaseUnit.Months"></StockChartCategoryAxis>
    </StockChartCategoryAxes>

    <StockChartSeriesItems>
        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 1"
                          Data="@StockChartProduct1Data"
                          OpenField="@nameof(StockDataPoint.Open)"
                          CloseField="@nameof(StockDataPoint.Close)"
                          HighField="@nameof(StockDataPoint.High)"
                          LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>

        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 2"
                          Data="@StockChartProduct2Data"
                          OpenField="@nameof(StockDataPoint.Open)"
                          CloseField="@nameof(StockDataPoint.Close)"
                          HighField="@nameof(StockDataPoint.High)"
                          LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>
    </StockChartSeriesItems>

</TelerikStockChart>


@code {
    public List<StockDataPoint> StockChartProduct1Data { get; set; }
    public List<StockDataPoint> StockChartProduct2Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GenerateChartData();
    }

    public async Task GenerateChartData()
    {
        StockChartProduct1Data = new List<StockDataPoint>()
{
            new StockDataPoint(new DateTime(2019, 1, 1), (decimal)41.62, (decimal)40.12, (decimal)41.69, (decimal)39.81, 2632000),
            new StockDataPoint(new DateTime(2019, 2, 1), (decimal)39.88, (decimal)40.12, (decimal)41.12, (decimal)39.75, 3584700),
            new StockDataPoint(new DateTime(2019, 3, 1), (decimal)42, (decimal)42.62, (decimal)43.31, (decimal)41.38, 7631700),
            new StockDataPoint(new DateTime(2019, 4, 1), (decimal)42.25, (decimal)43.06, (decimal)43.31, (decimal)41.12, 4922200),
        };

        StockChartProduct2Data = new List<StockDataPoint>()
{
            new StockDataPoint(new DateTime(2019, 1, 1), (decimal)39, (decimal)38, (decimal)44, (decimal)37, 26320),
            new StockDataPoint(new DateTime(2019, 2, 1), (decimal)37, (decimal)38, (decimal)41, (decimal)40, 35847),
            new StockDataPoint(new DateTime(2019, 3, 1), (decimal)42, (decimal)43, (decimal)45, (decimal)41, 76317),
            new StockDataPoint(new DateTime(2019, 4, 1), (decimal)40, (decimal)42, (decimal)43, (decimal)42, 49222),
        };

        await Task.FromResult(StockChartProduct1Data);
        await Task.FromResult(StockChartProduct2Data);
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
>caption The result from the code snippet above

![shared tooltip template example](images/stockchart-tooltip-shared-template.png)

## See also

* [Stock Chart Overview]({%slug stockchart-overview%})
* [Stock Chart Tooltip Overview]({%slug stockchart-tooltip-overview%})
