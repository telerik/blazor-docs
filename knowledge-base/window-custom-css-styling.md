---
title: Custom Window CSS Styling
description: How to apply custom CSS styles to the Telerik Blazor Window component.
type: how-to
page_title: How to Apply Custom Window CSS Styling
slug: window-kb-custom-css-styling
position: 
tags: telerik, blazor, window, styling
ticketid:
res_type: kb
components: ["window"]
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

How to set custom CSS styles to the Window?

## Solution

The Window `Class` parameter lets you define a CSS class that will be rendered on the popup element. You can cascade through it in order to change the appearance of both the content, and the built-in elements of the Window.

Use CSS selectors with higher specificity to customize the looks of the Window. See [how to override the Telerik Blazor theme](slug:themes-override) for more tips.

>caption Use a Class to change the appearance and style of the Window

````RAZOR
<TelerikWindow Class="party-window"
               Visible="true">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window content
    </WindowContent>
</TelerikWindow>

<style>
    /* style the entire popup element */
    div.k-window.party-window {
        border: 5px solid red;
    }

    /* titlebar */
    div.k-window.party-window .k-window-titlebar {
        background: gold;
    }

    /* title */
    div.k-window.party-window .k-window-title {
        color: blue;
    }

    /* content container */
    div.k-window.party-window .k-window-content {
        background: cyan;
    }

</style>
````
