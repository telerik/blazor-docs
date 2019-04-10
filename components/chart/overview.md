---
title: Overview
page_title: Chart for Blazor Overview
description: Overview of the Chart for Blazor
slug: components/chart/overview
tags: telerik,blazor,chart,overview
published: True
position: 0
---

# Chart Overview

The Blazor chart allows you to visualize data to your users in a meaningful way so they can draw conclusions. You can use a variety of chart types and control all aspects of the chart's appearance - from colors and fonts, to paddings, margins and templates.

To use a Telerik chart for Blazor:

1. @[template](/_contentTemplates/common/js-interop-file.md#add-blazor-js-file-to-list)

1. add the `TelerikChart` tag to the desired view

>caption Basic chart with series and category axis [data binding](data-bind), and a few commonly used appearance settings

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Line" Name="Product 1 (bound to simple data)" Data="@simpleData">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Line" Name="Product 2 (bound to model)" Data="@modelData" Field="@nameof(MyDataModel.SecondSeriesValue)">
			<TelerikChartSeriesLabels Template="#=value# in #=dataItem.ExtraData# quarter" Visible="true"></TelerikChartSeriesLabels>
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis Color="red"></TelerikChartValueAxis>
	</TelerikChartValueAxes>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartTitle Text="Quarterly sales trend"></TelerikChartTitle>

	<TelerikChartLegend Position="Telerik.Blazor.ChartLegendPosition.Bottom">
	</TelerikChartLegend>
</TelerikChart>

@functions {
	public class MyDataModel
	{
		public int SecondSeriesValue { get; set; }
		public string ExtraData { get; set; }

	}

	public List<MyDataModel> modelData = new List<MyDataModel>()
{
		new MyDataModel() { SecondSeriesValue = 1, ExtraData = "first" },
		new MyDataModel() { SecondSeriesValue = 5, ExtraData = "second" },
		new MyDataModel() { SecondSeriesValue = 3, ExtraData = "third" },
		new MyDataModel() { SecondSeriesValue = 2, ExtraData = "fourth" },
	};

	public List<object> simpleData = new List<object>() { 10, 2, 7, 5 };
	
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

}
````

>caption The result from the code snippet above

![](images/overview-chart.png)

>tip When configuring nested properties and child elements in your chart, the inner tags will contain their parent tag name and add specifics to its end. You can see an example of this in the `TelerikChartSeries` > `TelerikChartSeriesLabels` tags above example.


>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart ref="@myChartRef">
</TelerikChart>

@functions {
	Telerik.Blazor.Components.Chart.TelerikChart myChartRef;
}
````

## See Also

  * [Data Binding]({%slug components/chart/databind%})
  * [Live Demos: Chart](https://demos.telerik.com/blazor/chart/index)
