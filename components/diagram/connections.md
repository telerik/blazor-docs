---
title: Connections
page_title: Diagram - Connections
description: Learn about 
slug: diagram-connections
tags: telerik,blazor,diagram
published: True
position: 30
---

# Blazor Diagram Connections

## Example

````RAZOR
<TelerikDiagram Height="420px">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Polyline" Selectable="true">
        <DiagramConnectionDefaultsEditable Drag="true" Enabled="true" Remove="true" />
        <DiagramConnectionDefaultsEndCap Type="@DiagramConnectionsEndCapType.ArrowEnd">
            <DiagramConnectionDefaultsEndCapFill Color="yellow" />
            <DiagramConnectionDefaultsEndCapStroke Color="red" Width="2" DashType="@DashType.Solid" />
        </DiagramConnectionDefaultsEndCap>
        <DiagramConnectionDefaultsHover>
            <DiagramConnectionDefaultsHoverStroke Color="orange" />
        </DiagramConnectionDefaultsHover>
        <DiagramConnectionDefaultsSelection>
            <DiagramConnectionDefaultsSelectionHandles Height="10" Width="10">
                <DiagramConnectionDefaultsSelectionHandlesFill Color="purple" />
                <DiagramConnectionDefaultsSelectionHandlesStroke Color="black" />
            </DiagramConnectionDefaultsSelectionHandles>
        </DiagramConnectionDefaultsSelection>
        <DiagramConnectionDefaultsStartCap Type="@DiagramConnectionsStartCapType.FilledCircle">
            <DiagramConnectionDefaultsStartCapFill Color="yellow" />
            <DiagramConnectionDefaultsStartCapStroke Color="red" Width="2" />
        </DiagramConnectionDefaultsStartCap>
        <DiagramConnectionDefaultsStroke Color="black" Width="3" />
    </DiagramConnectionDefaults>

    <DiagramLayout Type="@DiagramLayoutType.Tree"></DiagramLayout>

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Shape 1">
            </DiagramShapeContent>
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2">
            </DiagramShapeContent>
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="Shape 3">
            </DiagramShapeContent>
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" Type="@DiagramConnectionType.Cascading">
            <DiagramConnectionContent Text="1 to 3" />
            <DiagramConnectionEditable Enabled="false" />
            <DiagramConnectionEndCap Type="@DiagramConnectionsEndCapType.FilledCircle">
                <DiagramConnectionEndCapFill Color="lightblue" />
                <DiagramConnectionEndCapStroke Color="blue" DashType="@DashType.Solid" Width="2" />
            </DiagramConnectionEndCap>
            <DiagramConnectionHover>
                <DiagramConnectionHoverStroke Color="purple" />
            </DiagramConnectionHover>
            <DiagramConnectionSelection>
                <DiagramConnectionSelectionHandles Height="16" Width="16">
                    <DiagramConnectionSelectionHandlesFill Color="lime" />
                    <DiagramConnectionSelectionHandlesStroke Color="green" />
                </DiagramConnectionSelectionHandles>
            </DiagramConnectionSelection>
            <DiagramConnectionStartCap Type="@DiagramConnectionsStartCapType.FilledCircle">
                <DiagramConnectionStartCapFill Color="lightblue" />
                <DiagramConnectionStartCapStroke Color="blue" DashType="@DashType.Solid" Width="2" />
            </DiagramConnectionStartCap>
            <DiagramConnectionStroke Color="lightblue" Width="5" />
        </DiagramConnection>
        <DiagramConnection>
            <DiagramConnectionContent Text="connection with no shapes" />
            <DiagramConnectionFrom X="300" Y="100" />
            <DiagramConnectionTo X="400" Y="200" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
