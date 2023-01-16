---
title: Overview
page_title: Context Menu Overview
description: Overview of the Context Menu for Blazor.
slug: contextmenu-overview
tags: telerik,blazor,context menu,overview
published: True
position: 0
---

# Blazor Context Menu Overview

The <a href="https://www.telerik.com/blazor-ui/context-menu" target="_blank">Blazor Context Menu component </a> displays a contextual popup with data (flat or hierarchical) in a traditional menu-like structure. It lets you invoke commands while preserving screen real estate.

In addition to built-in [navigation capabilities]({%slug contextmenu-navigation%}), you can browse through the items and their children, define [templates]({%slug contextmenu-templates-overview%}) for the individual nodes, render text and icons/images, and respond to [events]({%slug contextmenu-events%}).

## Creating Context Menu

1. Add the `TelerikContextMenu` tag and set its `Selector` parameter to a CSS selector that will match the element(s) you want to attach the context menu to.
1. Provide a collection of models to its `Data` property. The Context Menu will automatically recognize property names like `Id`, `ParentId`, `Text` and a few others. Otherwise, [use bindings to configure custom property names]({%slug contextmenu-data-binding-overview%}#data-bindings).
1. Handle the [`OnClick` event]({%slug contextmenu-events%}#onclick) to respond to user actions.

>caption Basic context menu with hierarchical data binding and OnClick event handler

````CSHTML
@* Use a context menu to perform actions *@

<div class="context-menu-target" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    Right click (or tap-and-hold on a touch device) for a context menu.
</div>

<TelerikContextMenu Selector=".context-menu-target" Data="@MenuItems"                       
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
                Icon = "information",
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
                        Icon = "delete",
                        CommandName = "delete"
                    },
                    new ContextMenuItem
                    {
                        Text = "Report",
                        Icon = "cancel",
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
        public FontIcon? Icon { get; set; }
        public bool Separator { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }
}
````

## Data Binding

To show any items, the Blazor Context Menu requires a data source that you can provide through the `Data` property. The Context Menu allows you to display the items both as flat data and hierarchically. [Read more about the Blazor Context Menu data binding...]({%slug contextmenu-data-binding-overview%})

## Customize per Target

The same context menu can easily be attached to many targets, or you can use its `ShowAsync(x, y)` method to show it explicitly based on your business logic needs, data and events. Read more in the [Integration]({%slug contextmenu-integration%}) article.

## Navigate Views

A menu is often used to list pages, views or sections in an application so the user can navigate through them. To do that with a menu, you have two options:

* Use the built-in `UrlField` in the [bound data]({%slug contextmenu-data-binding-overview%}) to populate the URLs in the anchors the menu will generate for you if an URL is provided for the given item. An example is available in the beginning of this article.
* Use a [Template]({%slug contextmenu-templates-overview%}) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

[Read more about the Blazor Context Menu navigation...]({%slug contextmenu-navigation%})

## Icons

To illustrate the purpose of each menu item, the Blazor Context Menu allows you to add images, icon classes, or font icons. [Read more about the Blazor Menu icons...]({%slug contextmenu-icons%})

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items. [Read more about the Blazor Context Menu templates...]({%slug contextmenu-templates-overview%})

## Events

The Context Menu generates events that you can handle and further customize its behavior. [Read more about the Blazor Context Menu events...]({%slug contextmenu-events%})

## Context Menu Parameters

The following table lists Context Menu parameters, which are not related to other features on this page. Check the [Context Menu API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikContextMenu-1) for a full list of properties, methods and events.

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders additional CSS class to the main wrapping element of the component. Use it to apply custom styles or [override the theme]({%slug themes-override%}). |
| `Selector` | `string` | CSS selector of the target elements where the Context Menu will be shown.|

## Context Menu Reference and Methods

Add a reference to the component instance to use the [Context Menu methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikContextMenu-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `ShowAsync` | programmatically shows the ContextMenu 
| `HideAsync` | programmatically hides the ContextMenu

````CSHTML
@* Open and close the ContextMenu programmatically *@

<div @oncontextmenu:preventDefault="true"
     @oncontextmenu="@( (MouseEventArgs e) => ShowContextMenu(e, false) )"
     class="menuTarget">
    normal target
</div>

<TelerikContextMenu Data="@MenuItems" @ref="@TheContextMenu">
    <Template>
        @{
            var dataSource = context as List<ContextMenuItem>;
            <p>We have this data:</p>
            <ul>
                @foreach (var item in dataSource)
                {
                    <li>@item.Text</li>
                }
            </ul>
        }

        <TelerikButton OnClick="@(async () => await TheContextMenu.HideAsync())">Close</TelerikButton>
    </Template>
</TelerikContextMenu>

@code {
    public List<ContextMenuItem> MenuItems { get; set; }

    // the context menu is a generic component and its type depends on the model it binds to
    TelerikContextMenu<ContextMenuItem> TheContextMenu { get; set; }

    async Task ShowContextMenu(MouseEventArgs e, bool IsSpecial)
    {
        await TheContextMenu.ShowAsync(e.ClientX, e.ClientY);
    }

    // generate sample data for the listview and the menu
    protected override void OnInitialized()
    {
        MenuItems = new List<ContextMenuItem>()
    {
            new ContextMenuItem
            {
                Text = "More Info",
                Metadata = "info"
            },
            new ContextMenuItem
            {
                Text = "Special Command",
                Metadata = "special"
            }
        };

        base.OnInitialized();
    }

    public class ContextMenuItem
    {
        public string Text { get; set; }
        public string Metadata { get; set; }
    }
}

<style>
    .menuTarget {
        width: 100px;
        background: yellow;
        margin: 50px;
    }
</style>
````

## Next Steps

* [Binding the Context Menu to Data]({%slug contextmenu-data-binding-overview%})

* Handle the [`OnClick` event]({%slug contextmenu-events%}#onclick) of the Context Menu to respond to the user action

## See Also

  * [Data Binding a Context Menu]({%slug contextmenu-data-binding-overview%})
  * [Live Demo: Context Menu](https://demos.telerik.com/blazor-ui/contextmenu/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikContextMenu-1)
