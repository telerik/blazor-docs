---
title: Label Template and Format
page_title: StockChart - Label Template and Format
description: Learn how to use the Label Template in the Blazor StockChart and to format the labels of the axes and the navigator.
slug: stockchart-labels-format-template
tags: telerik,blazor,stock,stockchart,chart,label,template,format,customize
published: true
position: 23
---

# Label Template and Format

The StockChart for Blazor can render labels on the axes and the navigator. You can control these texts not only through the values you bind to data but also through [format strings](#format-strings) or [templates](#templates).

You can also rotate the labels by setting the `Angle` parameter to a numeric value the labels will rotate to.

In this article:
* [Format Strings](#format-strings)
* [Templates](#templates)

## Format Strings

You can use the `Format` parameter to apply standard [numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) and [date and time format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings).

>caption Format the labels on the Value and Category Axes

````RAZOR
Standard number format strings and rotate the labels of the Category Axis

<TelerikStockChart Width="700px"
                   Height="450px"
                   DateField="@nameof(StockDataPoint.Date)">

    <StockChartCategoryAxes>
        <StockChartCategoryAxis BaseUnit="@ChartCategoryAxisBaseUnit.Months">
            <StockChartCategoryAxisLabels Format="{0:D}">
                <StockChartCategoryAxisLabelsRotation Angle="30"/>
            </StockChartCategoryAxisLabels>
        </StockChartCategoryAxis>
    </StockChartCategoryAxes>

    <StockChartValueAxes>
        <StockChartValueAxis>
            <StockChartValueAxisLabels Format="{0:C0}"></StockChartValueAxisLabels>
        </StockChartValueAxis>
    </StockChartValueAxes>

    <StockChartSeriesItems>
        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                          Name="Product 1"
                          Data="@StockChartProduct1Data"
                          OpenField="@nameof(StockDataPoint.Open)"
                          CloseField="@nameof(StockDataPoint.Close)"
                          HighField="@nameof(StockDataPoint.High)"
                          LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>
    </StockChartSeriesItems>

    <StockChartNavigator>
        <StockChartNavigatorCategoryAxis>
            <StockChartNavigatorCategoryAxisLabels>
                <StockChartNavigatorCategoryAxisLabels Format="dd MMM yyyy"></StockChartNavigatorCategoryAxisLabels>
            </StockChartNavigatorCategoryAxisLabels>
        </StockChartNavigatorCategoryAxis>
        
        <StockChartNavigatorSeriesItems>
            <StockChartNavigatorSeries Type="StockChartSeriesType.Line"
                                       Name="Product 1"
                                       Data="@StockChartProduct1Data"
                                       Field="@(nameof(StockDataPoint.High))"
                                       CategoryField="@(nameof(StockDataPoint.Date))">
            </StockChartNavigatorSeries>
        </StockChartNavigatorSeriesItems>
    </StockChartNavigator>

</TelerikStockChart>

@code {
    public List<StockDataPoint> StockChartProduct1Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GenerateChartData();
    }

    public async Task GenerateChartData()
    {
        StockChartProduct1Data = new List<StockDataPoint>()
        {
            new StockDataPoint(new DateTime(2019, 1, 1), 41.62m, 40.12m, 41.69m, 39.81m, 2632000),
            new StockDataPoint(new DateTime(2019, 2, 1), 39.88m, 40.12m, 41.12m, 39.75m, 3584700),
            new StockDataPoint(new DateTime(2019, 3, 1), 42m, 42.62m, 43.31m, 41.38m, 7631700),
            new StockDataPoint(new DateTime(2019, 4, 1), 42.25m, 43.06m, 43.31m, 41.12m, 4922200),
        };

        await Task.FromResult(StockChartProduct1Data);
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

## Templates

You can use the `Template` parameter to apply more complex formatting to the labels in the StockChart for Blazor. The syntax of the template is based on the [Kendo Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview). The labels are not HTML elements so the `Template` cannot contain arbitrary HTML elements. If you want to add a new line, use the `\n` symbol instead of a block HTML element. 

To format the values, you need to call a JavaScript function that will return the desired new string based on the template value you pass to it. You can find examples of this in the [How to format the percent in a label for a pie or donut chart]({%slug chart-format-percent%}) knowledge base article and the [Label Format - Complex Logic](https://github.com/telerik/blazor-ui/tree/master/chart/label-template) sample project.

### Template Fields

In a *category axis* label template, you can use the following fields:

* `value` - the category value
* `format` - the default format of the label

<!--* `dataItem` - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.-->
<!--* culture - the default culture (if set) on the label-->

In a *value axis* label template, you can use the following fields:

* `value` - the label value

### Example

>tip The template syntax works the same way for the Telerik UI for Blazor Chart and StockChart.

>caption Custom templates in labels

````RAZOR
Label templates

<TelerikStockChart Width="700px"
                    Height="450px"
                    DateField="@nameof(StockDataPoint.Date)">

    <StockChartCategoryAxes>
        <StockChartCategoryAxis BaseUnit="@ChartCategoryAxisBaseUnit.Months">
            <StockChartCategoryAxisLabels Template="#= value.toLocaleDateString('en-US') #"></StockChartCategoryAxisLabels>
        </StockChartCategoryAxis>
    </StockChartCategoryAxes>

    <StockChartValueAxes>
        <StockChartValueAxis>
            <StockChartValueAxisLabels Template="#= value#"></StockChartValueAxisLabels>
        </StockChartValueAxis>
    </StockChartValueAxes>

    <StockChartSeriesItems>
        <StockChartSeries Type="StockChartSeriesType.Candlestick"
                            Name="Product 1"
                            Data="@StockChartProduct1Data"
                            OpenField="@nameof(StockDataPoint.Open)"
                            CloseField="@nameof(StockDataPoint.Close)"
                            HighField="@nameof(StockDataPoint.High)"
                            LowField="@nameof(StockDataPoint.Low)">
        </StockChartSeries>
    </StockChartSeriesItems>

    <StockChartNavigator>
        <StockChartNavigatorCategoryAxis>
            <StockChartNavigatorCategoryAxisLabels Template="#= value.toLocaleDateString('en-US') #"></StockChartNavigatorCategoryAxisLabels>
        </StockChartNavigatorCategoryAxis>
        <StockChartNavigatorSeriesItems>
            <StockChartNavigatorSeries Type="StockChartSeriesType.Line"
                                        Name="Product 1"
                                        Data="@StockChartProduct1Data"
                                        Field="@(nameof(StockDataPoint.High))"
                            CategoryField="@(nameof(StockDataPoint.Date))">
            </StockChartNavigatorSeries>
        </StockChartNavigatorSeriesItems>
    </StockChartNavigator>

    <StockChartLegend>
        <StockChartLegendLabels></StockChartLegendLabels>
    </StockChartLegend>

</TelerikStockChart>

@code {
    public List<StockDataPoint> StockChartProduct1Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GenerateChartData();
    }

    public async Task GenerateChartData()
    {
        StockChartProduct1Data = new List<StockDataPoint>()
        {
            new StockDataPoint(new DateTime(2019, 1, 1), 41.62m, 40.12m, 41.69m, 39.81m, 2632000),
            new StockDataPoint(new DateTime(2019, 2, 1), 39.88m, 40.12m, 41.12m, 39.75m, 3584700),
            new StockDataPoint(new DateTime(2019, 3, 1), 42m, 42.62m, 43.31m, 41.38m, 7631700),
            new StockDataPoint(new DateTime(2019, 4, 1), 42.25m, 43.06m, 43.31m, 41.12m, 4922200),
        };

        await Task.FromResult(StockChartProduct1Data);
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


## See Also

* [Live Demos: StockChart](https://demos.telerik.com/blazor-ui/stockchart/overview)
