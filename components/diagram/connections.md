---
title: Connections
page_title: Diagram - Connections
description: Learn about 
slug: diagram-connections
tags: telerik,blazor,diagram
published: True
position: 30
components: ["diagram"]
---

# Blazor Diagram Connections

The Connections in the Telerik Diagram for Blazor signify the relationship between two Shapes (graph nodes). This article describes all Diagram Connection customization options.

## Basics

A Connection is a link that shows a relationship between two Diagram Shapes. A Connection can also span across points with specific coordinates, with no associated Shapes.

The fundamental settings of the Telerik Diagram Connections (`<DiagramConnection>`) include:

* The `FromId` and `ToId` parameters must match the associated [Shape `Id`s](slug:diagram-shapes#basics). You can also define a Connection that does not link Shapes. In this case, use the `X` and `Y` parameters of the child tags `<DiagramConnectionFrom>` and `<DiagramConnectionTo>`.
* The [Connection `Type`](#connection-types) determines the Connection route and route angles.
* The Connection [cap `Type`](#cap-types) determines whether the Connections appear directed or undirected.
* The `Selectable` parameter of `<DiagramConnectionDefaults>` sets if Connections can be selected, which determines the ability to [drag or remove](#editability) them.
* `Text` defines the Connection label. Use the child `<DiagramConnectionContent>` tag to set it.

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

In addition to the above, you can use the `DataItem` Connection parameter to provide an object with additional values to be used in a [visual function](#visual-function).

## Connection Types

The available Diagram Connection types include:

* `Cascading` (default)&mdash;Connections display as rectangular routes with one or more right angles. The cascading Connection type is suitable for [tree Diagram layouts](slug:diagram-layouts#tree-layout), as the Connections enhance the representation of a hierarchy.
* `Polyline`&mdash;Connections display as polylines that connect the related Shapes and all intermediate points. If [Connection points](#connection-points) are not defined, then the Connection displays as a straight line.

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

[`Polyline` Connections](#connection-types) can pass through multiple points at specific coordinates, no matter if the Connections link Shapes or not.

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

The link between two Diagram Shapes is always defined through the `FromId` and `ToId` parameters of the `<DiagramConnection>` tag. From this point of view, a Diagram Connection is always directed. However, you can configure the Connections to appear bi-directional or non-directional.

The available cap types are the members of the `DiagramConnectionsStartCapType` and `DiagramConnectionsEndCapType` enums:

* `ArrowEnd`&mdash;the cap arrow points away from the Connection, towards the Shape
* `FilledCircle` (default)
* `None`

The configure cap types globally for all Connections, use the `Type` parameter of `<DiagramConnectionDefaultsStartCap>` and `<DiagramConnectionDefaultsEndCap>`. To configure the cap types of a specific Connection, use the `Type` parameter of `<DiagramConnectionStartCap>` and `<DiagramConnectionEndCap>`.

Note the difference between caps and selection handles:

* The caps are visible when a Connection is not selected.
* The selection handles are visible when a Connection is selected (clicked).

>caption Setting global and Connection-specific cap types

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

## Connection Text

The Diagram allows you to display text labels on Connections and control their position and offset from the Connection path. You can configure the text content, color, and precise positioning relative to the Connection.

The text positioning is controlled by two parameters:

* `Offset`&mdash;the distance in pixels between the label and the Connection path
* Position settings that use the following enums:
    * `DiagramConnectionsContentPositionHorizontal`&mdash;`Left` or `Right`
    * `DiagramConnectionsContentPositionVertical`&mdash;`Top` or `Bottom`

To configure Connection text globally for all Connections, use the `Text`, `Color`, and `Offset` parameters of `<DiagramConnectionDefaultsContent>`, and the `Horizontal` and `Vertical` parameters of `<DiagramConnectionDefaultsContentPosition>`.

To configure the text for a specific Connection, use the `Text`, `Color`, and `Offset` parameters of `<DiagramConnectionContent>`, and the `Horizontal` and `Vertical` parameters of `<DiagramConnectionContentPosition>`.

>caption Setting Connection text with positioning

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnections>
        <DiagramConnection FromId="1" ToId="2">
            <DiagramConnectionStroke />
            <DiagramConnectionContent Text="Connection 1" Color="red" Offset="16">
                <DiagramConnectionContentPosition Vertical="@DiagramConnectionsContentPositionVertical.Bottom"
                                                  Horizontal="@DiagramConnectionsContentPositionHorizontal.Right" />
            </DiagramConnectionContent>
        </DiagramConnection>

        <DiagramConnection FromId="3" ToId="1">
            <DiagramConnectionStroke />
            <DiagramConnectionContent Text="Connection 3" Color="blue" Offset="10">
                <DiagramConnectionContentPosition Vertical="@DiagramConnectionsContentPositionVertical.Top"
                                                  Horizontal="@DiagramConnectionsContentPositionHorizontal.Left" />
            </DiagramConnectionContent>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Tooltips

The Diagram allows you to display tooltips when hovering over Connections. Each Connection requires explicit tooltip content configuration through the `Template` parameter.

The available tooltip parameters are:

* `Visible` (bool, default: `false`)&mdash;controls whether the tooltip is displayed on hover
* `Class` (string)&mdash;applies a custom CSS class to the tooltip for styling
* `Template` (RenderFragment)&mdash;defines the custom content to display in the tooltip

>caption Configuring Connection tooltips

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection Id="connection1" FromId="shape1" ToId="shape2">
            <DiagramConnectionStroke Color="red" />
            <DiagramConnectionContent Text="Connection 1" Color="ff0000" Offset="16">
                <DiagramConnectionContentPosition Vertical="@DiagramConnectionsContentPositionVertical.Bottom"
                                                  Horizontal="@DiagramConnectionsContentPositionHorizontal.Right" />
            </DiagramConnectionContent>
            <DiagramConnectionTooltip Class="connection1" Visible="true">
                <Template>
                    <div>
                        id: 1
                    </div>
                </Template>
            </DiagramConnectionTooltip>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Selection Handles

Selection handles are the additional visual elements that appear at both ends of a Connection when it is selected (clicked). The handles appear on top of the [caps and connectors](slug:diagram-overview#diagram-elements).

>caption Configure selection handles globally and per Connection

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramConnectionDefaults>
        <DiagramConnectionDefaultsSelection>
            <DiagramConnectionDefaultsSelectionHandles Height="10" Width="10">
                <DiagramConnectionDefaultsSelectionHandlesFill Color="purple" />
                <DiagramConnectionDefaultsSelectionHandlesStroke Color="black" />
            </DiagramConnectionDefaultsSelectionHandles>
        </DiagramConnectionDefaultsSelection>
    </DiagramConnectionDefaults>

    <DiagramConnections>
        <DiagramConnection>
            <DiagramConnectionSelection>
                <DiagramConnectionSelectionHandles Height="16" Width="16">
                    <DiagramConnectionSelectionHandlesFill Color="lime" />
                    <DiagramConnectionSelectionHandlesStroke Color="green" />
                </DiagramConnectionSelectionHandles>
            </DiagramConnectionSelection>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Editability

By default, the Diagram allows users to:

* Drag a Connection by its start and end cap to link other Shapes than the current ones.
* Drag an entire Connection to reposition it while preserving its structure and shape endpoints.
* Remove the selected Connection(s).

To restrict these operations globally for all Connections, use the parameters of the `<DiagramConnectionDefaultsEditable>` tag.

To restrict operations for a specific Connection, use the parameters of the `<DiagramConnectionEditable>` tag.

Connection dragging and removing requires the `Selectable` parameter of `<DiagramConnectionDefaults>` to be set to `true`, which is by default.

To track dragging operations, handle the [`OnConnectionDragStart`](slug:diagram-events#onconnectiondragstart) and [`OnConnectionDragEnd`](slug:diagram-events#onconnectiondragend) events.

>caption Setting global and Connection-specific editing options

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

### Resizable Connections

The Diagram allows users to reshape connections by dragging their intermediate [connection points](#connection-points). To enable this functionality, use the `Points` child configuration of the editable settings.

* To enable editable connection points globally for all Connections, use the `<DiagramConnectionDefaultsEditablePoints>` tag inside `<DiagramConnectionDefaultsEditable>`.

* To enable editable connection points for a specific Connection, use the `<DiagramConnectionEditablePoints>` tag inside `<DiagramConnectionEditable>`.

>caption Enable editable connection points globally and per Connection

````RAZOR
<TelerikDiagram Height="400px">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Polyline">
        <DiagramConnectionDefaultsEditable>
            <DiagramConnectionDefaultsEditablePoints Enabled="true" />
        </DiagramConnectionDefaultsEditable>
    </DiagramConnectionDefaults>

    <DiagramShapes>
        <DiagramShape Id="shape1" X="100" Y="100">
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2" X="300" Y="100">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
        <DiagramShape Id="shape3" X="200" Y="250">
            <DiagramShapeContent Text="Shape 3" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2">
            <DiagramConnectionPoints>
                <DiagramConnectionPoint X="200" Y="50" />
            </DiagramConnectionPoints>
        </DiagramConnection>
        <DiagramConnection FromId="shape2" ToId="shape3">
            <DiagramConnectionPoints>
                <DiagramConnectionPoint X="350" Y="200" />
            </DiagramConnectionPoints>
            <DiagramConnectionEditable>
                <DiagramConnectionEditablePoints Enabled="false" />
            </DiagramConnectionEditable>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>
````

## Styling

The following Connection styling options are available in child tags of `<DiagramConnectionDefaults>` and `<DiagramConnection>`:

* Text color and font properties, when using Connection content
* Background color (fill) for the Connection caps
* Background color (fill) for the default and hover states of the selection handles
* Border (stroke) color, type, and width for the caps and selection handles

>caption Setting global and Connection-specific color styles

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

## Rich Content

Telerik UI for Blazor 15.0 adds the ability to declaratively enhance the default plain text content of Diagram Connections. The feature depends on child tags of `<DiagramConnectionContent>`. Refer to the API reference for details:

* [`<DiagramConnectionContentPadding>`](slug:Telerik.Blazor.Components.DiagramConnectionContentPadding)
* [`<DiagramConnectionContentMargin>`](slug:Telerik.Blazor.Components.DiagramConnectionContentMargin)
* [`<DiagramConnectionContentBlocks>`](slug:Telerik.Blazor.Components.DiagramConnectionContentBlocks)
* [`<DiagramConnectionContentBlockChildren>`](slug:Telerik.Blazor.Components.DiagramConnectionContentBlockChildren)
* [`<DiagramConnectionContentBlockChild>`](slug:Telerik.Blazor.Components.DiagramConnectionContentBlockChild)

Each block child can contain text or an image, depening on the block child's `Type`, `Text`, and `Src` parameters. Multiple block children display on a single line if there is enough space. To separate children on multiple lines, insert a child with [`Type` `Break`](slug:Telerik.Blazor.DiagramConnectionContentBlocksChildrenType) between them. To insert empty space between blocks, use `DiagramConnectionContentMargin` and its `Top` or `Bottom` parameter.

Declarative rich content is a simpler option to customize the Shape content, compared to [visual functions](#visual-function). The advantage of visuals is the full control over the Connection content and layout, including the ability to place complex content blocks side by side.

Rich content is also supported with [Diagram data binding](slug:diagram-data-bind).

>caption Using declarative rich content in Diagram Connections

````RAZOR
<TelerikDiagram Height="420px">
    <DiagramLayout Type="@DiagramLayoutType.Tree" VerticalSeparation="180" />

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1"
                           ToId="shape2">
            <DiagramConnectionContent Background="#fda"
                                      Offset="30">
                <DiagramConnectionContentMargin Bottom="10" />
                <DiagramConnectionContentPadding Top="20" Bottom="20" Left="20" Right="20" />
                <DiagramConnectionContentBorder Color="blue" Width="2" DashType="@DashType.Solid" />
                <DiagramConnectionContentBlocks>
                    <DiagramConnectionContentBlock>
                        <DiagramConnectionContentBlockChildren>
                            <DiagramConnectionContentBlockChild Text="Connection Title"
                                                                Bold="true"
                                                                Color="blue"
                                                                FontSize="18"
                                                                Italic="true"
                                                                Underline="true" />
                        </DiagramConnectionContentBlockChildren>
                    </DiagramConnectionContentBlock>
                    <DiagramConnectionContentBlock>
                        <DiagramConnectionContentBlockChildren>
                            <DiagramConnectionContentBlockChild Type="@DiagramConnectionContentBlocksChildrenType.Image"
                                                                Height="24"
                                                                Src="@Base64SvgImage"
                                                                Width="24" />
                            <DiagramConnectionContentBlockChild Type="@DiagramConnectionContentBlocksChildrenType.Break" />
                            <DiagramConnectionContentBlockChild Text="Image Description"
                                                                Color="green"
                                                                FontSize="16" />
                        </DiagramConnectionContentBlockChildren>
                    </DiagramConnectionContentBlock>
                </DiagramConnectionContentBlocks>
            </DiagramConnectionContent>
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>

@code {
    private readonly string Base64SvgImage = "data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAMAAAAua3VzAAACylBMVEVMaXFc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBeULtoAAAA7XRSTlMAgAIEmOsx8uAhAQUG+vX0/AP7/jMdovfO5weHChPmt+/2LkdrrfkWC5/cYDZ5F8vuOA743v0QgXqTHKzjFMjNUG6h8909EejtIBoeiC/J0w+0XL1bPOHMQAySGyXPUvHwVbwmOt9thmwZJ0vl7Fpe0NHKq9mbhWYJMhhBIg10K9Wc5L+L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";
}
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

You can draw additional Connection content by using the API of the Diagram's JavaScript rendering engine. This is an advanced scenario that is recommended if the desired result cannot be achieved in another way.

The visual function allows a Connection to render:

* Multiple pieces of data with different styles and positions. Without a visual function, each Connection can display one text label.
* Multiple ovals, polygons, and lines. Without a visual function, each Connection is one straight line or a polyline.

To use a visual function:

1. Get familiar with the [related JavaScript API and available visual primitives](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual).
1. Implement a JavaScript function that returns a [`TelerikBlazor.DiagramCommon.Group` JavaScript object](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/group). The `Group` can contain any number of other primitives like `Circle`, `Image`, `Line`, `Rectangle`, `TextBlock`, and others.
1. Set the `Visual` parameter of `<DiagramConnectionDefaultsContent>` or `<DiagramConnectionContent>` tag to the JavaScript function name. This will affect either all Connections or a specific Connection.
1. Position each primitive with the `x` and `y` properties of its JavaScript object. Otherwise the primitive renders at the top-left corner of the `Group`.
1. To align or center primitives automatically, use a [`Layout` primitive](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/layout) as a parent container. Make sure to `reflow()` the `Layout` object after adding children.
1. Each new primitive element displays on top of the previous ones.
1. (optional) Retrieve Connection parameter values from the the function argument. It is a JavaScript object.
1. (optional) Set the Connection `DataItem` parameter to a JSON-serializable object. Retrieve the object property values from the `dataItem` property of the function argument.

> This section links to the documentation of Kendo UI for jQuery. The Telerik Diagram for Blazor is not a wrapper of the Kendo UI Diagram. However, both components use the same client-side rendering engine. When the Kendo UI documentation mentions the `kendo.dataviz.diagram` JavaScript namespace, you must use `TelerikBlazor.DiagramCommon` instead.

>caption Using Diagram Connection visual function

````RAZOR
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"></DiagramLayout>

    <DiagramConnectionDefaults Type="@DiagramConnectionType.Polyline">
        <DiagramConnectionDefaultsContent Visual="connectionVisualFunction" />
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
        <DiagramConnection FromId="shape1" ToId="shape2" DataItem="@ConnectionDataItem1" />
        <DiagramConnection FromId="shape1" ToId="shape3" DataItem="@ConnectionDataItem2" />
    </DiagramConnections>
</TelerikDiagram>

@* Move JavaScript code to an external JS file *@
<script suppress-error="BL9992">
    function connectionVisualFunction(context) {
        let diagramNS = TelerikBlazor.DiagramCommon;

        let connectionGroup = new diagramNS.Group({
            autoSize: true
        });

        let circle = new diagramNS.Circle({
            width: 16,
            height: 16,
            fill: {
                color: context.dataItem.Color ?? "transparent"
            },
            stroke: {
                color: context.dataItem.Color ? context.color : "transparent"
            }
        });
        connectionGroup.append(circle);

        let text = new diagramNS.TextBlock({
            text: context.dataItem.Title,
            fontSize: 16,
            x: 20
        });
        connectionGroup.append(text);

        return connectionGroup;
    }
</script>

@code {
    private readonly ConnectionModel ConnectionDataItem1 = new() { Title = "1 to 2", Color = "green" };
    private readonly ConnectionModel ConnectionDataItem2 = new() { Title = "1 to 3", Color = "red" };

    public class ConnectionModel
    {
        public string Title { get; set; } = string.Empty;
        public string Color { get; set; } = "black";
    }
}
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
