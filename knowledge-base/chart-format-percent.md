---
title: How to format the percent in a label for a pie or donut chart
description: How to format the percent in a label for a pie or donut chart.
type: how-to
page_title: How to format the percent in a label for a pie or donut chart
slug: chart-format-percent
position: 
tags: 
ticketid: 1419362
res_type: kb
components: ["charts"]
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
            <td>4.5.0+ (for older component versions, <a href="https://github.com/telerik/blazor-docs/blob/4.4.0/knowledge-base/chart-format-percent.md">browse an older version of this page</a>)</td>
        </tr>
    </tbody>
</table>

## Description

When you use templates to customize the appearance of the labels, you may need to implement some application logic there or to implement complex formatting of the numbers.

This article shows how to format the percent in a label for a pie or donut chart to have a desired number of decimals and to be a number between 0 and 100, instead of the default number between 0 and 1 that has many decimal places:

![Blazor Pie Chart Formatted Percent](images/pie-chart-formatted-percent.png)

## Solution

To customize the percentage display, you need to:

1. Use a [Chart label template](slug:components/chart/label-template-format#templates). Set the label template function name to the `Template` parameter of `ChartSeriesLabels`.

1. Use the [`percentage` field](slug:components/chart/label-template-format#series-label-template) of the JavaScript label template function's argument.

1. Implement the desired additional rounding/formatting in the JavaScript code.

>caption Format Pie Chart labels as percent

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie"
                     Data="@PieData"
                     Field="@nameof(PieChartModel.SegmentValue)"
                     CategoryField="@nameof(PieChartModel.SegmentName)">
            <ChartSeriesLabels Visible="true" Template="pieChartLabelTemplate" />
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTitle Text="Revenue per product" />

    <ChartLegend Position="ChartLegendPosition.Right" />
</TelerikChart>

<!-- Move JavaScript code to a separate JS file in production -->
<script suppress-error="BL9992">
    function pieChartLabelTemplate(context) {
        return context.value + " mln\n" + round(context.percentage * 100, 1) + "%";
    }

    // From https://www.jacklmoore.com/notes/rounding-in-javascript/
    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
</script>

@code {
    private List<PieChartModel> PieData = new List<PieChartModel>()
    {
        new PieChartModel
        {
            SegmentName = "Product 1",
            SegmentValue = 1
        },
        new PieChartModel
        {
            SegmentName = "Product 2",
            SegmentValue = 3
        },
        new PieChartModel
        {
            SegmentName = "Product 3",
            SegmentValue = 5
        }
    };

    public class PieChartModel
    {
        public string SegmentName { get; set; }
        public double SegmentValue { get; set; }
    }
}
````

## See Also

* [Knowledge Base article: How to localize numeric labels in the Chart](slug:chart-kb-localized-numeric-labels)
* [Sample project: Chart Label Template](https://github.com/telerik/blazor-ui/tree/master/chart/label-template)
