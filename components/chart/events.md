---
title: Events
page_title: Chart - Events
description: Events in the Charts for Blazor.
slug: chart-events
tags: telerik,blazor,chart,events,event
published: true
position: 33
---

# Chart Events

This article describes the available events for the Telerik Chart for Blazor:

* [OnAxisLabelClick](#onaxislabelclick)
* [OnLegendItemClick](#onlegenditemclick)
* [OnDrilldown](#ondrilldown)
* [OnSeriesClick](#onseriesclick)

## OnAxisLabelClick

The `OnAxisLabelClick` event fires when the user clicks a label item on any of the Chart axes. The event argument is of type `ChartAxisLabelClickEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisName` | `string` | The value of the `Name` parameter of the Chart axis. Returns `null` if `Name` is not set. |
| `Index` | `int` | The label index on the clicked axis. |
| `Text` | `string` | The visible value of the label. It may be formatted. |
| `Value` | `object` | The underlying non-formatted value of the label. The `Value` can be: <ul><li>The same as the <code>Text</code> value when clicking on a category axis label.</li><li>A numeric value when clicking on a value axis label.</li><li>An ISO-8601 DateTime string when clicking on a date axis.</li></ul> |

>caption Using the Chart OnAxisLabelClick event

````RAZOR
@* Using the Chart OnAxisLabelClick event *@

<TelerikChart OnAxisLabelClick="@OnChartAxisLabelClick">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Line"
                     Data="@Series1Data"
                     Field="@nameof(SalesData.Revenue)"
                     CategoryField="@nameof(SalesData.TimePeriod)"
                     Name="Smartphones">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Name="my-axis-name" Type="@ChartCategoryAxisType.Date"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Revenue per Product Line"></ChartTitle>
</TelerikChart>

@code {
    private List<SalesData> Series1Data { get; set; } = new List<SalesData>();

    private async Task OnChartAxisLabelClick(ChartAxisLabelClickEventArgs args)
    {
        Console.WriteLine($"Clicked axis label {args.Text} with index {args.Index} and value {args.Value} from axis {args.AxisName}.");
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();
        var now = DateTime.Today;
        var monthsBack = 12;

        for (int i = 1; i <= monthsBack; i++)
        {
            var dateTimeValue = now.AddMonths(-monthsBack + i);

            Series1Data.Add(new SalesData()
            {
                Id = i,
                Product = "Smartphones",
                Revenue = rnd.Next(500, 900),
                TimePeriod = dateTimeValue
            });
        }

        base.OnInitialized();
    }

    public class SalesData
    {
        public int Id { get; set; }
        public string Product { get; set; }
        public DateTime TimePeriod { get; set; }
        public decimal Revenue { get; set; }
    }
}
````

## OnLegendItemClick

The `OnLegendItemClick` event fires when the user clicks on any item in the Chart legend. The event argument is of type `ChartLegendItemClickEventArgs` and exposes the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `PointIndex` | `int?` | The data point index in the series `Data`. Applies to single-series Charts only (Pie and Donut). |
| `SeriesIndex` | `int` | The series index in the `ChartSeriesItems` collection. |
| `Text` | `string` | The label of the clicked legend item. In multi-series Charts, the `Text` value matches the `ChartSeries` `Name`. In single-series Charts (Pie and Donut), the `Text` value matches the `CategoryField` value. |

>caption Using the Chart OnLegendItemClick event

````RAZOR
<p>Choose what happens on legend item click:</p>

<TelerikRadioGroup Data="@ClickModes" @bind-Value="@SelectedMode" />

<TelerikChart OnLegendItemClick="@OnLegendClickHandler"
              Transitions="false">
    <ChartSeriesItems>
        @for (int i = 0; i < ChartData.Count; i++)
        {
            <ChartSeries Type="ChartSeriesType.Line"
                         Data="@ChartData[i]"
                         Field="@nameof(SalesData.Revenue)"
                         CategoryField="@nameof(SalesData.TimePeriod)"
                         Name="@Products[i]"
                         Visible="@( GetSeriesVisibility(i) )">
            </ChartSeries>
        }
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Type="@ChartCategoryAxisType.Date"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Max="1000"></ChartValueAxis>
    </ChartValueAxes>

    <ChartTitle Text="Revenue per Product Line"></ChartTitle>

    <ChartLegend Position="@ChartLegendPosition.Bottom">
    </ChartLegend>
</TelerikChart>

@code {
    private List<List<SalesData>> ChartData { get; set; } = new();
    private List<string> ClickModes = new List<string> { "Toggle Series", "Show Single Series" };
    private string SelectedMode { get; set; } = "Toggle Series";
    private int? ChartLegendClickIndex { get; set; }
    private List<int> VisibleSeriesIndexes { get; set; } = new List<int> { 0, 1, 2 };
    private List<string> Products { get; set; } = new List<string> { "Smartphones", "Tablets", "Headphones" };

    private void OnLegendClickHandler(ChartLegendItemClickEventArgs args)
    {
        if (SelectedMode == ClickModes[0])
        {
            ToggleSeries(args);
        }
        else
        {
            ShowSingleSeries(args);
        }
    }

    private void ToggleSeries(ChartLegendItemClickEventArgs args)
    {
        if (VisibleSeriesIndexes.Contains(args.SeriesIndex))
        {
            VisibleSeriesIndexes.Remove(args.SeriesIndex);
        }
        else
        {
            VisibleSeriesIndexes.Add(args.SeriesIndex);
        }
    }

    private void ShowSingleSeries(ChartLegendItemClickEventArgs args)
    {
        if (ChartLegendClickIndex != args.SeriesIndex)
        {
            ChartLegendClickIndex = args.SeriesIndex;
        }
        else
        {
            ChartLegendClickIndex = null;
        }
    }

    private bool GetSeriesVisibility(int idx)
    {
        if (SelectedMode == ClickModes[0])
        {
            return VisibleSeriesIndexes.Contains(idx);
        }
        else
        {
            return ChartLegendClickIndex == null || ChartLegendClickIndex == idx;
        }
    }

    protected override void OnInitialized()
    {
        var now = DateTime.Today;
        var monthsBack = 12;
        var seriesCount = 3;

        for (int i = 0; i < seriesCount; i++)
        {
            ChartData.Add(new List<SalesData>());
        }

        for (int i = 1; i <= monthsBack; i++)
        {
            var dateTimeValue = now.AddMonths(-monthsBack + i);

            for (int j = 0; j < seriesCount; j++)
            {
                ChartData[j].Add(new SalesData()
                    {
                        Id = i,
                        Product = Products[j],
                        Revenue = Random.Shared.Next(100 + j * 100, 300 + j * 300),
                        TimePeriod = dateTimeValue
                    });
            }
        }

        base.OnInitialized();
    }

    public class SalesData
    {
        public int Id { get; set; }
        public string Product { get; set; } = "Product";
        public DateTime TimePeriod { get; set; }
        public decimal Revenue { get; set; }
    }
}
````

## OnDrilldown

The `OnDrilldown` event is triggered when the [drill-down functionality executes](slug:chart-drilldown). The handler of this event accepts a `ChartDrilldownEventArgs` object as a parameter. You can access the name of the drilled down (clicked) series through the `SeriesName` property of the event arguments object.

## OnSeriesClick

The `OnSeriesClick` event fires as a response to the user click on a `<ChartSeries>`.

Below you can find:

* [Event Arguments](#event-arguments)
* Examples:
	* [Basic Click Handler](#basic-click-handler)
	* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)
	* [Load Data On Demand Based On Series Click](#load-data-on-demand-based-on-series-click)


### Event Arguments

The event handler receives a `ChartSeriesClickEventArgs` object which provides the following data:

* `DataItem` - provides the data model of the current series item. You need to cast it to the type from your datasource, which needs to be serializable.

  * If you are using a [Date Axis](slug:components/chart/date-axis), the `DataItem` will contain the only the aggregated value in the corresponding y-value field, because it is a collection of more than one items. See the `Category` below for details.


* `Category` - provides information on the category the data point is located in. You need to cast it to the type in your data source, for example `DateTime`, `string`, `int` or another type. The Category parameter is applicable to [Categorical Charts](slug:components/chart/databind#series-types).

  * When using a [Date Axis](slug:components/chart/date-axis), you can use it, together with the `BaseUnit` value of the axis, to filter the data source and obtain the actual data items from the data source in case you want to provide extra information about them.


* `Percentage` - applicable to [Donut](slug:components/chart/types/donut), [Pie](slug:components/chart/types/pie) and [Stacked 100%](slug:components/chart/stack#stack-100) Charts - the percentage value of the current data point from the whole.

* `SeriesIndex` - provides the index of the `<ChartSeries>` the data point belongs to.

* `SeriesName` - bound to the Name parameter of the `<ChartSeries>` the data point belongs to.

* `SeriesColor` - shows the RGB color of the Series the data point belongs to.

* `CategoryIndex` - shows the index of the data point's x-axis category.

### Examples

These examples showcase the different applications of the `OnSeriesClick` event.

* [Basic Click Handler](#basic-click-handler)
* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)
* [Load Data On Demand Based On Series Click](#load-data-on-demand-based-on-series-click)

### Basic Click Handler

````RAZOR
@* Get the Category from which the user clicked. *@

<TelerikChart OnSeriesClick="@OnSeriesClickHandler">

    <ChartTooltip Visible="true">
    </ChartTooltip>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 1" Data="@series1Data">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Bar" Name="Product 2" Data="@series2Data">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue per product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>


<div>
   Clicked from: @logger
</div>

@code {
    public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
    public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

    string logger = String.Empty;

    void OnSeriesClickHandler(ChartSeriesClickEventArgs args)
    {
        var category = args.Category.ToString();
        logger = category;
    }
}
````


### Get The Data Model For The Clicked Series

````RAZOR
@* Receive the data model based on the series the user clicked on *@

<TelerikChart OnSeriesClick="@OnSeriesClickHandler">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie" Data="@pieData"
                     Field="@nameof(MyPieChartModel.SegmentValue)" CategoryField="@nameof(MyPieChartModel.SegmentName)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTitle Text="Revenue per product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Bottom">
    </ChartLegend>
</TelerikChart>

@if (!String.IsNullOrEmpty(logger))
{
    <div class="text-center">
        @logger
    </div>
}

@code {

    string logger = String.Empty;

    void OnSeriesClickHandler(ChartSeriesClickEventArgs args)
    {
        //Get the data model for the clicked series
        string item = (args.DataItem as MyPieChartModel).SegmentName;
        MyPieChartModel dataModel = pieData.Where(x => x.SegmentName == item).FirstOrDefault();

        logger = $"Clicked from {dataModel.SegmentName} with value {dataModel.SegmentValue}";
    }

    public class MyPieChartModel
    {
        public string SegmentName { get; set; }
        public double SegmentValue { get; set; }
    }

    public List<MyPieChartModel> pieData = new List<MyPieChartModel>
    {
        new MyPieChartModel
        {
            SegmentName = "Product 1",
            SegmentValue = 2
        },
        new MyPieChartModel
        {
            SegmentName = "Product 2",
            SegmentValue = 3
        },
        new MyPieChartModel
        {
            SegmentName = "Product 3",
            SegmentValue = 4
        }
    };
}
````



### Load Data On Demand Based On Series Click

````RAZOR
@* Load data on demand based on series click *@

<TelerikChart OnSeriesClick="@OnSeriesClickHandler">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie" Data="@pieData"
                     Field="@nameof(MyPieChartModel.SegmentValue)" CategoryField="@nameof(MyPieChartModel.SegmentName)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTitle Text="Revenue per product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Bottom">
    </ChartLegend>
</TelerikChart>

@if (GridData.Any())
{
    <div class="text-center">
        <TelerikGrid Data="@GridData" AutoGenerateColumns="true"
                     Pageable="true" PageSize="4" Width="650px">
        </TelerikGrid>
    </div>
}

@code {
    public List<MyGridModel> GridData { get; set; } = new List<MyGridModel>();

    async Task OnSeriesClickHandler(ChartSeriesClickEventArgs args)
    {
        int clickedId = (args.DataItem as MyPieChartModel).SegmentId;

        GridData = await GenerateGridData(clickedId);
    }

    async Task<List<MyGridModel>> GenerateGridData(int id)
    {
        GridData = new List<MyGridModel>()
        {
            new MyGridModel()
            {
                Id = id,
                ProductManager = $"Product manager {id}",
                ProductLaunchDate = DateTime.Today.AddDays(-id),
                isActive = id % 2 == 0 ? true : false
            }
        };
        return await Task.FromResult(GridData);
    }

    public List<MyPieChartModel> pieData = new List<MyPieChartModel>
    {
        new MyPieChartModel
        {
            SegmentId = 1,
            SegmentName = "Product 1",
            SegmentValue = 2
        },
        new MyPieChartModel
        {
            SegmentId = 2,
            SegmentName = "Product 2",
            SegmentValue = 3
        },
        new MyPieChartModel
        {
            SegmentId = 3,
            SegmentName = "Product 3",
            SegmentValue = 4
        }
    };

    public class MyPieChartModel
    {
        public int SegmentId { get; set; }
        public string SegmentName { get; set; }
        public double SegmentValue { get; set; }
    }

    public class MyGridModel
    {
        public int Id { get; set; }
        public string ProductManager { get; set; }
        public DateTime ProductLaunchDate { get; set; }
        public bool isActive { get; set; }
    }
}
````



## See Also

* [Live Demo: Chart Events](https://demos.telerik.com/blazor-ui/chart/events)
