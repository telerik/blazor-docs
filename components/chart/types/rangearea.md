---
title: Range Area
page_title: Chart - Range Area
description: Overview of the Range Area Chart for Blazor.
slug: components/chart/types/rangearea
tags: telerik,blazor,chart,rangearea
published: True
position: 0
---

# Range Area Chart

The <a href="https://www.telerik.com/blazor-ui/range-area-chart" target="_blank">Blazor Range Area Chart</a> shows the data as a colored area between two continuous lines that pass through points defined by their items' "low" and "high" values. The graph between the border lines has a different customizable color for each series. The Range Area Chart is similar to the [Area Chart]({%slug components/chart/types/rangearea%}). The latter can be regarded as a Range Area Chart with a "low" value of zero.

The Range Area Chart can emphasize the difference between pairs of continuous value sequences.

By default, the series backgrounds are semi-transparent, which lets the user clearly see where different sets of data overlap.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating Blazor Range Area Chart

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
2. Set its `Type` property to `ChartSeriesType.RangeArea`.
3. Provide a data collection to its `Data` property. You can use a [jagged array](#bind-range-area-series-to-jagged-array) (an array of arrays) or a [collection of custom objects](#bind-range-area-series-to-custom-objects).
4. If the Range Area data is a jagged array, provide data for the `Categories` parameter of the `ChartCategoryAxis`.

### Bind Range Area Series to Jagged Array

In this case, set the `ChartSeries` `Data` parameter to an array of arrays. The inner arrays should have two members - one for the "low" ("from") value, and one of the "high" ("to") value.

In addition, set the `Categories` parameter of the `ChartCategoryAxis` to `object[]`. The members of this array will be used as labels for the category axis in their respective order.

>caption Blazor Range Area Chart bound to array of arrays

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Name="Sydney"
                     Data="@SydneyData"
                     Type="ChartSeriesType.RangeArea">
        </ChartSeries>
        <ChartSeries Name="Sofia"
                     Data="@SofiaData"
                     Type="ChartSeriesType.RangeArea">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@MonthNames" />
    </ChartCategoryAxes>

    <ChartTooltip Visible="true"></ChartTooltip>

    <ChartTitle Text="Monthly Temperatures"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right"></ChartLegend>
</TelerikChart>

@code {
    private double[][] SydneyData { get; set; } = new double[][]
    {
        new double[] { 20, 27 },
        new double[] { 19.9, 26.8 },
        new double[] { 18.4, 25.7 },
        new double[] { 15.3, 23.6 },
        new double[] { 12.3, 20.9 },
        new double[] { 10, 18.3 },
        new double[] { 8.9, 17.9 },
        new double[] { 9.7, 19.3 },
        new double[] { 12.3, 21.6 },
        new double[] { 14.6, 23.2 },
        new double[] { 16.6, 24.2 },
        new double[] { 18.4, 25.7 }
    };

    private double[][] SofiaData { get; set; } = new double[][]
    {
        new double[] { -3.8, 3.6 },
        new double[] { -2.3, 6.5 },
        new double[] { 1.1, 11.5 },
        new double[] { 5.4, 16.7 },
        new double[] { 9.9, 21.4 },
        new double[] { 13.4, 25.3 },
        new double[] { 15.3, 27.9 },
        new double[] { 15.3, 28.4 },
        new double[] { 11.1, 23.3 },
        new double[] { 6.7, 17.6 },
        new double[] { 2.2, 10.7 },
        new double[] { -2.3, 4.6 }
    };

    private object[] MonthNames = new string[] {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    };
}
````

### Bind Range Area Series to Custom Objects

In this case, set the `ChartSeries` `Data` parameter to an `IEnumerable<T>`. Then, set the `FromField`, `ToField` and `CategoryField` parameters of the `ChartSeries` to properties of the `T` type.

>caption Blazor Range Area Chart bound to custom objects

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Name="Test Tube 1"
                     Data="@Tube1Data"
                     Type="ChartSeriesType.RangeArea"
                     FromField="@nameof(AreaDataPoint.LowValue)"
                     ToField="@nameof(AreaDataPoint.HighValue)"
                     CategoryField="@nameof(AreaDataPoint.Hour)">
        </ChartSeries>
        <ChartSeries Name="Test Tube 2"
                     Data="@Tube2Data"
                     Type="ChartSeriesType.RangeArea"
                     FromField="@nameof(AreaDataPoint.LowValue)"
                     ToField="@nameof(AreaDataPoint.HighValue)"
                     CategoryField="@nameof(AreaDataPoint.Hour)">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTooltip Visible="true"></ChartTooltip>

    <ChartTitle Text="Laboratory Measurements"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right"></ChartLegend>
</TelerikChart>

@code {
    private List<AreaDataPoint> Tube1Data { get; set; } = new List<AreaDataPoint>();

    private List<AreaDataPoint> Tube2Data { get; set; } = new List<AreaDataPoint>();

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 0; i <= 23; i++)
        {
            Tube1Data.Add(new AreaDataPoint()
            {
                Hour = i,
                LowValue = rnd.Next(5 * i, 10 * i),
                HighValue = rnd.Next(15 * i, 20 * i + 5)
            });

            Tube2Data.Add(new AreaDataPoint()
            {
                Hour = i,
                LowValue = rnd.Next(5 * (24 - i), 10 * (24 - i)),
                HighValue = rnd.Next(15 * (24 - i), 20 * (24 - i))
            });
        }
    }

    public class AreaDataPoint
    {
        public int Hour { get; set; }
        public int LowValue { get; set; }
        public int HighValue { get; set; }
    }
}
````


## Range Area Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

You can control the color of the line itself separately by using the `Color` property of the nested `TelerikChartSeriesLine` tag.

@[template](/_contentTemplates/chart/link-to-basics.md#opacity-area-bubble)

### Missing Values

If *both* values in a range pair are missing or `null`, you can have the Chart work around this by setting the `MissingValues` property of the series to the desired behavior. Use a member of the `Telerik.Blazor.ChartSeriesMissingValues` enum:

* `Zero` - the default behavior. The two lines and the area between them will go to the 0 value mark.
* `Interpolate` - the lines and area will go through the interpolated values of the missing data points and connect to the next data points with a value.
* `Gap` - there will be empty space in the range area until the next pair of values.


### Line Style

You can render the lines between the points with different styles. The supported styles can be set via the `Style` property of the child `ChartSeriesLine` tag - it takes a member of `Telerik.Blazor.ChartSeriesLineStyle` enum:

* `Normal`—This is the default style. It produces a straight line between data points.
* `Step`—The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* `Smooth`—This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)


## See Also

* [Live Demo: Range Area Chart](https://demos.telerik.com/blazor-ui/chart/range-area-chart)
