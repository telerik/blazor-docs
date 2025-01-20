---
title: How to Show Empty Chart Instead of the Default No Data Template
description: Learn how to show an empty Chart component when there is no data, instead of displaying the default No Data template.
type: how-to
page_title: How to Show Empty Chart Instead of the Default No Data Template
slug: chart-kb-display-empty-chart
tags: charts, blazor, no data template, empty chart
res_type: kb
ticketid: 1675313
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

As of version 7.1.0 of Telerik UI for Blazor, the [No Data Template](slug://chart-no-data-template) was introduced for Charts in Blazor. In some scenarios, displaying an empty Chart, rather than the No Data template, is preferred when there is no data.

## Solution

To display an empty Chart when there is no data, [override the default theme styles](slug://themes-override) with custom CSS. The following example demonstrates how to achieve an empty Chart display by hiding the No Data Template overlay through CSS.

````RAZOR
<TelerikButton OnClick="@UpdateData">@ButtonContent</TelerikButton>
<br />
<TelerikChart @ref="ChartRef" Width="800px" Height="400px">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@ChartData"
                     Name="Product Sales"
                     Field="@nameof(ChartSeriesData.ProductSales)"
                     CategoryField="@nameof(ChartSeriesData.Year)">
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

<style>
    .k-chart-overlay {
        display: none;
    }
</style>

@code {
    private const string Add = "Add Data";
    private const string Remove = "Remove Data";

    private TelerikChart ChartRef { get; set; }
    private List<ChartSeriesData> ChartData { get; set; } = new ();
    private string ButtonContent { get; set; } = Add;

    private void UpdateData()
    {
        if (ChartData == null || ChartData?.Count() == 0)
        {
            ChartData = ChartSeriesData.GenerateData();
            ButtonContent = Remove;
        }
        else
        {
            // Clear the data
            ChartData = new List<ChartSeriesData>();
            ButtonContent = Add;
        }
        ChartRef.Refresh(); // Refresh the Chart
    }

    public class ChartSeriesData
    {
        public int ProductSales { get; set; }
        public int Year { get; set; }

        public static List<ChartSeriesData> GenerateData()
        {
            List<ChartSeriesData> data = new List<ChartSeriesData>
            {
                new ChartSeriesData { ProductSales = 120, Year = 2020 },
                new ChartSeriesData { ProductSales = 180, Year = 2021 },
                new ChartSeriesData { ProductSales = 150, Year = 2022 },
                new ChartSeriesData { ProductSales = 210, Year = 2023 },
                new ChartSeriesData { ProductSales = 90,  Year = 2024 }
            };

            return data;
        }
    }
}
````

## See Also

- [Blazor Charts Overview](slug://components/chart/overview)
- [Override Theme Styles](slug://themes-override)
