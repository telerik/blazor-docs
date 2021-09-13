---
title: Scroll to selected row
description: How to scroll a grid to the selected table row
type: how-to
page_title: Scroll to selected row
slug: grid-kb-scroll-to-selected-row
position: 
tags: 
ticketid: 1513767
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I would like to pre-select a row when the page is loaded, and I would like to show the grid with that row scrolled to the top, or sorted to appear on top.

## Solution
You can find a selected row in the grid markup by the `k-state-selected` CSS class it has, and use a bit of JavaScript to scroll to it - browsers provide the `scrollIntoView()` method for that.

With **row virtualization**, however, the selected row may not be rendered. That is why you need to find its position and scroll to it through the `Skip` parameter of the Grid.

You can find examples in the following sample project: https://github.com/telerik/blazor-ui/tree/master/grid/scroll-to-selected-row
