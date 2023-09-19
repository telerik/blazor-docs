---
title: Label Template and Format
page_title: Chart - Label Template and Format
description: Use Label Template and Format their text in the Chart for Blazor.
slug: components/chart/label-template-format
tags: telerik,blazor,chart,label,template,format
published: true
position: 22
---

# Label Template and Format

The Chart for Blazor can render labels on the axes, series data points, and legend. You can control those labels through the values in the Chart `Data`, but also through [format strings](#format-strings) and [templates](#templates).

To turn on series labels, set their `Visible` property to `true` under the corresponding `ChartSeriesLabels` tag. The series labels are turned off by default to avoid clutter and to make the Chart easier to read.

## Format Strings

Where the labels are numerical (series values, the value axis), you can format those strings through the `Format` property of the corresponding labels inner tag. This lets you set [standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) to the values to showcase, for example, percentage, currency, and so on.

>caption Format numerical values through format strings

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Line"
                     Data="@ChartData"
                     Name="Revenue"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true" Format="{0:C2}"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisLabels Format="{0:C0}"></ChartValueAxisLabels>
        </ChartValueAxis>
    </ChartValueAxes>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    private List<ChartModel> ChartData = new List<ChartModel>
    {
        new ChartModel
        {
            Value = 20000,
            Category = "2017"
        },
        new ChartModel
        {

            Value = 300000,
            Category = "2018"
        },
        new ChartModel
        {
            Value = 400000,
            Category = "2019"
        }
    };

    public class ChartModel
    {
        public double Value { get; set; }
        public string Category { get; set; }
    }
}
````

## Templates

> This section changed for product version 4.5.0. If you are using an older version, then [download the PDF documentation](https://www.telerik.com/account/downloads/product-download?product=BLAZOR) for your version, or [browse an older version of this documentation page](https://github.com/telerik/blazor-docs/blob/4.4.0/components/chart/labels-template-and-format.md#templates).

To set a template for Chart labels, use the `Template` parameter in the corresponding inner `...Labels` tag. For example, set `Template` to `<ChartSeriesLabels>` inside `<ChartSeries>`, or to `<ChartValueAxisLabels>` inside `<ChartValueAxis>`.

The Blazor Chart uses client-side rendering and the label templates are JavaScript-based. The `Template` parameter must point to a name of a JavaScript function, which is defined in the global scope. This function must return the formatted label as a plain text string. HTML markup inside the label template is not supported.

The JavaScript function for each label template will receive an argument that exposes different properties, depending on the template type. The mechanism is similar to the `context` of Blazor `RenderFragment`s. The sections below list the available method argument properties:

* [Series labels](#series-label-template)
* [Category axis labels](#category-axis-label-template)
* [Value axis labels](#value-axis-label-template)
* [Legend item labels](#legend-item-label-template)
* [How to add new lines to label templates](#new-line-in-the-label-template)
* [Example for all types of label templates](#label-template-example)

### Series Label Template

The `Template` function of `ChartSeriesLabels` exposes the following fields in the template context:

* `category` - the category name. Available for area, bar, column, donut, line, pie series.
* `dataItem` - the original data item used to construct the point. Will be `null` if binding to array. Sample syntax: `context.dataItem.MyModelPropertyName`.
* `percentage` - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* `stackValue` - the cumulative point value on the stack. Available only for stackable series.
* `value` - the point value. Can be a number or object containing each bound field.

<!--* `series` - the data series-->
<!--* runningTotal - the sum of point values since the last "runningTotal" summary point. Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.-->

### Category Axis Label Template

The `Template` function of `CategoryAxisLabels` exposes the following fields in the template context:

* `value` - the category value
* `format` - the default format of the label

<!--* `dataItem` - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.-->
<!--* culture - the default culture (if set) on the label-->

### Value Axis Label Template

The `Template` function of `ValueAxisLabels` exposes the following fields in the template context:

* `value` - the label value

### Legend Item Label Template

The `Template` function of `ChartLegendLabels` exposes the following fields in the template context:

* `text` - the text of the legend item
* `series` - the data series object
* `value` - the point value. Available only for Donut and Pie charts.
* `percentage` - the point value represented as a number between 0 and 1. Available only for donut, pie and 100% stacked charts.

### New Line in the Label Template 

To add a new line in a label, use the new line character `\n`.

<div class="skip-repl"></div>

````JS
function chartLabelFunction(context) {
	return "foo \n " + contenxt.value;
}
````

### Label Template Example

>caption Using Chart label templates for series, axes and legend

````CSHTML
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@PhoneSales"
                     Name="Phones"
                     Color="orange"
                     Opacity="0.8"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"></ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@LaptopSales"
                     Name="Laptops"
                     Color="green"
                     Opacity="0.8"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis>
            <ChartCategoryAxisLabels Template="chartCategoryAxisLabelTemplate"></ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Max="16">
            <ChartValueAxisLabels Template="chartValueAxisLabelTemplate"></ChartValueAxisLabels>
        </ChartValueAxis>
    </ChartValueAxes>

    <ChartTitle Text="Sales per Product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Top">
        <ChartLegendLabels Template="chartLegendItemLabelTemplate"></ChartLegendLabels>
    </ChartLegend>
</TelerikChart>

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie"
                     Data="@PhoneSales"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTitle Text="Phone Sales per Quarter"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
        <ChartLegendLabels Template="pieLegendItemLabelTemplate"></ChartLegendLabels>
    </ChartLegend>
</TelerikChart>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function chartSeriesLabelTemplate(context) {
        return "Value: " + context.value + " mln\n" +
            "Category: " + context.category + "\n" +
            "Extra info: " + context.dataItem.ExtraData;
    }

    function chartCategoryAxisLabelTemplate(context) {
        return context.value + " Quarter";
    }

    function chartValueAxisLabelTemplate(context) {
        return context.value + " mln";
    }

    function chartLegendItemLabelTemplate(context) {
        return context.text + " (" + context.series.color + ")";
    }

    function pieLegendItemLabelTemplate(context) {
        return "&#8205;\n" + // prevent new line trimming
            "Text: " + context.text +
            "\nValue: " + context.value + " mln" +
            "\nPct: " + (context.percentage * 100).toFixed(2) + " %" +
            "\n&#8205;"; // prevent new line trimming
    }
</script>

@code {
    private List<ChartModel> PhoneSales = new List<ChartModel>()
    {
        new ChartModel
        {
            Category = "First",
            Value = 8.4,
            ExtraData = "one"
        },
        new ChartModel
        {
            Category = "Second",
            Value = 6.4,
            ExtraData = "two\nnew line"
        },
        new ChartModel
        {
            Category = "Third",
            Value = 11.8,
            ExtraData = "three"
        }
    };

    private List<ChartModel> LaptopSales = new List<ChartModel>()
    {
        new ChartModel
        {
            Category = "First",
            Value = 7.2,
            ExtraData = "one"
        },
        new ChartModel
        {
            Category = "Second",
            Value = 10.4,
            ExtraData = "two\nnew line"
        },
        new ChartModel
        {
            Category = "Third",
            Value = 7.6,
            ExtraData = "three"
        }
    };

    public class ChartModel
    {
        public string Category { get; set; }
        public double Value { get; set; }
        public string ExtraData { get; set; }
    }
}
````

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/index)
* [Format percentage in label for Pie or Donut Chart]({%slug chart-format-percent%})
* [Localize numeric Chart labels]({%slug chart-kb-localized-numeric-labels%})
* [Complex logic in Chart label format](https://github.com/telerik/blazor-ui/tree/master/chart/label-template)
