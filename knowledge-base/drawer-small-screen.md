---
title: Put the Drawer in MiniMode on small screens
description: How to put the Drawer in MiniMode on small screens.
type: how-to
page_title: Put the Drawer in MiniMode on small screens
slug: drawer-kb-minimode-smallscreens
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

I would like to put the Drawer in [MiniMode]({%slug drawer-mini-mode%}) on small screens. This behavior would be great for mobile devices. 


## Solution

1. The Blazor application has to be aware of the current browser width and you can use the [TelerikMediaQuery]({%slug mediaquery-overview%}) to achieve the desired behavior.
2. In the OnChange event handler you can put the Drawer in MiniMode.

>caption Put the Drawer in MiniMode on small screens

````CSHTML
@* This example assumes that a max-width of 767px would be a suitable match for a small screen size. You can adjust that value as needed in your application.
To see the behavior, you can resize the browsers window*@

<TelerikMediaQuery Media="(max-width: 767px)" 
                   OnChange="@OnChangeSmallScreenHandler">
</TelerikMediaQuery>

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="menu">Toggle drawer</TelerikButton>

<TelerikDrawer Data="@Data"
               MiniMode="@isSmallScreen"
               Mode="@DrawerMode.Push"
               @ref="@DrawerRef">
</TelerikDrawer>

@code {
    private bool isSmallScreen { get; set; }

    private void OnChangeSmallScreenHandler(bool doesMatch)
    {
        //Triggers MiniMode on Small screens
        isSmallScreen = doesMatch;

        //Alternatively, you can use the CollapseAsync() method
        //exposed on the TelerikDrawer @ref
    }


    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = "plus"},
            new DrawerItem { Text = "FetchData", Icon = "grid-layout"},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````

