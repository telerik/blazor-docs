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

I am using the Diagram `OnShapeClick` event to update the `DiagramShapeFill` `Color` of the selected Diagram shape. However, this resets the positions of the shapes that the user has dragged. How to update the shape background colors while maintaining the current shape positions? In addition, I want to persist the custom shape colors when the Diagram `Layout` changes.

## Cause

The Diagram `OnShapeClick` event handler is an `EventCallback` and triggers component re-render. If the [Diagram shapes are defined](slug:diagram-shapes#basics) without their `X` and `Y` properties and [shape dragging](slug:diagram-shapes#editability) is enabled, the Razor component definition does not include the current shape positions. As a result, a re-render resets the shapes to their original places.

Similarly, if the Diagram Shape background colors are not part of the Razor component declaration, they will be reset to the default value if the Diagram `Layout` changes.

## Solution

Use the Diagram `SaveAsJsonAsync` and `LoadFromJsonAsync` methods to [define and persist the Diagram state through JSON](slug:diagram-overview#define-shapes-and-connections-in-json) on each render:

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

Drag a shape and then click on a shape to change its background color. The shape positions will persist.
<br />
Click on a shape and
<TelerikButton OnClick="@OnButtonClick"
    ThemeColor="@ThemeConstants.Button.ThemeColor.Success">
    Toggle Diagram Layout Type
</TelerikButton>
The shape background colors will persist.

<TelerikDiagram @ref="@DiagramRef"
                OnShapeClick="@OnDiagramShapeClick">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle" />
</TelerikDiagram>

@code {
    #nullable enable

    private TelerikDiagram? DiagramRef { get; set; }

    private DiagramLayoutType DiagramLayoutType { get; set; } = DiagramLayoutType.Tree;

    private void OnButtonClick()
    {
        DiagramLayoutType = DiagramLayoutType == DiagramLayoutType.Tree ? DiagramLayoutType.Force : DiagramLayoutType.Tree;
    }

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
            string newFillColor = $"rgb({rnd.Next(48, 128)},{rnd.Next(48, 128)},{rnd.Next(48, 128)})";

            diagramStateObject.Shapes.First(x => x.Id == args.Id).Fill.Color = newFillColor;

            DiagramJson = JsonSerializer.Serialize(diagramStateObject, jsonOptions);
            await DiagramRef!.LoadFromJsonAsync(DiagramJson);
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && DiagramRef is not null)
        {
            // Wait for HTML and client-side Diagram instance
            await Task.Delay(1);
    
            await DiagramRef.LoadFromJsonAsync(DiagramJson);
            StateHasChanged();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    private string DiagramJson { get; set; } = @"
    {
      ""shapes"": [
        {
          ""id"": ""shape1"",
          ""type"": ""Circle"",
          ""content"": {
            ""text"": ""Shape 1""
          },
          ""x"": 200,
          ""y"": 50
        },
        {
          ""id"": ""shape2"",
          ""content"": {
            ""text"": ""Shape 2""
          },
          ""height"": 100,
          ""width"": 160,
          ""x"": 50,
          ""y"": 200
        },
        {
          ""id"": ""shape3"",
          ""type"": ""Display"",
          ""content"": {
            ""text"": ""Shape 3""
          },
          ""x"": 300,
          ""y"": 200
        }
      ],
      ""connections"": [
        {
          ""from"": {
            ""shapeId"": ""shape1""
          },
          ""to"": {
            ""shapeId"": ""shape2""
          }
        },
        {
          ""from"": {
            ""shapeId"": ""shape1"",
            ""connector"":""Right""
          },
          ""to"": {
            ""shapeId"": ""shape3"",
            ""connector"":""Top""
          }
        }
      ]
    }";

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
                writer.WriteStringValue(shapeType.ToString());
    }
}
```

## See Also

* [Diagram `OnShapeClick` Event](slug:diagram-events#onshapeclick)
* [Save and Load Diagram State through JSON](slug:diagram-overview#define-shapes-and-connections-in-json)
* [Diagram Shapes](slug:diagram-shapes)
* [Diagram Methods](slug:telerik.blazor.components.telerikdiagram#methods)
