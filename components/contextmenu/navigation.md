---
title: Navigation
page_title: Menu - Navigation
description: Using the Blazor Menu for navigating between pages.
slug: contextmenu-navigation
tags: telerik,blazor,menu,navigation
published: True
position: 3
---

# Menu for Navigation

The Menu can be used to navigate between different pages in the applicaiton. It can generate the needed links for you through its `UrlField` when [data binding]({%slug components/menu/data-binding/overview%}).

To use the Menu for navigating between pages:

* Add the Menu to your application.
    * You may want to add it in the `MainLayout.razor` outside of the `@Body`, for example, in the header section of your app.
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the Menu to navigate between pages

````CSHTML
@* This a basic example of a Menu used as Navigation. *@

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

* [Menu Overview]({%slug components/menu/overview%})
* [Menu Data Binding]({%slug components/menu/data-binding/overview%})
* [Menu Templates]({%slug components/menu/templates%})
