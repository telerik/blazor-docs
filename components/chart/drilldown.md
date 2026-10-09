---
title: DrillDown
page_title: DrillDown 
description: The DrillDown feature of the Telerik Chart for Blazor allows users to explore hierarchical data by initially displaying summarized information and to drill down into specific categories or data points for more detailed insights.
slug: chart-drilldown
tags: telerik,blazor,chart,drill,down,drilldown
published: true
position: 55
components: ["charts"]
---

# DrillDown Charts

The Telerik UI for Blazor Chart supports drilldown functionality for exploring data.

The drill-down feature allows the users to click on a data point (for example, bar, column, pie segment, etc.) to navigate to a different view that contains finer-grained data like breakdown by product of the selected category. The view hierarchy can be displayed in a [Breadcrumb](slug:breadcrumb-overview) for easy navigation back to previous views.

## Configuring DrillDown Charts

To configure Chart series for drill-down:

1. Prepare the data in the appropriate format. Each series data that will be drilled-down must contain a property of type `ChartSeriesDescriptor`. The descriptor includes all the parameters of the `ChartSeries` tag and acts as a container holding information about the series displayed upon user-initiated drill-down.
1. Specify the drilldown field (the `ChartSeriesDescriptor` field) of the series data by using the `ChartSeries.DrilldownField` or `ChartSeriesDescriptor.DrilldownField` property.

>caption Chart DrillDown

<demo metaUrl="client/chart/drilldown/overview/" height="500"></demo>

## Configuring Multiple DrillDown Levels

Set `DrilldownField` on the `<ChartSeries>` tag and on every intermediate `ChartSeriesDescriptor`. The `DrilldownField` value must name the property on each data item that contains the next `ChartSeriesDescriptor`. The descriptor at the last level does not need a `DrilldownField`.

The following example shows a three-level hierarchy:

````RAZOR.skip-repl
<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Column"
					 Data="@Companies"
					 Field="@nameof(CompanyModel.Sales)"
					 CategoryField="@nameof(CompanyModel.Name)"
					 DrilldownField="@nameof(CompanyModel.Details)" />
	</ChartSeriesItems>
</TelerikChart>

@code {
	private List<CompanyModel> Companies { get; set; } = new()
	{
		new CompanyModel
		{
			Name = "Company A",
			Sales = 100,
			Details = new ChartSeriesDescriptor
			{
				Name = "Company A Sales by Department",
				Type = ChartSeriesType.Column,
				Field = nameof(DepartmentModel.Sales),
				CategoryField = nameof(DepartmentModel.Name),
				DrilldownField = nameof(DepartmentModel.Details),
				Data = new List<DepartmentModel>
				{
					new DepartmentModel
					{
						Name = "Sales",
						Sales = 60,
						Details = new ChartSeriesDescriptor
						{
							Name = "Sales by Product",
							Type = ChartSeriesType.Column,
							Field = nameof(ProductModel.Sales),
							CategoryField = nameof(ProductModel.Name),
							Data = new List<ProductModel>
							{
								new ProductModel { Name = "Product 1", Sales = 30 },
								new ProductModel { Name = "Product 2", Sales = 30 }
							}
						}
					}
				}
			}
		}
	};

	public class CompanyModel
	{
		public string Name { get; set; }
		public decimal Sales { get; set; }
		public ChartSeriesDescriptor Details { get; set; }
	}

	public class DepartmentModel
	{
		public string Name { get; set; }
		public decimal Sales { get; set; }
		public ChartSeriesDescriptor Details { get; set; }
	}

	public class ProductModel
	{
		public string Name { get; set; }
		public decimal Sales { get; set; }
	}
}
````

When a later drill-down level does not open, check the following:

1. The descriptor displayed at the current level has a `DrilldownField`.
1. Every clicked data item has a non-null descriptor in that property.
1. `Field`, `CategoryField`, and `ColorField` match the properties of the objects in the descriptor's `Data` collection.
1. The field names match the serialized property names. With default serialization, use the C# property names, preferably through `nameof(...)`. If the application changes the serialized property names, use the serialized names instead, as described in the [Chart data binding article](slug:chart-data-bind#chart-model-with-jsonproperty).

## Configuring Breadcrumb Navigation

Optionally, you can display a Breadcrumb component to show the drill-down levels.

1. Declare a `TelerikChartBreadcrumb` component.
1. Set the `ChartId` parameter of the Breadcrumb. It must match the `Id` of the Chart that will be associated with the Breadcrumb.

>caption Configuring Breadcrumb for Chart Drilldown

<demo metaUrl="client/chart/drilldown/breadcrumb/" height="500"></demo>

## Reset Drilldown Level

To reset the drilldown level programmatically, use the `ResetDrilldownLevel` method of the Chart. To invoke the method, obtain a reference to the Chart instance with the `@ref` directive.

>caption Reset Chart Drilldown Level Programmatically

<demo metaUrl="client/chart/drilldown/reset-level/" height="500"></demo>

## See Also

* [Live Demo: DrillDown Charts](https://demos.telerik.com/blazor-ui/chart/drilldown-chart)
