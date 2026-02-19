---
title: Layouts
page_title: Diagram - Layouts
description: Learn about the built-in predefined Blazor Diagram layouts and experiment with them in the provided runnable code examples.
slug: diagram-layouts
tags: telerik,blazor,diagram
published: True
position: 10
components: ["diagram"]
---
# Blazor Diagram Layouts

The Telerik [Blazor Diagram](slug:diagram-overview) provides a few built-in layouts, so that you don't have to define the positions of all shapes and connections manually. The Diagram supports the most popular layout algorithms, including tree layout, force-directed layout and layered layout.

## Tree Layout

The Tree Diagram layout positions the shapes in a hierarchical way. A typical use case for this layout is to display the teams or employess in an organization.

>caption Using the Tree Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
</TelerikDiagram>
````

### Tree Layout Subtypes

The Tree Diagram layout has the following sub types:

* `Down`&mdash;the root shape is at the top and all descendants are arranged below it.
* `Left`&mdash;the root shape is on the right.
* `MindMapHorizontal`&mdash;the root shape is at the center and all descendants are arranged to the left and right in a balanced way.
* `MindMapVertical`&mdash;the root shape is at the center and all descendants are arranged above and below it in a balanced way.
* `Radial`&mdash;the root shape is at the center and all descendants are arranged around it.
* `Right`&mdash;the root shape is on the left.
* `TipOver`&mdash;a variation of the `Down` sub type. The root shape is at the top. The direct children are arranged horizontally in a row, while the grand children are arranged verticallu on columns.
* `Up`&mdash;the root shape is at the bottom.

`<DiagramLayout>` provides apperance settings that apply to specific tree layout sub types. The snippets below list these settings and their default values. `HorizontalSeparation` and `VerticalSeparation` apply to all sub types, except `Radial`.

>caption Using a classic Tree Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"
                   Subtype="@DiagramLayoutSubtype.Down"
                   HorizontalSeparation="90"
                   VerticalSeparation="50" />
</TelerikDiagram>
````

>caption Using a Radial Tree Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"
                   Subtype="@DiagramLayoutSubtype.Radial"
                   StartRadialAngle="0"
                   EndRadialAngle="360"
                   RadialSeparation="150"
                   RadialFirstLevelSeparation="200" />
</TelerikDiagram>
````

When using the Tree `TipOver` sub type, the `HorizontalSeparation` and `VerticalSeparation` parameters affect the distances between shapes at the initial levels, which are not affected by the tipover algorithm. The number of these levels depends on the value of `TipOverTreeStartLevel`.

>caption Using a TipOver Tree Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Tree"
                   Subtype="@DiagramLayoutSubtype.TipOver"
                   TipOverTreeStartLevel="1"
                   UnderneathHorizontalOffset="15"
                   UnderneathVerticalSeparation="15"
                   UnderneathVerticalTopOffset="15" />
</TelerikDiagram>
````

## Layered Layout

