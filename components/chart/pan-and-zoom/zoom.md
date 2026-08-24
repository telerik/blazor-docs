---
title: Zoom
page_title: Chart - Zoom
description: Learn more about the Zoom feature of the Telerik UI for Blazor Chart component and explore the available examples.
slug: components/chart/zoom
tags: telerik, blazor, chart, event, pan, zoom
published: true
position: 1
components: ["charts"]
---

# Zoom

The `Zoom` feature allows you to zoom in or out the Telerik UI for Blazor Chart component. This functionality works with both `category` and `numeric` series.

## Configuring the Zoom Settings

To enable zooming, set the boolean `Enabled` parameter in the corresponding `ChartZoomable` inner tag of the Chart.

To perform zooming, do either of the following:

* Use the [Mouse-wheel](#mouse-wheel) on desktop devices or the pinch gesture on mobile devices.
* When [Selection](#selection) is enabled, hold the `Shift` key or the [assigned keyboard key](#specifying-a-keyboard-key-for-zooming) and select an area.

>caption Zoomable Chart

<demo metaUrl="client/chart/zoom/basic/" height="440"></demo>

### Mouse Wheel

To specify if users can zoom in and out with the scroll wheel, set the boolean `Enabled` parameter in the corresponding `ChartZoomableMousewheel` inner tag of the `ChartZoomable` tag.

You can also specify the zoom rate as percentage of the axis range through the `Rate` parameter in the `ChartZoomableMousewheel` tag. The default value is `0.3`(`double`) or `30%` of the axis range.

### Selection 

To specify if users can zoom in and out on a selected area, set the boolean `Enabled` parameter in the corresponding `ChartZoomableSelection` inner tag of the `ChartZoomable` tag.

>caption Mouse wheel and selection zoom in the Chart

<demo metaUrl="client/chart/zoom/mousewheel-and-selection/" height="420"></demo>

### Specifying a Keyboard Key for Zooming

>You can define a keyboard key for zooming only [selection zooming](#selection) is configured.

To specify the keyboard key for zooming, use the `Key` parameter within the `ChartZoomableSelection` and pass the `ChartZoomableSelectionKey` enum, which provides the following options:
 * (default) `None`—No key is required
 * `Ctrl`
 * `Shift`
 * `Alt`

### Disabling Zooming on a Selected Axis

To specify an axis that users cannot zoom, use the `Lock` parameter within the `ChartZoomableMousewheel`/`ChartZoomableSelection` tag and pass the `ChartAxisLock` enum, which provides the following options:
 * (default) `None`—None of the series are locked, users can zoom by either X or Y axis.
 * `X`—The X axis is locked, users can zoom only by Y axis.
 * `Y`—The Y axis is locked, users can zoom only by X axis.

>caption Chart with specified zooming key and locked axis

<demo metaUrl="client/chart/zoom/key-and-locked-axis/" height="420"></demo>

## See Also

* [Live Demos: Chart - Pan and Zoom](https://demos.telerik.com/blazor-ui/chart/pan-zoom)
