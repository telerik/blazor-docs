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

* `ShapesData`—accepts a `List<DiagramShapeDescriptor>` that defines the shapes and their properties.
* `ConnectionsData`—accepts a `List<DiagramConnectionDescriptor>` that defines the connections between shapes and their properties.

The descriptor classes mirror the properties of the declarative tags [`<DiagramShape>`](slug:diagram-shapes) and [`<DiagramConnection>`](slug:diagram-connections), allowing you to configure the Diagram elements programmatically.


## Descriptor Classes

The data binding mechanism uses descriptor classes that correspond to the declarative component tags. For each tag, there is a descriptor class with the same properties:

* [`DiagramShapeDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeDescriptor)—corresponds to `<DiagramShape>` and contains properties like `Id`, `X`, `Y`, `Width`, `Height`, `Fill`, `Content`, and more.
* [`DiagramConnectionDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionDescriptor)—corresponds to `<DiagramConnection>` and contains properties like `FromId`, `ToId`, `Stroke`, `Content`, and more.

Nested properties (such as `Fill`, `Stroke`, and `Content`) also have their own descriptor classes:

* [`DiagramShapeFillDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeFillDescriptor)—defines the fill color and gradient of a shape.
* [`DiagramShapeContentDescriptor`](slug:Telerik.Blazor.Components.DiagramShapeContentDescriptor)—defines the text and text color displayed inside a shape.
* [`DiagramConnectionStrokeDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionStrokeDescriptor)—defines the stroke color and width of a connection.
* [`DiagramConnectionContentDescriptor`](slug:Telerik.Blazor.Components.DiagramConnectionContentDescriptor)—defines the text and text color displayed on a connection.

## Binding Data from Custom Models

You can map data from your existing model classes to the descriptor classes. This approach provides flexibility and allows you to integrate the Diagram with your application data.

The example below demonstrates how to:

* Create custom model classes (`OrganizationNode` and `OrganizationConnection`).
* Map the model data to `DiagramShapeDescriptor` and `DiagramConnectionDescriptor`.
* Set shape and connection properties such as color, text, and position.

>caption Binding the Diagram to data from custom models

````RAZOR
<TelerikDiagram ShapesData="@ShapesData"
                ConnectionsData="@ConnectionsData"
                Height="600px">
    <DiagramShapeDefaults />
    <DiagramLayout HorizontalSeparation="140"
                   VerticalSeparation="80" />
</TelerikDiagram>

@code {
    private List<DiagramShapeDescriptor> ShapesData { get; set; } = new List<DiagramShapeDescriptor>();
    private List<DiagramConnectionDescriptor> ConnectionsData { get; set; } = new List<DiagramConnectionDescriptor>();

    protected override void OnInitialized()
    {
        var nodes = GetOrganizationNodes();

        foreach (var node in nodes)
        {
            ShapesData.Add(new DiagramShapeDescriptor()
            {
                Id = node.Id,
                Width = node.Width,
                Height = node.Height,
                Fill = new DiagramShapeFillDescriptor()
                {
                    Color = node.BackgroundColor
                },
                Content = new DiagramShapeContentDescriptor()
                {
                    Text = node.Label,
                    Color = node.TextColor
                }
            });
        }

        var connections = GetOrganizationConnections();

        foreach (var connection in connections)
        {
            ConnectionsData.Add(new DiagramConnectionDescriptor()
            {
                FromId = connection.FromId,
                ToId = connection.ToId,
                Stroke = new DiagramConnectionStrokeDescriptor()
                {
                    Color = connection.LineColor
                },
                Content = new DiagramConnectionContentDescriptor()
                {
                    Text = connection.Label,
                    Color = connection.LabelColor
                }
            });
        }
    }

    private List<OrganizationNode> GetOrganizationNodes()
    {
        return new List<OrganizationNode>()
        {
            new OrganizationNode()
            {
                Id = "ceo",
                Label = "CEO",
                Width = 150,
                Height = 70,
                BackgroundColor = "#0078D4",
                TextColor = "#FFFFFF"
            },
            new OrganizationNode()
            {
                Id = "cto",
                Label = "CTO",
                Width = 150,
                Height = 70,
                BackgroundColor = "#00BCF2",
                TextColor = "#FFFFFF"
            },
            new OrganizationNode()
            {
                Id = "cfo",
                Label = "CFO",
                Width = 150,
                Height = 70,
                BackgroundColor = "#00BCF2",
                TextColor = "#FFFFFF"
            },
            new OrganizationNode()
            {
                Id = "dev-manager",
                Label = "Dev Manager",
                Width = 150,
                Height = 70,
                BackgroundColor = "#8661C5",
                TextColor = "#FFFFFF"
            },
            new OrganizationNode()
            {
                Id = "qa-manager",
                Label = "QA Manager",
                Width = 150,
                Height = 70,
                BackgroundColor = "#8661C5",
                TextColor = "#FFFFFF"
            },
            new OrganizationNode()
            {
                Id = "finance-manager",
                Label = "Finance Manager",
                Width = 150,
                Height = 70,
                BackgroundColor = "#8661C5",
                TextColor = "#FFFFFF"
            }
        };
    }

    private List<OrganizationConnection> GetOrganizationConnections()
    {
        return new List<OrganizationConnection>()
        {
            new OrganizationConnection()
            {
                FromId = "ceo",
                ToId = "cto",
                Label = "Supervises",
                LineColor = "#0078D4",
                LabelColor = "#0078D4"
            },
            new OrganizationConnection()
            {
                FromId = "ceo",
                ToId = "cfo",
                Label = "Supervises",
                LineColor = "#0078D4",
                LabelColor = "#0078D4"
            },
            new OrganizationConnection()
            {
                FromId = "cto",
                ToId = "dev-manager",
                Label = "Manages",
                LineColor = "#00BCF2",
                LabelColor = "#00BCF2"
            },
            new OrganizationConnection()
            {
                FromId = "cto",
                ToId = "qa-manager",
                Label = "Manages",
                LineColor = "#00BCF2",
                LabelColor = "#00BCF2"
            },
            new OrganizationConnection()
            {
                FromId = "cfo",
                ToId = "finance-manager",
                Label = "Manages",
                LineColor = "#00BCF2",
                LabelColor = "#00BCF2"
            }
        };
    }

    public class OrganizationNode
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public string BackgroundColor { get; set; }
        public string TextColor { get; set; }
    }

    public class OrganizationConnection
    {
        public string FromId { get; set; }
        public string ToId { get; set; }
        public string Label { get; set; }
        public string LineColor { get; set; }
        public string LabelColor { get; set; }
    }
}
````


