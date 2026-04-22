---
title: Prevent Drawer from collapsing on item click
description: How to prevent the Drawer from collapsing when item is clicked.
type: how-to
page_title: Prevent Drawer collapse
slug: drawer-kb-prevent-collapse
position:
tags:
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

I would like to prevent the Drawer from collapsing when an item from the navigation is clicked and switch between the collapsed and expanded state by the click of a button.


## Solution

1. Add a Button and update the value of the `Expanded` parameter in the Button's OnClick event handler. 
2. Handle the `ExpandedChanged` event of the Drawer, but don't update the `Expanded` parameter value in the handler. This prevents the Drawer from collapsing on item selection. 

>caption Stop the Drawer from collapsing on item click

````RAZOR
<TelerikDrawer Expanded="@DrawerExpanded"
               ExpandedChanged="@DrawerExpandedChanged"
               Data="Data" 
               Mode="@DrawerMode.Push"
               MiniMode="true">
    <DrawerContent>
        <TelerikButton OnClick="@ToggleDrawer" Icon="@SvgIcon.Menu" />
    </DrawerContent>
</TelerikDrawer>

@code {
    public DrawerItem SelectedItem { get; set; }
    public bool DrawerExpanded { get; set; } = true;

    public IEnumerable<DrawerItem> Data { get; set; } =
    new List<DrawerItem>
    {
        new DrawerItem { Text = "Inbox", Icon = SvgIcon.Inbox },
        new DrawerItem { Text = "Notifications", Icon = SvgIcon.Bell },
        new DrawerItem { Text = "Calendar", Icon = SvgIcon.Calendar },
        new DrawerItem { Text = "Attachments", Icon = SvgIcon.EnvelopeLink },
        new DrawerItem { Text = "Favourites", Icon = SvgIcon.StarOutline }
    };

    private void ToggleDrawer()
    {
        DrawerExpanded = !DrawerExpanded;
    }

    private void DrawerExpandedChanged(bool newExpanded)
    {
        // Do not modify the DrawerExpanded value here. 
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## See Also

* [Click in dropdown closes the Drawer](slug:drawer-kb-click-in-dropdown-closes-drawer)
