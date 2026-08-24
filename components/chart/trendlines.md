---
title: Trendlines
page_title: Chart - Trendlines
description: How to define Trendlines in the Charts for Blazor to track trends. Explore the two types of trendlines - Linear Trendline and Moving Average Trendline.
slug: chart-trendlines
tags: telerik,blazor,chart,trendlines
published: true
position: 25
components: ["charts"]
---

# Trendlines

Trendlines are dynamic indicators that automatically reveal the overarching trends within your series data. These trendlines are defined as a special type of series linked to the main series by name.

Trendline series use the data from the main series. When the main series employs aggregates, which is common for date series, the trendlines align with the aggregated data. For instance, when using a `sum` aggregate, the trendline illustrates the trends for the sum within each category.

## Trendline Types

The Chart supports the following fundamental types of trendlines:

* [Linear Trendline](#linear-trendline)
* [Moving Average Trendline](#moving-average-trendline)
* [Exponential Trendline](#exponential-trendline)
* [Logarithmic Trendline](#logarithmic-trendline)
* [Power Trendline](#power-trendline)
* [Polynomial Trendline](#polynomial-trendline)

## Supported Series Types

Trendlines are supported for the following chart types:

 * Area
 * Bar
 * BoxPlot
 * Candlestick
 * Column
 * Line
 * OHLC
 * RangeArea
 * RangeColumn
 * Scatter
 * ScatterLine

## Chart Trendlines Parameters

The following table lists Chart Trendlines parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| `ChartSeriesMarkers.Visible` | `bool` | The visibility of the trendline markers. |
| `ChartSeries.For` | `string` | The name of the parent series of the trendline. |
| `ChartSeriesTrendline` | `object` | The trendline configuration options. |
| `ChartSeriesTrendlineForecast` | `object` | The trendline forecast settings. By default, the trendline does not display a forecast. |
| `ChartSeriesTrendlineForecast.Before` | `int` | The number of intervals to extend the trendline before the first data point. |
| `ChartSeriesTrendlineForecast.After` | `int` | The number of intervals to extend the trendline after the last data point. |
| `ChartSeriesTrendline.Period` | `int` | The number of intervals to take when calculating averages. The value must be an integer greater than `2`. |
| `Type` | `ChartSeriesType` enum | The type of the series. |

### Linear Trendline

Use the Linear Trendline to visualize the rise or decline of a specific quantity over time.

>caption Linear trendline in scatter line Chart series

<demo metaUrl="client/chart/trendlines/linear/" height="460"></demo>

### Moving Average Trendline

Use the Moving Average Trendline to smooth out data fluctuations. This trendline computes and visualizes an average of all data points over a specified period. By default, this period is set to two chart intervals.

>caption Line Chart with a moving average trendline

<demo metaUrl="client/chart/trendlines/moving-average/" height="460"></demo>

### Exponential Trendline

Use the Exponential Trendline to visualize data with rapidly accelerating growth or decay over time. This trendline helps you to emphasize trends that follow an exponential pattern, and it requires positive `Y` values.

>caption Chart with an Exponential Trendline

<demo metaUrl="client/chart/trendlines/exponential/" height="460"></demo>

### Logarithmic Trendline

Use the Logarithmic Trendline to visualize data with rapid initial growth that slows over time or vice versa. This trendline emphasizes trends with a logarithmic pattern, and it requires positive `X` values.

>caption Chart with a Logarithmic Trendline

<demo metaUrl="client/chart/trendlines/logarithmic/" height="460"></demo>

### Power Trendline

Use the Power Trendline to visualize data that follows a power-law relationship, indicating that one variable's change is proportional to a power of another variable. This trendline helps you to highlight trends where the rate of change isn't constant. It requires positive `Y` and `X` values.

>caption Chart with a Power Trendline

<demo metaUrl="client/chart/trendlines/power/" height="460"></demo>

### Polynomial Trendline

Use the Polynomial Trendline to visualize complex data patterns not fitting the other trendlines. This trendline fits a polynomial equation to the data points, allowing for a more flexible representation of trends with multiple turning points.

>caption Chart with a Polynomial Trendline

<demo metaUrl="client/chart/trendlines/polynomial/" height="460"></demo>

## See Also

* [Live Demos: Trendline Chart](https://demos.telerik.com/blazor-ui/chart/trendline-chart)