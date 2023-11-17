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

You can add [Telerik Font or SVG icons]({%slug general-information/font-icons%}) to the Drawer items. The component also supports custom icons.

To use Drawer item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Drawer. The model property can hold a `FontIcon` enum, an `ISvgIcon`, or a `string` that signifies a CSS class.

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
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    /* base styles for all custom icons */
    .my-icon {
        /* Define size, position and font styles here. */
        width: 1em;
        height: auto;
        font-size: 16px;
    }

    /* styles for specific custom icons */
    .my-icon-purple {
        /* define a background image or a font icon glyph here */
        background: purple;
        flex-shrink: 0;
    }
</style>

@code {
    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    private bool DrawerExpanded { get; set; } = true;

    private DrawerItem SelectedItem { get; set; }

    private IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>()
    {
        new DrawerItem { Text = "Current Location", Icon = SvgIcon.Pin },
        new DrawerItem { Text = "Navigation", Icon = SvgIcon.Globe },
        new DrawerItem { Text = "Favorites", Icon = "my-icon my-icon-purple" },
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
