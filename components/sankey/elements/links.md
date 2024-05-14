---
title: Links
page_title: Sankey Diagram Links
description: Sankey Diagram Links
slug: sankey-links
tags: telerik,blazor,sankey,diagram,chart,links
published: True
position: 3
---

# Sankey Diagram Links

The Sankey Diagram Links are the lines that connect the [nodes]{%slug sankey-nodes%} to each other. The greater the value of the link, the greater the width of the link will be. This article explains how to customize the links in the UI for Blazor Sankey Diagram.

>tip Each setting applies to all links in the Sankey Diagram. If you want to provide different settings for the separate links, [customize them through the data source]({%slug sankey-data-binding%}#customize-elements-through-data).

## Basic Customization

To customize the nodes, declare the `<SankeyLinks>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLinks>` tag exposes the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `ColorType` | `SankeyLinksColorType` enum <br/> (`SankeyLinksColorType.Static`) | The color type of the link. Provides the following values <ul><li>`Static` the link color is set based on the `Color` property;</li><li>`Source` - the link color is set based on the source node color; </li><li>`Target` - the link color is set based on the target node color; </li></ul> |
| `Color` | `string` | The color of the links. Applies when `ColorType="@SankeyLinksColorType.Static"`. |
| `Opacity` | `double?` | The opacity of the links. |

## Nested Customization Tags

The `<SankeyLinks>` tag exposes a child `<SankeyLinksHighlight>` tag that allows you to control the offset of the nodes from the `<div class="k-sankey">` container. It provides the following parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Left` | `double?` | The left offset of the node. |
| `Top` | `double?` | The top offset of the node. |

## Example

Here is an example customization of the links in the Sankey Diagram.

````CSHTML
<TelerikSankey Data="@Data"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Target" Opacity="0.5">
               <SankeyLinksHighlight Opacity="0.7" InactiveOpacity="0.2"></SankeyLinksHighlight>
    </SankeyLinks>
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