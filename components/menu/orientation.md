---
title: Orientation
page_title: Menu for Blazor | Orienatation
description: Orientation on the Menu for Blazor
slug: components/menu/orientation
tags: telerik,blazor,menu,events
published: true
position: 10
---

# Orientation

You can control the orientation of the Menu for Blazor so that it orders its items horizontally or vertically.

>caption Changing the orientation of a menu

![](images/menu-change-orientation.gif)

>caption Set orientation

````CSHTML
@using Telerik.Blazor.Components.Menu

<TelerikMenu Data="@MenuItems" OnSelect="@OnSelect">
</TelerikMenu>

Last item selected: @SelectedItem?.Text

@code {
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
                Icon = "k-i-share",
                Items = new List<MenuItem>()
            {
                    new MenuItem()
                    {
                        Text = "FaceBook",
                        Icon = "k-i-facebook"
                    },
                    new MenuItem()
                    {
                        Text = "LinkedIn",
                        Icon = "k-i-linkedin"
                    },
                    new MenuItem()
                    {
                        Text = "Twitter",
                        Icon = "k-i-twitter"
                    },
                }
            },
            new MenuItem()
            {
                Text = "Map Location",
                Icon = "k-i-marker-pin"
            }
        };

        base.OnInitialized();
    }
}
````


## See Also

* [Menu Overview]({%slug components/menu/overview%})
* [Live Demo: Orientation](https://demos.telerik.com/blazor-ui/menu/orientation)
