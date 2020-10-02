---
title: Individual (conditional) cell back color
description: How to apply Individual (conditional) cell back color in the Telerik Blazor grid.
type: how-to
page_title: Individual (conditional) cell back color
slug: grid-conditional-cell-background
position: 
tags: 
ticketid: 1443681
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

I want to customize the formatting of the cells on a cell by cell basis. In some cases, setting the color for the entire row can also work.

## Solution

To customize the formatting of the cells you can use the [OnCellRender]({%slug grid-column-events%}oncellrender) event, exposed for the Grid Column.

To customize the formatting of the entire row, use the [OnRowRender]({%slug grid-events%}#onrowrender) event for the Grid.