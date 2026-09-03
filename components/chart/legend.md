---
title: Legend
page_title: Chart Legend
description: Discover the capabilities of the Chart Legend in Telerik UI for Blazor. Learn how to show it, and explore the customization options.
slug: chart-legend
tags: telerik,blazor,chart,legend,customizations
published: True
position: 100
components: ["charts"]
---

# Telerik Chart Legend

The Telerik Chart for Blazor can show a visual guide with details about the series or elements in the Chart. This article explores how to add a Chart legend, identify its building blocks, and customize the legend appearance.

## Adding a Legend

1. Add the `<ChartLegend>` child tag and set the `Visible` parameter to `true`
1. Add the `Name` parameter to all Chart series that must be visible in the legend.

## Chart Legend Customization

You can customize the Chart legend by adding nested (child) tags to the `<ChartLegend>` and use their parameters for fine tuning. 

The structure of the nested tags is `<ChartLegend*Specifics*>`, where the specifics can be:

* `Title`
* `Item`
* `Border`

>note Use the IntelliSense to explore the nested tags.

## Legend Settings in the Chart Series

You can customize individual items in the legend for a specific Chart series by adding the `<ChartSeriesLegendItem>` (child tag of `<ChartSeries>`) and its nested tag settings and parameters.

The structure of the nested tags is `<ChartSeriesLegend*Specifics*>`, where the specifics can be:

* `Markers`
* `Highlight`
* and others

>note Use the IntelliSense to explore the nested tags.

## Example

Customize the legend items by using nested tag settings.

<demo metaUrl="client/chart/legend/customization/" height="420"></demo>

## See Also

* [Live Chart Legend Customization Demo](https://demos.telerik.com/blazor-ui/chart/legend-customization)
