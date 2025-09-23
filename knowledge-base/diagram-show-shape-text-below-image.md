---
title: Show Diagram Shape Text Below Image
description: Learn how to display shape text below the shape image in a Telerik Blazor Diagram component.
type: how-to
page_title: How to Show Shape Text Below the Image in Telerik Diagram for Blazor
slug: diagram-kb-show-shape-text-below-image
tags: telerik, blazor, diagram
ticketid: 1698784
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Diagram for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to show the text label of a Diagram Shape below the image? By default, the text overlays the image, making it hard to read.
* Can the Shape text be positioned under the image without using visual functions with JavaScript?
* How to display and position the text in a Diagram Shape below the image?

## Solution

To rearrange the text labels and images in the Blazor Diagram Shapes, use the [`Visual` parameter of the `<DiagramShapeDefaults>` or `<DiagramShape>` tag](slug:diagram-shapes#visual-function). This will either affect all Shapes or a specific Shape. The associated JavaScript function may position the image and text with [`x` and `y` properties](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/text_block), but usually, the better option is to use a [`Layout` primitive](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/diagram/layout) as in the example below.

>caption Arrange Diagram Shape image and text one below the other

````RAZOR
<TelerikDiagram>
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Visual="imageShapeVisual">
        <DiagramShapeDefaultsContent Color="black" FontSize="16" />
    </DiagramShapeDefaults>

    <DiagramShapes>
        @foreach (DiagramShapeModel diagramShape in DiagramData)
        {
            <DiagramShape @key="@diagramShape" Id="@diagramShape.Id" DataItem="@diagramShape" />
        }
    </DiagramShapes>

    <DiagramConnections>
        @foreach (DiagramShapeModel diagramShape in DiagramData)
        {
            if (!string.IsNullOrEmpty(diagramShape.ParentId))
            {
                <DiagramConnection @key="@diagramShape" FromId="@diagramShape.ParentId" ToId="@diagramShape.Id" />
            }
        }
    </DiagramConnections>
</TelerikDiagram>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    function imageShapeVisual(context) {
        let diagramNS = TelerikBlazor.DiagramCommon;

        let shapeGroup = new diagramNS.Group();

        let shapeRectangle = new diagramNS.Rectangle({
            width: context.width,
            height: context.height,
            stroke: {
                color: "transparent"
            }
        });
        shapeGroup.append(shapeRectangle);

        let layoutSpacing = 6;
        // Make sure the layout content can fit, otherwise you will get unexpected results.
        let imageDimension = context.height - context.content.fontSize * 1.5;
        let imageTextRect = new diagramNS.Rect(0, 0, context.width, context.height);

        let imageTextLayout = new diagramNS.Layout(imageTextRect, {
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            orientation: "vertical",
            spacing: layoutSpacing
        });
        shapeGroup.append(imageTextLayout);

        let image = new diagramNS.Image({
            source: context.dataItem.Source,
            width: imageDimension,
            height: imageDimension
        });
        let title = new diagramNS.TextBlock({
            text: context.dataItem.Title,
            color: context.color
        });

        imageTextLayout.append(image);
        imageTextLayout.append(title);
        imageTextLayout.reflow();

        return shapeGroup;
    }
</script>

@code {
    private List<DiagramShapeModel> DiagramData { get; set; } = new()
    {
        new DiagramShapeModel() { Id = "shape-1", Title = "Shape 1 Title" },
        new DiagramShapeModel() { Id = "shape-2", ParentId = "shape-1", Title = "Shape 2 Title" },
        new DiagramShapeModel() { Id = "shape-3", ParentId = "shape-1", Title = "Shape 3 Title" },
    };

    public class DiagramShapeModel
    {
        public string Id { get; set; } = string.Empty;
        public string ParentId { get; set; } = string.Empty;
        public string Title { get; set; } = "Default Shape Title";
        public string Source { get; set; } = Base64SvgImage;
    }

    private const string Base64SvgImage = "data:image/svg;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAMAAAAua3VzAAACylBMVEVMaXFc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBc5QBeULtoAAAA7XRSTlMAgAIEmOsx8uAhAQUG+vX0/AP7/jMdovfO5weHChPmt+/2LkdrrfkWC5/cYDZ5F8vuOA743v0QgXqTHKzjFMjNUG6h8909EejtIBoeiC/J0w+0XL1bPOHMQAySGyXPUvHwVbwmOt9thmwZJ0vl7Fpe0NHKq9mbhWYJMhhBIg10K9Wc5L+L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";
}
````

## See Also

* [Diagram Shapes](slug:diagram-shapes)
* [Diagram Demo with Shape Visual](https://demos.telerik.com/blazor-ui/diagram/overview)
