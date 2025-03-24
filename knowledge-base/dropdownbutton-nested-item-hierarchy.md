---
title: Nest DropDownButton Items in Hierarchy
description: Learn how to nest dropdown buttons and use multiple sets of hierarchical dropdown items.
type: how-to
page_title: How to Nest DropDownButton Items in Hierarchy
slug: dropdownbutton-kb-nested-item-hierarchy
tags: blazor, dropdownbutton, hierarchy
ticketid: 1628170, 1682574
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DropDownButton for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to nest dropdown buttons and use multiple sets of dropdown items in a hierarchy?
* How to allow nested layers of hierarchical items in the Telerik DropDownButton for Blazor? The UI should look like a multi-level Menu or ContextMenu.

## Solution

Here are two ways to achieve a hierarchy UI with a DropDownButton user interface.

* [Indent the DropDownButton items with some empty space](#indent-dropdown-items).
* [Use a Menu component and style it to look like a DropDownButton](#use-menu-component).

Both examples below use [Telerik CSS theme variables](https://www.telerik.com/design-system/docs/themes/kendo-themes/default/theme-variables/) to avoid the need to hard-code custom style values.

### Indent Dropdown Items

1. Show parent-child relationships between the DropDownButton items by using empty space before each item text.
1. (optional) [Add separators between groups of DropDownButton items](slug:dropdownbutton-kb-add-separator-between-items).

>caption Apply padding to DropDownButton items to convey hierarchy

````RAZOR
<TelerikDropDownButton>
    <DropDownButtonContent>DropDownButton</DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem>Level 1 Child 1</DropDownButtonItem>
        <DropDownButtonItem>Level 1 Child 2</DropDownButtonItem>
        <DropDownButtonItem><span class="pad"></span>Level 2 Child 1</DropDownButtonItem>
        <DropDownButtonItem><span class="pad"></span>Level 2 Child 3</DropDownButtonItem>
        <DropDownButtonItem><span class="pad"></span><span class="pad"></span>Level 3 Child 1</DropDownButtonItem>
        <DropDownButtonItem>Level 1 Child 3</DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>

<style>
    .pad {
        padding-left: var(--kendo-spacing-6);
    }
</style>
````

### Use Menu Component

1. Render a Menu component with a single root item.
1. Define the item hierarchy with flat data or hierarchical data.
1. Implement a [Menu `OnClick` event handler](slug:components/menu/events#onclick).

>caption Style a Menu to look like a DropDownButton

````RAZOR
<TelerikMenu Data="@MenuItems"
             Class="menu-button"
             TItem="@MenuItem"
             OnClick="@OnMenuItemClick">
</TelerikMenu>

<style>
    .menu-button {
        display: inline-block;
        color: var(--kendo-color-on-base);
    }

        .menu-button > .k-item {
            background: var(--kendo-color-base);
            color: var(--kendo-color-on-base);
            border: 1px solid var(--kendo-color-border);
            border-radius: var(--kendo-border-radius-md);
        }

            .menu-button > .k-item:hover {
                background: var(--kendo-color-base-hover);
            }

            .menu-button > .k-item.k-menu-item:active {
                color: var(--kendo-color-on-base);
                background: var(--kendo-color-base-active);
            }

            .menu-button > .k-item.k-menu-item:focus {
                box-shadow: 0 0 0 2px rgba(0,0,0,.08);
            }

            /* optional: hide the expand arrow */
            .menu-button > .k-item .k-menu-expand-arrow {
                /*display: none;*/
            }

            .menu-button > .k-item > .k-menu-link {
                padding: var(--kendo-spacing-1) var(--kendo-spacing-2);
            }
</style>

@code {
    private void OnMenuItemClick(MenuItem clickedItem)
    {
        Console.WriteLine($"The user clicked on {clickedItem.Text}");
    }

    private List<MenuItem> MenuItems { get; set; } = new List<MenuItem>()
    {
        new MenuItem()
        {
            Id = 1,
            Text = "Menu as DropDownButton"
        },
        new MenuItem()
        {
            Id = 2,
            ParentId = 1,
            Text = "Level 1 Child 1"
        },
        new MenuItem()
        {
            Id = 3,
            ParentId = 1,
            Text = "Level 1 Child 2"
        },
        new MenuItem()
        {
            Id = 4,
            ParentId = 3,
            Text = "Level 2 Child 1"
        },
        new MenuItem()
        {
            Id = 5,
            ParentId = 3,
            Text = "Level 2 Child 2"
        },
        new MenuItem()
        {
            Id = 6,
            ParentId = 5,
            Text = "Level 3 Child 1"
        },
        new MenuItem()
        {
            Id = 7,
            ParentId = 1,
            Text = "Level 1 Child 3"
        }
    };

    public class MenuItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## See Also

* [DropDownButton Overview](slug:dropdownbutton-overview)
* [Menu Overview](slug:components/menu/overview)
