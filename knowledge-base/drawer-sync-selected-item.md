---
title: How to select drawer item if menu page is opened by using its URL
description: How to select the correct drawer item when you don't navigate with the drawer
type: troubleshooting
page_title: Sync Drawer item selection with external navigation
slug: drawer-kb-sync-selected-item
position: 
tags: 
ticketid: 1530772
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Drawer for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I'm using the Drawer component for navigation purposes.

A click on a Drawer item calls the sub page as intended.

However if I call a sub page directly by URL, the corresponding Drawer item doesn't get selected.

It might be confusing for a user if he call a sub page directly and no drawer item get selected.

Is there a way to "fix" this issue?

## Cause\Possible Cause(s)
The Drawer selects (highlights) the item based on interaction with its own markup (such as a click on the item the user wants to navigate to). If you navigate by other means in the application, the component cannot capture this action and it does not update the selected item.

## Solution
In such cases you must update the selected item with the application logic when necessary. For example, you can hook to the [NavigationManager's LocationChanged event](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/routing?view=aspnetcore-5.0#uri-and-navigation-state-helpers-1) and get the current page, find a corresponding item (you can also add any relevant business logic) and set it to the `SelectedItem` of the Drawer.

You can find a sample project here: https://github.com/telerik/blazor-ui/tree/master/drawer/select-on-load
