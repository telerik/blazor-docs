---
title: Data Binding
page_title: Chart - Data Binding
description: Data Binding the Chart for Blazor.
slug: components/chart/databind
tags: telerik,blazor,chart,databind,data,bind
published: True
position: 1
components: ["charts"]
---

# Chart Data Binding

This article explains the different ways to provide data to a Chart component, the properties related to data binding and their results.

There are two key ways to bind data to the chart series and axes:

* [Independent Series Binding](#independent-series-binding)
* [Attach Series Items to Their Categories](#attach-series-items-to-their-categories)

You can, of course, [mix these approaches](#mixed-data-source).

## Series Types

There are three main types of chart in terms of the data they require for their x-axis:

* **Categorical** - series like Area, Line, Column, Candlestick require a set of categories to match the data points values against. Those categories can be shared among different series, or unique. The categories are usually strings, but can also be [dates](slug:components/chart/date-axis). While there are X and Y axes, the x-axis is not a progression of numerical values - spacing between all x-axis items is equal and they show the text of the category.

* **Numerical** - series like Bubble, Scatter and Scatter Line represent two numerical values for the X and Y axes. They do not use categories on the x-axis and thus each data point is independent. This makes it easier to bind each series to a separate collection of data that can have different number of items in it, because plotting the data points is not dependent on string categories, but on numeric values that will be plotted and spaced according to their values.

* **Axis-free** - series like Pie and Donut do not have a x-axis at all. They use categories to build a list of items for each series and show those categories in the legend, as opposed to the series name that is usually shown by the other chart types.

With this in mind, the information below is applicable for all chart types, but the finer points are mostly relevant to categorical charts.

## Mixing Series

You can use only series with the same general layout in a single chart. You cannot mix numerical with categorical x-axes in the same chart. For example:

* Line, Area and Column series can be used together.
* Line, Area and Bar series can be used together. To rotate the layout of the chart according to the way Bar charts render, the bar series must be declared first. Otherwise, a column layout will be used.
* Bar and Column charts have a different layout and the rendering will depend on the first declared series.
* Scatter and ScatterLine series can be used together.
* Bubble charts cannot be used with other chart types because they have a very distinct layout due to the Size dimension.
* Pie charts will render only one series per chart and so only one can be used at a time.
* Donut charts can only have donut series in them (but can have multiple series).



## Independent Series Binding

In the simplest case, you provide two collections to the chart:

* an `object[]` for the `Categories` (items) on the x-axis
* a `List<object>` with decimal values for the series `Data`

With this approach, the items in each series are independent from the other series, and from the items on the x-axis where the corresponding categories are displayed. The series items are matched with the items on the x-axis by their index.

>caption Bind series independently of each other and of the category axis

<demo metaUrl="client/chart/data-bind/independent-series/" height="420"></demo>

## Attach Series Items to Their Categories

You can provide a `List<object>` to the `Data` property of a series that contains both its data points, and its x-axis categories. Then, set the series:

* `Field` property to the name of the field with its values
* `CategoryField` property to the name of the field for its x-axis items

With this, the items from the series will be matched to the items (categories) on the x-axis. Each series will add its own categories to the x-axis in order of appearance, and the series items will appear above them only.

>tip This approach lets you define the `CategoryField` for only one series and the rest of the series will match the categories by their index. In such a case, you can provide a single data collection to the chart that holds all data points and x-axis categories.

>caption Bind the entire chart to a single collection. 

<demo metaUrl="client/chart/data-bind/single-collection/" height="420"></demo>

>caption Unique categories are added independently.

<demo metaUrl="client/chart/data-bind/unique-categories/" height="420"></demo>

>tip You can define [multiple x-axes](slug:components/chart/multiple-axes) to avoid this behavior and have each series populate its own x-axis.

>caption If category values match, they will be combined

<demo metaUrl="client/chart/data-bind/matching-categories/" height="420"></demo>

## Mixed Data Source

You can choose where to take the categories and series data from, and combine both approaches to a solution that fits the existing data models and data retrieval logic that you have.

For example, you can take the data for some series from a complex model, and the categories from a different place. Or, you can take the categories from a complex model, but let some standalone data populate some series.

>caption Populate categories and one series from standalone data, other series from model

<demo metaUrl="client/chart/data-bind/mixed-source-standalone-series/" height="420"></demo>

>caption Populate categories from model, and some series from standalone data. Standalone categories are ignored.

<demo metaUrl="client/chart/data-bind/mixed-source-standalone-categories-ignored/" height="420"></demo>

## Numerical Charts

Numerical charts do not use categories and you do not need to consider how the x-axis is shared between the series and whether several data points will be in the same zone. You can provide a model for each series that contains the necessary information (x-value, y-value, and any other value that may be needed, such as size for bubble charts) and they will be plotted independently.

If one series has more data points than another, you will not get empty items on the x-axis, all data points are plotted according to general mathematical rules on the axes.

This means that it is often suitable to provide each series with its own collection of data, and these collections can often use the same model. You can still data bind the entire chart to a single collection, or use any of the approaches above.

>caption Series with a different number of items can be easily used in numerical charts

<demo metaUrl="client/chart/data-bind/numerical-separate-collections/" height="460"></demo>

>caption The same chart bound to a single model with fields for each series

<demo metaUrl="client/chart/data-bind/numerical-single-collection/" height="460"></demo>

## Chart Model with JsonProperty

The Telerik Chart serializes its data for client-side rendering. The component will honor any server-side serialization settings. For example, `JsonProperty` settings in the Chart model will change the field names from what is in the Chart markup, as the `nameof()` operator does not use these settings. See this KB article about [using a Chart Model with `Newtonsoft.Json.JsonProperty`](slug:chart-kb-newtonsoft-seialization-settings).

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
