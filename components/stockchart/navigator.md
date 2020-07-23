---
title: Navigator
page_title: Stock Chart - Navigator
description: Navigator in the Stock Chart for Blazor.
slug: stockchart-navigator
tags: telerik,blazor,stock,chart,navigator
published: true
position: 32
---

# Navigator

The Navigator allows the user to zoom or scroll through the data over a certain period of time. The Navigator can be used will all types of stock charts.

To enable data navigation you have to:

1. set up a [`<TelerikStockChart>`]({%slug stockchart-overview%})
1. add a `<StockChartNavigator>` inside the main `<TelerikStockChart>`
1. add a `<StockChartNavigatorSeries>` to the `<StockChartNavigatorSeriesItems>` collection.
1. set its `Type` property to one of the following:
* `StockChartSeriesType.Column`
* `StockChartSeriesType.Area`
* `StockChartSeriesType.Line`
* `StockChartSeriesType.Candlestick`
* `StockChartSeriesType.OHCL`
5. provide a data model collection to its `Data` property. The data source should be the same as the one used for the `<StockChartSeries>`.
1. set the following properties depending on what `Type` the Navigator is:
* `Column`, `Area` and `Line` - `Field` and `CategoryField` to the corresponding fields in the model that carry the values
* `OHLC` and `Candlestick` - `OpenField`, `ClosedField`, `HighField` and `LowField` properties to the corresponding fields in the model that carry the values.

>note The Navigator cannot be used without an adjacent `<TelerikStockChart>`.
 



## See Also

* [Live Demo: Stock Chart Overview](https://demos.telerik.com/blazor-ui/todo)
