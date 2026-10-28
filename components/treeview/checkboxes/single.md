---
title: Single Node
page_title: TreeView - Check Single Node
description: Check a Single Node in the TreeView for Blazor.
slug: treeview-checkboxes-single
tags: telerik,blazor,treeview,checkbox,checkboxes,node,single
published: True
position: 5
components: ["treeview"]
---

# Check a Single Node in TreeView

The TreeView lets the user check a single node at a time based on the value of its `CheckBoxMode` parameter.

This article is separated in the following sections:

* [Basics](#basics)
* [Examples](#examples)
	* [Checking a single node using one-way data binding](#checking-a-single-node-using-one-way-data-binding)
	* [Checking a single node using two-way data binding](#checking-a-single-node-using-two-way-data-binding)


## Basics

To let the user check only a **single** node in the TreeView, set the `CheckBoxMode` parameter to `Telerik.Blazor.Components.TreeViewCheckBoxMode.Single`.


## Examples

This section contains the following examples:

* [One-way binding](#checking-a-single-node-using-one-way-data-binding)
* [Two-way binding](#checking-a-single-node-using-two-way-data-binding)


### Checking a single node using one-way data binding

You can use one-way binding to provide an initial checked node, and respond to the `CheckedItemsChanged` to update the view-model when user checks a node.

<demo metaUrl="client/treeview/checkboxes/single/example-1/" height="520"></demo>

### Checking a single node using two-way data binding

You can use two-way binding to get the node the user has checked. This can be useful if the node model already contains all the information you need to use. It also reduces the amount of code you need to write.

<demo metaUrl="client/treeview/checkboxes/single/example-2/" height="520"></demo>

## See Also

* [Selection Overview](slug:treeview-checkboxes-overview)
* [Multiple Selection](slug:treeview-checkboxes-multiple)
