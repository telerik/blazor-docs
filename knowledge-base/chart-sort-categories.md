---
title: Sort Chart Categories
description: How to sort horizontal axis categories in the Telerik Chart for Blazor, depending on data point values?
type: how-to
page_title: How to Sort Blazor Chart Categories
slug: chart-kb-sort-categories
tags: blazor, chart
ticketid: 1677715
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
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to sort a stacked Chart by category total values?
* How to order the Telerik Blazor Chart categories by the aggregated sum values of the data items?
* How do you sort a stacked column Chart by category totals?

## Solution

The Chart sorts its categories by their order of appearance in the data. To reorder the categories, you need to reorder the Chart data items, so that the `CategoryField` values occur in the same order as the desired category order.

The example below sorts the categories (`Company`) by the stacked value (sum) of each company's `Revenue` for all its `Product`s.

>caption Sort Chart categories by sorting Chart data items

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        @for (int s = 1; s <= ProductCount; s++)
        {
            <ChartSeries @key="@s"
                         Type="ChartSeriesType.Column"
                         Data="@ChartData.Where( x => x.Product == $"Product {s}" ).ToList()"
                         CategoryField="@nameof(SalesData.Company)"
                         Field="@nameof(SalesData.Revenue)"
                         Name="@( $"Product {s}" )">
                <ChartSeriesStack Enabled="true" Group="default" />
                <ChartSeriesTooltip Visible="true" />
            </ChartSeries>
        }
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis>
            <ChartValueAxisLabels Format="c2" />
        </ChartValueAxis>
    </ChartValueAxes>

    <ChartTitle Text="Revenue per Company and Product"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right">
    </ChartLegend>
</TelerikChart>

@code {
    private List<SalesData> ChartData { get; set; } = new();

    private Dictionary<string, decimal> SortedTotalRevenues { get; set; } = new();

    private const int CompanyCount = 5;
    private const int ProductCount = 3;

    protected override void OnInitialized()
    {
        for (int i = 1; i <= CompanyCount; i++)
        {
            for (int j = 1; j <= ProductCount; j++)
            {
                ChartData.Add(new SalesData()
                {
                    Product = $"Product {j}",
                    Revenue = Random.Shared.Next(1, 1000),
                    Company = $"Company {i}"
                });
            }
        }

        ChartData = ChartData
            .GroupBy(dataItem => dataItem.Company)
            .Select(group => new { Company = group.Key, TotalRevenue = group.Sum(groupItem => groupItem.Revenue), Data = group.ToList() })
            .OrderBy(anonymousObject => anonymousObject.TotalRevenue)
            .SelectMany(anonymousObject => anonymousObject.Data)
            .ToList();
    }

    public class SalesData
    {
        public int Id { get; set; }
        public string Product { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }
}
````

## See Also

* [How to display a stacked series sum label in the Telerik Blazor Chart](slug:chart-kb-stacked-series-sum-label)
* [Chart Series Stacking](slug:components/chart/stack)
