---
title: Templates
page_title: Menu - Templates
description: Templates in the Menu for Blazor.
slug: contextmenu-item-template
tags: telerik,blazor,menu,templates
published: True
position: 10
---

# Menu Templates

The Menu component allows you to define a custom template for its items. This article explains how you can use it.

The `ItemTemplate` of an item is defined under the `ItemTemplate` tag of the menu.

The template receives the model to which the item is bound as its `context`. You can use it to render the desired content. The menu is a generic component, so you can use a named context variable that will be of the model type without additional casting.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, doubleclick, mouseover if you need to respond to them.

>caption Use templates to implement navigation between views without the UrlField feature

````CSHTML
Use your own NavLink elements for navigation instead of the built-in feature of the menu

<TelerikMenu Data="@MenuItems"
             ItemsField="@nameof(MenuItem.SubSectionList)">
    <ItemTemplate Context="item">
        @{
            var shouldNavigate = !string.IsNullOrEmpty(item.Page);
            if (shouldNavigate)
            {
                <NavLink href="@item.Page">@item.Section</NavLink>
            }
            else
            {
                <span style="font-weight: bold;">See more about our @item.Section.ToLowerInvariant()</span>
            }
        }
    </ItemTemplate>
</TelerikMenu>

@code {
    public List<MenuItem> MenuItems { get; set; }

    public class MenuItem
    {
        public string Section { get; set; }
        public string Page { get; set; }
        public List<MenuItem> SubSectionList { get; set; }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
    {
            new MenuItem()
            {
                Section = "Company",
                SubSectionList = new List<MenuItem>()
            {
                    new MenuItem()
                    {
                        Section = "Overview",
                        Page = "company/overview"
                    },
                    new MenuItem()
                    {
                        Section = "Events",
                        Page = "company/events"
                    },
                    new MenuItem()
                    {
                        Section = "Careers",
                        Page = "company/careers"
                    }
                }
            },
            new MenuItem()
            {
                Section = "Services",
                SubSectionList = new List<MenuItem>()
            {
                    new MenuItem()
                    {
                        Section = "Consulting",
                        Page = "consultingservices"
                    },
                    new MenuItem()
                    {
                        Section = "Education",
                        Page = "education"
                    }
                }
            }
        };

        base.OnInitialized();
    }
}
````

>caption Use templates to visually distinguish the current page as an item that is styled differently, and to open external links in new tabs

````CSHTML
@inject NavigationManager navigationManager

<TelerikMenu Data="@MenuItems" OnClick="@((MenuItem item) => OnClick(item))">
    <ItemTemplate Context="item">
        @{
            if (EqualityComparer<MenuItem>.Default.Equals(item, SelectedMenuItem))
            {
                <span style="color: black; font-weight: bold">@item.Text</span>
            }
            else
            {
                string target = "";
                if (!IsInternalPage(item.Url))
                {
                    target = "_blank";
                }
                <NavLink target="@target" href="@item.Url" class="k-link k-menu-link">@item.Text</NavLink>
            }
        }
    </ItemTemplate>
</TelerikMenu>

@code {
    public List<MenuItem> MenuItems { get; set; }

    public MenuItem SelectedMenuItem { get; set; }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Home",
                Url = "/",
            },
            new MenuItem()
            {
                Text = "Fetch Data",
                Url = "/fetchdata"
            },
            new MenuItem()
            {
                Text = "Counter",
                Url = "/counter"
            },
            new MenuItem()
            {
                Text = "Telerik UI for Blazor",
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Documentation",
                        Url = "https://docs.telerik.com/blazor-ui/introduction"
                    },
                    new MenuItem()
                    {
                        Text = "Live Demos",
                        Url = "https://demos.telerik.com/blazor-ui"
                    }
                }
            }
        };

        SelectedMenuItem = MenuItems.Find(item => CompareCurrentPageUrl(item.Url));

        base.OnInitialized();
    }

    private void OnClick(MenuItem item)
    {
        if (IsInternalPage(item.Url))
        {
            SelectedMenuItem = item;
        }
    }

    private bool CompareCurrentPageUrl(string urlToCopmare)
    {
        return navigationManager.Uri.Substring(navigationManager.BaseUri.Length - 1).Equals(urlToCopmare);
    }

    private bool IsInternalPage(string url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return false;
        }
        return !(url.StartsWith("https://") || url.StartsWith("http://"));
    }
	
	public class MenuItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public List<MenuItem> Items { get; set; }
    }
}
````

>caption The result from the snippet above, asuming the current page URL is `/counter`

![](images/menu-template-distinguish-item.png)

## See Also

  * [Data Binding a Menu]({%slug components/menu/data-binding/overview%})
  * [Live Demo: Menu Temlate](https://demos.telerik.com/blazor-ui/menu/template)

