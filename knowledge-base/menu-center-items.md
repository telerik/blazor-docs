---
title: Center Root Items in Horizontal Menu
description: How to center the root items in a horizontal Blazor menu bar.
type: how-to
page_title: Center Root Items in Horizontal Menu
slug: menu-center-items
position: 
tags: menu, center, items
ticketid: 1543208
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

How to center the items in a horizontal menu bar? By default they align to the left.

## Solution

The Menu uses [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), so the easiest way to center the root items is with the [`justify-content`](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#justify-content) CSS style.

>caption Center the root items in a horizontal menu

````CSHTML
@* Center the root items in a horizontal menu *@

<TelerikMenu Class="centered-menu" Data="@MenuItems" />

<style>
    .centered-menu {
        justify-content: center;
    }
</style>

@code {

    List<MenuItem> MenuItems = new List<MenuItem> {
        new MenuItem() { Text = "Item 1" },
        new MenuItem() { Text = "Item 2" },
        new MenuItem() { Text = "Item 3" }
    };

    public class MenuItem
    {
        public string Text { get; set; }
    }
}
````
