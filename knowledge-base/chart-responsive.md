---
title: Responsive Chart
description: How to adjust the size of a Chart when its container or the browser window size changes.
type: how-to
page_title: How to make a responsive Chart
slug: chart-kb-responsive
position: 
tags: 
res_type: kb
components: ["charts"]
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

When the window resizes, you have to resize the Chart dynamically at runtime:

1. Add a JS function that listens for the [window resize event](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) and invokes a C# method. Ensure that the method name in the JS function matches the one in your C# code.
1. In the C# method call the [Chart `.Refresh()` method](slug:components/chart/overview#chart-reference-and-methods) to re-render the Chart so it matches the new window size.


````RAZOR
@inject IJSRuntime js

<!-- suppress-error allows the script tag to be in the Razor file for this example -->
<!-- move this script to a JS file in a production app -->
<script suppress-error="BL9992">

    var dotNet;

    var timeoutId;
    var resizeDebounceDelay = 300;

    function saveDotNetRef(dotNetRef) {
        dotNet = dotNetRef;

        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
        clearTimeout(timeoutId);

        timeoutId = window.setTimeout(function () {
            dotNet.invokeMethodAsync("RaiseWindowResizeEvent"); // the method name, you may have to change this for your app
        }, resizeDebounceDelay);
    }

</script>

<br />
<br />

Resize the browser window to see the Charts respond to the size change

<br />
<br />

<TelerikChart @ref="@ChartRef">
    <ChartSeriesItems>
        <ChartSeries Type="@ChartSeriesType.Line" Name="Product 1 (bound to simple data)" Data="@SimpleData">
        </ChartSeries>
        <ChartSeries Type="@ChartSeriesType.Line" Name="Product 2 (bound to model)" Data="@ModelData" Field="@nameof(MyDataModel.SecondSeriesValue)">
            <ChartSeriesLabels Template="#=value# in #=dataItem.ExtraData# quarter" Visible="true"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis Color="red"></ChartValueAxis>
    </ChartValueAxes>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@XAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly sales trend"></ChartTitle>

    <ChartLegend Position="@ChartLegendPosition.Bottom">
    </ChartLegend>
</TelerikChart>

@code {
    private TelerikChart ChartRef { get; set; } // you need references to the Charts you need to resize

    // Replace <__Main> with your Razor class name.
    private DotNetObjectReference<__Main>? DotNetRef { get; set; }

    private List<object> SimpleData = new List<object>() { 10, 2, 7, 5 };

    private List<MyDataModel> ModelData = new List<MyDataModel>() {
        new MyDataModel() { SecondSeriesValue = 1, ExtraData = "first" },
        new MyDataModel() { SecondSeriesValue = 5, ExtraData = "second" },
        new MyDataModel() { SecondSeriesValue = 3, ExtraData = "third" },
        new MyDataModel() { SecondSeriesValue = 2, ExtraData = "fourth" },
     };

    private string[] XAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

    [JSInvokable]
    public void RaiseWindowResizeEvent()
    {
        ChartRef.Refresh();
    }

    protected override void OnInitialized()
    {
        DotNetRef = DotNetObjectReference.Create(this);
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // Ensure the HTML is ready.
            await Task.Delay(1);
            await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);
        }
        await base.OnAfterRenderAsync(firstRender);
    }

    public class MyDataModel
    {
        public int SecondSeriesValue { get; set; }
        public string ExtraData { get; set; }
    }
}
````