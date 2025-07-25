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

The connections in the Telerik Diagram for Blazor signify the relationship between two shapes (graph nodes). This article describes all Diagram connection customization options.

## Basics

A connection is a link that shows a relationship between two Diagram shapes. A connection can also span across points with specific coordinates, with no associated shapes.

The fundamental settings of the Telerik Diagram connections (`<DiagramConnection>`) include:

* The `FromId` and `ToId` parameters must match the associated [shape `Id`s](slug:diagram-shapes#basics). You can also define a connection that does not link shapes. In this case, use the `X` and `Y` parameters of the child tags `<DiagramConnectionFrom>` and `<DiagramConnectionTo>`.
* The [connection `Type`](#connection-types) determines the connection route and route angles.
* The connection [cap `Type`](#cap-types) determines whether the connections appear directed or undirected.
* The `Selectable` parameter of `<DiagramConnectionDefaults>` sets if connections can be selected, which determines the ability to [drag or remove](#editability) them.
* `Text` defines the connection label. Use the child `<DiagramConnectionContent>` tag to set it.

>caption Using Basic Connection Parameters

````RAZOR.skip-repl
<DiagramConnection FromId="shape1" ToId="shape2">
    <DiagramConnectionContent Text="1 to 2" />
</DiagramConnection>
````

>caption Using Connections without Shapes

````RAZOR.skip-repl
<DiagramConnection>
    <DiagramConnectionFrom X="50" Y="100" />
    <DiagramConnectionTo X="150" Y="200" />
</DiagramConnection>
````

## Connection Types

The available Diagram connection types include:

* `Cascading` (default)&mdash;connections display as rectangular routes with one or more right angles. The cascading connection type is suitable for [tree Diagram layouts](slug:diagram-layouts#tree-layout), as the connections enhance the representation of a hierarchy.
* `Polyline`&mdash;connections display as polylines that connect the related shapes and all intermediate points. If [connection points](#connection-points) are not defined, then the connection displays as a straight line.

>caption Setting Connection Type Globally

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Polyline" />
</TelerikDiagram>
````

>caption Setting Type per Connection

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnections>
        <DiagramConnection Type="@DiagramConnectionType.Cascading" />
    </DiagramConnections>
</TelerikDiagram>
````

### Connection Points

[`Polyline` connections](#connection-types) can pass through multiple points at specific coordinates, no matter if the connections link shapes or not.

>caption Using Connection Points

````RAZOR
<TelerikDiagram>
    <DiagramConnections>
        <DiagramConnection Type="@DiagramConnectionType.Polyline">
            <DiagramConnectionFrom X="20" Y="20" />
            <DiagramConnectionTo X="200" Y="200" />
            <DiagramConnectionPoints>
                <DiagramConnectionPoint X="150" Y="50" />
                <DiagramConnectionPoint X="50" Y="100" />
                <DiagramConnectionPoint X="150" Y="150" />
                <DiagramConnectionPoint X="100" Y="170" />
            </DiagramConnectionPoints>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Cap Types

The link between two Diagram shapes is always defined through the `FromId` and `ToId` parameters of the `<DiagramConnection>` tag. From this point of view, a Diagram connection is always directed. However, you can configure the connections to appear bi-directional or non-directional.

The available cap types are the members of the `DiagramConnectionsStartCapType` and `DiagramConnectionsEndCapType` enums:

* `ArrowEnd`&mdash;the cap arrow points away from the connection, towards the shape
* `FilledCircle` (default)
* `None`

The configure cap types globally for all connections, use the `Type` parameter of `<DiagramConnectionDefaultsStartCap>` and `<DiagramConnectionDefaultsEndCap>`. To configure the cap types of a specific connection, use the `Type` parameter of `<DiagramConnectionStartCap>` and `<DiagramConnectionEndCap>`.

Note the difference between caps and selection handles:

* The caps are visible when a connection is not selected.
* The selection handles are visible when a connection is selected (clicked).

>caption Setting global and connection-specific cap types

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnectionDefaults>
        <DiagramConnectionDefaultsEndCap Type="@DiagramConnectionsEndCapType.ArrowEnd" />
        <DiagramConnectionDefaultsStartCap Type="@DiagramConnectionsStartCapType.ArrowEnd" />
    </DiagramConnectionDefaults>

    <DiagramConnections>
        <DiagramConnection>
            <DiagramConnectionEndCap Type="@DiagramConnectionsEndCapType.FilledCircle" />
            <DiagramConnectionStartCap Type="@DiagramConnectionsStartCapType.FilledCircle" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

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

## Styling

The following connection styling options are available in child tags of `<DiagramConnectionDefaults>` and `<DiagramConnection>`:

* Text color and font properties, when using connection content
* Background color (fill) for the connection caps
* Background color (fill) for the default and hover states of the selection handles
* Border (stroke) color, type, and width for the caps and selection handles

>caption Setting global and connection-specific color styles

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnectionDefaults>
        <DiagramConnectionDefaultsEndCap>
            <DiagramConnectionDefaultsEndCapFill Color="yellow" />
            <DiagramConnectionDefaultsEndCapStroke Color="red" />
        </DiagramConnectionDefaultsEndCap>
        <DiagramConnectionDefaultsStartCap>
            <DiagramConnectionDefaultsStartCapFill Color="yellow" />
            <DiagramConnectionDefaultsStartCapStroke Color="red" />
        </DiagramConnectionDefaultsStartCap>
        <DiagramConnectionDefaultsStroke Color="black" />
    </DiagramConnectionDefaults>

    <DiagramConnections>
        <DiagramConnection>
            <DiagramConnectionEndCap>
                <DiagramConnectionEndCapFill Color="lightblue" />
                <DiagramConnectionEndCapStroke Color="blue" />
            </DiagramConnectionEndCap>
            <DiagramConnectionStartCap>
                <DiagramConnectionStartCapFill Color="lightblue" />
                <DiagramConnectionStartCapStroke Color="blue" />
            </DiagramConnectionStartCap>
            <DiagramConnectionStroke Color="purple" />
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
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="Shape 3" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1"
                           ToId="shape2"
                           FromConnector="@DiagramConnectionsFromConnector.Left">
            <DiagramConnectionPoints>
                <DiagramConnectionPoint X="80" Y="120" />
                <DiagramConnectionPoint X="120" Y="160" />
            </DiagramConnectionPoints>
            <DiagramConnectionStartCap Type="@DiagramConnectionsStartCapType.ArrowEnd" />
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
            <DiagramConnectionContent Text="Connection with no shapes and caps" Color="red" FontStyle="italic" />
            <DiagramConnectionEndCap Type="@DiagramConnectionsEndCapType.None" />
            <DiagramConnectionFrom X="330" Y="100" />
            <DiagramConnectionStartCap Type="@DiagramConnectionsStartCapType.None" />
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
