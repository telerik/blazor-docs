---
title: OHLC
page_title: Stock Chart - OHLC
description: Overview of the OHLC Stock Chart for Blazor.
slug: stockchart-ohlc
tags: telerik,blazor,stock,chart,ohlc
published: True
position: 0
components: ["stockchart"]
---

# OHLC Stock Chart

The **OHLC** (open-high-low-close) chart is typically used to illustrate movements in the price of a financial instrument over time. Each vertical line on the chart shows the price range (the highest and lowest prices) over a period of time.

>caption OHLC series in a stock chart.

@[template](/_contentTemplates/stockchart/link-to-basics.md#understand-basics-and-databinding-first)

To add a `OHLC` chart to a stock chart component:

1. set the `DateField` property of the `<TelerikStockChart>` to the corresponding field in the model that carry the value.
1. add a `<StockChartSeries>` to the `<StockChartSeriesItems>` collection.
1. set its `Type` property to `StockChartSeriesType.OHLC`.
1. provide a data model collection to its `Data` property.
1. set the `OpenField`, `ClosedField`, `HighField` and `LowField` properties to the corresponding fields in the model that carry the values.

>caption An OHLC chart that shows the deviation of stocks

<demo metaUrl="client/stockchart/types/ohlc/example-1/" height="520"></demo>

## OHLC Chart Specific Appearance Settings

@[template](/_contentTemplates/stockchart/link-to-basics.md#color-field-column-ohlc-candlestick)

@[template](/_contentTemplates/stockchart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)


