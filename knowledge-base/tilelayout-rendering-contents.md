---
title: The TileLayout does not update the HeaderText properly
description: The TileLayout does not update the HeaderText properly when bound to a property. Why does this happen and how to fix it?
type: how-to
page_title: The TileLayout does not update the HeaderText properly
slug: tilelayout-kb-render-contents
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TileLayout for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I have bound the `HeaderText` of the TileLayout to a property in my code. I would like to be able to set its value dynamically based on user action such as a click on a child component (chart series, button, etc.) in the `<Content>` of another Tile. 


## Solution

When clicking on a child component in the `<Content>` of another tile you initiate a render cycle. In this cycle the page is rendered anew and the components placed inside the `<Content>` are displayed. At this stage the `OnParametersSet` lifecycle hook of the TileLayout is called and the value of the `HeaderText` is updated, but not displayed in the HTML. To inform the UI that it should render again you must use the `StateHasChanged()`, which will change the value of the `HeaderText` in the HTML. 

>caption Set the HeaderText based on clicked series of the Chart

````CSHTML
<TelerikTileLayout Columns="3"
                   RowHeight="200px"
                   Resizable="true"
                   Reorderable="true">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Season">
            <Content>
                <TelerikChart Height="140px" OnSeriesClick="@OnSeasonSeriesClickHandler">
                    <ChartSeriesItems>
                        <ChartSeries Type="ChartSeriesType.Bar" Name="Results" Data="@PlayedSeries">
                            <ChartSeriesLabels Visible="true"></ChartSeriesLabels>
                        </ChartSeries>
                        <ChartSeries Type="ChartSeriesType.Bar" Name="Today" Data="@TodaySeries">
                            <ChartSeriesLabels Visible="true"></ChartSeriesLabels>
                        </ChartSeries>
                        <ChartSeries Type="ChartSeriesType.Bar" Name="Upcoming" Data="@UpcomingSeries">
                            <ChartSeriesLabels Visible="true"></ChartSeriesLabels>
                        </ChartSeries>
                    </ChartSeriesItems>

                    <ChartCategoryAxes>
                        <ChartCategoryAxis Visible="false"></ChartCategoryAxis>
                    </ChartCategoryAxes>

                    <ChartValueAxes>
                        <ChartValueAxis Visible="false"></ChartValueAxis>
                    </ChartValueAxes>

                    <ChartLegend Position="ChartLegendPosition.Bottom" Spacing="10">
                    </ChartLegend>
                </TelerikChart>
            </Content>
        </TileLayoutItem>

        <TileLayoutItem HeaderText="Panel 2">
        </TileLayoutItem>

        <TileLayoutItem HeaderText="@ResultPanelHeader" RowSpan="3">
            <Content>
                <h3>@ResultPanelHeader</h3>
                Show the Results for the clicked series here...
            </Content>
        </TileLayoutItem>

        <TileLayoutItem HeaderText="Panel 4" RowSpan="2" ColSpan="2">
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>


@code {

    public string ResultPanelHeader { get; set; }

    private List<object> PlayedSeries = new List<object>() { 45 };
    private List<object> TodaySeries = new List<object>() { 10 };
    private List<object> UpcomingSeries = new List<object>() { 325 };

    protected override void OnInitialized()
    {
        ResultPanelHeader = "Result Panel";
        base.OnInitialized();
    }

    private void OnSeasonSeriesClickHandler(ChartSeriesClickEventArgs args)
    {
        int seriesIndex = args.SeriesIndex;
        string seriesName = args.SeriesName;

        ResultPanelHeader = seriesName;
        
        //call StateHasChanged() to update the ResultPanelHeader in the rendered HTML
        StateHasChanged();
    }
}
````


