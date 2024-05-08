---
title: Overview
page_title: Sankey Diagram Overview
description: Overview of the Sankey Diagram for Blazor.
slug: sankey-diagram-overview
tags: telerik,blazor,sankey,diagram,chart,overview
published: True
position: 0
---

# Blazor Sankey Diagram Overview

The <a href = "https://www.telerik.com/blazor-ui/stock-chart" target="_blank">Blazor Sankey Diagram component</a> allows you to visualize ...

## Creating Sankey Diagram

1. First step

## Elements

...

## DataBinding

...

## Tooltip

## Sankey Diagram Size

To control the size of the Sankey Diagram, use the `Width` and the `Height` parameters.

You can also set the chart size in percentage values so it occupies its container when it renders. If the parent container size changes, you must call the chart's `Refresh()` C# method after the DOM has been redrawn and the new container dimensions are rendered. You can do this when you explicitly change container sizes (like in the example below), or from code that gets called by events like `window.resize`. You can find an example of making charts redraw on `window.resize` in the [Responsive Chart](https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart) sample.


## Sankey Diagram Parameters

The following table lists Sankey Diagram parameters, which are not discussed elsewhere in the component documentation.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Width`  | `string` | Controls the width of the Sankey Diagram. |
| `Height`  | `string` | Controls the height of the Sankey Diagram. |
| `Class`  | `string` | Renders a custom CSS class on the `<div class="k-Sankey Diagram">` element. |
| `Transitions` | `bool?` | Controls if the Sankey Diagram renders animations. |
| `RenderAs` | `RenderingMode?` <br /> (`SVG`) | Controls if the Sankey Diagram renders as `SVG` or `Canvas`. |

## Component Reference and Methods

To execute Sankey Diagram methods, obtain reference to the component instance via `@ref`.

| Method  | Description |
|---------|-------------|
| Refresh | You can use that method to programmatically re-render the component. |

## Next Steps

* [Explore the Sankey Diagram Elements]({%slug sankey-diagram-events%})
* [Bind Data to the Sankey Diagram]({%slug sankey-diagram-data-binding%})

## See Also

* [Live Demos: Sankey Diagram](https://demos.telerik.com/blazor-ui/Sankey Diagram/overview)
* [Sankey Diagram API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSankey Diagram)