## Direct Descriptor Initialization

You can also create the descriptor objects directly without mapping from custom models. This approach is useful when you don't have an existing data structure or prefer to define the Diagram data inline.

>caption Direct initialization of descriptor objects

````RAZOR
<TelerikDiagram @ref="@DiagramRef"
                ShapesData="@ShapesData"
                ConnectionsData="@ConnectionsData"
                Height="500px">
    <DiagramShapeDefaults Type="@DiagramShapeType.Circle" />
</TelerikDiagram>

@code {
    private TelerikDiagram DiagramRef { get; set; }

    private List<DiagramShapeDescriptor> ShapesData { get; set; } = new List<DiagramShapeDescriptor>()
    {
        new DiagramShapeDescriptor()
        {
            Id = "node1",
            X = 150,
            Y = 100,
            Fill = new DiagramShapeFillDescriptor()
            {
                Color = "#FF6358"
            },
            Content = new DiagramShapeContentDescriptor()
            {
                Text = "Process Start",
                Color = "#FFFFFF"
            }
        },
        new DiagramShapeDescriptor()
        {
            Id = "node2",
            X = 400,
            Y = 100,
            Fill = new DiagramShapeFillDescriptor()
            {
                Color = "#FFB822"
            },
            Content = new DiagramShapeContentDescriptor()
            {
                Text = "Data Input",
                Color = "#000000"
            }
        },
        new DiagramShapeDescriptor()
        {
            Id = "node3",
            X = 650,
            Y = 100,
            Fill = new DiagramShapeFillDescriptor()
            {
                Color = "#28B4C8"
            },
            Content = new DiagramShapeContentDescriptor()
            {
                Text = "Processing",
                Color = "#FFFFFF"
            }
        },
        new DiagramShapeDescriptor()
        {
            Id = "node4",
            X = 400,
            Y = 300,
            Fill = new DiagramShapeFillDescriptor()
            {
                Color = "#2EB85C"
            },
            Content = new DiagramShapeContentDescriptor()
            {
                Text = "Output Result",
                Color = "#FFFFFF"
            }
        }
    };

    private List<DiagramConnectionDescriptor> ConnectionsData { get; set; } = new List<DiagramConnectionDescriptor>()
    {
        new DiagramConnectionDescriptor()
        {
            FromId = "node1",
            ToId = "node2",
            Stroke = new DiagramConnectionStrokeDescriptor()
            {
                Color = "#FF6358"
            },
            Content = new DiagramConnectionContentDescriptor()
            {
                Text = "Initialize",
                Color = "#FF6358"
            }
        },
        new DiagramConnectionDescriptor()
        {
            FromId = "node2",
            ToId = "node3",
            Stroke = new DiagramConnectionStrokeDescriptor()
            {
                Color = "#FFB822"
            },
            Content = new DiagramConnectionContentDescriptor()
            {
                Text = "Validate",
                Color = "#FFB822"
            }
        },
        new DiagramConnectionDescriptor()
        {
            FromId = "node3",
            ToId = "node4",
            Stroke = new DiagramConnectionStrokeDescriptor()
            {
                Color = "#28B4C8"
            },
            Content = new DiagramConnectionContentDescriptor()
            {
                Text = "Complete",
                Color = "#28B4C8"
            }
        },
        new DiagramConnectionDescriptor()
        {
            FromId = "node1",
            ToId = "node4",
            Stroke = new DiagramConnectionStrokeDescriptor()
            {
                Color = "#6C757D"
            },
            Content = new DiagramConnectionContentDescriptor()
            {
                Text = "Error Path",
                Color = "#6C757D"
            }
        }
    };
}
````

## See Also

* [Diagram Overview](slug:diagram-overview)
* [Diagram Shapes](slug:diagram-shapes)
* [Diagram Connections](slug:diagram-connections)
* [Diagram Layouts](slug:diagram-layouts)
