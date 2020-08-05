---
title: Navigation
page_title: Context Menu - Navigation
description: Using the Blazor Context Menu for navigating between pages.
slug: contextmenu-navigation
tags: telerik,blazor,menu,navigation
published: True
position: 10
---

# Context Menu for Navigation

The Context Menu can be used to navigate between different pages in the application. It can generate the needed links for you through its `UrlField` when [data binding]({%slug contextmenu-data-binding-overview%}).

To use the Context Menu for navigating between pages:

* Add the ContextMenu to your application and [choose a target]({%slug contextmenu-overview%}) or [show it with your own code]({%slug contextmenu-overview%}#know-the-target-and-adjust-items).
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the Context Menu to navigate between pages

````CSHTML
@* This a basic example of a Context Menu used as Navigation. *@

<div id="navigation-trigger" style="height: 100px; background: yellow;">
    right click me for navigation options<br />I could be a hamburger icon or other trigger that suits your design
</div>

<TelerikContextMenu Data="@MenuData" Selector="#navigation-trigger">
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
                Text = "Contact us",
                Url = "/contacts",
                Icon = IconName.Email
            },
            new MenuModel()
            {
                Text = "Settings",
                Url = "/settings",
                Icon = IconName.Gear,
                Items = new List<MenuModel>()
            {
                    new MenuModel()
                    {
                        Text = "Profile Settings",
                        Url = "/profile",
                        Icon = IconName.User
                    },
                    new MenuModel()
                    {
                        Text = "Language Settings",
                        Url = "/language",
                        Icon = IconName.Table
                    }
                }
            }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public List<MenuModel> Items { get; set; }
    }
}
````

## See Also

* [Context Menu Overview]({%slug contextmenu-overview%})
* [Context Menu Data Binding]({%slug contextmenu-data-binding-overview%})
* [Context Menu Templates]({%slug contextmenu-templates-overview%})
