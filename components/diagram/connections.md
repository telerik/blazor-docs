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

The connections in the Telerik Diagram for Blazor signify the relationship between two shapes (graph nodes). This article describes the connection customization options that the Diagram provides.

## Basics

The fundamental settings of the Telerik Diagram connections include:

* The [connection `Type`](#connection-types) determines whether the .
* Selectable
* Cap Type

## Connection Types

## Editability

By default, the Diagram allows users to:

* Drag a connection by its start and end cap to link other shapes than the current ones.
* Remove the selected connection(s).

To restrict these operations globally for all connections, use the parameters of the `<DiagramConnectionDefaultsEditable>` tag.

To restrict operations for a specific connection, use the parameters of the `<DiagramConnectionEditable>` tag.

Connection dragging and removing requires the `Selectable` parameter of `<DiagramConnectionDefaults>` to be set to `true`, which is by default.

>caption Setting global and connection-specific editing options

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnectionDefaults Selectable="true">
        <DiagramConnectionDefaultsEditable Drag="true" Remove="true" />
    </DiagramConnectionDefaults>

    <DiagramConnections>
        <DiagramConnection>
            <DiagramConnectionEditable Enabled="false" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Example

>caption Customize Diagram Connections

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
        <DiagramConnection FromId="shape1" ToId="shape2" FromConnector="@DiagramConnectionsFromConnector.Left">
            <DiagramConnectionPoints>
                <DiagramConnectionPoint X="100" Y="120" />
            </DiagramConnectionPoints>
        </DiagramConnection>
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
            <DiagramConnectionContent Text="Connection with no shapes" />
            <DiagramConnectionFrom X="330" Y="100" />
            <DiagramConnectionTo X="400" Y="200" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Visual Function

You can draw additional connection content by using the API of the Diagram's JavaScript rendering engine. This is an advanced scenario that is recommended only if the desired result cannot be achieved in another way.

To use a visual function:

1. Get familiar with the [related JavaScript API and available visual primitives](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual).
1. Implement a JavaScript function that returns a [`TelerikBlazor.DiagramCommon.Group` JavaScript object](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/group).
1. Set the `Visual` parameter of `<DiagramConnectionDefaultsContent>` or `<DiagramConnectionContent>` tag to the JavaScript function name. The first approach affects all connections, while the second one affects a specific connection.

> This section links to the documentation of Kendo UI for jQuery. The Telerik Diagram for Blazor is not a wrapper of the Kendo UI Diagram. However, both components use the same client-side rendering engine. When the Kendo UI documentation mentions the `kendo.dataviz.diagram` JavaScript namespace, you must use `TelerikBlazor.DiagramCommon` instead.

>caption Using Diagram connection visual function

````RAZOR
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"></DiagramLayout>

    <DiagramConnectionDefaults Type="@DiagramConnectionType.Polyline">
        <DiagramConnectionDefaultsContent Visual="" />
    </DiagramConnectionDefaults>

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Template="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="Shape 3" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2">
            <DiagramConnectionContent Visual="connectionVisualFunction12" />
        </DiagramConnection>
        <DiagramConnection FromId="shape1" ToId="shape3">
            <DiagramConnectionContent Visual="connectionVisualFunction13" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>

@* Move JavaScript code to an external JS file *@
<script suppress-error="BL9992">
    function connectionVisualFunction12(context) {
        return connectionVisualFunction(context, "1 to 2", "green");
    }
    function connectionVisualFunction13(context) {
        return connectionVisualFunction(context, "1 to 3", "red");
    }

    function connectionVisualFunction(context, text, color) {
        var g = new TelerikBlazor.DiagramCommon.Group({
            autoSize: true
        });

        var circle = new TelerikBlazor.DiagramCommon.Circle({
            width: 16,
            height: 16,
            fill: {
                color: color
            }
        });

        var text = new TelerikBlazor.DiagramCommon.TextBlock({
            text: text,
            fontSize: 16,
            x: 20
        });

        g.append(circle);
        g.append(text);

        return g;
    }
</script>
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
