---
title: Date Axis
page_title: Chart - Date Axis
description: Use Date Axis in the Chart for Blazor.
slug: components/chart/date-axis
tags: telerik,blazor,chart,date,axis
published: true
position: 30
components: ["charts"]
---

# Date Axis

This article demonstrates how to use `DateTime` values for the x-axis of the chart.

You can find the following sections:
* [Categorical charts](#categorical-charts)
* [Numerical charts](#numerical-charts)

## Categorical charts

Categorical charts (such as [Column](slug:components/chart/types/column), [Line](slug:components/chart/types/line), [Area](slug:components/chart/types/area)) support displaying dates on the x-axis. A date axis aggregates the data points that fall within its scope to a single data point that gets rendered.

To enable a date axis:

1. Set the `Type` property of the `ChartCategoryAxis` to `ChartCategoryAxisType.Date`.
1. Provide categories of type `DateTime` to it (see [data binding a chart](slug:components/chart/databind)).

You can control the aggregation level through the `BaseUnit` property of the axis. It takes a member of the `Telerik.Blazor.ChartCategoryAxisBaseUnit` class.

You can set the aggregation function through the `Aggregate` property of the series. It takes a member of the `Telerik.Blazor.ChartSeriesAggregate` class.

>caption Date Axis with month grouping and different aggregates on the series

<demo metaUrl="client/chart/date-axis/month-grouping/" height="420"></demo>

### Advanced Features

#### Automatic Fitting

If you set `BaseUnit="ChartCategoryAxisBaseUnit.Fit"`, the chart will choose such a base unit, so that the number of categories on the axis will be less than or equal to the value of the `MaxDateGroups` property (if it is set).

Using this feature will ignore the `BaseUnitStep`.

If you do not set the `BaseUnit`, its value is determined by the smallest interval between categories. In the example above, it is four days, which is less than a week, but more than a day, so the base unit will be `Days`.

>tip Avoid large intervals with short base units. This would result in a huge amount of categories and this can result in performance degradation, or even errors/crashes.

#### Base Unit Step

If there are many categories, you can choose to render every n-th of them by setting the `BaseUnitStep` property.

#### Week Start Day

When the `BaseUnit` is set to weeks, you can control the start day of the week through the `WeekStartDay` property. The `0` value is `Sunday`, `1` is `Monday` and so on.

#### Labels Format

Each base unit has a default format for the date it displays. If you want to change it, use the `Format` property under the `ChartCategoryAxisLabels` tag of the category axis.

>caption Steps set to weeks, changed weeks start day to Monday and non-default label format

<demo metaUrl="client/chart/date-axis/week-steps-format/" height="420"></demo>

## Numerical charts

The numerical [Scatter](slug:components/chart/types/scatter) and [ScatterLine](slug:components/chart/types/scatterline) charts also support `DateTime` values for the x-axis. To enable such scenario:

1. Set the `Type` property of the `ChartXAxis` to "date".
1. Provide a field of type `DateTime` to the `XField` parameter of the `ChartSeries` (see [data binding a chart](slug:components/chart/databind)).

You can control the aggregation level through the `BaseUnit` property of the axis. It takes a string and the available options are "milliseconds", "seconds", "minutes", "hours", "days", "weeks", "months" or "years".

>note The `BaseUnit` and `Type` properties on the x-axis for numeric charts will eventually become an `enum` at some point. As it can lead to changes in the chart settings markup, in order to keep in track with this potential API update, you can follow the enhancement request in the Telerik UI for Blazor public feedback portal - [scatter chart with date axis](https://feedback.telerik.com/blazor/1441432-scatter-chart-with-date-axis).

### Advanced Features

#### Labels Format

Each base unit has a default format for the date it displays. If you want to change it, use the `Format` property of the `ChartXAxisLabels` tag under the `ChartXAxis` tag.


### Considerations

If the data provided to the chart uses the complete `DateTime` format, this will affect the rendering of the labels and markers as the chart will take into account the complete `DateTime` value. This should be considered when specifying the chart settings in order to achieve the desired result.

For example, if the chosen `BaseUnit` is `days`, the X labels mark the beginning of the day and the data records also specify time values, their markers will be rendered at the corresponding to their time value point and not exactly on the label for this day. This specific behavior when working with `DateTime` values could be observed in the following examples:

>caption ScatterLine chart with day and time values. Markers are rendered after the day labels to also respect the time values.

<demo metaUrl="client/chart/date-axis/scatterline-day-time/" height="460"></demo>
<br/>

>caption ScatterLine chart with only days values. Markers are rendered exactly on the day labels. 

<demo metaUrl="client/chart/date-axis/scatterline-day-only/" height="460"></demo>

## See Also

* [Data Binding a Chart](slug:components/chart/databind)
* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
