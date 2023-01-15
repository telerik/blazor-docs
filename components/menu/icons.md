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

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the Menu item to illustrate its purpose by using the `IconField` parameter.

>caption How to use icons in Telerik Menu

````CSHTML
<TelerikMenu Data="@MenuData"
             IconField="@nameof(MenuModel.TelerikFontIcon)">
</TelerikMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    protected override void OnInitialized()
    {
        GenerateMenuData();
    }

    public void GenerateMenuData()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "Mail Icon",
                TelerikFontIcon = FontIcon.Envelop
            },
            new MenuModel()
            {
                Text = "Wrench Icon",
                TelerikFontIcon = FontIcon.Wrench,
            },
            new MenuModel()
             {
                Text = "Video Icon",
                TelerikFontIcon = FontIcon.FileVideo
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public FontIcon? TelerikFontIcon { get; set; }
    }
}
````

## See Also

  * [Menu Overview]({%slug components/menu/overview%})
