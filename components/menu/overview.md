---
title: Overview
page_title: Menu Overview
description: Get an overview of the Menu for Blazor, and learn how to use it through practical examples.
slug: components/menu/overview
tags: telerik,blazor,menu,overview
published: True
position: 0
---

# Blazor Menu Overview

The <a href="https://www.telerik.com/blazor-ui/menu" target="_blank">Blazor Menu component</a> displays data (flat or hierarchical) in a traditional menu-like structure. In addition to built-in navigation capabilities, you can browse through the items and their children, define [templates](slug://components/menu/templates) for the individual nodes, render text and icons/images, and respond to [events](slug://components/menu/events).

## Creating Blazor Menu

1. Use the `TelerikMenu` tag to add the component to your razor page.

1. Populate the `Data` property with the collection of items that you want to appear in the menu. The Menu will automatically recognize property names like `Id`, `ParentId`, `Text` and a few others. Otherwise, [use bindings to configure custom property names](slug://components/menu/data-binding/overview#data-bindings).

>caption Basic Menu with hierarchical data binding and built-in navigation

````RAZOR
@*Use a Menu to navigate between views*@

<TelerikMenu Data="@MenuItems"/>

@code {
    public List<MenuItem> MenuItems { get; set; }

    public class MenuItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public List<MenuItem> Items { get; set; }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Company", // items that don't have a URL will not render links
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Overview",
                        Url = "company/overview"
                    },
                    new MenuItem()
                    {
                        Text = "Events",
                        Url = "company/events"
                    },
                    new MenuItem()
                    {
                        Text = "Careers",
                        Url = "company/careers"
                    }
                }
            },
            new MenuItem()
            {
                Text = "Services",
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "Consulting",
                        Url = "consultingservices"
                    },
                    new MenuItem()
                    {
                        Text = "Education",
                        Url = "education"
                    }
                }
            }
        };

        base.OnInitialized();
    }
}
````

## Data Binding

To show any items, the Blazor Menu requires a data source that you can provide through the `Data` property. The Menu allows you to display the items both as flat data and hierarchically. [Read more about the Blazor Menu data binding...](slug://components/menu/data-binding/overview)

## Navigate Views

A menu is often used to list pages, views, or sections in an application so the user can navigate through them. To do that with a menu, you have two options:

* Use the built-in `UrlField` in the [bound data](slug://components/menu/data-binding/overview#data-bindings) to populate the URLs in the anchors that the menu will generate if you provide a URL for the given item. This approach is demonstrated in the [Creating Blazor Menu](#creating-blazor-menu) example.
* Use a [Template](slug://components/menu/templates) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

[Read more about the Blazor navigation Menu...](slug://menu-navigation)

## Orientation

The Blazor Menu allows you to control its orientation and display the items horizontally or vertically. [Read more about the Blazor Menu orientation...](slug://components/menu/orientation)

## Show and Hide Behavior

By default, the Menu child items are displayed on mouse hover over the parent item and hidden on mouse leave. You can configure the Menu to [show and hide child items by clicking or tapping the parent](slug://menu-show-hide-behavior).

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items. [Read more about the Blazor Menu templates...](slug://components/menu/templates)

## Menu Icons

To illustrate the purpose of each menu item, the Blazor Menu allows you to add images, icon classes, or font icons. [Read more about the Blazor Menu icons...](slug://menu-icons)

## Events

The Blazor Menu generates events that you can handle and further customize its behavior. [Read more about the Blazor Menu events...](slug://components/menu/events)

## Menu Parameters

The following table lists Context Menu parameters, which are not related to other features on this page. Check the [Menu API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikMenu-1) for a full list of properties, methods and events.

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders additional CSS class to the main wrapping element of the component. Use it to apply custom styles or [override the theme](slug://themes-override). |
| `CloseOnClick` | `bool` | Determines whether the Menu popups should close when they are clicked.
| `ShowOn` | `MenuShowEvent` enum <br /> (`MouseEnter`) | The browser event that will trigger child Menu items to show (mouse enter or click). |
| `HideOn` | `MenuHideEvent` enum <br /> (`MouseLeave`) | The browser event that will trigger child Menu items to hide (mouse leave or click).

### Popup settings

The popup of the component can be additionally customized via nested tags:

<div class="skip-repl"></div>

````RAZOR
<TelerikMenu>
    <MenuSettings>
        <MenuPopupSettings HorizontalCollision="..."/>
    </MenuSettings>
</TelerikMenu>
````

The Menu provides the following popup settings:

| Parameter | Type | Description |
| --- | --- | --- |
| `HorizontalCollision` | `PopupCollision` enum <br /> (`Fit`) | Sets the behavior of the Popup when it doesn't fit in the viewport based on the horizontal plane. [Read more about Popup collision behavior.](slug://popup-position-collision#collision) |
| `VerticalCollision` | `PopupCollision` enum <br /> (`Fit`) | Defines the behavior of the Popup when it doesn't fit in the viewport based on the vertical plane. [Read more about Popup collision behavior.](slug://popup-position-collision#collision) |

## Next Steps

* [Binding the Menu to Data](slug://components/menu/data-binding/overview)

* [Using the Menu to Navigate between Pages](slug://menu-navigation)

## See Also

* [Live Demo: Menu](https://demos.telerik.com/blazor-ui/menu/overview)
* [Menu API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikMenu-1)
