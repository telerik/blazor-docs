---
title: Links
page_title: Sankey Links
description: Links in the Sankey Diagram for Blazor.
slug: sankey-links
tags: telerik,blazor,sankey,diagram,chart,links
published: True
position: 3
components: ["sankey"]
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Links

The Sankey Diagram Links are the lines that connect the [nodes](slug:sankey-nodes) to each other. The greater the value of the link, the greater the width of the link will be. This article explains how to customize the links in the UI for Blazor Sankey Diagram.

>tip Each setting applies to all links in the Sankey Diagram. If you want to provide different settings for the separate links, [customize them through the data source](slug:sankey-data-binding#customize-elements-through-data).

## Basic Customization

To customize the nodes, declare the `<SankeyLinks>` tag as a direct child of `<TelerikSankey>`. The `<SankeyLinks>` tag exposes the following parameters:

| Parameter | Type and Default&nbsp;Value | Description |
| --------- | ---- | ----------- |
| `ColorType` | [`SankeyLinksColorType` enum](slug:telerik.blazor.sankeylinkscolortype) <br /> (`Static`) | The origin of the link color: could be based on the `Color` property, on the source node color, or on the target node color. |
| `Color` | `string` <br/> (`#666666`) | The color of the links. Applies when `ColorType="@SankeyLinksColorType.Static"`. |
| `Opacity` | `double?` <br/> (`0.4`) | The opacity of the links. |

## Nested Customization Tags

The `<SankeyLinks>` tag exposes a child `<SankeyLinksHighlight>` tag that allows you to control the opacity of the links when the user hovers a link. It provides the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `Opacity` | `double?` <br/> (`0.8`) | The opacity of the link when the user hovers it. |
| `InactiveOpacity` | `double?` <br/> (`0.2`) | The opacity of the non-hovered (inactive) links when the user hovers a link. |

## Example

>caption Customizing the links in the Sankey diagram

````RAZOR
<TelerikSankey Data="@Data"
               DisableAutoLayout="true"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Target" Opacity="0.5">
        <SankeyLinksHighlight Opacity="0.7" InactiveOpacity="0.2"></SankeyLinksHighlight>
    </SankeyLinks>
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
* [Sankey Nodes](slug:sankey-nodes)
* [Sankey Labels](slug:sankey-labels)
* [Sankey Legend](slug:sankey-legend)
* [Sankey Title](slug:sankey-title)
* [Sankey Tooltip](slug:sankey-tooltip)