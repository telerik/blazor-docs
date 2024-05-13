---
title: Nodes
page_title: Sankey Diagram Nodes
description: Sankey Diagram Nodes
slug: sankey-diagram-nodes
tags: telerik,blazor,sankey,diagram,chart,nodes
published: True
position: 0
---

# Sankey Diagram Nodes

The Sankey Diagram Nodes are rectangular elements that are being connected. They can be source and target for the [links]{%slug sankey-diagram-links%}. This article explains how to customize the nodes in the UI for Blazor Sankey Diagram. The listed settings will be applied to all nodes in the Sankey Diagram.

## Basic Customization

To customize the nodes, declare the `<SankeyNodes>` tag as a direct child of `<TelerikSankey>`. It exposes the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Align` | `SankeyNodesAlign` enum <br/> (`SankeyNodesAlign.stretch`) | The nodes alignment. Supports `stretch`, `right` and `left` values. |
| `Padding` | `double?` | The vertical space between the nodes. |
| `Width` | `double?` | The width of the nodes. |

## Nested Customization Tags

The `<SankeyNodes>` tag exposes a child `<SankeyNodesOffset>` tag that allows you to control the offset of the nodes from the `<div class="k-sankey">` container. It provides the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left offset of the node. |
| `Top` | `double?` | The top offset of the node. |

## Example

Here is an example customization of the nodes in the Sankey Diagram.

````CSHTML
<TelerikSankey Data="@Data"
               Width="700px"
               Height="400px">
    <SankeyNodes Align="SankeyNodesAlign.left" Padding="40" Width="50">
       <SankeyNodesOffset Left="50" Top="50"></SankeyNodesOffset>       
   </SankeyNodes>
</TelerikSankey>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;
    
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