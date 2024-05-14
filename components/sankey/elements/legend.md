---
title: Legend
page_title: Sankey Legend
description: Legend of the Sankey Diagram for Blazor.
slug: sankey-legend
tags: telerik,blazor,sankey,diagram,chart,legend
published: True
position: 11
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Legend

The Telerik Sankey Diagram for Blazor can show a legend, which is a visual guide with details about the nodes. This article explores how to customize the Sankey legend.

## Basic Customization

To customize the legend in the Sankey chart, declare a `<SankeyLegend>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLegend>` tag has the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Align` | `SankeyLegendAlign` enum | The alignment of the legend. |
| `Background` | `string`  | The background color of the legend. |
| `Height` | `double?`  | The height of the legend. |
| `OffsetX` | `double?`  | The X offset of the legend. The offset is relative to the current position of the legend. |
| `OffsetY` | `double?`  | The Y offset of the legend. The offset is relative to the current position of the legend. |
| `Orientation` | `SankeyLegendOrientation` enum <br/> (`SankeyLegendOrientation.Horizontal`)  | The orientation of the legend. |
| `Position` | `SankeyLegendPosition` enum <br/> (`SankeyLegendPosition.Bottom`)| The position of the legend. |
| `Reverse` | `double?`  | Whether the legend items are reversed. |
| `Spacing` | `double?`  | The spacing between the labels of the legend. |
| `Visible` | `bool?` <br/> (`true`) | Whether the legend is visible. |
| `Width` | `double?`  | The width of the legend. Applies when `Orientation="SankeyLegendOrientation.Horizontal"`. |


## Nested Customization Tags

The `<SankeyLegend>` tag exposes nested tags for further customization of the separate legend elements. The structure of the nested tags is `<SankeyLegend*Specifics*>`, where the specifics can be:

* [`Border`](/blazor-ui/api/telerik.blazor.components.sankeylegendborder)
* [`Item`](/blazor-ui/api/telerik.blazor.components.sankeylegenditem)
* [`Labels`](/blazor-ui/api/telerik.blazor.components.sankeylegendlabels) - exposes additional nested options. The structure of the nested tags is `<SankeyLegendLabels*Specifics*>`, where the specifics can be:
    * [`Margin`](/blazor-ui/api/telerik.blazor.components.sankeylegendlabelsmargin)
    * [`Padding`](/blazor-ui/api/telerik.blazor.components.sankeylegendlabelspadding)
* [`Margin`](/blazor-ui/api/telerik.blazor.components.sankeylegendmargin)
* [`Padding`](/blazor-ui/api/telerik.blazor.components.sankeylegendpadding)
* [`Title`](/blazor-ui/api/telerik.blazor.components.sankeylegendtitle) - exposes additional nested options. The structure of the nested tags is `<SankeyLegendTitle*Specifics*>`, where the specifics can be:
    * [`Border`](/blazor-ui/api/telerik.blazor.components.sankeylegendtitleborder)
    * [`Margin`](/blazor-ui/api/telerik.blazor.components.sankeylegendtitlemargin)
    * [`Padding`](/blazor-ui/api/telerik.blazor.components.sankeylegendtitlepadding)  

>tip Use the IntelliSense to explore the nested tags and their properties.

## Example

Customize the Sankey legend by using nested tag settings.

````CSHTML
<TelerikSankey Data="@Data"
               Width="1000px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"/>
    <SankeyLegend Position="@SankeyLegendPosition.Top" Background="rgba(255, 99, 88, 0.1)">
        <SankeyLegendTitle Text="Device usage by age groups" Font="bold 17px sans-serif">
            <SankeyLegendTitlePadding Bottom="20"></SankeyLegendTitlePadding>
        </SankeyLegendTitle>        
        <SankeyLegendItem AreaOpacity="0.7"/>
        <SankeyLegendMargin Bottom="20" />
        <SankeyLegendPadding Top="10" Bottom="10"/>
    </SankeyLegend>
</TelerikSankey>

@code {
    private SankeyData Data { get; set; }

    #region Data generation

    protected override void OnInitialized()
    {
        Data = new SankeyData()
            {
                Nodes = new SankeyDataNodes(),
                Links = new SankeyDataLinks()
            };

        Data.Nodes.Add(new SankeyDataNode() { Id = 1, Label = new SankeyDataNodeLabel() { Text = "Tablet (12%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 2, Label = new SankeyDataNodeLabel() { Text = "Mobile (40%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 3, Label = new SankeyDataNodeLabel() { Text = "Desktop (48%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 4, Label = new SankeyDataNodeLabel() { Text = "< 18 years (8%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 5, Label = new SankeyDataNodeLabel() { Text = "18-26 years (35%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 6, Label = new SankeyDataNodeLabel() { Text = "27-40 years (38%)" } });
        Data.Nodes.Add(new SankeyDataNode() { Id = 7, Label = new SankeyDataNodeLabel() { Text = "> 40 years (19%)" } });


        Data.Links.Add(new SankeyDataLink() { SourceId = 1, TargetId = 4, Value = 4 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 1, TargetId = 7, Value = 8 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 4, Value = 4 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 5, Value = 24 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 6, Value = 10 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 2, TargetId = 7, Value = 2 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 5, Value = 11 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 6, Value = 28 });
        Data.Links.Add(new SankeyDataLink() { SourceId = 3, TargetId = 7, Value = 9 });
    }

    #endregion Data generation
}
````

## See Also

* [Live Demo: Sankey Diagram Configuration](https://demos.telerik.com/blazor-ui/sankey/configuration)
* [Sankey Links]({%slug sankey-links%})
* [Sankey Nodes]({%slug sankey-nodes%})
* [Sankey Labels]({%slug sankey-labels%})
* [Sankey Tooltip]({%slug sankey-tooltip%})
* [Sankey Title]({%slug sankey-title%})