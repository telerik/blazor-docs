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

The `OnClick` event fires when the user clicks or taps on a menu item. It receives the model of the item as an argument that you can cast to the concrete model type you are using.

You can use the `OnClick` event to react to user choices in a menu without using navigation to load new content automatically.

>caption Handle OnClick

````CSHTML
Last clicked item: @ClickedItem?.Text
<div id="context-menu-target" style="background:yellow;">right click for context menu</div>

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
                Icon = IconName.Share,
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "FaceBook",
                        Icon = IconName.Facebook
                    },
                    new MenuItem()
                    {
                        Text = "LinkedIn",
                        Icon = IconName.Linkedin
                    },
                    new MenuItem()
                    {
                        Text = "Twitter",
                        Icon = IconName.Twitter
                    },
                }
            },
            new MenuItem()
            {
                Text = "Map Location",
                Icon = IconName.MarkerPin
            }
        };

        base.OnInitialized();
    }
}
````


## See Also

* [Templates]({%slug contextmenu-templates-overview%})
