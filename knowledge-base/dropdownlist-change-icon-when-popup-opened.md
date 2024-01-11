---
title: Changing the DropDownList Icon When the Popup is Opened
description: Learn how to change the icon of the DropDownList when the popup is opened.
type: how-to
page_title: How to Change the Icon of the DropDownList When the Popup is Opened
slug: dropdownlist-kb-change-icon-when-popup-opened
tags: dropdownlist, icon
ticketid: 1636055
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor, ComboBox for Blazor, MultiColumnComboBox for Blazor, MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

I want to change the icon of the DropDownList when the popup is opened. 

Specifically, I want the icon to point up when the dropdown is expanded and to point down when the dropdown is collapsed. How to achieve this?

## Solution

To change the DropDownList icon when the popup is opened, follow these steps:

1. Handle the [`OnOpen`]({%slug components/dropdownlist/events%}#onopen) and [`OnClose`]({%slug components/dropdownlist/events%}#onclose) events of the DropDownList component.
2. Declare a flag to save the opened or closed state of the popup.
3. Toggle the flag value in the `OnOpen` and `OnClose` event handlers.
4. Use CSS to change the icon based on the flag value. Conditionally add a `<style>` tag to achieve this.
   - All components, including the DropDownList, use SVG icons. To change the icon, you can alter the `path` of the `<svg>` element.
   - To get the path of the [desired icon](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list), render a [`SvgIcon`]({%slug common-features-icons%}#svgicon-component) component, inspect it, and copy its path.

>caption Change the DropDownList icon when expanded

````CSHTML
@if (isPopupOpen)
{
    <style>
        .custom-dropdown-icon .k-input-button .k-svg-icon svg path {
            d: path("m256 160 128 192H128l128-192z");
        }
    </style>
}

Desired icon to include conditionally: <TelerikSvgIcon Icon="@SvgIcon.CaretAltDown"></TelerikSvgIcon>

<br />

<TelerikDropDownList Class="custom-dropdown-icon"
                     Data="@Items"
                     OnOpen="OnDropDownListPopupOpen"
                     OnClose="@OnDropDownListPopupClose"
                     ValueField="@nameof(ItemDescriptor.ItemId)"
                     TextField="@nameof(ItemDescriptor.ItemText)"
                     @bind-Value="@DropDownListValue"
                     Width="300px">
</TelerikDropDownList>

@code {
    private int DropDownListValue { get; set; }

    private bool isPopupOpen { get; set; }

    private void OnDropDownListPopupOpen(DropDownListOpenEventArgs args)
    {
        isPopupOpen = true;
    }

    private void OnDropDownListPopupClose(DropDownListCloseEventArgs args)
    {
        isPopupOpen = false;
    }

    private List<ItemDescriptor> Items { get; set; } = Enumerable.Range(1, 50).Select(x => new ItemDescriptor()
        {
            ItemId = x,
            ItemText = $"Item {x}"
        }).ToList();

    public class ItemDescriptor
    {
        public int ItemId { get; set; }
        public string ItemText { get; set; }
    }
}
````
