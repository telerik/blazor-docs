---
title: Responsive Chart
description: How to adjust the size of a chart when its container or the browser window size changes
type: how-to
page_title: How to make a responsive chart
slug: chart-kb-responsive
position: 
tags: 
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Charts for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description

When the user resizes the browser window or some layout change happens (for example, a navigation panel is expanded or collapsed), you may want to have the charts redraw with the new dimensions.

## Solution

Generally, the `Width` and `Height` parameters of the chart can take values in `%`, and the chart will render according to the dimensions of its parent element.

This works well for the initial rendering and the chart will be "responsive" immediately according to your layout, regardless of the display (desktop, tablet, phone).

When the layout changes dynamically at runtime, you have to call its `.Refresh()` method. You can find an example in the following sample project: [https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart](https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart)
