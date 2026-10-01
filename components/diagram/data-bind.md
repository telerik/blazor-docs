---
title: Data Binding
page_title: Diagram - Data Binding
description: Learn how to bind the Blazor Diagram to data using descriptor classes for shapes and connections.
slug: diagram-data-binding
tags: telerik,blazor,diagram,data,binding
published: True
position: 2
components: ["diagram"]
---

# Diagram Data Binding

This article explains how to bind the Diagram component to a data source using descriptor classes. Data binding provides an alternative to defining shapes and connections declaratively with tags.

The Diagram supports binding to collections of shapes and connections through two main parameters:

* `ShapesData`&mdash;accepts a `List<DiagramShapeDescriptor>` that defines the shapes and their properties.
* `ConnectionsData`&mdash;accepts a `List<DiagramConnectionDescriptor>` that defines the connections between shapes and their properties.

The descriptor classes mirror the properties of the declarative tags [`<DiagramShape>`](slug:diagram-shapes) and [`<DiagramConnection>`](slug:diagram-connections), allowing you to configure the Diagram elements programmatically.


## Descriptor Classes

The data binding mechanism uses descriptor classes that correspond to the declarative component tags. For each tag, there is a descriptor class with the same properties:

* [`DiagramShapeDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeDescriptor)&mdash;corresponds to `<DiagramShape>` and contains properties like `Id`, `X`, `Y`, `Width`, `Height`, `Fill`, `Content`, and more.
* [`DiagramConnectionDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionDescriptor)&mdash;corresponds to `<DiagramConnection>` and contains properties like `FromId`, `ToId`, `Stroke`, `Content`, and more.

Nested properties (such as `Fill`, `Stroke`, and `Content`) also have their own descriptor classes:

* [`DiagramShapeFillDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeFillDescriptor)&mdash;defines the fill color and gradient of a shape.
* [`DiagramShapeContentDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeContentDescriptor)&mdash;defines the text and text color displayed inside a shape.
* [`DiagramShapeContentBlockDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeContentBlockDescriptor)&mdash;defines a block inside the Shape that can hold text or image children.
* [`DiagramShapeContentBlockDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeContentBlockChildDescriptor)&mdash;defines a single child within a Shape content block.
* [`DiagramConnectionStrokeDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionStrokeDescriptor)&mdash;defines the stroke color and width of a connection.
* [`DiagramConnectionContentDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionContentDescriptor)&mdash;defines the text and text color displayed on a connection.
* [`DiagramConnectionEditableDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionEditableDescriptor)&mdash;configures connection editing behavior, including point editing, dragging, and removal.
* [`DiagramConnectionEditablePointsDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionEditablePointsDescriptor)&mdash;configures connection point editing behavior, including enabling point editing and snap distance.

## Binding Data from Custom Models

You can map data from your existing model classes to the descriptor classes. This approach provides flexibility and allows you to integrate the Diagram with your application data.

The example below demonstrates how to:

* Use a custom model class (`DiagramEmployee`).
* Map the model data to `DiagramShapeDescriptor` and `DiagramConnectionDescriptor`.
* Set shape and connection properties such as color, text, and position.
* Use [rich content in the Shapes declaratively](slug:diagram-shapes#rich-content).

>caption Binding the Diagram to data from custom models

<demo metaUrl="client/diagram/data-bind/custom-models-2/" height="600"></demo>

## Direct Descriptor Initialization

You can also create the descriptor objects directly without mapping from custom models. This approach is useful when you don't have an existing data structure or prefer to define the Diagram data inline.

>caption Direct initialization of descriptor objects

<demo metaUrl="client/diagram/data-bind/direct-initialization-1/" height="620"></demo>

## See Also

* [Diagram Overview](slug:diagram-overview)
* [Diagram Shapes](slug:diagram-shapes)
* [Diagram Connections](slug:diagram-connections)
* [Diagram Layouts](slug:diagram-layouts)
