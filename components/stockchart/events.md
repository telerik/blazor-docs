---
title: Events
page_title: Stock Chart - Events
description: Events in the Stock Chart for Blazor.
slug: stockchart-events
tags: telerik,blazor,stock,chart,events,event
published: true
position: 32
components: ["stockchart"]
---

# Stock Chart Events

This article explains the available events for the Telerik Stock Chart for Blazor:

* [OnDragEnd](#ondragend)
* [OnDragStart](#ondragstart)
* [OnSeriesClick](#onseriesclick)
* [OnZoomEnd](#onzoomend)
* [OnZoomStart](#onzoomstart)


## OnDragEnd

The Stock Chart `OnDragEnd` event fires at the end of a drag (pan) gesture. The event argument is of type `ChartDragEndEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the end of the drag. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the new axis range. |

The `OnDragEnd` event fires after [`OnDragStart`](#ondragstart).

<demo metaUrl="client/stockchart/events/example-1/" height="520"></demo>

## OnDragStart

The Stock Chart `OnDragStart` event fires at the beginning of a drag (pan) gesture. The event argument is of type `ChartDragStartEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the start of the drag. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the current axis range. |

The `OnDragStart` event fires before [`OnDragEnd`](#ondragend).

<demo metaUrl="client/stockchart/events/example-2/" height="520"></demo>

## OnSeriesClick

The `OnSeriesClick` event fires as a response to the user click on a `<StockChartSeries>`.

Below you can find:

* [Event Arguments](#event-arguments)
* [Examples](#examples):
	* [Basic Click Handler](#basic-click-handler)
	* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)


### Event Arguments

The event handler receives a `ChartSeriesClickEventArgs` object which provides the following data:

* `DataItem` - provides the data model of the current series item. You need to cast it to the type from your data source, which needs to be serializable.
    * For [`OHLC`](slug:stockchart-ohlc) and [`Candlestick`](slug:stockchart-candlestick) chart types the `DataItem` will contain the information mapped to the `OpenField`, `CloseField`, `HighField` and `LowField` properties.
    * For [`Line`](slug:stockchart-line), [`Area`](slug:stockchart-area) and [`Column`](slug:stockchart-column) the `DataItem` will contain the information mapped to the `Field` properties.
    * The `DataItem` will contain an aggregated value for the date, so in order to get it you can use the `Category` and parse it to `DateTime`.

* `Category` - provides information on the category the data point is located in. Since the Stock Chart has a date X axis the `Category` should be cast to `DateTime`.

* `SeriesIndex` - provides the index of the `<StockChartSeries>` the data point belongs to.

* `Percentage` - for the Stock Chart the value will always be `0`.

* `SeriesName` - bound to the Name parameter of the `<StockChartSeries>` the data point belongs to.

* `SeriesColor` - shows the RGB color of the Series the data point belongs to.

* `CategoryIndex` - shows the index of the data point's x-axis category.

### Examples

These examples showcase the different applications of the `OnSeriesClick` event.

* [Basic Click Handler](#basic-click-handler)
* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)

### Basic Click Handler

<demo metaUrl="client/stockchart/events/example-3/" height="520"></demo>

### Get The Data Model For The Clicked Series

<demo metaUrl="client/stockchart/events/example-4/" height="520"></demo>

## OnZoomEnd

The Stock Chart `OnZoomEnd` event fires at the end of a zoom gesture. The event argument is of type `ChartZoomEndEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the end of the zoom. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the new axis range. |

The `OnZoomEnd` event fires after [`OnZoomStart`](#onzoomstart).

<demo metaUrl="client/stockchart/events/example-5/" height="520"></demo>

## OnZoomStart

The Stock Chart `OnZoomStart` event fires at the beginning of a zoom gesture. The event argument is of type `ChartZoomStartEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the start of the zoom. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the current axis range. |

The `OnZoomStart` event fires before [`OnZoomEnd`](#onzoomend).

<demo metaUrl="client/stockchart/events/example-6/" height="520"></demo>

## See Also

* [Live Demo: Stock Chart](https://demos.telerik.com/blazor-ui/stockchart/overview)