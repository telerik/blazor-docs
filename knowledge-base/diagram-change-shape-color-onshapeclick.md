---
title: Change Diagram Shape Color on Shape Click
description: Learn how to change the Diagram shape background color when using the Diagram OnShapeClick event.
type: troubleshooting
page_title: How to Change Diagram Shape Color on Shape Click
slug: diagram-kb-change-shape-color-onshapeclick
tags: blazor, diagram
ticketid: 1703700
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

I am using the Diagram `OnShapeClick` event to update the `DiagramShapeFill` `Color` of the selected Diagram shape. However, this resets the positions of the shapes that the user has dragged. How to update the shape background colors while maintaining the current shape positions?

## Cause

The Diagram `OnShapeClick` event handler is an `EventCallback` and triggers component re-render. If the [Diagram shapes are defined](slug:diagram-shapes#basics) without their `X` and `Y` properties and [shape dragging](slug:diagram-shapes#editability) is enabled, the component definition does not include the current shape positions. As a result, a re-render resets the shapes to their original places.

## Solution

Use the Diagram `SaveAsJsonAsync` and `LoadFromJsonAsync` methods to [persist the Diagram state through JSON](slug:diagram-overview#define-shapes-and-connections-in-json) on each re-render:

1. Implement classes with property names that correspond to the ones in the [Diagram JSON state](slug:diagram-overview#define-shapes-and-connections-in-json).
1. Subscribe to the [Diagram `OnShapeClick` event](slug:diagram-events#onshapeclick).
1. Use the Diagram [`SaveAsJsonAsync` method](slug:telerik.blazor.components.telerikdiagram#methods) to get the current component state and deserialize it.
1. Update the desired shape background.
1. Serialize the updated Diagram state object and use the [`LoadFromJsonAsync` method](slug:telerik.blazor.components.telerikdiagram#methods) to apply it to the Diagram.
1. (optional) If the Diagram is using different [shape types](slug:diagram-shapes#shape-types), then [implement a custom JSON converter](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/converters-how-to) for them.

>caption Change Diagram Shape background on click and persist current shape position

```RAZOR
@using System.Text.Json
@using System.Text.Json.Serialization

<TelerikDiagram @ref="@DiagramRef"
                Height="100vh"
                OnShapeClick="@OnDiagramShapeClick"
                Zoom="0.8">
    <DiagramLayout Type="@DiagramLayoutType.Tree" />

    <DiagramShapes>
        @foreach (DiagramModel shape in DiagramData)
        {
            <DiagramShape Id="@shape.Id" Type="@shape.Type">
                <DiagramShapeContent Text="@shape.Text" />
                <DiagramShapeFill Color="@shape.BackgroundColor"/>
            </DiagramShape>
        }
    </DiagramShapes>

    <DiagramConnections>
        @foreach (DiagramModel shape in DiagramData)
        {
            if (shape.ParentId is not null)
            {
                <DiagramConnection @key="@shape"
                                   FromId="@( $"{shape.ParentId}" )"
                                   ToId="@( $"{shape.Id}" )" />
            }
        }
    </DiagramConnections>
</TelerikDiagram>

@code {
    #nullable enable

    private TelerikDiagram? DiagramRef { get; set; }
    private string DiagramJson { get; set; } = string.Empty;

    private List<DiagramModel> DiagramData { get; set; } = Enumerable.Range(1, 6).Select(x => new DiagramModel()
    {
        Id = x.ToString(),
        ParentId = x == 1 ? null : (x <= 4 ? 1 : 3),
        Text = $"Shape {x}",
        Type = x % 2 == 0 ? DiagramShapeType.Rectangle : DiagramShapeType.Circle,
        BackgroundColor = "#666"
    }).ToList();

    private async Task OnDiagramShapeClick(DiagramShapeClickEventArgs args)
    {
        DiagramJson = await DiagramRef!.SaveAsJsonAsync();
        JsonSerializerOptions jsonOptions = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        DiagramState? diagramStateObject = JsonSerializer.Deserialize<DiagramState>(DiagramJson, jsonOptions);

        if (diagramStateObject is not null && diagramStateObject.Shapes is not null)
        {
            var rnd = Random.Shared;
            string newFillColor = $"rgb({rnd.Next(0, 127)},{rnd.Next(0, 127)},{rnd.Next(0, 127)})";

            diagramStateObject.Shapes.First(x => x.Id == args.Id).Fill.Color = newFillColor;

            DiagramJson = JsonSerializer.Serialize(diagramStateObject, jsonOptions);
            await DiagramRef!.LoadFromJsonAsync(DiagramJson);
        }
    }

    #region Diagram State Classes

    public class DiagramState
    {
        public IEnumerable<ShapeDescriptor>? Shapes { get; set; }
        public IEnumerable<ConnectionDescriptor>? Connections { get; set; }
    }

    public class ShapeDescriptor
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonConverter(typeof(DiagramShapeTypeJsonConverter))]
        public DiagramShapeType Type { get; set; } = DiagramShapeType.Rectangle;
        public double? X { get; set; }
        public double? Y { get; set; }

        public double? Height { get; set; } = 100;
        public double? Width { get; set; } = 100;

        public ShapeDescriptorContentFill Fill { get; set; } = new();

        public ShapeDescriptorContent Content { get; set; } = new();
    }

    public class ShapeDescriptorContent
    {
        public string Text { get; set; } = string.Empty;
    }

    public class ShapeDescriptorContentFill
    {
        public string? Color { get; set; }
    }

    public class ConnectionDescriptor
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public ConnectionDescriptorFromTo From { get; set; } = new();
        public ConnectionDescriptorFromTo To { get; set; } = new();
    }

    public class ConnectionDescriptorFromTo
    {
        public string ShapeId { get; set; } = string.Empty;
    }

    #endregion Diagram State Classes

    public class DiagramModel
    {
        public string Id { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DiagramShapeType Type { get; set; } = DiagramShapeType.Rectangle;
        public string BackgroundColor { get; set; } = string.Empty;
    }

    public class DiagramShapeTypeJsonConverter : JsonConverter<DiagramShapeType>
    {
        public override DiagramShapeType Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options)
            {
                string shapeTypeString = reader.GetString()!;

                if (Enum.TryParse(shapeTypeString, true, out DiagramShapeType shapeType)) {
                    return shapeType;
                }
                else
                {
                    return DiagramShapeType.Rectangle;
                }
            }

        public override void Write(
            Utf8JsonWriter writer,
            DiagramShapeType shapeType,
            JsonSerializerOptions options) =>
                writer.WriteStringValue(shapeType.ToString().ToLower());
    }
}
```

## See Also

* [Diagram `OnShapeClick` Event](slug:diagram-events#onshapeclick)
* [Save and Load Diagram State through JSON](slug:diagram-overview#define-shapes-and-connections-in-json)
* [Diagram Shapes](slug:diagram-shapes)
* [Diagram Methods](slug:telerik.blazor.components.telerikdiagram#methods)
