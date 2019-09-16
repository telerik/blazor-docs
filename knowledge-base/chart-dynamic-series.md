---
title: How to add dynamic series in a chart
description: How to use dynamic series collection in a chart from the code-behind
type: how-to
page_title: How to use dynamic series in a chart
slug: chart-dynamic-series
position: 
tags: 
ticketid: 1424840 
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

I want to add dynamic series at run time, from the C# code-behind, based on the user selected options.


## Solution

The standard approach in Blazor is to loop over a view model with the needed data, and generate the needed series tags in the markup based on the code behind data.

This also applies to other collections in other components, or for generating a given number of component instances.

You may also find useful the [Data Binding article]({%slug components/chart/databind%}) on different ways to provide the data to the series and the chart.


Here is a simple example:

````CSHTML
This example hardcodes the series that are added to showcase the concept of using conditional markup and model loops

<TelerikButton OnClick="@AddSeries">Add series</TelerikButton>

<TelerikChart>
    <ChartSeriesItems>
        @foreach (MyChartSeriesViewModel item in series)
        {
            <ChartSeries Type="ChartSeriesType.Column" Name="@item.name" Data="@item.data" />
        }
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems" />
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue per product" />

    <ChartLegend Position="ChartLegendPosition.Right" />
</TelerikChart>

@code {
    List<MyChartSeriesViewModel> series { get; set; } = new List<MyChartSeriesViewModel>();

    public class MyChartSeriesViewModel
    {
        public List<object> data { get; set; } = new List<object>();
        public string name { get; set; }
    }

    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

    protected override void OnInitialized()
    {
        base.OnInitialized();

        List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
        List<object> series2Data = new List<object>() { 5, 8, 2, 7 };

        series.Add(new MyChartSeriesViewModel { name = "first", data = series1Data });
        series.Add(new MyChartSeriesViewModel { name = "second", data = series2Data });
    }

    void AddSeries()
    {
        List<object> series3Data = new List<object>() { 4, 9, 6, 2 };

        series.Add(new MyChartSeriesViewModel { name = "third", data = series3Data });
    }
}
````

