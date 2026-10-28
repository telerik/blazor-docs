---
title: Line
page_title: Stock Chart - Line
description: Overview of the Line Stock Chart for Blazor.
slug: stockchart-line
tags: telerik,blazor,stock,chart,line
published: True
position: 0
components: ["stockchart"]
---

# Line Chart

A **Line** chart displays data as continuous lines that pass through points defined by the values of their items. It is useful for rendering a trend over time and comparing several sets of similar data.

>caption Line series in a stock chart.

@[template](/_contentTemplates/stockchart/link-to-basics.md#understand-basics-and-databinding-first)

To add a `Line` chart to a stock chart component:

1. add a `StockChartSeries` to the `StockChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Line`
3. provide a data collection to its `Data` property
4. set the `Field` and `CategoryField` properties to the corresponding fields in the model that carry the values.


>caption A line chart that shows product revenues

<demo metaUrl="client/stockchart/types/line/example-1/" height="520"></demo>

## Line Chart Specific Appearance Settings

@[template](/_contentTemplates/stockchart/link-to-basics.md#configurable-nested-chart-settings)


