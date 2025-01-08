---
title: Events
page_title: Menu - Events
description: Events in the Menu for Blazor.
slug: components/menu/events
tags: telerik,blazor,menu,events
published: true
position: 20
---

# Events

This article describes the events available in the Telerik Menu for Blazor:

* [`OnClick`](#onclick)
* [`OnItemRender`](#onitemrender)

## OnItemRender

The `OnItemRender` event fires when each Menu item renders. It allows you to customize the appearance of an item.

The event handler receives an argument object of type `MenuItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Menu. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Customizing the appearance of the Menu items.

````RAZOR
<TelerikMenu Data="@MenuItems"
             ParentIdField="@nameof(MenuItem.SectionId)"
             IdField="@nameof(MenuItem.Id)"
             TextField="@nameof(MenuItem.Section)"
             OnItemRender="@OnMenuItemRender">
</TelerikMenu>

<style>
    .custom-item {
        background-color: #bbb;
    }

    .popup-item {
        background-color: #ff6358;
        color: white;
    }
</style>

@code {
    private List<MenuItem> MenuItems { get; set; }

    private void OnMenuItemRender(MenuItemRenderEventArgs args)
    {
        var item = args.Item as MenuItem;

        if (item.SectionId == null)
        {
            args.Class = "custom-item";
        }
        else
        {
            args.Class = "popup-item";         
        }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Id = 1,
                Section = "Overview"
            },
            new MenuItem()
            {
                Id = 2,
                Section = "Demos"
            },
            new MenuItem()
            {
                Id = 3,
                Section = "Roadmap"
            },
            new MenuItem()
            {
                Id = 4,
                SectionId = 3,
                Section = "What's new"
            },
            new MenuItem()
            {
                Id = 5,
                SectionId = 3,
                Section = "Roadmap"
            },
            new MenuItem()
            {
                Id = 6,
                SectionId = 3,
                Section = "Release History"
            },
            new MenuItem()
            {
                Id = 7,
                SectionId = 2,
                Section = "Grid"
            },
            new MenuItem()
            {
                Id = 8,
                SectionId = 2,
                Section = "Charts"
            }
        };

        base.OnInitialized();
    }

    public class MenuItem
    {
        public int Id { get; set; }
        public int? SectionId { get; set; }
        public string Section { get; set; }
    }
}
````

## OnClick

The `OnClick` event fires when the user clicks or taps on a menu item. It receives the model of the item as an argument that you can cast to the concrete model type you are using.

You can use the `OnClick` event to react to user choices in a menu without using navigation to load new content automatically.

>caption Handle OnClick

````RAZOR
Last clicked item: @ClickedItem?.Text

<TelerikMenu Data="@MenuItems" OnClick="@((MenuItem item) => OnClickHandler(item))">
</TelerikMenu>

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


## See Also

* [Templates](slug://components/menu/templates)
