---
title: Specify GridColumn position in a grid
description: How to specify the position of the column in a grid?
page_title: Specify GridColumn position in a grid
slug: grid-kb-columns-identification-positioning
position: 
tags: telerik,blazor,grid,columns,position,order
ticketid: 1518367
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
By default, when you add a new column in a grid, this column gets set as the last one on the right. This is the expected behavior. It comes from the way the framework initializes components and also from when such a column initializes and adds itself to the parent grid.

There is no way to specify a grid columns position without having a field/id in the state.

For this case, there is an open feature request linked in the (See Also) section below. There you can follow and give your vote because this way, the priority of the requested feature is increased, and we are tracking this interest.

## See Also
* https://feedback.telerik.com/blazor/1489571-add-field-property-in-grid-s-columnstate
