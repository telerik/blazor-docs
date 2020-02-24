---
title: How to Style the Series Labels for a Chart
description: Learn how to style the labels for a UI for Blazor Chart.
type: how-to
page_title: Style the Chart Series Labels
slug: chart-style-the-series-labels
position: 
tags: 
ticketid: 1455079
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.7.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Charts for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
The [UI for Blazor Chart](https://docs.telerik.com/blazor-ui/components/chart/overview) is rendered using the [HTML Canvas API](https://developer.mozilla.org/en-US/docs/web/html/element/canvas) which means that the output is a [Scalable Vector Graphic](https://developer.mozilla.org/en-US/docs/Web/SVG) and that manipulating the styling and appearance is not possible without an existing API.
 
## Solution
In this case, use the [ChartSeriesLabelsBase API](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ChartSeriesLabelsBase#properties) properties to alter the style and appearance as desired. The properties accept typical CSS styling convention. For example, to bold the Font use a common CSS font-family designation as shown below in the code snippet.

```` HTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@series1Data">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
            <ChartSeriesLabels Position="ChartSeriesLabelsPosition.Above" Visible="true" Font="bold 16px Times New Roman"  Background="Transparent"></ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@series2Data">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
            <ChartSeriesLabels Position="ChartSeriesLabelsPosition.Top" Visible="true" Font="Bold" Background="Transparent"></ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column" Name="Product 3" Data="@series3Data">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
            <ChartSeriesLabels Position="ChartSeriesLabelsPosition.OutsideEnd" Visible="true" Font="16px 'Times New Roman'" Background="Transparent"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly revenue per product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    public List<object> series1Data = new List<object>() { 10, 2, 5, 6 };
    public List<object> series2Data = new List<object>() { 5, 8, 2, 7 };
    public List<object> series3Data = new List<object>() { 15, 3, 8, 8 };
    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

## See Also

*   [UI for Blazor Chart](https://docs.telerik.com/blazor-ui/components/chart/overview)
*   [ChartSeriesLabelsBase API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ChartSeriesLabelsBase#properties)
*   [HTML Canvas API](https://developer.mozilla.org/en-US/docs/web/html/element/canvas)
*   [Scalable Vector Graphic](https://developer.mozilla.org/en-US/docs/Web/SVG)
