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

If the icon property name in the Drawer model is `Icon`, there is no need to set the `IconField` parameter.

>caption How to use icons in the Telerik Drawer

````CSHTML
<TelerikDrawer Data="@Data"
               IconField="@nameof(DrawerItem.Icon)"
               MiniMode="true"
               @bind-Expanded="@DrawerExpanded"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@FontIcon.Menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
        background: purple;
    }
</style>

@code {
    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    private bool DrawerExpanded { get; set; } = true;

    private DrawerItem SelectedItem { get; set; }

    private IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>()
    {
        new DrawerItem { Text = "Current Location", Icon = FontIcon.Pin },
        new DrawerItem { Text = "Navigation", Icon = FontIcon.Globe },
        new DrawerItem { Text = "Favorites", Icon = "my-icon" },
    };

    public class DrawerItem
    {
        public string Text { get; set; }
        public object Icon { get; set; }
    }
}
````

## See Also

* [Drawer Overview]({%slug drawer-overview%})
