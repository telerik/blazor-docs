---
title: Navigator
page_title: Stock Chart - Navigator
description: Navigator in the Stock Chart for Blazor.
slug: stockchart-navigator
tags: telerik,blazor,stock,chart,navigator
published: true
position: 2
components: ["stockchart"]
---

# Navigator

The Navigator allows the user to zoom or scroll through the data over a certain period of time. The Navigator can be used will all types of stock charts.

In this article you will find:
* [Basics](#basics)
* [Navigator Settings](#navigator-settings)

## Basics

To enable data navigation you have to:

1. set up a [`<TelerikStockChart>`](slug:stockchart-overview)
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


>caption Data Navigation in a stock chart.

<demo metaUrl="client/stockchart/navigator/example-1/" height="520"></demo>

## Navigator Settings
 
The Navigator is defined closely to the way the charts are. As such you can use the nested tags settings to apply different customizations.

To programmatically set a time interval to the `Navigator` upon initialization use the `From` and `To` parameters of the `<StockChartNavigatorSelect>` and pass valid `DateTime` values according to your data.

To control whether the Navigator renders below or on top of the Stock Chart, set the `Position` parameter to a member of the `StockChartNavigatorPosition` enum.

You can control from which side (or both) the data navigation with shorten the time interval when the users cursor is located inside Navigator and is using the mouse wheel. To set it use the `Zoom` parameter of the `<StockChartNavigatorSelectMousewheel>`, child of `<StockChartNavigatorSelect>` to a member of the `ChartMousewheelZoom` enum:
 * `ChartMousewheelZoom.Left`
 * `ChartMousewheelZoom.Right`
 * `ChartMousewheelZoom.Both`

>caption Common settings for the Navigator

<demo metaUrl="client/stockchart/navigator/example-2/" height="520"></demo>

## See Also

* [Live Demos: Stock Chart](https://demos.telerik.com/blazor-ui/stockchart/overview)
