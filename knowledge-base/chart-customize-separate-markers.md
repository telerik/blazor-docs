---
title: Configuring Individual Markers in a ScatterLine Chart
description: Learn how to customize markers for specific data points in a ScatterLine Chart to highlight them as special.
type: how-to
page_title: How to Customize Markers for Specific Data Points in ScatterLine Chart
slug: chart-kb-customize-separate-markers
tags: charts, blazor, scatterline, markers, customization
res_type: kb
ticketid: 1666618
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Charts for Blazor</td>
</tr>
</tbody>
</table>

## Description

I need to configure a ScatterLine Chart so I can control the marker used for each data point independently. I want to mark some points as "special". 

This KB article answers the following questions:
- How to mark specific data points in a ScatterLine Chart as special?
- How to customize separate markers in a Blazor ScatterLine Chart?
- How to use different markers for special data points in a ScatterLine Chart?

## Solution

The marker type is defined per series level, so it is not possible to set different markers for the different data points out of the box.

To mark specific data points as "special", follow these steps:

1. Use a Chart type with lines for the first series and provide it with all available data points (for example, [ScatterLine](slug://components/chart/types/scatterline)).

2. Use a Chart type without lines for the second series, so the lines do not mix (for example, [Scatter](slug://components/chart/types/scatter)).

3. In the second series data include only the points that you want to mark as special.

4. Increase the [ZIndex](/blazor-ui/api/Telerik.Blazor.Components.ChartSeries#Telerik_Blazor_Components_ChartSeries_ZIndex) of the second series to ensure its points are rendered on top of the first series.

5. Choose a different marker type for the second series from the options available in the [`ChartSeriesMarkersType`](/blazor-ui/api/Telerik.Blazor.ChartSeriesMarkersType) enum. Once available, you may consider using the [visual template](https://feedback.telerik.com/blazor/1582456-custom-rendering-for-the-chart-series-markers-visual-template) to completely customize the markers.

5. Optionally, set a different [color](/blazor-ui/api/Telerik.Blazor.Components.ChartSeries#Telerik_Blazor_Components_ChartSeries_Color) for the second series to distinguish the "special" points further.

>caption Customizing individual markers

````RAZOR
<TelerikChart>
    <ChartSeriesItems>

        <ChartSeries Type="ChartSeriesType.ScatterLine" ZIndex="1"
                     Data="@Series1Data"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
            <ChartSeriesMarkers Type="ChartSeriesMarkersType.Cross" />
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.Scatter" ZIndex="2"
                     Data="@Series2Data"
                     Color="blue"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
            <ChartSeriesMarkers Type="ChartSeriesMarkersType.Square" />
        </ChartSeries>

    </ChartSeriesItems>

    <ChartXAxes>

        <ChartXAxis Max="100">
            <ChartXAxisLabels Format="{0}m"></ChartXAxisLabels>
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Max="100">
            <ChartYAxisLabels Format="{0}%"></ChartYAxisLabels>
        </ChartYAxis>

    </ChartYAxes>
</TelerikChart>

@code {
    private List<ModelData> Series1Data = new List<ModelData>()
    {
        new ModelData() { X = 10, Y = 10 },
        new ModelData() { X = 15, Y = 20 },
        new ModelData() { X = 20, Y = 25 },
        new ModelData() { X = 32, Y = 40 },
        new ModelData() { X = 43, Y = 50 },
        new ModelData() { X = 55, Y = 60 },
        new ModelData() { X = 60, Y = 70 },
        new ModelData() { X = 70, Y = 80 },
        new ModelData() { X = 90, Y = 90 },
    };

    private List<ModelData> Series2Data = new List<ModelData>()
    {
        // These are the duplicated points that you want to change the symbol for.
        // They are also contained in the data of the first Chart series, so the line follows the correct curve according to these points' values
        new ModelData() { X = 15, Y = 20 },
        new ModelData() { X = 43, Y = 50 }
    };

    public class ModelData
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

}
````

## See Also

* [ScatterLine Chart Overview](slug://components/chart/types/scatterline)
* [Scatter Chart Overview](slug://components/chart/types/scatter)