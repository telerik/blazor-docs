---
title: Events
page_title: Chart - Events
description: Events in the Charts for Blazor.
slug: chart-events
tags: telerik,blazor,chart,events,event
published: true
position: 33
components: ["charts"]
---

# Chart Events

This article describes the available events for the Telerik Chart for Blazor:

* [OnAxisLabelClick](#onaxislabelclick)
* [OnDragEnd](#ondragend)
* [OnDragStart](#ondragstart)
* [OnDrilldown](#ondrilldown)
* [OnLegendItemClick](#onlegenditemclick)
* [OnSeriesClick](#onseriesclick)
* [OnZoomEnd](#onzoomend)
* [OnZoomStart](#onzoomstart)

## OnAxisLabelClick

The `OnAxisLabelClick` event fires when the user clicks a label item on any of the Chart axes. The event argument is of type `ChartAxisLabelClickEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisName` | `string` | The value of the `Name` parameter of the Chart axis. Returns `null` if `Name` is not set. |
| `Index` | `int` | The label index on the clicked axis. |
| `Text` | `string` | The visible value of the label. It may be formatted. |
| `Value` | `object` | The underlying non-formatted value of the label. The `Value` can be: <ul><li>The same as the <code>Text</code> value when clicking on a category axis label.</li><li>A numeric value when clicking on a value axis label.</li><li>An ISO-8601 DateTime string when clicking on a date axis.</li></ul> |

>caption Using the Chart OnAxisLabelClick event

<demo metaUrl="client/chart/events/axis-label-click/" height="420"></demo>

## OnLegendItemClick

The `OnLegendItemClick` event fires when the user clicks on any item in the Chart legend. The event argument is of type `ChartLegendItemClickEventArgs` and exposes the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `PointIndex` | `int?` | The data point index in the series `Data`. Applies to single-series Charts only (Pie and Donut). |
| `SeriesIndex` | `int` | The series index in the `ChartSeriesItems` collection. |
| `Text` | `string` | The label of the clicked legend item. In multi-series Charts, the `Text` value matches the `ChartSeries` `Name`. In single-series Charts (Pie and Donut), the `Text` value matches the `CategoryField` value. |

>caption Using the Chart OnLegendItemClick event

<demo metaUrl="client/chart/events/legend-item-click/" height="480"></demo>

## OnDragEnd

The Chart `OnDragEnd` event fires at the end of a drag (pan) gesture. The event argument is of type `ChartDragEndEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the end of the drag. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the new axis range. |

The `OnDragEnd` event fires after [`OnDragStart`](#ondragstart).

<demo metaUrl="client/chart/events/drag-end/" height="440"></demo>

## OnDragStart

The Chart `OnDragStart` event fires at the beginning of a drag (pan) gesture. The event argument is of type `ChartDragStartEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the start of the drag. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the current axis range. |

The `OnDragStart` event fires before [`OnDragEnd`](#ondragend).

<demo metaUrl="client/chart/events/drag-start/" height="440"></demo>



## OnDrilldown

The `OnDrilldown` event is triggered when the [drill-down functionality executes](slug:chart-drilldown). The handler of this event accepts a `ChartDrilldownEventArgs` object as a parameter. You can access the name of the drilled down (clicked) series through the `SeriesName` property of the event arguments object.

## OnSeriesClick

The `OnSeriesClick` event fires as a response to the user click on a `<ChartSeries>`.

Below you can find:

* [Event Arguments](#event-arguments)
* Examples:
	* [Basic Click Handler](#basic-click-handler)
	* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)
	* [Load Data On Demand Based On Series Click](#load-data-on-demand-based-on-series-click)


### Event Arguments

The event handler receives a `ChartSeriesClickEventArgs` object which provides the following data:

* `DataItem` - provides the data model of the current series item. You need to cast it to the type from your datasource, which needs to be serializable.

  * If you are using a [Date Axis](slug:components/chart/date-axis), the `DataItem` will contain the only the aggregated value in the corresponding y-value field, because it is a collection of more than one items. See the `Category` below for details.


* `Category` - provides information on the category the data point is located in. You need to cast it to the type in your data source, for example `DateTime`, `string`, `int` or another type. The Category parameter is applicable to [Categorical Charts](slug:components/chart/databind#series-types).

  * When using a [Date Axis](slug:components/chart/date-axis), you can use it, together with the `BaseUnit` value of the axis, to filter the data source and obtain the actual data items from the data source in case you want to provide extra information about them.


* `Percentage` - applicable to [Donut](slug:components/chart/types/donut), [Pie](slug:components/chart/types/pie) and [Stacked 100%](slug:components/chart/stack#stack-100) Charts - the percentage value of the current data point from the whole.

* `SeriesIndex` - provides the index of the `<ChartSeries>` the data point belongs to.

* `SeriesName` - bound to the Name parameter of the `<ChartSeries>` the data point belongs to.

* `SeriesColor` - shows the RGB color of the Series the data point belongs to.

* `CategoryIndex` - shows the index of the data point's x-axis category.

### Examples

These examples showcase the different applications of the `OnSeriesClick` event.

* [Basic Click Handler](#basic-click-handler)
* [Get The Data Model For The Clicked Series](#get-the-data-model-for-the-clicked-series)
* [Load Data On Demand Based On Series Click](#load-data-on-demand-based-on-series-click)

### Basic Click Handler

<demo metaUrl="client/chart/events/on-series-click/basic-click-handler/" height="480"></demo>


### Get The Data Model For The Clicked Series

<demo metaUrl="client/chart/events/on-series-click/data-model/" height="460"></demo>



### Load Data On Demand Based On Series Click

<demo metaUrl="client/chart/events/on-series-click/load-data-on-demand/" height="600"></demo>



## OnZoomEnd

The Chart `OnZoomEnd` event fires at the end of a zoom gesture. The event argument is of type `ChartZoomEndEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the end of the zoom. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the new axis range. |

The `OnZoomEnd` event fires after [`OnZoomStart`](#onzoomstart).

<demo metaUrl="client/chart/events/zoom-end/" height="440"></demo>

## OnZoomStart

The Chart `OnZoomStart` event fires at the beginning of a zoom gesture. The event argument is of type `ChartZoomStartEventArgs` and exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `AxisRanges` | `Dictionary<string, ChartAxisRange>` | The visible range of each axis at the start of the zoom. The dictionary key is the axis name. Each `ChartAxisRange` value has `Min` and `Max` properties that reflect the current axis range. |

The `OnZoomStart` event fires before [`OnZoomEnd`](#onzoomend).

<demo metaUrl="client/chart/events/zoom-start/" height="440"></demo>

## See Also

* [Live Demo: Chart Events](https://demos.telerik.com/blazor-ui/chart/events)
* [Chart Pan](slug:components/chart/pan)
* [Chart Zoom](slug:components/chart/zoom)

