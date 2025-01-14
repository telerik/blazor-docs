---
title: Customizing the Border of the Selected Tab in TabStrip
description: Learn how to modify the border appearance around the selected tab and its content in the TabStrip component for Blazor.
type: how-to
page_title: How to Change the Border of the Selected Tab in Blazor TabStrip
slug: tabstrip-customize-selected-tab-border-blazor
tags: tabstrip, border, customization, blazor, tab
res_type: kb
ticketid: 1652526, 1563024, 1574295, 1620296, 1647194
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>TabStrip for Blazor</td>
	    </tr>
    </tbody>
</table>

## Description

When using the [TabStrip](https://docs.telerik.com/blazor-ui/components/tabstrip/overview) for Blazor, the default appearance includes a grey outline around the selected tab. How can I modify this outline to encompass both the tab title and the content of the selected tab, rather than just the tab title.

This KB article answers the following questions:
* How can I change the border around the selected tab in a TabStrip?
* Is it possible to include the tab content in the border of the selected tab in TabStrip?
* How do I customize the focus border of a TabStrip tab to include content?
* How do I remove the TabStrip focus border?

## Solution

To customize the border of the selected tab in the TabStrip or remove it, use the `box-shadow` CSS property. This approach allows you to specify the borders around the tab and its content area. 

````RAZOR
@if (HideFocusBorder)
{
    <style>
        .tabstrip-shadow .k-tabstrip-item.k-item:focus {
            box-shadow: none;
        }
    </style>
}
else
{
    <style>
        .tabstrip-shadow .k-tabstrip-item.k-item.k-active,
        .tabstrip-shadow .k-tabstrip-item.k-item:focus {
            box-shadow: 0 -2px 0 0 rgba(0, 0, 0, 0.12), /* Top border */
            -2px 0 0 0 rgba(0, 0, 0, 0.12), /* Left border */
            2px 0 0 0 rgba(0, 0, 0, 0.12); /* Right border */
        }

        .tabstrip-shadow .k-content.k-active {
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.12);
        }
    </style>
}

<TelerikButton OnClick="@(() => HideFocusBorder = !HideFocusBorder)">Hide/Show Focus Border</TelerikButton>
<br />
<br />
<TelerikTabStrip Class="tabstrip-shadow">
    <TabStripTab Title="First">
        <HeaderTemplate>
            <strong>User Details</strong>
        </HeaderTemplate>
        <Content>
            Details content.
        </Content>
    </TabStripTab>
    <TabStripTab Title="Second">
        <HeaderTemplate>
            <strong>User Roles</strong>
        </HeaderTemplate>
        <Content>
            Roles content.
        </Content>
    </TabStripTab>
    <TabStripTab Title="Third">
        <HeaderTemplate>
            <strong>User Attributes</strong>
        </HeaderTemplate>
        <Content>
            Attributes content.
        </Content>
    </TabStripTab>
</TelerikTabStrip>

@code {
    private bool HideFocusBorder { get; set; }
}
````

## See Also

* [Remove Dotted Tab Outline](slug://tabstrip-kb-remove-dotted-outline)
* [Override the Theme or Apply Custom CSS Styles](slug://themes-override)
* [Telerik TabStrip Tabs Configuration](https://docs.telerik.com/blazor-ui/components/tabstrip/tabs-configuration)
