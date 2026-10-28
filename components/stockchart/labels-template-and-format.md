---
title: Label Template and Format
page_title: StockChart - Label Template and Format
description: Learn how to use the Label Template in the Blazor StockChart and to format the labels of the axes and the navigator.
slug: stockchart-labels-format-template
tags: telerik,blazor,stock,stockchart,chart,label,template,format,customize
published: true
position: 23
components: ["stockchart"]
---

# Label Template and Format

The StockChart for Blazor can render labels on the axes and the navigator. You can control these texts not only through the values you bind to data but also through [format strings](#format-strings) or [templates](#templates).

You can also rotate the labels by setting the `Angle` parameter to a numeric value the labels will rotate to.

In this article:
* [Format Strings](#format-strings)
* [Templates](#templates)

## Format Strings

You can use the `Format` parameter to apply standard [numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) and [date and time format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings).

>caption Format the labels on the Value and Category Axes

<demo metaUrl="client/stockchart/labels-template-and-format/example-1/" height="520"></demo>

## Templates

You can use the `Template` parameter to apply more complex formatting to the labels in the StockChart for Blazor. The syntax of the template is based on the [Kendo Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview). The labels are not HTML elements so the `Template` cannot contain arbitrary HTML elements. If you want to add a new line, use the `\n` symbol instead of a block HTML element. 

To format the values, you need to call a JavaScript function that will return the desired new string based on the template value you pass to it. You can find examples of this in the [How to format the percent in a label for a pie or donut chart](slug:chart-format-percent) knowledge base article and the [Label Format - Complex Logic](https://github.com/telerik/blazor-ui/tree/master/chart/label-template) sample project.

### Template Fields

In a *category axis* label template, you can use the following fields:

* `value` - the category value
* `format` - the default format of the label

<!--* `dataItem` - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.-->
<!--* culture - the default culture (if set) on the label-->

In a *value axis* label template, you can use the following fields:

* `value` - the label value

### Example

>tip The template syntax works the same way for the Telerik UI for Blazor Chart and StockChart.

>caption Custom templates in labels

<demo metaUrl="client/stockchart/labels-template-and-format/example-2/" height="520"></demo>


## See Also

* [Live Demos: StockChart](https://demos.telerik.com/blazor-ui/stockchart/overview)
