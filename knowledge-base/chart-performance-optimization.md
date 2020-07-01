---
title: Chart Performance Optimization
description: How to improve the performance of the chart rendering if you encounter jerky updates or slow render.
type: how-to
page_title: Chart Performance Imrovement
slug: chart-performance-optimization
position: 
tags: 
ticketid: 1408336
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>any</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>Progress® Telerik® UI for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description
Sometimes the chart data will be updated in real time (for example, by using SignalR or loops). 

When doing this, the chart updates may seem to be really jerky during the re-render.

## Cause\Possible Cause(s)
When the data changes, the chart re-renders from scratch, and has an animation enabled by default.

If the data updates come in too often, the browser simply drops the framerate while re-rendering the charts due to performance reasons. 

In some test cases around 10 second intervals provide smooth animations, while 2-3 second intervals result in performance issues.

## Solution
There are several things you can do to improve the performance, and you can do any or all of them:

* Set the `Transitions` property of the chart to `false` to disable the animations.

* Set the `RenderAs` property to `Telerik.Blazor.RenderingMode.Canvas` (it defaults to SVG)

* Increase the interval over which data updates are made. Very short intervals also make it difficult for human eyes to review the information anyway.

* Reduce the number of elements the chart has to render - hide axis grid lines, labels on series data points, or increase the  Step of axis labels to render fewer of them (or also hide them altogether).
