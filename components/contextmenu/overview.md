---
title: Overview
page_title: Context Menu Overview
description: Overview of the Context Menu for Blazor.
slug: contextmenu-overview
tags: telerik,blazor,context menu,overview
published: True
position: 0
---

# Context Menu Overview

The Blazor Context Menu component displays a contextual popup with data (flat or hierarchical) in a traditional menu-like structure. It lets you invoke commands while preserving screen real estate.

In addition to built-in [navigation capabilities]({%slug contextmenu-navigation%}), you can browse through the items and their children, define [templates]({%slug contextmenu-templates-overview%}) for the individual nodes, render text and icons/images, and respond to [events]({%slug contextmenu-events%}).

To use a Telerik Context Menu for Blazor:

1. add the `TelerikContextMenu` tag and set its `Selector` parameter to a CSS selector that will match the element(s) you want to attach the context menu to.
1. provide a collection of models to its `Data` property (read more in the [Data Binding article]({%slug contextmenu-data-binding-overview%}))
1. match the fields in the models with the binding schema for the nodes
1. handle the `OnClick` [event]({%slug contextmenu-events%}) to respond to the user action

>caption Basic context menu with hierarchical data binding and click event handler

````CSHTML
@* Use a context menu to perform actions *@

<div class="context-menu-target" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    Right click (or tap-and-hold on a touch device) for a context menu.
</div>

<TelerikContextMenu Selector=".context-menu-target" Data="@MenuItems"
                    TextField="Text" SeparatorField="Separator" IconField="Icon"
                    OnClick="@( (ContextMenuItem itm) => ClickHandler(itm) )">
</TelerikContextMenu>


@code {
    public List<ContextMenuItem> MenuItems { get; set; }

    async Task ClickHandler(ContextMenuItem clickedItem)
    {
        if (!string.IsNullOrEmpty(clickedItem.CommandName))
        {
            Console.WriteLine($"The programm will now perform the {clickedItem.CommandName} operation");
        }
    }

    protected override void OnInitialized()
    {

        MenuItems = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "More Info",
                Icon = IconName.Information,
                CommandName = "info"
            },
            new ContextMenuItem
            {
                Separator = true
            },
            new ContextMenuItem
            {
                Text = "Advanced",
                Items = new List<ContextMenuItem>()
                {
                    new ContextMenuItem
                    {
                        Text = "Delete",
                        Icon = IconName.Delete,
                        CommandName = "delete"
                    },
                    new ContextMenuItem
                    {
                        Text = "Report",
                        Icon = IconName.Cancel,
                        CommandName = "report"
                    }
                }
            }
        };

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string CommandName { get; set; }
        public string Icon { get; set; }
        public bool Separator { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }
}
````

>caption The result from the snippet above, after right clicking the yellow target and hovering the "Advanced" item

![](images/context-menu-overview.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikContextMenu Data="@MenuItems" @ref="@TheContextMenu">
</TelerikContextMenu>

@code {
    // the context menu is a generic component and its type depends on the model it binds to
    TelerikContextMenu<ContextMenuItem> TheContextMenu { get; set; }

    List<ContextMenuItem> MenuItems { get; set; }

    protected override void OnInitialized()
    {

        MenuItems = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "Item 1"
            },
            new ContextMenuItem
            {
                Text = "Item 2"
            }
        };

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }
}
````


## Navigate Views

A menu is often used to list pages, views or sections in an application so the user can navigate through them. To do that with a menu, you have two options:

* Use the built-in `UrlField` in the [bound data]({%slug contextmenu-data-binding-overview%}) to populate the URLs in the anchors the menu will generate for you if an URL is provided for the given item. An example is available in the beginning of this article.
* Use a [Template]({%slug contextmenu-templates-overview%}) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

>tip You can find an example of a menu used to navigate between pages in an app in the [Navigation]({%slug contextmenu-navigation%}) article.


## Customize per Target

The same context menu can easily be attached to many targets, or you can use its `ShowAsync(x, y)` method to show it explicitly based on your business logic needs, data and events. Read more in the [Integrtion]({%slug contextmenu-integration%}) article.


## See Also

  * [Data Binding a Context Menu]({%slug contextmenu-data-binding-overview%})
  * [Live Demo: Context Menu](https://demos.telerik.com/blazor-ui/context menu/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikContextMenu-1)

