---
title: Events
page_title: Sankey Diagram Events
description: Events of the Sankey Diagram for Blazor.
slug: sankey-events
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
<TelerikSankey Data="@Data"
               OnNodeClick="@OnNodeClick"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px;width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

    private void OnNodeClick(SankeyNodeClickEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeClick</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";

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

## OnNodeEnter

The `OnNodeEnter` event fires when the user hovers a node. The `OnNodeEnter` event handler receives an argument of type `SankeyNodeEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

>caption Handle OnNodeEnter

````CSHTML
<TelerikSankey Data="@Data"
               OnNodeEnter="@OnNodeEnter"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px; width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

    private void OnNodeEnter(SankeyNodeEnterEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeEnter</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";
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

## OnNodeLeave

The `OnNodeLeave` event fires when the user exits the hover from a node. The `OnNodeLeave` event handler receives an argument of type `SankeyNodeLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `DataItem` | `SankeyDataNode` | The node that the user hovered. Provides details for the node such as its label, opacity, color, width, offset and alignment.   | 

>caption Handle OnNodeLeave

````CSHTML
<TelerikSankey Data="@Data"
               OnNodeLeave="@OnNodeLeave"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px; width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

    private void OnNodeLeave(SankeyNodeLeaveEventArgs args)
    {
        var log = string.Empty;
        log += $"<div><code>OnNodeLeave</code> event fired for node <strong>\"{args.DataItem.Label.Text}\"</strong></div>";
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

## OnLinkClick

The `OnLinkClick` event fires when the user clicks a link. The `OnLinkClick` event handler receives an argument of type `SankeyLinkClickEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the clicked link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the clicked link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

>caption Handle OnLinkClick

````CSHTML
<TelerikSankey Data="@Data"
               OnLinkClick="@OnLinkClick"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px; width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

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

    private void LogToConsole(string text)
    {
        EventLog = EventLog.Insert(0, text);
    }

    #endregion  Event handlers

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

## OnLinkEnter

The `OnLinkEnter` event fires when the user hovers a link. The `OnLinkEnter` event handler receives an argument of type `SankeyLinkEnterEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the hovered link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the hovered link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   | 

>caption Handle OnLinkEnter

````CSHTML
<TelerikSankey Data="@Data"
               OnLinkEnter="@OnLinkEnter"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px; width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

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

    private void LogToConsole(string text)
    {
        EventLog = EventLog.Insert(0, text);
    }

    #endregion  Event handlers

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

## OnLinkLeave

The `OnLinkLeave` event fires when the user hovers a link. The `OnLinkLeave` event handler receives an argument of type `SankeyLinkLeaveEventArgs`, which exposes the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Source` | `SankeyDataNode` | The source of the link. Provides details for the source node such as its label, opacity, color, width, offset, alignment and more.   |
| `Target` | `SankeyDataNode` | The target of the link. Provides details for the target node such as its label, opacity, color, width, offset, alignment and more.   |

>caption Handle OnLinkLeave

````CSHTML
<TelerikSankey Data="@Data"
               OnLinkLeave="@OnLinkLeave"
               Width="700px"
               Height="400px">
    <SankeyLinks ColorType="@SankeyLinksColorType.Source"></SankeyLinks>
</TelerikSankey>

<div style="border:1px solid gray; margin-left:10px; width:400px">
    <h3>Events log:</h3>
    @(new MarkupString(EventLog))
</div>

@code {
    private SankeyData Data { get; set; }
    private string EventLog { get; set; } = string.Empty;

    #region Event handlers

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

## See Also

* [Live Demo: Sankey Diagram Events](https://demos.telerik.com/blazor-ui/sankey/events)
