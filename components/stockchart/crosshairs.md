---
title: Crosshairs
page_title: Stock Chart - Crosshairs
description: Crosshairs for the Stock Chart for Blazor.
slug: stockchart-crosshairs
tags: telerik,blazor,stock,chart,crosshair,crosshairs
published: True
position: 10
components: ["stockchart"]
---

# Stock Chart Crosshairs

The Crosshairs are lines perpendicular to the axes that allow the user to see the exact value of a point at the current cursor position.

To enable the Crosshairs for the `Category` and/or the `Value` axis:

1. Inside the `<StockChartCategoryAxis>` include the the `<StockChartCategoryAxisCrosshair>`, for the `<StockChartValueAxis>`, include  `<StockChartValueAxisCrosshair>` tag.
1. Set its `Visible` parameter to `true`.
1. (optional) To enable tooltips for the crosshair add the `<StockChartCategoryAxisCrosshairTooltip>` for the `Category` axis and `StockChartValueAxisCrosshairTooltip` for the `Value` axis, and set its `Visible` parameter to `true`.

>caption Basic configuration of the Crosshairs of the Stock Chart.

<demo metaUrl="client/stockchart/crosshairs/example-1/" height="520"></demo>

## Crosshair Appearance Settings

You can control the appearance of the crosshair by setting the following properties of the `<StockChart*AxisName*AxisCrosshair>`:

* `Color` - set the `Color` property to a valid CSS color.
* `Opacity` - set the `Opacity` of the crosshair.
* `Width` - set the `Width` of the crosshair.

>caption Customize the appearance of the crosshairs

<demo metaUrl="client/stockchart/crosshairs/example-2/" height="520"></demo>

## Crosshair Tooltip Template

The crosshair tooltip provides a `<Template>` where you can control the rendering of the tooltip. The `context` gives information of the `FormattedValue` which maps to the default rendering of the tooltip and is formatted as a string. 

For the `Value` axis you can parse that value to the type in your model (`decimal`, `double`, etc.).

For the `Category` axis the `FormattedValue` represents the labels of the category axis.

>caption Use the Crosshair Tooltip template to customize the value

<demo metaUrl="client/stockchart/crosshairs/example-3/" height="520"></demo>

## See Also

* [Live Demos: Stock Chart](https://demos.telerik.com/blazor-ui/stockchart/overview)
