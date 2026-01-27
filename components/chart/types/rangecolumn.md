---
title: Range Column
page_title: Chart - Range Column
description: Overview of the Range Column Chart for Blazor with a description of the common use cases and the different ways to data bind the chart. The article lists configuration options and provides Range Column Chart examples.
slug: components/chart/types/rangecolumn
tags: telerik,blazor,chart,rangecolumn
published: True
position: 0
components: ["charts"]
---
# Range Column Chart

The <a href="https://www.telerik.com/blazor-ui/range-column-chart" target="_blank">Blazor Range Column Chart</a> displays data as vertical bars whose position and height vary according to pairs of `from` and `to` values. You can use a Range Column Chart to show a comparison between several sets of data (for example, summaries of quantities or measurements for different time periods). Each series is automatically colored differently for easier perception. The Range Column Chart is similar to the [Column Chart](slug:components/chart/types/column), which can be regarded as a Range Column Chart with zero `from` values.

@[template](/_contentTemplates/chart/link-to-basics.md#understand-basics-and-databinding-first)

## Creating Blazor Range Column Chart

1. Add a `ChartSeries` to the `ChartSeriesItems` collection.
2. Set the series `Type` parameter to `ChartSeriesType.RangeColumn`.
3. Provide a data collection to its `Data` property. You can use a [collection of arrays](#binding-range-column-series-to-collection-of-arrays) or a [collection of custom objects](#binding-range-column-series-to-custom-objects).
4. If the Range Column data is a collection of arrays, provide data for the `Categories` parameter of the `ChartCategoryAxis`.
5. (optional) Set `Visible="true"` or define [label `Template`](slug:components/chart/label-template-format) for `<ChartSeriesLabelsFrom>` or `<ChartSeriesLabelsTo>`. These are nested tags inside `<ChartSeriesLabels>` of the respective `<ChartSeries>`.

### Binding Range Column Series to Collection of Arrays

Set the `ChartSeries` `Data` parameter to a `List` of arrays or a jagged array (an array of arrays). The inner arrays must have two members—one for the smaller `from` value, and one for the greater `to` value.

Set the `Categories` parameter of the `ChartCategoryAxis` to `object[]`. The members of this array will be used as labels for the category axis in their respective order.

>caption Blazor Range Column Chart bound to arrays

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Name="University 1"
                     Data="@StudentScores1"
                     Type="ChartSeriesType.RangeColumn">
            <ChartSeriesLabels>
                <ChartSeriesLabelsFrom Visible="true" />
                <ChartSeriesLabelsTo Visible="false" />
            </ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Name="University 2"
                     Data="@StudentScores2"
                     Type="ChartSeriesType.RangeColumn">
            <ChartSeriesLabels>
                <ChartSeriesLabelsFrom Visible="true" Template="#= dataItem[0] #" />
                <ChartSeriesLabelsTo Visible="true" Template="#= dataItem[1] #" />
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@Years" />
    </ChartCategoryAxes>

    <ChartTooltip Visible="true">
        <Template>
            @{
                var item = (int[])context.DataItem;
                <span>@item[0] - @item[1] points</span>
            }
        </Template>
    </ChartTooltip>

    <ChartTitle Text="Exam Score Ranges"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right"></ChartLegend>
</TelerikChart>

@code {
    // The RangeColumn Series Data can be any collection of arrays
    private List<int[]> StudentScores1 { get; set; } = new List<int[]>();
    private int[][] StudentScores2 { get; set; } = new int[5][];

    private object[] Years { get; set; }

    protected override void OnInitialized()
    {
        var thisYear = DateTime.Now.Year;
        Years = new object[] { thisYear - 4, thisYear - 3, thisYear - 2, thisYear - 1, thisYear };

        var rnd = new Random();
        List<int[]> tempData1 = new List<int[]>();
        List<int[]> tempData2 = new List<int[]>();

        for (int i = 1; i <= Years.Count(); i++)
        {
            int randomValue = rnd.Next(30, 50);
            tempData1.Add(new int[] { randomValue, randomValue + 30 });
            tempData2.Add(new int[] { randomValue + 10, randomValue + 40 });
        }

        StudentScores1 = tempData1;
        StudentScores2 = tempData2.ToArray();

        base.OnInitialized();
    }
}
````

### Binding Range Column Series to Custom Objects

1. Set the `ChartSeries` `Data` parameter to an `IEnumerable<T>`.
1. Set the `FromField`, `ToField`, and `CategoryField` parameters of the `ChartSeries` to properties of the `T` type.

>caption Blazor Range Column Chart bound to custom objects

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Name="University 1"
                     Data="@StudentScoreList1"
                     Type="ChartSeriesType.RangeColumn"
                     FromField="@nameof(ScoreModel.LowScore)"
                     ToField="@nameof(ScoreModel.HighScore)"
                     CategoryField="@nameof(ScoreModel.Year)">
            <ChartSeriesLabels>
                <ChartSeriesLabelsFrom Visible="true" />
                <ChartSeriesLabelsTo Visible="false" />
            </ChartSeriesLabels>
        </ChartSeries>
        <ChartSeries Name="University 2"
                     Data="@StudentScoreList2"
                     Type="ChartSeriesType.RangeColumn"
                     FromField="@nameof(ScoreModel.LowScore)"
                     ToField="@nameof(ScoreModel.HighScore)"
                     CategoryField="@nameof(ScoreModel.Year)">
            <ChartSeriesLabels>
                <ChartSeriesLabelsFrom Visible="true" Template="#= dataItem.LowScore #" />
                <ChartSeriesLabelsTo Visible="true" Template="#= dataItem.HighScore #" />
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartTooltip Visible="true">
        <Template>
            @{
                var item = (ScoreModel)context.DataItem;
                <span>@item.LowScore - @item.HighScore points</span>
            }
        </Template>
    </ChartTooltip>

    <ChartTitle Text="Exam Score Ranges"></ChartTitle>

    <ChartLegend Position="ChartLegendPosition.Right"></ChartLegend>
</TelerikChart>

@code {
    private List<ScoreModel> StudentScoreList1 { get; set; } = new List<ScoreModel>();
    private List<ScoreModel> StudentScoreList2 { get; set; } = new List<ScoreModel>();

    protected override void OnInitialized()
    {
        var thisYear = DateTime.Now.Year;

        var rnd = new Random();

        for (int i = 1; i <= 5; i++)
        {
            int randomValue = rnd.Next(30, 50);

            StudentScoreList1.Add(new ScoreModel()
            {
                Year = thisYear - 4 + i,
                LowScore = randomValue,
                HighScore = randomValue + 30
            });

            StudentScoreList2.Add(new ScoreModel()
            {
                Year = thisYear - 4 + i,
                LowScore = randomValue + 10,
                HighScore = randomValue + 40
            });
        }

        base.OnInitialized();
    }

    public class ScoreModel
    {
        public int Year { get; set; }
        public int LowScore { get; set; }
        public int HighScore { get; set; }
    }
}
````


## Column Chart Specific Appearance Settings

### Labels

Each data item is decorated with a text label. You can control and customize them through the `<ChartCategoryAxisLabels />` and its children tags.

* `Visible`—Hide all labels by setting this parameter to `false`.
* `Step`—Renders every n-th label, where n is the value (`double` number) passed to the parameter.
* `Skip`—Skips the first n labels, where n is the value (`double` number) passed to the parameter.
* `Angle`—Rotates the labels with the desired angle by n degrees, where n is the value passed to the parameter. It can take positive and negative numbers. To set this parameter, use the `< ChartCategoryAxisLabelsRotation />` child tag.

To rotate the markers, use the `ChartCategoryAxisLabelsRotation` child tag and set its `Angle` parameter. It can take positive and negative numbers as values.

### Color

The color of a series is controlled through the `Color` property that can take any valid CSS color (for example, `#abcdef`, `#f00`, or `blue`).

@[template](/_contentTemplates/chart/link-to-basics.md#color-field-bar-column)

@[template](/_contentTemplates/chart/link-to-basics.md#gap-and-spacing)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings-categorical)


## See Also

* [Live Demo: Range Column Chart](https://demos.telerik.com/blazor-ui/chart/range-column-chart)
