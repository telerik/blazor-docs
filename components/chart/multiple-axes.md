---
title: Multiple Axes
page_title: Chart for Blazor | Multiple Axes
description: Use Multiple Axes in the Chart for Blazor
slug: components/chart/multiple-axes
tags: telerik,blazor,chart,multiple,axis,axes
published: true
position: 21
---

# Multiple Axes

You can have the chart render more than one axis for a given dimension. This lets you associate series with different axes, and position different axes to the left, right, top or bottom of the chart. This is often useful when you have data for some series that varies greatly in magnitude from other data, or is measured in a different unit. You can also associate series with different categories on the x-axis without having them side-by-side.

>caption Multiple Y-axes in a chart

![](images/multiple-y-axes.png)

This article contains the following sections:

* [Define Multiple Axes](#define-multiple-axes)
* [Choose Axis Position](#choose-axis-position)
* [Examples](#examples)
	* [Value Axes](#value-axes)
	* [Category Axes](#category-axes)
		* [Behavior with Bar and Column Charts](#behavior-with-bar-and-column-charts)

>tip When using multiple axes, often the color of the axis is set to match the `Color` of the series that uses it.

## Define Multiple Axes

To use multiple axes, you need to:

1. Define the extra axis in the corresponding `TelerikChartCategoryAxes` and/or `TelerikChartValueAxes` tags.
2. Set its `Name` property as desired. By default, the series uses the first axis.
3. Provide the `Name` value to the series you want to use it through its `Axis` or `CategoryAxis` property.

## Choose Axis Position

To define the position of the extra axes, you need to:

1. Use the `AxisCrossingValue` property of the first axis from the **other** dimension.
2. Set it to an array that indicates at which points it will be crossed by the multiple axes:

     * for categorical axes, the numbers indicate the index of the category at which the axes will cross
     * for numerical axes, the numbers indicate the value at which the axes will cross
     
    The items in the array correspond to the order of the axes declaration.

You can set a very large or a very small value to make a certain axis appear at the end of the chart.

## Examples

In this section you can find code examples, explanations on the behavior and screenshots of the expected behavior so you can understand the behavior of the chart and use it to your advantage.

* [Value Axes Examples](#value-axes)
* [Category Axes Examples](#category-axes)

### Value Axes

In the following example, you can see how to define multiple y-axes, associate a series with an axis, and change the position of an axis.

>caption Multiple Y-axes and defining their position according a category axis

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Line" Data="@seriesOneData" Color="green">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Line" Data="@seriesTwoData" Color="blue" Axis="secondAxis">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis Color="green">
			<TelerikChartValueAxisTitle Text="first (default) axis"></TelerikChartValueAxisTitle>
		</TelerikChartValueAxis>
		<TelerikChartValueAxis Color="blue" Name="secondAxis">
			<TelerikChartValueAxisTitle Text="second (named) axis"></TelerikChartValueAxisTitle>
		</TelerikChartValueAxis>
	</TelerikChartValueAxes>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@categories" AxisCrossingValue="@crossingValues"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartTitle Text="Revenue per product"></TelerikChartTitle>

	<TelerikChartLegend Position="ChartLegendPosition.Right">
	</TelerikChartLegend>
</TelerikChart>

@functions {
	List<object> seriesOneData = new List<object>() { 5, 5, 5, 5 };
	List<object> seriesTwoData = new List<object>() { 111, 555, 333, 888 };
	public string[] categories = new string[] { "Q1", "Q2", "Q3", "Q4" };
	public object[] crossingValues = new object[] { 0, 5 };
}
````

>caption The result from the code snippet above

![](images/multiple-y-axes.png)

### Category Axes

You can use multiple category axes to associate each series with its own points on the axis instead of having them add up on the same axis.

>caption Multiple category axes on a line chart

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Line" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Line" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Name="firstAxis" Color="red"></TelerikChartCategoryAxis>
		<TelerikChartCategoryAxis Name="secondAxis" Color="blue"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis AxisCrossingValue="@crossingPoints"></TelerikChartValueAxis>
	</TelerikChartValueAxes>
</TelerikChart>

@functions {
	public class MyDataModel
	{
		public string FirstSeriesCategories { get; set; }
		public string SecondSeriesCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { FirstSeriesCategories = "a",  SecondSeriesCategories = "e", Product1 = 1, Product2 = 20 },
		new MyDataModel() { FirstSeriesCategories = "match",  SecondSeriesCategories = "match", Product1 = 2, Product2 = 30 },
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 40 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 50 },
	};

	public object[] crossingPoints = new object[] { -9999999, 9999999 };
}
````

>caption The result from the code snippet above

![](images/multiple-category-axes-line-chart.png)

#### Behavior with Bar and Column Charts

It is important to keep in mind the behavior of the series with multiple category axes:

* the series items will **not** be rendered side by side, and may overlap (mostly applicable to bar and column types of series).
* series items touch the category axis for some chart types, like a column or bar chart, and having too large or too small crossing values may lead to unexpected appearance.
 
>caption Multiple category axes on a column chart with proper crossing values and series values

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Name="firstAxis" Color="red"></TelerikChartCategoryAxis>
		<TelerikChartCategoryAxis Name="secondAxis" Color="blue"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis AxisCrossingValue="@crossingPoints"></TelerikChartValueAxis>
	</TelerikChartValueAxes>
</TelerikChart>

@functions {
	public class MyDataModel
	{
		public string FirstSeriesCategories { get; set; }
		public string SecondSeriesCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { FirstSeriesCategories = "a",  SecondSeriesCategories = "e", Product1 = 1, Product2 = 20 },
		new MyDataModel() { FirstSeriesCategories = "match",  SecondSeriesCategories = "match", Product1 = 2, Product2 = 30 },
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 40 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 50 },
	};

	public object[] crossingPoints = new object[] { -9999999, 20 };
}
````

>caption The result from the code snippet above

![](images/multiple-category-axes=-column-chart.png)

>caption Examples of potentially unwanted behaviors of column and bar types of charts with multiple axes, and the code that produces those issues.

````LargeCrossingPoint
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Name="firstAxis" Color="red"></TelerikChartCategoryAxis>
		<TelerikChartCategoryAxis Name="secondAxis" Color="blue"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>

	<TelerikChartValueAxes>
		<TelerikChartValueAxis AxisCrossingValue="@crossingPoints"></TelerikChartValueAxis>
	</TelerikChartValueAxes>
</TelerikChart>

@functions {
	public class MyDataModel
	{
		public string FirstSeriesCategories { get; set; }
		public string SecondSeriesCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { FirstSeriesCategories = "a",  SecondSeriesCategories = "e", Product1 = 1, Product2 = 2 },
		new MyDataModel() { FirstSeriesCategories = "match",  SecondSeriesCategories = "match", Product1 = 2, Product2 = 3 },
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 4 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 5 },
	};

	public object[] crossingPoints = new object[] { -9999999, 9999999 };
}
````
````OverlappingValues
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Name="firstAxis" Color="red"></TelerikChartCategoryAxis>
		<TelerikChartCategoryAxis Name="secondAxis" Color="blue"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
</TelerikChart>

@functions {
	public class MyDataModel
	{
		public string FirstSeriesCategories { get; set; }
		public string SecondSeriesCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { FirstSeriesCategories = "a",  SecondSeriesCategories = "e", Product1 = 1, Product2 = 2 },
		new MyDataModel() { FirstSeriesCategories = "match",  SecondSeriesCategories = "match", Product1 = 2, Product2 = 3 },
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 4 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippets above

![](images/column-chart-multiple-axes-behavior.png)


## See Also

  * [Data Binding a Chart]({%slug components/chart/databind%})
  * [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/index)
