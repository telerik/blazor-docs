---
title: How to Reduce the Excessive Whitespace Around the Chart
description: Learn how to adjust the padding and legend position of a Chart and remove unnecessary white space.
type: how-to
page_title: How to Reduce the Excessive Whitespace Around the Chart
slug: chart-kb-remove-excess-whitespace
tags: chart, padding
res_type: kb
ticketid: 1663179, 1559824
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

This KB article answers the following questions:

- How to adjust the padding of a Chart in Blazor?
- How to reduce white space around the Chart that is within a Telerik Card?
- How to make the Chart more compact?

## Solution

To reduce the whitespace around a Chart, use the `Padding` parameter of the ChartSeries.

````RAZOR
<TelerikCard Width="330px">
    <CardHeader>
        <CardTitle>Simple Pie Chart</CardTitle>
    </CardHeader>
    <CardBody>
        <TelerikChart Height="300px">
            <ChartSeriesItems>
                <ChartSeries Type="ChartSeriesType.Pie"
                             Data="@pieData"
                             Field="@nameof(MyPieChartModel.SegmentValue)"
                             CategoryField="@nameof(MyPieChartModel.SegmentName)"
                             Padding="5">
                </ChartSeries>
            </ChartSeriesItems>
            <ChartLegend Position="ChartLegendPosition.Bottom" Width="300">
            </ChartLegend>
        </TelerikChart>
    </CardBody>
</TelerikCard>

@code {
    private List<MyPieChartModel> pieData = new List<MyPieChartModel>
    {
        new MyPieChartModel
        {
            SegmentName = "Product 1",
            SegmentValue = 2
        },
        new MyPieChartModel
        {
            SegmentName = "Product 2",
            SegmentValue = 3
        },
        new MyPieChartModel
        {
            SegmentName = "Product 3",
            SegmentValue = 4
        }
    };

    public class MyPieChartModel
    {
        public string SegmentName { get; set; }
        public double SegmentValue { get; set; }
    }
}
````

## See Also

- [ChartSeries API Documentation](https://docs.telerik.com/blazor-ui/api/telerik.blazor.components.chartseries)
- [Chart for Blazor Overview](slug://components/chart/overview)
