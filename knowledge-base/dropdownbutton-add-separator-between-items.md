---
title: Adding a Separator Between Items in a DropDownButton for Blazor
description: Learn how to add a separator between the items in a DropDownButton by utilizing custom styling in a Blazor application.
type: how-to
page_title: How to Implement Item Separators in a Telerik Blazor DropDownButton
slug: dropdownbutton-kb-add-separator-between-items
tags: dropdownbutton, blazor, item separator, custom styling
res_type: kb
ticketid: 1680307
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownButton for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I want to visually separate the items in a [DropDownButton](slug:dropdownbutton-overview) to enhance the UI and improve user experience. How to add a separator (divider) between the items?

## Solution

The DropDownButton does not have a concept for a "separator" item (similar to the [ContextMenu](slug:contextmenu-data-binding-overview), for example). However, the DropDownButton uses a declarative approach for its items, so you can add any desired item.

The specific is that the content you declare in the DropDownButtonItem will be rendered inside the <span class="k-menu-link-text"> which is narrower and thus your custom separator will not cover the whole width of the popup. This article demonstrates how to achieve a similar effect by utilizing custom styling.

To create a visual separator between items in a DropDownButton, apply a custom class to the item that precedes the separator and style its bottom border. This approach allows you to simulate a separator without the need for a dedicated separator item. The custom class can be applied directly in the item declarations in your Blazor component.

>caption Add separator between DropDownButton items

````RAZOR
<style>
    .item-with-separator {
        border-bottom: 1px solid #e5e5e5;
    }
 </style>

<TelerikDropDownButton Icon="@SvgIcon.Share" OnClick="@(()=>OnItemClick("Primary"))">
    <DropDownButtonContent>Share</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.Facebook" OnClick="@(()=>OnItemClick("Facebook"))">Facebook</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Twitter" OnClick="@(()=>OnItemClick("Twitter"))">Twitter</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Linkedin" OnClick="@(()=>OnItemClick("Linkedin"))" Class="item-with-separator">Linkedin</DropDownButtonItem>
       <DropDownButtonItem OnClick="@(()=>OnItemClick("Reddit"))">Other</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>

@code {
    private void OnItemClick(string item)
    {
        Console.WriteLine($"User clicked {item} option.");
    }
}
````

## See Also

- [DropDownButton Overview](slug:dropdownbutton-overview)
- [Customizing the Appearance of Telerik UI for Blazor Components](slug:themes-override)
