#understand-basics-and-databinding-first
This article assumes you are familiar with the [chart basics]({%slug components/chart/overview%}) and [data binding]({%slug components/chart/databind%}).
#end

#color-field-bar-column
### Color Field

Bar and Column charts can take the color of the series item from the `ColorField` of the data source. You can pass a valid CSS color (for example, `#abcdef`, `f00`, or `blue`).

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Chart

<TelerikChart>
	<TelerikChartSeriesItems>
		<TelerikChartSeries Type="ChartSeriesType.Bar" Data="@theData" ColorField="@nameof(MyChartDataModel.Color)"
							Field="@nameof(MyChartDataModel.ItemValue)" CategoryField="@nameof(MyChartDataModel.Category)">
		</TelerikChartSeries>
	</TelerikChartSeriesItems>

	<TelerikChartTitle Text="Revenue per product"></TelerikChartTitle>

	<TelerikChartLegend Position="ChartLegendPosition.Right">
	</TelerikChartLegend>
</TelerikChart>

@functions {
	public class MyChartDataModel
	{
		public string Category { get; set; }
		public double ItemValue { get; set; }
		public string Color { get; set; }
	}
	public List<MyChartDataModel> theData = new List<MyChartDataModel>
{
		new MyChartDataModel
		{
			Category = "Product 1",
			ItemValue = 2,
			Color = "red"
		},
		new MyChartDataModel
		{
			Category = "Product 2",
			ItemValue = 3,
			Color = "#00ff00"
		},
		new MyChartDataModel
		{
			Category = "Product 3",
			ItemValue = 4,
			Color = "#00f"
		}
	};
}
````

>caption The result from the code snippet above

![](images/color-field-bar-column-chart.png)

#end

#gap-and-spacing
### Gap and Spacing

You can control the distance between the categories that cluster a data point from each series. To do this, use the `Gap` property of the series. It is the distance between categories expressed as a percentage of the bar width.

To set the distance between the bars of different series in the same category, use the `Spacing` property. It is the space between the series items in one series category as a proportion of the width of a single series item.

To create overlap, set negative values.

You can configure the values of `Gap` and `Spacing` for the whole chart in the first series and they are applied for all categories and series items.

>caption  Configuring Gap and Spacing in a Column chart. 'g' and 's' are the values of Gap and Spacing respectively and 'x' is the width of the series item. For this chart g = 2 and s = 1.

![](images/gap-and-spacing.png)
#end


#do-not-mix-modes-buttons
@[template](/_templates/common/render-mode.md#do-not-mix-modes "control: @{control}")
>
>RadButton, RadCheckBox, RadImageButton, RadLinkButton, RadPushButton and RadToggleButton share the same rendering and stylesheets, so all their instances on the same page must have `RenderMode=Lightweight` because this is the only mode supported by all of these controls.
#end


#intro-all
**@{control}** has different render modes that can change the actual HTML markup that is rendered.	They are exposed via the **RenderMode** property that can have four	possible values - **Classic**, **Lightweight**, **Mobile** and **Auto**. This functionality was introduced in the **@{version}** version.

The possible options are:
#end
