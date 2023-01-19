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

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the Menu item to illustrate its purpose by using the `IconField` parameter. The Menu also supports custom icons.

If the icon property in the Menu model is called `Icon`, there is no need to set the `IconField` parameter.

>caption How to use icons in the Telerik Menu

````CSHTML
<TelerikMenu Data="@MenuData"
             IconField="@(nameof(MenuItem.Icon))">
</TelerikMenu>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
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
                Icon = FontIcon.Envelop
            },
            new MenuItem()
            {
                Text = "SVG Icon",
                Icon = SvgIcon.Wrench,
            },
            new MenuItem()
             {
                Text = "Custom Icon",
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

* [Menu Overview]({%slug components/menu/overview%})
