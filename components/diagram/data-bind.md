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

````RAZOR
<TelerikDiagram ShapesData="@EmployeeShapesData"
                ConnectionsData="@EmployeeConnectionsData"
                Height="400px"
                Zoom="0.7"
                MinZoom="0.3"
                MaxZoom="1.5">
    <DiagramLayout Type="@DiagramLayoutType.Tree"
                   Subtype="@DiagramLayoutSubtype.Down" />
    <DiagramConnectionDefaults FromConnector="@DiagramConnectionsFromConnector.Bottom"
                               ToConnector="@DiagramConnectionsToConnector.Top" />
    <DiagramShapeDefaults CornerRadius="6"
                          Height="80"
                          Width="300">
        <DiagramShapeDefaultsContent Color="#212529" />
    </DiagramShapeDefaults>
</TelerikDiagram>

@code {
    private List<DiagramEmployee> Employees { get; set; } = new()
    {
        new() { Id = 1, Name = "Jane Simmons", Title = "CEO", BackgroundColor = "#d1e7dd", BorderColor = "#a3cfbb" },
        new() { Id = 2, ParentId = 1, Name = "Liam Turner", Title = "General Manager", BackgroundColor = "#d1e7dd", BorderColor = "#a3cfbb" },
        new() { Id = 3, ParentId = 2, Name = "Amelia Carter", Title = "HR Director", BackgroundColor = "#e2d9f3", BorderColor = "#c5b3e6" },
        new() { Id = 4, ParentId = 3, Name = "Chandrakant Krishnan", Title = "HR Manager", BackgroundColor = "#cfe2ff", BorderColor = "#9ec5fe" },
        new() { Id = 6, ParentId = 2, Name = "Noah Sullivan", Title = "UX Manager", BackgroundColor = "#e2d9f3", BorderColor = "#c5b3e6" },
        new() { Id = 7, ParentId = 6, Name = "Isabella Hayes", Title = "UX Design Lead", BackgroundColor = "#cfe2ff", BorderColor = "#9ec5fe" },
        new() { Id = 10, ParentId = 2, Name = "Zara Mitchell", Title = "Marketing Manager", BackgroundColor = "#e2d9f3", BorderColor = "#c5b3e6" },
        new() { Id = 11, ParentId = 10, Name = "Leo Anderson", Title = "Marketing Lead", BackgroundColor = "#cfe2ff", BorderColor = "#9ec5fe" }
    };

    public List<DiagramShapeDescriptor> EmployeeShapesData { get; set; } = new List<DiagramShapeDescriptor>();
    public List<DiagramConnectionDescriptor> EmployeeConnectionsData { get; set; } = new List<DiagramConnectionDescriptor>();

    protected override void OnInitialized()
    {
        InitializeEmployeeDiagram();
    }

    private void InitializeEmployeeDiagram()
    {
        foreach (DiagramEmployee employee in Employees)
        {
            EmployeeShapesData.Add(new DiagramShapeDescriptor()
            {
                Id = $"shape-{employee.Id}",
                Fill = new DiagramShapeFillDescriptor()
                {
                    Color = employee.BackgroundColor
                },
                Stroke = new DiagramShapeStrokeDescriptor()
                {
                    Color = employee.BorderColor,
                    Width = 2
                },
                Content = new DiagramShapeContentDescriptor()
                {
                    Blocks = new List<DiagramShapeContentBlockDescriptor>()
                    {
                        new DiagramShapeContentBlockDescriptor()
                        {
                            Children = new List<DiagramShapeContentBlockChildDescriptor>()
                            {
                                new DiagramShapeContentBlockChildDescriptor() { Type = DiagramShapeContentBlocksChildrenType.Image, Src = $"https://demos.telerik.com/blazor-ui/images/diagram/{employee.Id}.png", Width = 18, Height = 18 },
                                new DiagramShapeContentBlockChildDescriptor() { Text = " ", FontSize = 20 },
                                new DiagramShapeContentBlockChildDescriptor() { Text = employee.Name, FontSize = 20, Bold = true },
                                new DiagramShapeContentBlockChildDescriptor() { Type = DiagramShapeContentBlocksChildrenType.Break },
                                new DiagramShapeContentBlockChildDescriptor() { Text = employee.Title, FontSize = 16 }
                            }
                        }
                    }
                }
            });

            if (employee.ParentId is not null)
            {
                EmployeeConnectionsData.Add(new DiagramConnectionDescriptor()
                {
                    FromId = $"shape-{employee.ParentId}",
                    ToId = $"shape-{employee.Id}",
                    Stroke = new DiagramConnectionStrokeDescriptor()
                    {
                        Color = "#666"
                    }
                });
            }
        }
    }

    public class DiagramEmployee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string BorderColor { get; set; } = string.Empty;
        public string BackgroundColor { get; set; } = string.Empty;
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
            },
            Editable = new DiagramConnectionEditableDescriptor()
            {
                Drag = true,
                Remove = true,
                Points = new DiagramConnectionEditablePointsDescriptor()
                {
                    Enabled = true,
                    Snap = 10
                }
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
            },
            Editable = new DiagramConnectionEditableDescriptor()
            {
                Drag = false,
                Remove = false,
                Points = new DiagramConnectionEditablePointsDescriptor()
                {
                    Enabled = false
                }
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
