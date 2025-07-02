---
title: Overview
page_title: Diagram - Overview
description: The Blazor DIagram component
slug: diagram-overview
tags: telerik,blazor,diagram
published: True
position: 0
---

# Blazor Diagram Overview

The [Blazor Diagram component](https://www.telerik.com/blazor-ui/diagram) displays a hierarchy or relationships between objects or concepts. The Diagram provides a variety of built-in horizontal and vertical layouts. The connections between the graph nodes can be one-directional, bi-directional, or non-directional. The component allows customizing the size, position, and geometric form of its elements.

## Diagram Elements

The Diagram component UI consists of the following elements:

* *Shapes* are the Diagram nodes ([vertices](https://en.wikipedia.org/wiki/Vertex_(graph_theory))). Shapes can display text and images.
* *Connectors* are the 5 dots that appear on the Shape boundaries and center on hover. Users can grab a connector and drag it to another shape to create a new connection.
* *Connections* are the links ([edges](https://en.wikipedia.org/wiki/Glossary_of_graph_theory#edge)) betweem Diagram shapes. Normally, a connection links two Diagram shapes, but a connection can also exist without related shapes.
* *Caps* are the connection ends. The connections are directional, so each connection has a start cap and end cap. Note that difference between caps and connectors. Although they can overlap visually, connectors belong to a shape, while caps belong to a connection.
* *Selection handles* are the additional visual elements that appear at both ends of a connection when it is selected. The handles appear on top of the caps and connectors.
* [*Components*](https://en.wikipedia.org/wiki/Component_(graph_theory)) are groups (subgraphs) of connected shapes within the same Diagram that are not linked to each other. The Diagram provides [dedicated settings for such scenarios](slug:diagram-layouts#layout-grid-settings).

## Creating Blazor Diagram

There are two ways to define and display a Diagram:

* [Define the shapes and connections in the Diagram component declaration](#define-shapes-and-connections-declaratively).
* [Define the shapes and connections in a JSON](#define-shapes-and-connections-in-json).

### Define Shapes and Connections Declaratively

To create the Telerik Diagram for Blazor declaratively:

1. Add the `TelerikDiagram` tag.
1. [Define the Diagram layout](slug:diagram-layouts) through the `Type` parameter of the child `<DiagramLayout>` tag.
1. [Define shapes](slug:diagram-shapes) with `<DiagramShape>` tags inside `<DiagramShapes>`.
1. [Define the connections](slug:diagram-connections) between the shapes with `<DiagramConnection>` tags inside `<DiagramConnections>`.
1. (optional) Define the Diagram `Height`, `Width`, and initial `Zoom` for optimal display.
1. (optional) Define the default type of all Diagram [shapes](slug:diagram-shapes#shape-types) and [connections](slug:diagram-connections#connection-types).

>caption Basic Blazor Diagram

````RAZOR
<TelerikDiagram Height="420px" Zoom="0.8">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle" />

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
        <DiagramShape Id="shape4">
            <DiagramShapeContent Text="Shape 4" />
        </DiagramShape>
        <DiagramShape Id="shape5">
            <DiagramShapeContent Text="Shape 5" />
        </DiagramShape>
        <DiagramShape Id="shape6">
            <DiagramShapeContent Text="Shape 6" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape2" ToId="shape4" />
        <DiagramConnection FromId="shape2" ToId="shape5" />
        <DiagramConnection FromId="shape3" ToId="shape6" />
    </DiagramConnections>
</TelerikDiagram>
````

### Define Shapes and Connections in JSON

To load the shape and connection data from JSON:

1. [Capture the Diagram component reference through the `@ref` attribute](#diagram-reference).
1. Execute the Diagram [`LoadFromJsonAsync(string json)` method](slug:Telerik.Blazor.Components.TelerikDiagram#methods).

The minimum required JSON information includes:

* Shape `id`'s as strings.
* Shape `x` and `y` coordinates as pixel numbers.
* Connection `from.shapeId` and `to.shapeId` if the connection links shapes. Otherwise, set the start and end coordinates with `from.x`, `from.y`, `to.x`, and `to.y`.

Optionally, you can also define:

* Shape `width` and `height` as numbers.
* Connection `from.connector` and `to.connector` that determine which shape side the connection touches (`"Top"`, `"Right"`, `"Bottom"`, `"Left"`).

The Diagram provides a `SaveAsJsonAsync()` method that returns the current shape and connection state as a JSON string. This allows you to persist user changes or see how to define more advanced shape and connection settings in JSON format.

>caption Loading and saving the Diagram shape and connection state

````RAZOR
Make changes and
<TelerikButton OnClick="@OnSaveButtonClick">Save Diagram to JSON</TelerikButton>

Make more changes and restore with
<TelerikButton OnClick="@OnLoadButtonClick">Load Diagram from JSON</TelerikButton>

<TelerikDiagram @ref="@DiagramRef" Height="320px" Zoom="0.9">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle" />
</TelerikDiagram>

<div style="overflow:auto;max-height:90px;max-width:90vw;">
    @DiagramJson
</div>

@code {
    private TelerikDiagram? DiagramRef { get; set; }

    private async Task OnSaveButtonClick()
    {
        if (DiagramRef is not null)
        {
            DiagramJson = await DiagramRef.SaveAsJsonAsync();
        }
    }

    private async Task OnLoadButtonClick()
    {
        if (DiagramRef is not null)
        {
            await DiagramRef.LoadFromJsonAsync(DiagramJson);
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && DiagramRef is not null)
        {
            await Task.Delay(1); // wait for HTML and client-side Diagram instance
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
}
````

## Diagram API

Get familiar with all Diagram parameters, methods, events, and nested tags in the [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram).

As a rule of thumb, the Diagram markup follows these naming conventions:

* Tag names in plural wrap tag names in singular:
    ````RAZOR.skip-repl
    <DiagramShapes>
      <DiagramShape />
    </DiagramShapes>
    ````
* Tags are nested, so that child tag names use their parent tag name with an appended word:
    ````RAZOR.skip-repl
    <DiagramConnection>
        <DiagramConnectionSelection>
            <DiagramConnectionSelectionHandles>
                <DiagramConnectionSelectionHandlesFill />
            </DiagramConnectionSelectionHandles>
        </DiagramConnectionSelection>
    </DiagramConnection>
    ````
* The previous rule has two exceptions. The following tags are direct children of the root `<TelerikDiagram>` tag:
    * `<DiagramConnectionDefaults>` (not a child of `<DiagramConnection>`)
    * `<DiagramShapeDefaults>` (not a child of `<DiagramShape>`)

## Diagram Reference

The [Blazor Diagram component exposes methods](slug:Telerik.Blazor.Components.TelerikDiagram#methods) for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. Blazor populates component references in `OnAfterRenderAsync`, so they are not available earier.

See a full example in section [Create Diagram from JSON](#create-diagram-from-json) above.

>caption Using the Diagram reference

````RAZOR.skip-repl
<TelerikDiagram @ref="@DiagramRef" />

@code {
    private TelerikDiagram? DiagramRef { get; set; }
}
````

## Next Steps

* [Define Diagram layouts](slug:diagram-layouts)
* [Configure Diagram shapes](slug:diagram-shapes)
* [Customize Diagram connections](slug:diagram-connections)
* [Handle Diagram events](slug:diagram-events)

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
