---
title: Icons
page_title: Menu for Blazor | Icon
description: Icons and images in the Menu for Blazor
slug: menu-icons
tags: telerik,blazor,menu,icon,iconclass,image
published: True
position: 2
---

# Menu Icons

You can put an image, icon class or a font icon for each item in the menu to illustrate its purpose for your end users. To apply them, use the following properties:

* for a font icon, populate the `IconField` parameter of the component or provide an `Icon` property in the data model.
* for an image, populate the `ImageUrlField` parameter of the component or provide an `ImageUrl` property in the data model. This is rendered as `<img src="" />` tag.
* for a icon class, populate the `IconClassField` parameter of the component or provide an `IconClass` property in the data model.

You can see how to use the built-in icons in the [Font Icons]({%slug  general-information/font-icons%}) article.

For a custom font icon, define the font and glyph in your `Icon` CSS class.

>caption How to use icons in Telerik Menu

````CSHTML
@* This example shows how to add icons or images to menu items using the component's parameters *@

<TelerikMenu Data="@MenuData"
             IconField="@nameof(MenuModel.CustomIcon)"
             ImageUrlField="@nameof(MenuModel.Image)"
             IconClassField="@nameof(MenuModel.CustomIconClass)">
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
                Text = "IconField",
                CustomIcon = IconName.Email
            },
            new MenuModel()
            {
                Text = "IconClassField",
                CustomIconClass = "oi oi-wrench",
            },
            new MenuModel()
             {
                Text = "ImageUrlField",
                Image = "https://demos.telerik.com/kendo-ui/content/shared/icons/16/video.png"
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string CustomIcon { get; set; }
        public string Image { get; set; }
        public string CustomIconClass { get; set; }
    }
}
````

>caption The result from the code snippet above

![icons](images/icons.jpg)

>note The `IconField` and `IconClassField` are rendered as `<span class="" />`, whereas the `ImageUrlField` is rendered as `<img src="" />`

## See Also

  * [Menu Overview]({%slug components/menu/overview%})
