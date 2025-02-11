---
title: Apply gradient effect on Chart Series
description: How to apply gradient as color for Chart series?
type: how-to
page_title: Apply gradient effect on Chart series
slug: chart-series-gradient-color
position: 
tags: chart, series, gradient, color
ticketid: 1545645, 1591373
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
How can I apply a gradient color effect on the Telerik UI for Blazor Chart series?

## Solution

1. Declare an external [linear gradient with an `svg` tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient).
1. Set the [Color](slug:components/chart/types/area#color) parameter of the `ChartSeries` and refer the external gradient via its `id`.

>caption How to apply gradient effect on Area Chart.

````RAZOR

<svg xmlns="https://www.w3.org/2000/svg" version="1.1" width="0" height="0" style="visibility: hidden">
    <defs>
        <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3bafda; stop-opacity:0.95" />
            <stop offset="100%" style="stop-color:#3bafda; stop-opacity:0.05" />
        </linearGradient>
    </defs>
</svg>

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Area"
                        Color="url(#svg-gradient)"
                        Data="@ChartData">
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private List<object> ChartData = new List<object>() { 10, 2, 7, 5, 15 };
}
```

## See Also

* [Chart - Overview](slug:components/chart/overview)
