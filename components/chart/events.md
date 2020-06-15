---
title: Events
page_title: Chart for Blazor | Events
description: Events in the Charts for Blazor
slug: chart-events
tags: telerik,blazor,chart,events,event
published: true
position: 32
---

# Chart Events

This article explains the available events for the Telerik Chart for Blazor.


## OnSeriesClick

The `OnSeriesClick` event fires as a response to the user click on a `<ChartSeries>`.

It exposes a `ChartSeriesClickEventArgs` object which provides the following data:

* `DataItem` - the data item for the clicked series. You may need to cast it to its type.
 * For aggregated fields it will contain the aggregated value for the corresponding series only. The other fields will be equal to the default values set in the model class.
* `SeriesIndex` - the index of the clicked `<ChartSeries>`.
* `SeriesName` - bound to the `Name` parameter of the clicked `<ChartSeries>`.

### Examples

These examples showcase the different applications of the `OnSeriesClick` event.

* [Basic Configuration](#basic-configuration)
* [Load Additional Data Based on User Click](#load-additional-data-based-on-user-click)

#### Basic Configuration

````CSHTML

//This example will show how to extract the data from a Categorical Chart without aggregates.

````

#### Load Additional Data Based on User Click

````CSHTML

//This example will show to get additional data for the chart on click and draw another chart based on that data. That could be also done as a demo with the SalesOrderHeader and SalesDetails (might be wrong on the exact name) data as they are linked. E.g. a pie chart draws a categorical chart. On the series click a service will be called with suitable filter. This might also be suitable for the blazor-ui repo so waiting for your feedback.

//A simpler example of the beforesaid can be used here too.

````
