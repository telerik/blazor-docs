---
title: Multiple Axes
page_title: Chart - Multiple Axes
description: Use Multiple Axes in the Chart for Blazor.
slug: components/chart/multiple-axes
tags: telerik,blazor,chart,multiple,axis,axes
published: true
position: 21
components: ["charts"]
---

# Multiple Axes

You can have the chart render more than one axis for a given dimension. This lets you associate series with different axes, and position different axes to the left, right, top or bottom of the chart. This is often useful when you have data for some series that varies greatly in magnitude from other data, or is measured in a different unit. You can also associate series with different categories on the x-axis without having them side-by-side.

>tip The [Examples](#examples) section offer several common use-cases.

This article contains the following sections:

* [Define Multiple Axes](#define-multiple-axes)
	* [Categorical Charts](#categorical-charts)
	* [Numerical Charts](#numerical-charts)
* [Choose Axis Position](#choose-axis-position)
* [Examples](#examples)
	* [Categorical Chart - Value Axes Examples](#categorical-chart-value-axes-examples)
	* [Category Axes](#category-axes)
		* [Behavior with Bar and Column Charts](#behavior-with-bar-and-column-charts)
	* [Numerical Chart Examples](#numerical-chart-examples)
	* [Move X-Axis Labels to the Bottom](#move-x-axis-labels-to-the-bottom)
	* [Move Value Axis to the Right](#move-value-axis-to-the-right)

>tip When using multiple axes, you would often set the color of the axis to match the `Color` of the series that uses it.

## Define Multiple Axes

The way multiple axes are declared depends on the [chart series type](slug:components/chart/databind#series-types):

### Categorical Charts

1. Define the extra axis in the corresponding `ChartCategoryAxes` or `ChartValueAxes` tags.
2. Set its `Name` property as desired. By default, a series uses the first axis.
3. Provide the `Name` value to the series you want to use it through its `Axis` and `CategoryAxis` for the `Y` and `X` axis respectively.


### Numerical Charts

1. Define the extra axis in the corresponding `ChartXAxes` or `ChartYAxes` tags.
2. Set its `Name` property as desired. By default, a series uses the first axis.
3. Provide the `Name` value to the series you want to use it through its `yAxis` and `xAxis` properties.

## Choose Axis Position

To define the position of the extra axes, you need to:

1. Use the `AxisCrossingValue` property of the first axis from the **other** dimension.
2. Set it to an array that indicates at which points it will be crossed by the multiple axes:

     * for categorical axes, the numbers indicate the index of the category at which the axes will cross
     * for numerical axes, the numbers indicate the value at which the axes will cross
     
    The items in the array correspond to the order of the axes declaration.

You can set a very large or a very small value to make a certain axis appear at the end of the chart. You can find an example in the [Move X-Axis Labels to the Bottom](#move-x-axis-labels-to-the-bottom) section.

## Examples

In this section you can find code examples, explanations on the behavior and screenshots of the expected behavior so you can understand the behavior of the chart and use it to your advantage.


* [Categorical Chart - Value Axes Examples](#categorical-chart-value-axes-examples)
* [Category Axes](#category-axes)
	* [Behavior with Bar and Column Charts](#behavior-with-bar-and-column-charts)
* [Numerical Chart Examples](#numerical-chart-examples)
* [Move X-Axis Labels to the Bottom](#move-x-axis-labels-to-the-bottom)
* [Move Value Axis to the Right](#move-value-axis-to-the-right)


### Categorical Chart - Value Axes Examples

In the following example, you can see how to define multiple y-axes, associate a series with an axis, and change the position of an axis.

>caption Multiple Y-axes and defining their position according a category axis

<demo metaUrl="client/chart/multiple-axes/value-axes/" height="420"></demo>

### Category Axes

You can use multiple category axes to associate each series with its own points on the axis instead of having them add up on the same axis.

>caption Multiple category axes on a line chart

<demo metaUrl="client/chart/multiple-axes/category-axes/" height="420"></demo>

### Behavior with Bar and Column Charts

It is important to keep in mind the behavior of the series with multiple category axes:

* the series items will **not** be rendered side by side, and may overlap (mostly applicable to bar and column types of series).
* series items touch the category axis for some chart types, like a column or bar chart, and having too large or too small crossing values may lead to unexpected appearance.
 
>caption Multiple category axes on a column chart with proper crossing values and series values

<demo metaUrl="client/chart/multiple-axes/column-crossing-values/" height="420"></demo>

>caption Examples of potentially unwanted behaviors of column and bar types of charts with multiple axes, and the code that produces those issues.

<div class="skip-repl"></div>
````RAZOR LargeCrossingPoint
Potentially unwanted behavior 1

<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</ChartSeries>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</ChartSeries>
	</ChartSeriesItems>

	<ChartCategoryAxes>
		<ChartCategoryAxis Name="firstAxis" Color="red"></ChartCategoryAxis>
		<ChartCategoryAxis Name="secondAxis" Color="blue"></ChartCategoryAxis>
	</ChartCategoryAxes>

	<ChartValueAxes>
		<ChartValueAxis AxisCrossingValue="@crossingPoints"></ChartValueAxis>
	</ChartValueAxes>
</TelerikChart>

@code {
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
````RAZOR OverlappingValues
Potentially unwanted behavior 2

<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" CategoryAxis="firstAxis" Color="red"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</ChartSeries>
		<ChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" CategoryAxis="secondAxis" Color="blue"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</ChartSeries>
	</ChartSeriesItems>

	<ChartCategoryAxes>
		<ChartCategoryAxis Name="firstAxis" Color="red"></ChartCategoryAxis>
		<ChartCategoryAxis Name="secondAxis" Color="blue"></ChartCategoryAxis>
	</ChartCategoryAxes>
</TelerikChart>

@code {
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


### Numerical Chart Examples

When using numerical charts, you define the extra axes in the `ChartXAxes` and `ChartYAxes` tags.

>caption Multiple axes in a numerical chart

<demo metaUrl="client/chart/multiple-axes/numerical-axes/" height="460"></demo>

### Move X-Axis Labels to the Bottom

This example shows how to move the x-axis labels to the bottom of the chart. This can be useful when you have negative values and you don't want the x-axis labels to overlap the series themselves.

The general approach is to set an axis crossing point that has a very large value - in this example - `int.MinValue`.

>caption X-axis Labels at the bottom of the chart with negative values

<demo metaUrl="client/chart/multiple-axes/x-axis-labels-bottom/" height="420"></demo>

### Move Value Axis to the Right

To ensure that an axis is always to the desired side of the chart, you could set its corresponding `AxisCrossingValue` to a very large value such as `int.MaxValue` or `int.MinValue`.

This approach can work for both numerical and categorical axes. The example below uses a categorical axis.

>caption Example of setting a crossing point that is very large so the value axis appears on the right hand side of the chart

<demo metaUrl="client/chart/multiple-axes/value-axis-right/" height="420"></demo>

## See Also

* [Data Binding a Chart](slug:components/chart/databind)
* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
