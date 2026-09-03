---
title: Stacked Series
page_title: Chart - Stacked Series
description: Stack or group series the Chart for Blazor.
slug: components/chart/stack
tags: telerik,blazor,chart,stack,group
published: True
position: 20
components: ["charts"]
---

# Stacked Chart Series

You can stack different series in one data category on top of each other to showcase cumulative effects.

This article explains how to configure the available stack options:

* [Simple Stack](#simple-stack)
* [Named Stack](#named-stack)
* [Stack 100%](#stack-100)

Series stacking is available for  "bar", "column", "line", "area" types of series, and all series in the same stack must be of the same type.

Stack settings of the first series are inherited as a default value by the rest of the series, in case they are not overridden.

Named stacks are supported for "bar" and "column" charts. All line-type charts ("line" and "area") always stack together because there is no visual way to denote separate groups.

## Simple Stack

To stack all series together, set the `Enabled` property to `true` in the `ChartSeriesStack` tag of the first series in your chart.

>caption All series stacked together

<demo metaUrl="client/chart/stacked-series/simple-stack/" height="420"></demo>

## Named Stack

You can choose which series to cluster together through the `Group` property of the `ChartSeriesStack` tag. If you set it to one series, it automatically enables stacking, so if you want to put one or more series in a separate group, you must provide a group name for each series.

>caption Stack certain series together in a separate group

<demo metaUrl="client/chart/stacked-series/named-stack/" height="420"></demo>

## Stack 100%

You can also have each stack fill up the entire chart - its total value will be 100%. This is often useful when contribution of values within stacks is more meaningful than the amounts themselves.

To use a 100% stacks, set the `Type` property of the first stacked series to `Telerik.Blazor.ChartSeriesStackType.Stack100`.

You can use separate groups, or you can stack all series together with just the `Enabled` property.

>caption Stack 100% with groups

<demo metaUrl="client/chart/stacked-series/stack-100/" height="420"></demo>

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
* [Render total value and group name for stacked columns](slug:chart-kb-stacked-series-sum-label)
