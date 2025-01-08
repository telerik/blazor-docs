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

The Chart for Blazor can render labels on the axes, series data points, and legend. You can control those labels through the values in the Chart `Data`, but also through [format strings](#format-strings) and [templates](#templates), including [accessible aria templates](#series-label-aria-template).

To turn on series labels, set their `Visible` property to `true` under the corresponding `ChartSeriesLabels` tag. The series labels are turned off by default to avoid clutter and to make the Chart easier to read.

## Format Strings

Where the labels are numerical (series values, the value axis), you can format those strings through the `Format` property of the corresponding labels inner tag. This lets you set [standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) to the values to showcase, for example, percentage, currency, and so on.

>caption Format numerical values through format strings

````RAZOR
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
    * [Aria template](#series-label-aria-template)
* [Category axis labels](#category-axis-label-template) (for categorical Charts)
* [X axis labels](#x-axis-label-template) (for numerical Charts)
* [Value and Y axis labels](#value-and-y-axis-label-template)
* [Legend item labels](#legend-item-label-template)
* [How to add new lines to label templates](#new-line-in-the-label-template)
* [Example for categorical Charts](#label-template-in-categorical-charts)
* [Example for numerical Charts](#label-template-in-numerical-charts)

### Series Label Template

The `Template` function of `ChartSeriesLabels` exposes the following fields in the template context:

* `category` - the category name. Available for Area, Bar, Column, Donut, Line, and Pie series.
* `dataItem` - the original data item used to construct the point. Will be `null` if binding to array. Sample syntax: `context.dataItem.MyPropertyName`.
* `percentage` - the point value represented as a percentage value. Available only for Donut, Pie and 100% stacked charts.
* `stackValue` - the cumulative point value on the stack. Available only for stackable series.
* `value` - the point value. Can be a number for categorical series or an object with `x` and `y` properties for numerical series.

<!--* `series` - the data series-->
<!--* runningTotal - the sum of point values since the last "runningTotal" summary point. Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.-->

### Series Label Aria Template

The `AriaTemplate` parameter of `ChartSeriesLabels` allows the app to provide a unique accessible description for each Chart data point. The idea of `AriaTemplate` is to provide more detailed and contextual information to the user, compared to the default series labels. For example, the `AriaTemplate` can mention the data point category, rather than just the value. The accessible `AriaTemplate` renders as an `aria-label` HTML attribute, which screen readers will announce when the [respective Chart series data point is focused](https://demos.telerik.com/blazor-ui/chart/keyboard-navigation). The JavaScript function exposes the same fields in the template context, as the [series label template](#series-label-template) above.

When `AriaTemplate` is not defined, the Chart renders accessible data point labels that match the [series label template](#series-label-template). If a series label template is also not defined, the Chart renders an accessible data point label that matches the default series label.

`AriaTemplate` requires the [Chart to render as SVG](slug://chart-rendering-modes) (the default behavior).

### Category Axis Label Template

The `Template` function of `CategoryAxisLabels` exposes the following fields in the template context:

* `count` - the number of labels on the axis
* `format` - the numeric or date format of the label
* `index` - the order index of the label
* `text` - the label string if no template is used
* `value` - the category value as a string, number or JavaScript `Date` object

### X Axis Label Template

The `Template` function of `XAxisLabels` exposes the following fields in the template context:

* `count` - the number of labels on the axis
* `format` - the numeric or date format of the label
* `index` - the order index of the label
* `text` - the label string if no template is used
* `value` - the label as a number or JavaScript `Date` object

<!--* `dataItem` - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.-->
<!--* culture - the default culture (if set) on the label-->

### Value and Y Axis Label Template

The `Template` function of `ValueAxisLabels` and `YAxisLabels` exposes the following fields in the template context:

* `count` - the number of labels on the axis
* `format` - the default or specified format of the label
* `index` - the order index of the label
* `text` - the label string if no template is used
* `value` - the numeric representation of the label

### Legend Item Label Template

The `Template` function of `ChartLegendLabels` exposes the following fields in the template context:

* `text` - the text of the legend item
* `series` - the data series object
* `value` - the data point value. Available only for Donut and Pie charts.
* `percentage` - the data point value as a number between 0 and 1. Available only for Donut, Pie and 100% stacked charts.

### New Line in the Label Template 

To add a new line in the label, use the new line character `\n`.

<div class="skip-repl"></div>

````JS
function chartLabelFunction(context) {
	return "foo \n " + contenxt.value;
}
````

### Label Template in Categorical Charts

>caption Using categorical Chart label templates for series, axes and legend

````RAZOR
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
                               Template="chartSeriesLabelTemplate"
                               AriaTemplate="chartSeriesAriaTemplate"></ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@LaptopSales"
                     Name="Laptops"
                     Color="green"
                     Opacity="0.8"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"
                               AriaTemplate="chartSeriesAriaTemplate"></ChartSeriesLabels>
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
                               Template="chartSeriesLabelTemplate"
                               AriaTemplate="chartSeriesAriaTemplate"></ChartSeriesLabels>
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

    function chartSeriesAriaTemplate(context) {
        return "Value " + context.value + " mln, " +
            "Category: " + context.category + ", " +
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
    private List<ChartModel> PhoneSales = new List<ChartModel>() {
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

    private List<ChartModel> LaptopSales = new List<ChartModel>() {
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
        public string Category { get; set; } = string.Empty;
        public double Value { get; set; }
        public string ExtraData { get; set; } = string.Empty;
    }
}
````

### Label Template in Numerical Charts

>caption Using numerical Chart label templates for series, axes and legend

````RAZOR
<TelerikChart>
    <ChartTitle Text="Signal Level vs. Errors per Minute"></ChartTitle>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@Series1Data"
                     Name="APSK modulation"
                     XField="@nameof(ChartModel.Signal)"
                     YField="@nameof(ChartModel.Errors)"
                     Color="red">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"
                               AriaTemplate="chartSeriesAriaTemplate" />
        </ChartSeries>

        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@Series2Data"
                     Name="QAM modulation"
                     XField="@nameof(ChartModel.Signal)"
                     YField="@nameof(ChartModel.Errors)"
                     Color="blue">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"
                               AriaTemplate="chartSeriesAriaTemplate" />
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis Min="-95" Max="-70" AxisCrossingValue="@(new object[] { -95 })">
            <ChartXAxisLabels Template="chartXAxisLabelTemplate" />
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis Max="25" MajorUnit="5">
            <ChartYAxisLabels Template="chartYAxisLabelTemplate" />
        </ChartYAxis>
    </ChartYAxes>

    <ChartLegend Position="ChartLegendPosition.Top">
        <ChartLegendLabels Template="chartLegendItemLabelTemplate"></ChartLegendLabels>
    </ChartLegend>
</TelerikChart>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function chartSeriesLabelTemplate(context) {
        return "X Value: " + context.value.x + "\n" +
            "Y Value: " + context.value.y + "\n" +
            "Extra info: " + context.dataItem.ExtraData;
    }

    function chartSeriesAriaTemplate(context) {
        return "X Value: " + context.value.x + ", " +
            "Y Value: " + context.value.y + ", " +
            "Extra info: " + context.dataItem.ExtraData;
    }

    function chartXAxisLabelTemplate(context) {
        return context.value + " dBm " +
            "(" + (context.index + 1) + "/" + context.count +")";
    }

    function chartYAxisLabelTemplate(context) {
        return context.value + " " +
            "(" + (context.index + 1) + "/" + context.count +")";
    }

    function chartLegendItemLabelTemplate(context) {
        return context.text + " (" + context.series.color + ")";
    }
</script>

@code {
    private List<ChartModel> Series1Data { get; set; } = new List<ChartModel>() {
       new ChartModel() { Signal = -92, Errors = 15, ExtraData = "foo 1" },
       new ChartModel() { Signal = -84, Errors = 7, ExtraData = "bar 1" },
       new ChartModel() { Signal = -75, Errors = 1, ExtraData = "baz 1" }
    };

    private List<ChartModel> Series2Data { get; set; } = new List<ChartModel>() {
       new ChartModel() { Signal = -88, Errors = 18, ExtraData = "foo 2" },
       new ChartModel() { Signal = -78, Errors = 12, ExtraData = "bar 2" },
    };

    public class ChartModel
    {
        public decimal Signal { get; set; }
        public int Errors { get; set; }
        public string ExtraData { get; set; } = string.Empty;
    }
}
````

### Hide Label Conditionally

In some cases, you want the series to have labels, but certain data points must not have a label. For example, in a [stacked series](slug://components/chart/stack) where a certain value is `0`.

To do that, you need to:

* Add conditional logic in the template that renders the desired content when your condition is met, and returns an empty string when it is not.
* Ensure the label background is `transparent` so there are no leftover spots on the Chart.

>caption Hide Chart labels with zero value

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@ChartData"
                     Name="Product 1 Sales"
                     Field="@nameof(ChartModel.Value1)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"
                               Background="transparent"></ChartSeriesLabels>
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@ChartData"
                     Name="Product 2 Sales"
                     Field="@nameof(ChartModel.Value2)"
                     CategoryField="@nameof(ChartModel.Category)">
            <ChartSeriesLabels Visible="true"
                               Template="chartSeriesLabelTemplate"
                               Background="transparent"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function chartSeriesLabelTemplate(context) {
        if (context.value != 0) {
            return context.value + " mln";
        }
        else {
            return "";
        }
    }
</script>

@code {
    private List<ChartModel> ChartData = new List<ChartModel>()
    {
        new ChartModel
        {
            Value1 = 3,
            Value2 = 2,
            Category = "Q1"
        },
        new ChartModel
        {
            Value1 = 1,
            Value2 = 0,
            Category = "Q2"
        },
        new ChartModel
        {
            Value1 = 0,
            Value2 = 0,
            Category = "Q3"
        }
    };

    public class ChartModel
    {
        public double Value1 { get; set; }
        public double Value2 { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
* [Format percentage in label for Pie or Donut Chart](slug://chart-format-percent)
* [Localize numeric Chart labels](slug://chart-kb-localized-numeric-labels)
* [Complex logic in Chart label format](https://github.com/telerik/blazor-ui/tree/master/chart/label-template)
