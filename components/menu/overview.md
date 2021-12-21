---
title: Overview
page_title: Menu Overview
description: Get an overview of the Menu for Blazor, and learn how to use it through practical examples.
slug: components/menu/overview
tags: telerik,blazor,menu,overview
published: True
position: 0
---

# Menu Overview

The <a href="https://www.telerik.com/blazor-ui/menu" target="_blank">Blazor Menu component</a> displays data (flat or hierarchical) in a traditional menu-like structure. In addition to built-in navigation capabilities, you can browse through the items and their children, define [templates]({%slug components/menu/templates%}) for the individual nodes, render text and icons/images, and respond to [events]({%slug components/menu/events%}).

## Creating Blazor Menu

1. Use the `TelerikMenu` tag to add the component to your razor page.

1. Populate the `Data` property with the collection of items that you want to appear in the menu.

1. Match the fields in the models with the binding schema for the nodes.

>caption Basic menu with hierarchical data binding and built-in navigation

````CSHTML
Use a menu to navigate between views

<TelerikMenu Data="@MenuItems"
             UrlField="@nameof(MenuItem.Page)"
             ItemsField="@nameof(MenuItem.SubSectionList)"
             TextField="@nameof(MenuItem.Section)">
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
                Section = "Company", // items that don't have a URL will not render links
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

In the code snippet toolbar, select the **PREVIEW** tab to see the result.

## Navigate Views

A menu is often used to list pages, views, or sections in an application so the user can navigate through them. To do that with a menu, you have two options:

* Use the built-in `UrlField` in the [bound data]({%slug components/menu/data-binding/overview%}#data-bindings) to populate the URLs in the anchors that the menu will generate if you provide a URL for the given item. This approach is demonstrated in the [Creating Blazor Menu](#creating-blazor-menu) example.
* Use a [Template]({%slug components/menu/templates%}) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

[Read more about the Blazor Menu navigation...]({%slug menu-navigation%})

## Events

The Blazor Menu generates events that you can handle and further customize its behavior. [Read more about the Blazor Menu events...]({%slug components/menu/events%})

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items. [Read more about the Blazor Menu templates...]({%slug components/menu/templates%})

## Data Binding

To show any items, the Blazor Menu requires a data source that you can provide through the `Data` property. The Menu allows you to display the items both as flat data and hierarchically. [Read more about the Blazor Menu data binding...]({%slug components/menu/data-binding/overview%})

## Orientation

The Blazor Menu allows you to control its orientation and display the items horizontally or vertically. [Read more about the Blazor Menu orientation...]({%slug components/menu/orientation%})

## Menu Icons

To illustrate the purpose of each menu item, the Blazor Menu allows you to add images, icon classes, or font icons. [Read more about the Blazor Menu icons...]({%slug menu-icons%})

## Using Blazor Menu Reference

The Menu is a generic component and its type depends on the type of the model that you use as its data source.

````CSHTML
@using Telerik.Blazor.Components

<TelerikMenu @ref="theMenu" Data="@menuData" TextField="Page" UrlField="Page">
</TelerikMenu>

@code {
    // the menu is a generic component and its type depends on the model it binds to
    Telerik.Blazor.Components.TelerikMenu<MenuItem> theMenu;

    List<MenuItem> menuData = Enumerable.Range(1, 3).Select(x => new MenuItem { Page = $"page{x}" }).ToList();

    public class MenuItem
    {
        public string Page { get; set; }
    }
}
````

## Next Steps

* [Binding the Menu to Data]({%slug components/menu/data-binding/overview%})

* [Using the Menu to Navigate between Pages]({%slug menu-navigation%})

## See Also

  * [Live Demo: Menu](https://demos.telerik.com/blazor-ui/menu/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMenu-1)
