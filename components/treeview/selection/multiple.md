---
title: Multiple Nodes
page_title: TreeView - Multiple Selection
description: Multiple nodes selection in the TreeView for Blazor.
slug: treeview-selection-multiple
tags: telerik,blazor,treeview,selection,multiple
published: True
position: 10
components: ["treeview"]
---

# Multiple Selection in TreeView

The TreeView lets the user select multiple nodes.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Multiple selection using one-way data binding](#multiple-selection-using-one-way-data-binding)
	* [Multiple selection using two-way data binding](#multiple-selection-using-two-way-data-binding)
	* [Handle multiple selection from different data models](#handle-multiple-selection-from-different-data-models)


## Basics

To use **multiple** node selection, set the `SelectionMode` parameter to `Telerik.Blazor.TreeViewSelectionMode.Multiple`.

To select a range of nodes hold the `Shift` key and click on two nodes. All the items in-between will be selected. If there is a focused node, range selection starts from that node.

To select multiple nodes that are not next to each other hold the `Ctrl` key and click on the desired items.

To deselect a node hold the `Ctrl` key and click on it.

## Examples

This section contains the following examples:

* [One-way binding](#multiple-selection-using-one-way-data-binding)
* [Two-way binding](#multiple-selection-using-two-way-data-binding)
* [Different data models](#handle-multiple-selection-from-different-data-models)

### Multiple selection using one-way data binding

You can use one-way binding to provide an initial node selection, and respond to the `SelectedItemsChanged` to update the view-model when user selection occurs. If you don't update the model, selection is effectively canceled. If you want to load async data on demand based on the chosen node, use the [`OnItemClick`](slug:treeview-events#onitemclick) event.


<demo metaUrl="client/treeview/selection/multiple/example-1/" height="450"></demo>

### Multiple selection using two-way data binding

You can use two-way binding to get the node the user has selected. This can be useful if the node model already contains all the information you need to show based on the selection.

<demo metaUrl="client/treeview/selection/multiple/example-2/" height="450"></demo>

### Handle multiple selection from different data models

You can bind the treeview to different models at each level, and the selection accommodates that. You need to make sure that you cast the node to the correct type.

<demo metaUrl="client/treeview/selection/multiple/example-3/" height="450"></demo>

## See Also

* [Selection Overview](slug:treeview-selection-overview)
* [Single Selection](slug:treeview-selection-single)
* [Apply Selection Styles Only on TreeView Item Text](slug:treeview-kb-node-selection-only-on-item-text)
