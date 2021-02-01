---
title: ContextMenu without a data source
description: How to use ContextMenu without a data source.
type: how-to
page_title: ContextMenu without a data source
slug: contextmenu-kb-no-data-source
position: 
tags: 
ticketid: 1504777
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ContextMenu for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Can I use the ContextMenu without a data source?

That way we can use this control to provide a popup of items that we can control, and don't have to set it up with sometime of blank list of items that are never used.

## Solution

If you don't want to define a data source, you can provide an empty list of object to the Data parameter of the Context menu. This way, you will meet the component's requirement of providing data and in the same time you will be able to actually create the content for it yourself using a [Content Template](https://docs.telerik.com/blazor-ui/components/contextmenu/templates/content).

An important point to take into consideration here is that, at the time of writing, when you are using a template you cannot trigger a close of the ContextMenu, you can only close it if you click outside of it (there is an opened feature request for that in our [public feedback portal](https://feedback.telerik.com/blazor/1497622-add-hide-and-or-hideasync-method-to-contextmenu)). 

````CSHTML
<div class="menuTarget">
    right click this context menu target
</div>

<TelerikContextMenu Data="@MenuItems" Selector=".menuTarget">
    <Template>
        <div style="border: 1px solid red; background: pink; height: 200px; width: 100px">
            <button @onclick="@SomeAction">My button</button>
        </div>
    </Template>
</TelerikContextMenu>

@code {
    public List<object> MenuItems { get; set; } = new List<object>();

    void SomeAction()
    {
        Console.WriteLine("mybuttn was clicked in the context menu");
    }
}

<style>
    .menuTarget {
        width: 100px;
        background: yellow;
        margin: 50px;
    }
</style>
````

