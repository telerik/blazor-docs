---
title: Shapes
page_title: Diagram - Shapes
description: Learn about 
slug: diagram-shapes
tags: telerik,blazor,diagram
published: True
position: 20
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

````RAZOR
<TelerikDiagram Height="440px" Zoom="0.5">
    <DiagramShapeDefaults Width="150" Height="150">
    </DiagramShapeDefaults>
    <DiagramShapes>
        @foreach (DiagramShapeType shapeType in AllDiagramShapeTypes)
        {
            <DiagramShape Type="@shapeType"
                          Id="@( $"id-{shapeType}" )"
                          X="@GetShapeX(shapeType)"
                          Y="@GetShapeY(shapeType)"
                          Width="@GetShapeWidth(shapeType)">
                <DiagramShapeContent Text="@shapeType.ToString()"
                                     Color="@GetShapeContentColor(shapeType)" />
            </DiagramShape>
        }
    </DiagramShapes>
</TelerikDiagram>

@code {
    private readonly List<DiagramShapeType> AllDiagramShapeTypes = new() {
        DiagramShapeType.Circle,
        DiagramShapeType.Collate,
        DiagramShapeType.Database,
        DiagramShapeType.DataInputOutput,
        DiagramShapeType.DataStorage,
        DiagramShapeType.Decision,
        DiagramShapeType.Delay,
        DiagramShapeType.DirectAccessStorage,
        DiagramShapeType.Display,
        DiagramShapeType.Document,
        DiagramShapeType.Extract,
        //DiagramShapeType.Image,
        DiagramShapeType.InternalStorage,
        DiagramShapeType.LogicalOr,
        DiagramShapeType.ManualInputOutput,
        DiagramShapeType.ManualOperation,
        DiagramShapeType.Merge,
        DiagramShapeType.MultipleDocuments,
        DiagramShapeType.OffPageConnector,
        DiagramShapeType.OnPageConnector,
        DiagramShapeType.PredefinedProcess,
        DiagramShapeType.Preparation,
        DiagramShapeType.Process,
        DiagramShapeType.Rectangle,
        DiagramShapeType.Sort,
        DiagramShapeType.SummingJunction,
        //DiagramShapeType.Text,
        DiagramShapeType.Terminator
    };

    private double GetShapeX(DiagramShapeType shapeType)
    {
        return AllDiagramShapeTypes.IndexOf(shapeType) % 7 * 200;
    }

    private double GetShapeY(DiagramShapeType shapeType)
    {
        return AllDiagramShapeTypes.IndexOf(shapeType) / 7 * 200;
    }

    public string GetShapeContentColor(DiagramShapeType shapeType)
    {
        List<DiagramShapeType> shapesWithBlackColor = new() {
            DiagramShapeType.Collate, DiagramShapeType.Sort, DiagramShapeType.Text
        };
        return shapesWithBlackColor.Contains(shapeType) ? "#000" : string.Empty;
    }

    public int GetShapeWidth(DiagramShapeType shapeType)
    {
        return shapeType == DiagramShapeType.Terminator ? 300 : 150;
    }
}
````

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

````RAZOR
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle"
                          Height="50">
        <DiagramShapeDefaultsContent Color="#000" />
        <DiagramShapeDefaultsFill Color="transparent" />
        <DiagramShapeDefaultsStroke Width="0" />
    </DiagramShapeDefaults>

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
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
    </DiagramConnections>
</TelerikDiagram>
````

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

## Editability

By default, the Diagram allows users to:

* Connect one Shape to other Shapes.
* Drag a Shape to new coordinates.
* Remove the selected Shape(s).

To restrict these operations globally for all Shapes, use the parameters of the `<DiagramShapeDefaultsEditable>` tag.

To restrict or enable operations for a specific Shape, use the parameters of the `<DiagramShapeEditable>` tag.

>caption Setting global and Shape-specific editing options

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramShapeDefaults>
        <DiagramShapeDefaultsEditable Connect="true" Drag="false" Remove="false" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape>
            <DiagramShapeEditable Connect="false" />
        </DiagramShape>
    </DiagramShapes>
</TelerikDiagram>
````

