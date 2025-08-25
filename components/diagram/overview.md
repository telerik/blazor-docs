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

The [Blazor Diagram component](https://www.telerik.com/blazor-ui/diagram) displays relationships between objects or concepts, for example, hierachy. The Diagram provides a variety of built-in shapes and horizontal and vertical layouts. The connections between the graph nodes can be one-directional, bi-directional, or non-directional. The component allows customizing the size, position, and geometric form of its elements.

## Diagram Elements

The Diagram component UI consists of the following elements:

* [*Shapes*](slug:diagram-shapes) are the Diagram nodes ([vertices](https://en.wikipedia.org/wiki/Vertex_(graph_theory))). Shapes can display text and images.
* [*Connectors*](slug:diagram-shapes#connectors) are the 5 dots that appear on the Shape boundaries and center on hover. Users can grab a connector and drag it to another shape to create a new connection.
* [*Connections*](slug:diagram-connections) are the links ([edges](https://en.wikipedia.org/wiki/Glossary_of_graph_theory#edge)) between Diagram shapes. Normally, a connection links two Diagram shapes, but a connection can also exist without related shapes.
* [*Caps*](slug:diagram-connections#cap-types) are the connection ends. The connections are directional, so each connection has a start cap and end cap.
* [*Selection handles*](slug:diagram-connections#selection-handles) are the additional visual elements that appear at both ends of a connection when it is selected. The handles appear on top of the caps and connectors.
* [*Components*](slug:diagram-layouts#layout-grid-settings) are groups ([subgraphs](https://en.wikipedia.org/wiki/Component_(graph_theory))) of connected shapes within the same Diagram that are not linked to each other. The Diagram provides [dedicated settings for such scenarios].

Note that difference between caps, connectors, and selection handles. Although they can overlap visually, connectors belong to a shape, while caps and selection handles belong to a connection.

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
1. (optional) Define the Diagram `Height`, `Width`, and [initial `Zoom`](#zoom) for optimal display. The default height is `"600px"`.
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
        DiagramJson = await DiagramRef!.SaveAsJsonAsync();
    }

    private async Task OnLoadButtonClick()
    {
        await DiagramRef!.LoadFromJsonAsync(DiagramJson);
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

## Layouts

The [Diagram provides multiple built-in horizontal and vertical layouts](slug:diagram-layouts), which arrange all shapes and connections automatically, according to specific rules and priorities. Some of the layouts have variations called sub types.

## Shapes

The shapes are the graph nodes and the main building blocks of the Diagram component. Learn about the [shape types and available configuration options](slug:diagram-shapes).

## Connections

Connections link shapes or points in the Diagram. Users can create, modify or remove connections at runtime. See the [Diagram connection features and settings](slug:diagram-connections).

## Zoom

The Diagram allows users to zoom the graph in and out for better perception. The following code snippet shows the relevant parameters together with their default values. The default `Zoom` value is effectively `100%` and the default maximum zoom is `200%`. A `Zoom` value below `0.5` may not be readable, unless the shapes use a large font size or users zoom their browser.

>caption Zoom-related Diagram parameters

````RAZOR.skip-repl
<TelerikDiagram Zoom="1"
                ZoomRate="0.1"
                MaxZoom="2"
                MinZoom="0" />
````

## Events

The Telerik Diagram fires events that enable the app to detect and react to user interactions with the component. Find out more about the [Diagram events and event arguments](slug:diagram-events).

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
* The previous rule has the following exceptions:
    * `<DiagramConnectionDefaults>` is a child of `<TelerikDiagram>`.
    * `<DiagramShapeDefaults>` is a child of `<TelerikDiagram>`.
    * `<DiagramShapeDefaultsConnectorDefaults>` is a child of `<DiagramShapeDefaults>`.
    * `<DiagramShapeConnectorDefaults>` is a child of `<DiagramShape>`.

## Diagram Reference

The [Blazor Diagram component exposes methods](slug:Telerik.Blazor.Components.TelerikDiagram#methods) for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. Blazor populates component references in `OnAfterRenderAsync`, so they are not available earier.

See a full example in section [Create Diagram from JSON](#define-shapes-and-connections-in-json) above.

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
