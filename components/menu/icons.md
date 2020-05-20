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

You can put an image, sprite or a font icon for each item in the menu to illustrate its purpose for your end users. To apply them, use the following properties:

* for a font icon, populate the `IconField` parameter of the component.
 * provide an `Icon` property in the data model.
* for an image, populate the `ImageUrlField` parameter of the component with the corresponding URL.
 * provide an `ImageUrl` property in the data model.
* for a icon class, populate the `IconClassField` parameter of the component with the desired image class.
 * provide an `IconClass` property in the data model.

You can see how to use the built-in icons in the [Font Icons]({%slug  general-information/font-icons%}) article.

For a custom font icon, define the font and glyph in your `Icon` CSS class.

The following example shows how to use an image from a URL, a class image, and the built-in font icons.

>caption How to use icons in Telerik Menu

````CSHTML
@* This example shows how to add icons to menu items provided from the data model *@

<TelerikMenu Data="@MenuData"></TelerikMenu>

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
                Icon = IconName.Email
            },
            new MenuModel()
            {
                Text = "IconClassField",
                IconClass = "oi oi-wrench",
            },
             new MenuModel()
             {
                Text = "ImageUrlField",
                ImageUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons/16/video.png"
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string ImageUrl { get; set; }
        public string IconClass { get; set; }
    }
}
````

>caption The result from the code snippet above

![icons](images/icons.jpg)


## See Also

  * [Menu Overview]({%slug components/menu/overview%})
