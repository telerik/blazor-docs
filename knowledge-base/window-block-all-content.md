---
title: Block all content with a Window
description: how to block all content with a modal and/or maximized window
type: troubleshooting
page_title: Block all content with a Window
slug: window-kb-block-all-content
position: 
tags: 
ticketid: 1514819
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

Scroll the page down and show a window, then maximize it. It can have a different result and behavior with relation to the scrolling behavior and what you see depending on how the project layout is configured to scroll.

## Solution

You need to ensure that the scrollbars in the project appear where you want them to get the desired behavior. For example, if you want all the content blocked by a maximized window, you need to make sure the app content matches the viewport (like the window does) and that scrollbars appear in an element inside that layout, rather than on the `html` element.

You can find an example of the difference and some sample CSS rules for a basic layout in the following project: https://github.com/telerik/blazor-ui/tree/master/window/block-all-content
