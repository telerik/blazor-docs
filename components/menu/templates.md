---
title: Templates
page_title: Menu - Templates
description: Templates in the Menu for Blazor.
slug: components/menu/templates
tags: telerik,blazor,menu,templates
published: True
position: 10
---

# Menu Templates

The Menu component allows you to define a custom template for its items. This article explains how to use it.

## ItemTemplate

The template of all items is defined in the `ItemTemplate` tag of the Menu.

The template receives the respective Menu data item as its `context`. You can use it to render the desired content. You can also set the `Context` parameter of the `ItemTemplate` tag and use a [named context variable. This is useful in nested template scenarios](slug://nest-renderfragment).

The Menu item template can contain arbitrary content according such as HTML markup and other components. You can also use standard event handlers like `@onclick` or `@onmouseover`.

## Examples

### Use ItemTemplate for Navigation

The following example shows how to render `<NavLink>` tags inside the Menu and use them for navigation instead of the [built-in Menu navigation mechanism](slug://menu-navigation). This approach requires the URL property name to be different from `Url`. [`<NavLink>` also supports the `target="_blank"` attribute](#use-itemtemplate-for-styling-and-target-_blank).

>caption Use Menu item template for navigation

````RAZOR
<h3>Menu with ItemTemplate</h3>

<TelerikMenu Data="@MenuItems">
    <ItemTemplate Context="item">
        @{
            @*
                k-menu-link-text will make the NavLink similar to built-in Menu items.
                You also need to reset the underline and text color.
                Do not render an SvgIcon component if item.Icon is null.
            *@

            var shouldNavigate = !string.IsNullOrEmpty(item.Href);

            if (shouldNavigate)
            {
                <TelerikSvgIcon Icon="@item.Icon" />
                <NavLink href="@item.Href" class="k-menu-link-text color-underline">@item.Text</NavLink>
            }
            else
            {
                <TelerikSvgIcon Icon="@item.Icon" />
                <span class="k-menu-link-text">@item.Text</span>
            }
        }
    </ItemTemplate>
</TelerikMenu>

<style>
    /* Reset NavLink styles for consistent look. */
    a.color-underline {
        color: inherit;
        text-decoration: none;
    }
</style>

<h3>Default Menu</h3>

<TelerikMenu Data="@MenuItems" />

@code {
    public List<MenuItem> MenuItems { get; set; } = new();

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Company",
                Icon = SvgIcon.Globe,
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Overview",
                        Href = "company/overview",
                        Icon = SvgIcon.InfoCircle
                    },
                    new MenuItem()
                    {
                        Text = "Events",
                        Href = "company/events",
                        Icon = SvgIcon.Calendar,
                        Items = new List<MenuItem>()
                        {
                            new MenuItem()
                            {
                                Text = "Boston",
                                Href = "company/events/boston",
                                Icon = SvgIcon.Calendar
                            },
                            new MenuItem()
                            {
                                Text = "Sofia",
                                Href = "company/events/sofia",
                                Icon = SvgIcon.Calendar
                            }
                        }
                    },
                    new MenuItem()
                    {
                        Text = "Careers",
                        Href = "company/careers",
                        Icon = SvgIcon.User
                    }
                }
            },
            new MenuItem()
            {
                Text = "Services",
                Icon = SvgIcon.Sparkles,
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Consulting",
                        Href = "consulting",
                        Icon = SvgIcon.Graph
                    },
                    new MenuItem()
                    {
                        Text = "Education",
                        Href = "education",
                        Icon = SvgIcon.Book
                    }
                }
            }
        };

        base.OnInitialized();
    }

    public class MenuItem
    {
        public string Text { get; set; } = string.Empty;
        public string Href { get; set; } = string.Empty;
        public ISvgIcon? Icon { get; set; }
        public List<MenuItem>? Items { get; set; }
    }
}
````

### Use ItemTemplate for Styling and target="_blank"

The example below shows a Menu configuration that is suitable for use in `MainLayout.razor`. The implementation disables the [built-in Menu navigation](slug://menu-navigation) because the URL property is not `Url` and `UrlField` is not set. The sample also uses `<NavLink>` tags with `target="_blank"` to open external links in a new browser window.

>caption Use Menu item template to distinguish the current page and open external links in new browser windows

<div class="skip-repl"></div>

````RAZOR
@inject NavigationManager NavManager

<TelerikMenu Data="@MenuItems" OnClick="@((MenuItem item) => OnClick(item))">
    <ItemTemplate Context="item">
        @{
            @*
                k-menu-link-text will make the NavLink or span similar to built-in Menu items.
                You also need to reset the underline and text color.
                Do not render an SvgIcon component if item.Icon is null.
            *@

            if (EqualityComparer<MenuItem>.Default.Equals(item, SelectedMenuItem))
            {
                <TelerikSvgIcon Icon="@item.Icon" />
                <span style="color: black; font-weight: bold;" class="k-menu-link-text">@item.Text</span>
            }
            else
            {
                string target = string.Empty;
                if (!IsInternalPage(item.Href))
                {
                    target = "_blank";
                }
                <TelerikSvgIcon Icon="@item.Icon" />
                <NavLink target="@target" href="@item.Href" class="k-menu-link-text color-underline">@item.Text</NavLink>
            }
        }
    </ItemTemplate>
</TelerikMenu>

<style>
    /* Reset NavLink styles for consistent look. */
    a.color-underline {
        color: inherit;
        text-decoration: none;
    }
</style>

@code {
    private List<MenuItem> MenuItems { get; set; } = new();

    private MenuItem? SelectedMenuItem { get; set; }

    private void OnClick(MenuItem item)
    {
        if (IsInternalPage(item.Href))
        {
            SelectedMenuItem = item;
        }
    }

    private bool CompareCurrentPageUrl(string urlToCompare)
    {
        return NavManager.Uri.Substring(NavManager.BaseUri.Length - 1).Equals(urlToCompare);
    }

    private bool IsInternalPage(string url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return false;
        }
        return !(url.StartsWith("https://") || url.StartsWith("http://"));
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Home",
                Href = "/",
                Icon = SvgIcon.Home
            },
            new MenuItem()
            {
                Text = "Counter",
                Href = "/counter",
                Icon = SvgIcon.Calculator
            },
            new MenuItem()
            {
                Text = "Weather",
                Href = "/weather",
                Icon = SvgIcon.Globe
            },
            new MenuItem()
            {
                Text = "Telerik",
                Href = "https://www.telerik.com",
                Icon = SvgIcon.Star,
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Documentation",
                        Href = "https://docs.telerik.com/blazor-ui/introduction",
                        Icon = SvgIcon.Star
                    },
                    new MenuItem()
                    {
                        Text = "Demos",
                        Href = "https://demos.telerik.com/blazor-ui",
                        Icon = SvgIcon.Star
                    }
                }
            }
        };

        SelectedMenuItem = MenuItems.Find(item => CompareCurrentPageUrl(item.Href));

        base.OnInitialized();
    }

    public class MenuItem
    {
        public string Text { get; set; } = string.Empty;
        public string Href { get; set; } = string.Empty;
        public ISvgIcon? Icon { get; set; }
        public List<MenuItem>? Items { get; set; }
    }
}
````

## See Also

* [Data Binding a Menu](slug://components/menu/data-binding/overview)
* [Live Demo: Menu Template](https://demos.telerik.com/blazor-ui/menu/template)
