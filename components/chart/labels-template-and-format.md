---
title: Label Template and Format
page_title: Chart - Label Template and Format
description: Use Label Template and Format their text in the Chart for Blazor.
slug: components/chart/label-template-format
tags: telerik,blazor,chart,label,template,format
published: true
position: 22
components: ["charts"]
---

# Label Template and Format

The Chart for Blazor can render labels on the axes, series data points, and legend. You can control those labels through the values in the Chart `Data`, but also through [format strings](#format-strings) and [templates](#templates), including [accessible aria templates](#series-label-aria-template).

To turn on series labels, set their `Visible` property to `true` under the corresponding `ChartSeriesLabels` tag. The series labels are turned off by default to avoid clutter and to make the Chart easier to read.

## Format Strings

Where the labels are numerical (series values, the value axis), you can format those strings through the `Format` property of the corresponding labels inner tag. This lets you set [standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) to the values to showcase, for example, percentage, currency, and so on.

>caption Format numerical values through format strings

<demo metaUrl="client/chart/labels-template-and-format/format-strings/" height="420"></demo>

## Templates

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

`AriaTemplate` requires the [Chart to render as SVG](slug:chart-rendering-modes) (the default behavior).

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

<demo metaUrl="client/chart/labels-template-and-format/categorical-templates/" height="900"></demo>

### Label Template in Numerical Charts

>caption Using numerical Chart label templates for series, axes and legend

<demo metaUrl="client/chart/labels-template-and-format/numerical-templates/" height="480"></demo>

### Hide Label Conditionally

In some cases, you want the series to have labels, but certain data points must not have a label. For example, in a [stacked series](slug:components/chart/stack) where a certain value is `0`.

To do that, you need to:

* Add conditional logic in the template that renders the desired content when your condition is met, and returns an empty string when it is not.
* Ensure the label background is `transparent` so there are no leftover spots on the Chart.

>caption Hide Chart labels with zero value

<demo metaUrl="client/chart/labels-template-and-format/hide-label-conditionally/" height="420"></demo>

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
* [Format percentage in label for Pie or Donut Chart](slug:chart-format-percent)
* [Localize numeric Chart labels](slug:chart-kb-localized-numeric-labels)
* [Complex logic in Chart label format](https://github.com/telerik/blazor-ui/tree/master/chart/label-template)
