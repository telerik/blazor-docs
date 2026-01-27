---
title: Print Chart only
description: How to print only the Chart.
type: how-to
page_title: Print Chart only
slug: chart-kb-print-chart-only
position: 
tags: 
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

* How to print the rendered Blazor Chart?
* How to print the Chart?
* How to print only the Chart and hide everything else on the page so only the Chart will show up when printing?


## Solution

By using the browser printing engine and some custom CSS while printing you can hide everything else on the page and print only the Chart:

1. Add the `media="print"` attribute in the `<style>` tag to ensure that the defined styles are applied only when printing the page.
1. Set a `Class` parameter to the elements that will not be printed and apply the CSS `display:none` rule to hide them.
1. Set the Chart `Width` and `Height` parameters to fit the printing page.
1. Use JS Interop to call the browser print method that does the actual printing. Ensure that the browser is printing background graphics (this is a checkbox on the browser's Print dialog) so that you can get the proper colors on the chart and/or other elements.

````RAZOR
@inject IJSRuntime JSRuntime

<TelerikButton OnClick="@Print" Icon="@SvgIcon.Print" Class="non-printable-element">Print this chart</TelerikButton>

    <TelerikChart Width="700px" Height="400px">
    <ChartSeriesItems>
        <ChartSeries Type="@ChartSeriesType.Line" Name="Product 1 (bound to simple data)" Data="@SimpleData">
        </ChartSeries>
        <ChartSeries Type="@ChartSeriesType.Line" Name="Product 2 (bound to model)" Data="@ModelData" Field="@nameof(MyDataModel.SecondSeriesValue)">
            <ChartSeriesLabels Template="#=value# in #=dataItem.ExtraData# quarter" Visible="true"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

    <ChartValueAxes>
        <ChartValueAxis Color="red"></ChartValueAxis>
    </ChartValueAxes>

    <ChartCategoryAxes>
        <ChartCategoryAxis Categories="@XAxisItems"></ChartCategoryAxis>
    </ChartCategoryAxes>

    <ChartTitle Text="Quarterly sales trend"></ChartTitle>

    <ChartLegend Position="@ChartLegendPosition.Bottom">
    </ChartLegend>
</TelerikChart>


<style media="print">
    .top-row,
    .sidebar,
    .non-printable-element {
        display: none;
    }
</style>


@code {
    private List<object> SimpleData = new List<object>() { 10, 2, 7, 5 };

    private string[] XAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };

    private List<MyDataModel> ModelData = new List<MyDataModel>()
    {
        new MyDataModel() { SecondSeriesValue = 1, ExtraData = "first" },
        new MyDataModel() { SecondSeriesValue = 5, ExtraData = "second" },
        new MyDataModel() { SecondSeriesValue = 3, ExtraData = "third" },
        new MyDataModel() { SecondSeriesValue = 2, ExtraData = "fourth" },
    };

    private async Task Print()
    {
        await InvokeAsync(StateHasChanged);
        await Task.Delay(20);
        await JSRuntime.InvokeVoidAsync("print");
    }

    public class MyDataModel
    {
        public int SecondSeriesValue { get; set; }
        public string ExtraData { get; set; }
    }
}
````