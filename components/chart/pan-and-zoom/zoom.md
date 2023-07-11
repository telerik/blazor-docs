---
title: Zoom
page_title: Chart - Zoom
description: Learn more about the Zoom feature of the Telerik UI for Blazor Chart component and explore the available examples.
slug: components/chart/zoom
tags: telerik, blazor, chart, event, pan, zoom
published: true
position: 1
---

# Zoom

The `Zoom` feature allows you to zoom in/out the Telerik Blazor Chart component. This functionality works with both `category` and `numeric` series.

## Configuring the Zoom Settings

To enable zooming, set the boolean `Enabled` parameter in the corresponding `ChartZoomable` inner tag of the Chart.

To perform zooming, do either of the following:

* [Mouse-wheel](#mousewheel) (desktop) or pinch-zoom (mobile).
* [Selection](#selection) - hold the `Shift` key or the [assigned key](#specifying-a-key-for-zooming) and select an area.

>caption Zoomable Chart.

````CSHTML
@* This code snippet showcases an example of zoomable Chart. *@
<TelerikChart>
    <ChartZoomable Enabled="true"></ChartZoomable>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series1Data"
                     Name="0.8C"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series2Data"
                     Name="1.6C"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Data="@Series3Data"
                     Name="3.1C"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis Min="20" Max="50">
            <ChartXAxisTitle Text="Time"></ChartXAxisTitle>
            <ChartXAxisLabels Format="{0}m"></ChartXAxisLabels>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Min="20" Max="120">
            <ChartYAxisTitle Text="Charge"></ChartYAxisTitle>
            <ChartYAxisLabels Format="{0}%"></ChartYAxisLabels>
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

@code {
    public class ModelData
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

    public List<ModelData> Series1Data = new List<ModelData>()
    {
        new ModelData() { X = 10, Y = 10 },
        new ModelData() { X = 15, Y = 20 },
        new ModelData() { X = 20, Y = 25 },
        new ModelData() { X = 32, Y = 40 },
        new ModelData() { X = 43, Y = 50 },
        new ModelData() { X = 55, Y = 60 },
        new ModelData() { X = 60, Y = 70 },
        new ModelData() { X = 70, Y = 80 },
        new ModelData() { X = 90, Y = 100 },
    };

    public List<ModelData> Series2Data = new List<ModelData>()
    {
        new ModelData() { X = 10, Y = 40 },
        new ModelData() { X = 17, Y = 50 },
        new ModelData() { X = 18, Y = 70 },
        new ModelData() { X = 35, Y = 90 },
        new ModelData() { X = 47, Y = 95 },
        new ModelData() { X = 60, Y = 100 },
    };

    public List<ModelData> Series3Data = new List<ModelData>()
    {
        new ModelData() { X = 10, Y = 70 },
        new ModelData() { X = 13, Y = 90 },
        new ModelData() { X = 25, Y = 100 },
    };
}
````

### MouseWheel

To specify if the chart can be zoomed via the mousewheel, set the boolean `Enabled` parameter in the corresponding `ChartZoomableMousewheel` inner tag of the `ChartZoomable` tag.

You can also specify the zoom rate as percentage of the axis range via the `Rate` parameter in the `ChartZoomableMousewheel` tag. The default value is `0.3`(double) or `30%` of the axis range.

### Selection 

To specify if the chart can be zoomed via selection, set the boolean `Enabled` parameter in the corresponding `ChartZoomableSelection` inner tag of the `ChartZoomable` tag.

>caption MouseWheel and Selection Zoom in Chart.

````CSHTML
@* This code snippet showcases an example of mousewheel and selection zooming Chart. *@
<TelerikChart>
    <ChartZoomable Enabled="true">
        <ChartZoomableMousewheel Enabled="true" Rate="0.4"></ChartZoomableMousewheel>
        <ChartZoomableSelection Enabled="true"></ChartZoomableSelection>
    </ChartZoomable>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Name="Product 1"
                     Data="@Data"
                     Field="@nameof(ChartSeriesData.ProductSales)"
                     CategoryField="@nameof(ChartSeriesData.Year)">
        </ChartSeries>

        <ChartCategoryAxes>
            <ChartCategoryAxis Min="1" Max="5"></ChartCategoryAxis>
        </ChartCategoryAxes>
    </ChartSeriesItems>
</TelerikChart>

@code {
    List<ChartSeriesData> Data { get; set; } = new List<ChartSeriesData>();

    protected override Task OnInitializedAsync()
    {
        Data = ChartSeriesData.GenerateData();
        return base.OnInitializedAsync();
    }

    public class ChartSeriesData
    {
        public int ProductSales { get; set; }
        public DateTime Year { get; set; }

        public static List<ChartSeriesData> GenerateData()
        {
            List<ChartSeriesData> data = new List<ChartSeriesData>();

            for (int i = 1; i <= 10; i++)
            {
                var dataItem = new ChartSeriesData
                    {
                        ProductSales = i,
                        Year = new DateTime(2000 + i, 3, i),
                    };

                data.Add(dataItem);
            }

            return data;
        }
    }
}
````

### Specifying a Key for Zooming

Specify the key (applicable only for [selection zooming](#selection)) for performing zooming through the `Key` parameter in the `ChartZoomableSelection` tag via the `ChartZoomableSelectionKey` enum, which provides the following options:
 * (default) `None` - no key is required
 * `Ctrl`
 * `Shift`
 * `Alt`

### Locking the Selected Axis for Zooming

Specify an axis that should not be zoomed through the `Lock` parameter in the `ChartZoomableMousewheel`/`ChartZoomableSelection` tag via the `ChartAxisLock` enum, which provides the following options:
 * (default) `None` - none of the series are locked (as in, user can zoom by either X and Y axis)
 * `X` - X axis is locked, user can zoom only by `Y` axis.
 * `Y` - Y axis is locked, user can zoom only by `X` axis.

### Example

>caption Specified Key and Locked Axis.

````CSHTML
@* This code snippet showcases an example of mousewheel and selection zooming Chart with specified key. *@
Press CTRL + Click and Drag.
<TelerikChart>
    <ChartZoomable Enabled="true">
        <ChartZoomableMousewheel Lock="@ChartAxisLock.Y"></ChartZoomableMousewheel>
        <ChartZoomableSelection Lock="@ChartAxisLock.Y" Key="@ChartZoomableSelectionKey.Ctrl"></ChartZoomableSelection>
    </ChartZoomable>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Name="Product 1"
                     Data="@Data"
                     Field="@nameof(ChartSeriesData.ProductSales)"
                     CategoryField="@nameof(ChartSeriesData.Year)">
        </ChartSeries>

        <ChartCategoryAxes>
            <ChartCategoryAxis Min="1" Max="5"></ChartCategoryAxis>
        </ChartCategoryAxes>
    </ChartSeriesItems>
</TelerikChart>

@code {
    List<ChartSeriesData> Data { get; set; } = new List<ChartSeriesData>();

    protected override Task OnInitializedAsync()
    {
        Data = ChartSeriesData.GenerateData();
        return base.OnInitializedAsync();
    }

    public class ChartSeriesData
    {
        public int ProductSales { get; set; }
        public DateTime Year { get; set; }

        public static List<ChartSeriesData> GenerateData()
        {
            List<ChartSeriesData> data = new List<ChartSeriesData>();

            for (int i = 1; i <= 10; i++)
            {
                var dataItem = new ChartSeriesData
                    {
                        ProductSales = i,
                        Year = new DateTime(2000 + i, 3, i),
                    };

                data.Add(dataItem);
            }

            return data;
        }
    }
}
````

## See Also

  * [Live Demos: Chart - Pan and Zoom](https://demos.telerik.com/blazor-ui/chart/pan-zoom)