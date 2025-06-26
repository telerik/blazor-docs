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

The Diagram for Blazor.


## Diagram Elements

* A Diagram item is called a *shape*.
* The relationship (link) betweem two Diagram shapes is called a *connection*.

## Creating Blazor Diagram

There are two ways to define and display a Diagram:

* Define the shapes and connections in the component declaration (easier and discussed in this section).
* [Define the shapes and connections in a JSON that the Diagram loads at runtime](#create-diagram-from-json) (more flexible and discussed in the section below).

To create the Telerik Diagram for Blazor declaratively:

1. Add the `TelerikDiagram` tag.
1. Define the Diagram layout through the `Type` parameter of the child `<DiagramLayout>` tag.
1. Define one or multiple shapes with `<DiagramShape>` tags inside `<DiagramShapes>`.
1. Define the connections between the shapes with `<DiagramConnection>` tags inside `<DiagramConnections>`.
1. (optional) Define the Diagram `Height`, `Width`, and initial `Zoom` for optimal display.
1. (optional) Define the default type of all Diagram shapes and connections.

>caption Basic Blazor Diagram

````RAZOR
<TelerikDiagram Height="420px" Zoom="0.8">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading"></DiagramConnectionDefaults>
    <DiagramLayout Type="@DiagramLayoutType.Tree"></DiagramLayout>
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle"></DiagramShapeDefaults>

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
        <DiagramShape Id="shape4">
            <DiagramShapeContent Text="Shape 4">
            </DiagramShapeContent>
        </DiagramShape>
        <DiagramShape Id="shape5">
            <DiagramShapeContent Text="Shape 5">
            </DiagramShapeContent>
        </DiagramShape>
        <DiagramShape Id="shape6">
            <DiagramShapeContent Text="Shape 6">
            </DiagramShapeContent>
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

## Create Diagram from JSON

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

* [Handle Diagram events](slug:diagram-events)


## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
