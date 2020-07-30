#context-parameter-information
* `DataItem` - provides the data model of the current series item. You need to cast it to the type from your data source, which needs to be serializable.
    * For [`OHLC`]({%slug stockchart-ohlc%}) and [`Candlestick`]({%slug stockchart-candlestick%}) chart types the `DataItem` will contain the information mapped to the `OpenField`, `CloseField`, `HighField` and `LowField` properties.
    * For [`Line`]({%slug stockchart-line%}), [`Area`]({%slug stockchart-area%}) and [`Column`]({%slug stockchart-column%}) the `DataItem` will contain the information mapped to the `Field` properties.
    * The `DataItem` will contain an aggregated value for the date, so in order to get it you can use the `Category` and parse it to `DateTime`.

* `Category` - provides information on the category the data point is located in. Since the Stock Chart has a date X axis the `Category` should be cast to `DateTime`.

* `SeriesIndex` - provides the index of the `<StockChartSeries>` the data point belongs to.

* `Percentage` - for the Stock Chart the value will always be `0`.

* `SeriesName` - bound to the Name parameter of the `<StockChartSeries>` the data point belongs to.

* `SeriesColor` - shows the RGB color of the Series the data point belongs to.

* `CategoryIndex` - shows the index of the data point's x-axis category.
#end


#shared-tooltip-parameter-settings
* `Background` - control the background color by applying a CSS color string, including HEX and RGB. By default the it will match the color for the category.

* `Color` - control the text color by applying a CSS color string, including HEX and RGB.
#end
