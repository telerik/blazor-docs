---
title: Layouts
page_title: Diagram - Layouts
description: Learn about the built-in predefined Blazor Diagram layouts and experiment with them in the provided runnable code examples.
slug: diagram-layouts
tags: telerik,blazor,diagram
published: True
position: 10
---

# Blazor Diagram Layouts

The Telerik Blazor Diagram provides a few built-in layouts, so that you don't have to define the positions of all shapes and connections manually.

## Force Layout

## Layered

## Tree Layout

## Example

The following example demonstrates all Diagram layout types and sub types.

>caption Using Diagram layouts

````RAZOR
Layout Type:
<TelerikButtonGroup>
    <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutTypeChanged(newSelected, DiagramLayoutType.Force) )"
                             Selected="@( DiagramLayoutType == DiagramLayoutType.Force)">Force</ButtonGroupToggleButton>
    <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutTypeChanged(newSelected, DiagramLayoutType.Layered) )"
                             Selected="@( DiagramLayoutType == DiagramLayoutType.Layered)">Layered</ButtonGroupToggleButton>
    <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutTypeChanged(newSelected, DiagramLayoutType.Tree) )"
                             Selected="@( DiagramLayoutType == DiagramLayoutType.Tree)">Tree</ButtonGroupToggleButton>
</TelerikButtonGroup>

@if (DiagramLayoutType != DiagramLayoutType.Force)
{
    <br />
    <text>Sub Type:</text>
    <TelerikButtonGroup>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.Down) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.Down)">Down</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.Left) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.Left)">Left</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.MindMapHorizontal) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.MindMapHorizontal)"
                                 Enabled="@( DiagramLayoutType == DiagramLayoutType.Tree )">Mind Map H</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.MindMapVertical) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.MindMapVertical)"
                                 Enabled="@( DiagramLayoutType == DiagramLayoutType.Tree )">Mind Map V</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.Radial) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.Radial)"
                                 Enabled="@( DiagramLayoutType == DiagramLayoutType.Tree )">Radial</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.Right) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.Right)">Right</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.TipOver) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.TipOver)"
                                 Enabled="@( DiagramLayoutType == DiagramLayoutType.Tree )">Tip Over</ButtonGroupToggleButton>
        <ButtonGroupToggleButton SelectedChanged="@( (bool newSelected) => DiagramLayoutSubtypeChanged(newSelected, DiagramLayoutSubtype.Up) )"
                                 Selected="@( DiagramLayoutSubtype == DiagramLayoutSubtype.Up)">Up</ButtonGroupToggleButton>
    </TelerikButtonGroup>
}

<TelerikDiagram Zoom="0.5">
    <DiagramLayout Type="@DiagramLayoutType" Subtype="@DiagramLayoutSubtype"></DiagramLayout>

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="1" />
            <DiagramShapeFill Color="#000" />
        </DiagramShape>
        <DiagramShape Id="shape1-1">
            <DiagramShapeContent Text="1-1" />
            <DiagramShapeFill Color="#888" />
        </DiagramShape>
        <DiagramShape Id="shape1-2">
            <DiagramShapeContent Text="1-2" />
            <DiagramShapeFill Color="#888" />
        </DiagramShape>
        <DiagramShape Id="shape1-3">
            <DiagramShapeContent Text="1-3" />
            <DiagramShapeFill Color="#888" />
        </DiagramShape>
        <DiagramShape Id="shape1-1-1">
            <DiagramShapeContent Text="1-1-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape1-2-1">
            <DiagramShapeContent Text="1-2-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape1-2-2">
            <DiagramShapeContent Text="1-2-2" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape1-3-1">
            <DiagramShapeContent Text="1-3-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape1-3-2">
            <DiagramShapeContent Text="1-3-2" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape1-3-3">
            <DiagramShapeContent Text="1-3-3" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape1-1" />
        <DiagramConnection FromId="shape1" ToId="shape1-2" />
        <DiagramConnection FromId="shape1" ToId="shape1-3" />
        <DiagramConnection FromId="shape1-1" ToId="shape1-1-1" />
        <DiagramConnection FromId="shape1-2" ToId="shape1-2-1" />
        <DiagramConnection FromId="shape1-2" ToId="shape1-2-2" />
        <DiagramConnection FromId="shape1-3" ToId="shape1-3-1" />
        <DiagramConnection FromId="shape1-3" ToId="shape1-3-2" />
        <DiagramConnection FromId="shape1-3" ToId="shape1-3-3" />
    </DiagramConnections>
</TelerikDiagram>

@code {
    private DiagramLayoutType DiagramLayoutType { get; set; } = DiagramLayoutType.Tree;

    private DiagramLayoutSubtype DiagramLayoutSubtype { get; set; } = DiagramLayoutSubtype.Down;

    private void DiagramLayoutTypeChanged(bool newSelected, DiagramLayoutType newDiagramLayoutType)
    {
        if (newSelected)
        {
            DiagramLayoutType = newDiagramLayoutType;
        }
    }

    private void DiagramLayoutSubtypeChanged(bool newSelected, DiagramLayoutSubtype newDiagramLayoutSubtype)
    {
        if (newSelected)
        {
            DiagramLayoutSubtype = newDiagramLayoutSubtype;
        }
    }
}
````

## See Also

* [Live Demos: Diagram](https://demos.telerik.com/blazor-ui/diagram/overview)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
