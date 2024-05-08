---
title: Events
page_title: Sankey Diagram Events
description: Events of the Sankey Diagram for Blazor.
slug: sankey-diagram-events
tags: telerik,blazor,sankey,diagram,chart,events
published: True
position: 9
---

# Sankey Diagram Events

This article explains the available events for the Telerik Sankey Diagram for Blazor:
* [OnNodeClick](#onnodeclick)
* [OnNodeEnter](#onnodeenter)
* [OnNodeLeave](#onnodeleave)
* [OnLinkClick](#onlinkclick)
* [OnLinkEnter](#onlinkenter)
* [OnLinkLeave](#onlinkleave)

## OnNodeClick


The `OnNodeClick` event fires when the user clicks or taps a node. The `OnNodeClick` event handler receives an argument of type `SankeyNodeClickEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user clicked. The `SankeyDataNode` provides details for the clicked node such as its label, opacity, color, width, offset and alignment.   | 

>caption Handle OnNodeClick

````CSHTML

````

## OnNodeEnter

The `OnNodeEnter` event fires when the user hovers a node. The `OnNodeEnter` event handler receives an argument of type `SankeyNodeEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

>caption Handle OnNodeEnter

````CSHTML

````

## OnNodeLeave

The `OnNodeLeave` event fires when the user exits the hover from a node. The `OnNodeLeave` event handler receives an argument of type `SankeyNodeLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

>caption Handle OnNodeLeave

````CSHTML

````

## OnLinkClick

The `OnLinkClick` event fires when the user clicks a link. The `OnLinkClick` event handler receives an argument of type `SankeyLinkClickEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the clicked link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the clicked link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

>caption Handle OnLinkClick

````CSHTML

````

## OnLinkEnter

The `OnLinkEnter` event fires when the user hovers a link. The `OnLinkEnter` event handler receives an argument of type `SankeyLinkEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

>caption Handle OnLinkEnter

````CSHTML

````

## OnLinkLeave

The `OnLinkLeave` event fires when the user hovers a link. The `OnLinkLeave` event handler receives an argument of type `SankeyLinkLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   |

>caption Handle OnLinkLeave

````CSHTML

````

## See Also

* [Live Demo: Sankey Diagram Events](https://demos.telerik.com/blazor-ui/sankeydiagram/events)
