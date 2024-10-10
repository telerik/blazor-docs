---
title: Configuring Individual Markers in a ScatterLine Chart
description: Learn how to customize markers for specific data points in a ScatterLine chart to highlight them as special.
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

I need to configure a ScatterLine chart so I can control the marker used for each data point independently. I want to mark some points as "special". 

This KB article also answers the following questions:
- How to mark specific data points in a ScatterLine chart?
- How to customize separate markers in a Blazor ScatterLine chart?
- How to use different markers for special data points in a chart?

## Solution

The marker type is defined per series level, so it is not possible to set different markers for the different data points out of the box.

To achieve the desired result of marking specific data points as "special" in a ScatterLine chart, follow these steps:

1. Use a Chart type with lines for the first series and provide it with all available data points (for example, ScatterLine).

2. Use a Chart type without lines for the second series, so the lines do not mix (for example, Scatter).

3. In the second series data include only the points that you want to mark as special.

4. Increase the ZIndex of the second series to ensure its points are rendered on top of the first series.

5. Choose a different marker type for the second series from the options available in the `ChartSeriesMarkersType` enum. Once available, you may consider using the visual template to completely customize the markers. 

5. Optionally, set a different color for the second series to distinguish the "special" points further.

A basic example demonstrating this approach can be found [here](https://blazorrepl.telerik.com/wnkIcYuh2054iX5041).

## See Also

- [ScatterLine Chart Overview](https://docs.telerik.com/blazor-ui/components/chart/types/scatterline)
- [ChartSeriesMarkersType Enum](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.ChartSeriesMarkersType)
- [Custom Rendering for the Chart Series Markers - Visual Template](https://feedback.telerik.com/blazor/1582456-custom-rendering-for-the-chart-series-markers-visual-template)
- [ChartSeries ZIndex Property](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ChartSeries#collapsible-Telerik_Blazor_Components_ChartSeries_ZIndex)
