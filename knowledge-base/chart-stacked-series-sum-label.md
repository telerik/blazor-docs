---
title: Show Sum Label and Group Name for Stacked Chart Column Series
description: How to show a label with the total value for the whole stacked Chart column series? How to show an additional custom label for a column below the horizontal Chart axis?
type: how-to
page_title: How to Display Sum Label and Group Name for Stacked Chart Column Series
slug: chart-kb-stacked-series-sum-label
position: 
tags: telerik, blazor, chart, templates, stacking
ticketid: 1546346, 1598736, 1627415, 1628026
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
            <td>
                4.5.0 +
                <br />
                (see <a href="#notes">section Notes</a> for previous versions)
            </td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article answers the following questions:

* How to show the aggregated sum of a stacked Chart column?
* How to display the total (summed-up) value at the top of each stacked Chart column?
* How do you show stacked column series broken down by sub-category across the category axis?
* Can you label each stacked Chart column in a category group? How to align the group and column labels on the axis?
* How to draw an axis label for each individual `ChartSeries` column in the same category group?


## Solution

The article suggests two scenarios with examples. Both of them use series labels for a different purpose. If users need to see the separate non-stacked series values, consider [Chart tooltips](slug:chart-tooltip-overview).

* [Display a sum of stacked Chart series above each stacked column](#aggregated-stack-column-label)
* [Display a label on the horizontal Chart axis below each column](#stack-group-or-column-name-as-custom-axis-label)

### Aggregated Stack Column Label

Here is how to display the total sum of stacked Chart series above each stacked column:

1. Configure [Chart series stacking](slug:components/chart/stack).
1. Add a `<ChartSeriesLabels>` tag and define a [label template](slug:components/chart/label-template-format#templates) for the series that will display at the top of each stacked column. This is the last `<ChartSeries>` in the Chart declaration from a given stack `Group`.
1. In the series label template, render the [`stackValue` property](slug:components/chart/label-template-format#series-label-template) of the template argument object (`context`).

>caption Display stack aggregate and group name as axis label with Chart column series

````RAZOR
<TelerikChart>

    <ChartTitle Text="Work Items by Team and Period" />

    <ChartSeriesItems>
        <ChartSeries Data="@CowboysData"
                     Name="Cowboys Bugs"
                     Field="@nameof(ChartModel.Bugs)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesStack Group="Cowboys" Enabled="true" />
            <ChartSeriesLabels Visible="true"
                               Position="@ChartSeriesLabelsPosition.InsideBase"
                               Rotation="-60"
                               Template="cowboysLabel"
                               Background="transparent">
                <ChartSeriesLabelsMargin Top="80" />
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true">
                <Template>
                    @context.FormattedValue bugs
                </Template>
            </ChartSeriesTooltip>
        </ChartSeries>
        <ChartSeries Data="@CowboysData"
                     Name="Cowboys Features"
                     Field="@nameof(ChartModel.Features)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesStack Group="Cowboys" Enabled="true" />
            <ChartSeriesLabels Visible="true"
                               Template="stackSumLabel">
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true">
                <Template>
                    @context.FormattedValue features
                </Template>
            </ChartSeriesTooltip>
        </ChartSeries>
        <ChartSeries Data="@SailorsData"
                     Name="Sailors Bugs"
                     Field="@nameof(ChartModel.Bugs)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesStack Group="Sailors" Enabled="true" />
            <ChartSeriesLabels Visible="true"
                               Position="@ChartSeriesLabelsPosition.InsideBase"
                               Rotation="-60"
                               Template="sailorsLabel"
                               Background="transparent">
                <ChartSeriesLabelsMargin Top="67" />
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true">
                <Template>
                    @context.FormattedValue bugs
                </Template>
            </ChartSeriesTooltip>
        </ChartSeries>
        <ChartSeries Data="@SailorsData"
                     Name="Sailors Features"
                     Field="@nameof(ChartModel.Features)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesStack Group="Sailors" Enabled="true" />
            <ChartSeriesLabels Visible="true"
                               Template="stackSumLabel">
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true">
                <Template>
                    @context.FormattedValue features
                </Template>
            </ChartSeriesTooltip>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Type="@ChartCategoryAxisType.Date"
                           BaseUnit="@ChartCategoryAxisBaseUnit.Months">
            <ChartCategoryAxisLabels>
                <ChartCategoryAxisLabelsMargin Top="80" />
            </ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartValueAxes>
        <ChartValueAxis Max="20" MajorUnit="4" />
    </ChartValueAxes>

    <ChartLegend Visible="true" Position="@ChartLegendPosition.Top" />

</TelerikChart>

@* Move JavaScript to a JS file in production apps *@
<script suppress-error="BL9992">
    function cowboysLabel(context) {
        return "Cowboys";
    }
    function sailorsLabel(context) {
        return "Sailors";
    }
    function stackSumLabel(context) {
        return "Sum: " + context.stackValue;
    }
</script>

@code {
    private List<ChartModel> CowboysData { get; set; } = new List<ChartModel>();

    private List<ChartModel> SailorsData { get; set; } = new List<ChartModel>();

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 0; i < 3; i++)
        {
            CowboysData.Add(new ChartModel()
            {
                DateValue = DateTime.Today.AddMonths(-i),
                Bugs = rnd.Next(5, 10),
                Features = rnd.Next(5, 10)
            });

            SailorsData.Add(new ChartModel()
            {
                DateValue = DateTime.Today.AddMonths(-i),
                Bugs = rnd.Next(3, 8),
                Features = rnd.Next(3, 8)
            });
        }

        base.OnInitialized();
    }

    public class ChartModel
    {
        public DateTime DateValue { get; set; }
        public int Bugs { get; set; }
        public int Features { get; set; }
    }
}
````

### Stack Group or Column Name as Custom Axis Label

Here is how to display an additional custom label on the horizontal Chart axis below each column. This approach doesn't require stacking and can be used with standalone column series too.

1. Add a `<ChartSeriesLabels>` tag and define a [label template](slug:components/chart/label-template-format#templates) for the series that will display at the bottom of each stacked column. This is the first `<ChartSeries>` in the Chart declaration from a given stack `Group`. If you are not using stacking, then implement this step for all column series.
1. Set `Position="@ChartSeriesLabelsPosition.InsideBase"` to each `<ChartSeriesLabels>` tag.
1. (optional) Set `Rotation` to each `<ChartSeriesLabels>` tag.
1. (optional) Set `Background="transparent"` to each `<ChartSeriesLabels>` tag. This will prevent label overlapping and fading if the columns are too close to one another.
1. Add a nested `<ChartSeriesLabelsMargin>` tag inside each `<ChartSeriesLabels>`. Set the `Top` margin parameter to an `int` value. This margin will push the custom label below the horizontal Chart axis. If the label is rotated, then the top margin depends on the label length. If you set the same top margin in all series, the labels will be aligned on their bottom side. If you set different top margins, you can align the custom labels on their top side, with regard to the horizontal Chart axis.
1. Set the `Top` parameter of `<ChartCategoryAxisLabelsMargin>`, so that it is equal or similar to the largest `Top` value of all `<ChartSeriesLabelsMargin>` tags.

>caption Display additional custom column series label on the Chart category axis

````RAZOR
<TelerikChart>

    <ChartTitle Text="Work Items by Period" />

    <ChartSeriesItems>
        <ChartSeries Data="@CowboysData"
                     Name="Bugs"
                     Field="@nameof(ChartModel.Bugs)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesLabels Visible="true"
                               Position="@ChartSeriesLabelsPosition.InsideBase"
                               Rotation="-90"
                               Template="bugsLabel"
                               Background="transparent">
                <ChartSeriesLabelsMargin Top="55" />
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true" />
        </ChartSeries>
        <ChartSeries Data="@CowboysData"
                     Name="Features"
                     Field="@nameof(ChartModel.Features)"
                     CategoryField="@nameof(ChartModel.DateValue)">
            <ChartSeriesLabels Visible="true"
                               Position="@ChartSeriesLabelsPosition.InsideBase"
                               Rotation="-90"
                               Template="featuresLabel"
                               Background="transparent">
                <ChartSeriesLabelsMargin Top="75" />
            </ChartSeriesLabels>
            <ChartSeriesTooltip Visible="true" />
        </ChartSeries>
    </ChartSeriesItems>

    <ChartCategoryAxes>
        <ChartCategoryAxis Type="@ChartCategoryAxisType.Date"
                           BaseUnit="@ChartCategoryAxisBaseUnit.Months">
            <ChartCategoryAxisLabels>
                <ChartCategoryAxisLabelsMargin Top="70" />
            </ChartCategoryAxisLabels>
        </ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartLegend Visible="true" Position="@ChartLegendPosition.Top" />

</TelerikChart>

@* Move JavaScript to a JS file in production apps *@
<script suppress-error="BL9992">
    function bugsLabel(context) {
        return "Bugs";
    }
    function featuresLabel(context) {
        return "Features";
    }
</script>

@code {
    private List<ChartModel> CowboysData { get; set; } = new List<ChartModel>();

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 0; i < 6; i++)
        {
            CowboysData.Add(new ChartModel()
            {
                DateValue = DateTime.Today.AddMonths(-i),
                Bugs = rnd.Next(5, 10),
                Features = rnd.Next(5, 10)
            });
        }

        base.OnInitialized();
    }

    public class ChartModel
    {
        public DateTime DateValue { get; set; }
        public int Bugs { get; set; }
        public int Features { get; set; }
    }
}
````

## Notes

Chart label templates require a different configuration for [Telerik UI for Blazor versions](https://www.telerik.com/support/whats-new/blazor-ui/release-history) before 4.5.0. If you are using an earlier version, then [download the PDF documentation](https://www.telerik.com/account/downloads/product-download?product=BLAZOR) for your version, or [browse an older version of the Chart Label Templates documentation](https://github.com/telerik/blazor-docs/blob/4.4.0/components/chart/labels-template-and-format.md#templates).


## See Also

* [Chart Series Stacking](slug:components/chart/stack)
* [Chart Label Templates](slug:components/chart/label-template-format)
* [Chart Tooltips](slug:chart-tooltip-overview)
