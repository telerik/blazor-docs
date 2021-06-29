---
title: How to Rename a TreeView Node
description: How to edit the name (text) of a treeview node
type: how-to
page_title: How to rename a TreeView node?
slug: treeview-kb-rename-node
position: 
tags: edit, rename, tree, treeview, note, item
ticketid: 1525532
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TreeView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Is there any way I can edit the node text within a Blazor TreeView? 

I want to let the user rename a node.

## Solution
You can use the `ItemTemplate` to define how the node text will render and the desired UI and UX for editing. Here is a sample project that demonstrates a possible implementation. It uses a custom component `EditableTreeNode` that renders buttons and a textbox to update the TreeView item.

https://github.com/telerik/blazor-ui/tree/master/treeview/rename-node
