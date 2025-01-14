---
title: Nodes
page_title: Sankey Nodes
description: Nodes in the Sankey diagram for Blazor.
slug: sankey-nodes
tags: telerik,blazor,sankey,diagram,chart,nodes
published: True
position: 0
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Nodes

The Sankey diagram Nodes are rectangular elements that are being connected. They can be source and target for the [links](slug://sankey-links). This article explains how to customize the nodes in the UI for Blazor Sankey diagram. 

>tip Each setting applies to all nodes in the Sankey diagram. If you want to provide different settings for the separate nodes, [customize them through the data source](slug://sankey-data-binding#customize-elements-through-data).

## Basic Customization

To customize the nodes, declare the `<SankeyNodes>` tag as a direct child of `<TelerikSankey>`. The `<SankeyNodes>` tag exposes the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `Align` | [`SankeyNodesAlign` enum](/blazor-ui/api/telerik.blazor.sankeynodesalign) <br/> (`Stretch`) | The nodes alignment. |
| `Padding` | `double?` | The vertical space between the nodes. |
| `Width` | `double?` <br/> (`24`)| The width of the nodes. |

## Nested Customization Tags

The `<SankeyNodes>` tag exposes a child `<SankeyNodesOffset>` tag that allows you to control the offset of the nodes from the `<div class="k-sankey">` container. It provides the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left offset of the node. |
| `Top` | `double?` | The top offset of the node. |

## Example

>caption Customizing the nodes in the Sankey diagram

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyNodes Align="SankeyNodesAlign.Left" Padding="40" Width="50">
        <SankeyNodesOffset Left="50" Top="50"></SankeyNodesOffset>
    </SankeyNodes>
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
* [Sankey Links](slug://sankey-links)
* [Sankey Labels](slug://sankey-labels)
* [Sankey Legend](slug://sankey-legend)
* [Sankey Title](slug://sankey-title)
* [Sankey Tooltip](slug://sankey-tooltip)