## Example

The following configuration is not using a prefefined [Diagram layout](slug:diagram-layouts). However, you can remove all Shape `X` and `Y` parameters and set a layout though the `<DiagramLayout>` tag.

>caption Customize Diagram Shapes

````RAZOR
<TelerikDiagram Height="300px">
    <DiagramShapeDefaults Selectable="true"
                          Type="@DiagramShapeType.Rectangle">
        <DiagramShapeDefaultsConnectorDefaults Width="10" Height="10">
            <DiagramShapeDefaultsConnectorDefaultsFill Color="lime" Opacity="0.8" />
            <DiagramShapeDefaultsConnectorDefaultsStroke Color="green" Width="3" DashType="@DashType.Solid" />
            <DiagramShapeDefaultsConnectorDefaultsHover>
                <DiagramShapeDefaultsConnectorDefaultsHoverFill Color="orange" Opacity="1" />
            </DiagramShapeDefaultsConnectorDefaultsHover>
        </DiagramShapeDefaultsConnectorDefaults>
        <DiagramShapeDefaultsContent Color="white"
                                     FontFamily="arial"
                                     FontSize="16"
                                     FontStyle="normal"
                                     FontWeight="normal"
                                     Text="Default Text"
                                     TextWrap="@DiagramShapesContentTextWrap.Wrap" />
        <DiagramShapeDefaultsFill Color="purple" Opacity="0.8" />
        <DiagramShapeDefaultsHover>
            <DiagramShapeDefaultsHoverFill Color="blue" Opacity="1" />
        </DiagramShapeDefaultsHover>
        <DiagramShapeDefaultsEditable Connect="true" Drag="true" Remove="false" />
        <DiagramShapeDefaultsRotation Angle="0" />
        <DiagramShapeDefaultsStroke Color="black" DashType="@DashType.Dot" Width="2" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape Height="150"
                      Id="shape1"
                      Type="@DiagramShapeType.Circle"
                      Width="100"
                      X="160"
                      Y="20">
            <DiagramShapeContent Text="Circle" />
            <DiagramShapeEditable Enabled="false" Connect="false" />
        </DiagramShape>
        <DiagramShape Id="shape2"
                      Source="@Base64SvgImage"
                      Type="@DiagramShapeType.Image"
                      X="20"
                      Y="50">
            <DiagramShapeConnectorDefaults Width="15" Height="15">
                <DiagramShapeConnectorDefaultsFill Color="orange" />
                <DiagramShapeConnectorDefaultsStroke Color="blue" />
                <DiagramShapeConnectorDefaultsHover>
                    <DiagramShapeConnectorDefaultsHoverFill Color="purple" />
                </DiagramShapeConnectorDefaultsHover>
            </DiagramShapeConnectorDefaults>
            <DiagramShapeContent Text="Image" Color="#000" FontSize="20" FontWeight="bold" />
        </DiagramShape>
        <DiagramShape CornerRadius="6"
                      Height="80"
                      Id="shape3"
                      Width="160"
                      X="350"
                      Y="50">
            <DiagramShapeContent Color="#3d3d3d"
                                 FontSize="18"
                                 FontStyle="italic"
                                 FontWeight="bold"
                                 RelativePadding="0.1"
                                 Text="Rounded Rectangle" />
            <DiagramShapeFill Color="#e0e0e0" />
            <DiagramShapeHover>
                <DiagramShapeHoverFill Color="#d6d6d6" />
            </DiagramShapeHover>
            <DiagramShapeRotation Angle="20" />
            <DiagramShapeStroke DashType="@DashType.LongDash" Color="blue" Width="2" />
        </DiagramShape>
        <DiagramShape Id="shape4"
                      Type="@DiagramShapeType.Text"
                      MinHeight="40"
                      MinWidth="100"
                      X="150"
                      Y="250">
            <DiagramShapeContent Text="Text Shape" Color="black" />
        </DiagramShape>
        <DiagramShape Height="75"
                      Id="shape5"
                      Path="M 2 13 A 1.42 1.42 0 0 1 6 13"
                      Width="150"
                      X="250"
                      Y="150">
            <DiagramShapeContent Text="Custom Path" />
            <DiagramShapeStroke Color="transparent" DashType="@DashType.Solid" Width="0" />
        </DiagramShape>
        <DiagramShape Height="50"
                      Id="shape6"
                      Width="120"
                      X="550"
                      Y="100">
            <DiagramShapeContent Color="#ccc" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape1" ToId="shape4" />
        <DiagramConnection FromId="shape3" ToId="shape5" />
        <DiagramConnection FromId="shape3" ToId="shape6" />
    </DiagramConnections>

