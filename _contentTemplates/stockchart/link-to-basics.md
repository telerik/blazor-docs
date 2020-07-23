#understand-basics-and-databinding-first
This article assumes you are familiar with the [stock chart basics]({%slug stockchart-overview%}) and [data binding]({%slug stockchart-data-binding%}).
#end


#tip-look-for-nested-tags
>tip To customize the chart, look for nested tags and their properties - the inner tags will contain their parent tag name and add specifics to its end. For example, the `StockChartSeries` tag has a `StockChartSeriesTooltip` tag that exposes configuration options and more child tags.
#end


#configurable-nested-chart-settings
### Customize Chart Elements - Nested Tags Settings

When configuring nested properties and child elements in your chart, the inner tags will contain their parent tag name and add specifics to its end. In general the structure of such nested tags will be `<StockChart*Category**Specifics*>` where the Category can be one of the following:
* SeriesItems
* CategoryAxes
* Title
* Legend
* and others

@[template](/_contentTemplates/chart/link-to-basics.md#tip-look-for-nested-tags)

#end

#configurable-nested-chart-settings

You can customize all aspects of the stock chart by using the settings provided by the nested tags.

An example of this is the rotation the Labels. You can use the

`StockChartCategoryAxes` > `StockChartCategoryAxis` > `StockChartCategoryAxisLabels` > `StockChartCategoryAxisLabelsRotation` tag

and set the `Angle` property to the desired value in degrees (they might be negative or positive numbers). By using similar approach you can take control over `StockChartCategoryAxisLabelsMargin` (add margin for top, bottom, left and right), `StockChartCategoryAxisLabelsPadding` (add padding for top, bottom, left and right) and others.

This approach is not limited only to the Labels - it can be used with all tags that are applicable for the chart type, for example the Chart Title `StockChartTitle` > `StockChartTitleMargin`.

#end