---
title: Localize numeric labels in the Chart
description: How to localize numeric labels in the Chart
type: how-to
page_title: Localize numeric labels in the Chart
slug: chart-kb-localized-numeric-labels
position:
tags:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Chart for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>4.5.0+ (for older versions, <a href="https://github.com/telerik/blazor-docs/blob/4.4.0/knowledge-base/chart-localized-labels.md">browse and older version of this page</a>)</td>
        </tr>
    </tbody>
</table>

## Description

How to localize the labels of a Telerik Blazor Chart?

I want to make my Chart labels localization aware.

## Solution

There are two different approaches:

* [Use the Format Parameter](#using-the-format-parameter)
* [Use the Template Parameter](#using-the-template-parameter)

### Using the Format Parameter

If you need to use only the value of the series item, and a single line of text, you can use the [`Format`](slug:components/chart/label-template-format#format-strings) parameter of the `<ChartSeriesLabels>` tag. It takes a [standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) and is localization aware.

### Using the Template Parameter

If you want to render more information in the label, you can utilize the [`Template`](slug:components/chart/label-template-format#templates) parameter of the `<ChartSeriesLabels>` tag. In a JavaScript file, implement the desired number formatting by using the `toLocaleString` JavaScript method. Below is a sample implementation.


1. Use a [Chart label template](slug:components/chart/label-template-format#templates).

1. Implement the desired number formatting in a JavaScript function. For example, use the [`toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) method.

1. Call the custom formatting function from the template function and pass the needed arguments to it. The template function must return the string you want to show in the template.

#### Localize numeric labels in the Chart using the Template parameter

````RAZOR
<TelerikChart>

    <ChartLegend Visible="true"
                 Position="ChartLegendPosition.Top"></ChartLegend>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Donut"
                     Data="@ChartData"
                     Field="@nameof(ChartModel.Value)"
                     CategoryField="@nameof(ChartModel.XValue)"
                     ColorField="@nameof(ChartModel.BackgroundColor)"
                     StartAngle="270">
            <ChartSeriesLabels Visible="true"
                               Position="ChartSeriesLabelsPosition.OutsideEnd"
                               Template="chartSeriesLabelTemplate">
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

</TelerikChart>

<!-- Move JavaScript functions to a separate JS file in production -->
<script suppress-error="BL9992">
    var cultureInfo = "@System.Threading.Thread.CurrentThread.CurrentUICulture";

    function chartSeriesLabelTemplate(context) {
        return "localized label: " + formatNumberLocale(context.value, cultureInfo, 2);
    }

    function formatNumberLocale(number, locale, decimals){
        return number.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
</script>

@code {
    private List<ChartModel> ChartData = new List<ChartModel>()
    {
        new ChartModel { XValue = "Item", Value = 1.1223523525m, BackgroundColor = "red" },
        new ChartModel { XValue = "Item 2", Value = 2.542342424m, BackgroundColor = "green" },
        new ChartModel { XValue = "Item 3", Value = 3.141592653589793238m, BackgroundColor = "blue" }
    };

    public class ChartModel
    {
        public string XValue { get; set; }
        public decimal Value { get; set; }
        public string BackgroundColor { get; set; }
    }
}
````

## See Also

* [Knowledge Base article: How to format the percent in a label for a Pie or Donut Chart](slug:chart-format-percent)
