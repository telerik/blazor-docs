---
title: Range Bar
page_title: Chart - Range Bar
description: Overview of the Range Bar Chart for Blazor with a description of the common use cases and the different ways to data bind the chart. The article lists configuration options and provides Range Bar Chart examples.
slug: components/chart/types/rangebar
tags: telerik,blazor,chart,rangebar
published: True
position: 0
---

# Range Bar Chart

The <a href="https://www.telerik.com/blazor-ui/range-bar-chart" target="_blank">Blazor Range Bar Chart</a> displays data as horizontal bars whose position and length vary according to pairs of `from` and `to` values. You can use a Range Bar Chart to show a comparison between several sets of data (for example, summaries of quantitative or time data). Each series is automatically colored differently for easier reading. The Range Bar Chart is similar to the [Bar Chart](slug://components/chart/types/bar), which can be regarded as a Range Bar Chart with zero `from` values.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating Blazor Range Bar Chart

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
2. Set the series `Type` parameter to `ChartSeriesType.RangeBar`.
3. Provide a data collection to the series `Data` parameter. You can use a [collection of arrays](#binding-range-bar-series-to-collection-of-arrays) or a [collection of custom objects](#binding-range-column-series-to-custom-objects).
4. If the Range Bar data is a collection of arrays, provide data for the `Categories` parameter of the `ChartCategoryAxis`.
5. (optional) Set `Visible="true"` or define [label `Template`](slug://components/chart/label-template-format) for `<ChartSeriesLabelsFrom>` or `<ChartSeriesLabelsTo>`. These are nested tags inside `<ChartSeriesLabels>` of the respective `<ChartSeries>`.

### Binding Range Bar Series to Collection of Arrays

Set the `ChartSeries` `Data` parameter to a `List` of arrays or a jagged array (an array of arrays). The inner arrays must have two members—a lower one for the `from` value, and a higher one for `to` value.

Set the `Categories` parameter of the `ChartCategoryAxis` to `object[]`. The members of this array will be used as labels for the category axis in their respective order.

>caption Blazor Range Bar Chart bound to arrays

````RAZOR
<TelerikChart>
    <ChartTitle Text="Sleep Hours by Age"></ChartTitle>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.RangeBar" Data="@SleepData">
            <ChartSeriesLabels>
                @* Show the From and To labels together *@

                <ChartSeriesLabelsFrom Visible="false" />
                <ChartSeriesLabelsTo Visible="true" />

                @* OR show the From and To labels separately *@

                @*<ChartSeriesLabelsFrom Visible="true" Template="#= dataItem[0] #" />
                    <ChartSeriesLabelsTo Visible="true" Template="#= dataItem[1] #" />*@
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@Categories"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Min="6"></ChartValueAxis>
    </ChartValueAxes>

    <ChartTooltip Visible="true">
        <Template>
            @{
                var dataItem = (int[])context.DataItem;
            }
            <span>@dataItem[0] - @dataItem[1] hours</span>
        </Template>
    </ChartTooltip>

</TelerikChart>

@code {
    private List<int[]> SleepData = new List<int[]>() {
        new int[] { 7, 8 },
        new int[] { 7, 9 },
        new int[] { 8, 10 },
        new int[] { 9, 12 },
        new int[] { 10, 13 },
        new int[] { 11, 14 },
        new int[] { 12, 16 },
        new int[] { 14, 17 },
    };

    private string[] Categories = new string[] {
        "60+ y", "18-60 y", "13-18 y", "6-12 y", "3-5 y", "1-2 y", "4-12 m", "0–3 m"
    };
}
````

### Binding Range Column Series to Custom Objects

1. Set the `ChartSeries` `Data` parameter to an `IEnumerable<T>`. 
1. Set the `FromField`, `ToField`, and `CategoryField` parameters of the `ChartSeries` to properties of the `T` type.

>caption Blazor Range Bar Chart bound to custom objects

````RAZOR
<TelerikChart>
    <ChartTitle Text="Sleep Hours by Age"></ChartTitle>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.RangeBar"
                     Data="@SleepData"
                     FromField="@(nameof(RangeBarModel.LowValue))"
                     ToField="@(nameof(RangeBarModel.HighValue))"
                     CategoryField="@(nameof(RangeBarModel.AgeGroup))">
            <ChartSeriesLabels>
                @* Show the From and To labels together *@

                <ChartSeriesLabelsFrom Visible="false" />
                <ChartSeriesLabelsTo Visible="true" />

                @* OR show the From and To labels separately *@

                @*<ChartSeriesLabelsFrom Visible="true" Template="#= dataItem.LowValue #" />
                    <ChartSeriesLabelsTo Visible="true" Template="#= dataItem.HighValue #" />*@
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis Min="6"></ChartValueAxis>
    </ChartValueAxes>

    <ChartTooltip Visible="true">
        <Template>
            @{
                var dataItem = (RangeBarModel)context.DataItem;
            }
            <span>@dataItem.LowValue - @dataItem.HighValue hours</span>
        </Template>
    </ChartTooltip>

</TelerikChart>

@code {
    private List<RangeBarModel> SleepData = new List<RangeBarModel>() {
        new RangeBarModel { LowValue = 7, HighValue = 8, AgeGroup = "60+ y" },
        new RangeBarModel { LowValue = 7, HighValue = 9, AgeGroup = "18-60 y" },
        new RangeBarModel { LowValue = 8, HighValue = 10, AgeGroup = "13-18 y" },
        new RangeBarModel { LowValue = 9, HighValue = 12, AgeGroup = "6-12 y" },
        new RangeBarModel { LowValue = 10, HighValue = 13, AgeGroup = "3-5 y" },
        new RangeBarModel { LowValue = 11, HighValue = 14, AgeGroup = "1-2 y" },
        new RangeBarModel { LowValue = 12, HighValue = 16, AgeGroup = "4-12 m" },
        new RangeBarModel { LowValue = 14, HighValue = 17, AgeGroup = "0-3 m" }
    };

    public class RangeBarModel
    {
        public string AgeGroup { get; set; }
        public int LowValue { get; set; }
        public int HighValue { get; set; }
    }
}
````

## Range Bar Chart Specific Appearance Settings

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`). The color controls the fill color of the area.

@[template](/_contentTemplates/chart/link-to-basics.md#color-field-bar-column)

@[template](/_contentTemplates/chart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)


## See Also

* [Live Demo: Range Bar Chart](https://demos.telerik.com/blazor-ui/chart/range-bar-chart)
