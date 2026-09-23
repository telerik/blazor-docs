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

<demo metaUrl="client/diagram/layouts/layouts-2/" height="620"></demo>

## Layout Grid Settings

A single Diagram instance may display multiple subgraphs, which are disconnected groups of linked shapes. Such [separate subgraphs are called components](slug:diagram-overview#diagram-elements).

The `<DiagramLayoutGrid>` tag exposes settings that allow you to define:

* The horizontal and vertical distance (spacing) between the components inside the Diagram.
* The horizontal and vertical distance (offset) between the components and the Diagram boundaries.
* The width of the layout grid. If the width is large enough, the Diagram displays multiple components (groups) in a single row. Otherwise the components fall one below another.

The following example starts with the default values of the `DiagramLayoutGrid` parameters, except the `Width` which has a default value of `1500`. Use the Up and Down arrow keys to change the NumericTextBox values more easily and observe the result.

>caption Using Diagram Layout Grid settings

<demo metaUrl="client/diagram/layouts/grid-settings-1/" height="670"></demo>

## See Also

* [Live Demo: Diagram Layout and Shape Types](https://demos.telerik.com/blazor-ui/diagram/configuration)
* [Diagram API Reference](slug:Telerik.Blazor.Components.TelerikDiagram)
