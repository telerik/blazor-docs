---
title: Zoom
page_title: Chart - Zoom
description: Learn more about the Zoom feature of the Telerik UI for Blazor Chart component and explore the available examples.
slug: components/chart/zoom
tags: telerik, blazor, chart, event, pan, zoom
published: true
position: 1
components: ["charts"]
---
# Zoom

The `Zoom` feature allows you to zoom in or out the Telerik UI for Blazor Chart component. This functionality works with both `category` and `numeric` series.

## Configuring the Zoom Settings

To enable zooming, set the boolean `Enabled` parameter in the corresponding `ChartZoomable` inner tag of the Chart.

To perform zooming, do either of the following:

* Use the [Mouse-wheel](#mouse-wheel) on desktop devices or the pinch gesture on mobile devices.
* When [Selection](#selection) is enabled, hold the `Shift` key or the [assigned keyboard key](#specifying-a-keyboard-key-for-zooming) and select an area.

>caption Zoomable Chart

````RAZOR
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

### Mouse Wheel

To specify if users can zoom in and out with the scroll wheel, set the boolean `Enabled` parameter in the corresponding `ChartZoomableMousewheel` inner tag of the `ChartZoomable` tag.

You can also specify the zoom rate as percentage of the axis range through the `Rate` parameter in the `ChartZoomableMousewheel` tag. The default value is `0.3`(`double`) or `30%` of the axis range.

### Selection 

To specify if users can zoom in and out on a selected area, set the boolean `Enabled` parameter in the corresponding `ChartZoomableSelection` inner tag of the `ChartZoomable` tag.

>caption Mouse wheel and selection zoom in the Chart

````RAZOR
@* This code snippet showcases an example of mouse wheel and selection zooming Chart. *@
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

### Specifying a Keyboard Key for Zooming

>You can define a keyboard key for zooming only [selection zooming](#selection) is configured.

To specify the keyboard key for zooming, use the `Key` parameter within the `ChartZoomableSelection` and pass the `ChartZoomableSelectionKey` enum, which provides the following options:
 * (default) `None`—No key is required
 * `Ctrl`
 * `Shift`
 * `Alt`

### Disabling Zooming on a Selected Axis

To specify an axis that users cannot zoom, use the `Lock` parameter within the `ChartZoomableMousewheel`/`ChartZoomableSelection` tag and pass the `ChartAxisLock` enum, which provides the following options:
 * (default) `None`—None of the series are locked, users can zoom by either X or Y axis.
 * `X`—The X axis is locked, users can zoom only by Y axis.
 * `Y`—The Y axis is locked, users can zoom only by X axis.

>caption Chart with specified zooming key and locked axis

````RAZOR
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
