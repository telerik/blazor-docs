---
title: Events
page_title: TileLayout - Events
description: Events of the TileLayout for Blazor.
slug: tilelayout-events
tags: telerik,blazor,tile,layout,dashboard,events
published: True
position: 20
---

# TileLayout Events

This article explains the events available in the Telerik TileLayout for Blazor:

* [OnResize](#onresize)
* [OnReorder](#onreorder)

## OnResize

The `OnResize` event is fired when any tile is resized. It lets you respond to that change if needed - for example, call the `.Refresh()` method of a chart or otherwise repaint a child component in the content. You can also use it to, for example, update the saved [state]({%slug tilelayout-state%}) for your users.

>caption Respond to the Resize event and adjust components in the tile

````CSHTML
@* Respond to a tile resizing to resize its contents, if needed *@

<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="850px"
                   Columns="4"
                   Resizable="true"
                   OnResize="@OnResizeHandler">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Resize me" RowSpan="2" ColSpan="2">
            <Content>
                <TelerikChart @ref="@ChartRef" Width="100%" Height="100%">
                    <ChartSeriesItems>
                        <ChartSeries Type="@ChartSeriesType.Line" Name="Product 1" Data="@chartData">
                        </ChartSeries>
                    </ChartSeriesItems>

                    <ChartCategoryAxes>
                        <ChartCategoryAxis Categories="@xAxisItems"></ChartCategoryAxis>
                    </ChartCategoryAxes>

                    <ChartTitle Text="Quarterly revenue per product"></ChartTitle>

                    <ChartLegend Position="@ChartLegendPosition.Right">
                    </ChartLegend>
                </TelerikChart>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Resize me too" RowSpan="2">
            <Content>
                <div style="width: 100%; height: 100%; background: yellow; overflow: auto;">
                    Elements whose dimensions are set as percentage of their parent
                    and can resize based on that may not require explicit code to handle
                    resizing of the tile layout.
                </div>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" ColSpan="2">
            <Content>Panel 3.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4">
            <Content>Panel 4.</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@code {
    TelerikChart ChartRef { get; set; }
    void OnResizeHandler()
    {
        ChartRef.Refresh();
    }

    public List<object> chartData = new List<object>() { 10, 2, 5, 6 };
    public string[] xAxisItems = new string[] { "Q1", "Q2", "Q3", "Q4" };
}
````

## OnReorder

The `OnReorder` event fires when tiles have been reordered. You can use it to, for example, update the saved [state]({%slug tilelayout-state%}) for your users.

>caption Respond to the OnReorder event

````CSHTML
@* Handle the OnResized event *@

<TelerikTileLayout ColumnWidth="200px"
                   RowHeight="150px"
                   Width="700px"
                   Columns="3"
                   Reorderable="true"
                   OnReorder="@OnReorderHandler">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Panel 1">
            <Content>Regular sized first panel.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3" RowSpan="3">
            <Content>This tile is three rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4" RowSpan="2" ColSpan="2">
            <Content>This tile is two rows tall and two columns wide</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@code{
    async Task OnReorderHandler()
    {
        Console.WriteLine("tile order changed, might be a good time to save the state.");
    }
}
````


## See Also

  * [TileLayout Overview]({%slug tilelayout-overview%})
