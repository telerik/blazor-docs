---
title: It is not possible to drop item to empty treevew
description: How can I drag an item to an empty treeview
type: troubleshooting
page_title: Cannot drop item to empty treeview
slug: treeview-kb-drag-to-empty
position: 
tags: 
ticketid: 1525388
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
It seems it is not possible to drop item to empty treevew.

How can I drop items into a treeview that is empty?

## Steps to Reproduce
1. Go to the TreeView Drag and Drop demo: https://demos.telerik.com/blazor-ui/treeview/drag-drop
1. Remove all the nodes from the second treeview (the drop target), for example, by dragging them to the first treeview.
1. Try to drag a node to the now empty treeview.

## Cause\Possible Cause(s)
When there is no data in the treeview, you can't drop items into it because it does not render anything and so there is no drop target.

## Solution
Ensure you always have at least one dummy node with text like "(empty)" or "(drag here)" so there is a drop target. 

When [processing the data in the `OnDrop` event]({%slug treeview-drag-drop-overview%}), consider checking if this is the target (only) item and if so - removing it from the data source you will build, so that newly added data will have its proper structure and that placeholder item will now be gone.
