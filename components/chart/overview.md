---
title: Overview
page_title: Chart Overview
description: Overview of the Chart for Blazor.
slug: components/chart/overview
tags: telerik,blazor,chart,overview, graph
published: True
position: 0
---

# Blazor Chart Overview

The <a href="https://demos.telerik.com/blazor-ui/chart/overview" target="_blank">Blazor Charts</a> components enables you to present data in a visually meaningful way, helping users draw insights effectively. It offers a wide range of graph types and provides full control over its appearance, including colors, fonts, paddings, margins, and templates.

<style>
    #markdown-body > div > .cta-panel-big-module--container--c08a9 {
        display: none;
    }
</style>

<span class="cta-panel-big-module--container--c08a9 d-print-none "><span class="row align-items-center justify-content-center cta-panel-big-module--row--9b71a"><span class="col-auto"><img class="cta-panel-big-module--icon--a648c" src="/static/c0a85b2af83a712b8eaabf444cbc70e8/avatar-ninja.svg" alt="ninja-icon"></span><span class="col-12 col-sm"><span class="cta-panel-big-module--message--40a0f">Tired of reading docs? With our new AI Coding Assistants, you can add, configure, and troubleshoot Telerik UI for Blazor components—right inside your favorite AI-powered IDE: Visual Studio, VS Code, Cursor, and more. Start building faster, smarter, and with contextual intelligence powered by our docs/APIs:</span></span><span class="col-12 col-lg-auto"><a class="cta-panel-big-module--btnTrial--38b3e" href="https://www.telerik.com/blazor-ui/documentation/ai/overview?utm_source=ai-assistants-docs" target="__blank">Try AI Assistants</a></span></span></span>

## Creating Blazor Chart

1. Add the `<TelerikChart>` tag to your razor page.
1. Define [Chart series](slug:Telerik.Blazor.Components.ChartSeries) and [bind them to data](slug:components/chart/databind).
1. Configure the [category axis](slug:Telerik.Blazor.Components.ChartCategoryAxis) (X axis). Either set a `CategoryField` for each `<ChartSeries>`, or provide all `Categories` in bulk in a `<ChartCategoryAxis>` tag.
1. Set a `<ChartTitle>` and the `Position` of the [`<ChartLegend>`](slug:Telerik.Blazor.Components.ChartLegend). To make the legend appear, define a `Name` for each `<ChartSeries>`.

>caption Basic chart

````RAZOR
<TelerikChart>
	<ChartSeriesItems>
		<ChartSeries Type="ChartSeriesType.Line" Name="Product 1 (bound to simple data)" Data="@simpleData">
		</ChartSeries>
		<ChartSeries Type="ChartSeriesType.Line" Name="Product 2 (bound to model)" Data="@modelData" Field="@nameof(MyDataModel.SecondSeriesValue)">
			<ChartSeriesLabels Template="#=value# in #=dataItem.ExtraData# quarter" Visible="true"></ChartSeriesLabels>
		</ChartSeries>
	</ChartSeriesItems>

	<ChartValueAxes>
		<ChartValueAxis Color="red"></ChartValueAxis>
	</ChartValueAxes>

	<ChartCategoryAxes>
		<ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
	</ChartCategoryAxes>

	<ChartTitle Text="Quarterly sales trend"></ChartTitle>

	<ChartLegend Position="Telerik.Blazor.ChartLegendPosition.Bottom">
	</ChartLegend>
</TelerikChart>

