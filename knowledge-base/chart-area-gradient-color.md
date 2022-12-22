---
title: Apply gradient effect on Area Chart
description: How to apply gradient as color for Area Chart series?
type: how-to
page_title: Apply gradient effect on Area Chart
slug: chart-area-gradient-color
position: 
tags: chart, area, gradient, color
ticketid: 1591373
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Chart for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
How can I apply a gradient color effect on the Telerik UI for Blazor Area Chart?

## Solution

1. Declare an external gradient.
1. Use the [Color](https://docs.telerik.com/blazor-ui/components/chart/types/area#color) configuration of the Chart series to set the external gradient. 

>caption How to apply gradient effect on Area Chart.

````CSHTML
@*Gradient*@
<div style="height: 0">
    <svg xmlns="https://www.w3.org/2000/svg" version="1.1" width="0" height="0" style="visibility: hidden">
        <defs>
            <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#3bafda; stop-opacity:0.95" />
                <stop offset="100%" style="stop-color:#3bafda; stop-opacity:0.05" />
            </linearGradient>
        </defs>
    </svg>
</div>


@*Chart*@
<TelerikChart Class="chart">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Area"
                        Color="url(#svg-gradient)"
                        Data="@SimpleData">
        </ChartSeries>
    </ChartSeriesItems>
    <ChartValueAxes>
        <ChartValueAxis Color="#ffffff00">
            <ChartValueAxisLabels Color="#A4A4A4"></ChartValueAxisLabels>
        </ChartValueAxis>
    </ChartValueAxes>
    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@XAxisItems">
            <ChartCategoryAxisLabels Color="#A4A4A4"></ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>
</TelerikChart>

@code {

    public List<object> SimpleData = new List<object>() { 10, 2, 7, 5, 15 };
    public string[] XAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4", "Q5" };
}
```

## See Also

* [Area Chart]({%slug components/chart/types/area%})
