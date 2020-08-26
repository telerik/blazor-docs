---
title: Remove the Expand Arrow from the Menu Dropdown
description: Discover how to use CSS properties to hide the arrow icon from the menu dropdown
type: how-to
page_title: How to remove the expand arrow from a menu dropdown
slug: menu-kb-remove-the-expand-arrow-icon
position: 
tags: 
ticketid: 1482238
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Menu for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When there is more than one item under a menu item an arrow icon is displayed to indicate additional items are below it. Sometimes it may be desirable to remove the icon from the top-level menu item.

## Solution

Use the following CSS to set the display to none.

```` CSS
.k-menu-expand-arrow {
	display: none;
}
````
