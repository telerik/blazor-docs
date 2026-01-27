---
title: Events
page_title: Sankey Diagram Events
description: Events of the Sankey Diagram for Blazor.
slug: sankey-events
tags: telerik,blazor,sankey,diagram,chart,events
published: True
position: 9
components: ["general"]
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

## OnNodeEnter

The `OnNodeEnter` event fires when the user hovers a node. The `OnNodeEnter` event handler receives an argument of type `SankeyNodeEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

## OnNodeLeave

The `OnNodeLeave` event fires when the user exits the hover from a node. The `OnNodeLeave` event handler receives an argument of type `SankeyNodeLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

## OnLinkClick

The `OnLinkClick` event fires when the user clicks a link. The `OnLinkClick` event handler receives an argument of type `SankeyLinkClickEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the clicked link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the clicked link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

## OnLinkEnter

The `OnLinkEnter` event fires when the user hovers a link. The `OnLinkEnter` event handler receives an argument of type `SankeyLinkEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

## OnLinkLeave

The `OnLinkLeave` event fires when the user hovers a link. The `OnLinkLeave` event handler receives an argument of type `SankeyLinkLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   |

## Example

>caption Handling the Sankey diagram events

````RAZOR
<div style="display:flex; justify-content:stretch">
    <TelerikSankey Data="@Data"
                   OnNodeClick="@OnNodeClick"
                   OnNodeEnter="@OnNodeEnter"
                   OnNodeLeave="@OnNodeLeave"
                   OnLinkClick="@OnLinkClick"
                   OnLinkEnter="@OnLinkEnter"
                   OnLinkLeave="@OnLinkLeave"
                   DisableAutoLayout="true"
                   Width="700px"
                   Height="400px">
        <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
    </TelerikSankey>

    <div style="border:1px solid gray; margin-left:30px; width:400px; height:600px; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items: baseline; padding:5px">
            <h3>Events log:</h3>
            <TelerikButton Icon="@SvgIcon.X" OnClick="@(()=> EventLog = string.Empty)">Clear log</TelerikButton>
        </div>
        @(new MarkupString(EventLog))
    </div>
</div>

@code {
    private SankeyData? Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

    private void OnNodeClick(SankeyNodeClickEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeClick</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";

        LogToConsole(log);
    }

    private void OnNodeEnter(SankeyNodeEnterEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeEnter</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";
        LogToConsole(log);
    }

    private void OnNodeLeave(SankeyNodeLeaveEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeLeave</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";
        LogToConsole(log);
    }

    private void OnLinkClick(SankeyLinkClickEventArgs args)
    {
        var log = string.Empty;
        log += "<div>";
        log += $"<div><code>OnLinkClick</code> event fired:</div>";
        log += $"<ul>";
        log += $"<li><strong>Link Source:</strong>{args.Source.Label.Text}</li>";
        log += $"<li><strong>Link Target:</strong> {args.Target.Label.Text}</li>";
        log += $"</ul>";
        log += "</div>";

        LogToConsole(log);
    }

    private void OnLinkEnter(SankeyLinkEnterEventArgs args)
    {
        var log = string.Empty;
        log += "<div>";
        log += $"<div><code>OnLinkEnter</code> event fired:</div>";
        log += $"<ul>";
        log += $"<li><strong>Link Source:</strong>{args.Source.Label.Text}</li>";
        log += $"<li><strong>Link Target:</strong> {args.Target.Label.Text}</li>";
        log += $"</ul>";
        log += "</div>";

        LogToConsole(log);
    }

    private void OnLinkLeave(SankeyLinkLeaveEventArgs args)
    {
        var log = string.Empty;
        log += "<div>";
        log += $"<div><code>OnLinkLeave</code> event fired:</div>";
        log += $"<ul>";
        log += $"<li><strong>Link Source:</strong>{args.Source.Label.Text}</li>";
        log += $"<li><strong>Link Target:</strong> {args.Target.Label.Text}</li>";
        log += $"</ul>";
        log += "</div>";

        LogToConsole(log);
    }

    private void LogToConsole(string text)
    {
        EventLog = EventLog.Insert(0, text);
    }

    #endregion  Event handlers

    #region Data generation

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

    #endregion Data generation
}
````

## See Also

* [Live Demo: Sankey Diagram Events](https://demos.telerik.com/blazor-ui/sankey/events)
