---
title: Set Specific Bubble Sizes
description: Learn how to define bubble sizes in different Charts that users can compare more easily.
type: how-to
page_title: How to Set Specific Bubble Sizes
slug: chart-kb-bubble-size
tags: telerik, blazor, chart, bubble
ticketid: 1693133
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

This KB answers the following questions:

* How to display smaller bubbles for smaller values in a specific Telerik Blazor Chart instance?
* How to help users compare bubble sizes for different data in different Charts?
* How to display all bubbles with a specific defined `Size` value in certain dimensions?
* How to use fixed bubble sizes instead of relative?

## Solution

The [Bubble Chart supports two algorithms to set the minimum and maximum bubble sizes](slug:components/chart/types/bubble#bubble-sizing):

* Automatically, depending on the Chart dimensions, and the smallest and largest `Size` values in all series in the Chart instance.
* Based on the `<ChartSeries>` `MinSize` and `MaxSize` parameters.

To display comparable bubble sizes in multiple Charts:

1. Use an additional dummy data item with a `Size` value that matches the largest value in all involved Chart instances.
1. Hide the dummy bubble:
    * Set the `Min` or `Max` parameter of `<ChartXAxis>` and `<ChartYAxis>`.
    * Position the bubble outside the visible Chart area (viewport).

>caption Use comparable bubble sizes in several Charts

````RAZOR
<h3>Hundreds</h3>

<p>An additional bubble with <code>Size</code> <strong>3000</strong> is positioned outside the visible Chart area.</p>

<TelerikChart Width="70vw" Height="35vh">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bubble"
                     Data="@SeriesData1"
                     XField="@nameof(BubbleModel.X)"
                     YField="@nameof(BubbleModel.Y)"
                     SizeField="@nameof(BubbleModel.Size)">
        </ChartSeries>
    </ChartSeriesItems>
    <ChartXAxes>
        <ChartXAxis Min="0" />
    </ChartXAxes>
    <ChartYAxes>
        <ChartYAxis Min="0" />
    </ChartYAxes>
    <ChartTooltip Visible="true" Shared="true">
        <Template>
            @{ var dataItem = (BubbleModel)context.DataItem; }
            @dataItem.Size
        </Template>
    </ChartTooltip>
</TelerikChart>

<h3>Thousands</h3>

<p>The max <code>Size</code> value is <strong>3000</strong>. This is the max value in all Charts and series, so there is no need for additional hidden bubbles.</p>

<TelerikChart Width="70vw" Height="35vh">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bubble"
                     Data="@SeriesData2"
                     XField="@nameof(BubbleModel.X)"
                     YField="@nameof(BubbleModel.Y)"
                     SizeField="@nameof(BubbleModel.Size)">
        </ChartSeries>
    </ChartSeriesItems>
    <ChartXAxes>
        <ChartXAxis Min="0" />
    </ChartXAxes>
    <ChartYAxes>
        <ChartYAxis Min="0" />
    </ChartYAxes>
    <ChartTooltip Visible="true" Shared="true">
        <Template>
            @{ var dataItem = (BubbleModel)context.DataItem; }
            @dataItem.Size
        </Template>
    </ChartTooltip>
</TelerikChart>

<h3>All Series in Same Chart</h3>

<p>There is no need for additional hidden bubbles.</p>

<TelerikChart Width="70vw" Height="35vh">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Bubble"
                     Data="@SeriesData1.Take(SeriesData1.Count - 1)"
                     XField="@nameof(BubbleModel.X)"
                     YField="@nameof(BubbleModel.Y)"
                     SizeField="@nameof(BubbleModel.Size)">
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Bubble"
                     Data="@SeriesData2"
                     XField="@nameof(BubbleModel.X)"
                     YField="@nameof(BubbleModel.Y)"
                     SizeField="@nameof(BubbleModel.Size)">
        </ChartSeries>
    </ChartSeriesItems>
    <ChartTooltip Visible="true" Shared="true">
        <Template>
            @{ var dataItem = (BubbleModel)context.DataItem; }
            @dataItem.Size
        </Template>
    </ChartTooltip>
</TelerikChart>

@code {
    private List<BubbleModel> SeriesData1 = new List<BubbleModel>() {
        new BubbleModel() { X = 50, Y = 100, Size = 100 },
        new BubbleModel() { X = 150, Y = 200, Size = 200 },
        new BubbleModel() { X = 250, Y = 300, Size = 300 },

        // Size matches the max Size value in SeriesData2
        new BubbleModel() { X = -100, Y = -100, Size = 3000 }
    };

    private List<BubbleModel> SeriesData2 = new List<BubbleModel>() {
        new BubbleModel() { X = 100, Y = 50, Size = 1000 },
        new BubbleModel() { X = 200, Y = 150, Size = 2000 },
        new BubbleModel() { X = 300, Y = 250, Size = 3000 }
    };

    public class BubbleModel
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Size { get; set; }
    }
}
````

## See Also

* [Bubble Chart](slug:components/chart/types/bubble)
