---
title: How to Resolve StackOverflowException When Editing Items with Circular References in ListView for Blazor
description: This article describes how to avoid a StackOverflowException by modifying object properties to prevent circular references when editing items in the ListView, Grid or TreeList for Blazor.
type: troubleshooting
page_title: How to Edit Items with Circular References in ListView for Blazor Without Encountering StackOverflowException
slug: common-kb-stackoverflowexception-editing-circular-references
tags: telerik, blazor, listview, grid, treelist, gantt,  stackoverflowexception, circular reference, editing
res_type: kb
ticketid: 1660663, 1592634
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListView for Blazor, <br/> Grid for Blazor, <br /> TreeList for Blazor, <br />  Gantt for Blazor, <br /> Scheduler for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I get a `StackOverflowException` when attempting to edit an item in the [ListView for Blazor]({%slug listview-overview%}). The issue occurs when I have circular references in the data items.

## Cause

The data-bound components that allow editing (for example ListView, Grid, TreeList and more) create a copy of the original object when the user initiates editing.

Our internal object cloning algorithm uses reflection to loop through the object properties and copy them in the cloned object. When the model contains a self-reference object property, the cloning logic loops again and again resulting in an infinite reflection loop and this causes the  `StackOverflowException` exception.

## Solution

To resolve the `StackOverflowException`, modify the data model to eliminate circular references. Replace object properties that reference other objects within the same model with primitive properties that store unique identifiers. This change prevents the infinite loop during the cloning process.

For example, instead of having a class with a property that references another object:

```csharp
class ModelB
{
    public ModelA { get; set; }
    public int x { get; set; }
}
```

Modify the class to include a primitive property that holds a unique identifier:

```csharp
class ModelB
{
    public int ModelAID { get; set; }
    public int x { get; set; }
}
```

## See Also

* [ListView Editing]({%slug listview-editing%})
* [Grid Editing]({%slug components/grid/editing/overview%})
* [TreeList Editing]({%slug treelist-editing-overview%})
* [Gantt Editing]({%slug gantt-tree-editing%})
* [Scheduler Editing]({%slug scheduler-appointments-edit%})
