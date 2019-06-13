---
title: Data Binding
page_title: Chart for Blazor | Data Binding
description: Data Binding the Chart for Blazor
slug: components/chart/databind
tags: telerik,blazor,chart,databind,data,bind
published: True
position: 1
---

# Chart Data Binding

This article explains the different ways to provide data to a Chart component, the properties related to data binding and their results.

There are two key ways to bind data to the chart series and axes:

* [Independent Series Binding](#independent-series-binding)
* [Attach Series Items to Their Categories](#attach-series-items-to-their-categories)

You can, of course, [mix these approaches](#mixed-data-source).

## Independent Series Binding

In the simplest case, you provide two collections to the chart:

* an `object[]` for the `Categories` (items) on the x-axis
* a `List<object>` with decimal values for the series `Data`

With this approach, the items in each series are independent from the other series, and from the items on the x-axis where the corresponding categories are displayed. The series items are matched with the items on the x-axis by their index.

>caption Bind series independently of each other and of the category axis

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Series 1" Data="@data1">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Series 2" Data="@data2">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
</TelerikChart>

@code {
	public List<object> data1 = new List<object>() { 1, 2, 3, 4 };
	public List<object> data2 = new List<object>() { 2, 3, 4, 5 };
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

>caption The result from the code snippet above

![](images/independent-series-binding.png)

## Attach Series Items to Their Categories

You can provide a `List<object>` to the `Data` property of a series that contains both its data points, and its x-axis categories. Then, set the series:

* `Field` property to the name of the field with its values
* `CategoryField` property to the name of the field for its x-axis items

With this, the items from the series will be matched to the items (categories) on the x-axis. Each series will add its own categories to the x-axis in order of appearance, and the series items will appear above them only.

>tip This approach lets you define the `CategoryField` for only one series and the rest of the series will match the categories by their index. In such a case, you can provide a single data collection to the chart that holds all data points and x-axis categories.

>caption Bind the entire chart to a single collection. 

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.MySharedCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData"
							Field="@nameof(MyDataModel.Product2)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>
</TelerikChart>

@code {
	public class MyDataModel
	{
		public string MySharedCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { MySharedCategories = "a", Product1 = 1, Product2 = 2 },
		new MyDataModel() { MySharedCategories = "b", Product1 = 2, Product2 = 3 },
		new MyDataModel() { MySharedCategories = "c", Product1 = 3, Product2 = 4 },
		new MyDataModel() { MySharedCategories = "d", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/bind-chart-to-single-collection.png)

>caption Unique categories are added independently.

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>
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
		new MyDataModel() { FirstSeriesCategories = "b",  SecondSeriesCategories = "f", Product1 = 2, Product2 = 3 },
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 4 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/unique-categories.png)

>tip You can define [multiple x-axes](multiple-axes) to avoid this behavior and have each series populate its own x-axis.

>caption If category values match, they will be combined

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.FirstSeriesCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData"
							Field="@nameof(MyDataModel.Product2)" CategoryField="@nameof(MyDataModel.SecondSeriesCategories)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>
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
		
		//the categories for both series match and both data points will be rendered on the same category
		new MyDataModel() { FirstSeriesCategories = "match",  SecondSeriesCategories = "match", Product1 = 2, Product2 = 3 },
		
		new MyDataModel() { FirstSeriesCategories = "c",  SecondSeriesCategories = "g", Product1 = 3, Product2 = 4 },
		new MyDataModel() { FirstSeriesCategories = "d",  SecondSeriesCategories = "h", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/matching-categories.png)

## Mixed Data Source

You can choose where to take the categories and series data from, and combine both approaches to a solution that fits the existing data models and data retrieval logic that you have.

For example, you can take the data for some series from a complex model, and the categories from a different place. Or, you can take the categories from a complex model, but let some standalone data populate some series.

>caption Populate categories and a series from standalone data, not from model

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" Field="@nameof(MyDataModel.Product1)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2" Data="@chartData" Field="@nameof(MyDataModel.Product2)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Series 3" Data="@standaloneData">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
</TelerikChart>

@code {
	public List<object> standaloneData = new List<object>() { 3, 4, 5, 6 };
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

	public class MyDataModel
	{
		public string MySharedCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
	{
		//you do not have to use all the fields, and you do not have to take the categories from this model
		new MyDataModel() { MySharedCategories = "a", Product1 = 1, Product2 = 2 },
		new MyDataModel() { MySharedCategories = "b", Product1 = 2, Product2 = 3 },
		new MyDataModel() { MySharedCategories = "c", Product1 = 3, Product2 = 4 },
		new MyDataModel() { MySharedCategories = "d", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/mixed-data-sources-1.png)

>caption Populate categories from model, and some series from standalone data. Standalone categories are ignored.

````CSHTML
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@chartData" 
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.MySharedCategories)">
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Standalone series" Data="@standaloneData">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis Categories="@xAxisItems"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
</TelerikChart>

@code {
	public List<object> standaloneData = new List<object>() { 3, 4, 5, 6 };

	//the standalone categories will be ignored if they are data bound from a series configuration
	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

	public class MyDataModel
	{
		public string MySharedCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
	{
		new MyDataModel() { MySharedCategories = "a", Product1 = 1, Product2 = 2 },
		new MyDataModel() { MySharedCategories = "b", Product1 = 2, Product2 = 3 },
		new MyDataModel() { MySharedCategories = "c", Product1 = 3, Product2 = 4 },
		new MyDataModel() { MySharedCategories = "d", Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/standalone-categories-ignored-if-bound-from-series.png)

## See Also

  * [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/index)
