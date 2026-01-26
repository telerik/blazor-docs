---
title: Disable Focus on First Item in ContextMenu
description: Learn how to prevent the first item in a context menu from automatically gaining focus by disabling or removing its default focus behavior.
type: how-to
page_title: Disable Focus on First Item in ContextMenu
slug: contextmenu-kb-disable-focus
tags: context-menu
ticketid: 1622761, 1635324
res_type: kb
components: ["contextmenu"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ContextMenu for Blazor</td>
        </tr>
    </tbody>
</table>

## Description
This Knowledge Base article answers the following questions:

* How to remove autofocus from the first menu item?
* How to prevent focus on the first item of the menu?
* How to disable the focus on the first ContextMenu item?
* How to prevent the ContextMenu from automaticallly receiving focus when it shows?

## Solution

1. Set a custom CSS class to the ContextMenu through the `Class` parameter. This configuration will allow you to target specific ContextMenu instances.
2. Use the defiend class to [Override the theme styles](https://docs.telerik.com/blazor-ui/styling-and-themes/override-theme-styles) by setting the CSS property `box-shadow` to `none`.

> Removing the ContextMenu focus is not recommended because this violates the accessibility compliance of your application. The ContextMenu receives focus automatically when it shows. This behavior is a [requirement for accessible user experience](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role). If the ContextMenu doesn't receive focus automatically, keyboard users will be unable to navigate the items. 

>caption ContextMenu with disabled shadow of the first item

````RAZOR
<style>
    /* The CSS combinator that targets the first item of the menu */
    .no-shadow .k-menu-group.k-context-menu .k-item:focus > .k-link {
        box-shadow: none;
    }
</style>

<div class="context-menu-target1" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    (no shadow) Right click here
</div>

<div class="context-menu-target2" style="width:200px; height: 100px; background: yellow; margin-bottom: 50px;">
    (with shadow) Right click here
</div>

@* ContextMenu without focus on the first item *@
<TelerikContextMenu Class="no-shadow" Selector=".context-menu-target1" Data="@MenuItems"
                    OnClick="@( (ContextMenuItem itm) => ClickHandler(itm) )">
</TelerikContextMenu>

@* ContextMenu with focus on the first item *@
<TelerikContextMenu Selector=".context-menu-target2" Data="@MenuItems"
                    OnClick="@( (ContextMenuItem itm) => ClickHandler(itm) )">
</TelerikContextMenu>

@code {
    private List<ContextMenuItem> MenuItems { get; set; }

    private async Task ClickHandler(ContextMenuItem clickedItem)
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
        public string Icon { get; set; }
        public bool Separator { get; set; }
        public List<ContextMenuItem> Items { get; set; }
    }
}
````
