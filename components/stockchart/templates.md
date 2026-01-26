---
title: No Data Template
page_title: Stock Chart - No Data Template
description: The NoDataTemplate in the Stock Chart for Blazor lets you customize the content displayed when no data is available for all series.
slug: stock-chart-no-data-template
tags: telerik,blazor,stockchart,templates
published: True
position: 31
components: ["stockchart"]
---
# No Data Template

Starting in **version 7.0.0**, when all StockChart series have no data to show, a default layout with **No data** text is displayed over the StockChart. To customize the default layout content declare a `<NoDataTemplate>` tag inside a `<StockChartSettings>` tag.

````RAZOR
<TelerikButton OnClick="@UpdateData">@ButtonContent</TelerikButton>
<br />
<TelerikStockChart @ref="StockChartRef"
                   Width="800px"
                   Height="400px"
                   DateField="@nameof(StockChartSeriesData.Date)">
    <StockChartTitle Text="Stocks data" Position="@ChartTitlePosition.Bottom"></StockChartTitle>

    <StockChartSettings>
        @* Define what should be shown when there's no data in the chart *@
        <NoDataTemplate>
            <p>No data available to display. Please add stock data or check back later.</p>
        </NoDataTemplate>
    </StockChartSettings>

    <StockChartSeriesItems>
        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 1"
                          Data="@StockChartData"
                          OpenField="@nameof(StockChartSeriesData.Open)"
                          CloseField="@nameof(StockChartSeriesData.Close)"
                          HighField="@nameof(StockChartSeriesData.High)"
                          LowField="@nameof(StockChartSeriesData.Low)">
        </StockChartSeries>
    </StockChartSeriesItems>

    <StockChartNavigator>
        <StockChartNavigatorSeriesItems>
            <StockChartNavigatorSeries Type="StockChartSeriesType.Candlestick"
                                       Name="Product 1"
                                       Data="@StockChartData"
                                       OpenField="@nameof(StockChartSeriesData.Open)"
                                       CloseField="@nameof(StockChartSeriesData.Close)"
                                       HighField="@nameof(StockChartSeriesData.High)"
                                       LowField="@nameof(StockChartSeriesData.Low)">
            </StockChartNavigatorSeries>
        </StockChartNavigatorSeriesItems>
    </StockChartNavigator>
</TelerikStockChart>

@code {
    private const string Add = "Add Data";
    private const string Remove = "Remove Data";

    private TelerikStockChart StockChartRef { get; set; }
    private List<StockChartSeriesData> StockChartData { get; set; } = new List<StockChartSeriesData>();
    private string ButtonContent { get; set; } = Add;

    private void UpdateData()
    {
        if (StockChartData == null || StockChartData?.Count() == 0)
        {
            StockChartData = StockChartSeriesData.GenerateData();
            ButtonContent = Remove;
        }
        else
        {
            // Clear the data
            StockChartData = new List<StockChartSeriesData>();
            ButtonContent = Add;
        }
        StockChartRef.Refresh(); // Refresh the Chart
    }

    public class StockChartSeriesData
    {
        public DateTime Date { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public int Volume { get; set; }

        public static List<StockChartSeriesData> GenerateData()
        {
            List<StockChartSeriesData> data = new List<StockChartSeriesData>
            {
                new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/03"),
                 Open = 41.62m,
                 High = 41.69m,
                 Low = 39.81m,
                 Close = 40.12m,
                 Volume = 2632000
            },
            new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/04"),
                 Open = 39.88m,
                 High = 41.12m,
                 Low = 39.75m,
                 Close = 40.12m,
                 Volume = 3584700
            },
            new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/05"),
                 Open = 42m,
                 High = 43.31m,
                 Low = 41.38m,
                 Close = 42.62m,
                 Volume = 7631700
            },
            new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/06"),
                 Open = 42.25m,
                 High = 43.44m,
                 Low = 41.12m,
                 Close = 43.06m,
                 Volume = 4922200
            },
            new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/07"),
                 Open = 43.88m,
                 High = 44.88m,
                 Low = 43.69m,
                 Close = 44.12m,
                 Volume = 6008300
            },
            new StockChartSeriesData()
            {
                 Date = DateTime.Parse("2024/01/10"),
                 Open = 44.31m,
                 High = 44.5m,
                 Low = 43.5m,
                 Close = 43.69m,
                 Volume = 2400000
             },
            };

            return data;
        }
    }
}
````


