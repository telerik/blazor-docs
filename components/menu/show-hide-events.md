---
title: Show & Hide Events
page_title: Menu - Show and Hide Menu Items
description: Configure the Menu's sub-items appearance by using the ShowOn parameter and control how they disappear through the HideOn option.
slug: menu-show-hide-events
tags: telerik,blazor,menu,show,hide,events,hover,click,mouseleave,mouseenter
published: true
position: 3
---

# Show and Hide Menu Items

You can control what user interaction with the Menu shows the children menu items through the `ShowOn` parameter. On the other hand the `HideOn` parameter allows you to configure the trigger event that hides the menu items.

1. The `ShowOn` parameter accepts a value from the `Telerik.Blazor.MenuShowEvent` enum:

    * `MouseEnter`&mdash;When the mouse cursor enters a Menu item, its sub-items will display.
    * `Click`&mdash;When the user clicks or taps on a Menu item, its child items will display.

2. The `HideOn` parameter accepts a value from the `Telerik.Blazor.MenuHideEvent` enum:

    * `MouseLeave` - When the mouse cursor leaves the Menu item, its children items will disappear.
    * `Click`  The menu items will disappear when the user performs a click/tap. Clicking a specific menu item in the list or the parent menu item will not close the clicked menu items list. To change this behavior, use the [`CloseOnClick`]({%slug components/menu/overview%}#menu-parameters) parameter.

By default, the Menu items are shown on hover (mouseenter) over the Menu, and hidden on mouse leave.

> Changing the `ShowOn` & `HideOn` values dynamically at runtime is not supported at this stage.

>caption Explore the show and hide events of the Menu

````CSHTML
@* Setting `ShowOn` and `HideOn` is not mandatory. The default values are `MenuShowEvent.MouseEnter` & `MenuHideEvent.MouseLeave`. *@

<div>
    <div style="padding: 20px; margin:2rem">
        <p>Menu <strong>ShowOn: Click</strong> : <strong>HideOn: Click</strong></p>
        <TelerikMenu Data="@MenuItems"
                     ShowOn="@MenuShowEvent.Click"
                     HideOn="@MenuHideEvent.Click" />
    </div>
    <div style="padding: 20px; margin:2rem">
        <p>Menu <strong>ShowOn: MouseEnter</strong> : <strong>HideOn: MouseLeave</strong></p>
        <TelerikMenu Data="@MenuItems"
                     ShowOn="@MenuShowEvent.MouseEnter"
                     HideOn="@MenuHideEvent.MouseLeave" />
    </div>
</div>

@code {
    private List<MenuItem> MenuItems { get; set; }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Text = "item 1",
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "item 1.1",
                    },
                    new MenuItem()
                    {
                        Text = "item 1.2",
                        Items = new List<MenuItem>()
                        {
                            new MenuItem()
                            {
                                Text = "item 1.2.1",
                            },
                            new MenuItem()
                            {
                                Text = "item 1.2.2",
                            }
                        }
                    },
                    new MenuItem()
                    {
                        Text ="item 1.3",
                        Items = new List<MenuItem>()
                        {
                            new MenuItem()
                            {
                                Text = "item 1.3.1",
                            },
                            new MenuItem()
                            {
                                Text = "item 1.3.2",
                            }
                        }
                    }
                }
            },
            new MenuItem()
            {
                Text = "item 2",
                Items = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Text = "item 2.1",
                    },
                    new MenuItem()
                    {
                        Text = "item 2.2",
                    }
                }
            }
        };

        base.OnInitialized();
    }

    public class MenuItem
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public List<MenuItem> Items { get; set; }
    }
}
````

## Next Steps

* [Explore Menu Templates]({%slug components/menu/templates%})

## See Also

* [Menu Overview]({%slug components/menu/overview%})