@code {
	public class MyDataModel
	{
		public int SecondSeriesValue { get; set; }
		public string ExtraData { get; set; }
	}

	public List<MyDataModel> modelData = new List<MyDataModel>()
	{
		new MyDataModel() { SecondSeriesValue = 1, ExtraData = "first" },
		new MyDataModel() { SecondSeriesValue = 5, ExtraData = "second" },
		new MyDataModel() { SecondSeriesValue = 3, ExtraData = "third" },
		new MyDataModel() { SecondSeriesValue = 2, ExtraData = "fourth" },
	};

	public List<object> simpleData = new List<object>() { 10, 2, 7, 5 };

	public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

## Chart Elements

@[template](/_contentTemplates/chart/link-to-basics.md#configurable-nested-chart-settings)

## Title and Subtitle

You can add a short description of the Chart's purpose by using the `ChartTitle` tag and the `Text` parameter. In addition, the `ChartTitle` `Description` parameter allows the app to provide accessible text content, which screen readers announce when the Chart gains focus.

You can also add a secondary title through `ChartSubtitle` and configure its `Position`.

>caption Using Chart Title, Description and 

<div class="skip-repl"></div>

````RAZOR
<TelerikChart>
    <ChartTitle Text="Product Sales"
                Description="Product Sales by Year and Country"
                Position="@ChartTitlePosition.Top">
        <ChartSubtitle Text="Product Sales by Year and Country"
                       Position="@ChartSubtitlePosition.Bottom" />
    </ChartTitle>
</TelerikChart>
````

## Size

To control the chart size, use its `Width` and `Height` properties. You can read more on how they work in the [Dimensions](slug:common-features/dimensions) article.

You can also set the chart size in percentage values so it occupies its container when it renders. If the parent container size changes, you must call the chart's `Refresh()` C# method after the DOM has been redrawn and the new container dimensions are rendered. You can do this when you explicitly change container sizes (like in the example below), or from code that gets called by events like `window.resize`. You can find an example and guidelines for making Charts refresh on `window.resize` in the knowledge base article for [responsive Chart](slug:chart-kb-responsive).


>caption Change the 100% chart size dynamically to have a responsive chart

````RAZOR
You can make a responsive chart

<TelerikButton OnClick="@ResizeChart">Resize the container and redraw the chart</TelerikButton>

<div style="border: 1px solid red;width:@ContainerWidth; height: @ContainerHeight">

    <TelerikChart Width ="100%" Height="100%" @ref="theChart">

        <ChartSeriesItems>
            <ChartSeries Type="ChartSeriesType.Column" Name="Product 1" Data="@someData">
            </ChartSeries>
        </ChartSeriesItems>
        <ChartCategoryAxes>
            <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
        </ChartCategoryAxes>
        <ChartTitle Text="Quarterly sales trend"></ChartTitle>

    </TelerikChart>

</div>

@code {
    string ContainerWidth { get; set; } = "400px";
    string ContainerHeight { get; set; } = "300px";
    Telerik.Blazor.Components.TelerikChart theChart { get; set; }

    async Task ResizeChart()
    {
        //resize the container
        ContainerHeight = "500px";
        ContainerWidth = "800px";

        //give time to the framework and browser to resize the actual DOM so the chart can use the expected size
        await Task.Delay(20);

        //redraw the chart
        theChart.Refresh();
    }

    public List<object> someData = new List<object>() { 10, 2, 7, 5 };

    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

## Styling with CSS Variables

The Chart allows various [customizations through child tags and parameters](#chart-elements). Starting with version 8.0.0, the Chart also supports visual customizations through [CSS variables](slug:themes-customize#setting-theme-variables).

>caption Using CSS variables to customize the Chart appearance

````RAZOR
<style>
    /* All Charts */
    div.k-chart {
        /* Chart background */
        --kendo-chart-bg: #ffd;
        /* Chart text */
        --kendo-chart-text: #f00;
        /* First series color. Supports up to --kendo-chart-series-30 */
        --kendo-chart-series-1: #f93;
    }

    /* Charts with this CSS class */
    div.lime-chart {
        /* Chart background */
        --kendo-chart-bg: #dfd;
        /* Chart text */
        --kendo-chart-text: #00f;
        /* First series color. Supports up to --kendo-chart-series-30 */
        --kendo-chart-series-1: #39f;
    }
</style>

<div style="display: flex; gap: 2em;">
    <TelerikChart Height="240px"
                  Width="400px">
        <ChartTitle Text="Chart" />
        <ChartSeriesItems>
            <ChartSeries Type="ChartSeriesType.Column"
                         Data="@ChartData"
                         Field="@nameof(SalesData.Revenue)"
                         CategoryField="@nameof(SalesData.Product)">
            </ChartSeries>
        </ChartSeriesItems>
    </TelerikChart>

    <TelerikChart Class="lime-chart"
                  Height="240px"
                  Width="400px">
        <ChartTitle Text="Chart" />
        <ChartSeriesItems>
            <ChartSeries Type="ChartSeriesType.Column"
                         Data="@ChartData"
                         Field="@nameof(SalesData.Revenue)"
                         CategoryField="@nameof(SalesData.Product)">
            </ChartSeries>
        </ChartSeriesItems>
    </TelerikChart>
</div>

@code {
    private List<SalesData> ChartData { get; set; } = new();

    protected override void OnInitialized()
    {
        var productCount = 3;

        for (int i = 1; i <= productCount; i++)
        {
            ChartData.Add(new SalesData()
            {
                Product = $"Product {i}",
                Revenue = i * 4
            });
        }
    }

    public class SalesData
    {
        public string Product { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }
}
````

## Chart Parameters

The following table lists Chart parameters, which are not discussed elsewhere in the component documentation.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Width`  | `string` | Controls the width of the Chart. |
| `Height`  | `string` | Controls the height of the Chart. |
| `Class`  | `string` | Renders a custom CSS class on the `<div class="k-chart">` element. |
| `Transitions` | `bool?` | Controls if the Chart renders animations. |

## Chart Reference and Methods

To execute Chart methods, obtain reference to the component instance via `@ref`.

| Method  | Description |
|---------|-------------|
| `Refresh` | Use the method to programmatically re-render the Chart.  |
| `ResetDrilldownLevel` | Use the method to programmatically reset the drilldown level of the Chart. For more information refer to the [DrillDown article](slug:chart-drilldown#reset-drilldown-level). |

<div class="skip-repl"></div>

````RAZOR
<TelerikButton OnClick="@RefreshChart">Refresh Chart</TelerikButton>

<TelerikChart @ref="ChartRef" />

@code {
	public TelerikChart ChartRef;

	private void RefreshChart()
	{
		ChartRef.Refresh();
	}
}
````

## Next Steps

* [Data bind the Chart](slug:components/chart/databind)
* [Explore the Chart events](slug:chart-events)
* [Learn more about Chart Tooltips](slug:chart-tooltip-overview)

## See Also

* [Live Demos: Chart](https://demos.telerik.com/blazor-ui/chart/overview)
* [Chart API Reference](slug:Telerik.Blazor.Components.TelerikChart)
