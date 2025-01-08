---
title: Overview
page_title: Sankey Overview
description: Overview of the Sankey diagram for Blazor.
slug: sankey-overview
tags: telerik,blazor,sankey,diagram,chart,overview
published: True
position: 0
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Blazor Sankey Overview

The <a href = "https://www.telerik.com/blazor-ui/sankey-chart" target="_blank">Blazor Sankey diagram component</a> allows you to visualize changing flows and their distribution between domains. Sankey diagrams suit a variety of use cases like the representation of website traffic, budget breakdowns, energy flow, and others.

## Creating Blazor Sankey Diagram

1. Add the `<TelerikSankey>` tag to your razor page.
1. [Bind the Sankey Data](slug://sankey-data-binding) - the Sankey diagram expects its data to have a specific structure and use specific object types.
1. (Optional) Set the [`ColorType` of the `SankeyLinks`](slug://sankey-links).
1. (Optional) Set `Width` and `Height` of the Sankey chart.

>caption Sankey diagram with width, height and link colors based on the source nodes

````RAZOR
<TelerikSankey Data="@Data"
               Width="1000px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source" />
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

## Data Members

The Sankey component uses three main building blocks for the visual data representation:

* [Nodes](slug://sankey-nodes) - rectangular elements that can be connected to each other.
* [Labels](slug://sankey-labels) - the names of the nodes.
* [Links](slug://sankey-links) - the lines that connect the nodes to each other.

## Data Binding

The Sankey `Data` accepts an object of type `SankeyData` that contains all the information for the nodes, links and labels. [Read more about the data binding specifics in the Sankey diagram...](slug://sankey-data-binding)

## Title

You can add a short description of the Sankey's purpose by using the `<SankeyTitle>` tag and the `Text` parameter. In addition, [you can customize the appearance of the title through the dedicated parameters](slug://sankey-title).

## Tooltip

The Sankey chart shows a tooltip when the user hovers a node or a link that contains details for the hovered element. Use the [Tooltip Templates if you want to customize their content and appearance](slug://sankey-tooltip).

## Legend

By design, the Sankey renders a legend that illustrates the node details. You can [customize the legend or remove it](slug://sankey-legend) depending on the application needs.

## Sankey Parameters

The Blazor Sankey diagram provides various parameters to configure the component. Also check the [Sankey public API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSankey).

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `Class`  | `string` | Renders a custom CSS class on the `<div class="k-sankey">` element. |
| `DisableAutoLayout`  | `bool?` | Whether the Sankey rearranges the nodes and their corresponding links for better visual appearance and readability. If set to `true`, the order of the nodes and links will be determined based on their order in the data collection. |
| `Width`  | `string` | Controls the width of the Sankey. |
| `Height`  | `string` | Controls the height of the Sankey. |

## Next Steps

* [Bind Data to the Sankey Diagram](slug://sankey-data-binding)
* [Explore the Sankey Elements](slug://sankey-events)

## See Also

* [Live Demos: Sankey diagram](https://demos.telerik.com/blazor-ui/sankey/overview)
* [Sankey diagram API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSankey)
