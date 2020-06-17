#context-parameter-information
* `FormattedValue` - maps to the default rendering of the tooltip, formatted as a string.
 * Use this when the chart's data is bound by [Independent Series Binding]({%slug components/chart/databind%}#independent-series-binding). You can parse this to a numerical value (`int`, `double`, etc.) in order to apply formatting. Otherwise, use the `DataItem` to get the value of the point.

* `DataItem` - provides the data model of the current series item. You may need to cast it to its type. If you are using [Date Axis]({%slug components/chart/date-axis%}) the `DataItem` will contain the aggregated value.

* `Category` - provides information on the category the data point is located in. You may need to cast it to its type, for example `DateTime`, `string`, `int` or another type.

* `Percentage` - applicable to [Donut]({%slug components/chart/types/donut%}), [Pie]({%slug components/chart/types/pie%}) and [Stacked 100%]({%slug components/chart/stack%}#stack-100) Charts - the percentage value of the current data point from the whole.

* `SeriesIndex` - provides the index of the `<ChartSeries>` the data point belongs to.

* `SeriesName` - bound to the `Name` parameter of the `<ChartSeries>` the data point belongs to.

* `SeriesColor` - shows the RGB color of the Series the data point belongs to.

* `CategoryIndex` - shows the index of the data point's x-axis category.
#end


#shared-tooltip-parameter-settings
* `Background` - control the background color by applying a CSS color string, including HEX and RGB. By default the it will match the color for the category.

* `Color` - control the text color by applying a CSS color string, including HEX and RGB.

* `Opacity` - control the opacity of the tooltip.
#end
