---
title: Add Expand/Collapse Handle to toggle the Drawer
description: How to add Expand/Collapse Handle to toggle the Drawer?
type: how-to
page_title: Add Expand/Collapse Handle to toggle the Drawer
slug: drawer-kb-add-expand-collapse-handle
position: 
tags: telerik, blazor, drawer, expand, collapse, handle
ticketid: 1527830
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Drawer for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How to add a handle feature within the rendered Drawer component that would expand and collapse the component?

## Solution

To achieve the desired result you can try the following:

* Add a Telerik Button
* Toggle the Drawer on click of that button
* Use some custom CSS to style the button as desired (appearance, position, transition etc.)

The example below demonstrates the described approach:

````CSHTML
@* Add Expand/Collapse handle to toggle the Drawer *@

<style>
    .my-toggle-button {
        border-radius: 50%;
        transform: translateY(50%);
        border: 1px solid rgba(0, 0, 0, 0.08);
        z-index: 1;
        background-color: #fff;
        transition-duration:0.3s;
    }
    
    .my-toggle-button.collapsed {
            top: 20px;
            left: 34px;
    }
    
    .my-toggle-button.expanded {
            top: 20px;
            left: 225px;
    }
</style>

<TelerikButton Class="@(ExpandedDrawer ? "my-toggle-button expanded" : "my-toggle-button collapsed")" Icon="@(ExpandedDrawer ? "chevron-left" : "chevron-right")" OnClick="@(() => DrawerRef.ToggleAsync())"></TelerikButton>
<TelerikDrawer Data="@Data"
               Class="my-drawer"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem"
               @bind-Expanded="@ExpandedDrawer">
    <Content>
        @* Place your contents here - it can be as simple as text, it can be conditional components or components that take the selected item as a parameter, or even the @Body tag for navigation if you place the drawer high enough in the project layout hierarchy *@
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>


@code {
    public bool ExpandedDrawer { get; set; }

    TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    DrawerItem SelectedItem { get; set; }
    
    IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = "plus"},
            new DrawerItem { Text = "FetchData", Icon = "grid-layout"}
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````
