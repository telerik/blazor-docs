---
title: Data Binding
page_title: Sankey Diagram Data Binding
description: Data Binding of the Sankey Diagram for Blazor.
slug: sankey-data-binding
tags: telerik,blazor,sankey,diagram,chart,data,binding
published: True
position: 3
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)


# Sankey Data Binding

This article describes the data binding mechanism in the Sankey diagram for Blazor and the supported data source type.

## Data Type and Structure

The Sankey diagram for Blazor requires its `Data` parameter to provide all the data for its nodes, links and labels. The `Data` parameter accepts an object of type [`SankeyData`](slug://Telerik.Blazor.Components.SankeyData) that contains the following properties:

| Property | Type | Description |
| --------- | ---- | ----------- |
| `Links` | `SankeyDataLinks` | A [`List<SankeyDataLink>` that describes the links](#link). |
| `Nodes` | `SankeyDataNodes ` | A [`List<SankeyDataNode>` that describes the nodes and their labels](#node). |

### Link

The `SankeyDataLink` object contains all the information for the link. It exposes the following properties:

| Property | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `ColorType` | `SankeyLinksColorType` enum <br/> (`Static`) | The color type of the link. Provides the following values <ul><li>`Static` the link color is set based on the `Color` property;</li><li>`Source` - the link color is set based on the source node color; </li><li>`Target` - the link color is set based on the target node color; </li></ul> |
| `Color` | `string` <br/> (`#666666`)  | The color of the link. Applies when `ColorType="@SankeyLinksColorType.Static"`. |
| `Highlight` | [`SankeyDataLinkHighlight`](slug://Telerik.Blazor.Components.SankeyDataLinkHighlight) | The opacity of the active and inactive links when the user hovers a link. |
| `Opacity` | `double?` <br/> (`0.4`) | The opacity of the link. |
| `SourceId` | `object` | The source node ID of the link. The source node is the node from which the link originates. Required. |
| `TargetId` | `object` | The target node ID of the link. The target node is the node to which the link points. Required. |
| `Value` | `double?` | The value of the link. The value represents the weight of the link and determines the width of the link. Required. |

>tip The visual properties (`Color`, `Opacity` etc.) are not required. You can use these properties to [provide custom settings for the separate links through the data](#customize-elements-through-data). If you want to apply the same settings for all the links in the Sankey use the [component options](slug://sankey-links).

### Node

The `SankeyDataNode` object contains all the information for the node and its label. It exposes the following properties:

| Property | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Color` | `string` | The color of the node. Accepts a valid CSS color string, including hex and rgb. |
| `Id` | `object` | The ID of the node. The ID is used to connect the nodes with the links. Required. |
| `Label` | [`SankeyDataNodeLabel`](slug://Telerik.Blazor.Components.SankeyDataNodeLabel) | Contains all the information for the node label - text, alignment, color, border and more. |
| `Offset` | [`SankeyDataNodeOffset`](slug://Telerik.Blazor.Components.SankeyDataNodeOffset)| The left and top offset of the node from the `<div class="k-sankey">` container. |
| `Opacity` | `double?` <br/> (`1`) | The opacity of the node. |
| `Padding` | `double?` | The minimum vertical space between two nodes. |
| `Width` | `double?` <br/> (`24`)| The width of the node. |
| `Align` | [`SankeyNodesAlign?` enum](slug://telerik.blazor.sankeynodesalign) <br/> (`Stretch`) | The alignment of the node.|

>tip The visual properties (`Color`, `Opacity` etc.) are not required. You can use these properties to [provide custom settings for the separate nodes through the data](#customize-elements-through-data).  If you want to apply the same settings for all the nodes and labels in the Sankey use the component options for [nodes](slug://sankey-nodes) and [labels](slug://sankey-labels).

## Customize Elements Through Data

The example below showcases binding the Sankey data and adding some specific options for the separate nodes, links and labels.

````RAZOR
<TelerikSankey Data="@Data"
               Width="1000px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"/>
    <SankeyLabels>
        <SankeyLabelsStroke Color="none"/>
    </SankeyLabels>
</TelerikSankey>

@code {
    private SankeyData Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new SankeyData()
            {
                Nodes = new SankeyDataNodes()
                {
                    new SankeyDataNode()
                    {
                        Id = 1,
                        Color = "#CC8DD6",
                        Label = new SankeyDataNodeLabel() { Text = "Tablet (12%)", Font="bold 14px sans-serif" }
                    },
                    new SankeyDataNode()
                    {
                        Id = 2,
                        Color = "#2D73F5",
                        Label = new SankeyDataNodeLabel() { Text = "Mobile (40%)", Font="bold 14px sans-serif" }
                    },
                     new SankeyDataNode()
                    {
                        Id = 3,
                        Color = "#28B4C8",
                        Label = new SankeyDataNodeLabel() { Text = "Desktop (48%)", Font="bold 14px sans-serif" }
                    },
                    new SankeyDataNode()
                    {
                        Id = 4,
                        Color = "#78D237",
                        Label = new SankeyDataNodeLabel() { Text = "< 18 years (8%)" }
                    },
                     new SankeyDataNode()
                    {
                        Id = 5,
                        Color = "#FFD246",
                        Label = new SankeyDataNodeLabel() { Text = "18-26 years (35%)" }
                    },
                     new SankeyDataNode()
                    {
                        Id = 6,
                        Color = "#FF6358",
                        Label = new SankeyDataNodeLabel() { Text = "27-40 years (38%)" }
                    },
                     new SankeyDataNode()
                    {
                        Id = 7,
                        Color = "#E7607B",
                        Label = new SankeyDataNodeLabel() {  Text = "> 40 years (19%)" }
                    },
                },

                Links = new SankeyDataLinks()
                {
                    new SankeyDataLink() { SourceId = 1, TargetId = 4, Value = 4, Opacity = 0.3},
                    new SankeyDataLink() { SourceId = 1, TargetId = 7, Value = 8, Opacity = 0.5 },
                    new SankeyDataLink() { SourceId = 2, TargetId = 4, Value = 4, Opacity = 0.3 },
                    new SankeyDataLink() { SourceId = 2, TargetId = 5, Value = 24, Opacity = 0.8 },
                    new SankeyDataLink() { SourceId = 2, TargetId = 6, Value = 10, Opacity = 0.6 },
                    new SankeyDataLink() { SourceId = 2, TargetId = 7, Value = 2, Opacity = 0.2 },
                    new SankeyDataLink() { SourceId = 3, TargetId = 5, Value = 11, Opacity = 0.6 },
                    new SankeyDataLink() { SourceId = 3, TargetId = 6, Value = 28, Opacity = 0.8 },
                    new SankeyDataLink() { SourceId = 3, TargetId = 7, Value = 9, Opacity = 0.5 }
                }
            };
    }
}
````

## Next Steps

* [Add a Title to the Sankey Diagram](slug://sankey-title)
* [Configure the Sankey Legend](slug://sankey-legend)
* [Explore the Sankey Events](slug://sankey-events)

## See Also

* [Live Demo: Sankey Diagram](https://demos.telerik.com/blazor-ui/sankey/overview)
* [Sankey Links](slug://sankey-links)
* [Sankey Nodes](slug://sankey-nodes)
* [Sankey Labels](slug://sankey-labels)