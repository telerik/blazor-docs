---
title: Area
page_title: Stock Chart - Area
description: Overview of the Area Stock Chart for Blazor.
slug: stockchart-area
tags: telerik,blazor,stock,chart,area
published: True
position: 0
components: ["stockchart"]
---

# Area Chart

An **Area** chart shows the data as continuous lines that pass through points defined by their items' values. The portion of the graph beneath the lines is filled with a particular color for every series. Colors in an Area chart can be useful for emphasizing changes in values from several sets of similar data. A colored background will clearly visualize the differences.

An Area chart emphasizes the volume of money, data or any other unit that the given series has encompassed. When backgrounds are semi-transparent, it lets the user clearly see where different sets of data overlap.

>caption Area series in a stock chart. Results from the first code snippet below.

@[template](/_contentTemplates/stockchart/link-to-basics.md#understand-basics-and-databinding-first)

To add a `Area` chart to a stock chart component:

1. add a `StockChartSeries` to the `StockChartSeriesItems` collection
2. set its `Type` property to `ChartSeriesType.Area`
3. provide a data collection to its `Data` property
4. set the `Field` and `CategoryField` properties to the corresponding fields in the model that carry the values.


>caption An area chart that shows product revenues

<demo metaUrl="client/stockchart/types/area/example-1/" height="520"></demo>

## Area Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The `Color` controls the fill color of the area.


>caption Change the rendering Step and Color of the Category Axis Labels

<demo metaUrl="client/stockchart/types/area/example-2/" height="520"></demo>

