---
title: Overview
page_title: Context Menu Overview
description: Try now the Telerik UI for Blazor Context Menu and learn more about its options for creating the component, binding it to data, changing its navigation views, customizing the component per target, and more.
slug: contextmenu-overview
tags: telerik,blazor,context menu,overview
published: True
position: 0
---

# Blazor Context Menu Overview

The <a href="https://www.telerik.com/blazor-ui/context-menu" target="_blank">Blazor Context Menu</a> displays a contextual popup with flat or hierarchical data in a traditional menu-like structure. The component enables you to invoke commands while preserving the screen real estate.

In addition to the built-in [navigation capabilities](slug:contextmenu-navigation), you can browse through the items and their children, define [templates](slug:contextmenu-templates-overview) for the individual nodes, render text and icons or images, and respond to [events](slug:contextmenu-events).

## Creating the Blazor Context Menu

To create the Context Menu: 

1. Add the `TelerikContextMenu` tag and set its `Selector` parameter to a CSS selector that will match the elements to which you want to attach the Context Menu.
1. Provide a collection of models to the `Data` property of the component. The Context Menu will automatically recognize property names like `Id`, `ParentId`, `Text`, and more. Otherwise, [configure custom property names by using bindings](slug:contextmenu-data-binding-overview#data-bindings).
1. Handle the [`OnClick` event](slug:contextmenu-events#onclick) to respond to user actions.

>caption A basic Context Menu with hierarchical data binding and an `OnClick` event handler

````RAZOR
@* Use a Context Menu to perform actions *@

<div class="context-menu-target" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    Right-click (or tap and hold on a touch device) for a Context Menu.
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
                Icon = SvgIcon.InfoCircle,
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
                        Icon = SvgIcon.Trash,
                        CommandName = "delete"
                    },
                    new ContextMenuItem
                    {
                        Text = "Report",
                        Icon = SvgIcon.Cancel,
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
        public ISvgIcon Icon { get; set; }
        public bool Separator { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }
}
````

## Data Binding

To show any items, the Blazor Context Menu requires a data source that you can provide through the `Data` property. The Context Menu allows you to display the items both as flat data and hierarchically. [Read more about the Blazor Context Menu data binding...](slug:contextmenu-data-binding-overview)

## Per-Target Customization

You can easily attach one and the same Context Menu to many targets or you can use its `ShowAsync(x, y)` method to show the component explicitly based on your business logic needs, data, and events. [Read more about the integration approaches of the Blazor Context Menu...](slug:contextmenu-integration).

## Navigation Views

A Context Menu is often used to list pages, views, or sections in an application so that users can navigate through them. To achieve the desired scenario, use either of the following options:

* If a URL is provided for the given item, populate the URLs in the anchors which the Context Menu will generate by using the built-in `UrlField` in the [bound data](slug:contextmenu-data-binding-overview), as demonstrated in the first example of this article.
* Enable fine-tuning and generate the desired links, such as `NavLink` components, by using a [template](slug:contextmenu-templates-overview).

[Read more about the Blazor Context Menu navigation...](slug:contextmenu-navigation)

## Icons

To illustrate the purpose of each Context Menu item, the Blazor Context Menu allows you to add images, icon classes, or font icons. [Read more about the Blazor Menu icons...](slug:contextmenu-icons)

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items. [Read more about the available Blazor Context Menu templates...](slug:contextmenu-templates-overview)

## Events

The Context Menu generates events that you can handle and further customize its behavior. [Read more about the supported Blazor Context Menu events...](slug:contextmenu-events)

## Context Menu Parameters

The following table lists Context Menu parameters, which are not related to other features on this page. For the full list of properties, methods, and events, see the [Context Menu API reference documentation](slug:Telerik.Blazor.Components.TelerikContextMenu-1).

| Attribute | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders an additional CSS class to the main wrapping element of the component. Use it to apply custom styles or [override the theme](slug:themes-override). |
| `Selector` | `string` | A CSS selector of the target elements where the Context Menu will be shown.|

### Popup settings

The popup of the component can be additionally customized via nested tags:

<div class="skip-repl"></div>

````RAZOR
<TelerikContextMenu>
    <ContextMenuSettings>
        <ContextMenuPopupSettings HorizontalCollision="..."/>
    </ContextMenuSettings>
</TelerikContextMenu>
````

The ContextMenu provides the following popup settings:

| Parameter | Type | Description |
| --- | --- | --- |
| `HorizontalCollision` | `PopupCollision` enum <br /> (`Fit`) | Sets the behavior of the Popup when it doesn't fit in the viewport based on the horizontal plane. [Read more about Popup collision behavior.](slug:popup-position-collision#collision) |
| `VerticalCollision` | `PopupCollision` enum <br /> (`Fit`) | Defines the behavior of the Popup when it doesn't fit in the viewport based on the vertical plane. [Read more about Popup collision behavior.](slug:popup-position-collision#collision) |

## Context Menu Reference and Methods

To use the [Blazor Context Menu methods](slug:Telerik.Blazor.Components.TelerikContextMenu-1), add a reference to the component instance.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `ShowAsync` | Programmatically shows the Context Menu. |
| `HideAsync` | Programmatically hides the Context Menu. |
| `Refresh` | Re-renders the component. |

````RAZOR
@* Open, close, and refresh the Context Menu programmatically *@

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
        <TelerikTextBox @bind-Value="@TextBoxValue" />
        <br />
        <TelerikButton OnClick="@HandleTextBoxReset">Reset textbox</TelerikButton>
        <TelerikButton OnClick="@(async () => await TheContextMenu.HideAsync())">Close</TelerikButton>
    </Template>
</TelerikContextMenu>

@code {
    public List<ContextMenuItem> MenuItems { get; set; }
    public string TextBoxValue { get; set; }

    // The Context Menu is a generic component and its type depends on the model to which it binds.
    TelerikContextMenu<ContextMenuItem> TheContextMenu { get; set; }

    void HandleTextBoxReset()
    {
        TextBoxValue = "";
        TheContextMenu.Refresh();
    }

    async Task ShowContextMenu(MouseEventArgs e, bool IsSpecial)
    {
        await TheContextMenu.ShowAsync(e.ClientX, e.ClientY);
    }

    // Generate sample data for the ListView and the Context Menu.
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

* [Binding the Telerik UI for Blazor Context Menu to Data](slug:contextmenu-data-binding-overview)
* [Handling the `OnClick` Context Menu Event and Respond to User Interaction](slug:contextmenu-events#onclick)

## See Also

* [Binding the Blazor Context Menu to Data](slug:contextmenu-data-binding-overview)
* [Live Demo: Overview of the Blazor Context Menu](https://demos.telerik.com/blazor-ui/contextmenu/overview)
* [Context Menu API Reference](slug:Telerik.Blazor.Components.TelerikContextMenu-1)
