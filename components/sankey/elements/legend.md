---
title: Legend
page_title: Sankey Legend
description: Legend of the Sankey Diagram for Blazor.
slug: sankey-legend
tags: telerik,blazor,sankey,diagram,chart,legend
published: True
position: 11
components: ["sankey"]
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Legend

The Telerik Sankey Diagram for Blazor can show a legend, which is a visual guide with details about the nodes. This article explores how to customize the Sankey legend.

## Basic Customization

To customize the legend in the Sankey chart, declare a `<SankeyLegend>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLegend>` tag has the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Align` | [`SankeyLegendAlign` enum](slug:telerik.blazor.sankeylegendalign) <br/> (`Start`) | The alignment of the legend. |
| `Background` | `string`  | The background color of the legend. |
| `Height` | `double?`  | The height of the legend. |
| `OffsetX` | `double?`  | The X offset of the legend. The offset is relative to the current position of the legend. |
| `OffsetY` | `double?`  | The Y offset of the legend. The offset is relative to the current position of the legend. |
| `Orientation` | [`SankeyLegendOrientation` enum](slug:telerik.blazor.sankeylegendorientation) <br/> (`Horizontal`)  | The orientation of the legend. |
| `Position` | [`SankeyLegendPosition` enum](slug:telerik.blazor.sankeylegendposition) <br/> (`Bottom`)| The position of the legend. |
| `Reverse` | `double?`  | Whether the legend items are reversed. |
| `Spacing` | `double?`  | The spacing between the labels of the legend. |
| `Visible` | `bool?` <br/> (`true`) | Whether the legend is visible. |
| `Width` | `double?`  | The width of the legend. Applies when `Orientation="SankeyLegendOrientation.Horizontal"`. |


## Nested Customization Tags

The `<SankeyLegend>` tag exposes nested tags for further customization of the separate legend elements. The structure of the nested tags is `<SankeyLegend*Specifics*>`, where the specifics can be:

* [`Border`](slug:telerik.blazor.components.sankeylegendborder)
* [`Item`](slug:telerik.blazor.components.sankeylegenditem)
* [`Labels`](slug:telerik.blazor.components.sankeylegendlabels) - exposes additional nested options. The structure of the nested tags is `<SankeyLegendLabels*Specifics*>`, where the specifics can be:
    * [`Margin`](slug:telerik.blazor.components.sankeylegendlabelsmargin)
    * [`Padding`](slug:telerik.blazor.components.sankeylegendlabelspadding)
* [`Margin`](slug:telerik.blazor.components.sankeylegendmargin)
* [`Padding`](slug:telerik.blazor.components.sankeylegendpadding)
* [`Title`](slug:telerik.blazor.components.sankeylegendtitle) - exposes additional nested options. The structure of the nested tags is `<SankeyLegendTitle*Specifics*>`, where the specifics can be:
    * [`Border`](slug:telerik.blazor.components.sankeylegendtitleborder)
    * [`Margin`](slug:telerik.blazor.components.sankeylegendtitlemargin)
    * [`Padding`](slug:telerik.blazor.components.sankeylegendtitlepadding)  

>tip Use the IntelliSense to explore the nested tags and their properties.

## Example

>caption Customizing the Sankey legend by using nested tag settings

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
    <SankeyLegend Position="@SankeyLegendPosition.Top" Background="rgba(255, 99, 88, 0.1)">
        <SankeyLegendTitle Text="Device usage by age groups" Font="bold 17px sans-serif">
            <SankeyLegendTitlePadding Bottom="20"></SankeyLegendTitlePadding>
        </SankeyLegendTitle>
        <SankeyLegendItem AreaOpacity="0.7" />
        <SankeyLegendMargin Bottom="20" />
        <SankeyLegendPadding Top="10" Bottom="10" />
    </SankeyLegend>
</TelerikSankey>

@code {
    private SankeyData? Data { get; set; }

    protected override void OnInitialized()
    {
        var sourceNodes = 3;
        var destinationNodes = 3;

        Data = new SankeyData()
            {
                Nodes = new SankeyDataNodes(),
                Links = new SankeyDataLinks()
            };

        for (int i = 1; i <= sourceNodes + destinationNodes; i++)
        {
            var nodeDescriptor = i <= sourceNodes ? "Source" : "Destination";
            Data.Nodes.Add(new SankeyDataNode() { Id = i, Label = new SankeyDataNodeLabel() { Text = $"{nodeDescriptor} {i}" } });
        }

        for (int i = 1; i <= sourceNodes; i++)
        {
            for (int j = sourceNodes + 1; j <= sourceNodes + destinationNodes; j++)
            {
                Data.Links.Add(new SankeyDataLink()
                    {
                        SourceId = i,
                        TargetId = j,
                        Value = Random.Shared.Next(5, 30)
                    });
            }
        }
    }
}
````

## See Also

* [Live Demo: Sankey Diagram Configuration](https://demos.telerik.com/blazor-ui/sankey/configuration)
* [Sankey Links](slug:sankey-links)
* [Sankey Nodes](slug:sankey-nodes)
* [Sankey Labels](slug:sankey-labels)
* [Sankey Tooltip](slug:sankey-tooltip)
* [Sankey Title](slug:sankey-title)