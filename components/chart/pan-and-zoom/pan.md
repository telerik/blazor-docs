---
title: Pan
page_title: Chart - Pan
description: Learn more about the Pan feature of the Telerik UI for Blazor Chart component and explore the available examples.
slug: components/chart/pan
tags: telerik, blazor, chart, event, pan, zoom
published: true
position: 0
---

# Pan

The `Pan` feature allows you to navigate through the Telerik Blazor Chart component. This functionality works with both `category` and `numeric` series.

## Configuring the Pan Settings

To enable panning: 

1. Set the boolean `Enabled` parameter in the corresponding `ChartPannable` inner tag of the Chart.
2. Set a range for the axis through the `Min` and `Max` parameters in the corresponding `ChartCategoryAxis` inner tag.

Charts can be panned in all directions. 

To perform panning, do either of the following: 

* Drag the plot area of the Chart.
* Hold the assigned panning key and drag the plot area. This method requires you to [specify a key for panning](#specifying-a-key-for-panning).

>caption Pannable Chart.

````CSHTML
@* This code snippet showcases an example of pannable Chart. *@
<TelerikChart>
    <ChartPannable Enabled="true"></ChartPannable>

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

### Specifying a Key for Panning

Specify the key for performing panning through the `Key` parameter in the `ChartPannable` tag via the `ChartPannableKey` enum, which provides the following options:
 * (default) `None` - no key is required
 * `Ctrl`
 * `Shift`
 * `Alt`

### Locking the Selected Axis for Panning

Specifies an axis that should not be panned through the `Lock` parameter in the `ChartPannable` tag via the `ChartAxisLock` enum, which provides the following options:
 * (default) `None` - none of the series are locked (as in, user can pan by either X and Y axis)
 * `X` - X axis is locked, user can pan only by `Y` axis.
 * `Y` - Y axis is locked, user can pan only by `X` axis.
 
### Example

>caption Specified Key and Locked Axis.

````CSHTML
@* This code snippet showcases an example of pannable Chart with specified modifier key and locked Axis. *@
Press CTRL + Click and Drag.
<TelerikChart>
    <ChartPannable Enabled="true"
                   Lock="@ChartAxisLock.Y"
                   Key="@ChartPannableKey.Ctrl">
    </ChartPannable>

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