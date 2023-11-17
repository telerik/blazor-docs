---
title: Icons
page_title: Menu - Icon
description: Icons and images in the Menu for Blazor.
slug: menu-icons
tags: telerik,blazor,menu,icon,iconclass,image
published: True
position: 15
---

# Menu Icons

You can add [Telerik Font or SVG icons]({%slug general-information/font-icons%}) to the Menu items. The component also supports custom icons.

To use Menu item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Menu. The model property can hold a `FontIcon` enum, an `ISvgIcon`, or a `string` that signifies a CSS class.

If the icon property name in the Menu model is `Icon`, there is no need to set the `IconField` parameter.

>caption How to use icons in the Telerik Menu

````CSHTML
<TelerikMenu Data="@MenuData"
             IconField="@(nameof(MenuItem.Icon))"
             Orientation="@MenuOrientation.Vertical">
</TelerikMenu>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    /* base styles for all custom icons */
    .my-icon {
        /* Define size, position and font styles here. */
        width: 1em;
        height: 1em;
        font-size: 16px;
    }

    /* styles for specific custom icons */
    .my-icon-purple {
        /* define a background image or a font icon glyph here */
        background: purple;
    }
</style>

@code {
    public List<MenuItem> MenuData { get; set; }

    protected override void OnInitialized()
    {
        MenuData = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Font Icon",
                Icon = SvgIcon.Envelope
            },
            new MenuItem()
            {
                Text = "SVG Icon",
                Icon = SvgIcon.Wrench,
            },
            new MenuItem()
            {
                Text = "Custom Icon",
                Icon = "my-icon my-icon-purple"
            },
            new MenuItem()
            {
                Text = "Empty Icon",
                Icon = "my-icon"
            }
        };
    }

    public class MenuItem
    {
        public string Text { get; set; }
        public object Icon { get; set; }
    }
}
````

## See Also

* [Online Demo: Menu Icons](https://demos.telerik.com/blazor-ui/menu/images)
* [Menu Overview]({%slug components/menu/overview%})