</TelerikDiagram>

@code {
    private readonly string Base64SvgImage = "data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAMAAAAua3VzAAACylBMVEVMaXFc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBeULtoAAAA7XRSTlMAgAIEmOsx8uAhAQUG+vX0/AP7/jMdovfO5weHChPmt+/2LkdrrfkWC5/cYDZ5F8vuOA743v0QgXqTHKzjFMjNUG6h8909EejtIBoeiC/J0w+0XL1bPOHMQAySGyXPUvHwVbwmOt9thmwZJ0vl7Fpe0NHKq9mbhWYJMhhBIg10K9Wc5L+L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";
}
````

## Visual Function

You can draw Shapes and display their content by using the API of the Diagram's JavaScript rendering engine. This is an advanced scenario that is recommended if the desired result cannot be achieved in another way.

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

````RAZOR
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree" />

    <DiagramShapeDefaults Width="240" Height="120" Visual="shapeVisualFunction">
        <DiagramShapeDefaultsContent Color="white" FontSize="20" FontWeight="bold" />
        <DiagramShapeDefaultsStroke Width="3" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        <DiagramShape Id="shape1" DataItem="@ShapeDataItem1">
            <DiagramShapeStroke Color="brown" />
        </DiagramShape>
        <DiagramShape Id="shape2" DataItem="@ShapeDataItem2">
            <DiagramShapeStroke Color="purple" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
    </DiagramConnections>
</TelerikDiagram>

@* Move JavaScript code to an external JS file *@
<script suppress-error="BL9992">
    function shapeVisualFunction(context) {
        let diagramNS = TelerikBlazor.DiagramCommon;

        let shapeGroup = new diagramNS.Group({
            autoSize: true
        });

        let outerCircle = new diagramNS.Circle({
            width: context.width,
            height: context.height,
            fill: "orange",
            stroke: {
                color: context.stroke.color,
                width: context.stroke.width
            }
        });
        shapeGroup.append(outerCircle);

        let innerCirleSpacing = 20;
        let innerCirle = new diagramNS.Circle({
            width: context.width - innerCirleSpacing * 2,
            height: context.height - innerCirleSpacing * 2,
            fill: "red",
            x: innerCirleSpacing,
            y: innerCirleSpacing
        });
        shapeGroup.append(innerCirle);

        let textRect = new diagramNS.Rect(0, 0, context.width, context.height);
        let textLayout = new diagramNS.Layout(textRect, {
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            orientation: "vertical",
            spacing: 4
        });
        shapeGroup.append(textLayout);

        let title = new diagramNS.TextBlock({
            text: context.dataItem.Title,
            fontSize: context.content.fontSize,
            fontWeight: context.content.fontWeight,
            color: context.content.color
        });

        let subTitle = new diagramNS.TextBlock({
            text: context.dataItem.SubTitle,
            fontSize: 14,
            color: "yellow"
        });

        textLayout.append(title);
        textLayout.append(subTitle);
        textLayout.reflow();

        return shapeGroup;
    }
</script>

@code {
    private ShapeModel ShapeDataItem1 { get; set; } = new()
    {
        Title = "First Shape",
        SubTitle = "New Line and Styles"
    };
    private ShapeModel ShapeDataItem2 { get; set; } = new()
    {
        Title = "Second Shape",
        SubTitle = "Centered Text"
    };

    public class ShapeModel
    {
        public string Title { get; set; } = string.Empty;
        public string SubTitle { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: Diagram Layout and Shape Types](https://demos.telerik.com/blazor-ui/diagram/configuration)
* [Live Demo: Using Diagram Visuals](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
