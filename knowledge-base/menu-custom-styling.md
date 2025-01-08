---
title: How to Customize the Default Menu Styles - Fonts and Background Colors
description: Learn how to change the font color, weight, and background colors of the Menu component in a Telerik Blazor application to improve UI contrast.
type: how-to
page_title: How to Customize the Default Menu Styles - Fonts and Background Colors
slug: menu-kb-custom-styling
tags: menu, styling
res_type: kb
ticketid: 1657882, 1543208
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Menu for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:
- How do I change the font color and weight of the top-level menu items in a Blazor application?
- How can I customize the background color of dropdown menus in a Blazor application?
- What CSS selectors are needed to style the Telerik Menu in Blazor?

## Solution

To customize the appearance of the Menu items: 

1. Override the default theme styles. 
2. Use a custom CSS to change the font color and weight of the root menu items. 
3. Customize the background and font colors of the child menu items.

>caption Menu component with custom CSS styles

````RAZOR
<style>
    /* root menu item default state */
    .custom-menu-styles.k-menu > .k-item {
        color: #fff;
        font-weight: bold;
    }

        /* root menu item hover state */
        .custom-menu-styles.k-menu > .k-item:hover {
            background: #fff;
            color: #000;
        }

    /* child menu item default state */
    .k-menu-group .k-item {
        background: #ff9;
    }

        /* child menu item hover state */
        .k-menu-group .k-item:hover {
            background: #ff3;
        }
</style>

<div style="background: orange; padding:1em; width: 60%">
    <TelerikMenu Data="@Data" Class="custom-menu-styles"></TelerikMenu>
</div>

@code {
    public List<Product> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<Product>();

        string[] mainMenuItems = { "Home", "About Us", "Services" };
        string[][] subMenuItems = {
        new string[] { "Overview", "News", "Updates" },
        new string[] { "Company", "Team", "Careers" },
        new string[] { "Consulting", "Support", "Development" }
    };

        int idCounter = 1;

        for (int i = 0; i < mainMenuItems.Length; i++)
        {
            var mainProduct = new Product
                {
                    ID = idCounter++,
                    Text = mainMenuItems[i],
                    Items = new List<Product>()
                };

            foreach (var subItem in subMenuItems[i])
            {
                mainProduct.Items.Add(new Product
                    {
                        ID = idCounter++,
                        Text = subItem
                    });
            }

            Data.Add(mainProduct);
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Text { get; set; }
        public List<Product> Items { get; set; }
    }
}
````

## See Also

- [Telerik Blazor Menu - Overview](slug://components/menu/overview)
- [Telerik Blazor Styling and Themes - Override Theme Styles](slug://themes-override)