---
title: Show / Hide Series on Legend Click
description: How to Show and Hide Series on Legend Click?
type: how-to
page_title: Show / Hide Series on Legend Click
slug: chart-kb-show-hide-series-on-legend-click
position: 
tags: chart, legend, click, show, hide, toggle
ticketid: 1536407
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

I want to toggle (show and hide) the series on legend click. How to achieve that?

## Solution

You can programmatically toggle the series visibility on click of the corresponding legend item. At the time of writing (UI for Blazor version 2.29) Chart Legend does not expose click event for its items (here is its public feature request - [OnLegendItemClick event similar to the OnSeriesClick](https://feedback.telerik.com/blazor/1499953-onlegenditemclick-event-similar-to-the-onseriesclick).

That said, you can create a custom legend and handle the OnClick event of its elements to show/hide the corresponding series. You can add the desired elements and styles to match your application needs. You also need to hide the built-in legend to skip any possible confusion. You can do that by setting its `Visibility` to `false`.

Here is an example of the above listed approach.

````CSHTML
<style>
    .custom-legend {
        cursor: pointer;
        text-align: center;
    }   
</style>

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Visible="@Product1Visible" Type="ChartSeriesType.Line"
                     Name="Product 1" Data="@series1Data" Color="red">
        </ChartSeries>
        <ChartSeries Visible="@Product2Visible" Type="ChartSeriesType.Line"
                     Name="Product 2" Data="@series2Data" Color="blue">
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue per product"></ChartTitle>

    <ChartLegend Visible="false" Position="ChartLegendPosition.Right"/>

    <div class="custom-legend">
        <span @onclick="@(() => ClickProduct1())" style="color:red; opacity:@(Product1Visible? 1 : 0.5)">Product 1</span>
        <span>|</span>
        <span @onclick="@(() => ClickProduct2())" style="color:blue; opacity:@(Product2Visible? 1 : 0.5)">Product 2</span>
    </div>
</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
    public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

    public bool Product1Visible { get; set; } = true;
    public bool Product2Visible { get; set; } = true;

    void ClickProduct1()
    {
        Product1Visible = !Product1Visible;
    }

    void ClickProduct2()
    {
        Product2Visible = !Product2Visible;
    }
}
````