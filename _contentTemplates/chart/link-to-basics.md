#understand-basics-and-databinding-first
This article assumes you are familiar with the [chart basics]({%slug components/chart/overview%}) and [data binding]({%slug components/chart/databind%}).
#end

#color-field-bar-column
### Color Field

Bar and Column charts can take the color of the series item from the `ColorField` of the data source. You can pass a valid CSS color (for example, `#abcdef`, `#f00`, or `blue`).

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


#markers-line-scatter
### Markers

Each data item is denoted by a marker. You can control its settings through the child `ChartSeriesMarkers` tag of the series.

You can hide the markers by setting their `Visible` property to `false`.

The `Size` property is the size of the marker in pixels.

The `Type` property is a member of the `Telerik.Blazor.ChartSeriesMarkersType` enum:

* `Circle` - the default
* `Cross`
* `Square`
* `Triangle`

The `Rotation` property is the degrees with which the marker is rotated from its default orientation.
#end


#color-line-scatter
### Color

The color of the line and markers is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`).

You can control the color of the markers by using the `Background` property of the nested `ChartSeriesMarkers` tag.

#### ColorField

You can pass a `ColorField` to the chart as a part of the model, and the data points (markers) will use that color instead of the `Color` of the series or the `Background` of the markers settings.
#end


#line-style-line
### Line Style

You can render the lines between the points with different styles. The supported styles can be set via the `Style` property that takes a member of `Telerik.Blazor.ChartSeriesStyle` enum:

* `Normal`—This is the default style. It produces a straight line between data points.
* `Step`—The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* `Smooth`—This style causes the Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

>caption Comparison between the line styles

![](images/line-chart-step-and-smooth.png)
#end

#opacity-area-bubble
### Opacity

You can control how transparent the series fill is through the `Opacity` property. `0` means a completely transparent series, and `1` means a completely opaque (non-transparent) fill. You can use decimal values to set the desired transparency (for example, `Opacity="0.3"`).
#end


#tip-look-for-nested-tags
>tip To customize the chart, look for nested tags and heir properties - the inner tags will contain their parent tag name and add specifics to its end. For example, the `ChartSeries` tag has a `ChartSeriesLabels` tag that exposes configuration otions and more child tags.
#end


#configurable-nested-chart-settings
### Customize Chart Elements - Nested Tags Settings

When configuring nested properties and child elements in your chart, the inner tags will contain their parent tag name and add specifics to its end. In general the structure of such nested tags will be `<Chart*Category**Specifics*>` where the Category can be one of the following:
* SeriesItems
* CategoryAxes
* Title
* Legend
* ChartXAxes
* ChartYAxes
* and others

@[template](/_contentTemplates/chart/link-to-basics.md#tip-look-for-nested-tags)

#end

#configurable-nested-chart-settings-categorical

An example of this is the rotation the Labels of a [categorical]({%slug components/chart/databind%}#series-types) chart. You can use the

`ChartCategoryAxes` > `ChartCategoryAxis` > `ChartCategoryAxisLabels` > `ChartCategoryAxisLabelsRotation` tag

and set the `Angle` property to the desired value in degrees (they might be negative or positive numbers). By using similar approach you can take control over `ChartCategoryAxisLabelsMargin` (add margin for top, bottom, left and right), `ChartCategoryAxisLabelsPadding` (add padding for top, bottom, left and right) and others.

This approach is not limited only to the Labels - it can be used with all tags that are applicable for the chart type, for example the Chart Title `ChartTitle` > `ChartTitleMargin`.

#end

#configurable-nested-chart-settings-numerical

For example, for [numerical]({%slug components/chart/databind%}#series-types) charts you can rotate the Labels for `ChartXAxes` or `ChartYAxes` depending on your application design needs and layout. This can be done through the

`ChartXAxes` > `ChartXAxis` > `ChartXAxisLabelsRotation` tag

where you can set the `Angle` property to the desired value in degrees (they might be negative or positive numbers). By using similar approach you can take control over `ChartXAxisLabelsBorder` (add borders), `ChartXAxisLabelsMargin` (add margin for top, bottom, left and right) and others.

This approach is not limited only to the Labels - it can be used with to all tags that are applicable for the chart type, for example the Chart Title `ChartTitle` > `ChartTitleMargin`.

#end

#configurable-nested-chart-settings-axis-free

For example, for [axis-free]({%slug components/chart/databind%}#series-types) charts you can rotate their Labels, Title, Legend and others. Example for doing so is customizing the Chart Series Labels by using the parameters in the

`ChartSeriesItems` > `ChartSeries` > `ChartSeriesLabels` tag and its child tags.

This approach is not limited only to the Labels - it can be used with to all tags that are applicable for the chart type, for example the Chart Title `ChartTitle` > `ChartTitleMargin`.

#end
