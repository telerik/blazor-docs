---
title: Hide Pie Chart Category on Legend Click
description: Learn how to toggle (hide and show) a Pie Chart category (segment item) in Telerik UI for Blazor by clicking on the respective legend item.
type: how-to
slug: chart-kb-toggle-category-on-legend-item-click
tags: telerik, blazor, grid, filter
ticketid: 1718372
res_type: kb
components: ["chart"]
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

This KB shows how to toggle (hide and show) a Blazor Pie Chart category (segment item) when the user clicks on a legend item.

The same approach applies to Donut Charts too.

## Solution

1. Implement a Pie Chart model property, which determines the category visibility. In the example below, that's `Visible`.
1. Define the Pie Chart `Value` and `Color` model properties so that they depend on `Visible`. When the category is not visible, the value must be zero and the color can be gray or some other neutral color.
1. Use the [Chart `OnLegendItemClick` event](slug:chart-events#onlegenditemclick) to toggle the `Visible` property of the data item. Use `ChartLegendItemClickEventArgs.Text` from the event argument to determine the data item.
1. Use a [`ChartSeriesLabels` `Template`](slug:components/chart/label-template-format#series-label-template) to render `null` label text when the category is not visible. This aims to hide the zero value label of the category.
1. (optional) [Change the legend item text](slug:components/chart/label-template-format#legend-item-label-template) of hidden categories, if a neutral color is not enough for the users.

>caption Hide Pie Chart Category on Legend Click

````RAZOR
<TelerikChart OnLegendItemClick="@OnPieLegendItemClick"
              Transitions="false">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie"
                     Data="@PieData"
                     Field="@nameof(PieModel.Value)"
                     CategoryField="@nameof(PieModel.Category)"
                     ColorField="@nameof(PieModel.Color)">
            <ChartSeriesLabels Template="pieSeriesLabelTemplate"
                               Visible="true" />
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTitle Text="Chart Title" />

    <ChartLegend Position="ChartLegendPosition.Right">
        @* <ChartLegendLabels Template="pieLegendLabelTemplate" /> *@
    </ChartLegend>
</TelerikChart>

<script suppress-error="BL9992">
    /*function pieLegendLabelTemplate(context) {
        if (context.dataItem.Visible) {
            return context.text;
        } else {
            return context.text + " (*)";
        }
    }*/

    function pieSeriesLabelTemplate(context) {
        if (context.value > 0) {
            return context.value;
        } else {
            return null;
        }
    }
</script>

@code {
    #nullable enable

    private List<PieModel> PieData = new List<PieModel>
    {
        new PieModel
        {
            Category = "Mobile Phones",
            OriginalValue = 20
        },
        new PieModel
        {
            Category = "Tablets",
            OriginalValue = 11
        },
        new PieModel
        {
            Category = "Laptops",
            OriginalValue = 16
        },
        new PieModel
        {
            Category = "Computers",
            OriginalValue = 13
        },
        new PieModel
        {
            Category = "Accessories",
            OriginalValue = 17
        }
    };

    private void OnPieLegendItemClick(ChartLegendItemClickEventArgs args)
    {
        PieModel? segment = PieData.FirstOrDefault(x => x.Category == args.Text/*.Replace(" (*)", "")*/);

        if (segment != null)
        {
            segment.Visible = !segment.Visible;
        }
    }

    public class PieModel
    {
        public string Category { get; set; } = string.Empty;
        public string? Color => Visible ? null : "#eee";
        public double OriginalValue { get; set; }
        public double? Value => Visible ? OriginalValue : 0;
        public bool Visible { get; set; } = true;
    }
}
````

## See Also

* [Pie Chart](slug:components/chart/types/pie)