The [Layered Diagram layout](https://en.wikipedia.org/wiki/Layered_graph_drawing) positions shapes with an emphasis on the flow. The nodes (shapes) are positioned in horizontal or vertical layers (rows). The layered layout type minimizes the:

* Distance between linked shapes
* Connection lengths
* Crossings between layers of shapes

The layered layout works best with:

* One-direction flows that match the layout subtype
* No [components (subgraphs)](slug:diagram-overview#diagram-elements)
* No cycles (connections flowing back upstream)

When the graph is a tree, the layout reduces to a standard tree layout and thus can be considered as an extension to the classic tree layout.

The `LayerSeparation` parameter sets the distance between the layout layers. The default value is `50`.

>caption Using the Layered Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Layered"
                   LayerSeparation="50" />
</TelerikDiagram>
````

### Layered Layout Subtypes

The Layered Diagram layout has the following sub types. Each subtype name signifies the direction in which descendant nodes are positioned with regard to their ancestor.

* `Down`&mdash;the root shape is at the top and all descendants are arranged below it
* `Left`&mdash;the root shape is on the right
* `Right`&mdash;the root shape is on the left
* `Up`&mdash;the root shape is at the bottom

>caption Setting a Layered Diagram Layout Subtype

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Layered"
                   Subtype="@DiagramLayoutSubtype.Right" />
</TelerikDiagram>
````

## Force Layout

The [Force-directed Diagram layout](https://en.wikipedia.org/wiki/Force-directed_graph_drawing) (also known as the spring-embedder algorithm) is based on a physical simulation of forces acting on the Diagram nodes (shapes), whereby the connections define whether two nodes act upon each other. Each link is like a spring embedded in the Diagram. The simulation attempts to find a minimum energy state, so that the springs are in their base state and do not pull or push any linked node.

The force-directed Diagram layout is non-deterministic. Each layout pass is unique, unpredictable, and not reproducible.

The layout provides two settings that affect the final appearance:

* `NodeDistance` defines the optimal distance between the shapes for minimum energy state. The default value is `50`.
* `Iterations` sets the number of position calculations. A larger number produces better results, but is more resource-intensive. The default value is `300`.

The force-directed layout type has no subtypes.

>caption Using the Force Diagram Layout

````RAZOR.skip-repl
<TelerikDiagram>
    <DiagramLayout Type="@DiagramLayoutType.Force"
                   Iterations="300"
                   NodeDistance="50" />
</TelerikDiagram>
````

## Example

The following example demonstrates all Diagram layout types and sub types.

>caption Using Diagram layouts

````RAZOR
<div class="settings-row">
    <span>Layout Type:</span>
    <TelerikButtonGroup>
        @foreach (DiagramLayoutType layoutType in AllDiagramLayoutTypes)
        {
            <ButtonGroupToggleButton SelectedChanged="@((bool selected) => DiagramLayoutTypeChanged(selected, layoutType))"
                                     Selected="@(DiagramLayoutType == layoutType)"
                                     @key="@layoutType">
                @layoutType
            </ButtonGroupToggleButton>
        }
    </TelerikButtonGroup>
</div>

@if (DiagramLayoutType != DiagramLayoutType.Force)
{
    <div class="settings-row">
        <span>Sub Type:</span>
        <TelerikButtonGroup>
            @foreach (KeyValuePair<DiagramLayoutSubtype, bool> kvPair in AllDiagramLayoutSubtypes)
            {
                <ButtonGroupToggleButton SelectedChanged="@((bool selected) => DiagramLayoutSubtypeChanged(selected, kvPair.Key))"
                                         Selected="@(DiagramLayoutSubtype == kvPair.Key)"
                                         Enabled="@(!kvPair.Value || DiagramLayoutType == DiagramLayoutType.Tree)"
                                         @key="@kvPair">
                    @kvPair.Key
                </ButtonGroupToggleButton>
            }
        </TelerikButtonGroup>
    </div>
}

<TelerikDiagram Zoom="0.5">
    <DiagramLayout Type="@DiagramLayoutType" Subtype="@DiagramLayoutSubtype" />

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Root" />
            <DiagramShapeFill Color="#000" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="1" />
            <DiagramShapeFill Color="#707070" />
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="2" />
            <DiagramShapeFill Color="#707070" />
        </DiagramShape>
        <DiagramShape Id="shape4">
            <DiagramShapeContent Text="3" />
            <DiagramShapeFill Color="#707070" />
        </DiagramShape>
        <DiagramShape Id="shape5">
            <DiagramShapeContent Text="1-1" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape6">
            <DiagramShapeContent Text="2-1" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape7">
            <DiagramShapeContent Text="2-2" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape8">
            <DiagramShapeContent Text="3-1" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape9">
            <DiagramShapeContent Text="3-2" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape10">
            <DiagramShapeContent Text="3-3" Color="#000" />
            <DiagramShapeFill Color="#d0d0d0" />
        </DiagramShape>
        <DiagramShape Id="shape11">
            <DiagramShapeContent Text="1-1-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape12">
            <DiagramShapeContent Text="1-1-2" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape13">
            <DiagramShapeContent Text="1-1-3" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape14">
            <DiagramShapeContent Text="2-1-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape15">
            <DiagramShapeContent Text="2-1-2" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape16">
            <DiagramShapeContent Text="2-2-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape17">
            <DiagramShapeContent Text="2-2-2" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape18">
            <DiagramShapeContent Text="3-1-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape19">
            <DiagramShapeContent Text="3-2-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
        <DiagramShape Id="shape20">
            <DiagramShapeContent Text="3-3-1" Color="#000" />
            <DiagramShapeFill Color="#fff" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape1" ToId="shape4" />
        <DiagramConnection FromId="shape2" ToId="shape5" />
        <DiagramConnection FromId="shape3" ToId="shape6" />
        <DiagramConnection FromId="shape3" ToId="shape7" />
        <DiagramConnection FromId="shape4" ToId="shape8" />
        <DiagramConnection FromId="shape4" ToId="shape9" />
        <DiagramConnection FromId="shape4" ToId="shape10" />
        <DiagramConnection FromId="shape5" ToId="shape11" />
        <DiagramConnection FromId="shape5" ToId="shape12" />
        <DiagramConnection FromId="shape5" ToId="shape13" />
        <DiagramConnection FromId="shape6" ToId="shape14" />
        <DiagramConnection FromId="shape6" ToId="shape15" />
        <DiagramConnection FromId="shape7" ToId="shape16" />
        <DiagramConnection FromId="shape7" ToId="shape17" />
        <DiagramConnection FromId="shape8" ToId="shape18" />
        <DiagramConnection FromId="shape9" ToId="shape19" />
        <DiagramConnection FromId="shape10" ToId="shape20" />
    </DiagramConnections>
</TelerikDiagram>

<style>
    .settings-row {
        padding: 0 1em 1em;
        display: flex;
        gap: 1em;
    }

    .settings-row > span:first-child {
        flex: 0 0 6em;
    }
</style>

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

    private readonly List<DiagramLayoutType> AllDiagramLayoutTypes = new()
    {
        DiagramLayoutType.Force,
        DiagramLayoutType.Layered,
        DiagramLayoutType.Tree
    };

    private readonly Dictionary<DiagramLayoutSubtype, bool> AllDiagramLayoutSubtypes = new()
    {
        // The boolean flags denote a Tree-specific layout subtype
        { DiagramLayoutSubtype.Down, false },
        { DiagramLayoutSubtype.Left, false },
        { DiagramLayoutSubtype.MindMapHorizontal, true },
        { DiagramLayoutSubtype.MindMapVertical, true },
        { DiagramLayoutSubtype.Radial, true },
        { DiagramLayoutSubtype.Right, false },
        { DiagramLayoutSubtype.TipOver, true },
        { DiagramLayoutSubtype.Up, false }
    };
}
````

## Layout Grid Settings

A single Diagram instance may display multiple subgraphs, which are disconnected groups of linked shapes. Such [separate subgraphs are called components](slug:diagram-overview#diagram-elements).

The `<DiagramLayoutGrid>` tag exposes settings that allow you to define:

* The horizontal and vertical distance (spacing) between the components inside the Diagram.
* The horizontal and vertical distance (offset) between the components and the Diagram boundaries.
* The width of the layout grid. If the width is large enough, the Diagram displays multiple components (groups) in a single row. Otherwise the components fall one below another.

The following example starts with the default values of the `DiagramLayoutGrid` parameters, except the `Width` which has a default value of `1500`. Use the Up and Down arrow keys to change the NumericTextBox values more easily and observe the result.

>caption Using Diagram Layout Grid settings

````RAZOR
<TelerikDiagram Zoom="0.5" Height="360px">
    <DiagramLayout Type="@DiagramLayoutType.Tree">
        <DiagramLayoutGrid ComponentSpacingX="@XSpacing"
                           ComponentSpacingY="@YSpacing"
                           OffsetX="@XOffset"
                           OffsetY="@YOffset"
                           Width="@LayoutWidth" />
    </DiagramLayout>

    <DiagramShapes>
        <DiagramShape Id="shape1-1">
            <DiagramShapeContent Text="Shape 1-1" />
        </DiagramShape>
        <DiagramShape Id="shape1-2">
            <DiagramShapeContent Text="Shape 1-2" />
        </DiagramShape>
        <DiagramShape Id="shape1-3">
            <DiagramShapeContent Text="Shape 1-3" />
        </DiagramShape>
        <DiagramShape Id="shape2-1">
            <DiagramShapeContent Text="Shape 2-1" />
        </DiagramShape>
        <DiagramShape Id="shape2-2">
            <DiagramShapeContent Text="Shape 2-2" />
        </DiagramShape>
        <DiagramShape Id="shape2-3">
            <DiagramShapeContent Text="Shape 2-3" />
        </DiagramShape>
        <DiagramShape Id="shape3-1">
            <DiagramShapeContent Text="Shape 3-1" />
        </DiagramShape>
        <DiagramShape Id="shape3-2">
            <DiagramShapeContent Text="Shape 3-2" />
        </DiagramShape>
        <DiagramShape Id="shape3-3">
            <DiagramShapeContent Text="Shape 3-3" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1-1" ToId="shape1-2" />
        <DiagramConnection FromId="shape1-1" ToId="shape1-3" />
        <DiagramConnection FromId="shape2-1" ToId="shape2-2" />
        <DiagramConnection FromId="shape2-1" ToId="shape2-3" />
        <DiagramConnection FromId="shape3-1" ToId="shape3-2" />
        <DiagramConnection FromId="shape3-1" ToId="shape3-3" />
    </DiagramConnections>
</TelerikDiagram>

ComponentSpacingX:
<TelerikNumericTextBox @bind-Value="@XSpacing" Width="80px" Step="30" />
ComponentSpacingY:
<TelerikNumericTextBox @bind-Value="@YSpacing" Width="80px" Step="30" />
OffsetX:
<TelerikNumericTextBox @bind-Value="@XOffset" Width="80px" Step="30" />
OffsetY:
<TelerikNumericTextBox @bind-Value="@YOffset" Width="80px" Step="30" />
Width:
<TelerikNumericTextBox @bind-Value="@LayoutWidth" Width="80px" Step="200" />

@code {
    private int XSpacing { get; set; } = 20;
    private int YSpacing { get; set; } = 20;
    private int XOffset { get; set; } = 50;
    private int YOffset { get; set; } = 50;
    private int LayoutWidth { get; set; } = 500;
}
````

## See Also

* [Live Demo: Diagram Layout and Shape Types](https://demos.telerik.com/blazor-ui/diagram/configuration)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
