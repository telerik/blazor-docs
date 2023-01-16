---
title: Icons
page_title: Drawer - Icon
description: Icons and images in the Drawer for Blazor.
slug: drawer-icons
tags: telerik,blazor,drawer,icon,iconclass,image
published: True
position: 22
---

# Drawer Icons

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the Drawer item by assigning an `object` to the `IconField` parameter.

>caption How to use icons in Telerik Drawer

````CSHTML
@* This example shows how to add icons to the Drawer items *@

<TelerikDrawer Data="@Data"
               IconField="@nameof(DrawerItem.TelerikIcon)"
               MiniMode="true"
               @bind-Expanded="@DrawerExpanded"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@("menu")">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    bool DrawerExpanded { get; set; } = true;
    TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    DrawerItem SelectedItem { get; set; }
    IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>()
        {
                new DrawerItem { Text = "Current Location", TelerikIcon = FontIcon.Pin},
                new DrawerItem { Text = "Navigation", TelerikIcon = FontIcon.Globe},
                new DrawerItem { Text = "Favourite Locations", TelerikIcon = FontIcon.Star},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public FontIcon? TelerikIcon { get; set; }
    }
}
````

>caption The result from the code snippet above

![icons](images/drawer-icons.png)



## See Also

  * [Drawer Overview]({%slug drawer-overview%})
