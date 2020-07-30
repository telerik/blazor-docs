#understand-basics-and-databinding-first
This article assumes you are familiar with the [stock chart basics]({%slug stockchart-overview%}) and [data binding]({%slug stockchart-data-binding%}).
#end


#tip-look-for-nested-tags
>tip To customize the chart, look for nested tags and their properties - the inner tags will contain their parent tag name and add specifics to its end. For example, the `StockChartSeries` tag has a `StockChartSeriesTooltip` tag that exposes configuration options and more child tags.
#end

#gap-and-spacing
### Gap and Spacing

You can control the distance between the categories that cluster a data point from each series. To do this, use the `Gap` property of the series. It is the distance between categories expressed as a percentage of the bar width.

To set the distance between the bars of different series in the same category, use the `Spacing` property. It is the space between the series items in one series category as a proportion of the width of a single series item.

To create overlap, set negative values.

You can configure the values of `Gap` and `Spacing` for the whole chart in the first series and they are applied for all categories and series items.

#end


#color-field-column-ohlc-candlestick
### Color Field

Column, OHLC and Candlestick charts can take the color of the series item from the `ColorField` of the data source. You can pass a valid CSS color (for example, `#abcdef`, `#f00`, or `blue`).

````CSHTML
Colors per series item

<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Bar" Data="@theData" ColorField="@nameof(MyChartDataModel.Color)"
							Field="@nameof(MyChartDataModel.ItemValue)" CategoryField="@nameof(MyChartDataModel.Category)" />
	</ChartSeriesItems>

	<ChartTitle Text="Revenue per product" />

	<ChartLegend Position="ChartLegendPosition.Right" />
</TelerikChart>

@code {
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
#end


#configurable-nested-chart-settings
### Customize Chart Elements - Nested Tags Settings

When configuring nested properties and child elements in your chart, the inner tags will contain their parent tag name and add specifics to its end. In general the structure of such nested tags will be `<StockChart*Category**Specifics*>` where the Category can be one of the following:
* SeriesItems
* CategoryAxes
* Title
* Legend
* and others

@[template](/_contentTemplates/stockchart/link-to-basics.md#tip-look-for-nested-tags)

You can customize all aspects of the stock chart by using the settings provided by the nested tags.

An example of this is the rotation the Labels. You can use the

`StockChartCategoryAxes` > `StockChartCategoryAxis` > `StockChartCategoryAxisLabels` > `StockChartCategoryAxisLabelsRotation` tag

and set the `Angle` property to the desired value in degrees (they might be negative or positive numbers). By using similar approach you can take control over `StockChartCategoryAxisLabelsMargin` (add margin for top, bottom, left and right), `StockChartCategoryAxisLabelsPadding` (add padding for top, bottom, left and right) and others.

This approach is not limited only to the Labels - it can be used with all tags that are applicable for the chart type, for example the Chart Title `StockChartTitle` > `StockChartTitleMargin`.

#end