---
title: Multiple Nodes
page_title: TreeView - Check Multiple Nodes
description: Check Multiple Nodes in the TreeView for Blazor.
slug: treeview-checkboxes-multiple
tags: telerik,blazor,treeview,checkbox,checkboxes,nodes,multiple
published: True
position: 10
components: ["treeview"]
---

# Check Multiple Nodes in TreeView

The TreeView lets the user select multiple nodes with checkboxes based on the value of its `CheckBoxMode` parameter.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Multiple selection using one-way data binding](#multiple-selection-using-one-way-data-binding)
	* [Multiple selection using two-way data binding](#multiple-selection-using-two-way-data-binding)
	* [Handle multiple selection from different data models](#handle-multiple-selection-from-different-data-models)


## Basics

To let the user use **multiple** node selection, set the `CheckBoxMode` parameter to `Telerik.Blazor.TreeViewCheckBoxMode.Multiple`.


## Examples

This section contains the following examples:

* [One-way binding](#multiple-selection-using-one-way-data-binding)
* [Two-way binding](#multiple-selection-using-two-way-data-binding)
* [Different data models](#handle-multiple-selection-from-different-data-models)

### Multiple selection using one-way data binding

You can use one-way binding to provide an initial node selection, and respond to the [`CheckedItemsChanged`](slug:treeview-events#checkeditemschanged) event to update the view-model when user selection occurs. If you don't update the model, selection is effectively canceled.


<demo metaUrl="client/treeview/checkboxes/multiple/example-1/" height="520"></demo>

### Multiple selection using two-way data binding

You can use two-way binding to get the node the user has selected. This can be useful if the node model already contains all the information you need to show based on the selection. It also reduces the amount of code you need to write.

<demo metaUrl="client/treeview/checkboxes/multiple/example-2/" height="540"></demo>


### Handle multiple selection from different data models

You can bind the treeview to different models at each level, and the selection accommodates that. You need to make sure that you cast the node to the correct type.

<demo metaUrl="client/treeview/checkboxes/multiple/example-3/" height="420"></demo>

## See Also

* [Checkboxes Overview](slug:treeview-checkboxes-overview)
* [Single Node](slug:treeview-checkboxes-single)
