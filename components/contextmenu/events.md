---
title: Events
page_title: Context Menu - Events
description: Events in the Context Menu for Blazor.
slug: contextmenu-events
tags: telerik,blazor,context menu,events
published: true
position: 30
---

# Events

This article explains the events available in the Telerik Context Menu for Blazor:

* [OnClick](#onclick)

## OnClick

The `OnClick` event fires when the user clicks or taps on a menu item. The event handler receives an argument of type `ContextMenuClickEventArgs<TItem>` with the item model (`args.Item`) and a boolean flag that controls component re-rendering (`args.ShouldRender`) after the event.

You can use the `OnClick` event to react to user choices, for example load new content without using navigation.

>caption Handle OnClick

````CSHTML
<p>Last clicked item: @ClickedItem?.Text</p>

<div id="context-menu-target" style="padding:1em;background:yellow;">right-click for context menu</div>

<TelerikContextMenu Data="@MenuItems" Selector="#context-menu-target"
                    OnClick="@((ContextMenuClickEventArgs<MenuItem> args) => OnClickHandler(args))">
</TelerikContextMenu>

@code {
    public MenuItem ClickedItem { get; set; }

    protected void OnClickHandler(ContextMenuClickEventArgs<MenuItem> args)
    {
        ClickedItem = args.Item;
    }

    public List<MenuItem> MenuItems { get; set; }

    public class MenuItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public List<MenuItem> Items { get; set; }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "Share",
                Icon = "share",
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "FaceBook",
                        Icon = "facebook"
                    },
                    new MenuItem()
                    {
                        Text = "LinkedIn",
                        Icon = "linkedin"
                    },
                    new MenuItem()
                    {
                        Text = "Twitter",
                        Icon = "twitter"
                    },
                }
            },
            new MenuItem()
            {
                Text = "Map Location",
                Icon = "marker-pin"
            }
        };

        base.OnInitialized();
    }
}
````


## See Also

* [Templates]({%slug contextmenu-templates-overview%})
