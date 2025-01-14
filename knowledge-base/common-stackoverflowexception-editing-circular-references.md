---
title: StackOverflowException When Editing Items with Circular References in Grid for Blazor
description: This article describes how to avoid a StackOverflowException by modifying object properties to prevent circular references when editing items in the Grid, ListView or TreeList for Blazor.
type: troubleshooting
page_title: Editing Items with Circular References in Grid for Blazor Throws StackOverflowException
slug: common-kb-stackoverflowexception-editing-circular-references
tags: telerik, blazor, grid, gantt, listview, scheduler, treelist, stackoverflowexception, circular reference, editing
res_type: kb
ticketid: 1660663, 1592634
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br />Gantt for Blazor, <br/>ListView for Blazor, <br />Scheduler for Blazor<br />TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I get a `StackOverflowException` when attempting to edit an item in the Grid for Blazor. The issue occurs when I have circular references in the data items.

## Cause

The Telerik data-bound components that allow editing (for example Grid, ListView, TreeList, and more) create a copy of the original object when the user initiates editing.

The internal cloning algorithm uses reflection to loop through the object properties and copy them in the cloned object. When the model contains a self-referencing object property, the cloning logic loops again and again resulting in an infinite reflection loop and this causes the `StackOverflowException` exception.

## Solution

To resolve the `StackOverflowException`, modify the data model to eliminate circular references. Replace object properties that reference other objects within the same model with primitive properties that store unique identifiers. This change prevents the infinite loop during the cloning process.

For example, instead of having a class with a property that references another object:

```csharp
public class Employee
{
    public int Id { get; set; }
    public Employee Manager { get; set; }
}
```

Modify the class to [include a primitive property that holds a unique identifier](slug://grids-foreign-key):

```csharp
public class Employee
{
    public int Id { get; set; }
    public int ManagerId { get; set; }
}
```

## See Also

* [Grid Editing](slug://components/grid/editing/overview)
* [Gantt Editing](slug://gantt-tree-editing)
* [ListView Editing](slug://listview-editing)
* [Scheduler Editing](slug://scheduler-appointments-edit)
* [TreeList Editing](slug://treelist-editing-overview)
