---
title: ListView Selection
description: How to select items in the ListView and get Selected event
type: how-to
page_title: ListView Selection
slug: listview-kb-selection
position: 
tags: 
ticketid: 1491528
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ListView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I want to know if there is a Selected Event in the listview so When a user click on a item I can do something.

I want to highlight (same as the Grid Selection Mode) the selected item in ListView control and raise the SelectedItemChanged event. How to achieve this is ListView control.

## Solution
The ListView does not own the item rendering, this is entirely up to the application and the item templates. Thus, the listview cannot select the items because it cannot own their events, rendering and add an appropriate CSS class to denote selection.

The solution is to implement the selection in the templates and the model with your own code. The following sample project shows one way to do it: [https://github.com/telerik/blazor-ui/tree/master/listview/item-selection](https://github.com/telerik/blazor-ui/tree/master/listview/item-selection)
