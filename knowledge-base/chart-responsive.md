---
title: Responsive Chart
description: How to adjust the size of a Chart when its container or the browser window size changes.
type: how-to
page_title: How to make a responsive Chart
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
            <td>Chart for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When the user resizes the browser window or some layout change happens (for example, a navigation panel is expanded or collapsed), you may want to have the Chart redraw with the new dimensions.

## Solution

Generally, the `Width` and `Height` parameters of the Chart can take values in `%`, and the Chart will render according to the dimensions of its parent element.

This works well for the initial rendering and the Chart will be "responsive" immediately according to your layout, regardless of the display (desktop, tablet, phone).

When the page layout changes dynamically at runtime, you have to call the [Chart `.Refresh()` method]({%slug components/chart/overview%}#chart-reference-and-methods). 

### Sample Project

You can find an example in the [Responsive Chart GitHub project](https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart).

### Implementation Guidelines

1. Add the JS file from the `wwwwroot` folder. This file defines a function that listens for the [window resize event](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) and invokes a C# method. Ensure that the assembly name and method name in the function match those in your application.
1. Add the script source to include the JS file. In the sample project, it is added in the `App.razor` file. Ensure that the name of the JS file matches that in your application.
1. Add the C# method, which the JS function invokes. Within the method, update the window dimensions and include an `event Func<Task>` if subscribed to, to notify of the resize. In the sample project, this is covered in the `WindowResizeService.cs` file. 
1. Within the `OnInitialized` method of the Chart, subscribe to the event and unsubscribe from it in the `Dispose` method. To reflect the resizing, invoke the Chart `Refresh` method.
1. `PrintResponsiveChart.razor` also shows a responsive Chart print functionality. You can also check the knowledge base article about [printing Charts]({%slug chart-kb-print-chart-only%}).