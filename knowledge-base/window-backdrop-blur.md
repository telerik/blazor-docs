---
title: Apply a backdrop filter with a blur effect to the Modal Window background
description: How to apply a backdrop filter with a blur effect to the background content of the Modal Window.
type: how-to
page_title: Apply a backdrop filter with a blur effect to the Modal Window background
slug: window-kb-backdrop-blur
position: 
tags: 
ticketid: 1642061
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

* How do I blur the background in Windows?
* Is it possible to apply a backdrop filter with a blur effect on the background content of the Window?

## Solution

Override the built-in CSS styles of the background with the code below to adjust the blur amount. 

>caption This code will affect all modal Dialogs and Windows on the web page.

````CSHTML
<style>
    div.k-overlay {
        /* prerequisites to make the blurring work with this CSS class */
        opacity: 1;
        background-color: transparent;
        /* blurring itself */
        -webkit-backdrop-filter: blur(4px); /* Safari */
        backdrop-filter: blur(4px);
    }
</style>

<TelerikWindow @bind-Visible="@WindowIsVisible"
               Modal="true">
    <WindowTitle>
        Product Details
    </WindowTitle>
    <WindowContent>
        <div class="p-4">
            <h2>Product Name: Widget X</h2>
            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac odio velit. Integer vel turpis vestibulum, tincidunt lacus at, rutrum sapien.</p>
            <p>Price: $49.99</p>
            <p>Availability: In Stock</p>
        </div>
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Show Product Details</TelerikButton>

@code {
    private bool WindowIsVisible { get; set; }
}
````