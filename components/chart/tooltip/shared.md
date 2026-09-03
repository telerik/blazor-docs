---
title: Shared Tooltip
page_title: Chart - Shared Tooltip
description: Shared Tooltip for the Blazor Chart.
slug: chart-tooltip-shared
tags: telerik,blazor,chart,tooltip,shared,tooltips
published: True
position: 2
components: ["charts"]
---

# Shared Tooltip for Telerik Blazor Chart

The Telerik Chart allows you to show a unified tooltip for all categories in [Categorical](slug:components/chart/databind#series-types) Charts.

In this article:
* [Basics](#basics)
* [Customization](#customization)
 * [Parameter Settings](#parameter-settings)
 * [Shared Template](#shared-template)


## Basics

The shared tooltip provides summarized information of all data points from the hovered category (applies for [Categorical Charts](slug:components/chart/databind#series-types)). This tooltip will take precedence over tooltip settings defined for a specific series.

To enable the shared tooltip:

1. Inside the `<TelerikChart>` tag, add the `<ChartTooltip>` tag.
1. Set its `Visible` parameter to `true`.
1. Set its `Shared` parameter to `true`.

>caption Basic configuration of a Chart with Shared Tooltip

<demo metaUrl="client/chart/tooltip/shared/basic/" height="420"></demo>

## Customization

There are two types of customizations you can do for the tooltips:

* [Parameter Settings](#parameter-settings) - lets you alter cosmetic settings such as borders, colors and padding through simple parameters
* [Shared Template](#shared-template) - lets you control the entire content

### Parameter Settings
You can customize the rendering of the `Shared` tooltip by using:

@[template](/_contentTemplates/chart/chart-tooltip-context-templates.md#shared-tooltip-parameter-settings)


### Shared Template

The `SharedTemplate` allows you to control the rendering of the shared tooltip.

In the template you can:

* Use business logic and render HTML

* Use the `context` parameter that provides information about the current category and all data points in it.

The `context` contains the following information:

* `Category` - renders the name of the Category.

* `Points` - a collection of data for each series data point in this category.


Each `Point` contains the following data:

@[template](/_contentTemplates/chart/chart-tooltip-context-templates.md#context-parameter-information)


>caption Usage of the SharedTemplate

<demo metaUrl="client/chart/tooltip/shared/template/" height="420"></demo>

## See also

* [Chart Overview](slug:components/chart/overview)
* [Chart Tooltip Overview](slug:chart-tooltip-overview)
