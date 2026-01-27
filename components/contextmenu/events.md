---
title: Events
page_title: Context Menu - Events
description: Events in the Context Menu for Blazor.
slug: contextmenu-events
tags: telerik,blazor,context menu,events
published: true
position: 30
components: ["contextmenu"]
---
# Events

This article describes the events that are fired by the Telerik Context Menu for Blazor:

* [`OnClick`](#onclick)
* [`OnItemRender`](#onitemrender)

## OnClick

The `OnClick` event fires when the user clicks or taps on a menu item. It receives the model of the item as an argument that you can cast to the concrete model type you are using.

You can use the `OnClick` event to react to user choices, for example load new content without using navigation.

>caption Handle OnClick

````RAZOR
<p>Last clicked item: @ClickedItem?.Text</p>

<div id="context-menu-target" style="padding:1em;background:yellow;">right-click for context menu</div>

<TelerikContextMenu Data="@MenuItems" Selector="#context-menu-target"
                    OnClick="@((MenuItem item) => OnClickHandler(item))">
</TelerikContextMenu>

@code {
    public MenuItem ClickedItem { get; set; }

    protected void OnClickHandler(MenuItem item)
    {
        ClickedItem = item;
    }

    public List<MenuItem> MenuItems { get; set; }

    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public List<MenuItem> Items { get; set; }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Share",
                Icon = SvgIcon.Share,
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "FaceBook",
                        Icon = SvgIcon.Facebook
                    },
                    new MenuItem()
                    {
                        Text = "LinkedIn",
                        Icon = SvgIcon.Linkedin
                    },
                    new MenuItem()
                    {
                        Text = "Twitter",
                        Icon = SvgIcon.Twitter
                    },
                }
            },
            new MenuItem()
            {
                Text = "Map Location",
                Icon = SvgIcon.MapMarker
            }
        };

        base.OnInitialized();
    }
}
````

## OnItemRender

The `OnItemRender` event fires when each Context Menu item renders. It allows you to customize the appearance of an item.

The event handler receives an argument object of type `MenuItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Context Menu. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Using OnItemRender to customize the appearance of the Context Menu items.

````RAZOR
<div class="context-menu-target" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    Right-click (or tap and hold on a touch device) for a Context Menu.
</div>

<TelerikContextMenu Data="@MenuItems"
                    Selector=".context-menu-target"
                    OnItemRender="@RenderItemHandler">
</TelerikContextMenu>

<style>
    .orange {
        background: orange;
    }

    .lime {
        background: lime;
    }
</style>

@code {
    private List<ContextMenuItem> MenuItems { get; set; }

    private void RenderItemHandler(MenuItemRenderEventArgs args)
    {
        var item = args.Item as ContextMenuItem;

        args.Class = item.Items == null ? "orange" : "lime";
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

## See Also

* [Templates](slug:contextmenu-templates-overview)
