---
title: Align the window to the right side of the screen
description: How to align the window to the right side of the screen
type: how-to
page_title: Align the window to the right side of the screen
slug: window-kb-align-to-right
position: 
tags: 
ticketid: 1452606
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How do I align the window to the right side of the screen (similar to Left = '100px')?

A popup's position is usually controlled through the `Top` and `Left` parameters (CSS rules) because you don't know how far the page will go to the right and down. This is why an explicit `Right` or `Bottom` parameter does not exist in the Window component.


## Solution

Option 1:  Put an [AnimationContainer]({%slug components/animationcontainer/overview%}) in an element that's positioned as desired - the AnimationContainer renders at its place of declaration and can easily have 100% width of its parent.

Option 2: Override the built-in CSS rules of the window and to put it at the right border of the page through your own class:

````CSHTML
<style>
    .sticky-right{
        right: 0;
        transform:none;
    }
</style>

<TelerikWindow Class="sticky-right" Visible="true">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
</TelerikWindow>
````

