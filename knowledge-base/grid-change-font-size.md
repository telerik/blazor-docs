---
title: Change Grid Font Size
description: How to set custom Blazor Grid font size
type: how-to
page_title: Change Blazor Grid Font Size
slug: grid-kb-change-font-size
position: 
tags: telerik, blazor, grid, treelist, font, css, styles
ticketid: 1648462, 1646767, 1642310
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

* How to change the Grid font size? 
* How to set custom font styles?

## Solution

1. Set a custom CSS class to the Grid through the `Class` parameter. This configuration allows you to target specific Grid instances.
2. Use the defined class to [Override the theme styles]({%slug themes-override%}) and set the desired font size to the Grid and its child components.

>caption Change Blazor Grid Font Size

````CSHTML
<style>
    /* grid */
    .k-grid.font-size,
    /* grid toolbar */
    .k-grid.font-size .k-toolbar,
    /* grid cells */
    .k-grid.font-size table,
    /* textboxes */
    .k-grid.font-size .k-input,
    /* date pickers */
    .k-grid.font-size .k-picker,
    /* buttons */
    .k-grid.font-size .k-button,
    .k-grid.font-size .k-button-text,
    /* column and filter menu */
    .k-popup,
    .k-popup .k-input,
    .k-popup .k-picker,
    .k-popup .k-button,
    /*column menu dropdowns */
    .k-columnmenu-item {
        font-size: 12px;
    }
</style>

<TelerikGrid Data="@GridData"
             Class="font-size"
             Pageable="true"
             Sortable="true"
             Groupable="true"
             ShowColumnMenu="true"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
        <GridCommandColumn>
            <GridCommandButton>Command Button</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 20).Select(x => new Product
            {
                Id = x,
                Name = "Product name " + x,
                Price = (decimal)(x * 3.14),
                Released = DateTime.Now.AddMonths(-x).Date,
                Discontinued = x % 5 == 0
            }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Change Inputs and Buttons Font Size]({%slug inputs-kb-change-font-size%})
* [Change Grid Border Color]({%slug grid-kb-change-border-color%})
* [Customize CSS Theme Styles]({%slug themes-override%})
