---
title: Single Node
page_title: TreeView - Single Selection
description: Single node selection in the TreeView for Blazor.
slug: treeview-selection-single
tags: telerik,blazor,treeview,selection,single
published: True
position: 5
components: ["treeview"]
---

# Single Selection in TreeView

The TreeView lets the user select a single node at a time.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Selection of a single node using one-way data binding](#selection-of-a-single-node-using-one-way-data-binding)
	* [Selection of a single node using two-way data binding](#selection-of-a-single-node-using-two-way-data-binding)


## Basics

To use **single** node selection, set the `SelectionMode` parameter to `Telerik.Blazor.TreeViewSelectionMode.Single`.

To deselect the node hold the `Ctrl` key and click on it.

## Examples

This section contains the following examples:

* [One-way binding](#selection-of-a-single-node-using-one-way-data-binding)
* [Two-way binding](#selection-of-a-single-node-using-two-way-data-binding)


### Selection of a single node using one-way data binding

You can use one-way binding to provide an initial node selection, and respond to the `SelectedItemsChanged` to update the view-model when user selection occurs. If you don't update the model, selection is effectively canceled. If you want to load async data on demand based on the chosen node, use the [`OnItemClick`](slug:treeview-events#onitemclick) event.

<demo metaUrl="client/treeview/selection/single/example-1/" height="420"></demo>

### Selection of a single node using two-way data binding

You can use two-way binding to get the node the user has selected. This can be useful if the node model already contains all the information you need to show based on the selection.

<demo metaUrl="client/treeview/selection/single/example-2/" height="420"></demo>

## See Also

* [Selection Overview](slug:treeview-selection-overview)
* [Multiple Selection](slug:treeview-selection-multiple)
* [Apply Selection Styles Only on TreeView Item Text](slug:treeview-kb-node-selection-only-on-item-text)
