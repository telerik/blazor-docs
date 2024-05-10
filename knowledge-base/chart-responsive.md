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

When the user resizes the browser window or some layout change happens (for example, a navigation panel is expanded or collapsed), you may want to have the Chart redraws with the new dimensions.

## Solution

Generally, the `Width` and `Height` parameters of the Chart can take values in `%`, and the Chart will render according to the dimensions of its parent element.

This works well for the initial rendering and the Chart will be "responsive" immediately according to your layout, regardless of the display (desktop, tablet, phone).

When the page layout changes dynamically at runtime, you have to call the [Chart `.Refresh()` method]({%slug components/chart/overview%}#chart-reference-and-methods). 

### Sample Project

You can find an example in the [Responsive Chart GitHub project](https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart)

The project is a Blazor Web App developed on the .NET 8 framework. It is created by following the [steps in the Telerik Blazor Web App (Tutorial)]({%slug getting-started/web-app%}). It features server interactive render mode and a global interactivity location. The sample project offers an exemplary project structure. While individual projects may vary, it's crucial to ensure that correct naming conventions and references are used. 

### Implementation Guidelines

1. In the `wwwwroot` folder add the JS file `windowResizeHandler.js`. The JS file defines a function `raiseResizeEvent`, which listens for the [window resize event](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event). When the resizing is detected the JS function invokes the `RaiseWindowResizeEvent` C# method. Ensure that the assembly name and method name in the function match the corresponding ones in your application.
1. In the `App.razor` file add the script source to include the JS file. The syntax to set the path to the JS file may vary across different .NET versions. Some versions may require the use of `~` in front of the path to specify the root directory. Ensure that the name of the JS file matches the corresponding one in your application.
1. In the `Services` folder add the `WindowResizeService.cs`. It contains the public static class `WindowResizeDispatcher` and its `RaiseWindowResizeEvent` method. The class also contains the `WindowResize` event as an `event Func<Task>`. This allow the subscribers of the event to execute operations when the window is resized. 
The `RaiseWindowResizeEvent`method updates the window dimensions. The method also raises the `WindowResize` event, if subscribed to, to notify of the resize event.
1. Add the `ResponsiveChartComponent.razor`. In the `OnInitialized` method subscribe to the `WindowResize` event and unsubscribe from the event in the `Dispose` method. This will ensure that the event is followed only when the component is in use. The `ResizeChart` method ensures that whenever the window resize event fires, the Chart refreshes and adapts to the new size of its container.
1. For the sake of the example, the `ResponsiveChartComponent` is a model, which is in a separate razor file. In the `ResizeChart.razor` the `ResponsiveChartComponent` is used to create three individual responsive Charts that adjust dynamically based on the size of the browser window.
1. `PrintResponsiveChart.razor` also shows a responsive Chart print functionality. You can also check the knowledge base article about [printing Charts]({%slug chart-kb-print-chart-only%}).