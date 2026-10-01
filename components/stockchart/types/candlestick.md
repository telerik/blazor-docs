---
title: Candlestick
page_title: Stock Chart - Candlestick
description: Overview of the Candlestick Stock Chart for Blazor.
slug: stockchart-candlestick
tags: telerik,blazor,stock,chart,candlestick
published: True
position: 0
components: ["stockchart"]
---

# Candlestick Stock Chart

A **Candlestick** chart shows data for the movement of the price of a financial unit. It consists of a bar (the candle), representing the open and close values, and vertical lines, the candlesticks, which illustrate the highest and lowest values.

>caption Candlestick series in a stock chart.

@[template](/_contentTemplates/stockchart/link-to-basics.md#understand-basics-and-databinding-first)

To add a `Candlestick` chart to a stock chart component::

1. set the `DateField` property of the `TelerikStockChart` to the corresponding field in the model that carry the value.
1. add a `StockChartSeries` to the `StockChartSeriesItems` collection.
1. set its `Type` property to `StockChartSeriesType.Candlestick`.
1. provide a data model collection to its `Data` property.
1. set the `OpenField`, `ClosedField`, `HighField` and `LowField` properties to the corresponding fields in the model that carry the values.


>caption Candlestick chart that shows the deviation of stock prices.

<demo metaUrl="client/stockchart/types/candlestick/example-1/" height="520"></demo>


## Candlestick Specific Appearance Settings

### DownColor

Set the color - a valid CSS, RGB, RGBA color - of the series when the `OpenField` is greater than the `CloseField` by setting the `DownColor` property of the `StockChartSeries`. This can be passed through the data model and bound to the `DownColorField`. 

@[template](/_contentTemplates/stockchart/link-to-basics.md#color-field-column-ohlc-candlestick)

@[template](/_contentTemplates/stockchart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/stockchart/link-to-basics.md#configurable-nested-chart-settings)


