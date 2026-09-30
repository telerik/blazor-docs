---
title: Tooltip
page_title: Sankey Tooltip
description: Tooltip of the Sankey Diagram for Blazor.
slug: sankey-tooltip
tags: telerik,blazor,sankey,diagram,chart,tooltip
published: True
position: 9
components: ["sankey"]
---
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

# Sankey Tooltip

The Sankey Diagram for Blazor displays Tooltips when the user hovers the links and nodes. You can customize the rendering of these Tooltips through dedicated templates:
* [`LinkTemplate`](#link-tooltip-template)
* [`NodeTemplate`](#node-tooltip-template)

To use the templates, declare a `<SankeyTooltip>` tag as a direct child of `<TelerikSankey>`. Add the desired template inside the `<SankeyTooltip>` tag. 

## Link Tooltip Template

The `LinkTemplate` controls the content of the Tooltip that will appear when the user hovers a link. The `NodeTemplate` exposes a `context` of type 
[`SankeyLinkTooltipTemplateContext`](slug:Telerik.Blazor.Components.SankeyLinkTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment, and more.   |
| `Target` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 
| `Value` | `double?` | The hovered link value. | 

## Node Tooltip Template

The `NodeTemplate` controls the content of the Tooltip that will appear when the user hovers a node. The `NodeTemplate` exposes a `context` of type [`SankeyNodeTooltipTemplateContext`](slug:Telerik.Blazor.Components.SankeyNodeTooltipTemplateContext) which provides the following properties:

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | [`SankeyDataNode`](slug:telerik.blazor.components.sankeydatanode) | The node that the user hovered. The `SankeyDataNode` provides details for the hovered node such as its label, opacity, color, width, offset and alignment.   | 
| `Value` | `double?` | The hovered node value.  | 

## Example

>caption Customizing the Sankey Tooltips

<demo metaUrl="client/sankey/tooltip/example-1/" height="620"></demo>

## See Also

* [Live Demo: Sankey Diagram Configuration](https://demos.telerik.com/blazor-ui/sankey/configuration)
* [Sankey Links](slug:sankey-links)
* [Sankey Nodes](slug:sankey-nodes)
* [Sankey Labels](slug:sankey-labels)
* [Sankey Legend](slug:sankey-legend)
* [Sankey Title](slug:sankey-title)
