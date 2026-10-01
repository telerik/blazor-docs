---
title: Format PieChart Tooltip Values as Currency
description: Format Telerik Chart for Blazor PieChart tooltip values as currency.
type: how-to
page_title: How to Format PieChart Tooltip Values as Currency
slug: chart-kb-tooltip-currency-format
position:
tags: telerik, blazor, chart, piechart, tooltip, currency, format
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
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Display a PieChart tooltip value as currency with a custom tooltip template.

## Solution

Bind the series to a model and format the value from `context.DataItem` in the tooltip `Template`. The `C2` format displays the currency symbol and two decimal places according to the current culture.

>caption Format a PieChart tooltip value as currency

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie"
                     Data="@PieData"
                     Field="@nameof(PiePoint.Value)"
                     CategoryField="@nameof(PiePoint.Category)">
            <ChartSeriesTooltip Visible="true">
                <Template>
                    @{
                        var point = (PiePoint)context.DataItem;
                    }
                    @point.Category: @point.Value.ToString("C2")
                </Template>
            </ChartSeriesTooltip>
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private List<PiePoint> PieData { get; set; } = new List<PiePoint>
    {
        new PiePoint { Category = "Product 1", Value = 1250.50m },
        new PiePoint { Category = "Product 2", Value = 980.00m }
    };

    public class PiePoint
    {
        public string Category { get; set; }
        public decimal Value { get; set; }
    }
}
````

If the series uses independent array binding instead of a data model, use `context.FormattedValue` in the tooltip template and parse it with the appropriate culture before applying a currency format.

## See Also

* [Chart Tooltip](slug:chart-tooltip-overview)
* [Pie Chart](slug:components/chart/types/pie)
