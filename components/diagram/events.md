---
title: Events
page_title: Diagram - Events
description: Learn about the Blazor Diagram component events and experiment with them in the provided runnable code examples.
slug: diagram-events
tags: telerik,blazor,diagram
published: True
position: 100
components: ["diagram"]
---
# Blazor Diagram Events

The Telerik [Blazor Diagram](slug:diagram-overview) fires events that are related to different user actions. This article describes all these events and their event arguments:

* [`OnConnectionClick`](#onconnectionclick)
* [`OnConnectionDragStart`](#onconnectiondragstart)
* [`OnConnectionDragEnd`](#onconnectiondragend)
* [`OnShapeClick`](#onshapeclick)
* [`OnShapeDragStart`](#onshapedragstart)
* [`OnShapeDragEnd`](#onshapedragend)

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

## OnConnectionDragStart

The `OnConnectionDragStart` event fires when the user starts dragging a connection in the Diagram. The event argument is of type [`DiagramConnectionDragStartEventArgs`](slug:Telerik.Blazor.Components.DiagramConnectionDragStartEventArgs) and provides information about the connection being dragged.

The `DiagramConnectionDragStartEventArgs` exposes the following properties:

* `Connections` (`List<DiagramConnectionDragDescriptor>`)&mdash;the connections being dragged. Each `DiagramConnectionDragDescriptor` contains:
    * `FromId` and `ToId`&mdash;the source and target shape identifiers
    * `FromX`, `FromY`, `ToX`, `ToY`&mdash;the source and target point coordinates
* `ConnectionHandle` (string)&mdash;the handle name (`"source"` or `"target"`) when dragging a connection endpoint. This property is `null` when dragging the entire connection body.

>caption Using the Diagram OnConnectionDragStart event

````RAZOR.skip-repl
<TelerikDiagram OnConnectionDragStart="@OnDiagramConnectionDragStart" />

@code {
    private void OnDiagramConnectionDragStart(DiagramConnectionDragStartEventArgs args)
    {
        // args.Connections contains the dragged connections
        // args.ConnectionHandle is "source" or "target" when dragging an endpoint
    }
}
````

Also see the [example](#example) below.

## OnConnectionDragEnd

The `OnConnectionDragEnd` event fires when the user finishes dragging a connection in the Diagram. The event argument is of type [`DiagramConnectionDragEndEventArgs`](slug:Telerik.Blazor.Components.DiagramConnectionDragEndEventArgs) and provides the same information as `OnConnectionDragStart`.

>caption Using the Diagram OnConnectionDragEnd event

````RAZOR.skip-repl
<TelerikDiagram OnConnectionDragEnd="@OnDiagramConnectionDragEnd" />

@code {
    private void OnDiagramConnectionDragEnd(DiagramConnectionDragEndEventArgs args)
    {
        // args.Connections contains the dragged connections
    }
}
````

Also see the [example](#example) below.

## OnShapeDragStart

The `OnShapeDragStart` event fires when the user starts dragging a shape in the Diagram. The event argument is of type [`DiagramShapeDragStartEventArgs`](slug:Telerik.Blazor.Components.DiagramShapeDragStartEventArgs) and provides information about the shape being dragged.

The `DiagramShapeDragStartEventArgs` exposes the following property:

* `Shapes` (`List<DiagramShapeDragDescriptor>`)&mdash;the shapes being dragged. Each `DiagramShapeDragDescriptor` contains the shape `Id`.

>caption Using the Diagram OnShapeDragStart event

````RAZOR.skip-repl
<TelerikDiagram OnShapeDragStart="@OnDiagramShapeDragStart" />

@code {
    private void OnDiagramShapeDragStart(DiagramShapeDragStartEventArgs args)
    {
        // args.Shapes contains the dragged shapes
    }
}
````

Also see the [example](#example) below.

## OnShapeDragEnd

The `OnShapeDragEnd` event fires when the user finishes dragging a shape in the Diagram. The event argument is of type [`DiagramShapeDragEndEventArgs`](slug:Telerik.Blazor.Components.DiagramShapeDragEndEventArgs) and provides the same information as `OnShapeDragStart`.

>caption Using the Diagram OnShapeDragEnd event

````RAZOR.skip-repl
<TelerikDiagram OnShapeDragEnd="@OnDiagramShapeDragEnd" />

@code {
    private void OnDiagramShapeDragEnd(DiagramShapeDragEndEventArgs args)
    {
        // args.Shapes contains the dragged shapes
    }
}
````

Also see the [example](#example) below.

## Example

The following example demonstrates all Diagram events in action.

>caption Using Diagram events

````RAZOR
<TelerikDiagram Height="400px"
                OnConnectionClick="@OnDiagramConnectionClick"
                OnConnectionDragStart="@OnDiagramConnectionDragStart"
                OnConnectionDragEnd="@OnDiagramConnectionDragEnd"
                OnShapeClick="@OnDiagramShapeClick"
                OnShapeDragStart="@OnDiagramShapeDragStart"
                OnShapeDragEnd="@OnDiagramShapeDragEnd">
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

    private void OnDiagramConnectionDragStart(DiagramConnectionDragStartEventArgs args)
    {
        string handleInfo = string.IsNullOrEmpty(args.ConnectionHandle)
            ? string.Empty
            : $" (endpoint: {args.ConnectionHandle})";

        DiagramEventLog = $"Started dragging {args.Connections?.Count} connection(s){handleInfo}.";
    }

    private void OnDiagramConnectionDragEnd(DiagramConnectionDragEndEventArgs args)
    {
        DiagramEventLog = $"Finished dragging {args.Connections?.Count} connection(s).";
    }

    private void OnDiagramShapeDragStart(DiagramShapeDragStartEventArgs args)
    {
        DiagramEventLog = $"Started dragging {args.Shapes?.Count} shape(s).";
    }

    private void OnDiagramShapeDragEnd(DiagramShapeDragEndEventArgs args)
    {
        DiagramEventLog = $"Finished dragging {args.Shapes?.Count} shape(s).";
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
