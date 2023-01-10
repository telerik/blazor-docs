---
title: Icons
page_title: Context Menu - Icon
description: Icons and images in the Menu for Blazor.
slug: contextmenu-icons
tags: telerik,blazor,context menu,icon,iconclass,image
published: True
position: 15
---

# Context Menu Icons

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the ContextMenu item by assigning a `string` to the `IconField` parameter.

>caption How to use icons in Telerik Context Menu

````CSHTML
<div id="context-menu-target" style="background:yellow;">right click for context menu</div>

<TelerikContextMenu Data="@MenuData"
                    Selector="#context-menu-target"
                    IconField="@nameof(MenuModel.TelerikFontIcon)">
</TelerikContextMenu>

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
                Text = "Font Icon",
                TelerikFontIcon = FontIcon.Envelop
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

  * [Context Menu Overview]({%slug contextmenu-overview%})
