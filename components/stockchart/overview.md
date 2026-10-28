---
title: Overview
page_title: Stock Chart Overview
description: Overview of the Stock Chart for Blazor.
slug: stockchart-overview
tags: telerik,blazor,stock,chart,overview
published: True
position: 0
components: ["stockchart"]
---

# Blazor Stock Chart Overview

The <a href = "https://www.telerik.com/blazor-ui/stock-chart" target="_blank">Blazor Stock Chart component</a> allows you to visualize the deviation of a financial unit over a period of time to the user in a meaningful way so they can draw conclusions. You can use a variety of chart types and control all aspects of the chart's appearance - from colors and fonts, to paddings, margins, tooltips and templates.

The Telerik Stock Chart provides a [Navigator](slug:stockchart-navigator) to widen or shorten the defined period of time and zoom on particular part of the chart; and a [crosshair](slug:stockchart-crosshairs) to see precise values in data-dense charts.

## Creating Stock Chart

1. Add the `TelerikStockChart` tag to your razor page.
2. Set the `DateField` parameter of the `TelerikStockChart` to the corresponding property of the model for the [`OHLC`](slug:stockchart-ohlc) and the [`Candlestick`](slug:stockchart-candlestick) StockChart types.
3. Provide [data](slug:stockchart-data-binding) to the series.
4. (optional) Enable the [navigator](slug:stockchart-navigator) by including its `StockChartNavigator` tag and adding a series that mirrors the main chart data to it.

>caption Basic configuration of a Stock Chart with common settings

<demo metaUrl="client/stockchart/overview/example-1/" height="520"></demo>

@[template](/_contentTemplates/stockchart/link-to-basics.md#configurable-nested-chart-settings)

## Stock Chart Size

To control the size of the StockChart, use the `Width` and the `Height` parameters.

You can also set the chart size in percentage values so it occupies its container when it renders. If the parent container size changes, you must call the chart's `Refresh()` C# method after the DOM has been redrawn and the new container dimensions are rendered. You can do this when you explicitly change container sizes (like in the example below), or from code that gets called by events like `window.resize`. You can find an example of making charts redraw on `window.resize` in the [Responsive Chart](https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart) sample.

>caption Change the 100% chart size dynamically to have a responsive chart

<demo metaUrl="client/stockchart/overview/example-2/" height="520"></demo>

## StockChart Parameters

The following table lists StockChart parameters, which are not discussed elsewhere in the component documentation.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Width`  | `string` | Controls the width of the StockChart. |
| `Height`  | `string` | Controls the height of the StockChart. |
| `Class`  | `string` | Renders a custom CSS class on the `<div class="k-stockchart">` element. |
| `Transitions` | `bool?` | Controls if the StockChart renders animations. |
| `RenderAs` | `RenderingMode?` <br /> (`SVG`) | Controls if the StockChart renders as `SVG` or `Canvas`. |

## Component Reference and Methods

To execute StockChart methods, obtain reference to the component instance via `@ref`.

| Method  | Description |
|---------|-------------|
| Refresh | You can use that method to programmatically re-render the component. |

## Next Steps

* [Bind Data to the StockChart](slug:stockchart-data-binding)
* [Explore the Navigator](slug:stockchart-navigator)
* [Learn more about the Crosshair](slug:stockchart-crosshairs)

## See Also

* [Live Demos: Stock Chart](https://demos.telerik.com/blazor-ui/stockchart/overview)
* [StockChart API Reference](slug:Telerik.Blazor.Components.TelerikStockChart)
