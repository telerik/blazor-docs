---
title: Shapes
page_title: Diagram - Shapes
description: Learn about 
slug: diagram-shapes
tags: telerik,blazor,diagram
published: True
position: 20
components: ["diagram"]
---

# Blazor Diagram Shapes

The Shape is the main building block of the Telerik Diagram for Blazor. It represents a single node in the graph. This article describes all Diagram Shape types and customization options.

## Basics

The fundamental settings of the Telerik Diagram Shapes include:

* The [Shape `Type`](#shape-types) determines the overall Shape appearance.
* The Shape `Id` is required to define connections between related Shapes.
* `Text` defines the Shape label and `TextWrap` defines the label wrapping behavior. Set these parameters to the child `<DiagramShapeContent>` tag.
* `Width` and `Height` determine the Shape size in pixels. The default values are `100`.

>caption Using basic Shape parameters

````RAZOR.skip-repl
<DiagramShape Id="shape1"
              Type="@DiagramShapeType.Rectangle"
              Width="200"
              Height="50">
    <DiagramShapeContent Text="Shape 1" />
</DiagramShape>
````

In addition to the above, you can use the following Shape parameters:

* `X` and `Y` to define the exact Shape position coordinates. These parameters have effect only when a [predefined Diagram layout](slug:diagram-layouts) is not set.
* `DataItem` to provide an object with additional values to be used in a [visual function](#visual-function).
* `Path` to define a [custom Shape form](#shape-types).

## Shape Types

The available Diagram Shape types are the members of the [`DiagramShapeType` enum](slug:Telerik.Blazor.DiagramShapeType). The default Shape type is `Rectangle`.

Some Shape types are designed for [flowcharts, also known as workflow or process diagrams](https://en.wikipedia.org/wiki/Flowchart). However, all Shape types can be used in any scenario.

The Shape `Path` parameter allows you to manually [define a custom Shape form](#example) with [multiple straight or curved lines](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths) that doesn't match any of the predefined Shape types.

>caption All Diagram Shape types except Image and Text

<demo metaUrl="client/diagram/shapes/shape-types-7/" height="570"></demo>

### Type-Specific Shape Features

Some Shape types provide unique behavior or settings:

* The `Circle` Shape can look like an ellipse if you set different `Width` and `Height` values. Generally, all Shapes adjust their form and proportions, based on the set dimensions.
* All Shape types support text labels, but only the `Image` Shape can display a graphic. Use the `<DiagramShape>` `Source` parameter to set an image URL or a data URI.
    ````RAZOR.skip-repl
    <DiagramShape Type="@DiagramShapeType.Image" Source="https://www.domain.com/image.gif" />

    <DiagramShape Type="@DiagramShapeType.Image" Source="data:image/...;base64,....." />
    ````
* The `Terminator` Shape normally requires a `Width` that is larger than the `Height`.
* The `Text` Shape has no borders and background. It occupies the minimum required amount of space to enclose the text content. To display text Shapes with some empty space around the content, use transparent Shapes of another type.
* All shapes, except `Circle`, `Image`, and `Text` can display with rounded corners. See [`CornerRadius` in the Styling section](#styling).

>caption Using transparent Rectangle shapes instead of Text shapes

<demo metaUrl="client/diagram/shapes/transparent-rectangle-6/" height="420"></demo>

## Connectors

Connectors are the 5 dots that appear on the Shape boundaries and center on hover. Users can grab a connector and drag it to another shape to create a new connection. If the user grabs the center connector, the Diagram can create a connection from any side of the Shape. If the user grabs a connector on the Shape's boundary, the Diagram will create a connection from that specific side of the Shape.

You can customize connectors globally or per shape. Connectors settings are part of the shape settings. As a result:

* `<DiagramShapeDefaultsConnectorDefaults>` must be a child of `<DiagramShapeDefaults>`.
* `<DiagramShapeConnectorDefaults>` must be a child of `<DiagramShape>`.

>caption Configure connectors globally and per Shape

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramShapeDefaults>
        <DiagramShapeDefaultsConnectorDefaults Width="20" Height="20">
            <DiagramShapeDefaultsConnectorDefaultsFill Color="yellow" Opacity="0.8" />
            <DiagramShapeDefaultsConnectorDefaultsStroke Color="blue" Width="3" DashType="@DashType.Dash" />
            <DiagramShapeDefaultsConnectorDefaultsHover>
                <DiagramShapeDefaultsConnectorDefaultsHoverFill Color="orange" Opacity="1" />
            </DiagramShapeDefaultsConnectorDefaultsHover>
        </DiagramShapeDefaultsConnectorDefaults>
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape>
            <DiagramShapeConnectorDefaults Width="15" Height="15">
                <DiagramShapeConnectorDefaultsFill Color="lime" Opacity="0.6" />
                <DiagramShapeConnectorDefaultsStroke Color="green" Width="3" DashType="@DashType.Dot" />
                <DiagramShapeConnectorDefaultsHover>
                    <DiagramShapeConnectorDefaultsHoverFill Color="blue" Opacity="0.9" />
                </DiagramShapeConnectorDefaultsHover>
            </DiagramShapeConnectorDefaults>
        </DiagramShape>
    </DiagramShapes>
</TelerikDiagram>
````

### Connector Offset

The `Offset` parameter allows you to move connectors away from their default positions. This is useful for better alignment on custom shapes or when you need to shift connectors for visual clarity.

The `Offset` value is a pixel distance that moves the connector from its default position.

* To configure connector offset globally for all Shapes, use the `Offset` parameter of `<DiagramShapeDefaultsConnectorDefaults>` inside `<DiagramShapeDefaults>`.
* To configure connector offset for a specific Shape, use the `Offset` parameter of `<DiagramShapeConnectorDefaults>` inside `<DiagramShape>`.
* To set the offset for individual connectors, use the `Offset` parameter of `<DiagramShapeConnector>` or `<DiagramShapeDefaultsConnector>`.

>caption Configure connector offset globally and per Shape

<demo metaUrl="client/diagram/shapes/connector-offset-5/" height="500"></demo>

## Tooltips

The Diagram allows you to display tooltips when hovering over Shapes. Each Shape requires explicit tooltip content configuration through the `Template` parameter.

The available tooltip parameters are:

* `Visible` (bool, default: `false`)&mdash;controls whether the tooltip is displayed on hover
* `Class` (string)&mdash;applies a custom CSS class to the tooltip for styling
* `Template` (RenderFragment)&mdash;defines the custom content to display in the tooltip

>caption Configuring Shape tooltips

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramShapes>
        <DiagramShape Id="shape1" X="640" Y="240">
            <DiagramShapeFill Color="lightgreen" />
            <DiagramShapeContent Text="Shape 1" />
            <DiagramShapeTooltip Class="shape1" Visible="true">
                <Template>
                    <div>
                        shape id: 1
                    </div>
                </Template>
            </DiagramShapeTooltip>
        </DiagramShape>

        <DiagramShape Id="shape2" X="-100" Y="90">
            <DiagramShapeFill Color="lightblue" />
            <DiagramShapeContent Text="Shape 2" Color="red" />
            <DiagramShapeTooltip Class="shape2" Visible="true">
                <Template>
                    <div>shape 2</div>
                </Template>
            </DiagramShapeTooltip>
        </DiagramShape>
    </DiagramShapes>
</TelerikDiagram>
````

## Styling

The following Shape styling options are available in child tags of `<DiagramShapeDefaults>` and `<DiagramShape>`:

* Text color and font properties
* Background color (fill) and opacity for the default and hover states
* Rotation angle
* Border (stroke) color, type, width, and opacity

In addition to the above:

* `<DiagramShapeDefaults>` and `<DiagramShape>` have a `CornerRadius` parameter that rounds both the border and the background at the Shape corners.
* `<DiagramShapeDefaultsContent>` and `<DiagramShapeContent>` have a `RelativePadding` parameter that adds padding as a ratio of the Shape width. For example, `RelativePadding="0.1"` applies a 10% padding. In some cases, you can increase the padding to force the Shape text to wrap.

>caption Setting global and Shape-specific color styles

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramShapeDefaults CornerRadius="4">
        <DiagramShapeDefaultsContent Color="white" FontSize="16" RelativePadding="0.1" />
        <DiagramShapeDefaultsFill Color="purple" />
        <DiagramShapeDefaultsHover>
            <DiagramShapeDefaultsHoverFill Color="blue" />
        </DiagramShapeDefaultsHover>
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape CornerRadius="6">
            <DiagramShapeContent Color="#3d3d3d" FontSize="24" RelativePadding="0.2" />
            <DiagramShapeFill Color="#e0e0e0" />
            <DiagramShapeHover>
                <DiagramShapeHoverFill Color="#d6d6d6" />
            </DiagramShapeHover>
        </DiagramShape>
    </DiagramShapes>
</TelerikDiagram>
````

## Rich Content

Telerik UI for Blazor 15.0 adds the ability to declaratively enhance the default plain text content of Diagram Shapes. The feature depends on child tags of `<DiagramShapeContent>`. Refer to the API reference for details:

* [`<DiagramShapeContentPadding>`](slug:Telerik.Blazor.Components.DiagramShapeContentPadding)
* [`<DiagramShapeContentMargin>`](slug:Telerik.Blazor.Components.DiagramShapeContentMargin)
* [`<DiagramShapeContentBlock>`](slug:Telerik.Blazor.Components.DiagramShapeContentBlock)
* [`<DiagramShapeContentBlockChildren>`](slug:Telerik.Blazor.Components.DiagramShapeContentBlockChildren)
* [`<DiagramShapeContentBlockChild>`](slug:Telerik.Blazor.Components.DiagramShapeContentBlockChild)

Each block child can contain text or an image, depening on the block child's `Type`, `Text`, and `Src` parameters. Multiple block children display on a single line if there is enough space. To separate children on multiple lines, insert a child with [`Type` `Break`](slug:Telerik.Blazor.DiagramShapeContentBlocksChildrenType) between them. To insert empty space between blocks, use `DiagramShapeContentMargin` and its `Top` or `Bottom` parameter.

Declarative rich content is a simpler option to customize the Shape content, compared to [visual functions](#visual-function). The advantage of visuals is the full control over the Shape content and layout, including the ability to place complex content blocks side by side.

Rich content is also supported with [Diagram data binding](slug:diagram-data-binding).

>caption Using declarative rich content in Diagram Shapes

<demo metaUrl="client/diagram/shapes/rich-content-4/" height="420"></demo>

## Editability

By default, the Diagram allows users to:

* Connect one Shape to other Shapes.
* Drag a Shape to new coordinates.
* Remove the selected Shape(s).

To restrict these operations globally for all Shapes, use the parameters of the `<DiagramShapeDefaultsEditable>` tag.

To restrict or enable operations for a specific Shape, use the parameters of the `<DiagramShapeEditable>` tag.

The Diagram also displays resize handles on the boundaries of selected Shapes. Use the `Offset` parameter of `<DiagramEditableResizeHandles>` inside `<DiagramEditable>` to move these handles away from the Shape boundary by a specified pixel distance. This improves usability when working with smaller shapes or when handles overlap with other visual elements.

>caption Setting global and Shape-specific editing options and resize handle offset globally

<demo metaUrl="client/diagram/shapes/editing-options-3/" height="580"></demo>

## Example

The following configuration is not using a prefefined [Diagram layout](slug:diagram-layouts). However, you can remove all Shape `X` and `Y` parameters and set a layout though the `<DiagramLayout>` tag.

>caption Customize Diagram Shapes

<demo metaUrl="client/diagram/shapes/customization-2/" height="480"></demo>

## Visual Function

You can draw Shapes and display their content by using the API of the Diagram's JavaScript rendering engine. This is an advanced scenario that is recommended if the desired result cannot be achieved in another way, including through [declarative rich content](#rich-content).

The visual function allows a single Shape to render:

* Multiple pieces of data with different styles and positions. Without a visual function, each Shape can display one image and one text label.
* Multiple ovals, polygons, and lines. Without a visual function, each Shape can have a predefined form, or [display a custom form through the `Path` parameter](#example).

To use a visual function:

1. Get familiar with the [related JavaScript API and available visual primitives](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual).
1. Implement a JavaScript function that returns a [`TelerikBlazor.DiagramCommon.Group` JavaScript object](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/group). The `Group` can contain any number of other primitives like `Circle`, `Image`, `Line`, `Rectangle`, `TextBlock`, and others.
1. Set the `Visual` parameter of `<DiagramShapeDefaults>` or `<DiagramShape>` to the JavaScript function name. This will either affect all Shapes or a specific Shape.
1. Position each primitive with the `x` and `y` properties of its JavaScript object. Otherwise the primitive renders at the top-left corner of the `Group`.
1. To align or center primitives automatically, use a [`Layout` primitive](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/layout) as a parent container. Make sure to `reflow()` the `Layout` object after adding children.
1. Each new primitive element displays on top of the previous ones.
1. (optional) Retrieve the Shape parameter values from the the function argument. It is a JavaScript object that contains all Shape settings, including the global ones in `<DiagramShapeDefaults>`.
1. (optional) Set the Shape `DataItem` parameter to a JSON-serializable object. Retrieve the object property values from the `dataItem` property of the function argument.

When using a visual function, the Diagram ignores all Shape parameters in the Razor markup, but you can still consume these settings from the visual function argument. The only exception is the `Text` parameter of `<DiagramShapeContent />` and `<DiagramShapeDefaultsContent />`, which is always rendered if set.

> This section links to the documentation of Kendo UI for jQuery. The Telerik Diagram for Blazor is not a wrapper of the Kendo UI Diagram. However, both components use the same client-side rendering engine. When the Kendo UI documentation mentions the `kendo.dataviz.diagram` JavaScript namespace, you must use `TelerikBlazor.DiagramCommon` instead.

In addition to the following example, also check the [Blazor Diagram Overview demo](https://demos.telerik.com/blazor-ui/diagram/overview) and the [Show Diagram Shape Text Below Image](slug:diagram-kb-show-shape-text-below-image) knowledge base article. Both use a visual function.

>caption Using Diagram Shape visual function

<demo metaUrl="client/diagram/shapes/visual-function-1/" height="520"></demo>

## See Also

* [Live Demo: Diagram Layout and Shape Types](https://demos.telerik.com/blazor-ui/diagram/configuration)
* [Live Demo: Using Diagram Visuals](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
