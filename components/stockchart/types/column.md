---
title: Column
page_title: Stock Chart - Column
description: Overview of the Column Stock Chart for Blazor.
slug: stockchart-column
tags: telerik,blazor,stock,chart,column
published: True
position: 0
components: ["stockchart"]
---

# Column Chart

A **Column** chart displays data as vertical bars whose heights vary according to their value. You can use a Column chart to show a comparison between several sets of data (for example, summaries of sales data for different time periods). Each series is automatically colored differently for easier reading.

>caption Column series in a stock chart.

@[template](/_contentTemplates/stockchart/link-to-basics.md#understand-basics-and-databinding-first)

To add a `Column` chart to a stock chart component:

1. add a `StockChartSeries` to the `StockChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Column`
3. provide a data collection to its `Data` property
4. set the `Field` and `CategoryField` properties to the corresponding fields in the model that carry the values.


>caption A column chart that shows product revenues

<demo metaUrl="client/stockchart/types/column/example-1/" height="520"></demo>

## Column Chart Specific Appearance Settings

### Labels

Each data item is denoted with a label. You can control and customize them through the `<StockChartCategoryAxisLabels />` and its children tags.

* `Visible` - hide all labels by setting this parameter to `false`.
* `Step` - renders every n-th label, where n is the value(double number) passed to the parameter.
* `Skip` - skips the first n labels, where n is the value(double number) passed to the parameter.

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color control the fill color of the area.

@[template](/_contentTemplates/stockchart/link-to-basics.md#color-field-column-ohlc-candlestick)

@[template](/_contentTemplates/stockchart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/stockchart/link-to-basics.md#configurable-nested-chart-settings)

