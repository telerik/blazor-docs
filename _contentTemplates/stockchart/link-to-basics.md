#understand-basics-and-databinding-first
This article assumes you are familiar with the [stock chart basics](slug:stockchart-overview) and [data binding](slug:stockchart-data-binding).
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

#end


#configurable-nested-chart-settings
### Customize Chart Elements - Nested Tags Settings

When configuring nested properties and child elements in your chart, the inner tags will contain their parent tag name and add specifics to its end. In general the structure of such nested tags will be `<StockChart*Category**Specifics*>` where the Category can be one of the following:

* CategoryAxis
* ChartArea
* Legend
* Navigator
* PlotArea
* SeriesItems
* Title
* Tooltip
* ValueAxis
* and others

@[template](/_contentTemplates/stockchart/link-to-basics.md#tip-look-for-nested-tags)

You can customize all aspects of the stock chart by using the settings provided by the nested tags.

For example:

`StockChartCategoryAxes` > `StockChartCategoryAxis` > `StockChartCategoryAxisLabels` tags

This approach can be used with all tags that are applicable for the Chart type.

#end