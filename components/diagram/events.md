---
title: Events
page_title: Diagram - Events
description: Learn about the Blazor Diagram component events and experiment with them in the provided runnable code examples.
slug: diagram-events
tags: telerik,blazor,diagram
published: True
position: 100
---

# Blazor Diagram Events

The Telerik Blazor Diagram fires events that are related to different user actions. This article describes all these events and their event arguments:

* [`OnConnectionClick`](#onconnectionclick)
* [`OnShapeClick`](#onshapeclick)

## OnConnectionClick

The `OnConnectionClick` event fires when the user clicks on a connection, including the connection ends that rest on the shape boundaries. The event argument is of type [`DiagramConnectionClickEventArgs`](slug:Telerik.Blazor.Components.DiagramConnectionClickEventArgs) and it provides information about the linked shapes (if they exist) or about the connection coordinates (if set).

>caption Using the Diagram OnConnectionClick event

````RAZOR.skip-repl
<TelerikDiagram OnConnectionClick="@OnDiagramConnectionClick" />

@code {
    private void OnDiagramConnectionClick(DiagramConnectionClickEventArgs args)
    {

    }
}
````

Also see the [example](#example) below.

## OnShapeClick

The `OnShapeClick` event fires when the user clicks on a shape. The event argument is of type [`DiagramShapeClickEventArgs`](slug:Telerik.Blazor.Components.DiagramShapeClickEventArgs) and provides the shape `Id`.

>caption Using the Diagram OnShapeClick event

````RAZOR.skip-repl
<TelerikDiagram OnShapeClick="@OnDiagramShapeClick" />

@code {
    private void OnDiagramShapeClick(DiagramShapeClickEventArgs args)
    {

    }
}
````

Use the [Diagram JSON state](slug:diagram-overview#define-shapes-and-connections-in-json) if you need to [change the Diagram configuration](slug:diagram-kb-change-shape-color-onshapeclick) while persisting other user changes that are not part of the component declaration.

## Example

The following example demonstrates all Diagram events in action.

>caption Using Diagram events

````RAZOR
<TelerikDiagram Height="360px"
                OnConnectionClick="@OnDiagramConnectionClick"
                OnShapeClick="@OnDiagramShapeClick">
    <DiagramLayout Type="@DiagramLayoutType.Tree" />

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
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection>
            <DiagramConnectionFrom X="300" Y="20" />
            <DiagramConnectionTo X="400" Y="200" />
        </DiagramConnection>
    </DiagramConnections>
</TelerikDiagram>

@DiagramEventLog

@code {
    private string DiagramEventLog { get; set; } = string.Empty;

    private void OnDiagramConnectionClick(DiagramConnectionClickEventArgs args)
    {
        if (args.FromX != null)
        {
            DiagramEventLog = $"Clicked on the connection between coordinates ({args.FromX}, {args.FromY}) and ({args.ToX}, {args.ToY}).";
        }
        else
        {
            DiagramEventLog = $"Clicked on the connection between shapes '{args.FromId}' and '{args.ToId}'.";
        }
    }

    private void OnDiagramShapeClick(DiagramShapeClickEventArgs args)
    {
        DiagramEventLog = $"Clicked on shape '{args.Id}'.";
    }
}
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
