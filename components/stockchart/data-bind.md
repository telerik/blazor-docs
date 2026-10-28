---
title: Data Binding
page_title: Stock Chart - Data Binding
description: Data Binding the Stock Chart for Blazor.
slug: stockchart-data-binding
tags: telerik,blazor,stock,chart,databind,data,bind
published: True
position: 1
components: ["stockchart"]
---

# Stock Chart Data Binding

This article explains how to provide data to a Stock Chart component, the properties related to data binding and their results.

In this article:

* [Attach Series Items to Their Categories](#attach-series-items-to-their-categories)
* [Examples](#examples)

## Attach Series Items to Their Categories

You can provide a `List<object>` to the `Data` property of a series that contains both its data points, and its x-axis categories. Then, set the following parameters based on the type of the chart:

* `Column`, `Area` and `Line` - `Field` and `CategoryField` to the corresponding fields in the model that carry the values
* `OHLC` and `Candlestick` - `OpenField`, `ClosedField`, `HighField` and `LowField` properties to the corresponding fields in the model that carry the values. Set the `DateField` parameter of the `<TelerikStockChart>` to the `DateTime` property from the model that will be used for the x-axis.

With this, the items from the series will be matched to the items (categories) on the x-axis. Each series will add its own categories to the x-axis in order of appearance, and the series items will appear above them only.

>tip This approach lets you define the `CategoryField` for only one series and the rest of the series will match the categories by their index. In such a case, you can provide a single data collection to the chart that holds all data points and x-axis categories.

## Examples

>caption Bind a Candlestick Stock Chart to a model

<demo metaUrl="client/stockchart/data-bind/example-1/" height="520"></demo>

>caption Bind a Column Stock Chart to a model

<demo metaUrl="client/stockchart/data-bind/example-2/" height="520"></demo>

## See Also

* [Live Demos: Stock Chart](https://demos.telerik.com/blazor-ui/stockchart/overview)
