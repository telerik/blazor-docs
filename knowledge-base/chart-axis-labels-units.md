---
title: How to Conditionally Change Axis Labels Units
description: Learn how to format and convert the Y-Axis labels in Charts for Blazor to display inch or metric values based on user preference.
type: how-to
page_title: Customizing Y-Axis Labels in Charts for Blazor
meta_title: Customizing Y-Axis Labels in Charts for Blazor
slug: chart-kb-axis-labels-units
tags: blazor, charts, axis, labels, template
res_type: kb
ticketid: 1690815
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Charts for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to format and convert the Y-Axis labels to display either metric (mm) or imperial (inches) values based on user preference.

## Solution

Use the [`Template` parameter of the `ChartYAxisLabels`](slug:components/chart/label-template-format) to apply custom formatting and conversion logic. Below is an example implementation:

````RAZOR
<TelerikChart Height="380px" Width="100%">
    <ChartTitle Text="Charge current vs. charge time" />
    <ChartTooltip Visible="true" Shared="true" />
    <ChartLegend Position="ChartLegendPosition.Bottom" />

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.ScatterLine"
                     Style="ChartSeriesStyle.Smooth"
                     Name="Example Series"
                     Color="black"
                     Data="@Series1Data"
                     XField="@nameof(ModelData.X)"
                     YField="@nameof(ModelData.Y)">
            <ChartSeriesMarkers Visible="true" Size="6" Type="ChartSeriesMarkersType.Circle" />
        </ChartSeries>
    </ChartSeriesItems>

    <ChartXAxes>
        <ChartXAxis Max="100" MajorUnit="10">
            <ChartXAxisTitle Text="Time (minutes)" />
            <ChartXAxisLabels Format="{0}m" />
        </ChartXAxis>
    </ChartXAxes>

    <ChartYAxes>
        <ChartYAxis>
            <ChartYAxisTitle Text="@(IsMetric ? "Charge (mm)" : "Charge (in)")" />
            <ChartYAxisLabels Template="@YAxisLabelTemplate" />
        </ChartYAxis>
    </ChartYAxes>
</TelerikChart>

<TelerikButton OnClick="@ToggleUnits" Class="mt-4">
    Toggle Units (Currently: @(IsMetric ? "Metric" : "Inches"))
</TelerikButton>

<script suppress-error="BL9992">
    function yAxisLabelMetric(context) {
        return context.value.toFixed(2) + " mm";
    }

    function yAxisLabelInches(context) {
        return (context.value / 25.4).toFixed(2) + " in";
    }
</script>

@code {
    private bool IsMetric = true;
    private string YAxisLabelTemplate => IsMetric ? "yAxisLabelMetric" : "yAxisLabelInches";

    private void ToggleUnits()
    {
        IsMetric = !IsMetric;
    }

    public class ModelData
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

    public List<ModelData> Series1Data = new()
    {
        new ModelData() { X = 10, Y = 10 },
        new ModelData() { X = 15, Y = 20 },
        new ModelData() { X = 20, Y = 25 },
        new ModelData() { X = 32, Y = 40 },
        new ModelData() { X = 43, Y = 50 },
        new ModelData() { X = 55, Y = 60 },
        new ModelData() { X = 60, Y = 70 },
        new ModelData() { X = 70, Y = 80 },
        new ModelData() { X = 90, Y = 100 },
    };
}
````

## See Also

* [Chart Overview](slug:components/chart/overview)
* [ChartYAxisLabels Documentation](slug:components/chart/label-template-format)
