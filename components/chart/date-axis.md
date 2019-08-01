---
title: Date Axis
page_title: Chart for Blazor | Date Axis
description: Use Date Axis in the Chart for Blazor
slug: components/chart/date-axis
tags: telerik,blazor,chart,date,axis
published: true
position: 30
---

# Date Axis

Categorical charts (such as [Column]({%slug components/chart/types/column%}), [Line]({%slug components/chart/types/line%}), [Area]({%slug components/chart/types/area%})) support displaying dates on the x-axis. A date axis aggregates the data points that fall within its scope to a single data point that gets rendered.

To enable a date axis:

1. Set the `Type` property of he `TelerikChartCategoryAxis` to `ChartCategoryAxisType.Date`.
1. Provite categories of type `DateTime` to it (see [data binding a chart]({%slug components/chart/databind%})).

You can control the aggregation level through the `BaseUnit` property of the axis. It takes a member of the `Telerik.Blazor.ChartCategoryAxisBaseUnit` class.

You can set the aggregation function through the `Aggregate` property of the series. It takes a member of the `Telerik.Blazor.ChartSeriesAggregate` class.

>caption Date Axis with month grouping and different aggregates on the series

````CSHTML
@using Telerik.Blazor.Components.Chart
@using Telerik.Blazor

<TelerikChart>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis BaseUnit="ChartCategoryAxisBaseUnit.Months" Type="ChartCategoryAxisType.Date"></TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
	
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1 (SUM)" Data="@chartData"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.MySharedCategories)" Aggregate="ChartSeriesAggregate.Sum">
			<TelerikChartSeriesLabels Visible="true"></TelerikChartSeriesLabels>
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2 (COUNT)" Data="@chartData"
							Field="@nameof(MyDataModel.Product2)" Aggregate="ChartSeriesAggregate.Count">
			<TelerikChartSeriesLabels Visible="true"></TelerikChartSeriesLabels>
		</TelerikChartSeries>
	</TelerikChartSeriesItems>
	
</TelerikChart>

@code {
	public class MyDataModel
	{
		public DateTime MySharedCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
{
		new MyDataModel() { MySharedCategories = new DateTime(2019, 11, 11), Product1 = 1, Product2 = 2 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 15), Product1 = 2, Product2 = 3 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 19), Product1 = 3, Product2 = 4 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 28), Product1 = 4, Product2 = 5 },
	};
}
````

>caption The result from the code snippet above

![](images/date-axis.png)

## Advanced Features

### Automatic Fitting

If you set `BaseUnit="ChartCategoryAxisBaseUnit.Fit"`, the chart will choose such a base unit, so that the number of categories on the axis will be less than or equal to the value of the `MaxDateGroups` property (if it is set).

Using this feature will ignore the `BaseUnitStep`.

If you do not set the `BaseUnit`, its value is determined by the smallest interval between categories. In the example above, it is four days, which is less than a week, but more than a day, so the base unit will be `Days`.

>tip Avoid large intervals with short base units. This would result in a huge amount of categories and this can result in performance degradation, or even errors/crashes.

### Base Unit Step

If there are many categories, you can choose to render every n-th of them by setting the `BaseUnitStep` property.

### Week Start Day

When the `BaseUnit` is set to weeks, you can control the start day of the week through the `WeekStartDay` property. The `0` value is `Sunday`, `1` is `Monday` and so on.

### Labels Format

Each base unit has a default format for the date it displays. If you want to change it, use the `Format` property under the `TelerikChartCategoryAxisLabels` tag of the category axis.

>caption Steps set to weeks, changed weeks start day to Monday and non-default label format

````CSHTML
@using Telerik.Blazor.Components.Chart
@using Telerik.Blazor

<TelerikChart>

	<TelerikChartCategoryAxes>
		<TelerikChartCategoryAxis BaseUnit="ChartCategoryAxisBaseUnit.Weeks" WeekStartDay="1" Type="ChartCategoryAxisType.Date">
			<TelerikChartCategoryAxisLabels Format="{0:dd MMM}" />
		</TelerikChartCategoryAxis>
	</TelerikChartCategoryAxes>
	
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 1 (SUM)" Data="@chartData"
							Field="@nameof(MyDataModel.Product1)" CategoryField="@nameof(MyDataModel.MySharedCategories)" 
							Aggregate="ChartSeriesAggregate.Sum">
			<TelerikChartSeriesLabels Visible="true"></TelerikChartSeriesLabels>
		</TelerikChartSeries>
		<TelerikChartSeries Type="ChartSeriesType.Column" Name="Product 2 (COUNT)" Data="@chartData"
							Field="@nameof(MyDataModel.Product2)" Aggregate="ChartSeriesAggregate.Count">
			<TelerikChartSeriesLabels Visible="true"></TelerikChartSeriesLabels>
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

</TelerikChart>

@code {
	public class MyDataModel
	{
		public DateTime MySharedCategories { get; set; }
		public int Product1 { get; set; }
		public int Product2 { get; set; }
	}

	public List<MyDataModel> chartData = new List<MyDataModel>()
	{
		new MyDataModel() { MySharedCategories = new DateTime(2019, 11, 11), Product1 = 1, Product2 = 2 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 15), Product1 = 2, Product2 = 3 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 19), Product1 = 3, Product2 = 4 },
		new MyDataModel() { MySharedCategories = new DateTime(2019, 12, 28), Product1 = 4, Product2 = 5 },
	};
}
````

## See Also

  * [Data Binding a Chart]({%slug components/chart/databind%})
  * [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/index)
