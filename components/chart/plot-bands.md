---
title: Plot Bands
page_title: Chart Plot Bands
description: Plot Bands in the Charts for Blazor.
slug: chart-plot-bands
tags: telerik,blazor,chart,plot,bands,plotbands
published: true
position: 45
components: ["charts"]
---

# Plot Bands

Plot Bands are colored ranges in the Telerik UI for Blazor Chart. Their purpose is to highlight areas of the chart by changing the background in a predefined axis range.

Plot bands are supported for [categorical and numerical charts](slug:components/chart/databind#series-types).

## Creating Plot Bands

1. Add `PlotBand` instances inside the `PlotBands` collection of a Chart axis.
1. Provide a valid CSS color to the `Color` parameter.
1. (Optional) Set the `Opacity` parameter.
1. [Set the `From` and `To` plot band parameters](#setting-from-and-to), according to the instructions below.

## Setting From and To

There are two different ways to configure the `From` and `To` values. The correct approach depends on:

* Whether the Chart is numeric or categorical.
* Whether the plot band is for the vertical or horizontal axis.

>caption How to set PlotBand From and To

<table>
    <colgroup>
        <col style="width: 10em" />
        <col style="width: 8em" />
        <col />
    </colgroup>
    <thead>
        <tr>
            <th>Axis Tag</th>
            <th>Axis Description</th>
            <th>Valid PlotBand <code>From</code> and <code>To</code> Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>ChartYAxis</code></td>
            <td>vertical numeric axis</td>
            <td rowspan="3">Any <strong>numeric value</strong> that makes sense for the series data, e.g. within the axis <code>Min</code> and <code>Max</code> range. The plot band will display <em>between the specified values</em>.</td>
        </tr>
        <tr>
            <td><code>ChartXAxis</code></td>
            <td>horizontal numeric axis</td>
        </tr>
        <tr>
            <td><code>ChartValueAxis</code></td>
            <td>vertical category axis</td>
        </tr>
        <tr>
            <td><code>ChartCategoryAxis</code> <br> including <a href="/blazor-ui/documentation/components/chart/date-axis">date axis</a></td>
            <td>horizontal category axis</td>
            <td><strong>Zero-based index</strong>, which corresponds to a major vertical grid line that intersects the axis. The plot band will display <em>between the specified grid lines</em>.</td>
        </tr>
    </tbody>
</table>

## Categorical Chart PlotBands

<demo metaUrl="client/chart/plot-bands/categorical/" height="420"></demo>

## Numerical Chart PlotBands

<demo metaUrl="client/chart/plot-bands/numerical/" height="460"></demo>

## See Also

* [Live Demo: Chart Plot Bands](https://demos.telerik.com/blazor-ui/chart/plot-bands)
