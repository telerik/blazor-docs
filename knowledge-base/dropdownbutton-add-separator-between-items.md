---
title: Adding a Separator Between Items in a DropDownButton for Blazor
description: Learn how to add a separator between the items in a DropDownButton by utilizing custom styling in a Blazor application.
type: how-to
page_title: How to Implement Item Separators in a Telerik Blazor DropDownButton
slug: dropdownbutton-kb-add-separator-between-items
tags: dropdownbutton, blazor, item separator, custom styling
res_type: kb
ticketid: 1680307
components: ["dropdownbutton"]
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

The DropDownButton uses a declarative approach for its items, so you can add any desired item. This component does not have a concept for a "separator" item (similar to the [ContextMenu](slug:contextmenu-data-binding-overview), for example) but you can use a custom approach to create a separator.

The content of the DropDownButtonItem is rendered inside a `<span class="k-menu-link-text">` element, which is narrower than the popup. Thus, a border inside the dropdown item content cannot span over the whole width of the popup. This article demonstrates how to add a separator by setting a CSS class on the whole item and using custom styling.

To create a visual separator between items in a DropDownButton, apply a custom class to the item that precedes the separator and style its bottom border. This approach allows you to simulate a separator without the need for a dedicated separator item. The custom class can be applied directly in the item declarations in your Blazor component.

>caption Add separator between DropDownButton items

````RAZOR
<style>
    .item-with-separator {
        border-bottom: 1px solid var(--kendo-color-border-alt);
    }
 </style>

<TelerikDropDownButton Icon="@SvgIcon.Share">
    <DropDownButtonContent>Share</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.Facebook">Facebook</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Twitter">Twitter</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Linkedin" Class="item-with-separator">Linkedin</DropDownButtonItem>
       <DropDownButtonItem>Other</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>
````

## See Also

- [DropDownButton Overview](slug:dropdownbutton-overview)
- [Customizing the Appearance of Telerik UI for Blazor Components](slug:themes-override)
