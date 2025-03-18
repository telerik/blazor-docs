---
title: Put the Drawer in MiniMode on small screens
description: How to put the Drawer in MiniMode on small screens.
type: how-to
page_title: Put the Drawer in MiniMode on small screens
slug: drawer-kb-minimode-smallscreens
position:
tags:
ticketid: 1558952
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

I would like to put the Drawer in [MiniMode](slug:drawer-mini-mode) on small screens. This behavior would be great for mobile devices. 


## Solution

1. The Blazor application has to be aware of the current browser width. One way to achieve this is to use the [TelerikMediaQuery component](slug:mediaquery-overview).
2. Use the MediaQuery [`OnChange` event](slug:mediaquery-events) to put the Drawer in MiniMode.

>caption Put the Drawer in MiniMode on small screens

````RAZOR
@* This example assumes that a max-width of 767px as a suitable match for a small screen size. You can adjust that value as needed in your application.
To see the behavior, resize the browser window *@

<TelerikMediaQuery Media="(max-width: 767px)" 
                   OnChange="@OnChangeSmallScreenHandler">
</TelerikMediaQuery>

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>

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

        //await DrawerRef.CollapseAsync();
    }


    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus},
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

